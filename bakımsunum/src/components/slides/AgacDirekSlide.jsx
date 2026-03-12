import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Box, Typography, Paper, useTheme, Grid, Card, CardContent, IconButton } from '@mui/material';
import Chart from 'react-apexcharts';
import { agacDirekData } from '../../data/mockData';
import { TreePine, BarChart3, TrendingUp, Info, Maximize, Minimize } from 'lucide-react';

const AgacDirekSlide = () => {
    const theme = useTheme();
    const slideRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(() => !!document.fullscreenElement);

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

    // Veriyi azalan sıraya göre sıralayalım
    const sortedData = useMemo(() => {
        return [...agacDirekData].sort((a, b) => b.agacDirekSayisi - a.agacDirekSayisi);
    }, []);

    const totalCount = useMemo(() => {
        return sortedData.reduce((acc, curr) => acc + curr.agacDirekSayisi, 0);
    }, [sortedData]);

    const averageCount = Math.round(totalCount / sortedData.length);

    const chartOptions = {
        chart: {
            type: 'bar',
            height: isFullscreen ? 600 : 550,
            toolbar: { show: true },
            fontFamily: theme.typography.fontFamily,
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 6,
                borderRadiusApplication: 'end',
                horizontal: false,
                columnWidth: '60%',
                distributed: true,
                dataLabels: {
                    position: 'top',
                },
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val;
            },
            offsetY: -25,
            style: {
                fontSize: '12px',
                fontWeight: 900,
                colors: [theme.palette.text.primary]
            }
        },
        colors: [
            '#059669',/* '#10b981', '#34d399', '#6ee7b7', '#a7f3d0',
            '#0d9488', '#14b8a6', '#2dd4bf', '#5eead4', '#99f6e4',
            '#0891b2', '#06b6d4', '#22d3ee', '#67e8f9', '#a5f3fc'*/
        ],
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: sortedData.map(item => item.om),
            labels: {
                style: {
                    colors: theme.palette.text.secondary,
                    fontSize: '11px',
                    fontWeight: 700
                },
                rotate: -45,
                rotateAlways: true,
            },
            axisBorder: { show: false },
            axisTicks: { show: false }
        },
        yaxis: {
            title: {
                text: 'Ağaç Direk Sayısı',
                style: {
                    color: theme.palette.text.secondary,
                    fontWeight: 700
                }
            },
            labels: {
                style: {
                    colors: theme.palette.text.secondary,
                    fontWeight: 600
                }
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: "vertical",
                shadeIntensity: 0.25,
                gradientToColors: undefined,
                inverseColors: true,
                opacityFrom: 0.85,
                opacityTo: 1,
                stops: [50, 0, 100, 100]
            }
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
            y: {
                formatter: function (val) {
                    return val + " Adet"
                }
            },
            marker: {
                show: true,
            },
        },
        grid: {
            borderColor: theme.palette.divider,
            strokeDashArray: 4,
            yaxis: {
                lines: { show: true }
            }
        },
        legend: {
            show: false
        },
        title: {
            text: 'OM Bazlı Seviye-2 den Montajı Yapılan ağaç Direk Sayıları',
            align: 'left',
            style: {
                fontSize: isFullscreen ? '22px' : '18px',
                fontWeight: 900,
                color: theme.palette.primary.main
            }
        },
        subtitle: {
            text: '2025 Yılı Dikilen Ağaç Direkler',
            align: 'left',
            style: {
                fontSize: isFullscreen ? '16px' : '14px',
                color: theme.palette.text.secondary
            }
        }
    };

    const chartSeries = [{
        name: 'Ağaç Direk Sayısı',
        data: sortedData.map(item => item.agacDirekSayisi)
    }];

    const slideContent = (
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
                            Seviye-2 Kapsamında Dikilen Ağaç Direkler
                        </Typography>
                        <Typography variant={isFullscreen ? "h6" : "subtitle1"} color="text.secondary" fontWeight="600">
                            Montaj Edilen Ağaç Direklerin OM Bazlı Dağılımı
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

            <Grid container spacing={3} mb={isFullscreen ? 3 : 4}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider', boxShadow: 'none', background: 'rgba(16, 185, 129, 0.03)' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: isFullscreen ? 3 : 2 }}>
                            <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                                <TrendingUp size={isFullscreen ? 32 : 24} />
                            </Box>
                            <Box>
                                <Typography variant="caption" fontWeight="800" color="text.secondary" sx={{ textTransform: 'uppercase', fontSize: isFullscreen ? '0.85rem' : '0.75rem' }}>Toplam Envanter</Typography>
                                <Typography variant={isFullscreen ? "h4" : "h5"} fontWeight="900" color="#10b981">{totalCount} Adet</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider', boxShadow: 'none', background: 'rgba(59, 130, 246, 0.03)' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: isFullscreen ? 3 : 2 }}>
                            <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                                <BarChart3 size={isFullscreen ? 32 : 24} />
                            </Box>
                            <Box>
                                <Typography variant="caption" fontWeight="800" color="text.secondary" sx={{ textTransform: 'uppercase', fontSize: isFullscreen ? '0.85rem' : '0.75rem' }}>OM Başına Ortalama</Typography>
                                <Typography variant={isFullscreen ? "h4" : "h5"} fontWeight="900" color="#3b82f6">{averageCount} Adet</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ borderRadius: 4, border: '1px solid', borderColor: 'divider', boxShadow: 'none', background: 'rgba(245, 158, 11, 0.03)' }}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: isFullscreen ? 3 : 2 }}>
                            <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                                <Info size={isFullscreen ? 32 : 24} />
                            </Box>
                            <Box>
                                <Typography variant="caption" fontWeight="800" color="text.secondary" sx={{ textTransform: 'uppercase', fontSize: isFullscreen ? '0.85rem' : '0.75rem' }}>En Yüksek OM</Typography>
                                <Typography variant={isFullscreen ? "h4" : "h5"} fontWeight="900" color="#f59e0b">{sortedData[0].om} ({sortedData[0].agacDirekSayisi})</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Paper
                elevation={0}
                sx={{
                    p: isFullscreen ? 4 : 4,
                    borderRadius: 5,
                    border: '1px solid',
                    borderColor: 'divider',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%)',
                    position: 'relative',
                    flex: 1,
                    minHeight: isFullscreen ? 500 : 600,
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
                <Box mt={4} p={3} sx={{ bgcolor: 'rgba(0,0,0,0.02)', borderRadius: 4, border: '1px dashed', borderColor: 'divider' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', fontWeight: 500 }}>
                        2025 Yılında Seviye-2 Kapsamında Dikilen Ağaç Direkler
                    </Typography>
                </Box>
            )}
        </Box>
    );

    return (
        <div
            ref={slideRef}
            data-theme={isFullscreen ? 'light' : undefined}
            style={isFullscreen ? {
                position: 'fixed',
                inset: 0,
                zIndex: 1000,
                background: '#fff',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column'
            } : { height: '100%' }}>
            {slideContent}
        </div>
    );
};

export default AgacDirekSlide;

