import React, { useState, useRef, useEffect, useMemo } from 'react';
import Chart from 'react-apexcharts';
import { Maximize, Minimize, MapPin, TrendingUp, Layers } from 'lucide-react';
import { scopeData, scopeCategories } from '../../data/mockData';

const formatCurrencyExact = (val) => {
    return '₺' + val.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const formatCurrencyM = (val) => {
    return '₺' + (val / 1000000).toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + 'M';
};

export default function PieChartSlide() {
    const [isFullscreen, setIsFullscreen] = useState(() => !!document.fullscreenElement);
    const [activeBolge, setActiveBolge] = useState(null);
    const [activeDistrict, setActiveDistrict] = useState(null);
    const containerRef = useRef(null);

    // Process scopeData to group by bolge and calculate totals
    const { bolgeList, grandTotal } = useMemo(() => {
        const map = {};
        let total = 0;
        scopeData.forEach(item => {
            const costSum = item.cost.reduce((a, b) => a + b, 0);
            const countSum = item.data.reduce((a, b) => a + b, 0);
            total += costSum;

            if (!map[item.bolge]) {
                map[item.bolge] = {
                    bolge: item.bolge,
                    totalCost: 0,
                    totalCount: 0,
                    districts: []
                };
            }
            map[item.bolge].totalCost += costSum;
            map[item.bolge].totalCount += countSum;
            map[item.bolge].districts.push({
                name: item.name,
                cost: costSum,
                count: countSum,
                rawCost: item.cost,
                rawData: item.data
            });
        });

        const list = Object.values(map).sort((a, b) => b.totalCost - a.totalCost);
        // Sort districts inside bolge by cost descending
        list.forEach(b => b.districts.sort((x, y) => y.cost - x.cost));
        return { bolgeList: list, grandTotal: total };
    }, []);

    // Removed initial active bolge selection so it starts at the region selection view

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.getElementById('presentation-fullscreen-wrapper')?.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    const handleBolgeChange = (bolge) => {
        setActiveBolge(bolge);
        setActiveDistrict(null); // Reset detail when changing region
    };

    const activeBolgeData = bolgeList.find(b => b.bolge === activeBolge);

    const pieOptions = {
        chart: {
            type: 'donut',
            fontFamily: 'inherit',
            background: 'transparent'
        },
        labels: bolgeList.map(b => b.bolge),
        colors: ['#00a96e', '#00b5ff', '#ffb020', '#ff5861', '#8b5cf6'],
        plotOptions: {
            pie: {
                donut: {
                    size: '70%',
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '16px',
                            fontFamily: 'inherit',
                            color: '#64748b',
                        },
                        value: {
                            show: true,
                            fontSize: '24px',
                            fontFamily: 'inherit',
                            fontWeight: 'bold',
                            formatter: function (val) {
                                return formatCurrencyM(val);
                            }
                        },
                        total: {
                            show: true,
                            showAlways: true,
                            label: 'Genel Toplam',
                            fontSize: '14px',
                            color: '#64748b',
                            formatter: function () {
                                return formatCurrencyM(grandTotal);
                            }
                        }
                    }
                }
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val.toFixed(1) + "%";
            },
            dropShadow: { enabled: false }
        },
        stroke: { show: false },
        legend: {
            position: 'bottom',
            fontSize: '14px',
            markers: { radius: 12 }
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return formatCurrencyExact(val);
                }
            }
        }
    };

    const pieSeries = bolgeList.map(b => b.totalCost);

    // Kapsam grafik ayarları (Mixed: Sütun=Maliyet, Çizgi=Adet)
    const districtChartOptions = {
        chart: {
            type: 'line', // Mix chart requires base type 'line'
            toolbar: { show: false },
            background: 'transparent',
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 600,
            }
        },
        colors: ['#38bdf8', '#fbbf24'], // Sütun mavi, Çizgi sarı
        stroke: {
            width: [0, 3], // 0 for column, 3 for line
            curve: 'smooth'
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                columnWidth: '55%'
            }
        },
        fill: {
            opacity: [0.85, 1],
            type: ['solid', 'solid']
        },
        dataLabels: {
            enabled: true,
            enabledOnSeries: [1], // Sadece 'Adet' çizgisi üzerinde sayı göstersin
            style: { fontSize: '11px', fontWeight: 800, colors: ['#fbbf24'] },
            background: { enabled: true, foreColor: '#0f172a', padding: 4, borderRadius: 4, borderWidth: 0 }
        },
        xaxis: {
            categories: scopeCategories,
            labels: {
                style: { colors: '#94a3b8', fontSize: '9px', fontWeight: 600, fontFamily: 'inherit' },
                rotate: -45,
                rotateAlways: true,
            },
            axisBorder: { show: false },
            axisTicks: { show: false }
        },
        yaxis: [
            {
                title: { text: 'Maliyet Tutar', style: { color: '#38bdf8', fontSize: '10px', fontWeight: 700 } },
                labels: {
                    style: { colors: '#38bdf8', fontSize: '10px', fontFamily: 'inherit', fontWeight: 600 },
                    formatter: (val) => val > 0 ? formatCurrencyM(val) : '0'
                }
            },
            {
                opposite: true,
                title: { text: 'Proje Adedi', style: { color: '#fbbf24', fontSize: '10px', fontWeight: 700 } },
                labels: {
                    style: { colors: '#fbbf24', fontSize: '10px', fontFamily: 'inherit', fontWeight: 600 },
                    formatter: (val) => Math.round(val)
                }
            }
        ],
        grid: {
            borderColor: 'rgba(255,255,255,0.05)',
            strokeDashArray: 4,
            xaxis: { lines: { show: false } }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'center',
            labels: { colors: '#cbd5e1' },
            markers: { radius: 12 }
        },
        tooltip: {
            theme: 'dark',
            shared: true,
            intersect: false,
            y: {
                formatter: function (val, { seriesIndex }) {
                    if (seriesIndex === 0) return formatCurrencyExact(val);
                    return val + ' Adet';
                }
            }
        }
    };

    return (
        <div className={`flex flex-col w-full ${isFullscreen ? 'fixed inset-0 z-[100] bg-base-100 p-6 md:p-10' : 'h-full'}`}>
            <div className="mb-6 flex flex-shrink-0 justify-between items-start">
                <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-base-content mb-2 flex items-center gap-3">
                        SEVİYE-3 İŞ KAPSAMI - TEDAŞ RAPORLAMA
                    </h2>
                    <p className="text-base-content/60 text-sm md:text-lg">Bölge ve lokasyon bazlı bütçe dağılımları ({formatCurrencyM(grandTotal)})</p>
                </div>
                <button
                    onClick={toggleFullscreen}
                    className="btn btn-sm btn-outline shadow-sm bg-base-100 flex-shrink-0 ml-4"
                    title={isFullscreen ? "Küçült" : "Tam Ekran"}
                >
                    {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                </button>
            </div>

            <div
                ref={containerRef}
                className="flex-1 rounded-3xl p-4 md:p-6 flex flex-col xl:flex-row gap-8 relative bg-base-200/50 shadow-inner overflow-hidden min-h-0"
            >
                {/* Sol Taraf: Grafikler */}
                <div className="w-full xl:w-2/5 flex flex-col overflow-hidden relative min-h-[400px]">

                    {/* Genel Bölge Pasta Grafiği (Sadece lokasyon seçili DEĞİLSE görünür) */}
                    <div className={`absolute inset-0 transition-all duration-500 ease-in-out flex flex-col justify-center bg-base-100 rounded-2xl p-4 shadow-sm ${!activeDistrict ? 'opacity-100 z-10 translate-x-0' : 'opacity-0 -z-10 -translate-x-10 pointer-events-none'}`}>
                        <h3 className="text-center font-bold text-base-content/70 flex justify-center items-center gap-2 text-sm z-10 absolute top-4 left-0 right-0">
                            <MapPin size={16} /> Bölgelere Göre Dağılım
                        </h3>
                        <div className="w-full h-full pt-10 pb-4">
                            <Chart options={pieOptions} series={pieSeries} type="donut" height="100%" />
                        </div>
                    </div>

                    {/* Aktif Lokasyon Detay Grafiği (Bar Chart - Sadece lokasyon SEÇİLİYSE görünür) */}
                    <div className={`absolute inset-0 transition-all duration-500 ease-in-out bg-base-100 rounded-2xl p-4 shadow-sm flex flex-col overflow-hidden ${activeDistrict ? 'opacity-100 z-10 translate-x-0' : 'opacity-0 -z-10 translate-x-10 pointer-events-none'}`}>
                        {activeDistrict && (
                            <>
                                <h3 className="text-center font-extrabold text-primary mb-1 text-sm tracking-wide uppercase mt-2">
                                    {activeDistrict.name}
                                </h3>
                                <p className="text-center text-[10px] text-base-content/50 uppercase tracking-widest mb-2 border-b border-base-200 pb-2">
                                    Kapsam Bazlı Adet ve Maliyet Analizi
                                </p>
                                <div className="flex-1 w-full -ml-3 mt-1">
                                    <Chart
                                        options={districtChartOptions}
                                        series={[
                                            { name: 'MaliyetTutarı', type: 'column', data: activeDistrict.rawCost },
                                            { name: 'Proje Adedi', type: 'line', data: activeDistrict.rawData }
                                        ]}
                                        type="line"
                                        height="100%"
                                    />
                                </div>
                                <button
                                    onClick={() => setActiveDistrict(null)}
                                    className="btn btn-sm btn-ghost absolute top-3 right-3 text-base-content/40 hover:text-base-content/70"
                                >
                                    ✕ Geri
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Sağ Taraf: Gelişmiş İstatistik Kartları / Bölge ve OM Görünümü */}
                <div className="w-full xl:w-3/5 flex flex-col h-full overflow-hidden">

                    {!activeBolge ? (
                        /* Bölüm 1: BÖLGELER LİSTESİ */
                        <div className="flex-1 overflow-y-auto pr-2 pb-4 space-y-4">
                            <div className="divider text-base-content/40 text-sm font-semibold mt-0">İL BAZLI ÖZET</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {bolgeList.map((b) => (
                                    <div
                                        key={b.bolge}
                                        onClick={() => handleBolgeChange(b.bolge)}
                                        className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-primary transition-all duration-300 cursor-pointer group"
                                    >
                                        <div className="card-body p-5">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="card-title text-[18px] font-bold text-base-content group-hover:text-primary transition-colors">
                                                    {b.bolge}
                                                </h3>
                                                <div className="badge badge-primary badge-outline badge-sm font-bold opacity-80 gap-1">
                                                    <Layers size={10} /> {b.totalCount} Proje
                                                </div>
                                            </div>

                                            <div className="mt-2 flex flex-col">
                                                <span className="text-[10px] text-base-content/50 font-bold uppercase tracking-widest mb-1">TOPLAM TEDAŞ RAPORLAMA FİYATI</span>
                                                <span className="text-2xl font-black text-primary">{formatCurrencyExact(b.totalCost)}</span>
                                            </div>

                                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-base-200">
                                                <span className="text-xs text-base-content/60 font-medium">Bağlı OM Sayısı: {b.districts.length}</span>
                                                <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                                    Detayları Gör →
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* Bölüm 2: SEÇİLİ BÖLGENİN OM DETAYLARI */
                        activeBolgeData && (
                            <div className="flex-1 overflow-y-auto pr-2 pb-4 space-y-4 flex flex-col">
                                {/* Geri Dönüş ve Bölge Başlığı */}
                                <div className="flex items-center gap-3 mb-2">
                                    <button
                                        className="btn btn-sm btn-ghost bg-base-200/50 hover:bg-base-200"
                                        onClick={() => setActiveBolge(null)}
                                    >
                                        ← Geri Dön
                                    </button>
                                    <h3 className="text-xl font-bold text-base-content flex-1">
                                        {activeBolgeData.bolge} BÖLGESİ DETAYLARI
                                    </h3>
                                </div>

                                {/* Bölge Ana İstatistik Kartı */}
                                <div className="stats shadow w-full bg-gradient-to-br from-primary to-primary-focus text-primary-content">
                                    <div className="stat">
                                        <div className="stat-figure opacity-20">
                                            <TrendingUp size={48} />
                                        </div>
                                        <div className="stat-title text-primary-content/80 font-semibold">{activeBolgeData.bolge} TOPLAM TUTARI</div>
                                        <div className="stat-value text-3xl md:text-4xl">{formatCurrencyExact(activeBolgeData.totalCost)}</div>
                                        <div className="stat-desc text-primary-content/80 mt-1 font-medium">Toplam {activeBolgeData.totalCount} Adet Proje</div>
                                    </div>
                                </div>

                                <div className="divider text-base-content/40 text-sm font-semibold">OPERASYON MERKEZİ DETAYLARI</div>

                                {/* Lokasyon (District) Kartları Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                                    {activeBolgeData.districts.map((d, idx) => {
                                        const percentage = ((d.cost / activeBolgeData.totalCost) * 100);
                                        const isActive = activeDistrict?.name === d.name;

                                        return (
                                            <div
                                                key={d.name}
                                                onClick={() => setActiveDistrict(isActive ? null : d)}
                                                className={`card bg-base-100 border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex-shrink-0 ${isActive ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'border-base-200'
                                                    }`}
                                            >
                                                <div className="card-body p-5">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className={`card-title text-[15px] font-bold transition-colors ${isActive ? 'text-primary' : 'text-base-content group-hover:text-primary'}`}>
                                                            {d.name}
                                                        </h3>
                                                        <div className={`badge badge-sm font-bold opacity-80 gap-1 ${isActive ? 'badge-primary' : 'badge-error badge-outline'}`}>
                                                            <Layers size={10} /> {d.count} Adet
                                                        </div>
                                                    </div>

                                                    <div className="mt-2 flex flex-col">
                                                        <span className="text-[10px] text-base-content/50 font-bold uppercase tracking-widest mb-1">TEDAŞ RAPORLAMA</span>
                                                        <span className="text-xl font-black text-base-content">{formatCurrencyExact(d.cost)}</span>
                                                    </div>

                                                    <div className="mt-4 w-full bg-base-200 rounded-full h-1.5 overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full transition-all duration-1000 ease-out ${idx === 0 || isActive ? 'bg-primary' : 'bg-base-content/30 group-hover:bg-primary/50'}`}
                                                            style={{ width: `${percentage}%` }}
                                                        ></div>
                                                    </div>

                                                    <div className="flex justify-between items-center mt-2">
                                                        <span className="text-[10px] text-base-content/40 font-medium">İl'deki yüzdesi</span>
                                                        <span className={`text-[11px] font-bold ${idx === 0 || isActive ? 'text-primary' : 'text-base-content/60'}`}>
                                                            %{percentage.toFixed(1)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}
