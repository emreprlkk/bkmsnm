import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    useTheme
} from '@mui/material';
import { Maximize, Minimize } from 'lucide-react';
import { yukleniciBilgileriData } from '../../data/mockData';

const YukleniciBilgileriSlide = () => {
    const theme = useTheme();
    const containerRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(() => !!document.fullscreenElement);
    // sorting state
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('İhale Tutarı');

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
        return ['Tümü', ...new Set(yukleniciBilgileriData.map(d => d['OM']))];
    }, []);

    const yukleniciler = useMemo(() => {
        let filtered = yukleniciBilgileriData;
        if (omFilter !== 'Tümü') {
            filtered = filtered.filter(row => row['OM'] === omFilter);
        }
        return ['Tümü', ...new Set(filtered.map(d => d['Yüklenici Firma']))];
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
            if (b[orderBy] < a[orderBy]) {
                return order === 'asc' ? 1 : -1;
            }
            if (b[orderBy] > a[orderBy]) {
                return order === 'asc' ? -1 : 1;
            }
            return 0;
        });
    }, [filteredData, order, orderBy]);

    return (
        <div
            ref={containerRef}
            data-theme={isFullscreen ? 'light' : undefined}
            style={isFullscreen ? { position: 'fixed', inset: 0, zIndex: 9999, background: '#fff', overflowY: 'auto' } : { height: '100%' }}
        >
            <Box sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h4" fontWeight="bold" color="primary">
                        2026 Yüklenici Bilgileri
                    </Typography>
                    <button
                        onClick={toggleFullscreen}
                        title={isFullscreen ? 'Küçült' : 'Tam Ekran'}
                        className="btn btn-sm btn-outline bg-base-100 shadow-sm"
                    >
                        {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                    </button>
                </Box>

                {/* Filters */}
                <Box display="flex" gap={2} mb={3}>
                    <FormControl size="small" sx={{ minWidth: 250 }}>
                        <InputLabel>OM</InputLabel>
                        <Select
                            value={omFilter}
                            label="OM"
                            onChange={handleOmChange}
                        >
                            {omler.map(o => (
                                <MenuItem key={o} value={o}>{o}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 200 }}>
                        <InputLabel>Yüklenici Firma</InputLabel>
                        <Select
                            value={yukleniciFilter}
                            label="Yüklenici Firma"
                            onChange={(e) => setYukleniciFilter(e.target.value)}
                        >
                            {yukleniciler.map(y => (
                                <MenuItem key={y} value={y}>{y}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                {/* Content Area */}
                <Box flex={1} overflow="hidden">
                    <TableContainer component={Paper} elevation={3} sx={{ height: '100%' }}>
                        <Table stickyHeader size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 'bold' }}>OM</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>SÖZLEŞME ADI</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Yüklenici Firma</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold' }} sortDirection={orderBy === 'İhale Tutarı' ? order : false}>
                                        <TableSortLabel
                                            active={orderBy === 'İhale Tutarı'}
                                            direction={orderBy === 'İhale Tutarı' ? order : 'asc'}
                                            onClick={() => handleRequestSort('İhale Tutarı')}
                                        >
                                            İhale Tutarı (₺)
                                        </TableSortLabel>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedData.map((row, index) => (
                                    <TableRow
                                        hover
                                        key={index}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: theme.palette.action.hover,
                                                cursor: 'pointer',
                                                transform: 'scale(1.002)',
                                                transition: 'all 0.2s ease-in-out'
                                            }
                                        }}
                                    >
                                        <TableCell>{row['OM']}</TableCell>
                                        <TableCell>{row['SÖZLEŞME ADI']}</TableCell>
                                        <TableCell>{row['Yüklenici Firma']}</TableCell>
                                        <TableCell align="right">
                                            {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(row['İhale Tutarı'])}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {sortedData.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center">Veri bulunamadı.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </div>
    );
};

export default YukleniciBilgileriSlide;

