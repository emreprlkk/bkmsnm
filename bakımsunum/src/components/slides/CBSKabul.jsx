import React, { useState, useRef, useEffect, useMemo } from 'react';
import { CheckCircle2, XCircle, Maximize, Minimize, ArrowUpDown, ArrowUp, ArrowDown, Search, X, Filter, BarChart3, PieChart as PieIcon } from 'lucide-react';
import { kabulRetData } from '../../data/mockData';
import ExportExcelButton from '../ExportExcelButton';
import Chart from 'react-apexcharts';

// ── Sütun tanımları ────────────────────────────────────────────────────────────
const COLUMNS = [
    { key: 'bm', label: 'Bölge (BM)', align: 'left', numeric: false, sortable: true },
    { key: 'om', label: 'Operasyon Merkezi (OM)', align: 'left', numeric: false, sortable: true },
    { key: 'kabul', label: 'Kabul Edilen', align: 'right', numeric: true, sortable: true },
    { key: 'ret', label: 'Reddedilen', align: 'right', numeric: true, sortable: true },
    { key: 'toplam', label: 'Toplam Başvuru', align: 'right', numeric: true, sortable: true },
    { key: 'oran', label: 'Başarı Oranı (%)', align: 'right', numeric: true, sortable: true },
];

// ── Sort ikonu ────────────────────────────────────────────────────────────────
function SortIcon({ column, sortKey, sortDir }) {
    if (sortKey !== column) return <ArrowUpDown size={13} className="opacity-30" />;
    return sortDir === 'asc'
        ? <ArrowUp size={13} className="text-primary" />
        : <ArrowDown size={13} className="text-primary" />;
}

const getBmStyle = (bm) => {
    switch (bm.toUpperCase()) {
        case 'ADANA': return { badge: 'bg-orange-100 text-orange-700 border-orange-200', row: 'border-l-orange-500' };
        case 'MERSİN': return { badge: 'bg-sky-100 text-sky-700 border-sky-200', row: 'border-l-sky-500' };
        case 'HATAY': return { badge: 'bg-emerald-100 text-emerald-700 border-emerald-200', row: 'border-l-emerald-500' };
        case 'GAZİANTEP': return { badge: 'bg-purple-100 text-purple-700 border-purple-200', row: 'border-l-purple-500' };
        case 'OSMANİYE': return { badge: 'bg-amber-100 text-amber-700 border-amber-200', row: 'border-l-amber-500' };
        default: return { badge: 'bg-slate-100 text-slate-700 border-slate-200', row: 'border-l-slate-400' };
    }
};

