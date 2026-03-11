import React, { useState, useRef, useEffect, useMemo } from 'react';
import Chart from 'react-apexcharts';
import { Maximize, Minimize, BarChart2, ChevronDown, SlidersHorizontal, Layers, TrendingUp, Sigma } from 'lucide-react';
import { s1Data, s2Data } from '../../data/mockData';
import ExportExcelButton from '../ExportExcelButton';

// ─── Küçük yardımcı: Her OM datasından toplam hesapla
const getTotal = (data) =>
    data.reduce((sum, d) => sum + d.BINA + d.DUT + d.SDK + d.AG + d.YG, 0);

// ─── Stat badge
function StatBadge({ label, value, color }) {
    return (
        <div
            style={{
                background: `linear-gradient(135deg, ${color}18 0%, ${color}08 100%)`,
                border: `1px solid ${color}30`,
            }}
            className="flex flex-col items-center justify-center px-4 py-2 rounded-xl gap-0.5"
        >
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: `${color}99` }}>
                {label}
            </span>
            <span className="text-lg font-black tabular-nums" style={{ color }}>
                {typeof value === 'number' ? value.toLocaleString('tr-TR', { maximumFractionDigits: 1 }) : value}
            </span>
        </div>
    );
}

export default function S1S2Slide() {
    const [isFullscreen, setIsFullscreen] = useState(() => !!document.fullscreenElement);
    const [selectedBolge, setSelectedBolge] = useState('ADANA');
    const [selectedOM, setSelectedOM] = useState('TÜMÜ');
    const [focusedPanel, setFocusedPanel] = useState(null); // 'S1' | 'S2' | null

    const containerRef = useRef(null);

    const bolgeList = useMemo(() => {
        const bolgeler = new Set(s1Data.map(d => d.BOLGE));
        return ['TÜMÜ', ...Array.from(bolgeler).sort()];
    }, []);

    const omList = useMemo(() => {
        if (selectedBolge === 'TÜMÜ') {
            return ['TÜMÜ', ...Array.from(new Set(s1Data.map(d => d.OM))).sort()];
        }
        return ['TÜMÜ', ...Array.from(new Set(s1Data.filter(d => d.BOLGE === selectedBolge).map(d => d.OM))).sort()];
    }, [selectedBolge]);

    useEffect(() => {
        setSelectedOM('TÜMÜ');
    }, [selectedBolge]);

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

    const s1Total = useMemo(() => getTotal(filteredS1Data), [filteredS1Data]);
    const s2Total = useMemo(() => getTotal(filteredS2Data), [filteredS2Data]);

    useEffect(() => {
        const handleFullscreenChange = () => {
            const isFull = !!document.fullscreenElement;
            setIsFullscreen(isFull);
            if (!isFull) {
                setFocusedPanel(null);
                // Fullscreen'den çıkınca data-theme'yi temizle
                containerRef.current?.removeAttribute('data-theme');
            } else {
                // Fullscreen girerken light tema zorla
                containerRef.current?.setAttribute('data-theme', 'light');
            }
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const toggleMainFullscreen = () => {
        if (!document.fullscreenElement) {
            setFocusedPanel(null);
            document.getElementById('presentation-fullscreen-wrapper')?.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    const focusAndFullscreen = (panelType) => {
        if (!document.fullscreenElement) {
            setFocusedPanel(panelType);
            document.getElementById('presentation-fullscreen-wrapper')?.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    // ─── Chart Options
    const getChartOptions = (data, accentColor, totalMode = false) => {
        const categories = data.map(d => d.OM.replace(' OM', ''));
        return {
            chart: {
                type: 'bar',
                stacked: false,
                toolbar: { show: false },
                background: 'transparent',
                fontFamily: 'inherit',
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 900,
                    animateGradually: { enabled: true, delay: 120 },
                    dynamicAnimation: { enabled: true, speed: 400 }
                }
            },
            colors: totalMode
                ? [accentColor]
                : ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'],
            fill: totalMode
                ? {
                    type: 'gradient',
                    gradient: {
                        shade: 'light',
                        type: 'vertical',
                        shadeIntensity: 0.2,
                        gradientToColors: [accentColor === '#6366f1' ? '#818cf8' : '#a78bfa'],
                        opacityFrom: 1,
                        opacityTo: 0.8,
                    }
                }
                : {
                    type: 'gradient',
                    gradient: {
                        shade: 'dark',
                        type: 'vertical',
                        shadeIntensity: 0.3,
                        gradientToColors: ['#818cf8', '#a78bfa', '#f472b6', '#fbbf24', '#34d399'],
                        inverseColors: false,
                        opacityFrom: 1,
                        opacityTo: 0.85,
                    }
                },
            stroke: { show: true, width: 1.5, colors: ['transparent'] },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: totalMode
                        ? (data.length > 10 ? '55%' : '40%')
                        : (data.length > 8 ? '82%' : '65%'),
                    borderRadius: totalMode ? 7 : 5,
                    borderRadiusApplication: 'end',
                    dataLabels: { position: 'center', orientation: 'vertical' },
                }
            },
            dataLabels: {
                enabled: true,
                hideOverflowingLabels: false,
                style: {
                    fontSize: totalMode ? '12px' : '11px',
                    fontWeight: 700,
                    colors: ['black']
                },
                formatter: (val) => (val === 0 || val === 0.0) ? '' : val,
                dropShadow: { enabled: true, top: 1, left: 0, blur: 3, color: '#000', opacity: 0.5 }
            },
            xaxis: {
                categories,
                labels: {
                    style: { colors: '#94a3b8', fontSize: '10px', fontWeight: 600, fontFamily: 'inherit' },
                    rotate: data.length > 5 ? -40 : 0,
                    rotateAlways: data.length > 5,
                },
                axisBorder: { show: false },
                axisTicks: { show: false }
            },
            yaxis: {
                title: {
                    text: totalMode ? 'Toplam Birim (Adet + km)' : 'Göstergeler (Adet / Birim)',
                    style: { color: '#64748b', fontSize: '9px', fontWeight: 700 }
                },
                labels: { style: { colors: '#64748b', fontSize: '10px' } }
            },
            legend: {
                show: false
            },
            grid: {
                borderColor: 'rgba(148,163,184,0.08)',
                strokeDashArray: 5,
                xaxis: { lines: { show: false } },
                padding: { top: -6, bottom: -4 }
            },
            tooltip: {
                theme: 'dark',
                shared: !totalMode,
                intersect: false,
                style: { fontSize: '12px' },
                y: {
                    formatter: totalMode
                        ? (val) => `${val.toLocaleString('tr-TR', { maximumFractionDigits: 1 })} Birim (Toplam)`
                        : (val, { seriesIndex }) =>
                            seriesIndex >= 3 ? `${val} km` : `${val} Adet`
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

    const s1Options = useMemo(() => getChartOptions(filteredS1Data, '#6366f1', false), [filteredS1Data]);
    const s2Options = useMemo(() => getChartOptions(filteredS2Data, '#8b5cf6', false), [filteredS2Data]);
    const s1TotalOptions = useMemo(() => getChartOptions(filteredS1Data, '#6366f1', true), [filteredS1Data]);
    const s2TotalOptions = useMemo(() => getChartOptions(filteredS2Data, '#8b5cf6', true), [filteredS2Data]);

    const activeLabel = selectedBolge === 'TÜMÜ'
        ? 'Tüm Bölgeler'
        : selectedOM === 'TÜMÜ'
            ? selectedBolge
            : `${selectedBolge} / ${selectedOM.replace(' OM', '')}`;

    return (
        <div
            ref={containerRef}
            className={`flex flex-col h-full w-full transition-all duration-700 ease-in-out ${isFullscreen ? 'fixed inset-0 z-50 overflow-y-auto p-8' : ''}`}
            style={isFullscreen ? { background: '#ffffff', color: '#1e293b' } : {}}
        >
            {/* ═══ HEADER SECTION ═══ */}
            <div
                className={`sticky -top-8 -mt-8 -mx-8 px-8 pt-8 pb-4 z-50 bg-base-100/95 backdrop-blur-md shadow-sm border-b border-base-200 mb-5 transition-all duration-500 ease-out ${focusedPanel ? 'opacity-0 h-0 overflow-hidden mb-0 pointer-events-none' : 'opacity-100'}`}
            >
                {/* Title Row */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <div className="flex items-center gap-3">
                        {/* Icon Badge */}
                        <div
                            className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
                            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                        >
                            <BarChart2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-base-content leading-tight">
                                SEVİYE-1 & SEVİYE-2 İş Tipleri Analizi
                            </h2>
                            <p className="text-base-content/50 text-xs mt-0.5 font-medium">
                                Bakım kapsamında gerçekleştirilen işlerin tiplerinin karşılaştırmalı görünümü
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <ExportExcelButton
                            data={[
                                ...filteredS1Data.map(d => ({ 'Seviye Analizi': 'S1', ...d })),
                                ...filteredS2Data.map(d => ({ 'Seviye Analizi': 'S2', ...d }))
                            ]}
                            fileName="S1_S2_Is_Analizi"
                        />
                        <button
                            onClick={toggleMainFullscreen}
                            className="btn btn-sm btn-ghost gap-1.5 text-base-content/60 hover:text-base-content hover:bg-base-200"
                            title={isFullscreen && !focusedPanel ? 'Küçült' : 'Tam Ekran'}
                        >
                            {isFullscreen && !focusedPanel
                                ? <><Minimize size={14} /><span className="text-xs hidden sm:inline">Küçült</span></>
                                : <><Maximize size={14} /><span className="text-xs hidden sm:inline">Tam Ekran</span></>
                            }
                        </button>
                    </div>
                </div>

                {/* Filter + Stats Bar */}
                <div
                    className="rounded-2xl border p-3 flex flex-wrap items-center gap-3"
                    style={{
                        background: 'linear-gradient(135deg, hsl(var(--b2)/0.7) 0%, hsl(var(--b2)/0.4) 100%)',
                        borderColor: 'hsl(var(--b3)/0.8)',
                        backdropFilter: 'blur(8px)',
                    }}
                >
                    {/* Filter Icon */}
                    <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #6366f120 0%, #8b5cf620 100%)', border: '1px solid #6366f130' }}
                    >
                        <SlidersHorizontal size={14} style={{ color: '#818cf8' }} />
                    </div>

                    {/* Bölge Select */}
                    <div className="flex flex-col gap-0.5 min-w-[140px]">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-base-content/40 px-1">Bölge</label>
                        <div className="relative">
                            <select
                                className="select select-sm w-full font-semibold text-sm pr-8 appearance-none"
                                style={{
                                    background: 'hsl(var(--b1)/0.8)',
                                    border: '1px solid hsl(var(--b3))',
                                    borderRadius: '10px',
                                    outline: 'none',
                                    paddingRight: '2rem',
                                }}
                                value={selectedBolge}
                                onChange={(e) => setSelectedBolge(e.target.value)}
                            >
                                {bolgeList.map(b => (
                                    <option key={b} value={b}>{b === 'TÜMÜ' ? 'Tüm Bölgeler' : b}</option>
                                ))}
                            </select>
                            <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-base-content/40" />
                        </div>
                    </div>

                    {/* OM Select */}
                    <div className="flex flex-col gap-0.5 min-w-[160px]">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-base-content/40 px-1">Operasyon MRK</label>
                        <div className="relative">
                            <select
                                className="select select-sm w-full font-semibold text-sm pr-8 appearance-none"
                                style={{
                                    background: 'hsl(var(--b1)/0.8)',
                                    border: '1px solid hsl(var(--b3))',
                                    borderRadius: '10px',
                                    outline: 'none',
                                    paddingRight: '2rem',
                                    opacity: selectedBolge === 'TÜMÜ' && omList.length > 20 ? 0.5 : 1,
                                }}
                                value={selectedOM}
                                onChange={(e) => setSelectedOM(e.target.value)}
                                disabled={selectedBolge === 'TÜMÜ' && omList.length > 20}
                            >
                                {omList.map(om => (
                                    <option key={om} value={om}>{om === 'TÜMÜ' ? 'Tüm Operasyon MRK' : om}</option>
                                ))}
                            </select>
                            <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-base-content/40" />
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="w-px h-10 bg-base-content/10 hidden sm:block" />

                    {/* Active Filter Label */}
                    <div className="flex-1 hidden md:flex items-center gap-2">
                        <Layers size={12} className="text-base-content/30" />
                        <span className="text-[11px] font-bold text-base-content/40">Aktif:</span>
                        <span
                            className="text-xs font-black px-2.5 py-1 rounded-lg"
                            style={{
                                background: 'linear-gradient(135deg, #6366f120, #8b5cf115)',
                                color: '#818cf8',
                                border: '1px solid #6366f130'
                            }}
                        >
                            {activeLabel}
                        </span>
                    </div>

                    {/* Stats Badges */}
                    <div className="flex items-center gap-2 ml-auto">
                        <StatBadge label="S1 Toplam" value={s1Total} color="#6366f1" />
                        <StatBadge label="S2 Toplam" value={s2Total} color="#8b5cf6" />
                    </div>
                </div>
            </div>

            {/* ═══ CHART PANELS ═══ */}
            <div
                className={`flex-1 flex flex-col xl:flex-row gap-5 transition-all duration-700 ease-in-out min-h-0 ${isFullscreen && !focusedPanel ? 'p-6' : !isFullscreen ? '' : 'h-full'}`}
            >
                {/* ── S1 Panel ── */}
                <ChartPanel
                    panelKey="S1"
                    label="SEVİYE-1 BAKIM"
                    accentColor="#6366f1"
                    secondColor="#818cf8"
                    icon={<TrendingUp size={14} />}
                    data={filteredS1Data}
                    series={s1Series}
                    options={s1Options}
                    totalOptions={s1TotalOptions}
                    isFocused={focusedPanel === 'S1'}
                    isHidden={focusedPanel === 'S2'}
                    onFocus={() => focusAndFullscreen('S1')}
                    isFullscreen={isFullscreen}
                />

                {/* ── S2 Panel ── */}
                <ChartPanel
                    panelKey="S2"
                    label="SEVİYE-2 BAKIM"
                    accentColor="#8b5cf6"
                    secondColor="#a78bfa"
                    icon={<TrendingUp size={14} />}
                    data={filteredS2Data}
                    series={s2Series}
                    options={s2Options}
                    totalOptions={s2TotalOptions}
                    isFocused={focusedPanel === 'S2'}
                    isHidden={focusedPanel === 'S1'}
                    onFocus={() => focusAndFullscreen('S2')}
                    isFullscreen={isFullscreen}
                />
            </div>
        </div>
    );
}

// ─── Sub-component: Chart Panel ───────────────────────────────────────────────
function ChartPanel({ panelKey, label, accentColor, secondColor, icon, data, series, options, totalOptions, isFocused, isHidden, onFocus, isFullscreen }) {
    const [isTotalMode, setIsTotalMode] = useState(false);
    const [hiddenSeries, setHiddenSeries] = useState([]);

    // Toplam mod serisi: her OM için tek değer (hook early return'den önce çağrılmalı)
    const totalSeries = useMemo(() => [
        { name: 'Toplam', data: data.map(d => parseFloat((d.BINA + d.DUT + d.SDK + d.AG + d.YG).toFixed(1))) }
    ], [data]);

    const total = getTotal(data);
    const activeSeries = isTotalMode ? totalSeries : series;
    const activeOptions = isTotalMode ? totalOptions : options;

    const toggleSeries = (seriesName) => {
        setHiddenSeries(prev =>
            prev.includes(seriesName)
                ? prev.filter(n => n !== seriesName)
                : [...prev, seriesName]
        );
    };

    const getFilteredData = () => {
        if (isTotalMode) return { finalOptions: activeOptions, finalSeries: activeSeries };

        const filteredIndexes = series.map((s, i) => hiddenSeries.includes(s.name) ? -1 : i).filter(i => i !== -1);
        const finalSeries = filteredIndexes.map(i => series[i]);

        // Match active colors based on filtered indexes
        const finalColors = filteredIndexes.map(i => activeOptions.colors[i]);
        const finalGradientColors = filteredIndexes.map(i => activeOptions.fill.gradient.gradientToColors[i]);

        const finalOptions = {
            ...activeOptions,
            colors: finalColors,
            fill: {
                ...activeOptions.fill,
                gradient: {
                    ...activeOptions.fill.gradient,
                    gradientToColors: finalGradientColors
                }
            }
        };

        return { finalOptions, finalSeries };
    };

    const { finalOptions, finalSeries } = getFilteredData();

    if (isHidden) return null;

    return (
        <div
            className={`flex flex-col relative min-h-[380px] transition-all duration-700 ease-out overflow-hidden ${isFocused ? 'w-full flex-1' : 'w-full xl:w-1/2 flex-1'}`}
            style={{
                background: 'linear-gradient(145deg, hsl(var(--b1)) 0%, hsl(var(--b2)/0.6) 100%)',
                border: `1px solid ${accentColor}22`,
                borderRadius: '20px',
                boxShadow: `0 4px 24px ${accentColor}10, 0 1px 4px rgba(0,0,0,0.12)`,
            }}
        >
            {/* Top accent line */}
            <div
                className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[20px]"
                style={{ background: `linear-gradient(90deg, ${accentColor}, ${secondColor}, transparent)` }}
            />

            {/* Panel Header */}
            <div className="flex items-center justify-between px-5 pt-4 pb-3 flex-shrink-0">
                <div className="flex items-center gap-2.5">
                    <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
                        style={{ background: `linear-gradient(135deg, ${accentColor}, ${secondColor})`, boxShadow: `0 2px 8px ${accentColor}40` }}
                    >
                        {icon}
                    </div>
                    <div>
                        <div className="text-xs font-black tracking-wider" style={{ color: accentColor }}>
                            {label} {isFocused && <span className="opacity-60">— Detaylı Görünüm</span>}
                        </div>
                        <div className="text-[10px] text-base-content/40 font-semibold">
                            {data.length} lokasyon · Toplam{' '}
                            <span className="font-black" style={{ color: accentColor }}>
                                {total.toLocaleString('tr-TR', { maximumFractionDigits: 1 })}
                            </span>{' '}
                            birim
                        </div>
                    </div>
                </div>

                {/* Sağ: Toggle + Büyüt butonu */}
                <div className="flex items-center gap-2">
                    {/* Toplam Toggle */}
                    <button
                        onClick={() => setIsTotalMode(prev => !prev)}
                        title={isTotalMode ? 'Detaylı görünüme geç' : 'Toplam görünüme geç'}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-300"
                        style={isTotalMode
                            ? {
                                background: `linear-gradient(135deg, ${accentColor}25, ${secondColor}15)`,
                                color: accentColor,
                                border: `1px solid ${accentColor}50`,
                                boxShadow: `0 0 10px ${accentColor}20`,
                            }
                            : {
                                background: 'hsl(var(--b2)/0.6)',
                                color: 'hsl(var(--bc)/0.45)',
                                border: '1px solid hsl(var(--b3)/0.6)',
                            }
                        }
                    >
                        <Sigma size={11} />
                        Toplam
                        {/* Pill indicator */}
                        <span
                            className="w-6 h-3.5 rounded-full flex items-center transition-all duration-300 flex-shrink-0"
                            style={{
                                background: isTotalMode ? accentColor : 'hsl(var(--b3))',
                                padding: '2px',
                                justifyContent: isTotalMode ? 'flex-end' : 'flex-start',
                            }}
                        >
                            <span
                                className="w-2.5 h-2.5 rounded-full bg-white block"
                                style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                            />
                        </span>
                    </button>

                    {/* Büyüt butonu */}
                    <button
                        onClick={onFocus}
                        className="btn btn-xs btn-ghost rounded-lg gap-1 text-base-content/40 hover:text-base-content hover:bg-base-200 transition-colors"
                        title={isFocused ? 'Küçült' : 'Bu Grafiği Büyüt'}
                    >
                        {isFocused
                            ? <><Minimize size={12} /><span className="hidden sm:inline text-[10px]">Küçült</span></>
                            : <><Maximize size={12} /><span className="hidden sm:inline text-[10px]">Büyüt</span></>
                        }
                    </button>
                </div>
            </div>

            {/* Custom Sticky Legend */}
            {!isTotalMode && (
                <div className="flex flex-wrap items-center justify-center gap-4 px-4 pb-2">
                    {series.map((s, i) => {
                        const isHiddenItem = hiddenSeries.includes(s.name);
                        const baseColor = options.colors[i];

                        return (
                            <div
                                key={s.name}
                                onClick={() => toggleSeries(s.name)}
                                className="flex items-center gap-1.5 cursor-pointer transition-all hover:opacity-80"
                            >
                                <span
                                    className="w-3 h-3 rounded-full shadow-sm"
                                    style={{
                                        backgroundColor: isHiddenItem ? '#334155' : baseColor,
                                        border: isHiddenItem ? '1px solid #475569' : 'none'
                                    }}
                                />
                                <span
                                    className={`text-[11px] font-bold ${isHiddenItem ? 'text-base-content/30 line-through' : 'text-base-content/70'}`}
                                >
                                    {s.name}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Separator */}
            <div className="mx-5 mb-2" style={{ height: '1px', background: `linear-gradient(90deg, ${accentColor}20, transparent)` }} />

            {/* Chart Area */}
            <div className="flex-1 w-full px-2 pb-3 min-h-0 overflow-x-auto overflow-y-hidden" style={{ scrollbarWidth: 'thin' }}>
                {data.length > 0 ? (
                    <div className="h-full min-h-[300px]" style={{ minWidth: data.length > 8 ? `${data.length * (isTotalMode ? 45 : 80)}px` : '100%' }}>
                        <Chart
                            key={`${panelKey}-${isTotalMode}-${hiddenSeries.join('-')}`}
                            options={finalOptions}
                            series={finalSeries}
                            type="bar"
                            height="100%"
                        />
                    </div>
                ) : (
                    <div className="flex w-full h-full items-center justify-center flex-col gap-3">
                        <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center opacity-20"
                            style={{ background: `${accentColor}20` }}
                        >
                            <BarChart2 size={28} style={{ color: accentColor }} />
                        </div>
                        <p className="text-base-content/40 font-semibold text-sm">Bu filtreye uygun veri bulunamadı.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
