import React, { useState, useMemo } from 'react';
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
    FormControlLabel
} from '@mui/material';
import { X as CloseIcon, Maximize, Minimize } from 'lucide-react';
import Chart from 'react-apexcharts';
import { auditData } from '../../data/mockData';

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

    // Filters
    const [ilFilter, setIlFilter] = useState('Tümü');
    const [omFilter, setOmFilter] = useState('Tümü');

    // Fullscreen states
    const [cardsFullScreen, setCardsFullScreen] = useState(false);
    const [dialogFullScreen, setDialogFullScreen] = useState(false);
    const [showTotalInModal, setShowTotalInModal] = useState(false);

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

        return Object.values(stats).sort((a, b) => b.totalForms - a.totalForms);
    }, []);

    // Filter Logic
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

    const displayedStats = useMemo(() => {
        return omStats.filter(s => {
            const ilMatch = ilFilter === 'Tümü' || (omToIlMap[s.om] || 'DİĞER') === ilFilter;
            const omMatch = omFilter === 'Tümü' || s.om === omFilter;
            return ilMatch && omMatch;
        });
    }, [omStats, ilFilter, omFilter]);

    const handleIlChange = (e) => {
        setIlFilter(e.target.value);
        setOmFilter('Tümü'); // Reset OM filter when IL changes
    };

    const handleCardClick = (omData) => {
        setSelectedOm(omData);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    // Calculate chart data based on selected OM
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
                fontFamily: theme.typography.fontFamily
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    borderRadius: 4,
                    dataLabels: {
                        total: {
                            enabled: true,
                            style: {
                                fontSize: '13px',
                                fontWeight: 900
                            }
                        }
                    }
                },
            },
            xaxis: {
                categories: categories,
            },
            legend: {
                position: 'top',
            },
            fill: {
                opacity: 1
            },
            colors: colors,
            dataLabels: {
                enabled: true,
                formatter: (val) => val === 0 ? '' : val // Hide 0s
            }
        });

        const uygunUygunsuz = {
            options: getBaseOptions(['#00E396', '#FF4560']), // Green, Red
            series: [
                { name: 'Uygun', data: dataSeries.uygun },
                { name: 'Uygunsuz', data: dataSeries.uygunsuz }
            ]
        };

        const dogruYanlis = {
            options: getBaseOptions(['#008FFB', '#FEB019']), // Blue, Orange
            series: [
                { name: 'Doğru', data: dataSeries.dogru },
                { name: 'Yanlış', data: dataSeries.yanlis }
            ]
        };

        const s2Durum = {
            options: getBaseOptions(['#775DD0', '#546E7A']), // Purple, Greyish
            series: [
                { name: 'S2 Düzenlenebilir', data: dataSeries.s2Duzeltilebilir },
                { name: 'S2 Dışında', data: dataSeries.s2Disinda }
            ]
        };

        return {
            uygunUygunsuz,
            dogruYanlis,
            s2Durum,
            pieOptions: {
                chart: { type: 'pie', fontFamily: theme.typography.fontFamily },
                labels: ['Kontrol Edildi (Form)', 'Kontrol Edilmedi'],
                colors: ['#008FFB', '#FF4560'],
                legend: { position: 'bottom' },
                dataLabels: {
                    enabled: true,
                    formatter: function (val, opts) {
                        return opts.w.config.series[opts.seriesIndex];
                    }
                }
            },
            pieSeries: [
                selectedOm.totalForms,
                selectedOm.items.reduce((acc, curr) => acc + curr.kontrolEdilmedi, 0)
            ]
        };
    }, [selectedOm, showTotalInModal, theme]);

    // Aggregate totals for displayed stats
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

        const createPieOptions = (labels, colors) => ({
            chart: { type: 'pie', fontFamily: theme.typography.fontFamily },
            labels: labels,
            colors: colors,
            legend: { position: 'bottom' },
            dataLabels: {
                enabled: true,
                formatter: function (val, opts) {
                    return opts.w.config.series[opts.seriesIndex];
                }
            }
        });

        return {
            uygunUygunsuz: {
                options: createPieOptions(['Uygun', 'Uygunsuz'], ['#00E396', '#FF4560']),
                series: [uygun, uygunsuz]
            },
            dogruYanlis: {
                options: createPieOptions(['Doğru', 'Yanlış'], ['#008FFB', '#FEB019']),
                series: [dogru, yanlis]
            },
            s2Durum: {
                options: createPieOptions(['S2 Düzenlenebilir', 'S2 Dışında'], ['#775DD0', '#546E7A']),
                series: [s2Duzeltilebilir, s2Disinda]
            }
        };
    }, [displayedStats, theme]);

    const slideContent = (
        <Box
            sx={{
                p: cardsFullScreen ? 4 : 0,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: theme.palette.background.default,
                overflow: 'hidden'
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}     >
                <Typography variant="h4" fontWeight="bold" color="primary">
                    S1-S2 Denetleme Özeti
                </Typography>
                <IconButton onClick={() => setCardsFullScreen(!cardsFullScreen)} color="primary">
                    {cardsFullScreen ? <Minimize /> : <Maximize />}
                </IconButton>
            </Box>

            {/* Filters */}
            <Box display="flex" gap={2} mb={3}>
                <FormControl size="small" sx={{ minWidth: 200 }}>
                    <InputLabel>İL</InputLabel>
                    <Select
                        value={ilFilter}
                        label="İL"
                        onChange={handleIlChange}
                    >
                        {iller.map(il => (
                            <MenuItem key={il} value={il}>{il}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl size="small" sx={{ minWidth: 200 }}>
                    <InputLabel>OM</InputLabel>
                    <Select
                        value={omFilter}
                        label="OM"
                        onChange={(e) => setOmFilter(e.target.value)}
                    >
                        {filteredOms.map(o => (
                            <MenuItem key={o} value={o}>{o}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Box flex={1} overflow="auto" pb={4} sx={{ pr: 1, overflowX: 'hidden' }}>
                {/* Aggregate Pie Charts */}
                {displayedStats.length > 0 && (
                    <Box mb={4}>
                        <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
                            <Typography variant="h6" fontWeight="bold" color="primary" mb={3} align="center">
                                TOROSLAR EDAŞ BAKIM FORMU-SAHA DENETLEME ANALİZLERİNE DAİR GENEL ÖZET
                            </Typography>
                            <Grid container spacing={3} alignItems="stretch">
                                <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="subtitle2" fontWeight="bold" align="center" mb={1} color="primary">
                                        Doğru - Yanlış Oranı
                                    </Typography>
                                    <Box display="flex" justifyContent="center" mb={2}>
                                        <Box sx={{ width: '100%', maxWidth: 300 }}>
                                            <Chart
                                                options={aggregateTotals.dogruYanlis.options}
                                                series={aggregateTotals.dogruYanlis.series}
                                                type="pie"
                                                height={300}
                                                width="100%"
                                            />
                                        </Box>
                                    </Box>
                                    <Box mt="auto" p={1.5} sx={{ backgroundColor: 'rgba(0, 143, 251, 0.08)', borderRadius: 2, borderLeft: '4px solid #008FFB' }}>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', fontSize: '0.85rem', whiteSpace: 'normal', wordBreak: 'break-word', overflowWrap: 'break-word', lineHeight: 1.4 }}>
                                            Bakım formlarına işlenen verilerin, sahadaki durumlar doğrultusunda işlendiğine dair analiz. burayı daha detaytlı yazacağımmm
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="subtitle2" fontWeight="bold" align="center" mb={1} color="primary">
                                        Uygun - Uygunsuz Oranı
                                    </Typography>
                                    <Box display="flex" justifyContent="center" mb={2}>
                                        <Box sx={{ width: '100%', maxWidth: 300 }}>
                                            <Chart
                                                options={aggregateTotals.uygunUygunsuz.options}
                                                series={aggregateTotals.uygunUygunsuz.series}
                                                type="pie"
                                                height={300}
                                                width="100%"
                                            />
                                        </Box>
                                    </Box>
                                    <Box mt="auto" p={1.5} sx={{ backgroundColor: 'rgba(0, 227, 150, 0.08)', borderRadius: 2, borderLeft: '4px solid #00E396' }}>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', fontSize: '0.85rem', whiteSpace: 'normal', wordBreak: 'break-word', overflowWrap: 'break-word', lineHeight: 1.4 }}>
                                            Bakım formlarına işlenen veriler doğrultusunda, envanterlerdeki uygunluk ya da uygunsuzluk durumlarının adet olarak göstergesi.
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="subtitle2" fontWeight="bold" align="center" mb={1} color="primary">
                                        S2 Durumu
                                    </Typography>
                                    <Box display="flex" justifyContent="center" mb={2}>
                                        <Box sx={{ width: '100%', maxWidth: 300 }}>
                                            <Chart
                                                options={aggregateTotals.s2Durum.options}
                                                series={aggregateTotals.s2Durum.series}
                                                type="pie"
                                                height={300}
                                                width="100%"
                                            />
                                        </Box>
                                    </Box>
                                    <Box mt="auto" p={1.5} sx={{ backgroundColor: 'rgba(119, 93, 208, 0.08)', borderRadius: 2, borderLeft: '4px solid #775DD0' }}>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', fontSize: '0.85rem', whiteSpace: 'normal', wordBreak: 'break-word', overflowWrap: 'break-word', lineHeight: 1.4 }}>
                                            Envanterlerde bir uygunsuzluk mevcut seviye-2 ve seviye-3 aşamalarında...buradaki metinleri daha detaylı yazacağımmmm
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                )}

                <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: '100%', m: 0 }}>
                    {displayedStats.map((stat, idx) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                            <Card
                                elevation={3}
                                sx={{
                                    height: '100%',
                                    borderRadius: 3,
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: theme.shadows[8]
                                    }
                                }}
                            >
                                <CardActionArea onClick={() => handleCardClick(stat)} sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                                            {stat.om}
                                        </Typography>
                                        <Divider sx={{ my: 1 }} />

                                        <Box display="flex" justifyContent="space-between" mt={2}>
                                            <Typography variant="body2" color="text.secondary">
                                                Toplam Form:
                                            </Typography>
                                            <Typography variant="body1" fontWeight="bold" color="primary">
                                                {stat.totalForms}
                                            </Typography>
                                        </Box>

                                        <Box display="flex" justifyContent="space-between" mt={1}>
                                            <Typography variant="body2" color="text.secondary">
                                                Uygunsuzluk:
                                            </Typography>
                                            <Typography variant="body1" fontWeight="bold" color="error.main">
                                                {stat.uygunsuz}
                                            </Typography>
                                        </Box>

                                        <Box mt={2}>
                                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 2, fontStyle: 'italic' }}>
                                                Detayları görmek için tıklayın
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                    {displayedStats.length === 0 && (
                        <Grid item xs={12}>
                            <Typography variant="body1" color="text.secondary" align="center">
                                Seçilen filtrelere uygun veri bulunamadı.
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Box>
    );

    // Render Box Container (can be fullscreen)
    return (
        <Box
            sx={{
                p: 4,
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box'
            }}
        >
            {/* If fullscreen, render exactly the same content but inside a MUI fullScreen Dialog to break out of all parent wrappers */}
            <Dialog
                fullScreen
                open={cardsFullScreen}
                onClose={() => setCardsFullScreen(false)}
            >
                {slideContent}
            </Dialog>

            {/* If not fullscreen, render directly in this box */}
            {!cardsFullScreen && slideContent}

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth="lg"
                fullWidth
                fullScreen={dialogFullScreen}
                PaperProps={{
                    sx: { borderRadius: dialogFullScreen ? 0 : 3, p: 1 }
                }}
            >
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" fontWeight="bold" color="primary">
                        {selectedOm?.om} OM Denetim Detayları
                    </Typography>
                    <Box display="flex" alignItems="center">
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={showTotalInModal}
                                    onChange={(e) => setShowTotalInModal(e.target.checked)}
                                    color="primary"
                                />
                            }
                            label={<Typography variant="body2" fontWeight="bold">Toplam Göster</Typography>}
                            sx={{ mr: 2 }}
                        />
                        <IconButton onClick={() => setDialogFullScreen(!dialogFullScreen)} size="small" sx={{ mr: 1 }}>
                            {dialogFullScreen ? <Minimize /> : <Maximize />}
                        </IconButton>
                        <IconButton onClick={handleCloseDialog} size="small">
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent dividers>
                    {chartData && (
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper elevation={0} variant="outlined" sx={{ p: 2, borderRadius: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography variant="subtitle1" fontWeight="bold" mb={2} color="primary">
                                        Genel Kontrol Oranı
                                    </Typography>
                                    <Box sx={{ width: '100%', maxWidth: 400 }}>
                                        <Chart
                                            options={chartData.pieOptions}
                                            series={chartData.pieSeries}
                                            type="pie"
                                            height={250}
                                        />
                                    </Box>
                                </Paper>
                            </Grid>



                            <Grid item xs={12} md={4}>
                                <Paper elevation={0} variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                                    <Typography variant="subtitle2" fontWeight="bold" align="center" mb={1} color="primary">
                                        Uygun - Uygunsuz Dağılımı
                                    </Typography>
                                    <Chart
                                        options={chartData.uygunUygunsuz.options}
                                        series={chartData.uygunUygunsuz.series}
                                        type="bar"
                                        height={250}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Paper elevation={0} variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                                    <Typography variant="subtitle2" fontWeight="bold" align="center" mb={1} color="primary">
                                        Doğru - Yanlış Dağılımı
                                    </Typography>
                                    <Chart
                                        options={chartData.dogruYanlis.options}
                                        series={chartData.dogruYanlis.series}
                                        type="bar"
                                        height={250}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Paper elevation={0} variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                                    <Typography variant="subtitle2" fontWeight="bold" align="center" mb={1} color="primary">
                                        S2 Durumu
                                    </Typography>
                                    <Chart
                                        options={chartData.s2Durum.options}
                                        series={chartData.s2Durum.series}
                                        type="bar"
                                        height={250}
                                    />
                                </Paper>
                            </Grid>

                        </Grid>
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default S1S2DenetlemeSlide;
