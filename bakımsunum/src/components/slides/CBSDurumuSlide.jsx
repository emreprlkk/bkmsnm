import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Map, Maximize, Minimize, ArrowUpDown, ArrowUp, ArrowDown, Search, X } from 'lucide-react';
import { cbsdata, koordinatTotal } from '../../data/mockData';

// ── Her kolon için min/max hesapla (renklendirme için) ─────────────────────────
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

// ── Koşullu renk fonksiyonu ────────────────────────────────────────────────────
function getCellStyle(key, value, minMax) {
    if (value === null || value === undefined) return {};
    const { min, max } = minMax[key] || { min: 0, max: 1 };
    const range = max - min || 1;
    const ratio = (value - min) / range;

    const errorKeys = ['hataliKoordinat', 'ozNitelikUyumsuz', 'plakaHatasi', 'hataliVeri', 'eksikVeri'];
    const totalKey = 'genelToplam';

    if (errorKeys.includes(key)) {
        if (value === 0) return { background: 'rgba(34,197,94,0.12)', color: '#15803d', fontWeight: 600 };
        const r = Math.round(220 + ratio * 35);
        const g = Math.round(38 - ratio * 20);
        const b = Math.round(38 - ratio * 10);
        const a = 0.1 + ratio * 0.35;
        return {
            background: `rgba(${r},${g},${b},${a})`,
            color: ratio > 0.6 ? '#b91c1c' : ratio > 0.3 ? '#c2410c' : '#92400e',
            fontWeight: 600,
        };
    }

    if (key === 'onaylandi') {
        if (value === 0) return { color: '#9ca3af' };
        return { background: 'rgba(34,197,94,0.18)', color: '#15803d', fontWeight: 700 };
    }

    if (key === 'islendi') {
        const g = Math.round(130 + ratio * 70);
        const a = 0.08 + ratio * 0.30;
        return {
            background: `rgba(34,${g},94,${a})`,
            color: ratio > 0.5 ? '#166534' : '#15803d',
            fontWeight: 600,
        };
    }

    if (key === totalKey) {
        const a = 0.05 + ratio * 0.30;
        return {
            background: `rgba(59,130,246,${a})`,
            color: ratio > 0.6 ? '#1d4ed8' : ratio > 0.3 ? '#2563eb' : '#3b82f6',
            fontWeight: 700,
        };
    }

    return {};
}

// ── Sütun tanımları ───────────────────────────────────────────────────────────
const COLUMNS = [
    { key: 'om', label: 'OM', align: 'left', numeric: false },
    { key: 'hataliKoordinat', label: 'Hatalı Koordinat', align: 'right', numeric: true },
    { key: 'onaylandi', label: 'Onaylandı', align: 'right', numeric: true },
    { key: 'ozNitelikUyumsuz', label: 'Öz Nitelik Uyumsuz', align: 'right', numeric: true },
    { key: 'plakaHatasi', label: 'Plaka Hatası', align: 'right', numeric: true },
    { key: 'hataliVeri', label: 'Hatalı Veri', align: 'right', numeric: true },
    { key: 'islendi', label: 'İşlendi', align: 'right', numeric: true },
    { key: 'eksikVeri', label: 'Eksik Veri', align: 'right', numeric: true },
    { key: 'genelToplam', label: 'Genel Toplam', align: 'right', numeric: true },
];

const NUMERIC_KEYS = COLUMNS.filter((c) => c.numeric).map((c) => c.key);

// ── Sort ikonu ────────────────────────────────────────────────────────────────
function SortIcon({ column, sortKey, sortDir }) {
    if (sortKey !== column) return <ArrowUpDown size={13} className="opacity-30" />;
    return sortDir === 'asc'
        ? <ArrowUp size={13} className="text-primary" />
        : <ArrowDown size={13} className="text-primary" />;
}

