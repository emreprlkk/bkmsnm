import React, { useState, useRef, useEffect } from 'react';
import { Flame, AlertTriangle, Maximize, Minimize, Snowflake, CheckCircle2 } from 'lucide-react';
import { afetSicaklikOrmanData, afetDepremData, hatayYatirimData } from '../../data/mockData';
import ExportExcelButton from '../ExportExcelButton';

const fmt = (val) =>
    val == null ? <span className="text-gray-300 select-none">—</span>
        : typeof val === 'number' && val > 999
            ? new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val) + ' ₺'
            : val;

const fmtNum = (val) =>
    val == null ? <span className="text-gray-300 select-none">—</span> : val;

const isTotal = (row) =>
    (row.om || row.ilce || '').toUpperCase().includes('GENEL TOPLAM');

// ─── Reusable Table Shell ─────────────────────────────────────────────────────
function AfetTable({ title, icon: Icon, iconColor, headerColor, children, columns, subtitle, onSort, sortConfig }) {
    return (
        <div className="flex flex-col rounded-2xl overflow-hidden border border-base-200 shadow-md bg-base-100">
            {/* Table Header */}
            <div className={`flex flex-col gap-0.5 px-5 py-3 ${headerColor}`}>
                <div className="flex items-center gap-3">
                    <Icon size={18} className={iconColor} />
                    <span className="font-extrabold tracking-wide text-sm uppercase text-base-content">
                        {title}
                    </span>
                </div>
                {subtitle && <p className="text-[10px] opacity-60 ml-7 font-semibold">{subtitle}</p>}
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr className="bg-base-200 text-base-content/60 text-xs uppercase tracking-wider">
                            {columns.map((col, i) => (
                                <th
                                    key={i}
                                    onClick={() => col.key && onSort && onSort(col.key)}
                                    className={`px-4 py-2.5 font-bold border-b border-base-300 transition-colors 
                                        ${col.key ? 'cursor-pointer hover:bg-base-300/50' : ''} 
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
                // Her zaman toplam satırını sonda tut
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

// ─── Table 1: Sıcaklık & Orman Yangını ────────────────────────────────────────
function SicaklikOrmanTable() {
    const cols = [
        { label: 'OM', align: 'left', key: 'om' },
        { label: 'Ort. Personel', align: 'right', key: 'ort_gun_personel' },
        { label: 'Ort. Araç', align: 'right', key: 'ort_gun_arac' },
        { label: 'Ort. Vinç', align: 'right', key: 'ort_gun_vinc' },
        { label: 'Ort. Kepçe', align: 'right', key: 'ort_gun_kepce' },
        { label: 'Orman Yangını (₺)', align: 'right', key: 'orman_yangini' },
        { label: 'Sıcaklık (₺)', align: 'right', key: 'sicaklik' },
        { label: 'Genel Toplam (₺)', align: 'right', key: 'genel_toplam' },
    ];

    const { items, requestSort, sortConfig } = useSortableData(afetSicaklikOrmanData);

    return (
        <AfetTable
            title="Sıcaklık & Orman Yangını Afeti — Hakediş Özeti"
            icon={Flame}
            iconColor="text-amber-500"
            headerColor="bg-amber-50 border-b border-amber-100"
            columns={cols}
            onSort={requestSort}
            sortConfig={sortConfig}
        >
            {items.map((row, i) => {
                const total = isTotal(row);
                return (
                    <tr
                        key={i}
                        className={`
                            border-b border-base-200 transition-colors duration-150
                            ${total
                                ? 'bg-amber-50 font-bold text-base-content'
                                : i % 2 === 0
                                    ? 'bg-base-100 hover:bg-amber-50/40'
                                    : 'bg-base-200/30 hover:bg-amber-50/40'
                            }
                        `}
                    >
                        <td className={`px-4 py-2.5 ${total ? 'font-extrabold text-amber-700' : 'font-medium text-base-content'}`}>
                            {row.om}
                        </td>
                        <td className="px-4 py-2.5 text-right tabular-nums">{fmtNum(row.ort_gun_personel)}</td>
                        <td className="px-4 py-2.5 text-right tabular-nums">{fmtNum(row.ort_gun_arac)}</td>
                        <td className="px-4 py-2.5 text-right tabular-nums">{fmtNum(row.ort_gun_vinc)}</td>
                        <td className="px-4 py-2.5 text-right tabular-nums">{fmtNum(row.ort_gun_kepce)}</td>
                        <td className="px-4 py-2.5 text-right tabular-nums font-mono text-xs">
                            {row.orman_yangini != null
                                ? <span className="text-green-700 font-semibold">{fmt(row.orman_yangini)}</span>
                                : <span className="text-base-content/25">—</span>}
                        </td>
                        <td className="px-4 py-2.5 text-right tabular-nums font-mono text-xs">
                            {row.sicaklik != null
                                ? <span className="text-amber-600 font-semibold">{fmt(row.sicaklik)}</span>
                                : <span className="text-base-content/25">—</span>}
                        </td>
                        <td className={`px-4 py-2.5 text-right tabular-nums font-mono text-xs ${total ? 'text-amber-700 font-extrabold' : 'text-base-content font-semibold'}`}>
                            {fmt(row.genel_toplam)}
                        </td>
                    </tr>
                );
            })}
        </AfetTable>
    );
}

// ─── Table 2: Deprem ──────────────────────────────────────────────────────────
function DepremTable() {
    const cols = [
        { label: 'OM', align: 'left', key: 'om' },
        { label: 'Ort. Personel', align: 'right', key: 'ort_gun_personel' },
        { label: 'Ort. Araç', align: 'right', key: 'ort_gun_arac' },
        { label: 'Ort. Vinç', align: 'right', key: 'ort_gun_vinc' },
        { label: 'Ort. Kepçe', align: 'right', key: 'ort_gun_kepce' },
        { label: 'Deprem Hakediş (₺)', align: 'right', key: 'deprem_hakedis' },
    ];

    const { items, requestSort, sortConfig } = useSortableData(afetDepremData);

    return (
        <AfetTable
            title="Deprem Afeti — Hakediş Özeti"
            icon={AlertTriangle}
            iconColor="text-red-500"
            headerColor="bg-red-50 border-b border-red-100"
            columns={cols}
            onSort={requestSort}
            sortConfig={sortConfig}
        >
            {items.map((row, i) => {
                const total = isTotal(row);
                return (
                    <tr
                        key={i}
                        className={`
                            border-b border-base-200 transition-colors duration-150
                            ${total
                                ? 'bg-red-50 font-bold text-base-content'
                                : i % 2 === 0
                                    ? 'bg-base-100 hover:bg-red-50/40'
                                    : 'bg-base-200/30 hover:bg-red-50/40'
                            }
                        `}
                    >
                        <td className={`px-4 py-2.5 ${total ? 'font-extrabold text-red-700' : 'font-medium text-base-content'}`}>
                            {row.om}
                        </td>
                        <td className="px-4 py-2.5 text-right tabular-nums">{fmtNum(row.ort_gun_personel)}</td>
                        <td className="px-4 py-2.5 text-right tabular-nums">{fmtNum(row.ort_gun_arac)}</td>
                        <td className="px-4 py-2.5 text-right tabular-nums">{fmtNum(row.ort_gun_vinc)}</td>
                        <td className="px-4 py-2.5 text-right tabular-nums">{fmtNum(row.ort_gun_kepce)}</td>
                        <td className={`px-4 py-2.5 text-right tabular-nums font-mono text-xs ${total ? 'text-red-700 font-extrabold' : 'text-red-600 font-semibold'}`}>
                            {fmt(row.deprem_hakedis)}
                        </td>
                    </tr>
                );
            })}
        </AfetTable>
    );
}

// ─── Table 3: Kış Afeti (Hatay Yatırım) ──────────────────────────────────────
function KisAfetTable() {
    const cols = [
        { label: 'İlçe', align: 'left', key: 'ilce' },
        { label: 'İlave TR', align: 'right', key: 'ilaveTR' },
        { label: 'Güç Yüls.', align: 'right', key: 'gucYukseltimi' },
        { label: 'Bölge Ayr.', align: 'right', key: 'bolgeAyrimi' },
        { label: 'Kesit Art.', align: 'right', key: 'kesitArttirimi' },
        { label: 'Hücre Değiş.', align: 'right', key: 'hucreDeğisimi' },
        { label: 'Dikilen Direk', align: 'right', key: 'dikileDirek' },
        { label: 'İletken Ara', align: 'right', key: 'iletkenAra' },
    ];

    const { items, requestSort, sortConfig } = useSortableData(hatayYatirimData);

    return (
        <AfetTable
            title="Kış Afeti Kapsamında Yapılan İyileştirmeler — Hatay Bölgesi"
            subtitle="Fırtına ve kar yağışı sonrası şebeke dayanıklılığını artırmak amacıyla yapılan bakım çalışmaları."
            icon={Snowflake}
            iconColor="text-blue-500"
            headerColor="bg-blue-50 border-b border-blue-100"
            columns={cols}
            onSort={requestSort}
            sortConfig={sortConfig}
        >
            {items.map((row, i) => (
                <tr
                    key={i}
                    className={`
                        border-b border-base-200 transition-colors duration-150
                        ${i % 2 === 0 ? 'bg-base-100' : 'bg-base-200/30'}
                        hover:bg-blue-50/40
                    `}
                >
                    <td className="px-4 py-2.5 font-bold text-blue-700">{row.ilce}</td>
                    <td className="px-4 py-2.5 text-right font-semibold">{row.ilaveTR > 0 ? <span className="text-orange-600">{row.ilaveTR}</span> : '0'}</td>
                    <td className="px-4 py-2.5 text-right">{row.gucYukseltimi}</td>
                    <td className="px-4 py-2.5 text-right">{row.bolgeAyrimi}</td>
                    <td className="px-4 py-2.5 text-right">{row.kesitArttirimi}</td>
                    <td className="px-4 py-2.5 text-right">{row.hucreDeğisimi}</td>
                    <td className="px-4 py-2.5 text-right font-bold text-green-600">{row.dikileDirek}</td>
                    <td className="px-4 py-2.5 text-right text-base-content/70">{row.iletkenAra}</td>
                </tr>
            ))}
            {/* Toplam Satırı */}
            <tr className="bg-blue-600 text-white font-black">
                <td className="px-4 py-3 uppercase tracking-wider">GENEL TOPLAM</td>
                <td className="px-4 py-3 text-right">{hatayYatirimData.reduce((acc, curr) => acc + (curr.ilaveTR || 0), 0)}</td>
                <td className="px-4 py-3 text-right">{hatayYatirimData.reduce((acc, curr) => acc + (curr.gucYukseltimi || 0), 0)}</td>
                <td className="px-4 py-3 text-right">{hatayYatirimData.reduce((acc, curr) => acc + (curr.bolgeAyrimi || 0), 0)}</td>
                <td className="px-4 py-3 text-right">{hatayYatirimData.reduce((acc, curr) => acc + (curr.kesitArttirimi || 0), 0)}</td>
                <td className="px-4 py-3 text-right">{hatayYatirimData.reduce((acc, curr) => acc + (curr.hucreDeğisimi || 0), 0)}</td>
                <td className="px-4 py-3 text-right">{hatayYatirimData.reduce((acc, curr) => acc + (curr.dikileDirek || 0), 0)}</td>
                <td className="px-4 py-3 text-right">{hatayYatirimData.reduce((acc, curr) => acc + (curr.iletkenAra || 0), 0)}</td>
            </tr>
        </AfetTable>
    );
}

// ─── Main Slide ───────────────────────────────────────────────────────────────
export default function AfetSlide() {
    const [isFullscreen, setIsFullscreen] = useState(() => !!document.fullscreenElement);
    const [viewMode, setViewMode] = useState('slider'); // 'grid' or 'slider'
    const [activeTab, setActiveTab] = useState(0); // 0: Orman, 1: Deprem, 2: Kış
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

    const totalSicaklikOrman = afetSicaklikOrmanData.find(r => isTotal(r));
    const totalDeprem = afetDepremData.find(r => isTotal(r));
    const totalKisAfetDirek = hatayYatirimData.reduce((acc, curr) => acc + curr.dikileDirek, 0);

    const fmtCurrency = (v) =>
        v == null ? '—' : new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 2 }).format(v);

    const tables = [
        { id: 0, component: <SicaklikOrmanTable />, title: 'Orman & Sıcaklık' },
        { id: 1, component: <DepremTable />, title: 'Deprem Analizi' },
        { id: 2, component: <KisAfetTable />, title: 'Kış Afeti' }
    ];

    return (
        <div
            ref={containerRef}
            className={`flex flex-col gap-8 ${isFullscreen
                ? 'fixed inset-0 z-50 bg-white overflow-y-auto p-12'
                : 'h-full w-full overflow-y-auto p-2'
                }`}
        >

            {/* Header */}
            <div className="sticky -top-8 -mt-8 -mx-8 px-8 pt-8 pb-4 z-50 bg-base-100/95 backdrop-blur-md shadow-sm border-b border-base-200 mb-2 flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-[300px]">
                    <h2 className="text-3xl font-black text-base-content leading-tight uppercase">
                        2025 TOROSLAR EDAŞ — AFET KAPSAMINDA YAPILAN ÇALIŞMALAR
                    </h2>
                    <div className="flex items-center gap-4 mt-2">

                        <div className="join bg-base-200 p-1 rounded-xl border border-base-300 transform scale-90">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`join-item btn btn-xs px-4 rounded-lg transition-all ${viewMode === 'grid' ? 'btn-primary shadow-lg' : 'btn-ghost opacity-50'}`}
                            >
                                Liste Görünümü
                            </button>
                            <button
                                onClick={() => setViewMode('slider')}
                                className={`join-item btn btn-xs px-4 rounded-lg transition-all ${viewMode === 'slider' ? 'btn-primary shadow-lg' : 'btn-ghost opacity-50'}`}
                            >
                                Slider Modu
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 flex-wrap items-center">
                    <div className={`flex flex-col items-end border rounded-xl px-4 py-2 min-w-[140px] transition-all cursor-pointer ${activeTab === 0 && viewMode === 'slider' ? 'bg-amber-100 border-amber-400 scale-105 shadow-md' : 'bg-amber-50 border-amber-200'}`} onClick={() => { if (viewMode === 'slider') setActiveTab(0) }}>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-amber-500">Orman &amp; Sıcaklık</span>
                        <span className="font-black text-amber-700 text-sm leading-tight">{fmtCurrency(totalSicaklikOrman?.genel_toplam)}</span>
                    </div>
                    <div className={`flex flex-col items-end border rounded-xl px-4 py-2 min-w-[140px] transition-all cursor-pointer ${activeTab === 1 && viewMode === 'slider' ? 'bg-red-100 border-red-400 scale-105 shadow-md' : 'bg-red-50 border-red-200'}`} onClick={() => { if (viewMode === 'slider') setActiveTab(1) }}>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-red-500">Deprem Hkd.</span>
                        <span className="font-black text-red-700 text-sm leading-tight">{fmtCurrency(totalDeprem?.deprem_hakedis)}</span>
                    </div>
                    <div className={`flex flex-col items-end border rounded-xl px-4 py-2 min-w-[140px] transition-all cursor-pointer ${activeTab === 2 && viewMode === 'slider' ? 'bg-blue-100 border-blue-400 scale-105 shadow-md' : 'bg-blue-50 border-blue-200'}`} onClick={() => { if (viewMode === 'slider') setActiveTab(2) }}>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-blue-500">Kış Afeti (Direk)</span>
                        <span className="font-black text-blue-700 text-sm leading-tight">{totalKisAfetDirek} Adet</span>
                    </div>

                    <ExportExcelButton
                        data={[
                            ...afetSicaklikOrmanData.map(v => ({ 'Grup': 'Sıcaklık/Orman', ...v })),
                            ...afetDepremData.map(v => ({ 'Grup': 'Deprem', ...v })),
                            ...hatayYatirimData.map(v => ({ 'Grup': 'Kış Afeti', ...v }))
                        ]}
                        fileName="Afet_Katalog_2025"
                    />
                    <button onClick={toggleFullscreen} className="btn btn-sm btn-ghost border border-base-300">
                        {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                    </button>
                </div>
            </div>

            {/* Content Area */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 gap-8 mb-12 animate-in fade-in duration-500">
                    <SicaklikOrmanTable />
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        <DepremTable />
                        <KisAfetTable />
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex flex-col gap-6 animate-in slide-in-from-right-4 duration-500">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex gap-2">
                            {tables.map((t, idx) => (
                                <div
                                    key={idx}
                                    className={`h-1.5 w-12 rounded-full transition-all duration-300 ${activeTab === idx ? 'bg-primary w-20' : 'bg-base-300'}`}
                                />
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setActiveTab(prev => Math.max(0, prev - 1))}
                                disabled={activeTab === 0}
                                className="btn btn-circle btn-sm btn-outline btn-primary"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={() => setActiveTab(prev => Math.min(tables.length - 1, prev + 1))}
                                disabled={activeTab === tables.length - 1}
                                className="btn btn-circle btn-sm btn-outline btn-primary"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 relative min-h-[500px]">
                        {tables[activeTab].component}
                    </div>
                </div>
            )}

            {/* Quick Summary Footer */}
            <div className="flex items-center gap-4 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl mb-6">
                <CheckCircle2 className="text-emerald-500" size={24} />
                <p className="text-emerald-900 text-sm font-medium">
                    2025 Yılında yaşanılan afetlerden müşterilerimizin minimum şekilde etkilenmesi için gerekli çalışmalar yapılmıştır.
                </p>
            </div>
        </div>
    );
}

// Chevron icons for the slider
const ChevronLeft = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
);
const ChevronRight = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
);
