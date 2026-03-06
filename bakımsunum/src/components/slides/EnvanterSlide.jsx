import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ClipboardList, Maximize, Minimize, ArrowUpDown, ArrowUp, ArrowDown, Search, X } from 'lucide-react';
import { envanterData, envanterTotal } from '../../data/mockData';

// ── Bölge renk haritası ───────────────────────────────────────────────────────
const BOLGE_COLORS = {
    'ADANA': { bg: 'rgba(239,68,68,0.10)', text: '#b91c1c', dot: '#ef4444' },
    'MERSİN': { bg: 'rgba(59,130,246,0.10)', text: '#1d4ed8', dot: '#3b82f6' },
    'HATAY': { bg: 'rgba(168,85,247,0.10)', text: '#7e22ce', dot: '#a855f7' },
    'GAZİANTEP': { bg: 'rgba(234,179,8,0.12)', text: '#92400e', dot: '#eab308' },
};

// ── Sütun tanımları ────────────────────────────────────────────────────────────
const COLUMNS = [
    { key: 'bolge', label: 'Bölge', align: 'left', numeric: false },
    { key: 'om', label: 'OM', align: 'left', numeric: false },
    { key: 'direk', label: 'Direk', align: 'right', numeric: true },
    { key: 'hucreMmhGazli', label: 'Hücre MMH Gazlı', align: 'right', numeric: true },
    { key: 'hucreMmmhHavali', label: 'Hücre MMMH Havalı', align: 'right', numeric: true },
    { key: 'kesiciSf6', label: 'Kesici SF6', align: 'right', numeric: true },
    { key: 'panoAgDagilim', label: 'Pano AG Dağılım', align: 'right', numeric: true },
    { key: 'panoAydinlatma', label: 'Pano Aydınlatma', align: 'right', numeric: true },
    { key: 'panoSdk', label: 'Pano SDK', align: 'right', numeric: true },
    { key: 'trafoDagitimHr', label: 'Trafo Dağıtım HR', align: 'right', numeric: true },
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
    if (key === 'direk') {
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
    { label: 'Direk', key: 'direk', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
    { label: 'Pano AG', key: 'panoAgDagilim', color: 'bg-orange-50 border-orange-200 text-orange-700' },
    { label: 'Hücre Havalı', key: 'hucreMmmhHavali', color: 'bg-sky-50 border-sky-200 text-sky-700' },
];

// ── Ana bileşen ───────────────────────────────────────────────────────────────
export default function EnvanterSlide() {
    const [sortKey, setSortKey] = useState(null);
    const [sortDir, setSortDir] = useState('desc');
    const [search, setSearch] = useState('');
    const [bolgeFilter, setBolgeFilter] = useState('');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef(null);

    const uniqueBolgeler = useMemo(
        () => [...new Set(envanterData.map((r) => r.bolge))].sort(),
        []
    );

    useEffect(() => {
        const handler = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handler);
        return () => document.removeEventListener('fullscreenchange', handler);
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen().catch(console.error);
        } else {
            document.exitFullscreen();
        }
    };

    const minMax = useColMinMax(envanterData, NUMERIC_KEYS);

    const handleSort = (key) => {
        if (!COLUMNS.find((c) => c.key === key)?.numeric) return;
        if (sortKey === key) {
            setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortKey(key);
            setSortDir('desc');
        }
    };

    const filtered = useMemo(() => {
        let rows = envanterData;
        if (bolgeFilter) rows = rows.filter((r) => r.bolge === bolgeFilter);
        const q = search.trim().toLowerCase();
        if (q) rows = rows.filter((r) => r.om.toLowerCase().includes(q) || r.bolge.toLowerCase().includes(q));
        return rows;
    }, [search, bolgeFilter]);

    const sorted = useMemo(() => {
        if (!sortKey) return filtered;
        return [...filtered].sort((a, b) => {
            const av = a[sortKey] ?? -Infinity;
            const bv = b[sortKey] ?? -Infinity;
            return sortDir === 'asc' ? av - bv : bv - av;
        });
    }, [filtered, sortKey, sortDir]);

    const outerClass = isFullscreen
        ? 'fixed inset-0 z-50 bg-white overflow-y-auto'
        : 'h-full w-full overflow-y-auto';

    return (
        <div
            ref={containerRef}
            data-theme={isFullscreen ? 'light' : undefined}
            className={outerClass}
        >
            <div className="flex flex-col gap-5 p-8">

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
                                    {envanterTotal[k.key]?.toLocaleString('tr-TR')}
                                </span>
                            </div>
                        ))}
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
                        {sorted.length} / {envanterData.length} kayıt · Sıralamak için başlığa tıkla
                    </span>
                </div>

                {/* ── Tablo ── */}
                <div className="rounded-2xl overflow-hidden border border-base-200 shadow-md bg-base-100">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="bg-base-200 text-base-content/60 text-xs uppercase tracking-wider">
                                    {COLUMNS.map((col) => (
                                        <th
                                            key={col.key}
                                            onClick={() => col.numeric && handleSort(col.key)}
                                            className={`
                                                px-3 py-3 font-bold border-b border-base-300 whitespace-nowrap
                                                ${col.align === 'right' ? 'text-right' : 'text-left'}
                                                ${col.numeric ? 'cursor-pointer select-none hover:bg-base-300/60 transition-colors' : ''}
                                            `}
                                        >
                                            <span className="inline-flex items-center gap-1 justify-end w-full">
                                                {col.align === 'right' && col.numeric && (
                                                    <SortIcon column={col.key} sortKey={sortKey} sortDir={sortDir} />
                                                )}
                                                {col.label}
                                                {col.align === 'left' && col.numeric && (
                                                    <SortIcon column={col.key} sortKey={sortKey} sortDir={sortDir} />
                                                )}
                                            </span>
                                        </th>
                                    ))}
                                </tr>

                                {/* Toplam satırı */}
                                <tr className="bg-primary/10 border-b-2 border-primary/30 text-xs font-extrabold text-primary">
                                    <td className="px-3 py-2 font-extrabold" colSpan={2}>TOPLAM</td>
                                    {NUMERIC_KEYS.map((key) => (
                                        <td key={key} className="px-3 py-2 text-right tabular-nums">
                                            {envanterTotal[key]?.toLocaleString('tr-TR')}
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
                                                className={`border-b border-base-200 transition-colors duration-150 ${i % 2 === 0
                                                        ? 'bg-base-100 hover:bg-base-200/50'
                                                        : 'bg-base-200/25 hover:bg-base-200/60'
                                                    }`}
                                            >
                                                {/* Bölge */}
                                                <td className="px-3 py-2.5 whitespace-nowrap">
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
                                                <td className="px-3 py-2.5 font-semibold text-base-content whitespace-nowrap">
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
