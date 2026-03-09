import React, { useState, useRef, useEffect } from 'react';
import { Flame, AlertTriangle, Maximize, Minimize } from 'lucide-react';
import { afetSicaklikOrmanData, afetDepremData } from '../../data/mockData';

const fmt = (val) =>
    val == null ? <span className="text-gray-300 select-none">—</span>
        : typeof val === 'number' && val > 999
            ? new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val) + ' ₺'
            : val;

const fmtNum = (val) =>
    val == null ? <span className="text-gray-300 select-none">—</span> : val;

const isTotal = (row) =>
    (row.om || '').toUpperCase().includes('GENEL TOPLAM');

// ─── Reusable Table Shell ─────────────────────────────────────────────────────
function AfetTable({ title, icon: Icon, iconColor, accentColor, headerColor, children, columns }) {
    return (
        <div className="flex flex-col rounded-2xl overflow-hidden border border-base-200 shadow-md bg-base-100">
            {/* Table Header */}
            <div className={`flex items-center gap-3 px-5 py-3 ${headerColor}`}>
                <Icon size={18} className={iconColor} />
                <span className="font-extrabold tracking-wide text-sm uppercase text-base-content">
                    {title}
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr className="bg-base-200 text-base-content/60 text-xs uppercase tracking-wider">
                            {columns.map((col, i) => (
                                <th
                                    key={i}
                                    className={`px-4 py-2.5 font-bold border-b border-base-300 ${col.align === 'right' ? 'text-right' : 'text-left'}`}
                                >
                                    {col.label}
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

// ─── Table 1: Sıcaklık & Orman Yangını ────────────────────────────────────────
function SicaklikOrmanTable() {
    const cols = [
        { label: 'OM', align: 'left' },
        { label: 'Ort. Personel', align: 'right' },
        { label: 'Ort. Araç', align: 'right' },
        { label: 'Ort. Vinç', align: 'right' },
        { label: 'Ort. Kepçe', align: 'right' },
        { label: 'Orman Yangını (₺)', align: 'right' },
        { label: 'Sıcaklık (₺)', align: 'right' },
        { label: 'Genel Toplam (₺)', align: 'right' },
    ];

    return (
        <AfetTable
            title="Sıcaklık & Orman Yangını Afeti — Hakediş Özeti"
            icon={Flame}
            iconColor="text-amber-500"
            headerColor="bg-amber-50 border-b border-amber-100"
            columns={cols}
        >
            {afetSicaklikOrmanData.map((row, i) => {
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
        { label: 'OM', align: 'left' },
        { label: 'Ort. Personel', align: 'right' },
        { label: 'Ort. Araç', align: 'right' },
        { label: 'Ort. Vinç', align: 'right' },
        { label: 'Ort. Kepçe', align: 'right' },
        { label: 'Deprem Hakediş (₺)', align: 'right' },
    ];

    return (
        <AfetTable
            title="Deprem Afeti — Hakediş Özeti"
            icon={AlertTriangle}
            iconColor="text-red-500"
            headerColor="bg-red-50 border-b border-red-100"
            columns={cols}
        >
            {afetDepremData.map((row, i) => {
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

// ─── Main Slide ───────────────────────────────────────────────────────────────
export default function AfetSlide() {
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

    const totalSicaklikOrman = afetSicaklikOrmanData.find(r => isTotal(r));
    const totalDeprem = afetDepremData.find(r => isTotal(r));

    const fmtCurrency = (v) =>
        v == null ? '—' : new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 2 }).format(v);

    return (
        <div
            ref={containerRef}
            className={`flex flex-col gap-6 ${isFullscreen
                ? 'fixed inset-0 z-50 bg-white overflow-y-auto p-8'
                : 'h-full w-full overflow-y-auto'
                }`}
        >

            {/* Header */}
            <div className="sticky -top-8 -mt-8 -mx-8 px-8 pt-8 pb-4 z-50 bg-base-100/95 backdrop-blur-md shadow-sm border-b border-base-200 mb-6 flex items-start justify-between gap-4 flex-wrap">
                <div>
                    <h2 className="text-3xl font-black text-base-content leading-tight">
                        2025 TOROSLAR EDAŞ - AFET KAPSAMINDA YAPILAN HAKEDİŞLER VE DETAYLARI
                    </h2>
                    <p className="text-base-content/50 text-sm mt-1">
                        Sıcaklık , orman yangını  ve deprem afetleri kapsamında gerçekleşen hakedişler operasyon merkezi bazında gösterilmektedir..
                    </p>
                </div>

                {/* KPI Cards + Fullscreen Button */}
                <div className="flex gap-3 flex-wrap items-center">
                    <div className="flex flex-col items-end bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 min-w-[160px]">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 flex items-center gap-1">
                            <Flame size={11} /> Sıcaklık &amp; Orman
                        </span>
                        <span className="font-extrabold text-amber-700 text-base leading-tight">
                            {fmtCurrency(totalSicaklikOrman?.genel_toplam)}
                        </span>
                    </div>
                    <div className="flex flex-col items-end bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 min-w-[160px]">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-red-500 flex items-center gap-1">
                            <AlertTriangle size={11} /> Deprem
                        </span>
                        <span className="font-extrabold text-red-700 text-base leading-tight">
                            {fmtCurrency(totalDeprem?.deprem_hakedis)}
                        </span>
                    </div>
                    <div className="flex flex-col items-end bg-base-200 border border-base-300 rounded-xl px-4 py-2.5 min-w-[160px]">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-base-content/50">
                            Genel Toplam
                        </span>
                        <span className="font-extrabold text-base-content text-base leading-tight">
                            {fmtCurrency((totalSicaklikOrman?.genel_toplam ?? 0) + (totalDeprem?.deprem_hakedis ?? 0))}
                        </span>
                    </div>

                    {/* Fullscreen Toggle */}
                    <button
                        onClick={toggleFullscreen}
                        title={isFullscreen ? 'Küçült' : 'Tam Ekran'}
                        className="btn btn-sm btn-outline shadow-sm bg-base-100 self-center"
                    >
                        {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                    </button>
                </div>
            </div>

            {/* Tables */}
            <SicaklikOrmanTable />
            <DepremTable />
        </div>
    );
}
