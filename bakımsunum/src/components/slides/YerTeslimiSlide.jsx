import React, { useState, useMemo, useRef, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { Maximize, Minimize, BarChart3, TableProperties, MapPin, Building2, HardHat, TrendingUp, PieChart, Coins } from 'lucide-react';
import { yerTeslimiData } from '../../data/mockData';

const formatCurrencyM = (val) => {
    if (!val) return '₺0M';
    return '₺' + (val / 1000000).toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + 'M';
};

const formatCurrencyExact = (val) => {
    if (!val) return '₺0,00';
    return '₺' + val.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export default function YerTeslimiSlide() {
    const containerRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(() => !!document.fullscreenElement);
    const [viewMode, setViewMode] = useState('chart'); // 'chart' or 'table'
    const [bolgeFilter, setBolgeFilter] = useState('Tümü'); // Changed default to "Tümü"
    const [omFilter, setOmFilter] = useState('Tümü');
    const [yukleniciFilter, setYukleniciFilter] = useState('Tümü');

    useEffect(() => {
        const handler = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handler);
        return () => document.removeEventListener('fullscreenchange', handler);
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.getElementById('presentation-fullscreen-wrapper')?.requestFullscreen().catch(console.error);
        } else {
            document.exitFullscreen();
        }
    };

    // Derive unique filter options
    const bolgeler = useMemo(() => {
        return ['Tümü', ...new Set(yerTeslimiData.map(d => d['BÖLGE MÜDÜRLÜĞÜ']).filter(Boolean))];
    }, []);

    const omler = useMemo(() => {
        const filtered = bolgeFilter === 'Tümü'
            ? yerTeslimiData
            : yerTeslimiData.filter(d => d['BÖLGE MÜDÜRLÜĞÜ'] === bolgeFilter);
        return ['Tümü', ...new Set(filtered.map(d => d['OM']).filter(Boolean))];
    }, [bolgeFilter]);

    const yukleniciler = useMemo(() => {
        let filtered = yerTeslimiData;
        if (bolgeFilter !== 'Tümü') filtered = filtered.filter(d => d['BÖLGE MÜDÜRLÜĞÜ'] === bolgeFilter);
        if (omFilter !== 'Tümü') filtered = filtered.filter(d => d['OM'] === omFilter);
        return ['Tümü', ...new Set(filtered.map(d => d['Yüklenici']).filter(Boolean))];
    }, [bolgeFilter, omFilter]);

    // Handle cascaded filtering reset
    const handleBolgeChange = (e) => {
        setBolgeFilter(e.target.value);
        setOmFilter('Tümü');
        setYukleniciFilter('Tümü');
    };

    const handleOmChange = (e) => {
        setOmFilter(e.target.value);
        setYukleniciFilter('Tümü');
    };

    // Filter the data based on selections
    const filteredData = useMemo(() => {
        return yerTeslimiData.filter(d => {
            if (bolgeFilter !== 'Tümü' && d['BÖLGE MÜDÜRLÜĞÜ'] !== bolgeFilter) return false;
            if (omFilter !== 'Tümü' && d['OM'] !== omFilter) return false;
            if (yukleniciFilter !== 'Tümü' && d['Yüklenici'] !== yukleniciFilter) return false;
            return true;
        });
    }, [bolgeFilter, omFilter, yukleniciFilter]);

    const totalYerTeslim = filteredData.reduce((acc, curr) => acc + (curr['Yer Teslim Sayısı'] || 0), 0);
    const totalGerceklesen = filteredData.reduce((acc, curr) => acc + (curr['Gerçekleşen Proje Sayısı'] || 0), 0);
    const totalTutar = filteredData.reduce((acc, curr) => acc + (curr['Gerçekleşme Tutarı'] || 0), 0);
    const gerceklesmeOrani = totalYerTeslim > 0 ? ((totalGerceklesen / totalYerTeslim) * 100).toFixed(1) : 0;

    // Chart Options
    const chartOptions = {
        chart: {
            type: 'bar',
            fontFamily: 'inherit',
            toolbar: { show: false },
            background: 'transparent',
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '45%',
                borderRadius: 4
            }
        },
        colors: ['#00a96e'], // Color for the actual bar (Success color roughly)
        dataLabels: {
            enabled: true,
            formatter: function (val, opt) {
                const goals = opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex]?.goals;
                if (goals && goals.length > 0) {
                    return `${val} / ${goals[0].value}`;
                }
                return val;
            },
            style: {
                colors: ['#ffffff'],
                fontSize: '10px',
                fontWeight: 700
            },
            background: { enabled: true, foreColor: '#000', padding: 4, borderRadius: 4, borderWidth: 0 }
        },
        stroke: { show: true, width: 2, colors: ['transparent'] },
        xaxis: {
            categories: filteredData.map(d => d['OM']),
            labels: {
                style: { colors: '#94a3b8', fontSize: '10px', fontWeight: 600, fontFamily: 'inherit' },
                rotate: -45,
                rotateAlways: true,
            },
            axisBorder: { show: false },
            axisTicks: { show: false }
        },
        yaxis: {
            title: {
                text: 'Proje Sayısı',
                style: { color: '#64748b', fontSize: '12px', fontWeight: 600, fontFamily: 'inherit' }
            },
            labels: { style: { colors: '#64748b' } }
        },
        grid: {
            borderColor: 'rgba(255,255,255,0.05)',
            strokeDashArray: 4,
            xaxis: { lines: { show: false } }
        },
        legend: {
            show: true,
            showForSingleSeries: true,
            position: 'top',
            horizontalAlign: 'center',
            customLegendItems: ['Gerçekleşen Proje Sayısı', 'Yer Teslim Sayısı (Hedef)'],
            markers: { fillColors: ['#00a96e', '#ff5861'], radius: 12 },
            labels: { colors: '#64748b' }
        },
        tooltip: {
            theme: 'dark',
            shared: true,
            intersect: false,
            y: {
                formatter: function (y) {
                    if (typeof y !== "undefined") {
                        return y.toFixed(0) + ' Adet';
                    }
                    return y;
                }
            }
        }
    };

    const chartSeries = [
        {
            name: 'Gerçekleşen Proje Sayısı',
            data: filteredData.map(d => ({
                x: d['OM'],
                y: d['Gerçekleşen Proje Sayısı'],
                goals: [
                    {
                        name: 'Yer Teslim Sayısı (Hedef)',
                        value: d['Yer Teslim Sayısı'],
                        strokeWidth: 4,
                        strokeHeight: 12,
                        strokeColor: '#ff5861',
                    }
                ]
            }))
        }
    ];

    return (
        <div className={`flex flex-col flex-1 w-full ${isFullscreen ? 'fixed inset-0 z-50 bg-base-100 overflow-y-auto' : ''}`} ref={containerRef}>
            {/* Header */}
            <div className={`sticky z-40 bg-base-100/95 backdrop-blur-md shadow-sm border-b border-base-200 mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 
                ${isFullscreen ? '-top-8 -mt-8 -mx-8 px-8 pt-8 pb-4' : '-top-12 -mt-12 -mx-12 px-12 pt-12 pb-4'}`}>

                <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-base-content tracking-tight mb-2 uppercase">
                        2025 Yılı Yer Teslim İstatistikleri
                    </h2>
                    <p className="text-base-content/60 text-sm">Bölge, Operasyon Merkezi ve Yüklenici bazında yer teslim ve fiziki gerçekleşme takip ekranı</p>
                </div>

                <div className="flex flex-wrap gap-3 items-center ml-auto">
                    <div className="flex bg-base-300/50 p-1 rounded-xl border border-base-300">
                        <button
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${viewMode === 'chart'
                                ? 'bg-primary text-primary-content shadow-sm'
                                : 'text-base-content/60 hover:text-base-content'
                                }`}
                            onClick={() => setViewMode('chart')}
                        >
                            <BarChart3 size={14} /> Grafik
                        </button>
                        <button
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${viewMode === 'table'
                                ? 'bg-primary text-primary-content shadow-sm'
                                : 'text-base-content/60 hover:text-base-content'
                                }`}
                            onClick={() => setViewMode('table')}
                        >
                            <TableProperties size={14} /> Tablo
                        </button>
                    </div>

                    <button
                        onClick={toggleFullscreen}
                        className="btn btn-sm btn-outline btn-circle shadow-sm"
                        title={isFullscreen ? 'Küçült' : 'Tam Ekran'}
                    >
                        {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
                    </button>
                </div>
            </div>

            <div className={`${isFullscreen ? 'px-8' : ''}`}>
                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 bg-base-200/50 p-6 rounded-2xl border border-base-200">
                    <div className="form-control w-full">
                        <label className="label py-1"><span className="label-text text-xs font-bold text-base-content/60 uppercase tracking-widest"><MapPin size={12} className="inline mr-1" /> Bölge Müdürlüğü</span></label>
                        <select className="select select-bordered select-sm w-full font-semibold focus:border-primary bg-base-100" value={bolgeFilter} onChange={handleBolgeChange}>
                            {bolgeler.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                    </div>
                    <div className="form-control w-full">
                        <label className="label py-1"><span className="label-text text-xs font-bold text-base-content/60 uppercase tracking-widest"><Building2 size={12} className="inline mr-1" /> Operasyon Merkezi</span></label>
                        <select className="select select-bordered select-sm w-full font-semibold focus:border-primary bg-base-100" value={omFilter} onChange={handleOmChange} disabled={bolgeFilter === 'Tümü' && omler.length > 20}>
                            {omler.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                    </div>
                    <div className="form-control w-full">
                        <label className="label py-1"><span className="label-text text-xs font-bold text-base-content/60 uppercase tracking-widest"><HardHat size={12} className="inline mr-1" /> Yüklenici Firma</span></label>
                        <select className="select select-bordered select-sm w-full font-semibold focus:border-primary bg-base-100" value={yukleniciFilter} onChange={(e) => setYukleniciFilter(e.target.value)}>
                            {yukleniciler.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                    </div>
                </div>

                {/* Overview KPI Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="stats shadow bg-base-100 border border-base-200">
                        <div className="stat px-4 py-4 md:py-6">
                            <div className="stat-figure text-info opacity-20 hidden lg:block"><MapPin size={32} /></div>
                            <div className="stat-title text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-1 mb-1"><MapPin size={12} className="text-info lg:hidden" /> OM Sayısı</div>
                            <div className="stat-value text-2xl md:text-3xl lg:text-4xl text-info">{filteredData.length}</div>
                        </div>
                    </div>
                    <div className="stats shadow bg-base-100 border border-base-200">
                        <div className="stat px-4 py-4 md:py-6">
                            <div className="stat-figure text-secondary opacity-20 hidden lg:block"><TrendingUp size={32} /></div>
                            <div className="stat-title text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-1 mb-1"><TrendingUp size={12} className="text-secondary lg:hidden" /> Gerçekleşen / Hedef</div>
                            <div className="stat-value text-2xl md:text-3xl lg:text-4xl text-base-content flex items-end gap-1">
                                {totalGerceklesen} <span className="text-sm md:text-lg text-base-content/40 font-semibold mb-1">/ {totalYerTeslim}</span>
                            </div>
                        </div>
                    </div>
                    <div className="stats shadow bg-base-100 border border-base-200">
                        <div className="stat px-4 py-4 md:py-6">
                            <div className="stat-figure text-success opacity-20 hidden lg:block"><PieChart size={32} /></div>
                            <div className="stat-title text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-1 mb-1"><PieChart size={12} className="text-success lg:hidden" /> Gerçekleşme Oranı</div>
                            <div className="stat-value text-2xl md:text-3xl lg:text-4xl text-success">%{gerceklesmeOrani}</div>
                        </div>
                    </div>
                    <div className="stats shadow bg-base-100 border border-base-200">
                        <div className="stat px-4 py-4 md:py-6">
                            <div className="stat-figure text-warning opacity-20 hidden lg:block"><Coins size={32} /></div>
                            <div className="stat-title text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-1 mb-1"><Coins size={12} className="text-warning lg:hidden" /> Toplam Tutar</div>
                            <div className="stat-value text-xl md:text-2xl lg:text-3xl text-warning truncate" title={formatCurrencyExact(totalTutar)}>{formatCurrencyM(totalTutar)}</div>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 min-h-[500px] mb-8 rounded-2xl bg-base-100 border border-base-200 shadow-sm overflow-hidden flex flex-col relative z-0">
                    {viewMode === 'chart' ? (
                        <div className="flex-1 w-full pt-6 pr-4 pb-2 pl-0 h-full"> {/* Adjust padding for the chart */}
                            <Chart options={chartOptions} series={chartSeries} type="bar" height="100%" />
                        </div>
                    ) : (
                        <div className="w-full flex-1 overflow-auto">
                            <table className="table table-md table-pin-rows table-pin-cols w-full">
                                <thead>
                                    <tr>
                                        <th className="bg-base-200/80 backdrop-blur text-base-content/70">İL</th>
                                        <th className="bg-base-200/80 backdrop-blur text-base-content/70">OM</th>
                                        <th className="bg-base-200/80 backdrop-blur text-base-content/70">Yüklenici</th>
                                        <th className="bg-base-200/80 backdrop-blur text-base-content/70 text-right">Yer Teslim (Hedef)</th>
                                        <th className="bg-base-200/80 backdrop-blur text-base-content/70 text-right">Gerçekleşen Proje</th>
                                        <th className="bg-base-200/80 backdrop-blur text-base-content/70 text-right">Maliyet (₺)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((row, index) => (
                                        <tr key={index} className="hover:bg-base-200/40 transition-colors group cursor-default">
                                            <td className="font-bold">{row['BÖLGE MÜDÜRLÜĞÜ']}</td>
                                            <td className="text-base-content/80 font-medium">{row['OM']}</td>
                                            <td>
                                                <div className="badge badge-ghost font-semibold text-xs border-base-300 group-hover:border-primary/40">{row['Yüklenici']}</div>
                                            </td>
                                            <td className="text-right font-medium">{row['Yer Teslim Sayısı']}</td>
                                            <td className="text-right font-black text-success">{row['Gerçekleşen Proje Sayısı']}</td>
                                            <td className="text-right font-mono text-xs opacity-70 group-hover:opacity-100">{formatCurrencyExact(row['Gerçekleşme Tutarı'])}</td>
                                        </tr>
                                    ))}
                                    {filteredData.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="text-center py-12">
                                                <div className="flex flex-col items-center justify-center opacity-50">
                                                    <BarChart3 size={48} className="mb-4" />
                                                    <span className="font-bold">Seçilen kriterlere uygun veri bulunamadı.</span>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
