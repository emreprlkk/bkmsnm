import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Maximize, Minimize, Building2, HardHat, FileSignature, Coins, MapPin, SearchX } from 'lucide-react';
import { yukleniciBilgileriData } from '../../data/mockData';
import ExportExcelButton from '../ExportExcelButton';

const formatCurrencyM = (val) => {
    if (!val) return '0 Mn ₺';
    const n = Number(val);
    if (isNaN(n)) return String(val);

    if (n >= 1_000_000_000) {
        return `${(n / 1_000_000_000).toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 2 })} Mr ₺`;
    }
    if (n >= 1_000_000) {
        return `${(n / 1_000_000).toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 2 })} Mn ₺`;
    }
    return `${n.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺`;
};

const formatCurrencyExact = (val) => {
    if (!val) return '₺0,00';
    return '₺' + val.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

// Simple helper to infer region from OM string
const inferBolge = (omName) => {
    const lower = omName.toLowerCase();
    const bolgeler = new Set();
    if (lower.includes('adana') || lower.includes('ceyhan') || lower.includes('kozan')) bolgeler.add('ADANA');
    if (lower.includes('mersin') || lower.includes('anamur') || lower.includes('erdemli') || lower.includes('silifke') || lower.includes('tarsus') || lower.includes('mut')) bolgeler.add('MERSİN');
    if (lower.includes('hatay') || lower.includes('iskenderun') || lower.includes('dörtyol') || lower.includes('arsuz') || lower.includes('kırıkhan') || lower.includes('reyhanlı')) bolgeler.add('HATAY');
    if (lower.includes('gaziantep') || lower.includes('nizip') || lower.includes('islahiye')) bolgeler.add('GAZİANTEP');
    if (lower.includes('kilis')) bolgeler.add('KİLİS');
    if (lower.includes('osmaniye') || lower.includes('düziçi') || lower.includes('kadirli')) bolgeler.add('OSMANİYE');

    return Array.from(bolgeler).join(', ') || 'Diğer';
};

export default function YukleniciBilgileriSlide() {
    const containerRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(() => !!document.fullscreenElement);

    // filter state
    const [bolgeFilter, setBolgeFilter] = useState('Tümü');
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

    const bolgelerList = useMemo(() => {
        const set = new Set();
        yukleniciBilgileriData.forEach(d => {
            const inferred = inferBolge(d['OM']);
            if (inferred && inferred !== 'Diğer') {
                inferred.split(', ').forEach(b => set.add(b));
            }
        });
        return ['Tümü', ...Array.from(set).sort()];
    }, []);

    const omler = useMemo(() => {
        let filtered = yukleniciBilgileriData;
        if (bolgeFilter !== 'Tümü') {
            filtered = filtered.filter(row => inferBolge(row['OM']).includes(bolgeFilter));
        }
        return ['Tümü', ...new Set(filtered.map(d => d['OM']).filter(Boolean))];
    }, [bolgeFilter]);

    const yukleniciler = useMemo(() => {
        let filtered = yukleniciBilgileriData;
        if (bolgeFilter !== 'Tümü') {
            filtered = filtered.filter(row => inferBolge(row['OM']).includes(bolgeFilter));
        }
        if (omFilter !== 'Tümü') {
            filtered = filtered.filter(row => row['OM'] === omFilter);
        }
        return ['Tümü', ...new Set(filtered.map(d => d['Yüklenici Firma']).filter(Boolean))];
    }, [bolgeFilter, omFilter]);

    const handleBolgeChange = (e) => {
        setBolgeFilter(e.target.value);
        setOmFilter('Tümü');
        setYukleniciFilter('Tümü');
    };

    const handleOmChange = (e) => {
        setOmFilter(e.target.value);
        setYukleniciFilter('Tümü');
    };

    const filteredData = useMemo(() => {
        return yukleniciBilgileriData.filter(row => {
            if (bolgeFilter !== 'Tümü' && !inferBolge(row['OM']).includes(bolgeFilter)) return false;
            if (omFilter !== 'Tümü' && row['OM'] !== omFilter) return false;
            if (yukleniciFilter !== 'Tümü' && row['Yüklenici Firma'] !== yukleniciFilter) return false;
            return true;
        });
    }, [bolgeFilter, omFilter, yukleniciFilter]);

    // Grouping for cards
    const groupedCards = useMemo(() => {
        const groups = {};
        filteredData.forEach(row => {
            const firma = row['Yüklenici Firma'];
            if (!groups[firma]) {
                groups[firma] = {
                    firma: firma,
                    totalSozlesme: 0,
                    omData: [],
                    bolgeler: new Set()
                };
            }
            groups[firma].totalSozlesme += row['Sözleşme Bedeli'];
            groups[firma].omData.push({
                om: row['OM'],
                sozlesmeAdi: row['SÖZLEŞME ADI'],
                bedel: row['Sözleşme Bedeli']
            });

            // Infer and add bolgeler
            const inferred = inferBolge(row['OM']);
            if (inferred && inferred !== 'Diğer') {
                inferred.split(', ').forEach(b => groups[firma].bolgeler.add(b));
            }
        });

        // Convert to array and sort by totalSozlesme desc
        return Object.values(groups).sort((a, b) => b.totalSozlesme - a.totalSozlesme);
    }, [filteredData]);

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
                    <ExportExcelButton data={filteredData} fileName="Yuklenici_Bilgileri_2026" />
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 bg-base-200/50 p-6 rounded-2xl border border-base-200">
                    <div className="form-control w-full">
                        <label className="label py-1"><span className="label-text text-xs font-bold text-base-content/60 uppercase tracking-widest"><MapPin size={12} className="inline mr-1" /> Bölge</span></label>
                        <select className="select select-bordered select-sm w-full font-semibold focus:border-primary bg-base-100" value={bolgeFilter} onChange={handleBolgeChange}>
                            {bolgelerList.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                    </div>
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
                    <div className="stats shadow bg-base-100 border border-base-200 relative overflow-hidden group">
                        <div className="stat px-4 py-4 md:py-6 relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
                            <div className="stat-figure text-primary opacity-20 hidden lg:block"><Coins size={32} /></div>
                            <div className="stat-title text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-1 mb-1"><Coins size={12} className="text-primary lg:hidden" /> Toplam Sözleşme Bedeli</div>
                            <div className="stat-value text-xl md:text-2xl lg:text-3xl text-primary font-mono truncate" title={formatCurrencyExact(totalTutar)}>{formatCurrencyM(totalTutar)}</div>
                        </div>
                        <div className="absolute -right-4 -bottom-4 opacity-[0.03] text-primary group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                            <Coins size={100} />
                        </div>
                    </div>
                    <div className="stats shadow bg-base-100 border border-base-200 relative overflow-hidden group">
                        <div className="stat px-4 py-4 md:py-6 relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
                            <div className="stat-figure text-secondary opacity-20 hidden lg:block"><FileSignature size={32} /></div>
                            <div className="stat-title text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-1 mb-1"><FileSignature size={12} className="text-secondary lg:hidden" /> Toplam Sözleşme</div>
                            <div className="stat-value text-2xl md:text-3xl lg:text-4xl text-base-content">{totalSözleşme}</div>
                        </div>
                    </div>
                    <div className="stats shadow bg-base-100 border border-base-200 relative overflow-hidden group">
                        <div className="stat px-4 py-4 md:py-6 relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
                            <div className="stat-figure text-success opacity-20 hidden lg:block"><HardHat size={32} /></div>
                            <div className="stat-title text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-1 mb-1"><HardHat size={12} className="text-success lg:hidden" /> Yüklenici Sayısı</div>
                            <div className="stat-value text-2xl md:text-3xl lg:text-4xl text-success">{uniqueYükleniciler}</div>
                        </div>
                    </div>
                    <div className="stats shadow bg-base-100 border border-base-200 relative overflow-hidden group">
                        <div className="stat px-4 py-4 md:py-6 relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
                            <div className="stat-figure text-info opacity-20 hidden lg:block"><Building2 size={32} /></div>
                            <div className="stat-title text-[10px] md:text-xs font-bold uppercase tracking-widest flex items-center gap-1 mb-1"><Building2 size={12} className="text-info lg:hidden" /> OM Sayısı</div>
                            <div className="stat-value text-2xl md:text-3xl lg:text-4xl text-info">{uniqueOMler}</div>
                        </div>
                    </div>
                </div>

                {/* Content Area - Cards Grid */}
                {groupedCards.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-16 opacity-40 bg-base-200/50 rounded-2xl border border-base-200">
                        <SearchX size={48} className="mb-4" />
                        <span className="font-bold text-lg">Seçilen kriterlere uygun veri bulunamadı.</span>
                        <span className="text-sm mt-1">Lütfen filtreleri değiştirerek tekrar deneyin.</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-12">
                        {groupedCards.map((card, idx) => (
                            <div key={idx} className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group">

                                {/* Top Banner Gradient */}
                                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-secondary opacity-60 group-hover:opacity-100 transition-opacity"></div>

                                <div className="card-body p-5 md:p-6 gap-0">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 transition-transform duration-300 group-hover:-translate-y-1">
                                                <HardHat size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg xl:text-xl leading-tight group-hover:text-primary transition-colors">
                                                    {card.firma}
                                                </h3>
                                                {card.bolgeler.size > 0 && (
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                        {Array.from(card.bolgeler).map(b => (
                                                            <span key={b} className="text-[9px] xl:text-[10px] font-medium bg-base-200 px-1.5 py-0.5 rounded text-base-content/70 uppercase tracking-widest inline-flex items-center">
                                                                <MapPin size={8} className="mr-0.5" />
                                                                {b}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Total Value */}
                                    <div className="bg-base-200/40 rounded-xl p-4 mb-4 border border-base-200/60 group-hover:bg-primary/5 transition-colors">
                                        <div className="text-[10px] xl:text-xs uppercase tracking-widest font-bold text-base-content/50 mb-1">Toplam Sözleşme</div>
                                        <div className="font-mono text-2xl xl:text-3xl font-extrabold text-primary" title={formatCurrencyExact(card.totalSozlesme)}>
                                            {formatCurrencyM(card.totalSozlesme)}
                                        </div>
                                    </div>

                                    <div className="divider my-0 opacity-20"></div>

                                    {/* OM List */}
                                    <div className="flex-1 overflow-y-auto max-h-[200px] pr-2 -mr-2 scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent mt-2">
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-base-content/40 mb-3 px-1 sticky top-0 bg-base-100/95 backdrop-blur z-10 py-1">Çalışılan Bölgeler / OM'ler</div>
                                        <div className="flex flex-col gap-3 px-1">
                                            {card.omData.map((omItem, i) => (
                                                <div key={i} className="flex flex-col group/item p-2 hover:bg-base-200/50 rounded-lg transition-colors border border-transparent hover:border-base-200">
                                                    <div className="flex justify-between items-start mb-1 h-full">
                                                        <span className="font-bold text-sm text-base-content/90 group-hover/item:text-primary transition-colors pr-2 leading-tight">{omItem.om}</span>
                                                        <span className="font-mono text-xs font-bold text-base-content/70 group-hover/item:text-primary shrink-0 transition-colors">{formatCurrencyM(omItem.bedel)}</span>
                                                    </div>
                                                    <div className="text-[10px] text-base-content/50 leading-tight">
                                                        {omItem.sozlesmeAdi}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* Custom scrollbar styles if not available in tailwind config */}
            <style jsx>{`
                .scrollbar-thin::-webkit-scrollbar {
                    width: 4px;
                }
                .scrollbar-thin::-webkit-scrollbar-track {
                    background: transparent;
                }
                .scrollbar-thin::-webkit-scrollbar-thumb {
                    background-color: var(--fallback-bc,oklch(var(--bc)/0.2));
                    border-radius: 20px;
                }
            `}</style>
        </div>
    );
}
