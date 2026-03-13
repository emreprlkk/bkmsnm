import React, { useState, useMemo, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { Scissors, Zap, Table2, BarChart3, TrendingUp, MapPin, Search, X, Maximize, Minimize, ArrowUp, ArrowDown } from 'lucide-react';
import { ygKoridorAcma26, agacBudama26Kesif } from '../../data/mockData';
import ExportExcelButton from '../ExportExcelButton';

const BM_COLORS = {
    'ADANA': { bg: 'rgba(239, 68, 68, 0.1)', text: '#dc2626', border: '#ef4444' },
    'MERSİN': { bg: 'rgba(59, 130, 246, 0.1)', text: '#2563eb', border: '#3b82f6' },
    'HATAY': { bg: 'rgba(168, 85, 247, 0.1)', text: '#9333ea', border: '#a855f7' },
    'GAZİANTEP': { bg: 'rgba(234, 179, 8, 0.12)', text: '#ca8a04', border: '#eab308' },
    'OSMANİYE': { bg: 'rgba(20, 184, 166, 0.1)', text: '#0d9488', border: '#14b8a6' },
};

export default function AgacBudamaSlide26() {
    const [activeTab, setActiveTab] = useState('budama'); // 'budama' or 'koridor'
    const [viewMode, setViewMode] = useState('chart'); // 'chart' or 'table'
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBm, setSelectedBm] = useState('TOROSLAR');
    const [isFullscreen, setIsFullscreen] = useState(() => !!document.fullscreenElement);
    const [sortConfig, setSortConfig] = useState({ key: 'toplamKm', direction: 'desc' });

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

    const handleSort = (key) => {
        setSortConfig(prev => ({
            key,
            direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
        }));
    };

    const rawData = activeTab === 'budama' ? agacBudama26Kesif : ygKoridorAcma26;
    const tabIcon = activeTab === 'budama' ? <Scissors size={20} /> : <Zap size={20} />;

    const uniqueBms = useMemo(() => ['TOROSLAR', ...new Set(rawData.map(d => d.bm))].sort(), [rawData]);

    const filteredData = useMemo(() => {
        let data = rawData.filter(d => {
            const matchesBm = selectedBm === 'TOROSLAR' || d.bm === selectedBm;
            const matchesSearch = d.om.toLowerCase().includes(searchTerm.toLowerCase()) || d.bm.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesBm && matchesSearch;
        });

        if (sortConfig.key) {
            data.sort((a, b) => {
                const aVal = a[sortConfig.key];
                const bVal = b[sortConfig.key];
                
                if (typeof aVal === 'number') {
                    return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
                }
                return sortConfig.direction === 'asc' 
                    ? String(aVal).localeCompare(String(bVal), 'tr')
                    : String(bVal).localeCompare(String(aVal), 'tr');
            });
        }
        return data;
    }, [rawData, selectedBm, searchTerm, sortConfig]);

    const totals = useMemo(() => {
        const totalKm = filteredData.reduce((acc, curr) => acc + curr.toplamKm, 0);
        const omCount = filteredData.length;
        const avgKm = omCount > 0 ? (totalKm / omCount).toFixed(2) : 0;
        return { totalKm: totalKm.toFixed(2), omCount, avgKm };
    }, [filteredData]);

    const chartOptions = useMemo(() => ({
        chart: {
            type: 'bar',
            toolbar: { show: false },
            fontFamily: 'inherit',
            background: 'transparent'
        },
        plotOptions: {
            bar: {
                borderRadius: 8,
                columnWidth: '60%',
                distributed: true,
                dataLabels: { position: 'top' }
            }
        },
        colors: filteredData.map(d => BM_COLORS[d.bm]?.border || '#94a3b8'),
        dataLabels: {
            enabled: true,
            formatter: (val) => val.toFixed(1) + ' km',
            offsetY: -20,
            style: {
                fontSize: isFullscreen ? '12px' : '10px',
                fontWeight: 800,
                colors: ["#334155"]
            }
        },
        xaxis: {
            categories: filteredData.map(d => d.om),
            labels: {
                rotate: -45,
                style: { fontSize: isFullscreen ? '11px' : '9px', fontWeight: 600 }
            },
            axisBorder: { show: false },
            axisTicks: { show: false }
        },
        yaxis: {
            title: { text: 'Toplam Mesafe (km)', style: { fontWeight: 700 } },
            labels: { formatter: (val) => val.toFixed(0) }
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.05)',
            strokeDashArray: 4,
            yaxis: { lines: { show: true } }
        },
        tooltip: {
            theme: 'light',
            y: { formatter: (val) => val.toFixed(2) + ' km' }
        },
        legend: { show: false }
    }), [filteredData, isFullscreen]);

    const chartSeries = [{
        name: 'Toplam Metraj',
        data: filteredData.map(d => d.toplamKm)
    }];

    return (
        <div className={`flex flex-col h-full w-full bg-base-100 ${isFullscreen ? 'fixed inset-0 z-50 p-8' : 'p-4 md:p-6'} overflow-hidden`}>
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <TrendingUp size={24} />
                        </div>
                        <h2 className={`font-black tracking-tight ${isFullscreen ? 'text-3xl' : 'text-2xl'}`}>2026 YILI AĞAÇ BUDAMA VE YG KORİDOR AÇMA KEŞİF ÖZETİ</h2>
                    </div>
                    <p className="text-base-content/50 text-sm font-medium">Bölge ve OM Bazlı Planlanan Metraj Verileri</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex bg-base-200 p-1 rounded-xl shadow-inner">
                        <button
                            onClick={() => setActiveTab('budama')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'budama' ? 'bg-white shadow-md text-primary' : 'text-base-content/50 hover:text-base-content'}`}
                        >
                            <Scissors size={18} />
                            Ağaç Budama
                        </button>
                        <button
                            onClick={() => setActiveTab('koridor')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'koridor' ? 'bg-white shadow-md text-primary' : 'text-base-content/50 hover:text-base-content'}`}
                        >
                            <Zap size={18} />
                            YG Koridor Açma
                        </button>
                    </div>

                    <button
                        onClick={toggleFullscreen}
                        className="btn btn-sm btn-outline shadow-sm bg-white"
                        title={isFullscreen ? 'Küçült' : 'Tam Ekran'}
                    >
                        {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 shrink-0">
                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-center justify-between shadow-sm">
                    <div>
                        <p className="text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-1">PLANLANAN TOPLAM MESAFE</p>
                        <p className={`${isFullscreen ? 'text-3xl' : 'text-2xl'} font-black text-emerald-950`}>{totals.totalKm} <span className="text-sm font-bold">km</span></p>
                    </div>
                    <div className="p-3 bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-200">
                        {tabIcon}
                    </div>
                </div>
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-center justify-between shadow-sm">
                    <div>
                        <p className="text-blue-600 text-[10px] font-black uppercase tracking-widest mb-1">TOPLAM OM SAYISI</p>
                        <p className={`${isFullscreen ? 'text-3xl' : 'text-2xl'} font-black text-blue-950`}>{totals.omCount}</p>
                    </div>
                    <div className="p-3 bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-200">
                        <MapPin size={20} />
                    </div>
                </div>
                <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-center justify-between shadow-sm">
                    <div>
                        <p className="text-amber-600 text-[10px] font-black uppercase tracking-widest mb-1">OM BAŞINA ORTALAMA</p>
                        <p className={`${isFullscreen ? 'text-3xl' : 'text-2xl'} font-black text-amber-950`}>{totals.avgKm} <span className="text-sm font-bold">km</span></p>
                    </div>
                    <div className="p-3 bg-amber-500 text-white rounded-xl shadow-lg shadow-amber-200">
                        <BarChart3 size={20} />
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 bg-base-200/50 p-3 rounded-2xl border border-base-200 shrink-0">
                <div className="flex flex-wrap gap-2">
                    {uniqueBms.map(bm => {
                        const style = BM_COLORS[bm] || { text: '#64748b', bg: 'white', border: '#94a3b8' };
                        const isSelected = selectedBm === bm;
                        return (
                            <button
                                key={bm}
                                onClick={() => setSelectedBm(bm)}
                                className={`btn btn-xs rounded-full px-4 font-bold transition-all border ${isSelected ? 'shadow-md shadow-base-300' : 'bg-white hover:bg-base-100'}`}
                                style={isSelected ? {
                                    backgroundColor: style.text,
                                    color: 'white',
                                    borderColor: style.text
                                } : {
                                    borderColor: style.border,
                                    color: style.text,
                                    backgroundColor: 'white'
                                }}
                            >
                                {bm}
                            </button>
                        );
                    })}
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
                        <input
                            type="text"
                            placeholder="OM ara..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input input-sm input-bordered rounded-full pl-9 pr-8 bg-white"
                        />
                        {searchTerm && (
                            <button onClick={() => setSearchTerm('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-base-content/40">
                                <X size={14} />
                            </button>
                        )}
                    </div>

                    <div className="join bg-white p-0.5 rounded-full border border-base-200 shadow-sm">
                        <button
                            onClick={() => setViewMode('chart')}
                            className={`join-item btn btn-xs rounded-full border-none ${viewMode === 'chart' ? 'btn-primary' : 'btn-ghost text-base-content/50'}`}
                        >
                            <BarChart3 size={14} />
                        </button>
                        <button
                            onClick={() => setViewMode('table')}
                            className={`join-item btn btn-xs rounded-full border-none ${viewMode === 'table' ? 'btn-primary' : 'btn-ghost text-base-content/50'}`}
                        >
                            <Table2 size={14} />
                        </button>
                    </div>

                    <ExportExcelButton data={filteredData} fileName={`${activeTab}_Data_2026`} />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 min-h-0 bg-white rounded-3xl border border-base-200 shadow-sm overflow-hidden flex flex-col">
                {viewMode === 'chart' ? (
                    <div className="flex-1 p-4 overflow-auto min-h-0">
                        <Chart
                            options={chartOptions}
                            series={chartSeries}
                            type="bar"
                            height="100%"
                            width="100%"
                        />
                    </div>
                ) : (
                    <div className="flex-1 overflow-auto">
                        <table className="table table-pin-rows table-md">
                            <thead className="sticky top-0 bg-base-200 z-10">
                                <tr className="text-xs uppercase font-black opacity-60">
                                    <th className="cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('bm')}>
                                        <div className="flex items-center gap-2">
                                            Bölge {sortConfig.key === 'bm' && (sortConfig.direction === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                                        </div>
                                    </th>
                                    <th className="cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('om')}>
                                        <div className="flex items-center gap-2">
                                            Operasyon Merkezi {sortConfig.key === 'om' && (sortConfig.direction === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                                        </div>
                                    </th>
                                    <th className="text-right cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('toplamKm')}>
                                        <div className="flex items-center justify-end gap-2">
                                            Toplam Metraj (KM) {sortConfig.key === 'toplamKm' && (sortConfig.direction === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((row, idx) => (
                                    <tr key={`${row.om}-${idx}`} className="hover:bg-base-200/40 transition-colors">
                                        <td>
                                            <span 
                                                className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tight"
                                                style={{ backgroundColor: BM_COLORS[row.bm]?.bg, color: BM_COLORS[row.bm]?.text }}
                                            >
                                                {row.bm}
                                            </span>
                                        </td>
                                        <td className="font-bold text-sm">{row.om}</td>
                                        <td className="text-right font-mono font-bold text-primary">
                                            {row.toplamKm.toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                                {filteredData.length > 0 && (
                                    <tr className="bg-primary/5 font-black text-primary border-t-2 border-primary/20">
                                        <td colSpan={2} className="text-right uppercase">Genel Toplam</td>
                                        <td className="text-right font-mono text-lg">{totals.totalKm} km</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
