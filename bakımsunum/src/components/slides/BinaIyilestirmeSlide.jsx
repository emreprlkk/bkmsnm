import React, { useState, useRef, useEffect } from 'react';
import { Building, CreditCard, Wallet, Maximize, Minimize, CheckCircle2, TrendingUp, Landmark } from 'lucide-react';
import { kesifButceBinaData26, binaIsiData25 } from '../../data/mockData';
import ExportExcelButton from '../ExportExcelButton';

const fmt = (val) =>
    val == null ? <span className="text-gray-300 select-none">—</span>
        : typeof val === 'number'
            ? new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val) + ' ₺'
            : val;

const fmtNum = (val) =>
    val == null ? <span className="text-gray-300 select-none">—</span> : val;

const isTotal = (row) =>
    (row.om || '').toUpperCase().includes('GENEL TOPLAM');

const omToBm = {
    'ADANA KUZEY': 'ADANA',
    'ADANA METROPOL': 'ADANA',
    'ANAMUR': 'MERSİN',
    'CEYHAN': 'ADANA',
    'DÖRTYOL': 'HATAY',
    'DÜZİÇİ': 'OSMANİYE',
    'ERDEMLİ': 'MERSİN',
    'GAZİANTEP METROPOL': 'GAZİANTEP',
    'HATAY METROPOL': 'HATAY',
    'İSKENDERUN': 'HATAY',
    'İSLAHİYE': 'GAZİANTEP',
    'KADİRLİ': 'OSMANİYE',
    'KIRIKHAN': 'HATAY',
    'KİLİS': 'KİLİS',
    'MERSİN METROPOL': 'MERSİN',
    'MUT': 'MERSİN',
    'NİZİP': 'GAZİANTEP',
    'OSMANİYE': 'OSMANİYE',
    'REYHANLI': 'HATAY',
    'SİLİFKE': 'MERSİN',
    'TARSUS': 'MERSİN',
};

const getBm = (om) => {
    if (!om) return '—';
    // Use Turkish locale for proper i->İ conversion
    const normalized = om.toLocaleUpperCase('tr-TR').trim();
    return omToBm[normalized] || '—';
};

