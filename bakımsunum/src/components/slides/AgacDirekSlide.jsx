import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Box, Typography, Paper, useTheme, Grid, Card, CardContent, IconButton, Tabs, Tab, Chip, Tooltip } from '@mui/material';
import Chart from 'react-apexcharts';
import { agacDirekOmData } from '../../data/mockData';
import { TreePine, BarChart3, TrendingUp, Maximize, Minimize, Map, Filter } from 'lucide-react';

const AgacDirekSlide = () => {
    const theme = useTheme();
    const slideRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(() => !!document.fullscreenElement);
    const [selectedBolge, setSelectedBolge] = useState('HEPSİ');

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

    const handleBolgeChange = (event, newValue) => {
        setSelectedBolge(newValue);
    };

    // Bölge bazlı özet veriyi dinamik olarak hesaplayalım
    const agacDirekBolgeData = useMemo(() => {
        const summaries = {};
        agacDirekOmData.forEach(item => {
            if (!summaries[item.bm]) {
                summaries[item.bm] = { bolge: item.bm, dikilen: 0 };
            }
            summaries[item.bm].dikilen += item.agacDirekSayisi;
        });
        return Object.values(summaries).sort((a, b) => a.bolge.localeCompare(b.bolge, 'tr-TR'));
    }, []);

    // Veriyi filtreleyelim ve azalan sıraya göre sıralayalım
    const filteredAndSortedData = useMemo(() => {
        let sorted = [...agacDirekOmData];
        if (selectedBolge !== 'HEPSİ') {
            sorted = sorted.filter(item => item.bm === selectedBolge);
        }
        return sorted.sort((a, b) => b.agacDirekSayisi - a.agacDirekSayisi);
    }, [selectedBolge]);

    const companyTotal = useMemo(() => {
        return agacDirekOmData.reduce((acc, curr) => acc + curr.agacDirekSayisi, 0);
    }, []);

    const totalCount = useMemo(() => {
        return filteredAndSortedData.reduce((acc, curr) => acc + curr.agacDirekSayisi, 0);
    }, [filteredAndSortedData]);

    const averageCount = filteredAndSortedData.length > 0
        ? Math.round(totalCount / filteredAndSortedData.length)
        : 0;

    const regionPercentage = useMemo(() => {
        return companyTotal > 0 ? ((totalCount / companyTotal) * 100).toFixed(1) : 0;
    }, [totalCount, companyTotal]);

    const chartOptions = {
        chart: {
            type: 'bar',
            height: isFullscreen ? 600 : 450,
            toolbar: { show: true },
            fontFamily: theme.typography.fontFamily,
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: { enabled: true, delay: 150 },
                dynamicAnimation: { enabled: true, speed: 350 }
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 6,
                borderRadiusApplication: 'end',
                horizontal: false,
                columnWidth: '55%',
                distributed: true,
                dataLabels: { position: 'top' },
            }
        },
        dataLabels: {
            enabled: true,
            formatter: (val) => val,
            offsetY: -25,
            style: {
                fontSize: '12px',
                fontWeight: 900,
                colors: [theme.palette.text.primary]
            }
        },
        colors: [
            '#059669'/*, '#10b981', '#34d399', '#6ee7b7', '#a7f3d0',
            '#0d9488', '#14b8a6', '#2dd4bf', '#5eead4', '#99f6e4',
            '#0891b2', '#06b6d4', '#22d3ee', '#67e8f9', '#a5f3fc'*/
        ],
        stroke: { show: true, width: 2, colors: ['transparent'] },
        xaxis: {
            categories: filteredAndSortedData.map(item => item.om),
            labels: {
                style: {
                    colors: theme.palette.text.secondary,
                    fontSize: '11px',
                    fontWeight: 700
                },
                rotate: -45,
                rotateAlways: filteredAndSortedData.length > 10,
            },
            axisBorder: { show: false },
            axisTicks: { show: false }
        },
        yaxis: {
            title: {
                text: 'Ağaç Direk Sayısı',
                style: { color: theme.palette.text.secondary, fontWeight: 700 }
            },
            labels: {
                style: { colors: theme.palette.text.secondary, fontWeight: 600 }
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: "vertical",
                shadeIntensity: 0.25,
                inverseColors: true,
                opacityFrom: 0.85,
                opacityTo: 1,
                stops: [0, 100]
            }
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
            y: { formatter: (val) => val + " Adet" },
            marker: { show: true },
        },
        grid: {
            borderColor: theme.palette.divider,
            strokeDashArray: 4,
            yaxis: { lines: { show: true } }
        },
        legend: { show: false },
        title: {
            text: `${selectedBolge === 'HEPSİ' ? 'Tüm' : selectedBolge} Bölgeler — OM Bazlı Dikilen Ağaç Direk`,
            align: 'left',
            style: {
                fontSize: isFullscreen ? '22px' : '18px',
                fontWeight: 900,
                color: theme.palette.primary.main
            }
        }
    };

    const chartSeries = [{
        name: 'Ağaç Direk Sayısı',
        data: filteredAndSortedData.map(item => item.agacDirekSayisi)
    }];

    return (
        <Box
            sx={{
                p: isFullscreen ? { xs: 2, md: 4 } : 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: theme.palette.background.default,
                overflowY: 'auto'
            }}
        >
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={isFullscreen ? 3 : 4}>
                <Box display="flex" alignItems="center" gap={2}>
                    <Box
                        sx={{
                            p: 1.5,
                            borderRadius: 3,
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            color: '#fff',
                            boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)'
                        }}
                    >
                        <TreePine size={isFullscreen ? 40 : 32} />
                    </Box>
                    <Box>
                        <Typography variant={isFullscreen ? "h3" : "h4"} fontWeight="900" color="primary">
                            2025 Yılı- SEVİYE 2 AĞAÇ DİREK MONTAJI
                        </Typography>
                        <Typography variant={isFullscreen ? "h6" : "subtitle1"} color="text.secondary" fontWeight="600">
                            Bölge ve OM Bazlı Montaj Edilen Ağaç Direk Sayıları
                        </Typography>
                    </Box>
                </Box>

                <IconButton
                    onClick={toggleFullscreen}
                    color="primary"
                    sx={{
                        p: 1.5,
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        '&:hover': { backgroundColor: 'primary.dark' },
                        borderRadius: 3,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                >
                    {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
                </IconButton>
            </Box>

            {/* Bölge Seçimi ve Özet */}
            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    mb: 3,
                    borderRadius: 4,
                    border: '1px solid',
                    borderColor: 'divider',
                    background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)'
                }}
            >
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} lg={7}>
                        <Box display="flex" alignItems="center" gap={2} mb={1}>
                            <Filter size={18} color={theme.palette.primary.main} />
                            <Typography variant="subtitle2" fontWeight="800" color="text.secondary" sx={{ textTransform: 'uppercase' }}>Bölge Filtresi</Typography>
                        </Box>
                        <Tabs
                            value={selectedBolge}
                            onChange={handleBolgeChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            sx={{
                                '& .MuiTabs-indicator': { height: 3, borderRadius: '3px' },
                                '& .MuiTab-root': { fontWeight: 800, fontSize: '0.85rem', minHeight: 48 }
                            }}
                        >
                            <Tab label="TOROSLAR EDAŞ" value="HEPSİ" />
                            {agacDirekBolgeData.map(b => (
                                <Tab key={b.bolge} label={b.bolge} value={b.bolge} />
                            ))}
                        </Tabs>
                    </Grid>
                    <Grid item xs={12} lg={5}>
                        <Box display="flex" flexWrap="wrap" justifyContent={{ xs: 'center', lg: 'flex-end' }} gap={1}>
                            {agacDirekBolgeData.map(b => (
                                <Tooltip key={b.bolge} title={`${b.bolge} Bölgesi Toplam`}>
                                    <Chip
                                        label={`${b.bolge}: ${b.dikilen}`}
                                        onClick={() => setSelectedBolge(b.bolge)}
                                        color={selectedBolge === b.bolge ? "primary" : "default"}
                                        variant={selectedBolge === b.bolge ? "filled" : "outlined"}
                                        sx={{
                                            fontWeight: 700,
                                            borderRadius: 2,
                                            height: 32,
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            '&:hover': { transform: 'translateY(-2px)', boxShadow: 2 }
                                        }}
                                    />
                                </Tooltip>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            {/* KPI Cards */}
            <Grid container spacing={1} mb={isFullscreen ? 2 : 2}>
                <Grid item xs={12} sm={6} md={4} lg={2.4} sx={{ display: 'flex' }}>
                    <Card sx={{ flex: 1, borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: 'none', background: 'rgba(5, 150, 105, 0.05)' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: isFullscreen ? 2 : 1.5 }}>
                            <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(5, 150, 105, 0.1)', color: '#059669' }}>
                                <TreePine size={isFullscreen ? 24 : 18} />
                            </Box>
                            <Box>
                                <Typography variant="caption" fontWeight="800" color="text.secondary" sx={{ textTransform: 'uppercase', fontSize: '0.65rem', lineHeight: 1.2 }}>
                                    TOROSLAR Toplamı
                                </Typography>
                                <Typography variant={isFullscreen ? "h5" : "h6"} fontWeight="900" color="#059669" sx={{ lineHeight: 1.2 }}>{companyTotal} Adet</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2.4} sx={{ display: 'flex' }}>
                    <Card sx={{ flex: 1, borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: 'none', background: 'rgba(16, 185, 129, 0.03)' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: isFullscreen ? 2 : 1.5 }}>
                            <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                                <TrendingUp size={isFullscreen ? 24 : 18} />
                            </Box>
                            <Box>
                                <Typography variant="caption" fontWeight="800" color="text.secondary" sx={{ textTransform: 'uppercase', fontSize: '0.65rem', lineHeight: 1.2 }}>
                                    {selectedBolge === 'HEPSİ' ? 'Bölge' : selectedBolge} Toplam
                                </Typography>
                                <Typography variant={isFullscreen ? "h5" : "h6"} fontWeight="900" color="#10b981" sx={{ lineHeight: 1.2 }}>{totalCount} Adet</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={2.4} sx={{ display: 'flex' }}>
                    <Card sx={{ flex: 1, borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: 'none', background: 'rgba(139, 92, 246, 0.03)' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: isFullscreen ? 2 : 1.5 }}>
                            <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
                                <BarChart3 size={isFullscreen ? 24 : 18} />
                            </Box>
                            <Box>
                                <Typography variant="caption" fontWeight="800" color="text.secondary" sx={{ textTransform: 'uppercase', fontSize: '0.65rem', lineHeight: 1.2 }}>
                                    TOROSLAR Oranı
                                </Typography>
                                <Typography variant={isFullscreen ? "h5" : "h6"} fontWeight="900" color="#8b5cf6" sx={{ lineHeight: 1.2 }}>%{regionPercentage}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={2.4} sx={{ display: 'flex' }}>
                    <Card sx={{ flex: 1, borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: 'none', background: 'rgba(59, 130, 246, 0.03)' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: isFullscreen ? 2 : 1.5 }}>
                            <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                                <BarChart3 size={isFullscreen ? 24 : 18} />
                            </Box>
                            <Box>
                                <Typography variant="caption" fontWeight="800" color="text.secondary" sx={{ textTransform: 'uppercase', fontSize: '0.65rem', lineHeight: 1.2 }}>
                                    OM Başına Ağaç Direk
                                </Typography>
                                <Typography variant={isFullscreen ? "h5" : "h6"} fontWeight="900" color="#3b82f6" sx={{ lineHeight: 1.2 }}>{averageCount} Adet</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={2.4} sx={{ display: 'flex' }}>
                    <Card sx={{ flex: 1, borderRadius: 3, border: '1px solid', borderColor: 'divider', boxShadow: 'none', background: 'rgba(245, 158, 11, 0.03)' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: isFullscreen ? 2 : 1.5 }}>
                            <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                                <Map size={isFullscreen ? 24 : 18} />
                            </Box>
                            <Box>
                                <Typography variant="caption" fontWeight="800" color="text.secondary" sx={{ textTransform: 'uppercase', fontSize: '0.65rem', lineHeight: 1.2 }}>
                                    OM Sayısı
                                </Typography>
                                <Typography variant={isFullscreen ? "h5" : "h6"} fontWeight="900" color="#f59e0b" sx={{ lineHeight: 1.2 }}>{filteredAndSortedData.length} Adet</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Main Chart */}
            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    borderRadius: 5,
                    border: '1px solid',
                    borderColor: 'divider',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%)',
                    position: 'relative',
                    flex: 1,
                    minHeight: 500,
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Chart
                    options={chartOptions}
                    series={chartSeries}
                    type="bar"
                    height="100%"
                />
            </Paper>

            {!isFullscreen && (
                <Box mt={3} p={2} sx={{ bgcolor: 'rgba(0,0,0,0.02)', borderRadius: 3, border: '1px dashed', borderColor: 'divider' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Map size={14} /> 2025 Yılı Seviye-2 Denetimleri Kapsamında Montajı Tamamlanan Ağaç Direklerin Dağılımıdır.
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default AgacDirekSlide;
