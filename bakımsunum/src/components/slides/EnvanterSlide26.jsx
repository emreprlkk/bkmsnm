import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ClipboardList, Maximize, Minimize, ArrowUpDown, ArrowUp, ArrowDown, Search, X } from 'lucide-react';
import { envanterS3Data } from '../../data/mockData';
import ExportExcelButton from '../ExportExcelButton';

// ── Bölge renk haritası ───────────────────────────────────────────────────────
const BOLGE_COLORS = {
    'ADANA': { bg: 'rgba(239,68,68,0.10)', text: '#b91c1c', dot: '#ef4444' },
    'MERSİN': { bg: 'rgba(59,130,246,0.10)', text: '#1d4ed8', dot: '#3b82f6' },
    'HATAY': { bg: 'rgba(168,85,247,0.10)', text: '#7e22ce', dot: '#a855f7' },
    'GAZİANTEP': { bg: 'rgba(234,179,8,0.12)', text: '#92400e', dot: '#eab308' },
};

// ── Sütun tanımları ────────────────────────────────────────────────────────────
const COLUMNS = [
    { key: 'bolge', label: 'Bölge', align: 'left', numeric: false, sortable: true },
    { key: 'om', label: 'OM', align: 'left', numeric: false, sortable: true },
    { key: 'direkler', label: 'Direkler', align: 'right', numeric: true },
    { key: 'hucreler', label: 'Hücreler', align: 'right', numeric: true },
    { key: 'panolar', label: 'Panolar', align: 'right', numeric: true },
    { key: 'trafolar', label: 'Trafolar', align: 'right', numeric: true },
    { key: 'genelToplam', label: 'Genel Toplam', align: 'right', numeric: true },
];

const NUMERIC_KEYS = COLUMNS.filter((c) => c.numeric).map((c) => c.key);

// ── Min/Max hesapla ────────────────────────────────────────────────────────────
function useColMinMax(data, keys) {
    return useMemo(() => {
        const result = {};
        keys.forEach((key) => {
            const vals = data.map((r) => r[key]).filter((v) => typeof v === 'number');
            result[key] = { min: Math.min(...vals), max: Math.max(...vals) };
        });
        return result;
    }, [data, keys]);
}

// ── Hücre renk stili ──────────────────────────────────────────────────────────
function getCellStyle(key, value, minMax) {
    if (value === null || value === undefined) return {};
    const { min, max } = minMax[key] || { min: 0, max: 1 };
    const range = max - min || 1;
    const ratio = (value - min) / range;

    if (key === 'genelToplam') {
        if (value === 0) return { color: '#9ca3af' };
        const a = 0.06 + ratio * 0.28;
        return {
            background: `rgba(99,102,241,${a})`,
            color: ratio > 0.6 ? '#3730a3' : ratio > 0.3 ? '#4338ca' : '#4f46e5',
            fontWeight: 700,
        };
    }
    if (key === 'direkler') {
        if (value === 0) return { color: '#9ca3af' };
        const a = 0.06 + ratio * 0.22;
        return {
            background: `rgba(16,185,129,${a})`,
            color: ratio > 0.5 ? '#065f46' : '#047857',
            fontWeight: 600,
        };
    }
    // Diğer sayısal alanlar — 0 gri, >0 hafif turuncu ton
    if (value === 0) return { color: '#d1d5db', fontSize: '11px' };
    const a = 0.08 + ratio * 0.28;
    return {
        background: `rgba(249,115,22,${a})`,
        color: ratio > 0.6 ? '#9a3412' : ratio > 0.3 ? '#c2410c' : '#ea580c',
        fontWeight: 600,
    };
}

// ── Sort ikonu ────────────────────────────────────────────────────────────────
function SortIcon({ column, sortKey, sortDir }) {
    if (sortKey !== column) return <ArrowUpDown size={12} className="opacity-30" />;
    return sortDir === 'asc'
        ? <ArrowUp size={12} className="text-primary" />
        : <ArrowDown size={12} className="text-primary" />;
}

