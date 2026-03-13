import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActionArea,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Divider,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    useTheme,
    Switch,
    FormControlLabel,
    Chip,
    Avatar,
    Button
} from '@mui/material';
import { X as CloseIcon, Maximize, Minimize, ClipboardCheck, AlertTriangle, ChartBar, ArrowLeft, MapPin } from 'lucide-react';
import Chart from 'react-apexcharts';
import { auditData } from '../../data/mockData';
import ExportExcelButton from '../ExportExcelButton';

const omToIlMap = {
    'Ceyhan': 'ADANA',
    'Adana Metropol': 'ADANA',
    'Adana Kuzey': 'ADANA',
    'Düziçi': 'OSMANİYE',
    'Osmaniye': 'OSMANİYE',
    'Kadirli': 'OSMANİYE',
    'Erdemli': 'MERSİN',
    'Tarsus': 'MERSİN',
    'Silifke': 'MERSİN',
    'Mut': 'MERSİN',
    'Dörtyol': 'HATAY',
    'Hatay Metropol': 'HATAY',
    'Kırıkhan': 'HATAY',
    'İskenderun': 'HATAY',
    'Reyhanlı': 'HATAY',
    'Islahiye': 'GAZİANTEP',
    'Gaziantep Metropol': 'GAZİANTEP',
    'Kilis': 'KİLİS'
};