// ─── Reusable Table Shell ─────────────────────────────────────────────────────
function BinaTable({ title, icon: Icon, iconColor, headerColor, children, columns, subtitle, onSort, sortConfig }) {
    return (
        <div className="flex flex-col rounded-2xl overflow-hidden border border-base-200 shadow-md bg-base-100 h-full">
            {/* Table Header (Title area) - Fixed at top of table card */}
            <div className={`flex-none flex flex-col gap-0.5 px-5 py-4 ${headerColor}`}>
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-white/50 backdrop-blur-sm shadow-sm ${iconColor}`}>
                        <Icon size={20} />
                    </div>
                    <span className="font-extrabold tracking-wide text-base uppercase text-base-content">
                        {title}
                    </span>
                </div>
                {subtitle && <p className="text-[11px] opacity-70 ml-12 font-semibold italic">{subtitle}</p>}
            </div>

            {/* Scrollable table body wrapper */}
            <div className="flex-1 overflow-auto bg-base-100">
                <table className="w-full text-sm border-collapse relative">
                    <thead className="sticky top-0 z-20 shadow-sm">
                        <tr className="bg-base-200 text-base-content/60 text-xs uppercase tracking-wider">
                            {columns.map((col, i) => (
                                <th
                                    key={i}
                                    onClick={() => col.key && onSort && onSort(col.key)}
                                    className={`px-6 py-3 font-bold border-b border-base-300 transition-colors bg-base-200/95 backdrop-blur-sm
                                        ${col.key ? 'cursor-pointer hover:bg-base-300' : ''} 
                                        ${col.align === 'right' ? 'text-right' : 'text-left'}`}
                                >
                                    <div className={`flex items-center gap-1 ${col.align === 'right' ? 'justify-end' : 'justify-start'}`}>
                                        {col.label}
                                        {col.key && sortConfig?.key === col.key && (
                                            <span className="text-primary text-[10px]">
                                                {sortConfig.direction === 'asc' ? '▲' : '▼'}
                                            </span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{children}</tbody>
                </table>
            </div>
        </div>
    );
}

// ─── Sort Helper ──────────────────────────────────────────────────────────────
const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = useState(config);

    const sortedItems = React.useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (isTotal(a)) return 1;
                if (isTotal(b)) return -1;

                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
};

// ─── Table 1: 2026 Bütçesi ────────────────────────────────────────────────────
function Butce2026Table({ filters = { bm: 'TÜMÜ', om: 'TÜMÜ' } }) {
    const cols = [
        { label: 'BM', align: 'left', key: 'bm' },
        { label: 'Operasyon Merkezi', align: 'left', key: 'om' },
        { label: 'Talep Edilen Bütçe (₺)', align: 'right', key: 'butce' },
    ];

    const filteredData = React.useMemo(() => {
        let data = kesifButceBinaData26.map(row => ({ ...row, bm: getBm(row.om) }));
        if (filters.bm !== 'TÜMÜ') {
            data = data.filter(d => d.bm === filters.bm);
        }
        if (filters.om !== 'TÜMÜ') {
            data = data.filter(d => d.om === filters.om);
        }
        return data;
    }, [filters]);

    const { items, requestSort, sortConfig } = useSortableData(filteredData, { key: 'butce', direction: 'desc' });
    const totalButce = filteredData.reduce((acc, curr) => acc + curr.butce, 0);

    return (
        <BinaTable
            title="2026 Yılı Bina İyileştirme — Keşif Bütçeleri"
            subtitle="2026 yılı yatırım planlaması kapsamında operasyon merkezleri tarafından talep edilen keşif tutarlarıdır."
            icon={Landmark}
            iconColor="text-indigo-600"
            headerColor="bg-indigo-50 border-b border-indigo-100"
            columns={cols}
            onSort={requestSort}
            sortConfig={sortConfig}
        >
            {items.map((row, i) => (
                <tr
                    key={i}
                    className={`
                        border-b border-base-200 transition-colors duration-150
                        ${i % 2 === 0 ? 'bg-base-100/50' : 'bg-base-200/20'}
                        hover:bg-indigo-50/40
                    `}
                >
                    <td className="px-6 py-3 font-bold text-indigo-900 italic">
                        {row.bm}
                    </td>
                    <td className="px-6 py-3 font-bold text-indigo-900 border-l-4 border-transparent hover:border-indigo-400">
                        {row.om}
                    </td>
                    <td className="px-6 py-3 text-right tabular-nums font-mono font-semibold text-indigo-700">
                        {fmt(row.butce)}
                    </td>
                </tr>
            ))}
            <tr className="bg-indigo-600 text-white font-black">
                <td colSpan={2} className="px-6 py-4 uppercase tracking-widest text-sm">TOPLAM BÜTÇE</td>
                <td className="px-6 py-4 text-right tabular-nums font-mono text-base">{fmt(totalButce)}</td>
            </tr>
        </BinaTable>
    );
}

// ─── Table 2: 2025 Hakediş ────────────────────────────────────────────────────
function Hakedis2025Table({ filters = { bm: 'TÜMÜ', om: 'TÜMÜ' } }) {
    const cols = [
        { label: 'BM', align: 'left', key: 'bm' },
        { label: 'Operasyon Merkezi', align: 'left', key: 'om' },
        { label: 'Bina Adedi', align: 'right', key: 'binaAdedi' },
        { label: 'Gerçekleşen Hakediş (₺)', align: 'right', key: 'hakedis' },
    ];

    const filteredData = React.useMemo(() => {
        let data = binaIsiData25.map(row => ({ ...row, bm: getBm(row.om) }));
        if (filters.bm !== 'TÜMÜ') {
            data = data.filter(d => d.bm === filters.bm);
        }
        if (filters.om !== 'TÜMÜ') {
            data = data.filter(d => d.om === filters.om);
        }
        return data;
    }, [filters]);

    const { items, requestSort, sortConfig } = useSortableData(filteredData, { key: 'hakedis', direction: 'desc' });
    const totalHakedis = filteredData.reduce((acc, curr) => acc + curr.hakedis, 0);
    const totalBina = filteredData.reduce((acc, curr) => acc + curr.binaAdedi, 0);

    return (
        <BinaTable
            title="2025 Yılı Bina İyileştirme — Hakediş Özeti"
            subtitle="2025 yılı içerisinde tamamlanan ve hakedişi düzenlenen bina bakım ve onarım işleri."
            icon={CreditCard}
            iconColor="text-emerald-600"
            headerColor="bg-emerald-50 border-b border-emerald-100"
            columns={cols}
            onSort={requestSort}
            sortConfig={sortConfig}
        >
            {items.map((row, i) => (
                <tr
                    key={i}
                    className={`
                        border-b border-base-200 transition-colors duration-150
                        ${i % 2 === 0 ? 'bg-base-100/50' : 'bg-base-200/20'}
                        hover:bg-emerald-50/40
                    `}
                >
                    <td className="px-6 py-3 font-bold text-emerald-900 italic">
                        {row.bm}
                    </td>
                    <td className="px-6 py-3 font-bold text-emerald-900 border-l-4 border-transparent hover:border-emerald-400">
                        {row.om}
                    </td>
                    <td className="px-6 py-3 text-right tabular-nums font-bold text-emerald-600">
                        {row.binaAdedi}
                    </td>
                    <td className="px-6 py-3 text-right tabular-nums font-mono font-semibold text-emerald-700">
                        {fmt(row.hakedis)}
                    </td>
                </tr>
            ))}
            <tr className="bg-emerald-600 text-white font-black">
                <td colSpan={2} className="px-6 py-4 uppercase tracking-widest text-sm">TOPLAM</td>
                <td className="px-6 py-4 text-right tabular-nums text-base">{totalBina} Bina</td>
                <td className="px-6 py-4 text-right tabular-nums font-mono text-base">{fmt(totalHakedis)}</td>
            </tr>
        </BinaTable>
    );
}

// ─── Main Slide ───────────────────────────────────────────────────────────────
export default function BinaIyilestirmeSlide() {
    const [isFullscreen, setIsFullscreen] = useState(() => !!document.fullscreenElement);
    const [viewMode, setViewMode] = useState('slider'); // 'grid' or 'slider'
    const [activeTab, setActiveTab] = useState(0); // 0: 2026 Bütçe, 1: 2025 Hakediş
    const [filters, setFilters] = useState({ bm: 'TÜMÜ', om: 'TÜMÜ' });
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

    const globalTotalButce = React.useMemo(() =>
        kesifButceBinaData26.reduce((acc, curr) => acc + curr.butce, 0),
        []);
    const globalTotalHakedis = React.useMemo(() =>
        binaIsiData25.reduce((acc, curr) => acc + curr.hakedis, 0),
        []);

    const totalButce = React.useMemo(() => {
        let data = kesifButceBinaData26.map(row => ({ ...row, bm: getBm(row.om) }));
        if (filters.bm !== 'TÜMÜ') data = data.filter(d => d.bm === filters.bm);
        if (filters.om !== 'TÜMÜ') data = data.filter(d => d.om === filters.om);
        return data.reduce((acc, curr) => acc + curr.butce, 0);
    }, [filters]);

    const totalHakedis = React.useMemo(() => {
        let data = binaIsiData25.map(row => ({ ...row, bm: getBm(row.om) }));
        if (filters.bm !== 'TÜMÜ') data = data.filter(d => d.bm === filters.bm);
        if (filters.om !== 'TÜMÜ') data = data.filter(d => d.om === filters.om);
        return data.reduce((acc, curr) => acc + curr.hakedis, 0);
    }, [filters]);

    const percentButce = globalTotalButce > 0 ? (totalButce / globalTotalButce) * 100 : 0;
    const percentHakedis = globalTotalHakedis > 0 ? (totalHakedis / globalTotalHakedis) * 100 : 0;

    const bmOptions = React.useMemo(() => {
        const bms = new Set(Object.values(omToBm));
        return ['TÜMÜ', ...Array.from(bms).sort()];
    }, []);

    const omOptions = React.useMemo(() => {
        const oms = new Set([...kesifButceBinaData26, ...binaIsiData25].map(d => d.om.toLocaleUpperCase('tr-TR')));
        let list = Array.from(oms).sort();
        if (filters.bm !== 'TÜMÜ') {
            list = list.filter(om => getBm(om) === filters.bm);
        }
        return ['TÜMÜ', ...list];
    }, [filters.bm]);

    const fmtCurrency = (v) =>
        v == null ? '—' : new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(v).replace('TRY', '₺');

    const tables = [
        { id: 0, component: <Butce2026Table filters={filters} />, title: '2026 Bütçesi' },
        { id: 1, component: <Hakedis2025Table filters={filters} />, title: '2025 Hakedişi' }
    ];

    return (
        <div
            ref={containerRef}
            className={`flex flex-col overflow-hidden ${isFullscreen
                ? 'fixed inset-0 z-50 bg-white p-12'
                : 'h-full w-full p-4'}`}
        >
            {/* Header Area & Quick Stats - FIXED (No scroll) */}
            <div className="flex-none flex flex-col gap-6 mb-6">
                <div className="flex items-start justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 text-white">
                            <Building size={32} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 leading-tight uppercase tracking-tight">
                                Bina İyileştirme ve Bakım Çalışmaları
                            </h2>
                            <p className="text-slate-500 font-bold uppercase text-[11px] tracking-widest mt-1">
                                Toroslar EDAŞ — Bina Yatırım & Onarım Analizi
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200 shadow-inner">
                            <select
                                value={filters.bm}
                                onChange={(e) => setFilters(prev => ({ ...prev, bm: e.target.value, om: 'TÜMÜ' }))}
                                className="select select-xs select-ghost font-bold text-slate-700 focus:outline-none"
                            >
                                {bmOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                            <div className="w-[1px] h-4 bg-slate-300" />
                            <select
                                value={filters.om}
                                onChange={(e) => setFilters(prev => ({ ...prev, om: e.target.value }))}
                                className="select select-xs select-ghost font-bold text-slate-700 focus:outline-none"
                            >
                                {omOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                        </div>

                        <div className="join bg-base-200 p-1 rounded-xl border border-base-300">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`join-item btn btn-xs px-4 rounded-lg transition-all ${viewMode === 'grid' ? 'btn-primary shadow-lg' : 'btn-ghost opacity-50'}`}
                            >
                                ÇİFT TABLO
                            </button>
                            <button
                                onClick={() => setViewMode('slider')}
                                className={`join-item btn btn-xs px-4 rounded-lg transition-all ${viewMode === 'slider' ? 'btn-primary shadow-lg' : 'btn-ghost opacity-50'}`}
                            >
                                TEK TABLO
                            </button>
                        </div>
                        <ExportExcelButton
                            data={[
                                ...kesifButceBinaData26
                                    .map(v => ({ ...v, bm: getBm(v.om), Rapor: '2026 Bütçe' }))
                                    .filter(d => (filters.bm === 'TÜMÜ' || d.bm === filters.bm) && (filters.om === 'TÜMÜ' || d.om.toLocaleUpperCase('tr-TR') === filters.om)),
                                ...binaIsiData25
                                    .map(v => ({ ...v, bm: getBm(v.om), Rapor: '2025 Hakediş' }))
                                    .filter(d => (filters.bm === 'TÜMÜ' || d.bm === filters.bm) && (filters.om === 'TÜMÜ' || d.om.toLocaleUpperCase('tr-TR') === filters.om))
                            ]}
                            fileName="Bina_Iyilestirme_Raporu"
                        />
                        <button onClick={toggleFullscreen} className="btn btn-sm btn-circle btn-ghost border border-base-300 bg-white shadow-sm hover:bg-slate-50 transition-colors">
                            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                        </button>
                    </div>
                </div>

                {/* Quick Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                        className={`group relative overflow-hidden flex flex-col p-6 rounded-3xl border transition-all cursor-pointer ${activeTab === 0 && viewMode === 'slider' ? 'bg-indigo-600 border-indigo-500 scale-[1.02] shadow-xl shadow-indigo-200' : 'bg-white border-slate-200 hover:border-indigo-300'}`}
                        onClick={() => { if (viewMode === 'slider') setActiveTab(0) }}
                    >
                        <div className={`absolute top-0 right-0 p-8 opacity-10 transition-transform group-hover:scale-110 ${activeTab === 0 && viewMode === 'slider' ? 'text-white' : 'text-indigo-600'}`}>
                            <TrendingUp size={80} />
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${activeTab === 0 && viewMode === 'slider' ? 'text-indigo-100' : 'text-slate-400'}`}>
                            2026 Keşif Bütçesi
                            {filters.bm !== 'TÜMÜ' || filters.om !== 'TÜMÜ' ? (
                                <span className={`ml-2 px-1.5 py-0.5 rounded-md text-[9px] ${activeTab === 0 && viewMode === 'slider' ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-700'}`}>
                                    %{percentButce.toFixed(1)}
                                </span>
                            ) : null}
                        </span>
                        <span className={`text-2xl font-black mt-2 tracking-tighter ${activeTab === 0 && viewMode === 'slider' ? 'text-white' : 'text-indigo-700'}`}>
                            {fmtCurrency(totalButce)}
                        </span>
                    </div>

                    <div
                        className={`group relative overflow-hidden flex flex-col p-6 rounded-3xl border transition-all cursor-pointer ${activeTab === 1 && viewMode === 'slider' ? 'bg-emerald-600 border-emerald-500 scale-[1.02] shadow-xl shadow-emerald-200' : 'bg-white border-slate-200 hover:border-emerald-300'}`}
                        onClick={() => { if (viewMode === 'slider') setActiveTab(1) }}
                    >
                        <div className={`absolute top-0 right-0 p-8 opacity-10 transition-transform group-hover:scale-110 ${activeTab === 1 && viewMode === 'slider' ? 'text-white' : 'text-emerald-600'}`}>
                            <CheckCircle2 size={80} />
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${activeTab === 1 && viewMode === 'slider' ? 'text-emerald-100' : 'text-slate-400'}`}>
                            2025 Toplam Hakediş
                            {filters.bm !== 'TÜMÜ' || filters.om !== 'TÜMÜ' ? (
                                <span className={`ml-2 px-1.5 py-0.5 rounded-md text-[9px] ${activeTab === 1 && viewMode === 'slider' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700'}`}>
                                    %{percentHakedis.toFixed(1)}
                                </span>
                            ) : null}
                        </span>
                        <span className={`text-2xl font-black mt-2 tracking-tighter ${activeTab === 1 && viewMode === 'slider' ? 'text-white' : 'text-emerald-700'}`}>
                            {fmtCurrency(totalHakedis)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Content Display - SCROLLABLE CONTENT AREA */}
            <div className="flex-1 overflow-hidden min-h-0">
                {viewMode === 'grid' ? (
                    <div className="h-full grid grid-cols-1 xl:grid-cols-2 gap-8 animate-in slide-in-from-bottom-4 duration-700">
                        <Butce2026Table filters={filters} />
                        <Hakedis2025Table filters={filters} />
                    </div>
                ) : (
                    <div className="h-full flex flex-col gap-4 animate-in slide-in-from-right-4 duration-700">
                        <div className="flex-none flex items-center justify-between bg-slate-50/50 p-2 rounded-2xl border border-slate-100 backdrop-blur-sm">
                            <div className="flex gap-3 ml-2">
                                {tables.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`h-1.5 rounded-full transition-all duration-500 shadow-sm ${activeTab === idx ? 'bg-indigo-600 w-12' : 'bg-slate-300 w-6'}`}
                                    />
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setActiveTab(0)}
                                    disabled={activeTab === 0}
                                    className="btn btn-xs btn-indigo btn-circle btn-outline transform hover:scale-110 transition-transform shadow-md disabled:opacity-30"
                                >
                                    <ChevronLeft size={16} />
                                </button>
                                <button
                                    onClick={() => setActiveTab(1)}
                                    disabled={activeTab === 1}
                                    className="btn btn-xs btn-indigo btn-circle btn-outline transform hover:scale-110 transition-transform shadow-md disabled:opacity-30"
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-hidden shadow-xl rounded-2xl ring-1 ring-black/5">
                            {tables[activeTab].component}
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Insight - FIXED */}
            <div className="flex-none flex items-center gap-4 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl group transition-all hover:bg-indigo-100/50 mt-4">
                <div className="bg-white p-2 rounded-xl shadow-sm text-indigo-600 group-hover:scale-110 transition-transform">
                    <CheckCircle2 size={24} />
                </div>
                <p className="text-indigo-900 text-sm font-bold tracking-tight">
                    2026 bütçe yılında operasyon merkezlerimizden gelen bina iyileştirme talepleri, sürdürülebilir enerji yönetimi ve iş güvenliği standartları çerçevesinde değerlendirilecektir.
                </p>
            </div>
        </div>
    );
}

// Local Chevron Icons
const ChevronLeft = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
);
const ChevronRight = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
);