// ── KPI Kartları ──────────────────────────────────────────────────────────────
const KPI_ITEMS = [
    { label: 'Genel Toplam', key: 'genelToplam', color: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
    { label: 'Direkler', key: 'direkler', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
    { label: 'Panolar', key: 'panolar', color: 'bg-orange-50 border-orange-200 text-orange-700' },
    { label: 'Hücreler', key: 'hucreler', color: 'bg-sky-50 border-sky-200 text-sky-700' },
];

// ── Ana bileşen ───────────────────────────────────────────────────────────────
export default function EnvanterSlide() {
    const [sortKey, setSortKey] = useState(null);
    const [sortDir, setSortDir] = useState('desc');
    const [search, setSearch] = useState('');
    const [bolgeFilter, setBolgeFilter] = useState('');
    const [isFullscreen, setIsFullscreen] = useState(() => !!document.fullscreenElement);
    const containerRef = useRef(null);

    const dataWithTotals = useMemo(() => {
        return envanterS3Data.map(row => ({
            ...row,
            genelToplam: (row.direkler || 0) + (row.hucreler || 0) + (row.panolar || 0) + (row.trafolar || 0)
        }));
    }, []);

    const uniqueBolgeler = useMemo(
        () => [...new Set(dataWithTotals.map((r) => r.bolge))].sort(),
        [dataWithTotals]
    );

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

    const minMax = useColMinMax(dataWithTotals, NUMERIC_KEYS);

    const handleSort = (key) => {
        const col = COLUMNS.find((c) => c.key === key);
        if (!col || (!col.numeric && !col.sortable)) return;
        if (sortKey === key) {
            setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortKey(key);
            setSortDir(col.numeric ? 'desc' : 'asc');
        }
    };

    const filtered = useMemo(() => {
        let rows = dataWithTotals;
        if (bolgeFilter) rows = rows.filter((r) => r.bolge === bolgeFilter);
        const q = search.trim().toLowerCase();
        if (q) rows = rows.filter((r) => r.om.toLowerCase().includes(q) || r.bolge.toLowerCase().includes(q));
        return rows;
    }, [dataWithTotals, search, bolgeFilter]);

    const sorted = useMemo(() => {
        if (!sortKey) return filtered;
        const col = COLUMNS.find(c => c.key === sortKey);
        return [...filtered].sort((a, b) => {
            const av = a[sortKey];
            const bv = b[sortKey];
            
            if (col?.numeric) {
                const nA = av ?? -Infinity;
                const nB = bv ?? -Infinity;
                return sortDir === 'asc' ? nA - nB : nB - nA;
            } else {
                const sA = String(av ?? '');
                const sB = String(bv ?? '');
                return sortDir === 'asc' 
                    ? sA.localeCompare(sB, 'tr') 
                    : sB.localeCompare(sA, 'tr');
            }
        });
    }, [filtered, sortKey, sortDir]);

    const dynamicTotal = useMemo(() => {
        const initial = NUMERIC_KEYS.reduce((acc, key) => {
            acc[key] = 0;
            return acc;
        }, {});

        return filtered.reduce((acc, row) => {
            NUMERIC_KEYS.forEach((key) => {
                acc[key] += row[key] || 0;
            });
            return acc;
        }, initial);
    }, [filtered]);

    const outerClass = isFullscreen
        ? 'fixed inset-0 z-50 bg-base-100 flex flex-col overflow-hidden'
        : 'h-full w-full flex flex-col overflow-hidden';

    return (
        <div
            ref={containerRef}
            data-theme={isFullscreen ? 'light' : undefined}
            className={outerClass}
        >
            <div className="flex flex-col gap-5 p-8 h-full">

                {/* ── Header ── */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-base-content leading-tight flex items-center gap-2">
                            <ClipboardList size={22} className="text-primary" />
                            2026 KEŞİF ÖZETİ — ENVANTERİ
                        </h2>
                        <p className="text-base-content/50 text-sm mt-1">
                            Operasyon merkezleri bazında keşfedilen ekipman envanteri özeti.
                        </p>
                    </div>

                    {/* KPI + Fullscreen */}
                    <div className="flex flex-wrap gap-2 items-center">
                        {KPI_ITEMS.map((k) => (
                            <div
                                key={k.label}
                                className={`flex flex-col items-end rounded-xl px-3 py-2 border min-w-[110px] ${k.color}`}
                            >
                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">{k.label}</span>
                                <span className="font-extrabold text-base leading-tight">
                                    {dynamicTotal[k.key]?.toLocaleString('tr-TR')}
                                </span>
                            </div>
                        ))}
                        <ExportExcelButton data={sorted} fileName="Envanter_Sonuclari_2026" />
                        <button
                            onClick={toggleFullscreen}
                            title={isFullscreen ? 'Küçült' : 'Tam Ekran'}
                            className="btn btn-sm btn-outline shadow-sm bg-base-100 self-center"
                        >
                            {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                        </button>
                    </div>
                </div>

                {/* ── Filtreler ── */}
                <div className="flex items-center gap-3 flex-wrap">
                    {/* Bölge filtresi */}
                    <div className="flex gap-1.5 flex-wrap">
                        <button
                            onClick={() => setBolgeFilter('')}
                            className={`btn btn-xs rounded-full ${!bolgeFilter ? 'btn-primary' : 'btn-ghost border border-base-300'}`}
                        >
                            Tümü
                        </button>
                        {uniqueBolgeler.map((b) => {
                            const c = BOLGE_COLORS[b] || {};
                            return (
                                <button
                                    key={b}
                                    onClick={() => setBolgeFilter(bolgeFilter === b ? '' : b)}
                                    style={bolgeFilter === b
                                        ? { background: c.bg, color: c.text, borderColor: c.dot }
                                        : {}}
                                    className={`btn btn-xs rounded-full border ${bolgeFilter === b ? '' : 'btn-ghost border-base-300'}`}
                                >
                                    <span
                                        className="inline-block w-2 h-2 rounded-full mr-1"
                                        style={{ background: c.dot || '#6b7280' }}
                                    />
                                    {b}
                                </button>
                            );
                        })}
                    </div>

                    {/* OM Arama */}
                    <div className="relative min-w-[180px] max-w-xs">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
                        <input
                            type="text"
                            placeholder="OM ara..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="input input-sm input-bordered w-full pl-8 pr-8 text-sm"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch('')}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content"
                            >
                                <X size={13} />
                            </button>
                        )}
                    </div>

                    {sortKey && (
                        <button
                            onClick={() => { setSortKey(null); setSortDir('desc'); }}
                            className="btn btn-xs btn-ghost gap-1 text-primary"
                        >
                            <X size={12} /> Sıralamayı Sıfırla
                        </button>
                    )}
                    <span className="text-xs text-base-content/40 ml-auto">
                        {sorted.length} / {dataWithTotals.length} kayıt · Sıralamak için başlığa tıkla
                    </span>
                </div>

                {/* ── Tablo ── */}
                <div className="rounded-2xl border border-base-200 shadow-md bg-base-100 flex-1 flex flex-col min-h-0">
                    <div className="overflow-auto flex-1">
                        <table className="w-full text-sm border-collapse relative">
                            <thead className="sticky top-0 z-20 bg-base-100 shadow-sm outline outline-1 outline-base-200">
                                <tr className="bg-base-200 text-base-content/60 text-xs uppercase tracking-wider relative z-20">
                                    {COLUMNS.map((col, idx) => {
                                        const isSticky1 = idx === 0;
                                        const isSticky2 = idx === 1;
                                        return (
                                            <th
                                                key={col.key}
                                                onClick={() => (col.numeric || col.sortable) && handleSort(col.key)}
                                                className={`
                                                    px-3 py-3 font-bold border-b border-base-300 whitespace-nowrap bg-base-200
                                                    ${col.align === 'right' ? 'text-right' : 'text-left'}
                                                    ${(col.numeric || col.sortable) ? 'cursor-pointer select-none hover:bg-base-300/60 transition-colors' : ''}
                                                    ${isSticky1 ? 'sticky left-0 z-30 min-w-[120px] w-[120px]' : ''}
                                                    ${isSticky2 ? 'sticky left-[120px] z-30 min-w-[200px] w-[200px] shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]' : ''}
                                                `}
                                            >
                                                <span className={`inline-flex items-center gap-1 ${col.align === 'right' ? 'justify-end w-full' : 'justify-start'}`}>
                                                    {col.align === 'right' && (col.numeric || col.sortable) && (
                                                        <SortIcon column={col.key} sortKey={sortKey} sortDir={sortDir} />
                                                    )}
                                                    {col.label}
                                                    {col.align === 'left' && col.numeric && (
                                                        <SortIcon column={col.key} sortKey={sortKey} sortDir={sortDir} />
                                                    )}
                                                </span>
                                            </th>
                                        );
                                    })}
                                </tr>

                                {/* Toplam satırı */}
                                <tr className="bg-primary/5 border-b-2 border-primary/30 text-xs font-extrabold text-primary relative z-10">
                                    <td className="px-3 py-2 font-extrabold bg-base-200 sticky left-0 z-20 min-w-[120px]">TOPLAM</td>
                                    <td className="px-3 py-2 font-extrabold bg-base-200 sticky left-[120px] z-20 min-w-[200px] shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]"></td>
                                    {NUMERIC_KEYS.map((key) => (
                                        <td key={key} className="px-3 py-2 text-right tabular-nums bg-base-100/50 backdrop-blur-md">
                                            {dynamicTotal[key]?.toLocaleString('tr-TR')}
                                        </td>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {sorted.length === 0 ? (
                                    <tr>
                                        <td colSpan={COLUMNS.length} className="py-12 text-center text-base-content/40 text-sm">
                                            Arama sonucu bulunamadı.
                                        </td>
                                    </tr>
                                ) : (
                                    sorted.map((row, i) => {
                                        const bc = BOLGE_COLORS[row.bolge] || {};
                                        return (
                                            <tr
                                                key={row.om}
                                                className={`border-b border-base-200 transition-colors duration-150 bg-base-100 hover:bg-base-200`}
                                            >
                                                {/* Bölge */}
                                                <td className="px-3 py-2.5 whitespace-nowrap sticky left-0 z-10 bg-inherit min-w-[120px]">
                                                    <span
                                                        className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-bold"
                                                        style={{ background: bc.bg, color: bc.text }}
                                                    >
                                                        <span
                                                            className="w-1.5 h-1.5 rounded-full"
                                                            style={{ background: bc.dot }}
                                                        />
                                                        {row.bolge}
                                                    </span>
                                                </td>
                                                {/* OM */}
                                                <td className="px-3 py-2.5 font-semibold text-base-content whitespace-nowrap sticky left-[120px] z-10 bg-inherit min-w-[200px] shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                                                    {row.om}
                                                </td>
                                                {/* Sayısal sütunlar */}
                                                {NUMERIC_KEYS.map((key) => {
                                                    const val = row[key];
                                                    const style = getCellStyle(key, val, minMax);
                                                    return (
                                                        <td
                                                            key={key}
                                                            className="px-3 py-2.5 text-right tabular-nums text-sm"
                                                        >
                                                            <span
                                                                className="inline-block rounded-md px-2 py-0.5"
                                                                style={val !== undefined
                                                                    ? { background: style.background, color: style.color, fontWeight: style.fontWeight }
                                                                    : {}}
                                                            >
                                                                {val ?? '—'}
                                                            </span>
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