const S1S2DenetlemeSlide = () => {
    const theme = useTheme();
    const [selectedOm, setSelectedOm] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    // activeRegion null ise Bölge Kartlarını gösterir. Dolu ise o bölgenin OM alt kartlarını gösterir.
    const [activeRegion, setActiveRegion] = useState(null);

    const slideRef = useRef(null);

    // Filters
    const [ilFilter, setIlFilter] = useState('Tümü');
    const [omFilter, setOmFilter] = useState('Tümü');

    // Fullscreen states
    const [isFullscreen, setIsFullscreen] = useState(() => !!document.fullscreenElement);
    const [dialogFullScreen, setDialogFullScreen] = useState(false);
    const [showTotalInModal, setShowTotalInModal] = useState(false);

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

    // Group data by OM
    const omStats = useMemo(() => {
        const stats = {};

        auditData.forEach(item => {
            if (!stats[item.om]) {
                stats[item.om] = {
                    om: item.om,
                    totalForms: 0,
                    uygun: 0,
                    uygunsuz: 0,
                    items: []
                };
            }
            stats[item.om].totalForms += item.formSayisi;
            stats[item.om].uygun += item.uygun;
            stats[item.om].uygunsuz += item.uygunsuz;
            stats[item.om].items.push(item);
        });

        return Object.values(stats).sort((a, b) => a.om.localeCompare(b.om));
    }, []);

    const iller = useMemo(() => {
        const uniqueIler = [...new Set(omStats.map(s => omToIlMap[s.om] || 'DİĞER'))];
        return ['Tümü', ...uniqueIler.sort()];
    }, [omStats]);

    const filteredOms = useMemo(() => {
        let filtered = omStats;
        if (ilFilter !== 'Tümü') {
            filtered = filtered.filter(s => (omToIlMap[s.om] || 'DİĞER') === ilFilter);
        }
        return ['Tümü', ...filtered.map(s => s.om).sort()];
    }, [omStats, ilFilter]);

    // Verilerin filtrelenmiş hali
    // Eğer activeRegion varsa, sanki ilFilter = activeRegion miş gibi davranıyoruz
    const displayedStats = useMemo(() => {
        const workingIlFilter = activeRegion ? activeRegion : ilFilter;
        return omStats.filter(s => {
            const ilMatch = workingIlFilter === 'Tümü' || (omToIlMap[s.om] || 'DİĞER') === workingIlFilter;
            const omMatch = omFilter === 'Tümü' || s.om === omFilter;
            return ilMatch && omMatch;
        });
    }, [omStats, ilFilter, omFilter, activeRegion]);

    // Bölge bazında (İL) toparlanmış veriler
    const groupedAndSortedStats = useMemo(() => {
        const grouped = {};
        displayedStats.forEach(stat => {
            const il = omToIlMap[stat.om] || 'DİĞER';
            if (!grouped[il]) {
                grouped[il] = {
                    il,
                    oms: [],
                    totalForms: 0,
                    uygun: 0,
                    uygunsuz: 0
                };
            }
            grouped[il].oms.push(stat);
            grouped[il].totalForms += stat.totalForms;
            grouped[il].uygun += stat.uygun;
            grouped[il].uygunsuz += stat.uygunsuz;
        });

        const sortedIls = Object.keys(grouped).sort();
        return sortedIls.map(il => {
            grouped[il].oms.sort((a, b) => a.om.localeCompare(b.om));
            return grouped[il];
        });
    }, [displayedStats]);

    const handleIlChange = (e) => {
        setIlFilter(e.target.value);
        setOmFilter('Tümü');
        setActiveRegion(null); // İl değişirse hiyerarşide en tepeye dön
    };

    const handleOmChange = (e) => {
        setOmFilter(e.target.value);
        if (e.target.value !== 'Tümü' && !activeRegion) {
            // Eğer spesifik bir OM seçildiyse ve bölge modundaysak, otomatik olarak OM moduna geçebiliriz (ya da kullanıcının seçtiği OM'un bölgesine geç)
            const omIl = omToIlMap[e.target.value];
            if (omIl) setActiveRegion(omIl);
        }
    };

    const handleRegionClick = (ilName) => {
        setOmFilter('Tümü'); // Yeni bölgeye girildiği için OM filtresini sıfırla
        setActiveRegion(ilName);
    };

    const handleBackToRegions = () => {
        setActiveRegion(null);
        setOmFilter('Tümü');
    };

    const handleCardClick = (omData) => {
        setSelectedOm(omData);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // Aggregate totals for Pie Charts (Toplanmış Grafikler)
    const aggregateTotals = useMemo(() => {
        let uygun = 0, uygunsuz = 0;
        let dogru = 0, yanlis = 0;
        let s2Duzeltilebilir = 0, s2Disinda = 0;

        displayedStats.forEach(stat => {
            stat.items.forEach(item => {
                uygun += item.uygun;
                uygunsuz += item.uygunsuz;
                dogru += item.dogru;
                yanlis += item.yanlis;
                s2Duzeltilebilir += item.s2Duzeltilebilir;
                s2Disinda += item.s2Disinda;
            });
        });

        const createDonutOptions = (labels, colors, centerLabel) => ({
            chart: { type: 'donut', fontFamily: theme.typography.fontFamily, background: 'transparent' },
            labels: labels,
            colors: colors,
            legend: {
                position: 'bottom',
                fontWeight: 600,
                fontSize: '13px',
                labels: { colors: theme.palette.text.secondary },
                markers: { radius: 12 }
            },
            stroke: { show: true, colors: ['transparent'], width: 2 },
            dataLabels: {
                enabled: true,
                style: { fontSize: '11px', fontWeight: 800, colors: ['#fff'] },
                dropShadow: { enabled: true, top: 1, left: 1, blur: 2, color: '#000', opacity: 0.7 },
                formatter: (val, opts) => {
                    const seriesValue = opts.w.config.series[opts.seriesIndex];
                    return [seriesValue, `%${val.toFixed(1)}`];
                }
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '72%',
                        labels: {
                            show: true,
                            name: { show: true, fontSize: '13px', color: theme.palette.text.secondary, fontWeight: 700 },
                            value: { show: true, fontSize: '26px', fontWeight: 900, color: theme.palette.text.primary },
                            total: {
                                show: true, showAlways: true, label: centerLabel, fontSize: '12px', color: theme.palette.text.secondary, fontWeight: 700,
                                formatter: function (w) {
                                    return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                }
                            }
                        }
                    },
                    dataLabels: {
                        minAngleToShowLabel: 15
                    }
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    type: 'vertical',
                    shadeIntensity: 0.3,
                    gradientToColors: colors.map(c => c + 'AA'),
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 0.85,
                }
            },
            tooltip: {
                theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
                style: { fontSize: '13px', fontWeight: 700 }
            }
        });

        return {
            uygunUygunsuz: {
                options: createDonutOptions(['Uygun', 'Uygunsuz'], ['#10b981', '#ef4444'], 'TOPLAM'),
                series: [uygun, uygunsuz]
            },
            dogruYanlis: {
                options: createDonutOptions(['Doğru', 'Yanlış'], ['#3b82f6', '#f59e0b'], 'TOPLAM'),
                series: [dogru, yanlis]
            },
            s2Durum: {
                options: createDonutOptions(['S2 Düzenlenebilir', 'S2 Dışında'], ['#8b5cf6', '#64748b'], 'TOPLAM'),
                series: [s2Duzeltilebilir, s2Disinda]
            }
        };
    }, [displayedStats, theme]);

    // Modal detay verileri
    const chartData = useMemo(() => {
        if (!selectedOm) return null;

        let categories = [];
        let dataSeries = {
            uygun: [], uygunsuz: [],
            dogru: [], yanlis: [],
            s2Duzeltilebilir: [], s2Disinda: []
        };

        if (showTotalInModal) {
            categories = ['Toplam'];
            let tUygun = 0, tUygunsuz = 0, tDogru = 0, tYanlis = 0, tS2D = 0, tS2Dis = 0;
            selectedOm.items.forEach(i => {
                tUygun += i.uygun; tUygunsuz += i.uygunsuz;
                tDogru += i.dogru; tYanlis += i.yanlis;
                tS2D += i.s2Duzeltilebilir; tS2Dis += i.s2Disinda;
            });
            dataSeries.uygun = [tUygun]; dataSeries.uygunsuz = [tUygunsuz];
            dataSeries.dogru = [tDogru]; dataSeries.yanlis = [tYanlis];
            dataSeries.s2Duzeltilebilir = [tS2D]; dataSeries.s2Disinda = [tS2Dis];
        } else {
            categories = selectedOm.items.map(i => i.tur);
            dataSeries.uygun = selectedOm.items.map(i => i.uygun);
            dataSeries.uygunsuz = selectedOm.items.map(i => i.uygunsuz);
            dataSeries.dogru = selectedOm.items.map(i => i.dogru);
            dataSeries.yanlis = selectedOm.items.map(i => i.yanlis);
            dataSeries.s2Duzeltilebilir = selectedOm.items.map(i => i.s2Duzeltilebilir);
            dataSeries.s2Disinda = selectedOm.items.map(i => i.s2Disinda);
        }

        const getBaseOptions = (colors) => ({
            chart: {
                type: 'bar',
                stacked: true,
                toolbar: { show: false },
                fontFamily: theme.typography.fontFamily,
                background: 'transparent',
                animations: { enabled: true, dynamicAnimation: { speed: 400 } }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    borderRadius: 4,
                    columnWidth: '50%',
                    dataLabels: {
                        total: {
                            enabled: true,
                            style: {
                                fontSize: '13px',
                                fontWeight: 900,
                                color: theme.palette.text.primary
                            }
                        }
                    }
                },
            },
            xaxis: {
                categories: categories,
                labels: {
                    style: { fontSize: '11px', fontWeight: 700, colors: theme.palette.text.secondary },
                    rotateAlways: categories.length > 3,
                    rotate: -45
                },
                axisBorder: { show: false },
                axisTicks: { show: false }
            },
            yaxis: {
                labels: { style: { colors: theme.palette.text.secondary, fontWeight: 600 } }
            },
            legend: {
                position: 'top',
                fontWeight: 600,
                labels: { colors: theme.palette.text.secondary },
                markers: { radius: 12 }
            },
            fill: {
                opacity: 0.95,
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    type: 'vertical',
                    shadeIntensity: 0.2,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 0.8
                }
            },
            grid: {
                borderColor: theme.palette.divider,
                strokeDashArray: 4,
                xaxis: { lines: { show: false } },
                yaxis: { lines: { show: true } }
            },
            colors: colors,
            dataLabels: {
                enabled: true,
                style: { fontSize: '11px', fontWeight: 800, colors: ['#fff'] },
                formatter: (val) => val === 0 ? '' : val,
                dropShadow: { enabled: true, top: 1, left: 1, blur: 2, color: '#000', opacity: 0.7 }
            }
        });

        const uygunUygunsuz = {
            options: getBaseOptions(['#10b981', '#ef4444']),
            series: [
                { name: 'Uygun', data: dataSeries.uygun },
                { name: 'Uygunsuz', data: dataSeries.uygunsuz }
            ]
        };

        const dogruYanlis = {
            options: getBaseOptions(['#3b82f6', '#f59e0b']),
            series: [
                { name: 'Doğru', data: dataSeries.dogru },
                { name: 'Yanlış', data: dataSeries.yanlis }
            ]
        };

        const s2Durum = {
            options: getBaseOptions(['#8b5cf6', '#64748b']),
            series: [
                { name: 'S2 Düzenlenebilir', data: dataSeries.s2Duzeltilebilir },
                { name: 'S2 Dışında', data: dataSeries.s2Disinda }
            ]
        };

        const totalUnchecked = selectedOm.items.reduce((acc, curr) => acc + curr.kontrolEdilmedi, 0);

        return {
            uygunUygunsuz,
            dogruYanlis,
            s2Durum,
            pieOptions: {
                chart: { type: 'donut', fontFamily: theme.typography.fontFamily, background: 'transparent' },
                labels: ['Kontrol Edildi (Form)', 'Kontrol Edilmedi'],
                colors: ['#3b82f6', '#ef4444'],
                legend: { position: 'bottom', fontWeight: 600, labels: { colors: theme.palette.text.secondary } },
                stroke: { show: false },
                plotOptions: {
                    pie: {
                        donut: {
                            size: '65%',
                            labels: {
                                show: true,
                                name: { show: true, fontSize: '11px', color: theme.palette.text.secondary },
                                value: { show: true, fontSize: '20px', fontWeight: 900, color: theme.palette.text.primary },
                                total: {
                                    show: true,
                                    showAlways: true,
                                    label: 'TOPLAM',
                                    fontSize: '12px',
                                    color: theme.palette.text.secondary,
                                    fontWeight: 700,
                                    formatter: function (w) {
                                        return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                    }
                                }
                            }
                        },
                        dataLabels: {
                            minAngleToShowLabel: 15
                        }
                    }
                },
                dataLabels: {
                    enabled: true,
                    style: { fontSize: '10px', fontWeight: 800, colors: ['#fff'] },
                    dropShadow: { enabled: true, top: 1, left: 1, blur: 2, color: '#000', opacity: 0.7 },
                    formatter: (val, opts) => {
                        const seriesValue = opts.w.config.series[opts.seriesIndex];
                        return [seriesValue, `%${val.toFixed(1)}`];
                    }
                },
                fill: { type: 'gradient' }
            },
            pieSeries: [
                selectedOm.totalForms,
                totalUnchecked
            ]
        };
    }, [selectedOm, showTotalInModal, theme]);

    const slideContent = (
        <Box
            sx={{
                p: isFullscreen ? { xs: 2, md: 4 } : 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: theme.palette.background.default,
                overflowY: 'auto'
            }}
        >
            {/* Top Toolbar: Header & Filters merged into a single horizontal row to save vertical space */}
            <Box
                display="flex"
                flexDirection={{ xs: 'column', md: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', md: 'center' }}
                mb={2}
                gap={2}
                sx={{ flexShrink: 0 }}
            >
                {/* Header Info */}
                <Box>
                    <Box display="flex" alignItems="center" gap={1}>
                        <ClipboardCheck size={28} color={theme.palette.primary.main} />
                        <Typography variant="h5" fontWeight="900" color="primary">
                            Seviye-2 Planlı Bakım Denetleme Süreçleri
                        </Typography>
                    </Box>

                </Box>

                {/* Filters & Actions Area */}
                <Box
                    display="flex"
                    flexWrap="wrap"
                    gap={2}
                    alignItems="center"
                    sx={{
                        p: 1.5,
                        borderRadius: 3,
                        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${theme.palette.divider}`,
                    }}
                >
                    <FormControl size="small" sx={{ minWidth: 160 }}>
                        <InputLabel sx={{ fontWeight: 700 }}>Bölge Filtresi</InputLabel>
                        <Select
                            value={ilFilter}
                            label="Bölge Filtresi"
                            onChange={handleIlChange}
                            sx={{ fontWeight: 600, borderRadius: 2 }}
                            MenuProps={{
                                container: () => slideRef.current || document.body,
                                sx: { zIndex: 20000 }
                            }}
                        >
                            {iller.map(il => (
                                <MenuItem key={il} value={il} sx={{ fontWeight: 600 }}>{il === 'Tümü' ? 'Tüm Bölgeler' : `${il} BÖLGESİ`}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 160 }} disabled={!activeRegion && ilFilter === 'Tümü'}>
                        <InputLabel sx={{ fontWeight: 700 }}>Operasyon Merkezi</InputLabel>
                        <Select
                            value={omFilter}
                            label="Operasyon Merkezi"
                            onChange={handleOmChange}
                            sx={{ fontWeight: 600, borderRadius: 2 }}
                            MenuProps={{
                                container: () => slideRef.current || document.body,
                                sx: { zIndex: 20000 }
                            }}
                        >
                            {filteredOms.map(o => (
                                <MenuItem key={o} value={o} sx={{ fontWeight: 600 }}>{o === 'Tümü' ? 'Tüm OM\'ler' : o}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Chip
                        icon={<ChartBar size={16} />}
                        label={activeRegion ? `${groupedAndSortedStats[0]?.oms.length || 0} OM` : `${groupedAndSortedStats.length} Bölge`}
                        color="primary"
                        variant="soft"
                        sx={{ fontWeight: 800, borderRadius: 2, px: 1, backgroundColor: 'primary.main', color: 'primary.contrastText' }}
                    />

                    <ExportExcelButton
                        data={displayedStats.flatMap(stat => stat.items.map(i => ({
                            Bolge: omToIlMap[stat.om] || 'DİĞER',
                            OM: stat.om,
                            FormTipi: i.tur,
                            KontrolEdilen: i.kontrolEdilen,
                            KontrolEdilmeyen: i.kontrolEdilmedi,
                            Uygun: i.uygun,
                            Uygunsuz: i.uygunsuz,
                            Dogru: i.dogru,
                            Yanlis: i.yanlis,
                            S2Duzeltilebilir: i.s2Duzeltilebilir,
                            S2Disinda: i.s2Disinda
                        })))}
                        fileName="Saha_Denetim_Verileri"
                    />

                    <IconButton
                        onClick={toggleFullscreen}
                        color="primary"
                        size="small"
                        sx={{ ml: { xs: 0, lg: 1 }, backgroundColor: 'primary.main', color: 'primary.contrastText', '&:hover': { backgroundColor: 'primary.dark' }, borderRadius: 2 }}
                    >
                        {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                    </IconButton>
                </Box>
            </Box>

            {/* Scrollable Content */}
            <Box flex={1} overflow="auto" sx={{ pr: 1, overflowX: 'hidden' }}>
                {/* Aggregate Charts - Her iki modda da gösterilecek, ilgili verilere göre toplanmış olacak */}
                {displayedStats.length > 0 && (
                    <Box mb={4}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2,
                                borderRadius: 4,
                                border: `1px solid ${theme.palette.divider}`,
                                background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%)',
                                boxShadow: theme.shadows[2]
                            }}
                        >


                            <Grid container spacing={3} alignItems="stretch">
                                {/* DOĞRU YANLIŞ */}
                                <Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Box sx={{
                                        p: 2.5, borderRadius: 3, backgroundColor: theme.palette.background.paper,
                                        display: 'flex', flexDirection: 'column', height: '100%',
                                        border: '1px solid', borderColor: 'rgba(59, 130, 246, 0.2)',
                                        boxShadow: '0 4px 20px rgba(59, 130, 246, 0.05)'
                                    }}>
                                        <Typography variant="subtitle2" fontWeight="800" align="center" mb={1} color="#3b82f6" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#3b82f6' }} />
                                            SAHADAKİ ENVARTERİN DURUMUNUN BAKIM FORMUNA DOĞRU İŞLENMESİ
                                        </Typography>
                                        <Box display="flex" justifyContent="center" mb={2} flex={1}>
                                            <Chart
                                                options={aggregateTotals.dogruYanlis.options}
                                                series={aggregateTotals.dogruYanlis.series}
                                                type="donut"
                                                height={240}
                                                width="100%"
                                            />
                                        </Box>
                                        <Box mt="auto" p={1.5} sx={{ backgroundColor: 'rgba(59, 130, 246, 0.08)', borderRadius: 2, borderLeft: '3px solid #3b82f6' }}>
                                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', fontWeight: 500, lineHeight: 1.2 }}>
                                                Bakım personelinin işlediği bakım formunun ,sahadaki envarterin mevcut durumu ile tutarlılığını gösterir.
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>

                                {/* UYGUN UYGUNSUZ */}
                                <Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Box sx={{
                                        p: 2.5, borderRadius: 3, backgroundColor: theme.palette.background.paper,
                                        display: 'flex', flexDirection: 'column', height: '100%',
                                        border: '1px solid', borderColor: 'rgba(16, 185, 129, 0.2)',
                                        boxShadow: '0 4px 20px rgba(16, 185, 129, 0.05)'
                                    }}>
                                        <Typography variant="subtitle2" fontWeight="800" align="center" mb={1} color="#10b981" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10b981' }} />
                                            BAKIMI YAPILAN ENVARTERİN UYGUNLUK DURUMU
                                        </Typography>
                                        <Box display="flex" justifyContent="center" mb={2} flex={1}>
                                            <Chart
                                                options={aggregateTotals.uygunUygunsuz.options}
                                                series={aggregateTotals.uygunUygunsuz.series}
                                                type="donut"
                                                height={240}
                                                width="100%"
                                            />
                                        </Box>
                                        <Box mt="auto" p={1.5} sx={{ backgroundColor: 'rgba(16, 185, 129, 0.08)', borderRadius: 2, borderLeft: '3px solid #10b981' }}>
                                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', fontWeight: 500, lineHeight: 1.2 }}>
                                                Bakımı yapılan envarterin,ilgili yönetmeliğe/mevzuata uygun bakımının yapılıp yapılmadığını gösterir.
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>

                                {/* S2 DURUM */}
                                <Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Box sx={{
                                        p: 2.5, borderRadius: 3, backgroundColor: theme.palette.background.paper,
                                        display: 'flex', flexDirection: 'column', height: '100%',
                                        border: '1px solid', borderColor: 'rgba(139, 92, 246, 0.2)',
                                        boxShadow: '0 4px 20px rgba(139, 92, 246, 0.05)'
                                    }}>
                                        <Typography variant="subtitle2" fontWeight="800" align="center" mb={1} color="#8b5cf6" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#8b5cf6' }} />
                                            Uygunsuzluk durumunun ,Seviye-2 Kapsamında Yapılabilirliği
                                        </Typography>
                                        <Box display="flex" justifyContent="center" mb={2} flex={1}>
                                            <Chart
                                                options={aggregateTotals.s2Durum.options}
                                                series={aggregateTotals.s2Durum.series}
                                                type="donut"
                                                height={240}
                                                width="100%"
                                            />
                                        </Box>
                                        <Box mt="auto" p={1.5} sx={{ backgroundColor: 'rgba(139, 92, 246, 0.08)', borderRadius: 2, borderLeft: '3px solid #8b5cf6' }}>
                                            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', fontWeight: 500, lineHeight: 1.2 }}>
                                                Bakımı yapılmış ve uygunsuz olan envarterlerin ideal durumda seviye-2 kapsamında yapılabilirliği.
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                )}

                {/* --- REGION MODE (Hiyerarşinin 1. Aşaması) --- */}
                {!activeRegion && (
                    <Box mb={5}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                            <Typography variant="h5" fontWeight="900" color="text.primary" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <span style={{ display: 'inline-block', width: 4, height: 28, borderRadius: 2, backgroundColor: theme.palette.primary.main }} />
                                BÖLGELERE GÖRE GENEL DURUM
                            </Typography>
                            <Divider sx={{ flexGrow: 1, ml: 1, borderColor: theme.palette.divider }} />
                        </Box>
                        <Grid container spacing={3}>
                            {groupedAndSortedStats.map((group) => {
                                const uygunsuzPercent = group.totalForms > 0 ? (group.uygunsuz / group.totalForms) * 100 : 0;
                                const isWarning = uygunsuzPercent > 30; // highlight region if overall unsuitability > 30%

                                return (
                                    <Grid item xs={12} sm={6} md={4} key={group.il}>
                                        <Card
                                            elevation={0}
                                            onClick={() => handleRegionClick(group.il)}
                                            sx={{
                                                height: '100%',
                                                borderRadius: 4,
                                                border: '1px solid',
                                                borderColor: isWarning ? 'rgba(239, 68, 68, 0.3)' : theme.palette.divider,
                                                background: isWarning ? 'linear-gradient(145deg, rgba(239, 68, 68, 0.03) 0%, rgba(255,255,255,0.02) 100%)' : 'rgba(255,255,255,0.02)',
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                cursor: 'pointer',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                '&:hover': {
                                                    transform: 'translateY(-6px)',
                                                    boxShadow: theme.palette.mode === 'dark' ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.08)',
                                                    borderColor: isWarning ? '#ef4444' : theme.palette.primary.main,
                                                    background: isWarning ? 'linear-gradient(145deg, rgba(239, 68, 68, 0.06) 0%, rgba(255,255,255,0.02) 100%)' : 'linear-gradient(145deg, rgba(59, 130, 246, 0.05) 0%, rgba(255,255,255,0.01) 100%)',
                                                }
                                            }}
                                        >
                                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: isWarning ? '#ef4444' : theme.palette.primary.main }} />

                                            <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                                <MapPin size={32} color={isWarning ? "#ef4444" : theme.palette.primary.main} style={{ margin: '0 auto 12px' }} />
                                                <Typography variant="h5" fontWeight="900" sx={{ letterSpacing: -0.5, mb: 1 }}>
                                                    {group.il} BÖLGESİ
                                                </Typography>
                                                <Typography variant="subtitle2" color="text.secondary" fontWeight={600} mb={3}>
                                                    {group.oms.length} Operasyon Merkezi Mevcut
                                                </Typography>

                                                <Box display="flex" justifyContent="space-around" borderTop={`1px dashed ${theme.palette.divider}`} pt={3}>
                                                    <Box>
                                                        <Typography variant="h6" fontWeight="900" color="primary">{group.totalForms}</Typography>
                                                        <Typography variant="caption" color="text.secondary" fontWeight={600}>Total Envarter</Typography>
                                                    </Box>
                                                    <Box>
                                                        <Typography variant="h6" fontWeight="900" color="#10b981">{group.uygun}</Typography>
                                                        <Typography variant="caption" color="text.secondary" fontWeight={600}>Uygun</Typography>
                                                    </Box>
                                                    <Box>
                                                        <Typography variant="h6" fontWeight="900" color="#ef4444">{group.uygunsuz}</Typography>
                                                        <Typography variant="caption" color="text.secondary" fontWeight={600}>Uygunsuz</Typography>
                                                    </Box>
                                                </Box>

                                                <Button variant="contained" color={isWarning ? "error" : "primary"} sx={{ mt: 3, borderRadius: 2, fontWeight: 700 }} fullWidth>
                                                    OM'leri Görüntüle
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>
                )}

                {/* --- OM MODE (Hiyerarşinin 2. Aşaması) --- */}
                {activeRegion && groupedAndSortedStats.length > 0 && (
                    <Box mb={5}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                            <Button
                                variant="outlined"
                                startIcon={<ArrowLeft size={16} />}
                                onClick={handleBackToRegions}
                                sx={{ borderRadius: 2, fontWeight: 700 }}
                            >
                                Bölgelere Dön
                            </Button>
                            <Typography variant="h5" fontWeight="900" color="text.primary" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 2 }}>
                                <span style={{ display: 'inline-block', width: 4, height: 28, borderRadius: 2, backgroundColor: theme.palette.primary.main }} />
                                {groupedAndSortedStats[0].il} OM DETAYLARI
                            </Typography>
                            <Divider sx={{ flexGrow: 1, ml: 1, borderColor: theme.palette.divider }} />
                        </Box>

                        <Grid container spacing={3}>
                            {groupedAndSortedStats[0].oms.map((stat) => {
                                const uygunsuzPercent = stat.totalForms > 0 ? (stat.uygunsuz / stat.totalForms) * 100 : 0;
                                const isWarning = uygunsuzPercent > 30;

                                return (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={stat.om}>
                                        <Card
                                            elevation={0}
                                            onClick={() => handleCardClick(stat)}
                                            sx={{
                                                height: '100%',
                                                borderRadius: 4,
                                                border: '1px solid',
                                                borderColor: isWarning ? 'rgba(239, 68, 68, 0.3)' : theme.palette.divider,
                                                background: isWarning ? 'linear-gradient(145deg, rgba(239, 68, 68, 0.03) 0%, rgba(255,255,255,0.02) 100%)' : 'rgba(255,255,255,0.02)',
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                cursor: 'pointer',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                '&:hover': {
                                                    transform: 'translateY(-6px)',
                                                    boxShadow: theme.palette.mode === 'dark' ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.08)',
                                                    borderColor: isWarning ? '#ef4444' : theme.palette.primary.main,
                                                    background: isWarning ? 'linear-gradient(145deg, rgba(239, 68, 68, 0.06) 0%, rgba(255,255,255,0.02) 100%)' : 'linear-gradient(145deg, rgba(59, 130, 246, 0.05) 0%, rgba(255,255,255,0.01) 100%)',
                                                }
                                            }}
                                        >
                                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: isWarning ? '#ef4444' : theme.palette.primary.main }} />

                                            <CardContent sx={{ p: 3, pt: 4 }}>
                                                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                                                    <Typography variant="h6" fontWeight="900" sx={{ letterSpacing: -0.5, lineHeight: 1.2 }}>
                                                        {stat.om}
                                                    </Typography>
                                                    {isWarning && (
                                                        <AlertTriangle size={18} color="#ef4444" style={{ marginTop: 2, flexShrink: 0 }} />
                                                    )}
                                                </Box>

                                                <Box display="flex" alignItems="center" bgcolor="rgba(0,0,0,0.03)" p={1.5} borderRadius={2} mb={2}>
                                                    <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main', mr: 1.5, fontSize: '0.9rem', fontWeight: 800 }}>
                                                        {stat.totalForms}
                                                    </Avatar>
                                                    <Typography variant="body2" color="text.secondary" fontWeight={600}>
                                                        Toplam Envarter
                                                    </Typography>
                                                </Box>

                                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
                                                    <Typography variant="body2" color="text.secondary" fontWeight="500" display="flex" alignItems="center" gap={1}>
                                                        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10b981' }} /> Uygun
                                                    </Typography>
                                                    <Typography variant="body1" fontWeight="800" color="#10b981">
                                                        {stat.uygun}
                                                    </Typography>
                                                </Box>

                                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                                    <Typography variant="body2" color="text.secondary" fontWeight="500" display="flex" alignItems="center" gap={1}>
                                                        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#ef4444' }} /> Uygunsuz
                                                    </Typography>
                                                    <Typography variant="body1" fontWeight="900" color="#ef4444">
                                                        {stat.uygunsuz}
                                                    </Typography>
                                                </Box>

                                                {/* Progress bar visualizing uygunsuz percent */}
                                                <Box sx={{ width: '100%', height: 6, bgcolor: 'rgba(0,0,0,0.05)', borderRadius: 3, mt: 2, overflow: 'hidden' }}>
                                                    <Box sx={{
                                                        height: '100%',
                                                        width: `${stat.totalForms > 0 ? (stat.uygun / stat.totalForms) * 100 : 0}%`,
                                                        bgcolor: '#10b981',
                                                        borderRadius: 3
                                                    }} />
                                                </Box>

                                            </CardContent>
                                        </Card>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>
                )}

                {groupedAndSortedStats.length === 0 && (
                    <Box py={10} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <ChartBar size={64} style={{ color: theme.palette.divider, marginBottom: 16 }} />
                        <Typography variant="h6" color="text.secondary" fontWeight={700} align="center">
                            Seçilen filtrelere uygun veri bulunamadı.
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );

    // Modal etc. below
    return (
        <React.Fragment>
            <div
                ref={slideRef}
                data-theme={isFullscreen ? 'light' : undefined}
                style={isFullscreen ? { position: 'fixed', inset: 0, zIndex: 1000, background: '#fff', overflowY: 'auto', display: 'flex', flexDirection: 'column' } : { height: '100%' }}>
                {slideContent}
            </div>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth="lg"
                fullWidth
                fullScreen={dialogFullScreen}
                container={() => slideRef.current || document.getElementById('presentation-fullscreen-wrapper') || document.body}
                sx={{ zIndex: 15000 }}
                PaperProps={{
                    sx: { borderRadius: dialogFullScreen ? 0 : 4, p: 1, backgroundColor: theme.palette.background.default }
                }}
            >
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2, borderBottom: `1px solid ${theme.palette.divider}`, mb: 2 }}>
                    <Typography variant="h5" fontWeight="900" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <div style={{ width: 12, height: 32, borderRadius: 4, backgroundColor: theme.palette.primary.main }} />
                        {selectedOm?.om}  ENVARTER BAZLI BAKIM FORM ANALİZLERİ
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={showTotalInModal}
                                    onChange={(e) => setShowTotalInModal(e.target.checked)}
                                    color="primary"
                                />
                            }
                            label={<Typography variant="body2" fontWeight="800">Toplam Göster</Typography>}
                            sx={{ mr: 2, background: 'rgba(0,0,0,0.03)', px: 1.5, py: 0.5, borderRadius: 2 }}
                        />
                        <IconButton onClick={() => setDialogFullScreen(!dialogFullScreen)} size="small" sx={{ bgcolor: 'rgba(0,0,0,0.04)' }}>
                            {dialogFullScreen ? <Minimize size={18} /> : <Maximize size={18} />}
                        </IconButton>
                        <IconButton onClick={handleCloseDialog} size="small" sx={{ bgcolor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', '&:hover': { bgcolor: '#ef4444', color: '#fff' } }}>
                            <CloseIcon size={18} />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    {chartData && (
                        <Grid container spacing={3}>
                            {/* Ana Kontrol Özeti */}
                            <Grid item xs={12} lg={4}>
                                <Paper elevation={0} sx={{
                                    p: 3, borderRadius: 4, height: '100%', display: 'flex', flexDirection: 'column',
                                    background: 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, transparent 100%)',
                                    border: `1px solid ${theme.palette.divider}`
                                }}>
                                    <Box display="flex" alignItems="center" gap={1.5} mb={3}>
                                        <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}><ClipboardCheck size={16} /></Avatar>
                                        <Typography variant="subtitle1" fontWeight="900" color="text.primary">
                                            SİM Tarafından Yapılan Seviye-2 Denetlemeleri
                                        </Typography>
                                    </Box>
                                    <Box flex={1} display="flex" alignItems="center" justifyContent="center">
                                        <Chart
                                            options={chartData.pieOptions}
                                            series={chartData.pieSeries}
                                            type="donut"
                                            height={280}
                                            width="100%"
                                        />
                                    </Box>
                                    <Box mt="auto" pt={2} sx={{ borderTop: `1px dashed ${theme.palette.divider}` }}>
                                        <Typography variant="body2" color="text.secondary" fontWeight={500} align="center">
                                            SİM tarafından denetlenen  seviye-2 kapsamındaki toplam envarter sayısı
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>

                            {/* Dağılım Barları */}
                            <Grid item xs={12} lg={8}>
                                <Grid container spacing={3} sx={{ height: '100%' }}>

                                    <Grid item xs={12} md={6}>
                                        <Paper elevation={0} sx={{ p: 2, borderRadius: 4, border: `1px solid ${theme.palette.divider}`, height: '100%' }}>
                                            <Typography variant="subtitle2" fontWeight="800" align="center" mb={1} color="text.primary">
                                                SAHADAKİ ENVARTERİN DURUMUNUN BAKIM FORMUNA DOĞRU İŞLENMESİ
                                            </Typography>
                                            <Chart
                                                options={chartData.dogruYanlis.options}
                                                series={chartData.dogruYanlis.series}
                                                type="bar"
                                                height={230}
                                            />
                                            <Box mt={2} pt={1.5} sx={{ borderTop: `1px dashed ${theme.palette.divider}` }}>
                                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', fontWeight: 500, lineHeight: 1.2 }}>
                                                    Bakım personelinin işlediği bakım formunun ,sahadaki envarterin mevcut durumu ile tutarlılığını gösterir.
                                                </Typography>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Paper elevation={0} sx={{ p: 2, borderRadius: 4, border: `1px solid ${theme.palette.divider}`, height: '100%' }}>
                                            <Typography variant="subtitle2" fontWeight="800" align="center" mb={1} color="text.primary">
                                                Denetimde Tespit Edilen Uygunsuz Envarter Durumu
                                            </Typography>
                                            <Chart
                                                options={chartData.uygunUygunsuz.options}
                                                series={chartData.uygunUygunsuz.series}
                                                type="bar"
                                                height={230}
                                            />
                                            <Box mt={2} pt={1.5} sx={{ borderTop: `1px dashed ${theme.palette.divider}` }}>
                                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', fontWeight: 500, lineHeight: 1.2 }}>
                                                    Bakımı yapılmış envarterin ilgili yönetmenliğe/mevzuata uygunluk durumunu ifade eder.
                                                </Typography>
                                            </Box>
                                        </Paper>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Paper elevation={0} sx={{ p: 2, borderRadius: 4, border: `1px solid ${theme.palette.divider}`, height: '100%' }}>
                                            <Typography variant="subtitle2" fontWeight="800" align="center" mb={1} color="text.primary">
                                                UYGUNSUZLUK DURUMUNUN SEVİYE-2 KAPSAMINDA YAPILABİLİRLİĞİ
                                            </Typography>
                                            <Chart
                                                options={chartData.s2Durum.options}
                                                series={chartData.s2Durum.series}
                                                type="bar"
                                                height={230}
                                            />
                                            <Box mt={2} pt={1.5} sx={{ borderTop: `1px dashed ${theme.palette.divider}` }}>
                                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem', fontWeight: 500, lineHeight: 1.2 }}>
                                                    Bakımı yapılmış ve uygunsuz olan envarterlerin ideal durumda seviye-2 kapsamında yapılabilirliği.
                                                </Typography>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                    )}
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
};

export default S1S2DenetlemeSlide;
