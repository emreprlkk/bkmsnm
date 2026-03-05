import React, { useState, useMemo, useRef, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { LayoutGrid, Table2, Filter, TrendingUp, FileText, Wallet, AlertCircle, Maximize, Minimize } from 'lucide-react';
import { contractData } from '../../data/mockData';

// ─── helpers ────────────────────────────────────────────────────────────────
const fmtCurrency = (val) =>
    new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(val);

const fmtShort = (val) => {
    const n = Number(val);
    if (isNaN(n)) return String(val);      // string gelirse bozmadan döndür
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)} M₺`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)} K₺`;
    return `${n.toFixed(0)} ₺`;
};

const dolulukColor = (d) => {
    if (d >= 90) return '#10b981';
    if (d >= 75) return '#f59e0b';
    return '#ef4444';
};

const BM_COLORS = {
    ADANA: '#6366f1',
    GAZİANTEP: '#f59e0b',
    HATAY: '#ec4899',
    MERSİN: '#10b981',
    TOROSLAR: '#3b82f6',
};

// ─── Stat Kartı ─────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, accent, fs }) {
    return (
        <div
            className="rounded-2xl flex flex-col gap-1 border border-base-200 bg-base-100 shadow-sm"
            style={{ borderLeftColor: accent, borderLeftWidth: 4, padding: fs ? '18px 20px' : '14px 16px' }}
        >
            <div className="flex items-center gap-2 opacity-60 font-bold uppercase tracking-widest" style={{ fontSize: fs ? 11 : 10 }}>
                <Icon size={fs ? 15 : 13} style={{ color: accent }} /> {label}
            </div>
            <div className="font-extrabold text-base-content leading-tight" style={{ fontSize: fs ? 22 : 18 }}>{value}</div>
            {sub && <div className="text-base-content/50" style={{ fontSize: fs ? 12 : 10 }}>{sub}</div>}
        </div>
    );
}

