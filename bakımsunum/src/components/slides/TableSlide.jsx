import React, { useState, useRef, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    ThemeProvider,
    createTheme
} from '@mui/material';
import { Maximize, Minimize } from 'lucide-react';
//import { recentTransactions } from '../../data/mockData';

export default function TableSlide() {
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
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    const theme = createTheme({
        palette: {
            mode: 'light',
            primary: { main: '#00a96e' }, // DaisyUI success
        },
        typography: {
            fontFamily: 'inherit',
        },
        components: {
            MuiTableCell: {
                styleOverrides: {
                    head: {
                        fontWeight: 700,
                        backgroundColor: '#f8fafc',
                        color: '#334155'
                    }
                }
            }
        }
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Tamamlandı':
                return <span className="badge badge-success badge-sm font-semibold">{status}</span>;
            case 'Beklemede':
                return <span className="badge badge-warning badge-sm font-semibold">{status}</span>;
            case 'İptal':
                return <span className="badge badge-error badge-sm font-semibold badge-outline">{status}</span>;
            default:
                return <span className="badge badge-ghost badge-sm font-semibold">{status}</span>;
        }
    };

    return (
        <div className="flex flex-col h-full w-full">
            <div className="sticky -top-8 -mt-8 -mx-8 px-8 pt-8 pb-4 z-50 bg-base-100/95 backdrop-blur-md shadow-sm border-b border-base-200 mb-8 flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-extrabold text-base-content mb-2">YÜKLENİCİ BİLGİLERİ</h2>
                    <p className="text-base-content/60 text-lg">Sisteme düşen en son finansal hareketler</p>
                </div>
                <div className="flex gap-2">
                    <button className="btn btn-outline btn-primary btn-sm">Tümünü İndir</button>
                    <button
                        onClick={toggleFullscreen}
                        className="btn btn-sm btn-outline shadow-sm bg-base-100"
                        title={isFullscreen ? "Küçült" : "Tam Ekran"}
                    >
                        {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                    </button>
                </div>
            </div>

            <div
                ref={containerRef}
                className={`flex-1 bg-base-100 rounded-2xl shadow-sm border border-base-200 relative flex flex-col ${isFullscreen ? 'h-screen w-screen m-0 rounded-none overflow-y-auto' : 'h-full overflow-hidden'}`}
            >
                <div className="flex-1 w-full relative overflow-auto">
                    <ThemeProvider theme={theme}>
                        <TableContainer component={Paper} elevation={0} sx={{ height: '100%', backgroundColor: 'transparent' }}>
                            <Table stickyHeader aria-label="recent transactions table" size="medium">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><strong>ID</strong></TableCell>
                                        <TableCell><strong>Tarih</strong></TableCell>
                                        <TableCell><strong>Müşteri</strong></TableCell>
                                        <TableCell align="right"><strong>Tutar (₺)</strong></TableCell>
                                        <TableCell align="center"><strong>Durum</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {recentTransactions.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: '#f1f5f9' }, transition: 'background-color 0.2s' }}
                                        >
                                            <TableCell component="th" scope="row">#{row.id}</TableCell>
                                            <TableCell>{new Date(row.date).toLocaleDateString('tr-TR')}</TableCell>
                                            <TableCell sx={{ fontWeight: 500 }}>{row.customer}</TableCell>
                                            <TableCell align="right" sx={{ fontFamily: 'monospace', fontSize: '15px' }}>
                                                {row.amount.toLocaleString('tr-TR')} ₺
                                            </TableCell>
                                            <TableCell align="center">{getStatusBadge(row.status)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </ThemeProvider>
                </div>
            </div>
        </div>
    );
}
