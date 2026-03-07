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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Switch,
    FormControlLabel,
    useTheme
} from '@mui/material';
import Chart from 'react-apexcharts';
import { Maximize, Minimize } from 'lucide-react';
import { yerTeslimiData } from '../../data/mockData';

const YerTeslimiSlide = () => {
    const theme = useTheme();
    const containerRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(() => !!document.fullscreenElement);
    const [viewMode, setViewMode] = useState('chart'); // 'chart' or 'table'
    const [bolgeFilter, setBolgeFilter] = useState('ADANA');
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

    // Derive unique filter options
    const bolgeler = useMemo(() => {
        return ['Tümü', ...new Set(yerTeslimiData.map(d => d['BÖLGE MÜDÜRLÜĞÜ']))];
    }, []);

    const omler = useMemo(() => {
        const filtered = bolgeFilter === 'Tümü'
            ? yerTeslimiData
            : yerTeslimiData.filter(d => d['BÖLGE MÜDÜRLÜĞÜ'] === bolgeFilter);
        return ['Tümü', ...new Set(filtered.map(d => d['OM']))];
    }, [bolgeFilter]);

    const yukleniciler = useMemo(() => {
        let filtered = yerTeslimiData;
        if (bolgeFilter !== 'Tümü') filtered = filtered.filter(d => d['BÖLGE MÜDÜRLÜĞÜ'] === bolgeFilter);
        if (omFilter !== 'Tümü') filtered = filtered.filter(d => d['OM'] === omFilter);
        return ['Tümü', ...new Set(filtered.map(d => d['Yüklenici']))];
    }, [bolgeFilter, omFilter]);

    // Handle cascaded filtering reset
    const handleBolgeChange = (e) => {
        setBolgeFilter(e.target.value);
        setOmFilter('Tümü');
        setYukleniciFilter('Tümü');
    };

    const handleOmChange = (e) => {
        setOmFilter(e.target.value);
        setYukleniciFilter('Tümü');
    };

    // Filter the data based on selections
    const filteredData = useMemo(() => {
        return yerTeslimiData.filter(d => {
            if (bolgeFilter !== 'Tümü' && d['BÖLGE MÜDÜRLÜĞÜ'] !== bolgeFilter) return false;
            if (omFilter !== 'Tümü' && d['OM'] !== omFilter) return false;
            if (yukleniciFilter !== 'Tümü' && d['Yüklenici'] !== yukleniciFilter) return false;
            return true;
        });
    }, [bolgeFilter, omFilter, yukleniciFilter]);


    // Chart Options
    const chartOptions = {
        chart: {
            type: 'bar',
            toolbar: { show: false },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                dynamicAnimation: { enabled: true, speed: 350 }
            },
            fontFamily: theme.typography.fontFamily
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
                borderRadius: 4
            }
        },
        colors: ['#00E396'], // Color for the actual bar
        dataLabels: {
            enabled: true,
            formatter: function (val, opt) {
                const goals = opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex]?.goals;
                if (goals && goals.length > 0) {
                    return `${val} / ${goals[0].value}`;
                }
                return val;
            },
            style: {
                colors: ['black']
            }
        },
        stroke: { show: true, width: 2, colors: ['transparent'] },
        xaxis: {
            categories: filteredData.map(d => d['OM']),
            labels: {
                style: {
                    colors: theme.palette.text.secondary,
                },
                rotate: -45,
                trim: true,
            }
        },
        yaxis: {
            title: {
                text: 'Proje Sayısı',
                style: { color: theme.palette.text.secondary }
            }
        },
        legend: {
            show: true,
            position: 'top',
            customLegendItems: ['Gerçekleşen Proje Sayısı', 'Yer Teslim Sayısı (Hedef)'],
            markers: {
                fillColors: ['#00E396', '#FF4560']
            }
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function (y) {
                    if (typeof y !== "undefined") {
                        return y.toFixed(0);
                    }
                    return y;
                }
            }
        }
    };

    const chartSeries = [
        {
            name: 'Gerçekleşen Proje Sayısı',
            data: filteredData.map(d => ({
                x: d['OM'],
                y: d['Gerçekleşen Proje Sayısı'],
                goals: [
                    {
                        name: 'Yer Teslim Sayısı (Hedef)',
                        value: d['Yer Teslim Sayısı'],
                        strokeWidth: 5,
                        strokeHeight: 15,
                        strokeColor: '#FF4560',
                    }
                ]
            }))
        }
    ];

    const handleToggle = () => {
        setViewMode((prev) => (prev === 'chart' ? 'table' : 'chart'));
    };

    return (
        <div
            ref={containerRef}
            data-theme={isFullscreen ? 'light' : undefined}
            style={isFullscreen ? { position: 'fixed', inset: 0, zIndex: 9999, background: '#fff', overflowY: 'auto' } : { height: '100%' }}
        >
            <Box sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                    <Typography variant="h4" fontWeight="bold" color="primary">
                        Yer Teslimi Verileri
                    </Typography>

                    <Box display="flex" alignItems="center" gap={2}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={viewMode === 'table'}
                                    onChange={handleToggle}
                                    color="primary"
                                />
                            }
                            label={viewMode === 'chart' ? 'Grafik Görünümü' : 'Tablo Görünümü'}
                        />
                        <button
                            onClick={toggleFullscreen}
                            title={isFullscreen ? 'Küçült' : 'Tam Ekran'}
                            className="btn btn-sm btn-outline bg-base-100 shadow-sm"
                        >
                            {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                        </button>
                    </Box>
                </Box>

                {/* Filters */}
                <Box display="flex" gap={2} mb={3}>
                    <FormControl size="small" sx={{ minWidth: 150 }}>
                        <InputLabel>İL</InputLabel>
                        <Select
                            value={bolgeFilter}
                            label="Bölge Müdürlüğü"
                            onChange={handleBolgeChange}
                        >
                            {bolgeler.map(b => (
                                <MenuItem key={b} value={b}>{b}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 150 }}>
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

                    <FormControl size="small" sx={{ minWidth: 150 }}>
                        <InputLabel>Yüklenici</InputLabel>
                        <Select
                            value={yukleniciFilter}
                            label="Yüklenici"
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
                    {viewMode === 'chart' ? (
                        <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Chart
                                options={chartOptions}
                                series={chartSeries}
                                type="bar"
                                height="100%"
                            />
                        </Paper>
                    ) : (
                        <TableContainer component={Paper} elevation={3} sx={{ height: '100%' }}>
                            <Table stickyHeader size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold' }}>İL</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>OM</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Yüklenici</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Yer Teslim Sayısı</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Gerçekleşen Proje Sayısı</TableCell>
                                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>Gerçekleşme Tutarı (₺)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredData.map((row, index) => (
                                        <TableRow hover key={index}>
                                            <TableCell>{row['BÖLGE MÜDÜRLÜĞÜ']}</TableCell>
                                            <TableCell>{row['OM']}</TableCell>
                                            <TableCell>{row['Yüklenici']}</TableCell>
                                            <TableCell align="right">{row['Yer Teslim Sayısı']}</TableCell>
                                            <TableCell align="right">{row['Gerçekleşen Proje Sayısı']}</TableCell>
                                            <TableCell align="right">
                                                {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(row['Gerçekleşme Tutarı'])}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {filteredData.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={6} align="center">Veri bulunamadı.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Box>
            </Box>
        </div>
    );
};

export default YerTeslimiSlide;
