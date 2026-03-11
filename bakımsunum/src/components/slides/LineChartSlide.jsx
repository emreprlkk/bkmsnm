import React, { useState, useRef, useEffect } from 'react';
import Chart from 'react-apexcharts';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, ThemeProvider, createTheme
} from '@mui/material';
import { BarChart3, TableProperties, Maximize, Minimize } from 'lucide-react';
import { scopeData, scopeCategories } from '../../data/mockData';
import ExportExcelButton from '../ExportExcelButton';

const formatCurrency = (val) => {
    if (!val) return '-';
    return '₺' + val.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export default function LineChartSlide() {
    const [viewMode, setViewMode] = useState('chart');
    const [isFullscreen, setIsFullscreen] = useState(() => !!document.fullscreenElement);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.getElementById('presentation-fullscreen-wrapper')?.requestFullscreen().catch(err => {
                console.error('Fullscreen error:', err.message);
            });
        } else {
            document.exitFullscreen();
        }
    };

    const options = {
        chart: {
            type: 'bar',
            stacked: true,
            fontFamily: 'Inter, system-ui, sans-serif',
            toolbar: { show: false },
            zoom: { enabled: false },
            background: 'transparent',
        },
        colors: ['#38bdf8', '#818cf8', '#34d399', '#fbbf24', '#f87171', '#a78bfa', '#fb923c', '#2dd4bf', '#e879f9'],
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 3,
                columnWidth: '70%',
                dataLabels: {
                    total: {
                        enabled: true,
                        style: { fontSize: '11px', fontWeight: 800, color: '#e2e8f0' }
                    }
                }
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: scopeData.map(item => item.name),
            labels: {
                style: { fontSize: '10px', colors: '#94a3b8' },
                rotate: -45,
                rotateAlways: true,
            },
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: {
            title: { text: 'Proje Sayısı', style: { color: '#64748b', fontSize: '12px', fontWeight: 500 } },
            labels: { style: { colors: '#64748b' } },
        },
        legend: {
            position: 'top',
            horizontalAlign: 'center',
            fontSize: '11px',
            fontWeight: 500,
            labels: { colors: '#94a3b8' },
            markers: { radius: 3 },
            itemMargin: { horizontal: 8 },
        },
        grid: {
            borderColor: '#1e293b',
            strokeDashArray: 4,
            xaxis: { lines: { show: false } },
        },
        fill: { opacity: 0.95 },
        tooltip: {
            theme: 'dark',
            style: { fontSize: '12px' },
        },
    };

    const series = scopeCategories.map((category, index) => ({
        name: category,
        data: scopeData.map(item => item.data[index])
    }));

    const muiTheme = createTheme({
        palette: { mode: 'dark', primary: { main: '#38bdf8' }, background: { paper: 'transparent', default: 'transparent' } },
        typography: { fontFamily: 'Inter, system-ui, sans-serif' },
        components: {
            MuiTableCell: {
                styleOverrides: {
                    root: { borderColor: 'rgba(255,255,255,0.05)', color: '#cbd5e1' },
                    head: { fontWeight: 700, backgroundColor: 'rgba(15,23,42,0.8)', color: '#94a3b8', fontSize: '11px', padding: '8px 10px', whiteSpace: 'nowrap' },
                    sizeSmall: { padding: '6px 10px', fontSize: '12px' }
                }
            },
            MuiPaper: {
                styleOverrides: {
                    root: { backgroundImage: 'none', backgroundColor: 'transparent' }
                }
            }
        }
    });

    return (
        <div className="flex flex-col flex-1 w-full">
            {/* Header */}
            <div className="sticky -top-12 -mt-12 -mx-12 px-12 pt-12 pb-4 z-50 bg-[#0f172a]/95 backdrop-blur-md shadow-sm border-b border-white/5 mb-6 flex flex-col md:flex-row justify-between md:items-end gap-4">
                <div>
                    <p className="text-xs font-semibold text-primary/60 uppercase tracking-widest mb-1">Slayt 01</p>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-base-content tracking-tight">
                        2025 Yılı Seviye-3 İşleri
                    </h2>
                </div>

                <div className="flex gap-2 self-start md:self-auto">
                    <div className="flex bg-base-300/30 p-1 rounded-xl border border-white/5">
                        <button
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${viewMode === 'chart'
                                ? 'bg-primary/15 text-primary shadow-sm shadow-primary/10'
                                : 'text-base-content/40 hover:text-base-content/60'
                                }`}
                            onClick={() => setViewMode('chart')}
                        >
                            <BarChart3 size={14} /> Grafik
                        </button>
                        <button
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${viewMode === 'table'
                                ? 'bg-primary/15 text-primary shadow-sm shadow-primary/10'
                                : 'text-base-content/40 hover:text-base-content/60'
                                }`}
                            onClick={() => setViewMode('table')}
                        >
                            <TableProperties size={14} /> Tablo
                        </button>
                    </div>

                    <div className="flex bg-base-300/30 rounded-xl border border-white/5 items-center justify-center -ml-1">
                        <ExportExcelButton
                            data={scopeData}
                            fileName="Seviye_3_Proje_Kapsamlari"
                        />
                    </div>

                    <button
                        onClick={toggleFullscreen}
                        className="flex items-center justify-center w-8 h-8 rounded-lg bg-base-300/30 border border-white/5 text-base-content/40 hover:text-primary hover:border-primary/30 transition-all duration-300"
                        title={isFullscreen ? 'Küçült' : 'Tam Ekran'}
                    >
                        {isFullscreen ? <Minimize size={14} /> : <Maximize size={14} />}
                    </button>
                </div>
            </div>

            {/* Content Container */}
            <div
                ref={containerRef}
                className={`flex-1 glass-card p-4 md:p-6 relative flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 rounded-none bg-base-100' : ''}`}
            >
                {/* Fullscreen header when in fullscreen */}
                {isFullscreen && (
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-base-content">
                            2025 Yılında Yapılan Seviye-3 İşleri
                        </h2>
                        <button
                            onClick={toggleFullscreen}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-base-300/30 border border-white/5 text-base-content/60 hover:text-error text-xs"
                        >
                            <Minimize size={14} /> Küçült
                        </button>
                    </div>
                )}

                {viewMode === 'chart' ? (
                    <div className="flex-1 w-full relative" style={{ minHeight: isFullscreen ? '80vh' : '400px' }}>
                        <Chart options={options} series={series} type="bar" height="100%" />
                    </div>
                ) : (
                    <div className="flex-1 w-full relative overflow-auto flex justify-center">
                        <ThemeProvider theme={muiTheme}>
                            <TableContainer component={Paper} elevation={0} sx={{ maxWidth: isFullscreen ? '95vw' : '100%', margin: '0 auto' }}>
                                <Table stickyHeader size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell rowSpan={2} sx={{ verticalAlign: 'bottom', minWidth: 120, borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                                                <strong>İl</strong>
                                            </TableCell>
                                            {scopeCategories.map((cat, i) => (
                                                <TableCell align="center" colSpan={2} key={i} sx={{ borderRight: '1px solid rgba(255,255,255,0.05)', borderBottom: 'none' }}>
                                                    <strong>{cat}</strong>
                                                </TableCell>
                                            ))}
                                            <TableCell align="center" colSpan={2} sx={{ borderBottom: 'none', color: '#38bdf8' }}>
                                                <strong>TOPLAM</strong>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            {scopeCategories.map((_, i) => (
                                                <React.Fragment key={`sub-${i}`}>
                                                    <TableCell align="center" sx={{ fontSize: '9px', padding: '3px 6px', color: '#64748b', borderRight: 'none' }}>Adet</TableCell>
                                                    <TableCell align="center" sx={{ fontSize: '9px', padding: '3px 6px', color: '#64748b', borderRight: '1px solid rgba(255,255,255,0.05)' }}>Tutar</TableCell>
                                                </React.Fragment>
                                            ))}
                                            <TableCell align="center" sx={{ fontSize: '9px', padding: '3px 6px', color: '#64748b' }}>Adet</TableCell>
                                            <TableCell align="center" sx={{ fontSize: '9px', padding: '3px 6px', color: '#64748b' }}>Tutar</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {scopeData.map((row, idx) => {
                                            const totalAdet = row.data.reduce((a, b) => a + b, 0);
                                            const totalCost = row.cost.reduce((a, b) => a + b, 0);
                                            return (
                                                <TableRow key={idx} sx={{ '&:hover': { backgroundColor: 'rgba(56,189,248,0.03)' } }}>
                                                    <TableCell component="th" scope="row" sx={{ fontWeight: 600, whiteSpace: 'nowrap', borderRight: '1px solid rgba(255,255,255,0.05)', color: '#e2e8f0' }}>
                                                        {row.name}
                                                    </TableCell>
                                                    {row.data.map((val, vIdx) => (
                                                        <React.Fragment key={vIdx}>
                                                            <TableCell align="center" sx={{ borderRight: 'none', color: val > 0 ? '#e2e8f0' : '#334155' }}>
                                                                {val > 0 ? val : '-'}
                                                            </TableCell>
                                                            <TableCell align="right" sx={{ fontSize: '10px', whiteSpace: 'nowrap', borderRight: '1px solid rgba(255,255,255,0.05)', color: row.cost[vIdx] > 0 ? '#94a3b8' : '#334155' }}>
                                                                {row.cost[vIdx] > 0 ? formatCurrency(row.cost[vIdx]) : '-'}
                                                            </TableCell>
                                                        </React.Fragment>
                                                    ))}
                                                    <TableCell align="center" sx={{ fontWeight: 700, color: '#38bdf8' }}>{totalAdet}</TableCell>
                                                    <TableCell align="right" sx={{ fontWeight: 700, whiteSpace: 'nowrap', fontSize: '10px', color: '#38bdf8' }}>{formatCurrency(totalCost)}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                        {/* GENEL TOPLAM */}
                                        <TableRow sx={{ backgroundColor: 'rgba(56,189,248,0.05)', borderTop: '1px solid rgba(56,189,248,0.2)' }}>
                                            <TableCell sx={{ fontWeight: 800, borderRight: '1px solid rgba(255,255,255,0.05)', color: '#e2e8f0' }}>GENEL TOPLAM</TableCell>
                                            {scopeCategories.map((_, i) => {
                                                const colAdet = scopeData.reduce((acc, row) => acc + row.data[i], 0);
                                                const colCost = scopeData.reduce((acc, row) => acc + row.cost[i], 0);
                                                return (
                                                    <React.Fragment key={`tot-${i}`}>
                                                        <TableCell align="center" sx={{ fontWeight: 700, borderRight: 'none', color: '#e2e8f0' }}>{colAdet}</TableCell>
                                                        <TableCell align="right" sx={{ fontWeight: 700, whiteSpace: 'nowrap', fontSize: '10px', borderRight: '1px solid rgba(255,255,255,0.05)', color: '#94a3b8' }}>
                                                            {formatCurrency(colCost)}
                                                        </TableCell>
                                                    </React.Fragment>
                                                );
                                            })}
                                            <TableCell align="center" sx={{ fontWeight: 900, color: '#34d399', fontSize: '14px' }}>
                                                {scopeData.reduce((acc, row) => acc + row.data.reduce((a, b) => a + b, 0), 0)}
                                            </TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 900, color: '#34d399', whiteSpace: 'nowrap', fontSize: '11px' }}>
                                                {formatCurrency(scopeData.reduce((acc, row) => acc + row.cost.reduce((a, b) => a + b, 0), 0))}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </ThemeProvider>
                    </div>
                )}
            </div>
        </div>
    );
}