export default function CBSKabul() {
    const [sortKey, setSortKey] = useState('oran');
    const [sortDir, setSortDir] = useState('desc');
    const [search, setSearch] = useState('');
    const [bmFilter, setBmFilter] = useState('HEPSİ');
    const [activeView, setActiveView] = useState('chart'); // 'chart' or 'table'
    const [isFullscreen, setIsFullscreen] = useState(() => !!document.fullscreenElement);
    const containerRef = useRef(null);

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

    // Veriyi zenginleştirelim (toplam ve oranlar)
    const processedData = useMemo(() => {
        return kabulRetData.map(item => {
            const toplam = item.kabul + item.ret;
            const oran = toplam > 0 ? (item.kabul / toplam) * 100 : 0;
            return {
                ...item,
                toplam,
                oran: parseFloat(oran.toFixed(1))
            };
        });
    }, []);

    const uniqueBms = useMemo(
        () => ['HEPSİ', ...new Set(processedData.map((r) => r.bm))].sort(),
        [processedData]
    );

    const filtered = useMemo(() => {
        let rows = processedData;
        if (bmFilter !== 'HEPSİ') {
            rows = rows.filter(r => r.bm === bmFilter);
        }
        const q = search.trim().toLowerCase();
        if (q) {
            rows = rows.filter(r => 
                r.om.toLowerCase().includes(q) || 
                r.bm.toLowerCase().includes(q)
            );
        }
        return rows;
    }, [processedData, search, bmFilter]);

    const sorted = useMemo(() => {
        if (!sortKey) return filtered;
        return [...filtered].sort((a, b) => {
            const av = a[sortKey];
            const bv = b[sortKey];
            
            if (typeof av === 'number') {
                return sortDir === 'asc' ? av - bv : bv - av;
            } else {
                return sortDir === 'asc' 
                    ? String(av).localeCompare(String(bv), 'tr') 
                    : String(bv).localeCompare(String(av), 'tr');
            }
        });
    }, [filtered, sortKey, sortDir]);

    const handleSort = (key) => {
        if (sortKey === key) {
            setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDir('desc');
        }
    };

    // Özet istatistikler
    const totals = useMemo(() => {
        const k = filtered.reduce((acc, curr) => acc + curr.kabul, 0);
        const r = filtered.reduce((acc, curr) => acc + curr.ret, 0);
        const t = k + r;
        const o = t > 0 ? (k / t) * 100 : 0;
        return { kabul: k, ret: r, toplam: t, oran: o.toFixed(1) };
    }, [filtered]);

    // Chart Options
    const chartOptions = {
        chart: {
            type: 'bar',
            stacked: false,
            toolbar: { show: true },
            zoom: { enabled: true },
            fontFamily: 'Inter, sans-serif'
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                borderRadius: 4,
                dataLabels: { position: 'top' }
            },
        },
        dataLabels: {
            enabled: true,
            formatter: (val) => val,
            offsetY: -20,
            style: {
                fontSize: '10px',
                colors: ["#304758"]
            }
        },
        stroke: { show: true, width: 2, colors: ['transparent'] },
        xaxis: {
            categories: sorted.map(item => item.om),
            labels: {
                rotate: -45,
                style: { fontSize: '11px', fontWeight: 600 }
            }
        },
        yaxis: {
            title: { text: 'Başvuru Sayısı', style: { fontWeight: 700 } }
        },
        fill: { opacity: 1 },
        colors: ['#10b981', '#ef4444'], // Kabul: Yeşil, Ret: Kırmızı
        tooltip: {
            y: {
                formatter: (val) => val + " Başvuru"
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            fontWeight: 600
        },
        title: {
            text: `${bmFilter === 'HEPSİ' ? 'Tüm' : bmFilter} Bölgeleri CBS Kabul/Ret Analizi`,
            align: 'left',
            style: { fontSize: '18px', fontWeight: 900, color: '#1e293b' }
        }
    };

    const chartSeries = [
        { name: 'Kabul Edilen', data: sorted.map(item => item.kabul) },
        { name: 'Reddedilen', data: sorted.map(item => item.ret) }
    ];

    const outerClass = isFullscreen
        ? 'fixed inset-0 z-50 bg-slate-50 flex flex-col overflow-hidden'
        : 'h-full w-full flex flex-col bg-slate-50/30 overflow-hidden';

    return (
        <div ref={containerRef} className={outerClass}>
            {/* ── Fixed Header Section ── */}
            <div className="flex flex-col gap-4 p-6 pb-2 shrink-0">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-3xl shadow-sm border border-slate-200">
                    <div>
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                            <CheckCircle2 className="text-emerald-500" size={28} />
                            2025 yılı-Seviye-3 Projeleri- CBS Kabul/Ret Analizi
                        </h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <ExportExcelButton data={sorted} fileName="CBS_Kabul_Analiz" />
                        <button
                            onClick={toggleFullscreen}
                            className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all shadow-sm"
                        >
                            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                        </button>
                    </div>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="bg-white p-3 px-4 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                            <BarChart3 size={18} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Başvuru</p>
                            <p className="text-lg font-black text-slate-800">{totals.toplam}</p>
                        </div>
                    </div>
                    <div className="bg-white p-3 px-4 rounded-2xl shadow-sm border border-emerald-100 flex items-center gap-3">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                            <CheckCircle2 size={18} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kabul</p>
                            <p className="text-lg font-black text-emerald-600">{totals.kabul}</p>
                        </div>
                    </div>
                    <div className="bg-white p-3 px-4 rounded-2xl shadow-sm border border-red-100 flex items-center gap-3">
                        <div className="p-2 bg-red-50 text-red-600 rounded-xl">
                            <XCircle size={18} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ret</p>
                            <p className="text-lg font-black text-red-600">{totals.ret}</p>
                        </div>
                    </div>
                    <div className="bg-white p-3 px-4 rounded-2xl shadow-sm border border-amber-100 flex items-center gap-3">
                        <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                            <TrendingUpIcon size={18} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Oran</p>
                            <p className="text-lg font-black text-amber-600">%{totals.oran}</p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                        <Filter size={14} className="text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Bölge:</span>
                        <select 
                            value={bmFilter}
                            onChange={(e) => setBmFilter(e.target.value)}
                            className="bg-transparent text-xs font-black text-slate-700 focus:outline-none cursor-pointer"
                        >
                            {uniqueBms.map(bm => (
                                <option key={bm} value={bm}>{bm}</option>
                            ))}
                        </select>
                    </div>

                    <div className="relative flex-1 min-w-[200px]">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Arama..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none"
                        />
                    </div>

                    <div className="join bg-slate-100 p-1 rounded-xl shrink-0">
                        <button 
                            onClick={() => setActiveView('chart')}
                            className={`join-item px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeView === 'chart' ? 'bg-white shadow-sm text-primary' : 'text-slate-500'}`}
                        >
                            <BarChart3 size={14} /> Grafik
                        </button>
                        <button 
                            onClick={() => setActiveView('table')}
                            className={`join-item px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeView === 'table' ? 'bg-white shadow-sm text-primary' : 'text-slate-500'}`}
                        >
                            <PieIcon size={14} /> Tablo
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Scrollable Content Area ── */}
            <div className="flex-1 overflow-hidden px-6 pb-6">
                <div className="bg-white h-full rounded-[1.5rem] shadow-xl border border-slate-200 overflow-hidden flex flex-col">
                    {activeView === 'chart' ? (
                        <div className="p-4 flex-1 overflow-hidden">
                            <Chart 
                                options={{
                                    ...chartOptions,
                                    chart: { ...chartOptions.chart, height: '100%', width: '100%' }
                                }}
                                series={chartSeries}
                                type="bar"
                                height="100%"
                                width="100%"
                            />
                        </div>
                    ) : (
                        <div className="flex-1 overflow-auto">
                            <table className="w-full border-separate border-spacing-0">
                                <thead className="sticky top-0 z-10">
                                    <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-widest shadow-sm">
                                        {COLUMNS.map(col => (
                                            <th 
                                                key={col.key}
                                                onClick={() => col.sortable && handleSort(col.key)}
                                                className={`px-6 py-4 text-left border-b border-slate-200 bg-slate-50 ${col.sortable ? 'cursor-pointer hover:bg-slate-100 transition-colors' : ''} ${col.align === 'right' ? 'text-right' : ''}`}
                                            >
                                                <div className={`flex items-center gap-2 ${col.align === 'right' ? 'justify-end' : ''}`}>
                                                    {col.label}
                                                    {col.sortable && <SortIcon column={col.key} sortKey={sortKey} sortDir={sortDir} />}
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {sorted.length === 0 ? (
                                        <tr>
                                            <td colSpan={COLUMNS.length} className="py-20 text-center text-slate-400 font-medium text-sm">
                                                Sonuç bulunamadı...
                                            </td>
                                        </tr>
                                    ) : (
                                        sorted.map((row) => {
                                            const styles = getBmStyle(row.bm);
                                            return (
                                                <tr key={row.om} className={`hover:bg-slate-50/50 transition-colors border-l-4 ${styles.row}`}>
                                                    <td className="px-6 py-3">
                                                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-black border ${styles.badge}`}>
                                                            {row.bm}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-3 text-slate-700 font-bold text-sm">
                                                        {row.om}
                                                    </td>
                                                    <td className="px-6 py-3 text-right">
                                                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                                                            {row.kabul}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-3 text-right">
                                                        <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-700 text-xs font-bold">
                                                            {row.ret}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-3 text-right text-slate-500 font-black tabular-nums text-xs">
                                                        {row.toplam}
                                                    </td>
                                                    <td className="px-6 py-3 text-right">
                                                        <div className="flex items-center justify-end gap-3">
                                                            <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
                                                                <div 
                                                                    className="h-full bg-emerald-500 rounded-full" 
                                                                    style={{ width: `${row.oran}%` }}
                                                                />
                                                            </div>
                                                            <span className={`text-xs font-black ${row.oran > 70 ? 'text-emerald-600' : row.oran > 40 ? 'text-amber-600' : 'text-red-600'}`}>
                                                                %{row.oran}
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
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

const TrendingUpIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
);
