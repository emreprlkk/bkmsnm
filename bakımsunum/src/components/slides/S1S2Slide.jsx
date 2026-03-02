import React, { useState, useRef, useEffect, useMemo } from 'react';
import Chart from 'react-apexcharts';
import { Maximize, Minimize, BarChart2, Filter } from 'lucide-react';
import { s1Data, s2Data } from '../../data/mockData';

export default function S1S2Slide() {
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Filtreleme State'leri
    const [selectedBolge, setSelectedBolge] = useState('ADANA');
    const [selectedOM, setSelectedOM] = useState('TÜMÜ');

    // Hangi Div'in devasa boyuta getirileceği
    const [focusedPanel, setFocusedPanel] = useState(null); // 'S1' | 'S2' | null

    const containerRef = useRef(null);

    // Tüm Data'dan Bölge Listesi Çıkartma
    const bolgeList = useMemo(() => {
        const bolgeler = new Set(s1Data.map(d => d.BOLGE));
        return ['TÜMÜ', ...Array.from(bolgeler).sort()];
    }, []);

    // Seçili Bölgeye Göre OM Listesi Çıkartma
    const omList = useMemo(() => {
        if (selectedBolge === 'TÜMÜ') {
            return ['TÜMÜ', ...Array.from(new Set(s1Data.map(d => d.OM))).sort()];
        }
        return ['TÜMÜ', ...Array.from(new Set(s1Data.filter(d => d.BOLGE === selectedBolge).map(d => d.OM))).sort()];
    }, [selectedBolge]);

    // Bölge değiştiğinde OM'yi sıfırla
    useEffect(() => {
        setSelectedOM('TÜMÜ');
    }, [selectedBolge]);

    // Filtrelenmiş Veriler
    const filteredS1Data = useMemo(() => {
        let result = s1Data;
        if (selectedBolge !== 'TÜMÜ') result = result.filter(d => d.BOLGE === selectedBolge);
        if (selectedOM !== 'TÜMÜ') result = result.filter(d => d.OM === selectedOM);
        return result;
    }, [selectedBolge, selectedOM]);

    const filteredS2Data = useMemo(() => {
        let result = s2Data;
        if (selectedBolge !== 'TÜMÜ') result = result.filter(d => d.BOLGE === selectedBolge);
        if (selectedOM !== 'TÜMÜ') result = result.filter(d => d.OM === selectedOM);
        return result;
    }, [selectedBolge, selectedOM]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            const isFull = !!document.fullscreenElement;
            setIsFullscreen(isFull);
            // Tam ekrandan çıkıldığında focus modunu da temizle (ikisi yan yana dönsün)
            if (!isFull) {
                setFocusedPanel(null);
            }
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const toggleMainFullscreen = () => {
        if (!document.fullscreenElement) {
            setFocusedPanel(null); // Tüm sayfayı tam ekran yap, her ikisi de görünsün
            containerRef.current?.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    // İlgili div'i tam ekran ve tek başına focus modunda açmak için
    const focusAndFullscreen = (panelType) => {
        if (!document.fullscreenElement) {
            setFocusedPanel(panelType);
            containerRef.current?.requestFullscreen();
        } else {
            // Zaten tam ekrandaysak çık
            document.exitFullscreen();
        }
    };

    // Shared chart options logic to ensure uniformity
    const getChartOptions = (titleStr, data) => {
        const categories = data.map(d => d.OM.replace(' OM', '')); // Kısaltılmış OM isimleri

        return {
            chart: {
                type: 'bar', // Using normal bar chart as requested
                stacked: false, // Normal yan yana bar
                toolbar: { show: false },
                background: 'transparent',
                fontFamily: 'inherit',
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 800,
                    animateGradually: {
                        enabled: true,
                        delay: 150
                    },
                    dynamicAnimation: {
                        enabled: true,
                        speed: 350
                    }
                }
            },
            colors: ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'], // BINA, DUT, SDK, AG, YG
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '80%',
                    borderRadius: 3,
                    dataLabels: {
                        position: 'center', // Labeller barların ortasında dikey olarak dönsün
                        orientation: 'vertical',
                    },
                }
            },
            dataLabels: {
                enabled: true, // Labeller aktif edildi
                style: {
                    fontSize: '9px',
                    fontFamily: 'inherit',
                    fontWeight: 800,
                    colors: ['#ffffff'] // Yazı rengi
                },
                formatter: function (val) {
                    if (val === 0 || val === 0.0) return ''; // 0 olanları gizle, kalabalık yapmasın
                    return val;
                },
                dropShadow: {
                    enabled: true,
                    top: 1,
                    left: 1,
                    blur: 1,
                    color: '#000',
                    opacity: 0.45
                }
            },
            xaxis: {
                categories: categories,
                labels: {
                    style: { colors: '#94a3b8', fontSize: '11px', fontWeight: 600, fontFamily: 'inherit' },
                    rotate: data.length > 5 ? -45 : 0,
                    rotateAlways: data.length > 5,
                },
                axisBorder: { show: false },
                axisTicks: { show: false }
            },
            yaxis: {
                title: { text: 'Göstergeler (Adet + Tutar)', style: { color: '#94a3b8', fontSize: '10px', fontWeight: 700 } },
                labels: { style: { colors: '#94a3b8', fontSize: '10px' } }
            },
            legend: {
                position: 'top',
                horizontalAlign: 'center',
                labels: { colors: '#cbd5e1' },
                itemMargin: { horizontal: 10, vertical: 5 },
                markers: { radius: 12 }
            },
            grid: {
                borderColor: 'rgba(255,255,255,0.05)',
                strokeDashArray: 4,
                xaxis: { lines: { show: false } }
            },
            tooltip: {
                theme: 'dark',
                shared: true,
                intersect: false,
                y: {
                    formatter: function (val, { seriesIndex }) {
                        if (seriesIndex >= 3) return val + " (Birim)";
                        return val + " Adet";
                    }
                }
            }
        };
    };

    const s1Series = useMemo(() => [
        { name: 'Bina', data: filteredS1Data.map(d => d.BINA) },
        { name: 'DUT', data: filteredS1Data.map(d => d.DUT) },
        { name: 'SDK', data: filteredS1Data.map(d => d.SDK) },
        { name: 'AG', data: filteredS1Data.map(d => d.AG) },
        { name: 'YG', data: filteredS1Data.map(d => d.YG) }
    ], [filteredS1Data]);

    const s2Series = useMemo(() => [
        { name: 'Bina', data: filteredS2Data.map(d => d.BINA) },
        { name: 'DUT', data: filteredS2Data.map(d => d.DUT) },
        { name: 'SDK', data: filteredS2Data.map(d => d.SDK) },
        { name: 'AG', data: filteredS2Data.map(d => d.AG) },
        { name: 'YG', data: filteredS2Data.map(d => d.YG) }
    ], [filteredS2Data]);

    const s1Options = useMemo(() => getChartOptions('S1 SENARYO ANALİZİ', filteredS1Data), [filteredS1Data]);
    const s2Options = useMemo(() => getChartOptions('S2 SENARYO ANALİZİ', filteredS2Data), [filteredS2Data]);

    return (
        <div
            ref={containerRef}
            className={`flex flex-col h-full w-full transition-all duration-700 ease-in-out ${isFullscreen ? 'fixed inset-0 z-50 p-6 bg-base-100 overflow-y-auto' : ''}`}
        >
            <div className={`mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 transition-all duration-500 ease-out ${focusedPanel ? 'opacity-0 h-0 overflow-hidden mb-0' : 'opacity-100 h-auto'}`}>
                <div>
                    <h2 className="text-3xl font-extrabold text-base-content mb-2 flex items-center gap-3">
                        <BarChart2 className="w-8 h-8 text-primary" />
                        SEVİYE-1 ve SEVİYE-2 Kapsamında Yapılan İşlerin Tiplerine Göre Adetleri
                    </h2>
                    <p className="text-base-content/60 text-lg">
                        Yandaki filteden lütfen il ve operasyon seçimi ile filtreleme yapınız
                    </p>
                </div>

                <div className="flex items-center gap-3 bg-base-200/50 p-2 rounded-xl border border-base-200 shadow-sm mr-auto md:mr-0 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="flex items-center gap-2 text-primary">
                        <Filter size={16} />
                        <span className="text-xs font-bold uppercase tracking-wider">Filtre:</span>
                    </div>

                    {/* Bölge Seçici */}
                    <div className="form-control">
                        <select
                            className="select select-sm select-bordered bg-base-100 text-sm font-semibold w-full max-w-xs focus:ring-2 focus:ring-primary/50 text-base-content/80"
                            value={selectedBolge}
                            onChange={(e) => setSelectedBolge(e.target.value)}
                        >
                            {bolgeList.map(b => (
                                <option key={b} value={b}>{b === 'TÜMÜ' ? 'Tüm Bölgeler' : b}</option>
                            ))}
                        </select>
                    </div>

                    {/* OM Seçici */}
                    <div className="form-control">
                        <select
                            className="select select-sm select-bordered bg-base-100 text-sm font-semibold w-full max-w-xs focus:ring-2 focus:ring-primary/50 text-base-content/80"
                            value={selectedOM}
                            onChange={(e) => setSelectedOM(e.target.value)}
                            disabled={selectedBolge === 'TÜMÜ' && omList.length > 20}
                        >
                            {omList.map(om => (
                                <option key={om} value={om}>{om === 'TÜMÜ' ? 'Tüm Operasyon MRK' : om}</option>
                            ))}
                        </select>
                    </div>

                    <div className="w-px h-6 bg-base-content/10 mx-1"></div>

                    <button
                        onClick={toggleMainFullscreen}
                        className="btn btn-sm btn-outline shadow-sm bg-base-100"
                        title={isFullscreen && !focusedPanel ? "Küçült" : "Genel Tam Ekran"}
                    >
                        {isFullscreen && !focusedPanel ? <Minimize size={16} /> : <Maximize size={16} />}
                    </button>
                </div>
            </div>

            {/* İki taraflı görselleştirme kapsayıcısı */}
            <div className={`flex-1 flex flex-col xl:flex-row gap-6 transition-all duration-700 ease-in-out ${isFullscreen && !focusedPanel ? '' : !isFullscreen ? 'relative bg-base-200/50 shadow-inner rounded-3xl p-6 h-full' : 'h-full'}`}>

                {/* S1 Sol Div */}
                <div className={`flex-col bg-base-100 rounded-2xl shadow-md border border-base-200 p-4 relative min-h-[400px] transition-all duration-700 ease-out flex ${focusedPanel === 'S1' ? 'w-full flex-1' : focusedPanel === 'S2' ? 'hidden' : 'w-full xl:w-1/2 flex-1'}`}>
                    <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
                        <div className="text-xs font-bold text-primary/60 tracking-widest uppercase">
                            S1 BAKIM {focusedPanel === 'S1' && '- DETAYLI GÖRÜNÜM'}
                        </div>
                        <button
                            onClick={() => focusAndFullscreen('S1')}
                            className="btn btn-xs btn-ghost btn-circle text-base-content/50 hover:text-primary transition-colors"
                            title={focusedPanel === 'S1' ? "Küçült" : "Bu Grafiği Büyüt"}
                        >
                            {focusedPanel === 'S1' ? <Minimize size={14} /> : <Maximize size={14} />}
                        </button>
                    </div>

                    <div className="flex-1 w-full -ml-3 mt-4 flex">
                        {filteredS1Data.length > 0 ? (
                            <div className="w-full h-full min-h-[300px] flex-1">
                                <Chart
                                    options={s1Options}
                                    series={s1Series}
                                    type="bar"
                                    height="100%"
                                />
                            </div>
                        ) : (
                            <div className="flex w-full h-full items-center justify-center text-base-content/40 font-semibold">Bu filtreye uygun veri bulunamadı.</div>
                        )}
                    </div>
                </div>

                {/* S2 Sağ Div */}
                <div className={`flex-col bg-base-100 rounded-2xl shadow-md border border-base-200 p-4 relative min-h-[400px] transition-all duration-700 ease-out flex ${focusedPanel === 'S2' ? 'w-full flex-1' : focusedPanel === 'S1' ? 'hidden' : 'w-full xl:w-1/2 flex-1'}`}>
                    <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
                        <div className="text-xs font-bold text-primary/60 tracking-widest uppercase">
                            S2 BAKIM {focusedPanel === 'S2' && '- DETAYLI GÖRÜNÜM'}
                        </div>
                        <button
                            onClick={() => focusAndFullscreen('S2')}
                            className="btn btn-xs btn-ghost btn-circle text-base-content/50 hover:text-primary transition-colors"
                            title={focusedPanel === 'S2' ? "Küçült" : "Bu Grafiği Büyüt"}
                        >
                            {focusedPanel === 'S2' ? <Minimize size={14} /> : <Maximize size={14} />}
                        </button>
                    </div>

                    <div className="flex-1 w-full -ml-3 mt-4 flex">
                        {filteredS2Data.length > 0 ? (
                            <div className="w-full h-full min-h-[300px] flex-1">
                                <Chart
                                    options={s2Options}
                                    series={s2Series}
                                    type="bar"
                                    height="100%"
                                />
                            </div>
                        ) : (
                            <div className="flex w-full h-full items-center justify-center text-base-content/40 font-semibold">Bu filtreye uygun veri bulunamadı.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
