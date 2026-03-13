import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import Chart from 'react-apexcharts';
import {
    Maximize,
    Minimize,
    BarChart3,
    TableProperties,
    MapPin,
    Building2,
    HardHat,
    TrendingUp,
    PieChart,
    Coins,
    RotateCcw,
    LayoutGrid,
} from 'lucide-react';
import { yerTeslimiData } from '../../data/mockData';
import ExportExcelButton from '../ExportExcelButton';

const formatCurrencyM = (val) => {
    if (!val) return '0,0 Mn ₺';
    const n = Number(val);
    if (isNaN(n)) return String(val);

    if (n >= 1_000_000_000) {
        return `${(n / 1_000_000_000).toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 2 })} Mr ₺`;
    }
    if (n >= 1_000_000) {
        return `${(n / 1_000_000).toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 2 })} Mn ₺`;
    }
    return `${n.toLocaleString('tr-TR', { maximumFractionDigits: 0 })} ₺`;
};

const formatCurrencyExact = (val) => {
    if (!val) return '₺0,00';
    return '₺' + Number(val).toLocaleString('tr-TR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

const safeNumber = (value) => Number(value || 0);

function StatCard({ title, value, subValue, icon: Icon, tone = 'text-info' }) {
    return (
        <div className="rounded-2xl border border-base-200 bg-base-100 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-start justify-between gap-2 p-3 md:p-4">
                <div className="min-w-0">
                    <div className="mb-0.5 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-base-content/60">
                        {title}
                    </div>
                    <div className={`text-lg md:text-xl font-black leading-none ${tone}`}>
                        {value}
                    </div>
                    {subValue ? (
                        <div className="mt-0.5 text-[10px] text-base-content/40 truncate">{subValue}</div>
                    ) : null}
                </div>
                <div className={`shrink-0 rounded-xl bg-base-200 p-2 md:p-2.5 ${tone}`}>
                    <Icon size={16} />
                </div>
            </div>
        </div>
    );
}

function FilterSelect({ label, icon: Icon, value, onChange, options, disabled = false }) {
    return (
        <div className="form-control w-full">
            <label className="label py-1">
                <span className="label-text flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-base-content/60">
                    <Icon size={13} />
                    {label}
                </span>
            </label>
            <select
                className="select select-bordered select-sm w-full bg-base-100 font-semibold focus:border-primary"
                value={value}
                onChange={onChange}
                disabled={disabled}
            >
                {options.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>
        </div>
    );
}

function SegmentedButtonGroup({ value, onChange, items }) {
    return (
        <div className="flex flex-wrap rounded-xl border border-base-300 bg-base-300/50 p-1">
            {items.map((item) => (
                <button
                    key={item.value}
                    type="button"
                    onClick={() => onChange(item.value)}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${value === item.value
                        ? 'bg-primary text-primary-content shadow-sm'
                        : 'text-base-content/60 hover:text-base-content'
                        }`}
                >
                    {item.icon ? <item.icon size={14} /> : null}
                    {item.label}
                </button>
            ))}
        </div>
    );
}

export default function YerTeslimiSlide() {
    const containerRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(() => !!document.fullscreenElement);
    const [viewMode, setViewMode] = useState('chart');
    const [kirilimFilter, setKirilimFilter] = useState('Toplam');
    const [bolgeFilter, setBolgeFilter] = useState('Tümü');
    const [omFilter, setOmFilter] = useState('Tümü');
    const [yukleniciFilter, setYukleniciFilter] = useState('Tümü');

    useEffect(() => {
        const handler = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handler);
        return () => document.removeEventListener('fullscreenchange', handler);
    }, []);

    const toggleFullscreen = useCallback(() => {
        const el = containerRef.current;
        if (!document.fullscreenElement) {
            el?.requestFullscreen?.().catch(console.error);
        } else {
            document.exitFullscreen?.().catch(console.error);
        }
    }, []);

    const resetFilters = () => {
        setBolgeFilter('Tümü');
        setOmFilter('Tümü');
        setYukleniciFilter('Tümü');
        setKirilimFilter('Toplam');
    };

    const bolgeler = useMemo(() => {
        return ['Tümü', ...new Set(yerTeslimiData.map((d) => d.bolge).filter(Boolean))];
    }, []);

    const omler = useMemo(() => {
        const source =
            bolgeFilter === 'Tümü'
                ? yerTeslimiData
                : yerTeslimiData.filter((d) => d.bolge === bolgeFilter);

        return ['Tümü', ...new Set(source.map((d) => d.om).filter(Boolean))];
    }, [bolgeFilter]);

    const yukleniciler = useMemo(() => {
        let source = yerTeslimiData;

        if (bolgeFilter !== 'Tümü') {
            source = source.filter((d) => d.bolge === bolgeFilter);
        }

        if (omFilter !== 'Tümü') {
            source = source.filter((d) => d.om === omFilter);
        }

        return ['Tümü', ...new Set(source.map((d) => d.yuklenici).filter(Boolean))];
    }, [bolgeFilter, omFilter]);

    const handleBolgeChange = (e) => {
        setBolgeFilter(e.target.value);
        setOmFilter('Tümü');
        setYukleniciFilter('Tümü');
    };

    const handleOmChange = (e) => {
        setOmFilter(e.target.value);
        setYukleniciFilter('Tümü');
    };

    const filteredData = useMemo(() => {
        return yerTeslimiData.filter((d) => {
            if (bolgeFilter !== 'Tümü' && d.bolge !== bolgeFilter) return false;
            if (omFilter !== 'Tümü' && d.om !== omFilter) return false;
            if (yukleniciFilter !== 'Tümü' && d.yuklenici !== yukleniciFilter) return false;
            return true;
        });
    }, [bolgeFilter, omFilter, yukleniciFilter]);

    const totals = useMemo(() => {
        const totalYerTeslim = filteredData.reduce(
            (acc, curr) => acc + safeNumber(curr.yerTeslimSayisi),
            0
        );

        const totalGerceklesen = filteredData.reduce((acc, curr) => {
            if (kirilimFilter === 'TEDAŞ') return acc + safeNumber(curr.tedas);
            if (kirilimFilter === 'EDAŞ') return acc + safeNumber(curr.edas);
            return acc + safeNumber(curr.gerceklesenProje);
        }, 0);

        const totalTedas = filteredData.reduce((acc, curr) => acc + safeNumber(curr.tedas), 0);
        const totalEdas = filteredData.reduce((acc, curr) => acc + safeNumber(curr.edas), 0);
        const totalTutar = filteredData.reduce(
            (acc, curr) => acc + safeNumber(curr.gerceklesmeTutari),
            0
        );

        const gerceklesmeOrani =
            totalYerTeslim > 0 ? ((totalGerceklesen / totalYerTeslim) * 100).toFixed(1) : '0.0';

        return {
            totalYerTeslim,
            totalGerceklesen,
            totalTedas,
            totalEdas,
            totalTutar,
            gerceklesmeOrani,
        };
    }, [filteredData, kirilimFilter]);

    const getDynamicFilterText = (suffix) => {
        const parts = [];
        if (bolgeFilter !== 'Tümü') parts.push(bolgeFilter);
        if (omFilter !== 'Tümü') parts.push(omFilter);
        if (yukleniciFilter !== 'Tümü') parts.push(yukleniciFilter);

        if (parts.length === 0) return `Genel ${suffix}`;
        return `${parts.join(' - ')} ${suffix}`;
    };

    const chartSeries = useMemo(() => {
        if (kirilimFilter === 'Toplam') {
            return [
                {
                    name: 'TEDAŞ Projeleri',
                    data: filteredData.map((d) => safeNumber(d.tedas)),
                },
                {
                    name: 'EDAŞ Projeleri',
                    data: filteredData.map((d) => safeNumber(d.edas)),
                },
                {
                    name: 'Kalan / Bekleyen',
                    data: filteredData.map((d) =>
                        Math.max(0, safeNumber(d.yerTeslimSayisi) - safeNumber(d.gerceklesenProje))
                    ),
                },
            ];
        }

        if (kirilimFilter === 'TEDAŞ') {
            return [
                {
                    name: 'TEDAŞ Projeleri',
                    data: filteredData.map((d) => safeNumber(d.tedas)),
                },
                {
                    name: 'Kalan Projeler',
                    data: filteredData.map((d) =>
                        Math.max(0, safeNumber(d.yerTeslimSayisi) - safeNumber(d.tedas))
                    ),
                },
            ];
        }

        return [
            {
                name: 'EDAŞ Projeleri',
                data: filteredData.map((d) => safeNumber(d.edas)),
            },
            {
                name: 'Kalan Projeler',
                data: filteredData.map((d) =>
                    Math.max(0, safeNumber(d.yerTeslimSayisi) - safeNumber(d.edas))
                ),
            },
        ];
    }, [filteredData, kirilimFilter]);

    const tooltipColors = useMemo(() => {
        return kirilimFilter === 'Toplam'
            ? ['#0ea5e9', '#eab308', '#94a3b8']
            : kirilimFilter === 'TEDAŞ'
                ? ['#0ea5e9', '#94a3b8']
                : ['#eab308', '#94a3b8'];
    }, [kirilimFilter]);

    const buildStackedPreviewTooltip = useCallback(
        ({ series, dataPointIndex, w }) => {
            if (dataPointIndex < 0) return '';

            const category =
                w?.globals?.categoryLabels?.[dataPointIndex] ||
                filteredData?.[dataPointIndex]?.om ||
                '-';

            const row = filteredData?.[dataPointIndex];
            const seriesNames = w?.globals?.seriesNames || [];

            const values = series.map((s, i) => ({
                name: seriesNames[i] || `Seri ${i + 1}`,
                value: safeNumber(s?.[dataPointIndex]),
                color: tooltipColors[i] || '#94a3b8',
            }));

            const total = values.reduce((sum, item) => sum + item.value, 0);
            const yerTeslimSayisi = safeNumber(row?.yerTeslimSayisi);
            const gerceklesenProje = safeNumber(row?.gerceklesenProje);
            const gerceklesmeYuzdesi = yerTeslimSayisi > 0 ? ((gerceklesenProje / yerTeslimSayisi) * 100).toFixed(1) : '0.0';

            const stackedBarHtml = values
                .filter((item) => item.value > 0)
                .map((item) => {
                    const percent = total > 0 ? (item.value / total) * 100 : 0;
                    const segmentHeight = Math.max(percent, 10);
                    const isTiny = percent < 18;

                    return `
            <div style="
              position:relative;
              width:100%;
              height:${segmentHeight}%;
              background:${item.color};
              border-top:1px solid rgba(255,255,255,0.35);
              box-sizing:border-box;
              overflow:visible;
              min-height:18px;
            ">
              <div style="
                position:absolute;
                inset:0;
                display:flex;
                align-items:center;
                justify-content:center;
                padding:0 4px;
                font-weight:800;
                font-size:12px;
                line-height:1;
                color:${item.color === '#eab308' ? '#111827' : '#ffffff'};
                pointer-events:none;
                white-space:nowrap;
              ">
                ${!isTiny ? item.value : ''}
              </div>

              ${isTiny
                            ? `
                    <div style="
                      position:absolute;
                      top:50%;
                      left:calc(100% + 8px);
                      transform:translateY(-50%);
                      font-weight:800;
                      font-size:12px;
                      line-height:1;
                      color:#ffffff;
                      white-space:nowrap;
                      pointer-events:none;
                      text-shadow:0 1px 2px rgba(0,0,0,0.35);
                    ">
                      ${item.value}
                    </div>
                  `
                            : ''
                        }
            </div>
          `;
                })
                .join('');

            const legendHtml = values
                .map((item) => {
                    const percent = total > 0 ? ((item.value / total) * 100).toFixed(1) : '0.0';
                    return `
            <div style="
              display:flex;
              align-items:center;
              justify-content:space-between;
              gap:12px;
              font-size:12px;
              line-height:1.35;
            ">
              <div style="display:flex; align-items:center; gap:8px; min-width:0;">
                <span style="
                  width:10px;
                  height:10px;
                  border-radius:999px;
                  background:${item.color};
                  display:inline-block;
                  flex:none;
                "></span>
                <span style="
                  color:#e5e7eb;
                  font-weight:600;
                  white-space:nowrap;
                  overflow:hidden;
                  text-overflow:ellipsis;
                  max-width:180px;
                ">
                  ${item.name}
                </span>
              </div>
              <div style="text-align:right; flex:none;">
                <div style="color:#ffffff; font-weight:800;">${item.value}</div>
                <div style="color:#9ca3af; font-size:11px;">%${percent}</div>
              </div>
            </div>
          `;
                })
                .join('');

            return `
        <div style="
          min-width:320px;
          max-width:380px;
          padding:14px;
          margin-left:10px;
          border-radius:16px;
          background:rgba(15,23,42,0.96);
          color:#fff;
          box-shadow:0 22px 55px rgba(2,6,23,0.55);
          border:1px solid rgba(148,163,184,0.18);
          backdrop-filter:blur(10px);
          font-family:inherit;
        ">
          <div style="margin-bottom:10px;">
            <div style="
              font-size:13px;
              font-weight:800;
              color:#ffffff;
              margin-bottom:4px;
            ">
              ${category}
            </div>
            <div style="
              display:flex;
              flex-wrap:wrap;
              gap:6px;
              font-size:11px;
              color:#cbd5e1;
            ">
              <span>Yer Teslimi: <b style="color:#fff;">${yerTeslimSayisi}</b></span>
              <span>•</span>
              <span>Gerçekleşen: <b style="color:#fff;">${gerceklesenProje}</b></span>
              <span>•</span>
              <span>Oran: <b style="color:#fff;">%${gerceklesmeYuzdesi}</b></span>
            </div>
          </div>

          <div style="
            display:flex;
            gap:14px;
            align-items:stretch;
          ">
            <div style="
              width:120px;
              min-width:120px;
              display:flex;
              flex-direction:column;
              align-items:center;
              gap:8px;
              overflow:visible;
            ">
              <div style="
                width:64px;
                height:180px;
                border-radius:14px;
                overflow:visible;
                background:rgba(51,65,85,0.45);
                border:1px solid rgba(148,163,184,0.18);
                display:flex;
                flex-direction:column-reverse;
                justify-content:flex-start;
                box-shadow:inset 0 0 0 1px rgba(255,255,255,0.03);
              ">
                ${stackedBarHtml ||
                `
                  <div style="
                    width:100%;
                    height:100%;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    color:#94a3b8;
                    font-size:12px;
                    font-weight:700;
                  ">
                    Veri yok
                  </div>
                `
                }
              </div>
              <div style="
                font-size:11px;
                color:#cbd5e1;
                font-weight:700;
                text-align:center;
              ">
                Büyütülmüş kolon
              </div>
            </div>

            <div style="
              flex:1;
              display:flex;
              flex-direction:column;
              gap:8px;
              min-width:0;
            ">
              ${legendHtml}
            </div>
          </div>
        </div>
      `;
        },
        [filteredData, tooltipColors]
    );

    const chartOptions = useMemo(() => {
        return {
            chart: {
                type: 'bar',
                stacked: true,
                fontFamily: 'inherit',
                toolbar: { show: false },
                background: 'transparent',
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 700,
                },
            },
            states: {
                hover: {
                    filter: {
                        type: 'darken',
                        value: 0.88,
                    },
                },
                active: {
                    allowMultipleDataPointsSelection: false,
                    filter: {
                        type: 'none',
                    },
                },
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '54%',
                    borderRadius: 6,
                    borderRadiusApplication: 'end',
                    dataLabels: {
                        total: {
                            enabled: true,
                            style: {
                                color: '#4f46e5',
                                fontSize: '13px',
                                fontWeight: 900,
                                fontFamily: 'inherit',
                            },
                        },
                    },
                },
            },
            colors:
                kirilimFilter === 'Toplam'
                    ? ['#0ea5e9', '#eab308', 'rgba(100, 116, 139, 0.20)']
                    : kirilimFilter === 'TEDAŞ'
                        ? ['#0ea5e9', 'rgba(100, 116, 139, 0.20)']
                        : ['#eab308', 'rgba(100, 116, 139, 0.20)'],
            dataLabels: {
                enabled: true,
                formatter: function (val, opts) {
                    if (!val) return '';
                    const maxY = opts?.w?.globals?.maxY;
                    if (maxY && val < maxY * 0.04) return '';
                    return val > 0 ? val : '';
                },
                style: {
                    colors: ['#0f172a'],
                    fontSize: '11px',
                    fontWeight: 800,
                    fontFamily: 'inherit',
                },
                dropShadow: { enabled: false },
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent'],
            },
            xaxis: {
                categories: filteredData.map((d) => d.om || '-'),
                labels: {
                    style: {
                        colors: '#334155',
                        fontSize: '11px',
                        fontWeight: 600,
                        fontFamily: 'inherit',
                    },
                    rotate: -40,
                    hideOverlappingLabels: false,
                    trim: true,
                },
                axisBorder: { show: false },
                axisTicks: { show: false },
                tooltip: {
                    enabled: false,
                },
            },
            yaxis: {
                title: {
                    text: 'Yer Teslimi Sayısı',
                    style: {
                        color: '#64748b',
                        fontSize: '11px',
                        fontWeight: 700,
                        fontFamily: 'inherit',
                    },
                },
                labels: {
                    style: {
                        colors: '#64748b',
                        fontSize: '11px',
                        fontWeight: 600,
                        fontFamily: 'inherit',
                    },
                },
            },
            grid: {
                borderColor: 'rgba(100, 116, 139, 0.15)',
                strokeDashArray: 4,
                xaxis: { lines: { show: false } },
                yaxis: { lines: { show: true } },
                padding: {
                    top: 0,
                    right: 10,
                    bottom: 0,
                    left: 10,
                },
            },
            legend: {
                show: true,
                position: 'top',
                horizontalAlign: 'left',
                fontSize: '12px',
                labels: { colors: '#475569' },
                markers: { radius: 10 },
            },
            tooltip: {
                shared: true,
                intersect: false,
                fillSeriesColor: false,
                theme: 'dark',
                followCursor: true,
                offsetX: 25,
                offsetY: 6,
                marker: {
                    show: false,
                },
                custom: function ({ series, dataPointIndex, w }) {
                    return buildStackedPreviewTooltip({ series, dataPointIndex, w });
                },
            },
            noData: {
                text: 'Gösterilecek veri bulunamadı',
                align: 'center',
                verticalAlign: 'middle',
                style: {
                    color: '#64748b',
                    fontSize: '14px',
                },
            },
        };
    }, [filteredData, kirilimFilter, buildStackedPreviewTooltip]);

    const hasActiveFilters =
        bolgeFilter !== 'Tümü' ||
        omFilter !== 'Tümü' ||
        yukleniciFilter !== 'Tümü' ||
        kirilimFilter !== 'Toplam';

    return (
        <div
            ref={containerRef}
            className={`flex w-full flex-1 flex-col overflow-y-auto ${isFullscreen 
                ? 'fixed inset-0 z-50 bg-base-100 p-8' 
                : 'p-4'
                }`}
        >
            <div
                className={`sticky top-0 z-40 bg-base-100/95 backdrop-blur-md border-b border-base-200 shadow-sm pb-3 ${isFullscreen ? 'pt-4 px-6 md:pt-6 md:px-8' : 'pt-1'
                    }`}
            >
                <div className="mb-3 flex flex-col gap-2 px-1 md:flex-row md:items-end md:justify-between">
                    <div>
                        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-base-200 bg-base-200/60 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-base-content/60">
                            <LayoutGrid size={13} />
                            Yer Teslim Dashboard
                        </div>
                        <h2 className="text-xl font-extrabold tracking-tight text-base-content md:text-2xl">
                            2025 Yılı Yer Teslim İstatistikleri
                        </h2>
                        <p className="mt-1 text-sm text-base-content/60">
                            Bölge, operasyon merkezi ve yüklenici bazında yer teslim sayıları
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <SegmentedButtonGroup
                            value={kirilimFilter}
                            onChange={setKirilimFilter}
                            items={[
                                { value: 'Toplam', label: 'Toplam' },
                                { value: 'TEDAŞ', label: 'TEDAŞ' },
                                { value: 'EDAŞ', label: 'EDAŞ' },
                            ]}
                        />

                        <SegmentedButtonGroup
                            value={viewMode}
                            onChange={setViewMode}
                            items={[
                                { value: 'chart', label: 'Grafik', icon: BarChart3 },
                                { value: 'table', label: 'Tablo', icon: TableProperties },
                            ]}
                        />

                        <ExportExcelButton data={filteredData} fileName="Yer_Teslimi_İstatistikleri_2025" />
                        <button
                            type="button"
                            onClick={toggleFullscreen}
                            className="btn btn-sm btn-outline btn-circle shadow-sm"
                            title={isFullscreen ? 'Küçült' : 'Tam Ekran'}
                        >
                            {isFullscreen ? <Minimize size={15} /> : <Maximize size={15} />}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 px-1 xl:grid-cols-4">
                    <StatCard
                        title="OM Sayısı"
                        value={filteredData.length}
                        subValue="Operasyon Merkezi Sayısı"
                        icon={MapPin}
                        tone="text-info"
                    />

                    <StatCard
                        title="Gerçekleşen / Yer Teslimi"
                        value={`${totals.totalGerceklesen} / ${totals.totalYerTeslim}`}
                        subValue={`TEDAŞ: ${totals.totalTedas} • EDAŞ: ${totals.totalEdas}`}
                        icon={TrendingUp}
                        tone="text-base-content"
                    />

                    <StatCard
                        title="Gerçekleşme Oranı"
                        value={`%${totals.gerceklesmeOrani}`}
                        subValue={getDynamicFilterText('Yer Teslim Oranı')}
                        icon={PieChart}
                        tone="text-success"
                    />

                    <StatCard
                        title="Toplam Tutar"
                        value={formatCurrencyM(totals.totalTutar)}
                        subValue={formatCurrencyExact(totals.totalTutar)}
                        icon={Coins}
                        tone="text-warning"
                    />
                </div>
            </div>

            <div className={`flex flex-1 flex-col gap-4 ${isFullscreen ? 'p-4 md:p-6' : 'pt-3'}`}>
                <div className="rounded-2xl border border-base-200 bg-base-200/50 p-3 md:p-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        <FilterSelect
                            label="Bölge Müdürlüğü"
                            icon={MapPin}
                            value={bolgeFilter}
                            onChange={handleBolgeChange}
                            options={bolgeler}
                        />

                        <FilterSelect
                            label="Operasyon Merkezi"
                            icon={Building2}
                            value={omFilter}
                            onChange={handleOmChange}
                            options={omler}
                        />

                        <FilterSelect
                            label="Yüklenici Firma"
                            icon={HardHat}
                            value={yukleniciFilter}
                            onChange={(e) => setYukleniciFilter(e.target.value)}
                            options={yukleniciler}
                        />

                        <div className="flex items-end">
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="btn btn-sm w-full gap-2 rounded-xl border-base-300 bg-base-100 font-semibold"
                                disabled={!hasActiveFilters}
                            >
                                <RotateCcw size={14} />
                                Filtreleri Temizle
                            </button>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-base-200 bg-base-100 p-3 shadow-sm">
                    <div className="mb-1.5 flex items-center justify-between gap-3">
                        <div className="text-[11px] font-bold text-base-content opacity-70">
                            {getDynamicFilterText('İlerlemesi')}
                        </div>
                        <div className="text-[11px] font-black text-success">
                            %{totals.gerceklesmeOrani}
                        </div>
                    </div>
                    <progress
                        className="progress progress-success w-full h-1.5"
                        value={Number(totals.gerceklesmeOrani)}
                        max="100"
                    />
                </div>

                <div className="overflow-hidden rounded-2xl border border-base-200 bg-base-100 shadow-sm">
                    {viewMode === 'chart' ? (
                        <div className="w-full">
                            <style>{`
                                .yerteslimi-custom-chart .apexcharts-legend {
                                    flex-direction: row-reverse !important;
                                    justify-content: flex-end !important;
                                }
                                .yerteslimi-custom-chart .apexcharts-legend-series {
                                    margin-left: 16px !important;
                                    margin-right: 0 !important;
                                }
                            `}</style>
                            <div
                                className="px-2 pb-6 pt-5 md:px-4 yerteslimi-custom-chart"
                                style={{
                                    width: '100%',
                                    height: isFullscreen ? '55vh' : '500px',
                                    minHeight: '400px',
                                }}
                            >
                                <Chart
                                    options={chartOptions}
                                    series={chartSeries}
                                    type="bar"
                                    height="100%"
                                    width="100%"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="w-full overflow-auto">
                            <table className="table table-md table-pin-rows w-full">
                                <thead>
                                    <tr>
                                        <th className="bg-base-200/80 text-base-content/70 backdrop-blur">İL</th>
                                        <th className="bg-base-200/80 text-base-content/70 backdrop-blur">OM</th>
                                        <th className="bg-base-200/80 text-base-content/70 backdrop-blur">Yüklenici</th>
                                        <th className="bg-base-200/80 text-right text-base-content/70 backdrop-blur">
                                            Yer Teslimi
                                        </th>
                                        <th className="bg-base-200/80 text-right text-base-content/70 backdrop-blur">
                                            TEDAŞ
                                        </th>
                                        <th className="bg-base-200/80 text-right text-base-content/70 backdrop-blur">
                                            EDAŞ
                                        </th>
                                        <th className="bg-base-200/80 text-right text-base-content/70 backdrop-blur">
                                            Gerçekleşen
                                        </th>
                                        <th className="bg-base-200/80 text-right text-base-content/70 backdrop-blur">
                                            Maliyet (₺)
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredData.map((row, index) => (
                                        <tr key={`${row.bolge}-${row.om}-${row.yuklenici}-${index}`} className="hover">
                                            <td className="font-bold">{row.bolge}</td>
                                            <td className="font-medium text-base-content/80">{row.om}</td>
                                            <td>
                                                <div className="badge badge-ghost border-base-300 text-xs font-semibold">
                                                    {row.yuklenici}
                                                </div>
                                            </td>
                                            <td className="text-right font-medium">{safeNumber(row.yerTeslimSayisi)}</td>
                                            <td className="text-right font-medium text-info">{safeNumber(row.tedas)}</td>
                                            <td className="text-right font-medium text-warning">{safeNumber(row.edas)}</td>
                                            <td className="text-right font-black text-success">
                                                {safeNumber(row.gerceklesenProje)}
                                            </td>
                                            <td
                                                className="text-right font-mono text-xs opacity-80"
                                                title={formatCurrencyExact(row.gerceklesmeTutari)}
                                            >
                                                {formatCurrencyExact(row.gerceklesmeTutari)}
                                            </td>
                                        </tr>
                                    ))}

                                    {filteredData.length > 0 && (
                                        <tr className="bg-base-200/40 font-bold">
                                            <td colSpan={3}>TOPLAM</td>
                                            <td className="text-right">{totals.totalYerTeslim}</td>
                                            <td className="text-right text-info">{totals.totalTedas}</td>
                                            <td className="text-right text-warning">{totals.totalEdas}</td>
                                            <td className="text-right text-success">{totals.totalGerceklesen}</td>
                                            <td className="text-right">{formatCurrencyExact(totals.totalTutar)}</td>
                                        </tr>
                                    )}

                                    {filteredData.length === 0 && (
                                        <tr>
                                            <td colSpan={8} className="py-14 text-center">
                                                <div className="flex flex-col items-center justify-center text-base-content/50">
                                                    <BarChart3 size={48} className="mb-4" />
                                                    <div className="font-bold">Seçilen kriterlere uygun veri bulunamadı.</div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}