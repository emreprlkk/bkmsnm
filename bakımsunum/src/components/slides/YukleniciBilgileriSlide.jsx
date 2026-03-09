import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Maximize, Minimize, Building2, HardHat, FileSignature, Coins, ArrowUpDown, SearchX } from 'lucide-react';
import { yukleniciBilgileriData } from '../../data/mockData';

const formatCurrencyM = (val) => {
    if (!val) return '₺0M';
    return '₺' + (val / 1000000).toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + 'M';
};

const formatCurrencyExact = (val) => {
    if (!val) return '₺0,00';
    return '₺' + val.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export default function YukleniciBilgileriSlide() {
    const containerRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(() => !!document.fullscreenElement);

    // sorting state
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('Sözleşme Bedeli');

    // filter state
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

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const omler = useMemo(() => {
        return ['Tümü', ...new Set(yukleniciBilgileriData.map(d => d['OM']).filter(Boolean))];
    }, []);

    const yukleniciler = useMemo(() => {
        let filtered = yukleniciBilgileriData;
        if (omFilter !== 'Tümü') {
            filtered = filtered.filter(row => row['OM'] === omFilter);
        }
        return ['Tümü', ...new Set(filtered.map(d => d['Yüklenici Firma']).filter(Boolean))];
    }, [omFilter]);

    const handleOmChange = (e) => {
        setOmFilter(e.target.value);
        setYukleniciFilter('Tümü');
    };

    const filteredData = useMemo(() => {
        return yukleniciBilgileriData.filter(row => {
            if (omFilter !== 'Tümü' && row['OM'] !== omFilter) return false;
            if (yukleniciFilter !== 'Tümü' && row['Yüklenici Firma'] !== yukleniciFilter) return false;
            return true;
        });
    }, [omFilter, yukleniciFilter]);

    const sortedData = useMemo(() => {
        return [...filteredData].sort((a, b) => {
            let valA = a[orderBy];
            let valB = b[orderBy];

            // String comparison
            if (typeof valA === 'string' && typeof valB === 'string') {
                return order === 'asc'
                    ? valA.localeCompare(valB, 'tr')
                    : valB.localeCompare(valA, 'tr');
            }

            // Numeric comparison
            if (valB < valA) {
                return order === 'asc' ? 1 : -1;
            }
            if (valB > valA) {
                return order === 'asc' ? -1 : 1;
            }
            return 0;
        });
    }, [filteredData, order, orderBy]);

    // Calculate KPIs
    const totalTutar = filteredData.reduce((acc, curr) => acc + (curr['Sözleşme Bedeli'] || 0), 0);
    const uniqueYükleniciler = new Set(filteredData.map(d => d['Yüklenici Firma']).filter(Boolean)).size;
    const uniqueOMler = new Set(filteredData.map(d => d['OM']).filter(Boolean)).size;
    const totalSözleşme = filteredData.length;

    return (
        <div className={`flex flex-col flex-1 w-full ${isFullscreen ? 'fixed inset-0 z-50 bg-base-100 overflow-y-auto' : ''}`} ref={containerRef}>
            {/* Header */}
            <div className={`sticky z-40 bg-base-100/95 backdrop-blur-md shadow-sm border-b border-base-200 mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 
                ${isFullscreen ? '-top-8 -mt-8 -mx-8 px-8 pt-8 pb-4' : '-top-12 -mt-12 -mx-12 px-12 pt-12 pb-4'}`}>

                <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-base-content tracking-tight mb-2 uppercase">
                        2026 Yılı Yüklenici Bİlgİlerİ
                    </h2>
                    <p className="text-base-content/60 text-sm">Operasyon Merkezi ve Yüklenici bazında sözleşme bedelleri ve sözleşme detayları ekranı</p>
                </div>

                <div className="flex flex-wrap gap-3 items-center ml-auto">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 bg-base-200/50 p-6 rounded-2xl border border-base-200">
                    <div className="form-control w-full">
                        <label className="label py-1"><span className="label-text text-xs font-bold text-base-content/60 uppercase tracking-widest"><Building2 size={12} className="inline mr-1" /> Operasyon Merkezi</span></label>
                        <select className="select select-bordered select-sm w-full font-semibold focus:border-primary bg-base-100" value={omFilter} onChange={handleOmChange}>
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
                        <div className="stat px-4 py-4 md:py-6 relative overflow-hidden">
                            <div className="absolute -right-4 -bottom-4 opacity-[0.03] text-primary pointer-events-none">
                                <Coins size={100} />
                            </div>
                            <div className="stat-figure text-primary opacity-20 hidden lg:block"><Coins size={32} /></div>
                            <div className="stat-title text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-1 mb-1"><Coins size={12} className="text-primary lg:hidden" /> Toplam Sözleşme Bedeli</div>
                            <div className="stat-value text-xl md:text-2xl lg:text-3xl text-primary font-mono truncate" title={formatCurrencyExact(totalTutar)}>{formatCurrencyM(totalTutar)}</div>
                        </div>
                    </div>
                    <div className="stats shadow bg-base-100 border border-base-200">
                        <div className="stat px-4 py-4 md:py-6">
                            <div className="stat-figure text-secondary opacity-20 hidden lg:block"><FileSignature size={32} /></div>
                            <div className="stat-title text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-1 mb-1"><FileSignature size={12} className="text-secondary lg:hidden" /> Toplam Sözleşme</div>
                            <div className="stat-value text-2xl md:text-3xl lg:text-4xl text-base-content">{totalSözleşme}</div>
                        </div>
                    </div>
                    <div className="stats shadow bg-base-100 border border-base-200">
                        <div className="stat px-4 py-4 md:py-6">
                            <div className="stat-figure text-success opacity-20 hidden lg:block"><HardHat size={32} /></div>
                            <div className="stat-title text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-1 mb-1"><HardHat size={12} className="text-success lg:hidden" /> Yüklenici Sayısı</div>
                            <div className="stat-value text-2xl md:text-3xl lg:text-4xl text-success">{uniqueYükleniciler}</div>
                        </div>
                    </div>
                    <div className="stats shadow bg-base-100 border border-base-200">
                        <div className="stat px-4 py-4 md:py-6">
                            <div className="stat-figure text-info opacity-20 hidden lg:block"><Building2 size={32} /></div>
                            <div className="stat-title text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-1 mb-1"><Building2 size={12} className="text-info lg:hidden" /> OM Sayısı</div>
                            <div className="stat-value text-2xl md:text-3xl lg:text-4xl text-info">{uniqueOMler}</div>
                        </div>
                    </div>
                </div>

                {/* Content Area - Table */}
                <div className="flex-1 mb-8 rounded-2xl bg-base-100 border border-base-200 shadow-sm overflow-hidden flex flex-col relative z-0">
                    <div className="w-full flex-1 overflow-auto max-h-[600px]">
                        <table className="table table-md table-pin-rows table-pin-cols w-full">
                            <thead>
                                <tr>
                                    <th
                                        className="bg-base-200/80 backdrop-blur text-base-content/70 cursor-pointer hover:bg-base-300 transition-colors"
                                        onClick={() => handleRequestSort('OM')}
                                    >
                                        <div className="flex items-center gap-1">
                                            OM {orderBy === 'OM' && <ArrowUpDown size={12} className={`transition-transform ${order === 'desc' ? 'rotate-180' : ''}`} />}
                                        </div>
                                    </th>
                                    <th
                                        className="bg-base-200/80 backdrop-blur text-base-content/70 cursor-pointer hover:bg-base-300 transition-colors"
                                        onClick={() => handleRequestSort('SÖZLEŞME ADI')}
                                    >
                                        <div className="flex items-center gap-1">
                                            SÖZLEŞME ADI {orderBy === 'SÖZLEŞME ADI' && <ArrowUpDown size={12} className={`transition-transform ${order === 'desc' ? 'rotate-180' : ''}`} />}
                                        </div>
                                    </th>
                                    <th
                                        className="bg-base-200/80 backdrop-blur text-base-content/70 cursor-pointer hover:bg-base-300 transition-colors"
                                        onClick={() => handleRequestSort('Yüklenici Firma')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Yüklenici Firma {orderBy === 'Yüklenici Firma' && <ArrowUpDown size={12} className={`transition-transform ${order === 'desc' ? 'rotate-180' : ''}`} />}
                                        </div>
                                    </th>
                                    <th
                                        className="bg-base-200/80 backdrop-blur text-base-content/70 text-right cursor-pointer hover:bg-base-300 transition-colors"
                                        onClick={() => handleRequestSort('Sözleşme Bedeli')}
                                    >
                                        <div className="flex items-center justify-end gap-1">
                                            Sözleşme Bedeli (₺) {orderBy === 'Sözleşme Bedeli' && <ArrowUpDown size={12} className={`transition-transform ${order === 'desc' ? 'rotate-180' : ''}`} />}
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedData.map((row, index) => (
                                    <tr key={index} className="hover:bg-base-200/40 transition-colors group cursor-default">
                                        <td className="font-bold whitespace-nowrap">{row['OM']}</td>
                                        <td className="text-base-content/80 font-medium max-w-sm truncate" title={row['SÖZLEŞME ADI']}>{row['SÖZLEŞME ADI']}</td>
                                        <td>
                                            <div className="badge badge-ghost font-semibold text-xs border-base-300 group-hover:border-primary/40 whitespace-nowrap">{row['Yüklenici Firma']}</div>
                                        </td>
                                        <td className="text-right font-mono text-sm group-hover:text-primary transition-colors">
                                            {formatCurrencyExact(row['Sözleşme Bedeli'])}
                                        </td>
                                    </tr>
                                ))}
                                {sortedData.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="text-center py-16">
                                            <div className="flex flex-col items-center justify-center opacity-40">
                                                <SearchX size={48} className="mb-4" />
                                                <span className="font-bold text-lg">Seçilen kriterlere uygun veri bulunamadı.</span>
                                                <span className="text-sm mt-1">Lütfen filtreleri değiştirerek tekrar deneyin.</span>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
