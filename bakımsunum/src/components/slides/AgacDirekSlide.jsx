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
            toolbar: { show: true },
            fontFamily: theme.typography.fontFamily,
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                borderRadiusApplication: 'end',
                horizontal: false,
                columnWidth: '60%',
                distributed: true,
                dataLabels: { position: 'top' },
            }
        },
        dataLabels: {
            enabled: true,
            formatter: (val) => val,
            offsetY: -20,
            style: {
                fontSize: '10px',
                fontWeight: 900,
                colors: [theme.palette.text.primary]
            }
        },
        colors: ['#059669'],
        stroke: { show: true, width: 2, colors: ['transparent'] },
        xaxis: {
            categories: filteredAndSortedData.map(item => item.om),
            labels: {
                style: {
                    colors: theme.palette.text.secondary,
                    fontSize: '9px',
                    fontWeight: 700
                },
                rotate: -45,
                rotateAlways: filteredAndSortedData.length > 8,
            },
            axisBorder: { show: false },
            axisTicks: { show: false }
        },
        yaxis: {
            title: {
                text: 'Ağaç Direk Sayısı',
                style: { color: theme.palette.text.secondary, fontWeight: 700, fontSize: '10px' }
            },
            labels: {
                style: { colors: theme.palette.text.secondary, fontWeight: 600, fontSize: '10px' }
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: "vertical",
                opacityFrom: 0.85,
                opacityTo: 1,
                stops: [0, 100]
            }
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
            y: { formatter: (val) => val + " Adet" },
        },
        grid: {
            borderColor: theme.palette.divider,
            strokeDashArray: 4,
            yaxis: { lines: { show: true } }
        },
        legend: { show: false },
        title: {
            text: `${selectedBolge === 'HEPSİ' ? 'Tüm' : selectedBolge} Bölgeler — OM Bazlı Dağılım`,
            align: 'left',
            style: {
                fontSize: '14px',
                fontWeight: 900,
                color: theme.palette.text.primary
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
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#f8fafc', // Hafif gri arka plan (slate-50)
                overflow: 'hidden'
            }}
        >
            {/* Header - Daha Sıkışık */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
                <Box display="flex" alignItems="center" gap={1.5}>
                    <Box
                        sx={{
                            p: 1,
                            borderRadius: 2,
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            color: '#fff',
                            boxShadow: '0 2px 10px rgba(16, 185, 129, 0.2)'
                        }}
                    >
                        <TreePine size={isFullscreen ? 32 : 24} />
                    </Box>
                    <Box>
                        <Typography variant={isFullscreen ? "h4" : "h6"} fontWeight="900" color="primary" sx={{ lineHeight: 1.2 }}>
                            2025 YILI SEVİYE-2 AĞAÇ DİREK MONTAJI
                        </Typography>
                        <Typography variant="caption" color="text.secondary" fontWeight="700" sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
                            Bölge ve OM Bazlı Montaj Analizi
                        </Typography>
                    </Box>
                </Box>

                <Box display="flex" gap={1}>
                    <IconButton
                        onClick={toggleFullscreen}
                        size="small"
                        sx={{
                            backgroundColor: 'primary.main',
                            color: 'primary.contrastText',
                            '&:hover': { backgroundColor: 'primary.dark' },
                            borderRadius: 1.5,
                        }}
                    >
                        {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                    </IconButton>
                </Box>
            </Box>

            {/* Bölge Seçimi - Daha Sıkışık */}
            <Paper
                elevation={0}
                sx={{
                    p: 1.5,
                    mb: 1.5,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    background: '#fff'
                }}
            >
                <Box display="flex" alignItems="center" gap={3}>
                    <Tabs
                        value={selectedBolge}
                        onChange={handleBolgeChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
                            minHeight: 40,
                            '& .MuiTabs-indicator': { height: 3, borderRadius: '3px' },
                            '& .MuiTab-root': { fontWeight: 800, fontSize: '0.75rem', minHeight: 40, py: 0 }
                        }}
                    >
                        <Tab label="TÜM BÖLGELER" value="HEPSİ" />
                        {agacDirekBolgeData.map(b => (
                            <Tab key={b.bolge} label={b.bolge} value={b.bolge} />
                        ))}
                    </Tabs>

                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        {agacDirekBolgeData.map(b => (
                            <Chip
                                key={b.bolge}
                                label={b.dikilen}
                                size="small"
                                color={selectedBolge === b.bolge ? "primary" : "default"}
                                variant={selectedBolge === b.bolge ? "filled" : "outlined"}
                                sx={{ fontWeight: 900, fontSize: '0.7rem', height: 24, borderRadius: 1 }}
                            />
                        ))}
                    </Box>
                </Box>
            </Paper>

            {/* KPI Cards - Daha Sıkışık */}
            <Grid container spacing={1.5} mb={1.5}>
                {[
                    { label: 'TOROSLAR Toplam Direk', value: companyTotal, color: '#059669', bg: 'rgba(5, 150, 105, 0.05)', icon: TreePine },
                    { label: `${selectedBolge === 'HEPSİ' ? 'Seçili' : selectedBolge} Toplam`, value: totalCount, color: '#10b981', bg: 'rgba(16, 185, 129, 0.03)', icon: TrendingUp },
                    { label: 'Genel Oran', value: `%${regionPercentage}`, color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.03)', icon: BarChart3 },
                    { label: 'OM Başın Dikilen Ort. Direk', value: averageCount, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.03)', icon: BarChart3 },
                    { label: 'OM Sayısı', value: filteredAndSortedData.length, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.03)', icon: Map }
                ].map((item, idx) => (
                    <Grid item xs={12} sm={6} md={2.4} key={idx}>
                        <Card sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider', boxShadow: 'none', background: item.bg }}>
                            <Box sx={{ p: 1.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Box sx={{ p: 0.8, borderRadius: 1.5, bgcolor: '#fff', color: item.color, border: '1px solid', borderColor: 'divider' }}>
                                    <item.icon size={16} />
                                </Box>
                                <Box>
                                    <Typography variant="caption" fontWeight="800" color="text.secondary" sx={{ textTransform: 'uppercase', fontSize: '0.6rem', display: 'block', mb: -0.5 }}>
                                        {item.label}
                                    </Typography>
                                    <Typography variant="subtitle1" fontWeight="900" color={item.color}>{item.value}</Typography>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Main Chart Container - Kalan Boşluğu Kaplar */}
            <Paper
                elevation={0}
                sx={{
                    p: 2,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 0, // Flex child'ın küçülmesine izin verir
                    background: '#fff'
                }}
            >
                <Box sx={{ flex: 1, minHeight: 0 }}>
                    <Chart
                        options={chartOptions}
                        series={chartSeries}
                        type="bar"
                        height="100%"
                    />
                </Box>
            </Paper>

            {/* Footer - Sadece Fullscreen Değilken ve Yer Varsa */}
            {!isFullscreen && (
                <Box mt={1.5} display="flex" justifyContent="center">
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, opacity: 0.7 }}>
                        2025 Yılı Seviye-2 Denetimleri Kapsamında Montajı Tamamlanan Ağaç Direklerin Dağılım Analizidir.
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default AgacDirekSlide;