// ── Ana bileşen ───────────────────────────────────────────────────────────────
export default function CBSDurumuSlide() {
    const [sortKey, setSortKey] = useState(null);
    const [sortDir, setSortDir] = useState('asc');
    const [search, setSearch] = useState('');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef(null);

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

    const minMax = useColMinMax(cbsdata, NUMERIC_KEYS);

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
        const q = search.trim().toLowerCase();
        return q ? cbsdata.filter((r) => r.om.toLowerCase().includes(q)) : cbsdata;
    }, [search]);

    const sorted = useMemo(() => {
        if (!sortKey) return filtered;
        return [...filtered].sort((a, b) => {
            const av = a[sortKey] ?? -Infinity;
            const bv = b[sortKey] ?? -Infinity;
            return sortDir === 'asc' ? av - bv : bv - av;
        });
    }, [filtered, sortKey, sortDir]);

    const kpiCards = [
        { label: 'Genel Toplam', value: koordinatTotal.genelToplam, color: 'bg-blue-50 border-blue-200 text-blue-700' },
        { label: 'İşlendi', value: koordinatTotal.islendi, color: 'bg-green-50 border-green-200 text-green-700' },
        { label: 'Eksik Veri', value: koordinatTotal.eksikVeri, color: 'bg-amber-50 border-amber-200 text-amber-700' },
        { label: 'Hatalı Veri', value: koordinatTotal.hataliVeri, color: 'bg-red-50 border-red-200 text-red-700' },
    ];

    // Fullscreen: fixed inset-0 ile tam ekran container, overflow-y-auto scroll için
    // Normal: h-full overflow-y-auto
    // Kritik: flex-col container yerine block kullanılarak overflow sorunu gideriliyor
    const outerClass = isFullscreen
        ? 'fixed inset-0 z-50 bg-white overflow-y-auto'
        : 'h-full w-full overflow-y-auto';

    return (
        <div
            ref={containerRef}
            data-theme={isFullscreen ? 'light' : undefined}
            className={outerClass}
        >
            {/* İç içerik: padding ve flex-col burada */}
            <div className="flex flex-col gap-5 p-8">

                {/* ── Header ── */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-base-content leading-tight flex items-center gap-2">
                            <Map size={22} className="text-primary" />
                            CBS DURUMU — OM BAZLI VERİ ANALİZİ
                        </h2>
                        <p className="text-base-content/50 text-sm mt-1">
                            Operasyon merkezleri bazında CBS kayıt durumları; hata türleri, işlenme ve onay bilgileri.
                        </p>
                    </div>

                    {/* KPI + Fullscreen */}
                    <div className="flex flex-wrap gap-2 items-center">
                        {kpiCards.map((k) => (
                            <div
                                key={k.label}
                                className={`flex flex-col items-end rounded-xl px-3 py-2 border min-w-[100px] ${k.color}`}
                            >
                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">{k.label}</span>
                                <span className="font-extrabold text-base leading-tight">{k.value.toLocaleString('tr-TR')}</span>
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

                {/* ── Arama & Filtre ── */}
                <div className="flex items-center gap-3 flex-wrap">
                    <div className="relative flex-1 min-w-[200px] max-w-xs">
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
                            onClick={() => { setSortKey(null); setSortDir('asc'); }}
                            className="btn btn-xs btn-ghost gap-1 text-primary"
                        >
                            <X size={12} /> Sıralamayı Sıfırla
                        </button>
                    )}
                    <span className="text-xs text-base-content/40 ml-auto">
                        {sorted.length} / {cbsdata.length} kayıt · Sıralamak için başlığa tıkla
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
                                    <td className="px-3 py-2 font-extrabold">TOPLAM</td>
                                    {NUMERIC_KEYS.map((key) => (
                                        <td key={key} className="px-3 py-2 text-right tabular-nums">
                                            {koordinatTotal[key]?.toLocaleString('tr-TR')}
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
                                    sorted.map((row, i) => (
                                        <tr
                                            key={row.om}
                                            className={`border-b border-base-200 transition-colors duration-150 ${i % 2 === 0
                                                    ? 'bg-base-100 hover:bg-base-200/50'
                                                    : 'bg-base-200/25 hover:bg-base-200/60'
                                                }`}
                                        >
                                            <td className="px-3 py-2.5 font-semibold text-base-content whitespace-nowrap">
                                                {row.om}
                                            </td>
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
                                                                : {}
                                                            }
                                                        >
                                                            {val ?? '—'}
                                                        </span>
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>{/* flex-col wrapper sonu */}
        </div>
    );
}
