import React, { useState, useRef, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { Maximize, Minimize } from 'lucide-react';
import { regionalSales } from '../../data/mockData';

export default function BarChartSlide() {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    const options = {
        chart: {
            type: 'bar',
            fontFamily: 'inherit',
            toolbar: { show: false },
            background: 'transparent'
        },
        colors: ['#00b5ff'],
        plotOptions: {
            bar: {
                borderRadius: 8,
                horizontal: false,
                columnWidth: '55%',
                distributed: true
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val + ' Adet';
            },
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ["#304758"]
            }
        },
        legend: { show: false },
        xaxis: {
            categories: regionalSales.categories,
            labels: {
                style: {
                    fontSize: '14px',
                    fontWeight: 600
                }
            }
        },
        yaxis: {
            title: { text: 'Satış Adedi' }
        },
        grid: {
            strokeDashArray: 4
        }
    };

    const series = [{
        name: 'Sözleşme',
        data: regionalSales.sales
    }];

    return (
        <div className="flex flex-col h-full w-full">
            <div className="mb-8 flex justify-between items-start">
                <div>
                    <h2 className="text-4xl font-extrabold text-base-content mb-2">SÖZLEŞME BİLGİLERİ</h2>
                    <p className="text-base-content/60 text-lg">Bölgelere göre sözleşme dağılımı</p>
                </div>
                <button
                    onClick={toggleFullscreen}
                    className="btn btn-sm btn-outline shadow-sm bg-base-100"
                    title={isFullscreen ? "Küçült" : "Tam Ekran"}
                >
                    {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                </button>
            </div>

            <div
                ref={containerRef}
                className={`flex-1 bg-base-100 rounded-2xl shadow-sm border border-base-200 p-4 relative flex flex-col justify-center ${isFullscreen ? 'h-screen w-screen m-0 rounded-none overflow-y-auto' : 'h-full'}`}
            >
                <div className="h-full min-h-[400px]">
                    <Chart options={options} series={series} type="bar" height="100%" />
                </div>
            </div>
        </div>
    );
}