// ─── Ana Component ──────────────────────────────────────────────────────────
export default function YukleniciGerceklesme2025() {
    const containerRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const [view, setView] = useState('table');
    const [bmFilter, setBmFilter] = useState('TÜMÜ');
    const [yukFilter, setYukFilter] = useState('TÜMÜ');
    const [chartMetric, setChartMetric] = useState('toplamHakEdis');
    const [sortKey, setSortKey] = useState('doluluk');
    const [sortDir, setSortDir] = useState('desc');

    // ─── Fullscreen API ───────────────────────────────────────────────────
    useEffect(() => {
        const onChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', onChange);
        return () => document.removeEventListener('fullscreenchange', onChange);
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    // ─── Filtre verileri ──────────────────────────────────────────────────
    const bmList = useMemo(() => ['TÜMÜ', ...Array.from(new Set(contractData.map(d => d.bm))).sort()], []);

    const yukList = useMemo(() => {
        const base = bmFilter === 'TÜMÜ' ? contractData : contractData.filter(d => d.bm === bmFilter);
        return ['TÜMÜ', ...Array.from(new Set(base.map(d => d.yuklenici))).sort()];
    }, [bmFilter]);

    const filtered = useMemo(() =>
        contractData.filter(d => {
            if (bmFilter !== 'TÜMÜ' && d.bm !== bmFilter) return false;
            if (yukFilter !== 'TÜMÜ' && d.yuklenici !== yukFilter) return false;
            return true;
        }), [bmFilter, yukFilter]);

    const sorted = useMemo(() =>
        [...filtered].sort((a, b) => {
            const av = a[sortKey], bv = b[sortKey];
            if (typeof av === 'number') return sortDir === 'asc' ? av - bv : bv - av;
            return sortDir === 'asc'
                ? String(av).localeCompare(String(bv), 'tr')
                : String(bv).localeCompare(String(av), 'tr');
        }), [filtered, sortKey, sortDir]);

    const handleSort = (key) => {
        if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
        else { setSortKey(key); setSortDir('desc'); }
    };

    const totals = useMemo(() =>
        filtered.reduce((acc, d) => ({
            bedel: acc.bedel + d.sozlesmeBedeli,
            hakEdis: acc.hakEdis + d.toplamHakEdis,
            kalan: acc.kalan + d.kalanHakEdis,
        }), { bedel: 0, hakEdis: 0, kalan: 0 }), [filtered]);

    const avgDoluluk = useMemo(() =>
        filtered.length ? filtered.reduce((a, d) => a + d.doluluk, 0) / filtered.length : 0,
        [filtered]);

    // ─── Chart serisi: her BM ayrı seri, eşleşmeyenler null ─────────────────
    // Bu yapı sayesinde ApexCharts built-in legend BM bazında filtre/highlight yapar
    const BM_KEYS = Object.keys(BM_COLORS); // ['ADANA', 'GAZİANTEP', 'HATAY', 'MERSİN', 'TOROSLAR']

    const metricLabel = {
        sozlesmeBedeli: 'Sözleşme Bedeli',
        toplamHakEdis: 'Yapılan Toplam Hak Ediş',
        kalanHakEdis: 'Kalan Hak Ediş',
        doluluk: 'Doluluk (%)',
    };

    // Sol taraftaki sözleşme adı etiketleri için BM renk dizisi
    const yAxisColors = useMemo(() =>
        sorted.map(d => BM_COLORS[d.bm] || '#94a3b8'),
        [sorted]
    );

    const chartOptions = useMemo(() => ({
        chart: {
            type: 'bar',
            toolbar: { show: false },
            background: 'transparent',
            fontFamily: 'inherit',
            offsetX: isFullscreen ? 80 : 50,
            animations: { enabled: true, easing: 'easeinout', speed: 700, animateGradually: { enabled: true, delay: 80 } },
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: isFullscreen ? '72%' : '65%',
                borderRadius: 6,
                distributed: false,  // çok serili yapıda false olmalı
                dataLabels: { position: 'right' },
            },
        },
        // Her BM serisi kendi rengiyle örtüŜüyor
        colors: BM_KEYS.map(bm => BM_COLORS[bm]),
        fill: {
            type: 'gradient',
            gradient: {
                type: 'horizontal',
                shadeIntensity: 0.35,
                opacityFrom: 1,
                opacityTo: 0.75,
                stops: [0, 100],
            },
        },
        dataLabels: {
            enabled: true,
            formatter: (val) => {
                if (val === null || val === undefined) return '';
                const n = Number(val);
                if (isNaN(n) || n === 0) return '';
                return chartMetric === 'doluluk' ? `%${n.toFixed(1)}` : fmtShort(n);
            },
            style: { fontSize: isFullscreen ? '14px' : '12px', fontWeight: 700, colors: ['#1a1b1dff'] },
            offsetX: 8,
        },
        // ApexCharts horizontal bar eksen davranışı:
        // xaxis.labels → ALT değer ekseni (sayı)
        // yaxis.labels → SOL kategori ekseni (sözleşme adı string'i)
        xaxis: {
            categories: sorted.map(d =>
                d.sozlesmeAdi.length > 42 ? d.sozlesmeAdi.slice(0, 42) + '…' : d.sozlesmeAdi
            ),
            labels: {
                style: { colors: '#64748b', fontSize: isFullscreen ? '11px' : '9px' },
                formatter: (val) => {
                    const n = Number(val);
                    if (isNaN(n)) return val;
                    return chartMetric === 'doluluk' ? `%${n.toFixed(0)}` : fmtShort(n);
                },
            },
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: {
            labels: {
                style: {
                    // Her sözleşme adı kendi BM rengiyle görünür
                    colors: yAxisColors,
                    fontSize: isFullscreen ? '12px' : '10px',
                    fontWeight: 700,
                },
                maxWidth: isFullscreen ? 360 : 280,
            },
        },
        grid: {
            borderColor: 'rgba(255,255,255,0.06)',
            strokeDashArray: 4,
            yaxis: { lines: { show: false } },
        },
        tooltip: {
            theme: 'dark',
            shared: false,
            y: {
                formatter: (val) => {
                    if (val === null || val === undefined) return '';
                    return chartMetric === 'doluluk' ? `%${Number(val).toFixed(2)}` : fmtCurrency(val);
                },
            },
        },
        // ★ ApexCharts built-in legend → BM bazında click=toggle, hover=highlight
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'right',
            fontSize: isFullscreen ? '13px' : '11px',
            fontWeight: 700,
            labels: { colors: BM_KEYS.map(bm => BM_COLORS[bm]) },
            markers: {
                width: isFullscreen ? 14 : 10,
                height: isFullscreen ? 14 : 10,
                radius: 12,
                fillColors: BM_KEYS.map(bm => BM_COLORS[bm]),
            },
            itemMargin: { horizontal: 10, vertical: 4 },
            onItemClick: { toggleDataSeries: true },
            onItemHover: { highlightDataSeries: true },
        },
    }), [sorted, chartMetric, isFullscreen, yAxisColors]);

    // Her BM ayrı seri: eşleşmeyen pozisyonlar null
    const chartSeries = useMemo(() =>
        BM_KEYS.map(bm => ({
            name: bm,
            data: sorted.map(d =>
                d.bm === bm
                    ? (chartMetric === 'doluluk' ? d.doluluk : d[chartMetric])
                    : null
            ),
        })),
        [sorted, chartMetric]
    );

    // ─── Tablo kolon yardımcısı ───────────────────────────────────────────
    const SortIcon = ({ col }) => {
        if (sortKey !== col) return <span className="opacity-20 ml-1">↕</span>;
        return <span className="ml-1 text-primary">{sortDir === 'asc' ? '↑' : '↓'}</span>;
    };

    const Th = ({ label, col, align = 'left' }) => (
        <th
            className={`cursor-pointer select-none whitespace-nowrap ${align === 'right' ? 'text-right' : 'text-left'}`}
            style={{ padding: isFullscreen ? '14px 16px' : '10px 12px' }}
            onClick={() => handleSort(col)}
        >
            <span
                className="font-bold uppercase tracking-wider opacity-70"
                style={{ fontSize: isFullscreen ? 13 : 11 }}
            >{label}</span>
            <SortIcon col={col} />
        </th>
    );

    const fs = isFullscreen; // shorthand

    return (
        <div
            ref={containerRef}
            className={`flex flex-col w-full gap-4 transition-all duration-300 ${fs
                ? 'fixed inset-0 z-50 bg-base-100 overflow-y-auto p-8'
                : 'h-full'
                }`}
        >
            {/* ── Başlık ── */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                    <h2
                        className="font-extrabold text-base-content flex items-center gap-2"
                        style={{ fontSize: fs ? 28 : 22 }}
                    >
                        <FileText className="text-primary" size={fs ? 28 : 22} />
                        TOROSLAR EDAŞ - 2025 Yüklenici Gerçekleşmeleri
                    </h2>
                    <p className="text-base-content/50 mt-0.5" style={{ fontSize: fs ? 14 : 12 }}>
                        Sözleşme bazlı hak ediş ve doluluk takibi
                    </p>
                </div>

                {/* Filtreler + Togglelar */}
                <div className="flex flex-wrap items-center gap-2 bg-base-200/60 p-2 rounded-xl border border-base-200 shadow-sm">
                    <div className="flex items-center gap-1.5 text-primary mr-1">
                        <Filter size={14} />
                        <span className="text-xs font-bold uppercase tracking-wider">Filtre</span>
                    </div>

                    <select
                        className="select select-bordered bg-base-100 font-semibold"
                        style={{ fontSize: fs ? 14 : 13, height: fs ? 40 : 32, minWidth: fs ? 160 : 130 }}
                        value={bmFilter}
                        onChange={(e) => { setBmFilter(e.target.value); setYukFilter('TÜMÜ'); }}
                    >
                        {bmList.map(b => <option key={b} value={b}>{b === 'TÜMÜ' ? 'Tüm BM' : b}</option>)}
                    </select>

                    <select
                        className="select select-bordered bg-base-100 font-semibold"
                        style={{ fontSize: fs ? 14 : 13, height: fs ? 40 : 32, minWidth: fs ? 180 : 150 }}
                        value={yukFilter}
                        onChange={(e) => setYukFilter(e.target.value)}
                    >
                        {yukList.map(y => <option key={y} value={y}>{y === 'TÜMÜ' ? 'Tüm Yükleniciler' : y}</option>)}
                    </select>

                    <div className="w-px h-6 bg-base-content/10 mx-1" />

                    {/* Table / Chart Toggle */}
                    <div className="flex items-center bg-base-100 rounded-lg border border-base-200 p-0.5 shadow-inner">
                        <button
                            className={`btn gap-1 ${fs ? 'btn-sm' : 'btn-xs'} ${view === 'table' ? 'btn-primary shadow' : 'btn-ghost opacity-60'}`}
                            onClick={() => setView('table')}
                        >
                            <Table2 size={fs ? 15 : 13} /> Tablo
                        </button>
                        <button
                            className={`btn gap-1 ${fs ? 'btn-sm' : 'btn-xs'} ${view === 'chart' ? 'btn-primary shadow' : 'btn-ghost opacity-60'}`}
                            onClick={() => setView('chart')}
                        >
                            <LayoutGrid size={fs ? 15 : 13} /> Grafik
                        </button>
                    </div>

                    <div className="w-px h-6 bg-base-content/10 mx-1" />

                    {/* Tam Ekran Butonu */}
                    <button
                        className={`btn ${fs ? 'btn-sm' : 'btn-xs'} btn-outline shadow-sm bg-base-100`}
                        onClick={toggleFullscreen}
                        title={fs ? 'Küçült' : 'Tam Ekran'}
                    >
                        {fs ? <Minimize size={fs ? 16 : 14} /> : <Maximize size={14} />}
                        <span className="hidden sm:inline ml-1">{fs ? 'Küçült' : 'Tam Ekran'}</span>
                    </button>
                </div>
            </div>

            {/* ── Özet Stat Kartları ── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <StatCard icon={FileText} label="Sözleşme Bedeli" value={fmtShort(totals.bedel)} sub={`${filtered.length} sözleşme`} accent="#6366f1" fs={fs} />
                <StatCard icon={TrendingUp} label="bBasılan Toplam Hak Ediş" value={fmtShort(totals.hakEdis)} sub={`%${((totals.hakEdis / totals.bedel) * 100 || 0).toFixed(1)} doluluk`} accent="#10b981" fs={fs} />
                <StatCard icon={Wallet} label="Kalan Hak Ediş" value={fmtShort(totals.kalan)} sub="Kalan Toplam Hakediş Tutarı" accent="#f59e0b" fs={fs} />
                <StatCard icon={AlertCircle} label="Ort. Sözleşme Doluluk Yüzdesi" value={`%${avgDoluluk.toFixed(1)}`} sub={avgDoluluk >= 90 ? 'Doluluk' : avgDoluluk >= 75 ? 'Doluluk oranı' : 'Doluluk oranı'} accent={dolulukColor(avgDoluluk)} fs={fs} />
            </div>

            {/* ── İçerik ── */}
            <div
                className="overflow-hidden rounded-2xl border border-base-200 bg-base-100 shadow-md flex flex-col"
                style={{ flex: 1, minHeight: fs ? 'calc(100vh - 340px)' : 0 }}
            >
                {view === 'table' ? (
                    <div className="overflow-auto flex-1">
                        <table className="w-full border-collapse">
                            <thead className="sticky top-0 z-10 bg-base-200">
                                <tr>
                                    <th className="text-left" style={{ padding: fs ? '14px 16px' : '10px 12px' }}>
                                        <span className="font-bold uppercase tracking-wider opacity-70" style={{ fontSize: fs ? 13 : 11 }}>BM</span>
                                    </th>
                                    <Th label="Sözleşme Adı" col="sozlesmeAdi" />
                                    <Th label="Yüklenici" col="yuklenici" />
                                    <Th label="Bedel" col="sozlesmeBedeli" align="right" />
                                    <Th label="Hak Ediş" col="toplamHakEdis" align="right" />
                                    <Th label="Kalan" col="kalanHakEdis" align="right" />
                                    <Th label="Doluluk" col="doluluk" align="right" />
                                </tr>
                            </thead>
                            <tbody>
                                {sorted.map((row, i) => (
                                    <tr
                                        key={row.sozlesmeNo}
                                        className={`hover:bg-base-200/50 transition-colors duration-150 ${i % 2 === 0 ? 'bg-base-100' : 'bg-base-200/25'}`}
                                    >
                                        {/* BM pill */}
                                        <td style={{ padding: fs ? '12px 16px' : '8px 12px' }}>
                                            <span
                                                className="rounded-full font-bold whitespace-nowrap"
                                                style={{
                                                    backgroundColor: `${BM_COLORS[row.bm] || '#6366f1'}22`,
                                                    color: BM_COLORS[row.bm] || '#6366f1',
                                                    fontSize: fs ? 13 : 11,
                                                    padding: fs ? '4px 10px' : '2px 8px',
                                                }}
                                            >
                                                {row.bm}
                                            </span>
                                        </td>
                                        <td style={{ padding: fs ? '12px 16px' : '8px 12px', maxWidth: fs ? 300 : 220 }}>
                                            <div className="font-semibold text-base-content leading-tight" style={{ fontSize: fs ? 14 : 11 }}>
                                                {row.sozlesmeAdi}
                                            </div>
                                            <div className="text-base-content/40 font-mono mt-0.5" style={{ fontSize: fs ? 11 : 9 }}>
                                                {row.sozlesmeNo}
                                            </div>
                                        </td>
                                        <td style={{ padding: fs ? '12px 16px' : '8px 12px' }}>
                                            <span
                                                className="rounded-lg font-bold bg-base-200 text-base-content/70"
                                                style={{ fontSize: fs ? 13 : 11, padding: fs ? '4px 10px' : '2px 6px' }}
                                            >
                                                {row.yuklenici}
                                            </span>
                                        </td>
                                        <td className="text-right font-mono text-base-content/70" style={{ padding: fs ? '12px 16px' : '8px 12px', fontSize: fs ? 14 : 11 }}>
                                            {fmtShort(row.sozlesmeBedeli)}
                                        </td>
                                        <td className="text-right font-mono font-semibold text-base-content" style={{ padding: fs ? '12px 16px' : '8px 12px', fontSize: fs ? 14 : 11 }}>
                                            {fmtShort(row.toplamHakEdis)}
                                        </td>
                                        <td className="text-right font-mono text-base-content/60" style={{ padding: fs ? '12px 16px' : '8px 12px', fontSize: fs ? 14 : 11 }}>
                                            {fmtShort(row.kalanHakEdis)}
                                        </td>
                                        <td className="text-right" style={{ padding: fs ? '12px 16px' : '8px 12px', minWidth: fs ? 130 : 90 }}>
                                            <div className="flex items-center justify-end gap-2">
                                                <div
                                                    className="rounded-full bg-base-200 overflow-hidden"
                                                    style={{ width: fs ? 80 : 56, height: fs ? 6 : 5 }}
                                                >
                                                    <div
                                                        className="h-full rounded-full transition-all duration-500"
                                                        style={{
                                                            width: `${row.doluluk}%`,
                                                            backgroundColor: dolulukColor(row.doluluk),
                                                        }}
                                                    />
                                                </div>
                                                <span
                                                    className="font-bold text-right"
                                                    style={{
                                                        color: dolulukColor(row.doluluk),
                                                        fontSize: fs ? 14 : 11,
                                                        minWidth: fs ? 52 : 40,
                                                    }}
                                                >
                                                    %{row.doluluk.toFixed(1)}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {/* Toplam satırı */}
                                <tr className="border-t-2 border-base-300 bg-base-200/60 font-bold">
                                    <td colSpan={3} style={{ padding: fs ? '14px 16px' : '10px 12px' }}>
                                        <span className="uppercase tracking-wider opacity-70" style={{ fontSize: fs ? 13 : 11 }}>GENEL TOPLAM</span>
                                        <span
                                            className="ml-2 rounded-full bg-primary text-primary-content font-bold"
                                            style={{ fontSize: fs ? 12 : 10, padding: fs ? '3px 10px' : '1px 7px' }}
                                        >
                                            {filtered.length} Sözleşme
                                        </span>
                                    </td>
                                    <td className="text-right font-mono" style={{ padding: fs ? '14px 16px' : '10px 12px', fontSize: fs ? 14 : 11 }}>
                                        {fmtShort(totals.bedel)}
                                    </td>
                                    <td className="text-right font-mono text-success" style={{ padding: fs ? '14px 16px' : '10px 12px', fontSize: fs ? 14 : 11 }}>
                                        {fmtShort(totals.hakEdis)}
                                    </td>
                                    <td className="text-right font-mono text-warning" style={{ padding: fs ? '14px 16px' : '10px 12px', fontSize: fs ? 14 : 11 }}>
                                        {fmtShort(totals.kalan)}
                                    </td>
                                    <td className="text-right" style={{ padding: fs ? '14px 16px' : '10px 12px' }}>
                                        <span
                                            className="font-extrabold"
                                            style={{ color: dolulukColor(avgDoluluk), fontSize: fs ? 16 : 13 }}
                                        >
                                            %{avgDoluluk.toFixed(1)}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex flex-col flex-1 overflow-hidden p-4">
                        {/* Metrik Seçici */}
                        <div className="flex flex-wrap gap-2 mb-3">
                            {Object.entries(metricLabel).map(([key, label]) => (
                                <button
                                    key={key}
                                    className={`btn ${fs ? 'btn-sm' : 'btn-xs'} ${chartMetric === key ? 'btn-primary' : 'btn-ghost border border-base-300 opacity-60 hover:opacity-100'}`}
                                    onClick={() => setChartMetric(key)}
                                >
                                    {label}
                                </button>
                            ))}
                            {/* BM lejantı artık ApexCharts built-in legend'dan geliyor — burada sadece bilgi notu */}
                            <span className="ml-auto text-base-content/30 text-xs self-center italic hidden sm:block">
                                Aşağıdaki kısımdan il bazlı filtrelemelri grafik üzeirnden otomatik yapabilirisinizz
                            </span>
                        </div>

                        <div className="flex-1 min-h-0">
                            {sorted.length > 0 ? (
                                <Chart
                                    options={chartOptions}
                                    series={chartSeries}
                                    type="bar"
                                    height="100%"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-base-content/40 font-semibold">
                                    Seçilen filtreye uygun veri bulunamadı.
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
