// mockData.js
// Simple, uncrowded datasets for presentations

export const scopeCategories = [
    'AG ENH Bakımı',
    'YG ENH Bakımı',
    'İM-DM-TRP-KÖK',
    'Güç Yükseltimi',
    'DÜT Bakımı',
    'İlave TR İşi',
    'Aydınlatma Bakımı',
    'SDK Bakımı',
    'Demontaj İşi'
];

// data = adet, cost = maliyet (₺) — sütun sırası scopeCategories ile aynı:
// [AG ENH, YG ENH, İM-DM-TRP-KÖK, Güç Yükseltimi, DÜT Bakımı, İlave TR İşi, Aydınlatma Bakımı, SDK Bakımı, Demontaj İşi]
export const scopeData = [
    {
        name: 'Adana Metropol', bolge: 'ADANA',
        data: [18, 8, 32, 7, 0, 1, 0, 0, 0],
        cost: [86721373.24, 67402430.39, 19710844.90, 0, 0, 13122001.70, 0, 0, 157252.47]
    },
    {
        name: 'Ceyhan', bolge: 'ADANA',
        data: [3, 0, 8, 0, 0, 0, 0, 0, 0],
        cost: [7791484.89, 28710061.41, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        name: 'Düziçi', bolge: 'ADANA',
        data: [6, 4, 2, 0, 0, 0, 0, 0, 0],
        cost: [11604329.63, 22191744.57, 202579.91, 0, 0, 0, 0, 0, 0]
    },
    {
        name: 'Kadirli', bolge: 'ADANA',
        data: [3, 9, 11, 1, 0, 0, 0, 0, 0],
        cost: [20138569.53, 36605884.69, 2201110.83, 0, 0, 0, 0, 0, 203779.61]
    },
    {
        name: 'Kozan', bolge: 'ADANA',
        data: [9, 14, 2, 0, 0, 0, 0, 0, 0],
        cost: [45994313.76, 123102157.42, 2663980.54, 0, 0, 0, 0, 0, 0]
    },
    {
        name: 'Osmaniye', bolge: 'ADANA',
        data: [16, 8, 13, 0, 0, 0, 0, 0, 0],
        cost: [62659139.45, 21697348.17, 3355687.54, 0, 0, 0, 0, 0, 0]
    },
    {
        name: 'Gaziantep Metropol', bolge: 'GAZİANTEP',
        data: [10, 7, 27, 1, 3, 2, 0, 0, 0],
        cost: [14621006.87, 37420797.42, 12912968.27, 0, 0, 1972555.96, 9241944.02, 0, 258423.92]
    },
    {
        name: 'Islahiye', bolge: 'GAZİANTEP',
        data: [8, 4, 2, 0, 0, 0, 0, 0, 0],
        cost: [12849923.19, 5388584.56, 595979.20, 0, 0, 0, 0, 0, 0]
    },
    {
        name: 'Kilis', bolge: 'GAZİANTEP',
        data: [18, 5, 5, 0, 0, 0, 0, 0, 0],
        cost: [28364741.39, 9847882.59, 4044094.34, 0, 0, 0, 0, 0, 0]
    },
    {
        name: 'Nizip', bolge: 'GAZİANTEP',
        data: [13, 3, 1, 0, 0, 0, 0, 0, 0],
        cost: [25369766.85, 4496857.53, 0, 0, 176257.79, 0, 0, 0, 0]
    },
    {
        name: 'Antakya Metropol', bolge: 'HATAY',
        data: [96, 30, 11, 34, 1, 13, 0, 0, 0],
        cost: [417051440.92, 103639521.83, 9949278.12, 29687975.56, 398688.32, 33869841.53, 0, 0, 0]
    },
    {
        name: 'Dörtyol', bolge: 'HATAY',
        data: [17, 5, 13, 0, 0, 0, 0, 0, 0],
        cost: [41512908.00, 24549352.43, 6400312.56, 0, 0, 0, 0, 0, 0]
    },
    {
        name: 'İskenderun', bolge: 'HATAY',
        data: [19, 2, 6, 5, 1, 0, 0, 0, 0],
        cost: [91836320.38, 1615610.12, 2432788.49, 11583883.49, 0, 5050059.66, 0, 0, 0]
    },
    {
        name: 'Kırıkhan', bolge: 'HATAY',
        data: [11, 1, 2, 2, 0, 0, 0, 0, 0],
        cost: [40320376.89, 888664.89, 0, 1785194.71, 0, 12550486.53, 0, 0, 0]
    },
    {
        name: 'Reyhanlı', bolge: 'HATAY',
        data: [15, 7, 1, 2, 1, 0, 0, 0, 0],
        cost: [75102476.08, 25223357.74, 159634.87, 1199795.49, 108700.30, 0, 0, 0, 0]
    },
    {
        name: 'Anamur', bolge: 'MERSİN',
        data: [11, 9, 8, 2, 0, 0, 0, 0, 0],
        cost: [45975641.90, 82452104.21, 3160028.29, 0, 772463.18, 0, 0, 0, 0]
    },
    {
        name: 'Erdemli', bolge: 'MERSİN',
        data: [16, 8, 2, 1, 0, 0, 0, 0, 0],
        cost: [37384012.83, 30859602.77, 699255.40, 0, 621868.34, 0, 0, 0, 0]
    },
    {
        name: 'Mersin Metropol', bolge: 'MERSİN',
        data: [14, 16, 10, 22, 4, 1, 0, 0, 0],
        cost: [63795370.36, 101800872.94, 4213271.77, 0, 12310370.70, 0, 250020.10, 349959.97, 0]
    },
    {
        name: 'Mut', bolge: 'MERSİN',
        data: [20, 7, 2, 1, 1, 0, 0, 0, 0],
        cost: [43360956.65, 34549635.92, 425295.50, 0, 132871.51, 3021114.86, 0, 0, 0]
    },
    {
        name: 'Silifke', bolge: 'MERSİN',
        data: [19, 2, 10, 1, 0, 0, 0, 0, 0],
        cost: [122750591.06, 27089279.00, 3631068.15, 0, 0, 5489359.94, 0, 0, 0]
    },
    {
        name: 'Tarsus', bolge: 'MERSİN',
        data: [30, 6, 3, 3, 5, 0, 0, 0, 0],
        cost: [82359257.38, 37825746.96, 4099309.84, 2468601.60, 8715280.72, 0, 0, 0, 0]
    },
];

export const revenueData = {
    categories: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran'],
    revenue: [12000, 15000, 14000, 18000, 22000, 25000],
    expenses: [8000, 9000, 11000, 10000, 12000, 13000],
};

export const userDemographics = {
    labels: ['18-24', '25-34', '35-44', '45+'],
    series: [25, 45, 20, 10]
};

export const recentTransactions = [
    { id: 1, date: '2026-03-01', customer: 'Ahmet Yılmaz', amount: 1500, status: 'Tamamlandı' },
    { id: 2, date: '2026-03-01', customer: 'Ayşe Demir', amount: 2300, status: 'Beklemede' },
    { id: 3, date: '2026-02-28', customer: 'Mehmet Kaya', amount: 800, status: 'Tamamlandı' },
    { id: 4, date: '2026-02-27', customer: 'Fatma Şahin', amount: 3100, status: 'İptal' },
    { id: 5, date: '2026-02-26', customer: 'Ali Can', amount: 1200, status: 'Tamamlandı' },
];

export const regionalSales = {
    categories: ['Marmara', 'Ege', 'İç Anadolu', 'Akdeniz', 'Karadeniz'],
    sales: [450, 320, 280, 210, 150]
};

export const presentationSlides = [
    // { id: 1, title: 'SEVİYE-3 PROJE KAPSAMLARI', type: 'chart_line' },
    { id: 1, title: 'SEVYE-3 PROJE TUTARLARI', type: 'chart_pie' },
    //  { id: 3, title: 'SÖZLEŞME BİLGLERİ', type: 'chart_bar' },
    //  { id: 4, title: 'YÜKLENİCİ BİLGİLERİ', type: 'table' },
    { id: 2, group: 'Fotoğraflar', title: 'AG Sahası Öncesi Sonrası', titleShort: 'AG', type: 'photo_ag' },
    { id: 3, group: 'Fotoğraflar', title: 'YG Sahası Öncesi Sonrası', titleShort: 'YG', type: 'photo_yg' },
    { id: 4, title: 'S1-S2 ANALİZİ', type: 'chart_s1_s2' },
    { id: 5, title: 'YER TESLİMİ', type: 'yer_teslimi' }
];

export const yerTeslimiData = [
    { "BÖLGE MÜDÜRLÜĞÜ": "ADANA", "OM": "ADANA KUZEY", "Yüklenici": "Kayateknik", "Yer Teslim Sayısı": 27, "Gerçekleşen Proje Sayısı": 25, "Gerçekleşme Tutarı": 171760451.71 },
    { "BÖLGE MÜDÜRLÜĞÜ": "ADANA", "OM": "ADANA METROPOL", "Yüklenici": "Ayduran", "Yer Teslim Sayısı": 69, "Gerçekleşen Proje Sayısı": 66, "Gerçekleşme Tutarı": 187113902.69 },
    { "BÖLGE MÜDÜRLÜĞÜ": "MERSİN", "OM": "ANAMUR", "Yüklenici": "Armin", "Yer Teslim Sayısı": 38, "Gerçekleşen Proje Sayısı": 30, "Gerçekleşme Tutarı": 132360237.57 },
    { "BÖLGE MÜDÜRLÜĞÜ": "ADANA", "OM": "CEYHAN", "Yüklenici": "Erce", "Yer Teslim Sayısı": 36, "Gerçekleşen Proje Sayısı": 11, "Gerçekleşme Tutarı": 36501546.30 },
    { "BÖLGE MÜDÜRLÜĞÜ": "HATAY", "OM": "DÖRTYOL", "Yüklenici": "Demircan", "Yer Teslim Sayısı": 57, "Gerçekleşen Proje Sayısı": 35, "Gerçekleşme Tutarı": 72462572.99 },
    { "BÖLGE MÜDÜRLÜĞÜ": "ADANA", "OM": "DÜZİÇİ", "Yüklenici": "Demircan", "Yer Teslim Sayısı": 18, "Gerçekleşen Proje Sayısı": 12, "Gerçekleşme Tutarı": 33998654.11 },
    { "BÖLGE MÜDÜRLÜĞÜ": "MERSİN", "OM": "ERDEMLİ", "Yüklenici": "Gümüşcü", "Yer Teslim Sayısı": 29, "Gerçekleşen Proje Sayısı": 27, "Gerçekleşme Tutarı": 69564739.34 },
    { "BÖLGE MÜDÜRLÜĞÜ": "GAZİANTEP", "OM": "GAZİANTEP METROPOL", "Yüklenici": "Armin", "Yer Teslim Sayısı": 52, "Gerçekleşen Proje Sayısı": 50, "Gerçekleşme Tutarı": 76427696.48 },
    { "BÖLGE MÜDÜRLÜĞÜ": "HATAY", "OM": "HATAY KIRSAL", "Yüklenici": "Demircan", "Yer Teslim Sayısı": 57, "Gerçekleşen Proje Sayısı": 31, "Gerçekleşme Tutarı": 179702623.22 },
    { "BÖLGE MÜDÜRLÜĞÜ": "HATAY", "OM": "HATAY METROPOL", "Yüklenici": "Demircan", "Yer Teslim Sayısı": 161, "Gerçekleşen Proje Sayısı": 154, "Gerçekleşme Tutarı": 414894123.07 },
    { "BÖLGE MÜDÜRLÜĞÜ": "HATAY", "OM": "İSKENDERUN", "Yüklenici": "Armin", "Yer Teslim Sayısı": 48, "Gerçekleşen Proje Sayısı": 33, "Gerçekleşme Tutarı": 112518662.13 },
    { "BÖLGE MÜDÜRLÜĞÜ": "GAZİANTEP", "OM": "ISLAHİYE", "Yüklenici": "Armin", "Yer Teslim Sayısı": 23, "Gerçekleşen Proje Sayısı": 14, "Gerçekleşme Tutarı": 18834486.94 },
    { "BÖLGE MÜDÜRLÜĞÜ": "ADANA", "OM": "KADİRLİ", "Yüklenici": "Erce", "Yer Teslim Sayısı": 27, "Gerçekleşen Proje Sayısı": 24, "Gerçekleşme Tutarı": 59149344.67 },
    { "BÖLGE MÜDÜRLÜĞÜ": "HATAY", "OM": "KIRIKHAN", "Yüklenici": "Demircan", "Yer Teslim Sayısı": 19, "Gerçekleşen Proje Sayısı": 16, "Gerçekleşme Tutarı": 55544723.02 },
    { "BÖLGE MÜDÜRLÜĞÜ": "GAZİANTEP", "OM": "KİLİS", "Yüklenici": "Armin", "Yer Teslim Sayısı": 39, "Gerçekleşen Proje Sayısı": 28, "Gerçekleşme Tutarı": 42256718.33 },
    { "BÖLGE MÜDÜRLÜĞÜ": "MERSİN", "OM": "MERSİN METROPOL", "Yüklenici": "MLA", "Yer Teslim Sayısı": 71, "Gerçekleşen Proje Sayısı": 67, "Gerçekleşme Tutarı": 182719865.83 },
    { "BÖLGE MÜDÜRLÜĞÜ": "MERSİN", "OM": "MUT", "Yüklenici": "Dutar", "Yer Teslim Sayısı": 38, "Gerçekleşen Proje Sayısı": 31, "Gerçekleşme Tutarı": 81489874.45 },
    { "BÖLGE MÜDÜRLÜĞÜ": "GAZİANTEP", "OM": "NİZİP", "Yüklenici": "Armin", "Yer Teslim Sayısı": 35, "Gerçekleşen Proje Sayısı": 17, "Gerçekleşme Tutarı": 30042882.18 },
    { "BÖLGE MÜDÜRLÜĞÜ": "ADANA", "OM": "OSMANİYE", "Yüklenici": "Demircan", "Yer Teslim Sayısı": 47, "Gerçekleşen Proje Sayısı": 37, "Gerçekleşme Tutarı": 87712175.16 },
    { "BÖLGE MÜDÜRLÜĞÜ": "HATAY", "OM": "REYHANLI", "Yüklenici": "Demircan", "Yer Teslim Sayısı": 35, "Gerçekleşen Proje Sayısı": 26, "Gerçekleşme Tutarı": 101793964.48 },
    { "BÖLGE MÜDÜRLÜĞÜ": "MERSİN", "OM": "SİLİFKE", "Yüklenici": "Gümüşcü", "Yer Teslim Sayısı": 38, "Gerçekleşen Proje Sayısı": 32, "Gerçekleşme Tutarı": 158960298.15 },
    { "BÖLGE MÜDÜRLÜĞÜ": "MERSİN", "OM": "TARSUS", "Yüklenici": "MLA", "Yer Teslim Sayısı": 89, "Gerçekleşen Proje Sayısı": 47, "Gerçekleşme Tutarı": 135468196.49 }
];

export const s1Data = [
    { BOLGE: "ADANA", OM: "Adana OM", BINA: 88, DUT: 3, SDK: 1, AG: 5.8, YG: 151.1 },
    { BOLGE: "MERSİN", OM: "Anamur OM", BINA: 10, DUT: 62, SDK: 0, AG: 88.2, YG: 70.5 },
    { BOLGE: "ADANA", OM: "Ceyhan OM", BINA: 27, DUT: 2, SDK: 0, AG: 0.0, YG: 170.7 },
    { BOLGE: "HATAY", OM: "Dörtyol OM", BINA: 10, DUT: 2, SDK: 0, AG: 0.0, YG: 0.0 },
    { BOLGE: "OSMANİYE", OM: "Düziçi OM", BINA: 5, DUT: 0, SDK: 0, AG: 0.0, YG: 24.8 },
    { BOLGE: "MERSİN", OM: "Erdemli OM", BINA: 14, DUT: 33, SDK: 0, AG: 37.8, YG: 181.9 },
    { BOLGE: "GAZİANTEP", OM: "Gaziantep OM", BINA: 48, DUT: 4, SDK: 1, AG: 92.9, YG: 534.5 },
    { BOLGE: "HATAY", OM: "Hatay OM", BINA: 40, DUT: 4, SDK: 2, AG: 14.7, YG: 141.3 },
    { BOLGE: "GAZİANTEP", OM: "Islahıye OM", BINA: 8, DUT: 1, SDK: 0, AG: 9.7, YG: 63.3 },
    { BOLGE: "HATAY", OM: "İskenderun OM", BINA: 1, DUT: 0, SDK: 0, AG: 5.2, YG: 22.6 },
    { BOLGE: "OSMANİYE", OM: "Kadirli OM", BINA: 8, DUT: 0, SDK: 0, AG: 3.6, YG: 36.0 },
    { BOLGE: "HATAY", OM: "Kırıkhan OM", BINA: 2, DUT: 3, SDK: 6, AG: 6.1, YG: 69.2 },
    { BOLGE: "KİLİS", OM: "Kilis OM", BINA: 3, DUT: 18, SDK: 0, AG: 46.1, YG: 4.4 },
    { BOLGE: "ADANA", OM: "Kozan OM", BINA: 19, DUT: 8, SDK: 24, AG: 14.7, YG: 264.2 },
    { BOLGE: "MERSİN", OM: "Mersin OM", BINA: 81, DUT: 14, SDK: 2, AG: 21.3, YG: 74.4 },
    { BOLGE: "MERSİN", OM: "Mut OM", BINA: 8, DUT: 17, SDK: 20, AG: 27.0, YG: 226.7 },
    { BOLGE: "GAZİANTEP", OM: "Nizip OM", BINA: 21, DUT: 32, SDK: 0, AG: 25.0, YG: 18.7 },
    { BOLGE: "OSMANİYE", OM: "Osmaniye OM", BINA: 11, DUT: 0, SDK: 0, AG: 0.0, YG: 4.2 },
    { BOLGE: "HATAY", OM: "Reyhanlı OM", BINA: 9, DUT: 2, SDK: 0, AG: 0.0, YG: 84.6 },
    { BOLGE: "MERSİN", OM: "Silifke OM", BINA: 92, DUT: 62, SDK: 0, AG: 154.6, YG: 279.1 },
    { BOLGE: "MERSİN", OM: "Tarsus OM", BINA: 30, DUT: 37, SDK: 19, AG: 38.8, YG: 112.4 }
];

export const s2Data = [
    { BOLGE: "ADANA", OM: "Adana OM", BINA: 200, DUT: 48, SDK: 0, AG: 127.2, YG: 189.3 },
    { BOLGE: "MERSİN", OM: "Anamur OM", BINA: 2, DUT: 78, SDK: 55, AG: 61.5, YG: 49.2 },
    { BOLGE: "ADANA", OM: "Ceyhan OM", BINA: 50, DUT: 14, SDK: 0, AG: 34.0, YG: 107.3 },
    { BOLGE: "HATAY", OM: "Dörtyol OM", BINA: 8, DUT: 4, SDK: 1, AG: 7.5, YG: 39.2 },
    { BOLGE: "OSMANİYE", OM: "Düziçi OM", BINA: 2, DUT: 22, SDK: 5, AG: 33.3, YG: 74.5 },
    { BOLGE: "MERSİN", OM: "Erdemli OM", BINA: 28, DUT: 12, SDK: 123, AG: 39.2, YG: 48.5 },
    { BOLGE: "GAZİANTEP", OM: "Gaziantep OM", BINA: 47, DUT: 43, SDK: 47, AG: 23.3, YG: 57.2 },
    { BOLGE: "HATAY", OM: "Hatay OM", BINA: 58, DUT: 41, SDK: 0, AG: 56.6, YG: 146.1 },
    { BOLGE: "GAZİANTEP", OM: "Islahıye OM", BINA: 1, DUT: 10, SDK: 0, AG: 43.2, YG: 63.6 },
    { BOLGE: "HATAY", OM: "İskenderun OM", BINA: 4, DUT: 2, SDK: 0, AG: 43.9, YG: 182.4 },
    { BOLGE: "OSMANİYE", OM: "Kadirli OM", BINA: 1, DUT: 14, SDK: 0, AG: 19.1, YG: 60.8 },
    { BOLGE: "HATAY", OM: "Kırıkhan OM", BINA: 4, DUT: 8, SDK: 0, AG: 25.1, YG: 204.9 },
    { BOLGE: "KİLİS", OM: "Kilis OM", BINA: 0, DUT: 0, SDK: 0, AG: 7.3, YG: 0.0 },
    { BOLGE: "ADANA", OM: "Kozan OM", BINA: 29, DUT: 14, SDK: 0, AG: 55.3, YG: 102.3 },
    { BOLGE: "MERSİN", OM: "Mersin OM", BINA: 5, DUT: 2, SDK: 113, AG: 0.0, YG: 4.6 },
    { BOLGE: "MERSİN", OM: "Mut OM", BINA: 0, DUT: 25, SDK: 0, AG: 76.5, YG: 178.2 },
    { BOLGE: "GAZİANTEP", OM: "Nizip OM", BINA: 2, DUT: 34, SDK: 18, AG: 32.4, YG: 57.5 },
    { BOLGE: "OSMANİYE", OM: "Osmaniye OM", BINA: 21, DUT: 4, SDK: 0, AG: 60.7, YG: 20.8 },
    { BOLGE: "HATAY", OM: "Reyhanlı OM", BINA: 25, DUT: 9, SDK: 0, AG: 28.0, YG: 208.9 },
    { BOLGE: "MERSİN", OM: "Silifke OM", BINA: 8, DUT: 7, SDK: 0, AG: 60.5, YG: 127.9 },
    { BOLGE: "MERSİN", OM: "Tarsus OM", BINA: 4, DUT: 3, SDK: 5, AG: 30.4, YG: 13.9 }
];
