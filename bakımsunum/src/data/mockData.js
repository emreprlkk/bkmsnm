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
// Sütun sırası: [AG ENH, YG ENH, İM-DM-TRP-KÖK, Güç Yükseltimi, DÜT Bakımı, İlave TR İşi, Aydınlatma Bakımı, SDK Bakımı, Demontaj İşi]



//IndexKategori0AG ENH Bakımı1YG ENH Bakımı2İM-DM-TRP-KÖK3Güç Yükseltimi4DÜT Bakımı5İlave TR İşi6Aydınlatma Bakımı7SDK Bakımı8Demontaj İşi
export const scopeData = [
    {
        name: 'Adana Kuzey', bolge: 'ADANA',
        data: [9, 14, 2, 0, 0, 0, 0, 0, 0],
        cost: [45994313.76, 123102157.42, 2663980.54, 0, 0, 0, 0, 0, 0]
    },
    {
        name: 'Adana Metropol', bolge: 'ADANA',
        data: [18, 8, 32, 0, 0, 7, 0, 0, 1],
        cost: [86721373.24, 67402430.39, 19710844.90, 0, 0, 13122001.70, 0, 0, 157252.47]
    },
    {
        name: 'Ceyhan', bolge: 'ADANA',
        data: [3, 8, 0, 0, 0, 0, 0, 0, 0],
        cost: [7791484.89, 28710061.41, 0, 0, 0, 0, 0, 0, 0]
    },
    {
        name: 'Düziçi', bolge: 'ADANA',
        data: [6, 4, 2, 0, 0, 0, 0, 0, 0],
        cost: [11604329.63, 22191744.57, 202579.91, 0, 0, 0, 0, 0, 0]
    },
    {
        name: 'Kadirli', bolge: 'ADANA',
        data: [3, 9, 11, 0, 0, 0, 0, 0, 1],
        cost: [20138569.53, 36605884.69, 2201110.83, 0, 0, 0, 0, 0, 203779.61]
    },
    {
        name: 'Osmaniye', bolge: 'ADANA',
        data: [16, 8, 13, 0, 0, 0, 0, 0, 0],
        cost: [62659139.45, 21697348.17, 3355687.54, 0, 0, 0, 0, 0, 0]
    },
    {
        name: 'Anamur', bolge: 'MERSİN',
        data: [11, 9, 8, 0, 2, 0, 0, 0, 0],
        cost: [45975641.90, 82452104.21, 3160028.29, 0, 772463.18, 0, 0, 0, 0]
    },
    {
        name: 'Erdemli', bolge: 'MERSİN',
        data: [16, 8, 2, 0, 1, 0, 0, 0, 0],
        cost: [37384012.83, 30859602.77, 699255.40, 0, 621868.34, 0, 0, 0, 0]
    },
    {
        name: 'Mersin Metropol', bolge: 'MERSİN',
        data: [14, 16, 10, 0, 22, 0, 4, 1, 0],
        cost: [63795370.36, 101800872.94, 4213271.77, 0, 12310370.70, 0, 250020.10, 349959.97, 0]
    },
    {
        name: 'Mut', bolge: 'MERSİN',
        data: [20, 7, 2, 0, 1, 1, 0, 0, 0],
        cost: [43360956.65, 34549635.92, 425295.50, 0, 132871.51, 3021114.86, 0, 0, 0]
    },
    {
        name: 'Silifke', bolge: 'MERSİN',
        data: [19, 2, 10, 0, 0, 1, 0, 0, 0],
        cost: [122750591.06, 27089279.00, 3631068.15, 0, 0, 5489359.94, 0, 0, 0]
    },
    {
        name: 'Tarsus', bolge: 'MERSİN',
        data: [30, 6, 3, 3, 5, 0, 0, 0, 0],
        cost: [82359257.38, 37825746.96, 4099309.84, 2468601.60, 8715280.72, 0, 0, 0, 0]
    },
    {
        name: 'Dörtyol', bolge: 'HATAY',
        data: [17, 5, 13, 0, 0, 0, 0, 0, 0],
        cost: [41512908.00, 24549352.43, 6400312.56, 0, 0, 0, 0, 0, 0]
    },
    {
        name: 'Hatay Kırsal', bolge: 'HATAY',
        data: [18, 9, 0, 1, 0, 3, 0, 0, 0],
        cost: [111741870.47, 47955726.32, 0, 6234788.50, 0, 13770237.93, 0, 0, 0]
    },
    {
        name: 'Hatay Metropol', bolge: 'HATAY',
        data: [78, 21, 11, 33, 1, 10, 0, 0, 0],
        cost: [305309570.45, 55683795.51, 9949278.12, 23453187.06, 398688.32, 20099603.61, 0, 0, 0]
    },
    {
        name: 'İskenderun', bolge: 'HATAY',
        data: [19, 2, 6, 5, 0, 1, 0, 0, 0],
        cost: [91836320.38, 1615610.12, 2432788.49, 11583883.49, 0, 5050059.66, 0, 0, 0]
    },
    {
        name: 'Kırıkhan', bolge: 'HATAY',
        data: [11, 1, 0, 2, 0, 2, 0, 0, 0],
        cost: [40320376.89, 888664.89, 0, 1785194.71, 0, 12550486.53, 0, 0, 0]
    },
    {
        name: 'Reyhanlı', bolge: 'HATAY',
        data: [15, 7, 1, 2, 1, 0, 0, 0, 0],
        cost: [75102476.08, 25223357.74, 159634.87, 1199795.49, 108700.30, 0, 0, 0, 0]
    },
    {
        name: 'Gaziantep Metropol', bolge: 'GAZİANTEP',
        data: [10, 7, 27, 0, 0, 1, 3, 0, 2],
        cost: [14621006.87, 37420797.42, 12912968.27, 0, 0, 1972555.96, 9241944.02, 0, 258423.92]
    },
    {
        name: 'İslahiye', bolge: 'GAZİANTEP',
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
        data: [13, 3, 0, 0, 1, 0, 0, 0, 0],
        cost: [25369766.85, 4496857.53, 0, 0, 176257.79, 0, 0, 0, 0]
    },
];

/*export const revenueData = {
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
]; */

export const regionalSales = {
    categories: ['Marmara', 'Ege', 'İç Anadolu', 'Akdeniz', 'Karadeniz'],
    sales: [450, 320, 280, 210, 150]
};

export const presentationSlides = [
    // { id: 1, title: 'SEVİYE-3 PROJE KAPSAMLARI', type: 'chart_line' },
    { id: 9, title: 'USUL VE ESASLAR DEĞİŞİKLİKLERİ', type: 'usul_esas' },
    { id: 8, title: '2025 YÜKLENİCİ GERÇEKLEŞMELERİ', type: '2025_yuklenici_gerceklesme' },
    { id: 5, title: 'YER TESLİMİ', type: 'yer_teslimi' },
    { id: 1, title: 'SEVYE-3 İş Kapsamı-TEDAŞ RAPORLAMA', type: 'chart_pie' },
    { id: 4, title: 'S1-S2 ANALİZİ', type: 'chart_s1_s2' },
    { id: 7, title: 'S1-S2 DENETLEME', type: 's1_s2_denetleme' },
    { id: 10, title: '2025 AFET-HAKEDİŞ VERİLERİ', type: 'afet' },
    { id: 11, title: 'CBS DURUMU', type: 'cbs_durumu' },
    { id: 12, title: '2026 KEŞİF ÖZETİ', type: 'kesif_ozeti' },
    //  { id: 3, title: 'SÖZLEŞME BİLGLERİ', type: 'chart_bar' },
    //  { id: 4, title: 'YÜKLENİCİ BİLGİLERİ', type: 'table' },
    { id: 2, group: 'Fotoğraflar', title: 'AG Sahası Öncesi Sonrası', titleShort: 'AG', type: 'photo_ag' },
    { id: 3, group: 'Fotoğraflar', title: 'YG Sahası Öncesi Sonrası', titleShort: 'YG', type: 'photo_yg' },


    { id: 6, title: '2026 YÜKLENİCİ BİLGİLERİ', type: 'yuklenici_bilgileri' },





    /*
    GİRİŞ AÇILIŞ SAYFASI OLACAK
    USUL ESASLARDAKİ DEĞİŞİKLİKLER
    2025 YÜKLENİCİ GERÇEKLEŞMELERİ -2025 TE NELER YAPILDI ANLAMINDA BİR GİRİŞ OLACAK
    YER TESLİMİ  
    SEVİYE 3 PORJE ADET TEDAŞ RAPORLAMA MALİYETLERİ
    s1-s2 analizi 
    s1-s2 denetleme
    afet
    ağaç budama- koridor açma 
    fotoğraflar (digitalleşme - macro görüntüsü-)
    
    
    
    */
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

export const yukleniciBilgileriData = [
    { "OM": "Adana Kuzey", "SÖZLEŞME ADI": "Adana Kuzey Planlı Bakım Seviye - 3", "İhale Tutarı": 171798842.18, "Yüklenici Firma": "EMİ" },
    { "OM": "Adana Metropol+Ceyhan", "SÖZLEŞME ADI": "Adana Metropol+Ceyhan Planlı Bakım Seviye - 3", "İhale Tutarı": 212799426.99, "Yüklenici Firma": "AYDURAN" },
    { "OM": "Anamur", "SÖZLEŞME ADI": "Anamur Planlı Bakım Seviye - 3", "İhale Tutarı": 181130537.43, "Yüklenici Firma": "NORTON" },
    { "OM": "Erdemli", "SÖZLEŞME ADI": "Erdemli Planlı Bakım Seviye - 3", "İhale Tutarı": 118728609.09, "Yüklenici Firma": "KAMERİM" },
    { "OM": "Gaziantep Metropol", "SÖZLEŞME ADI": "Gaziantep Metropol Planlı Bakım Seviye - 3", "İhale Tutarı": 88947803.53, "Yüklenici Firma": "MLA" },
    { "OM": "Hatay Kırsal", "SÖZLEŞME ADI": "Hatay Kırsal Planlı Bakım Seviye - 3", "İhale Tutarı": 150579029.63, "Yüklenici Firma": "DEMİRCAN" },
    { "OM": "Hatay Metropol", "SÖZLEŞME ADI": "Hatay Metropol Planlı Bakım Seviye - 3", "İhale Tutarı": 225337358.85, "Yüklenici Firma": "DEMİRCAN" },
    { "OM": "İskenderun+Dörtyol+Arsuz", "SÖZLEŞME ADI": "İskenderun+Dörtyol+Arsuz Planlı Bakım Seviye - 3", "İhale Tutarı": 109009025.46, "Yüklenici Firma": "HASAN BULUT" },
    { "OM": "Kadirli", "SÖZLEŞME ADI": "Kadirli Planlı Bakım Seviye - 3", "İhale Tutarı": 100224627.69, "Yüklenici Firma": "ERSA" },
    { "OM": "Kırıkhan+Reyhanlı", "SÖZLEŞME ADI": "Kırıkhan+Reyhanlı Planlı Bakım Seviye - 3", "İhale Tutarı": 186173372.78, "Yüklenici Firma": "MTE" },
    { "OM": "Kilis+Nizip+İslahiye", "SÖZLEŞME ADI": "Kilis+Nizip+İslahiye Planlı Bakım Seviye - 3", "İhale Tutarı": 52145342.72, "Yüklenici Firma": "BİLGE" },
    { "OM": "Mersin Metropol", "SÖZLEŞME ADI": "Mersin Metropol Planlı Bakım Seviye - 3", "İhale Tutarı": 126073964.24, "Yüklenici Firma": "MLA" },
    { "OM": "Mut", "SÖZLEŞME ADI": "Mut Planlı Bakım Seviye - 3", "İhale Tutarı": 94005326.14, "Yüklenici Firma": "DUTAR" },
    { "OM": "Osmaniye+Düziçi", "SÖZLEŞME ADI": "Osmaniye+Düziçi Planlı Bakım Seviye - 3", "İhale Tutarı": 101891087.45, "Yüklenici Firma": "ERSA" },
    { "OM": "Silifke", "SÖZLEŞME ADI": "Silifke Planlı Bakım Seviye - 3", "İhale Tutarı": 174457150.53, "Yüklenici Firma": "ATAGÜC" },
    { "OM": "Tarsus", "SÖZLEŞME ADI": "Tarsus Planlı Bakım Seviye - 3", "İhale Tutarı": 142203915.07, "Yüklenici Firma": "MLA" }
];

export const auditData = [
    { om: 'Ceyhan', tur: 'AG HAT', formSayisi: 11, dogru: 5, yanlis: 6, uygun: 3, uygunsuz: 6, kontrolEdilmedi: 2, s2Duzeltilebilir: 6, s2Disinda: 0 },
    { om: 'Ceyhan', tur: 'YG HAT', formSayisi: 2, dogru: 0, yanlis: 2, uygun: 0, uygunsuz: 2, kontrolEdilmedi: 0, s2Duzeltilebilir: 2, s2Disinda: 0 },
    { om: 'Adana Metropol', tur: 'YG HAT', formSayisi: 4, dogru: 3, yanlis: 1, uygun: 0, uygunsuz: 4, kontrolEdilmedi: 0, s2Duzeltilebilir: 4, s2Disinda: 0 },
    { om: 'Düziçi', tur: 'AG HAT', formSayisi: 11, dogru: 8, yanlis: 3, uygun: 2, uygunsuz: 9, kontrolEdilmedi: 0, s2Duzeltilebilir: 9, s2Disinda: 0 },
    { om: 'Erdemli', tur: 'AG HAT', formSayisi: 19, dogru: 2, yanlis: 12, uygun: 7, uygunsuz: 7, kontrolEdilmedi: 5, s2Duzeltilebilir: 7, s2Disinda: 0 },
    { om: 'Dörtyol', tur: 'AG HAT', formSayisi: 19, dogru: 10, yanlis: 9, uygun: 2, uygunsuz: 17, kontrolEdilmedi: 0, s2Duzeltilebilir: 16, s2Disinda: 1 },
    { om: 'Erdemli', tur: 'AG DİREK', formSayisi: 14, dogru: 10, yanlis: 4, uygun: 0, uygunsuz: 14, kontrolEdilmedi: 0, s2Duzeltilebilir: 7, s2Disinda: 7 },
    { om: 'Adana Kuzey', tur: 'YG DİREK', formSayisi: 10, dogru: 10, yanlis: 0, uygun: 0, uygunsuz: 10, kontrolEdilmedi: 0, s2Duzeltilebilir: 10, s2Disinda: 0 },
    { om: 'Adana Kuzey', tur: 'AG DİREK', formSayisi: 33, dogru: 27, yanlis: 4, uygun: 4, uygunsuz: 27, kontrolEdilmedi: 2, s2Duzeltilebilir: 19, s2Disinda: 8 },
    { om: 'Erdemli', tur: 'YG DİREK', formSayisi: 7, dogru: 5, yanlis: 2, uygun: 0, uygunsuz: 7, kontrolEdilmedi: 0, s2Duzeltilebilir: 7, s2Disinda: 0 },
    { om: 'Erdemli', tur: 'YG HAT', formSayisi: 1, dogru: 0, yanlis: 1, uygun: 0, uygunsuz: 1, kontrolEdilmedi: 0, s2Duzeltilebilir: 1, s2Disinda: 0 },
    { om: 'Düziçi', tur: 'AG DİREK', formSayisi: 5, dogru: 4, yanlis: 1, uygun: 1, uygunsuz: 4, kontrolEdilmedi: 0, s2Duzeltilebilir: 4, s2Disinda: 0 },
    { om: 'Tarsus', tur: 'AG DİREK', formSayisi: 58, dogru: 45, yanlis: 3, uygun: 2, uygunsuz: 46, kontrolEdilmedi: 10, s2Duzeltilebilir: 42, s2Disinda: 4 },
    { om: 'Hatay Metropol', tur: 'AG HAT', formSayisi: 5, dogru: 2, yanlis: 0, uygun: 0, uygunsuz: 2, kontrolEdilmedi: 3, s2Duzeltilebilir: 2, s2Disinda: 0 },
    { om: 'Hatay Metropol', tur: 'AG DİREK', formSayisi: 20, dogru: 20, yanlis: 0, uygun: 1, uygunsuz: 19, kontrolEdilmedi: 0, s2Duzeltilebilir: 19, s2Disinda: 0 },
    { om: 'Tarsus', tur: 'YG DİREK', formSayisi: 26, dogru: 26, yanlis: 0, uygun: 0, uygunsuz: 26, kontrolEdilmedi: 0, s2Duzeltilebilir: 26, s2Disinda: 0 },
    { om: 'Islahiye', tur: 'AG DİREK', formSayisi: 2, dogru: 2, yanlis: 0, uygun: 0, uygunsuz: 2, kontrolEdilmedi: 0, s2Duzeltilebilir: 1, s2Disinda: 1 },
    { om: 'Hatay Metropol', tur: 'YG DİREK', formSayisi: 29, dogru: 24, yanlis: 5, uygun: 0, uygunsuz: 29, kontrolEdilmedi: 0, s2Duzeltilebilir: 25, s2Disinda: 4 },
    { om: 'Silifke', tur: 'AG DİREK', formSayisi: 45, dogru: 40, yanlis: 4, uygun: 0, uygunsuz: 44, kontrolEdilmedi: 1, s2Duzeltilebilir: 43, s2Disinda: 1 },
    { om: 'Silifke', tur: 'AG HAT', formSayisi: 16, dogru: 11, yanlis: 0, uygun: 0, uygunsuz: 11, kontrolEdilmedi: 5, s2Duzeltilebilir: 11, s2Disinda: 0 },
    { om: 'Adana Metropol', tur: 'AG HAT', formSayisi: 4, dogru: 4, yanlis: 0, uygun: 0, uygunsuz: 4, kontrolEdilmedi: 0, s2Duzeltilebilir: 4, s2Disinda: 0 },
    { om: 'Adana Metropol', tur: 'YG DİREK', formSayisi: 5, dogru: 5, yanlis: 0, uygun: 0, uygunsuz: 5, kontrolEdilmedi: 0, s2Duzeltilebilir: 4, s2Disinda: 1 },
    { om: 'Adana Kuzey', tur: 'AG HAT', formSayisi: 13, dogru: 10, yanlis: 0, uygun: 0, uygunsuz: 10, kontrolEdilmedi: 3, s2Duzeltilebilir: 9, s2Disinda: 1 },
    { om: 'Adana Metropol', tur: 'AG DİREK', formSayisi: 4, dogru: 0, yanlis: 4, uygun: 0, uygunsuz: 4, kontrolEdilmedi: 0, s2Duzeltilebilir: 4, s2Disinda: 0 },
    { om: 'Kırıkhan', tur: 'AG DİREK', formSayisi: 12, dogru: 12, yanlis: 0, uygun: 0, uygunsuz: 12, kontrolEdilmedi: 0, s2Duzeltilebilir: 12, s2Disinda: 0 },
    { om: 'Kırıkhan', tur: 'YG DİREK', formSayisi: 2, dogru: 2, yanlis: 0, uygun: 0, uygunsuz: 2, kontrolEdilmedi: 0, s2Duzeltilebilir: 0, s2Disinda: 2 },
    { om: 'Tarsus', tur: 'AG HAT', formSayisi: 46, dogru: 12, yanlis: 0, uygun: 0, uygunsuz: 12, kontrolEdilmedi: 34, s2Duzeltilebilir: 12, s2Disinda: 0 },
    { om: 'Osmaniye', tur: 'YG DİREK', formSayisi: 43, dogru: 41, yanlis: 2, uygun: 2, uygunsuz: 41, kontrolEdilmedi: 0, s2Duzeltilebilir: 41, s2Disinda: 0 },
    { om: 'İskenderun', tur: 'YG DİREK', formSayisi: 7, dogru: 3, yanlis: 4, uygun: 0, uygunsuz: 7, kontrolEdilmedi: 0, s2Duzeltilebilir: 7, s2Disinda: 0 },
    { om: 'İskenderun', tur: 'AG DİREK', formSayisi: 6, dogru: 1, yanlis: 5, uygun: 0, uygunsuz: 6, kontrolEdilmedi: 0, s2Duzeltilebilir: 5, s2Disinda: 1 },
    { om: 'Kadirli', tur: 'AG DİREK', formSayisi: 16, dogru: 13, yanlis: 2, uygun: 1, uygunsuz: 15, kontrolEdilmedi: 0, s2Duzeltilebilir: 13, s2Disinda: 2 },
    { om: 'Kadirli', tur: 'AG HAT', formSayisi: 15, dogru: 14, yanlis: 0, uygun: 0, uygunsuz: 14, kontrolEdilmedi: 1, s2Duzeltilebilir: 14, s2Disinda: 0 },
    { om: 'Osmaniye', tur: 'AG DİREK', formSayisi: 20, dogru: 16, yanlis: 2, uygun: 0, uygunsuz: 18, kontrolEdilmedi: 2, s2Duzeltilebilir: 16, s2Disinda: 2 },
    { om: 'Osmaniye', tur: 'AG HAT', formSayisi: 4, dogru: 4, yanlis: 0, uygun: 0, uygunsuz: 4, kontrolEdilmedi: 0, s2Duzeltilebilir: 4, s2Disinda: 0 },
    { om: 'Mut', tur: 'YG DİREK', formSayisi: 12, dogru: 11, yanlis: 1, uygun: 0, uygunsuz: 12, kontrolEdilmedi: 0, s2Duzeltilebilir: 11, s2Disinda: 1 },
    { om: 'Mut', tur: 'AG DİREK', formSayisi: 3, dogru: 3, yanlis: 0, uygun: 0, uygunsuz: 3, kontrolEdilmedi: 0, s2Duzeltilebilir: 3, s2Disinda: 0 },
    { om: 'Dörtyol', tur: 'YG DİREK', formSayisi: 7, dogru: 7, yanlis: 0, uygun: 0, uygunsuz: 7, kontrolEdilmedi: 0, s2Duzeltilebilir: 5, s2Disinda: 2 },
    { om: 'Dörtyol', tur: 'AG DİREK', formSayisi: 10, dogru: 9, yanlis: 1, uygun: 0, uygunsuz: 10, kontrolEdilmedi: 0, s2Duzeltilebilir: 10, s2Disinda: 0 },
    { om: 'Gaziantep Metropol', tur: 'AG DİREK', formSayisi: 8, dogru: 7, yanlis: 0, uygun: 0, uygunsuz: 7, kontrolEdilmedi: 1, s2Duzeltilebilir: 0, s2Disinda: 7 },
    { om: 'Gaziantep Metropol', tur: 'YG DİREK', formSayisi: 1, dogru: 1, yanlis: 0, uygun: 0, uygunsuz: 1, kontrolEdilmedi: 0, s2Duzeltilebilir: 1, s2Disinda: 0 },
    { om: 'Gaziantep Metropol', tur: 'YG HAT', formSayisi: 8, dogru: 8, yanlis: 0, uygun: 8, uygunsuz: 0, kontrolEdilmedi: 0, s2Duzeltilebilir: 0, s2Disinda: 0 },
    { om: 'Gaziantep Metropol', tur: 'AG HAT', formSayisi: 6, dogru: 2, yanlis: 0, uygun: 0, uygunsuz: 2, kontrolEdilmedi: 4, s2Duzeltilebilir: 2, s2Disinda: 0 },
    { om: 'Kadirli', tur: 'YG DİREK', formSayisi: 7, dogru: 7, yanlis: 0, uygun: 0, uygunsuz: 7, kontrolEdilmedi: 0, s2Duzeltilebilir: 7, s2Disinda: 0 },
    { om: 'Kilis', tur: 'AG DİREK', formSayisi: 13, dogru: 13, yanlis: 0, uygun: 0, uygunsuz: 13, kontrolEdilmedi: 0, s2Duzeltilebilir: 13, s2Disinda: 0 },
    { om: 'Kilis', tur: 'AG HAT', formSayisi: 3, dogru: 2, yanlis: 0, uygun: 2, uygunsuz: 0, kontrolEdilmedi: 1, s2Duzeltilebilir: 0, s2Disinda: 0 },
    { om: 'Dörtyol', tur: 'YG HAT', formSayisi: 4, dogru: 4, yanlis: 0, uygun: 0, uygunsuz: 4, kontrolEdilmedi: 0, s2Duzeltilebilir: 4, s2Disinda: 0 },
    { om: 'Reyhanlı', tur: 'AG HAT', formSayisi: 5, dogru: 5, yanlis: 0, uygun: 0, uygunsuz: 5, kontrolEdilmedi: 0, s2Duzeltilebilir: 5, s2Disinda: 0 },
    { om: 'Reyhanlı', tur: 'AG DİREK', formSayisi: 15, dogru: 15, yanlis: 0, uygun: 0, uygunsuz: 15, kontrolEdilmedi: 0, s2Duzeltilebilir: 11, s2Disinda: 4 },
    { om: 'İskenderun', tur: 'AG HAT', formSayisi: 2, dogru: 0, yanlis: 0, uygun: 0, uygunsuz: 0, kontrolEdilmedi: 2, s2Duzeltilebilir: 0, s2Disinda: 0 },
    { om: 'Reyhanlı', tur: 'YG DİREK', formSayisi: 3, dogru: 3, yanlis: 0, uygun: 0, uygunsuz: 3, kontrolEdilmedi: 0, s2Duzeltilebilir: 3, s2Disinda: 0 },
    { om: 'Hatay Metropol', tur: 'YG HAT', formSayisi: 2, dogru: 0, yanlis: 0, uygun: 0, uygunsuz: 0, kontrolEdilmedi: 2, s2Duzeltilebilir: 0, s2Disinda: 0 },
];

export const contractData = [
    {
        bm: 'ADANA',
        sozlesmeNo: '25.0615.SSD.41',
        sozlesmeAdi: 'ADANA KUZEY PLANLI BAKIM SEVİYE-3',
        yuklenici: 'KAYATEKNİK',
        sozlesmeBedeli: 91716583.36,
        toplamHakEdis: 84743752.06,
        kalanHakEdis: 6972831.30,
        doluluk: 92.40
    },
    {
        bm: 'ADANA',
        sozlesmeNo: '25.0498.SSD.25',
        sozlesmeAdi: 'ADANA METROPOL PLANLI BAKIM SEVİYE-3',
        yuklenici: 'AYDURAN',
        sozlesmeBedeli: 101127099.48,
        toplamHakEdis: 95143049.34,
        kalanHakEdis: 5984050.14,
        doluluk: 94.08
    },
    {
        bm: 'ADANA',
        sozlesmeNo: '25.0515.SSD.30',
        sozlesmeAdi: 'KADİRLİ+CEYHAN PLANLI BAKIM SEVİYE-3',
        yuklenici: 'ERCE',
        sozlesmeBedeli: 49481860.98,
        toplamHakEdis: 48509315.33,
        kalanHakEdis: 972545.65,
        doluluk: 98.03
    },
    {
        bm: 'ADANA',
        sozlesmeNo: '25.0523.SSD.33',
        sozlesmeAdi: 'OSMANİYE+DÜZİÇİ PLANLI BAKIM SEVİYE-3',
        yuklenici: 'DEMİRCAN',
        sozlesmeBedeli: 70242195.14,
        toplamHakEdis: 57968701.19,
        kalanHakEdis: 12273493.95,
        doluluk: 82.53
    },
    {
        bm: 'GAZİANTEP',
        sozlesmeNo: '25.0528.SSD.38',
        sozlesmeAdi: 'GAZİANTEP METROPOL PLANLI BAKIM SEVİYE-3',
        yuklenici: 'ARMİN',
        sozlesmeBedeli: 45316526.52,
        toplamHakEdis: 31074315.42,
        kalanHakEdis: 14242211.10,
        doluluk: 68.57
    },
    {
        bm: 'GAZİANTEP',
        sozlesmeNo: '25.0524.SSD.34',
        sozlesmeAdi: 'KİLİS+NİZİP+İSLAHİYE PLANLI BAKIM SEVİYE-3',
        yuklenici: 'ARMİN',
        sozlesmeBedeli: 51842391.83,
        toplamHakEdis: 34777170.02,
        kalanHakEdis: 17065221.81,
        doluluk: 67.08
    },
    {
        bm: 'HATAY',
        sozlesmeNo: '25.0526.SSD.36',
        sozlesmeAdi: 'HATAY METROPOL PLANLI BAKIM SEVİYE-3',
        yuklenici: 'DEMİRCAN',
        sozlesmeBedeli: 288188400.86,
        toplamHakEdis: 213039354.08,
        kalanHakEdis: 75149046.78,
        doluluk: 73.92
    },
    {
        bm: 'HATAY',
        sozlesmeNo: '25.0527.SSD.37',
        sozlesmeAdi: 'HATAY KIRSAL PLANLI BAKIM SEVİYE-3',
        yuklenici: 'DEMİRCAN',
        sozlesmeBedeli: 151132670.74,
        toplamHakEdis: 98741685.00,
        kalanHakEdis: 52390985.74,
        doluluk: 65.33
    },
    {
        bm: 'HATAY',
        sozlesmeNo: '25.0525.SSD.35',
        sozlesmeAdi: 'İSKENDERUN+DÖRTYOL+ARSUZ PLANLI BAKIM SEVİYE-3',
        yuklenici: 'ARMİN',
        sozlesmeBedeli: 137930210.39,
        toplamHakEdis: 88538517.07,
        kalanHakEdis: 49391693.32,
        doluluk: 64.19
    },
    {
        bm: 'HATAY',
        sozlesmeNo: '25.0514.SSD.29',
        sozlesmeAdi: 'KIRIKHAN+REYHANLI PLANLI BAKIM SEVİYE-3',
        yuklenici: 'TOKİŞ',
        sozlesmeBedeli: 87564392.24,
        toplamHakEdis: 57915404.73,
        kalanHakEdis: 29648987.51,
        doluluk: 66.14
    },
    {
        bm: 'MERSİN',
        sozlesmeNo: '25.0513.SSD.28',
        sozlesmeAdi: 'MERSİN METROPOL PLANLI BAKIM SEVİYE-3',
        yuklenici: 'MLA',
        sozlesmeBedeli: 100133296.65,
        toplamHakEdis: 69711768.93,
        kalanHakEdis: 30421527.72,
        doluluk: 69.62
    },
    {
        bm: 'MERSİN',
        sozlesmeNo: '25.0497.SSD.24',
        sozlesmeAdi: 'ERDEMLİ PLANLI BAKIM SEVİYE-3',
        yuklenici: 'GÜMÜŞÇÜ',
        sozlesmeBedeli: 36321184.08,
        toplamHakEdis: 29670090.91,
        kalanHakEdis: 6651093.17,
        doluluk: 81.69
    },
    {
        bm: 'MERSİN',
        sozlesmeNo: '25.0522.SSD.32',
        sozlesmeAdi: 'TARSUS PLANLI BAKIM SEVİYE-3',
        yuklenici: 'MLA',
        sozlesmeBedeli: 94041971.06,
        toplamHakEdis: 81114101.78,
        kalanHakEdis: 12927869.28,
        doluluk: 86.25
    },
    {
        bm: 'MERSİN',
        sozlesmeNo: '25.0511.SSD.26',
        sozlesmeAdi: 'SİLİFKE PLANLI BAKIM SEVİYE-3',
        yuklenici: 'GÜMÜŞÇÜ',
        sozlesmeBedeli: 82717890.77,
        toplamHakEdis: 72514443.46,
        kalanHakEdis: 10203447.31,
        doluluk: 87.66
    },
    {
        bm: 'MERSİN',
        sozlesmeNo: '25.0529.SSD.39',
        sozlesmeAdi: 'ANAMUR PLANLI BAKIM SEVİYE-3',
        yuklenici: 'ARMİN',
        sozlesmeBedeli: 97731658.26,
        toplamHakEdis: 76368778.77,
        kalanHakEdis: 21362879.49,
        doluluk: 78.14
    },
    {
        bm: 'MERSİN',
        sozlesmeNo: '25.0512.SSD.27',
        sozlesmeAdi: 'MUT PLANLI BAKIM SEVİYE-3',
        yuklenici: 'DUTAR',
        sozlesmeBedeli: 44476726.84,
        toplamHakEdis: 33252379.23,
        kalanHakEdis: 11224347.61,
        doluluk: 74.76
    },
    {
        bm: 'TOROSLAR',
        sozlesmeNo: '25.0355.SİH.02',
        sozlesmeAdi: 'DAĞITIM ŞEBEKELERİNDE AĞAÇ BUDAMA İŞİ',
        yuklenici: 'TİBETOĞLU',
        sozlesmeBedeli: 37187500.00,
        toplamHakEdis: 36787486.01,
        kalanHakEdis: 400013.99,
        doluluk: 98.92
    },
    {
        bm: 'TOROSLAR',
        sozlesmeNo: '25.0386.SİH.05',
        sozlesmeAdi: 'DAĞITIM ŞEBEKELERİNDE KORİDOR AÇMA İŞİ',
        yuklenici: 'EKOLOJİ',
        sozlesmeBedeli: 21094250.00,
        toplamHakEdis: 20813500.00,
        kalanHakEdis: 280750.00,
        doluluk: 98.67
    },
];

export const contractTotal = {
    sozlesmeBedeli: 1588246809.20,
    toplamHakEdis: 1230683813.33,
    kalanHakEdis: 357562995.87,
    doluluk: 77.49
};

// ── Afet Verileri ────────────────────────────────────────────────────────────

export const afetSicaklikOrmanData = [
    { om: "ADANA METROPOL", ort_gun_personel: 27, ort_gun_arac: 8, ort_gun_vinc: 2, ort_gun_kepce: null, orman_yangini: null, sicaklik: 1621043.03, genel_toplam: 1621043.03 },
    { om: "GAZİANTEP METROPOL", ort_gun_personel: 33, ort_gun_arac: 9, ort_gun_vinc: 2, ort_gun_kepce: null, orman_yangini: null, sicaklik: 3081040.94, genel_toplam: 3081040.94 },
    { om: "HATAY METROPOL", ort_gun_personel: 3, ort_gun_arac: 1, ort_gun_vinc: null, ort_gun_kepce: null, orman_yangini: null, sicaklik: 332041.11, genel_toplam: 332041.11 },
    { om: "İSKENDERUN", ort_gun_personel: 4, ort_gun_arac: 2, ort_gun_vinc: null, ort_gun_kepce: null, orman_yangini: null, sicaklik: 101697.39, genel_toplam: 101697.39 },
    { om: "KIRIKHAN", ort_gun_personel: 10, ort_gun_arac: 3, ort_gun_vinc: 1, ort_gun_kepce: 1, orman_yangini: null, sicaklik: 682935.12, genel_toplam: 682935.12 },
    { om: "REYHANLI", ort_gun_personel: 3, ort_gun_arac: 1, ort_gun_vinc: null, ort_gun_kepce: null, orman_yangini: null, sicaklik: 40887.80, genel_toplam: 40887.80 },
    { om: "SİLİFKE", ort_gun_personel: 10, ort_gun_arac: 3, ort_gun_vinc: null, ort_gun_kepce: null, orman_yangini: 288459.35, sicaklik: null, genel_toplam: 288459.35 },
    { om: "GENEL TOPLAM", ort_gun_personel: null, ort_gun_arac: null, ort_gun_vinc: null, ort_gun_kepce: null, orman_yangini: 288459.35, sicaklik: 5859645.39, genel_toplam: 6148104.74 },
];

export const afetDepremData = [
    { om: "HATAY METROPOL", ort_gun_personel: 26, ort_gun_arac: 13, ort_gun_vinc: null, ort_gun_kepce: null, deprem_hakedis: 52254562.98 },
    { om: "KIRIKHAN", ort_gun_personel: 4, ort_gun_arac: 2, ort_gun_vinc: null, ort_gun_kepce: null, deprem_hakedis: 2487177.54 },
    { om: "GENEL TOPLAM", ort_gun_personel: null, ort_gun_arac: null, ort_gun_vinc: null, ort_gun_kepce: null, deprem_hakedis: 54741740.52 },
];

// ── CBS Durumu Verileri ──────────────────────────────────────────────────────

export const cbsdata = [
    { om: 'Adana Metropol', hataliKoordinat: 1, onaylandi: 0, ozNitelikUyumsuz: 6, plakaHatasi: 0, hataliVeri: 4, islendi: 56, eksikVeri: 10, genelToplam: 77 },
    { om: 'Anamur', hataliKoordinat: 0, onaylandi: 0, ozNitelikUyumsuz: 0, plakaHatasi: 5, hataliVeri: 1, islendi: 44, eksikVeri: 0, genelToplam: 50 },
    { om: 'Antakya Metropol', hataliKoordinat: 3, onaylandi: 1, ozNitelikUyumsuz: 4, plakaHatasi: 2, hataliVeri: 4, islendi: 89, eksikVeri: 59, genelToplam: 162 },
    { om: 'Ceyhan', hataliKoordinat: 2, onaylandi: 0, ozNitelikUyumsuz: 4, plakaHatasi: 0, hataliVeri: 0, islendi: 24, eksikVeri: 10, genelToplam: 41 },
    { om: 'Dörtyol', hataliKoordinat: 0, onaylandi: 0, ozNitelikUyumsuz: 4, plakaHatasi: 1, hataliVeri: 6, islendi: 38, eksikVeri: 24, genelToplam: 73 },
    { om: 'Düziçi', hataliKoordinat: 0, onaylandi: 0, ozNitelikUyumsuz: 0, plakaHatasi: 0, hataliVeri: 5, islendi: 14, eksikVeri: 8, genelToplam: 27 },
    { om: 'Erdemli', hataliKoordinat: 0, onaylandi: 0, ozNitelikUyumsuz: 0, plakaHatasi: 1, hataliVeri: 1, islendi: 34, eksikVeri: 7, genelToplam: 43 },
    { om: 'Gaziantep Metropol', hataliKoordinat: 0, onaylandi: 0, ozNitelikUyumsuz: 1, plakaHatasi: 0, hataliVeri: 4, islendi: 67, eksikVeri: 12, genelToplam: 84 },
    { om: 'Islahiye', hataliKoordinat: 1, onaylandi: 0, ozNitelikUyumsuz: 1, plakaHatasi: 0, hataliVeri: 3, islendi: 19, eksikVeri: 5, genelToplam: 29 },
    { om: 'İskenderun', hataliKoordinat: 1, onaylandi: 0, ozNitelikUyumsuz: 0, plakaHatasi: 0, hataliVeri: 8, islendi: 34, eksikVeri: 14, genelToplam: 57 },
    { om: 'Kadirli', hataliKoordinat: 0, onaylandi: 0, ozNitelikUyumsuz: 9, plakaHatasi: 1, hataliVeri: 7, islendi: 34, eksikVeri: 11, genelToplam: 62 },
    { om: 'Kırıkhan', hataliKoordinat: 1, onaylandi: 0, ozNitelikUyumsuz: 3, plakaHatasi: 1, hataliVeri: 1, islendi: 17, eksikVeri: 12, genelToplam: 35 },
    { om: 'Kilis', hataliKoordinat: 2, onaylandi: 0, ozNitelikUyumsuz: 2, plakaHatasi: 0, hataliVeri: 3, islendi: 69, eksikVeri: 10, genelToplam: 86 },
    { om: 'Kozan', hataliKoordinat: 1, onaylandi: 0, ozNitelikUyumsuz: 3, plakaHatasi: 3, hataliVeri: 6, islendi: 38, eksikVeri: 18, genelToplam: 69 },
    { om: 'Mersin Metropol', hataliKoordinat: 0, onaylandi: 0, ozNitelikUyumsuz: 6, plakaHatasi: 3, hataliVeri: 2, islendi: 105, eksikVeri: 14, genelToplam: 130 },
    { om: 'Mut', hataliKoordinat: 1, onaylandi: 0, ozNitelikUyumsuz: 2, plakaHatasi: 4, hataliVeri: 0, islendi: 52, eksikVeri: 7, genelToplam: 66 },
    { om: 'Nizip', hataliKoordinat: 1, onaylandi: 0, ozNitelikUyumsuz: 0, plakaHatasi: 0, hataliVeri: 2, islendi: 22, eksikVeri: 1, genelToplam: 27 },
    { om: 'Osmaniye', hataliKoordinat: 0, onaylandi: 0, ozNitelikUyumsuz: 1, plakaHatasi: 0, hataliVeri: 0, islendi: 0, eksikVeri: 0, genelToplam: 1 },
    { om: 'Reyhanlı', hataliKoordinat: 1, onaylandi: 0, ozNitelikUyumsuz: 3, plakaHatasi: 3, hataliVeri: 4, islendi: 28, eksikVeri: 21, genelToplam: 60 },
    { om: 'Silifke', hataliKoordinat: 5, onaylandi: 0, ozNitelikUyumsuz: 5, plakaHatasi: 6, hataliVeri: 2, islendi: 66, eksikVeri: 11, genelToplam: 95 },
    { om: 'Tarsus', hataliKoordinat: 0, onaylandi: 0, ozNitelikUyumsuz: 1, plakaHatasi: 2, hataliVeri: 7, islendi: 61, eksikVeri: 7, genelToplam: 78 },
];

export const koordinatTotal = {
    hataliKoordinat: 20, onaylandi: 1, ozNitelikUyumsuz: 55, plakaHatasi: 32,
    hataliVeri: 70, islendi: 911, eksikVeri: 261, genelToplam: 1352
};

// ── 2026 Keşif Envanteri ──────────────────────────────────────────────────────

export const envanterData = [
    { bolge: 'ADANA', om: 'Adana Metropol', direk: 250, hucreMmhGazli: 2, hucreMmmhHavali: 75, kesiciSf6: 0, panoAgDagilim: 202, panoAydinlatma: 0, panoSdk: 2, trafoDagitimHr: 10, genelToplam: 541 },
    { bolge: 'MERSİN', om: 'Anamur', direk: 113, hucreMmhGazli: 0, hucreMmmhHavali: 0, kesiciSf6: 0, panoAgDagilim: 0, panoAydinlatma: 0, panoSdk: 0, trafoDagitimHr: 0, genelToplam: 113 },
    { bolge: 'HATAY', om: 'Antakya Metropol', direk: 373, hucreMmhGazli: 6, hucreMmmhHavali: 9, kesiciSf6: 0, panoAgDagilim: 18, panoAydinlatma: 0, panoSdk: 25, trafoDagitimHr: 2, genelToplam: 433 },
    { bolge: 'MERSİN', om: 'Arsuz', direk: 6, hucreMmhGazli: 0, hucreMmmhHavali: 0, kesiciSf6: 0, panoAgDagilim: 0, panoAydinlatma: 0, panoSdk: 0, trafoDagitimHr: 0, genelToplam: 6 },
    { bolge: 'ADANA', om: 'Ceyhan', direk: 56, hucreMmhGazli: 0, hucreMmmhHavali: 0, kesiciSf6: 0, panoAgDagilim: 8, panoAydinlatma: 1, panoSdk: 1, trafoDagitimHr: 0, genelToplam: 66 },
    { bolge: 'HATAY', om: 'Dörtyol', direk: 117, hucreMmhGazli: 0, hucreMmmhHavali: 2, kesiciSf6: 0, panoAgDagilim: 5, panoAydinlatma: 0, panoSdk: 5, trafoDagitimHr: 4, genelToplam: 133 },
    { bolge: 'ADANA', om: 'Düziçi', direk: 66, hucreMmhGazli: 0, hucreMmmhHavali: 2, kesiciSf6: 0, panoAgDagilim: 0, panoAydinlatma: 7, panoSdk: 0, trafoDagitimHr: 0, genelToplam: 75 },
    { bolge: 'MERSİN', om: 'Erdemli', direk: 120, hucreMmhGazli: 4, hucreMmmhHavali: 2, kesiciSf6: 2, panoAgDagilim: 0, panoAydinlatma: 0, panoSdk: 0, trafoDagitimHr: 0, genelToplam: 128 },
    { bolge: 'GAZİANTEP', om: 'Gaziantep Metropol', direk: 139, hucreMmhGazli: 0, hucreMmmhHavali: 8, kesiciSf6: 0, panoAgDagilim: 10, panoAydinlatma: 10, panoSdk: 7, trafoDagitimHr: 1, genelToplam: 175 },
    { bolge: 'GAZİANTEP', om: 'Islahiye', direk: 21, hucreMmhGazli: 0, hucreMmmhHavali: 0, kesiciSf6: 0, panoAgDagilim: 0, panoAydinlatma: 0, panoSdk: 0, trafoDagitimHr: 0, genelToplam: 21 },
    { bolge: 'HATAY', om: 'İskenderun', direk: 43, hucreMmhGazli: 0, hucreMmmhHavali: 3, kesiciSf6: 0, panoAgDagilim: 4, panoAydinlatma: 0, panoSdk: 0, trafoDagitimHr: 2, genelToplam: 52 },
    { bolge: 'ADANA', om: 'Kadirli', direk: 138, hucreMmhGazli: 0, hucreMmmhHavali: 4, kesiciSf6: 0, panoAgDagilim: 11, panoAydinlatma: 0, panoSdk: 0, trafoDagitimHr: 0, genelToplam: 153 },
    { bolge: 'HATAY', om: 'Kırıkhan', direk: 118, hucreMmhGazli: 0, hucreMmmhHavali: 0, kesiciSf6: 0, panoAgDagilim: 0, panoAydinlatma: 0, panoSdk: 0, trafoDagitimHr: 0, genelToplam: 118 },
    { bolge: 'GAZİANTEP', om: 'Kilis', direk: 8, hucreMmhGazli: 0, hucreMmmhHavali: 15, kesiciSf6: 0, panoAgDagilim: 0, panoAydinlatma: 0, panoSdk: 0, trafoDagitimHr: 0, genelToplam: 23 },
    { bolge: 'ADANA', om: 'Kozan', direk: 93, hucreMmhGazli: 0, hucreMmmhHavali: 0, kesiciSf6: 0, panoAgDagilim: 11, panoAydinlatma: 0, panoSdk: 0, trafoDagitimHr: 0, genelToplam: 104 },
    { bolge: 'MERSİN', om: 'Mersin Metropol', direk: 127, hucreMmhGazli: 0, hucreMmmhHavali: 0, kesiciSf6: 0, panoAgDagilim: 0, panoAydinlatma: 1, panoSdk: 8, trafoDagitimHr: 0, genelToplam: 136 },
    { bolge: 'MERSİN', om: 'Mut', direk: 143, hucreMmhGazli: 0, hucreMmmhHavali: 0, kesiciSf6: 0, panoAgDagilim: 0, panoAydinlatma: 0, panoSdk: 0, trafoDagitimHr: 0, genelToplam: 143 },
    { bolge: 'GAZİANTEP', om: 'Nizip', direk: 45, hucreMmhGazli: 0, hucreMmmhHavali: 0, kesiciSf6: 0, panoAgDagilim: 0, panoAydinlatma: 0, panoSdk: 0, trafoDagitimHr: 0, genelToplam: 45 },
    { bolge: 'ADANA', om: 'Osmaniye', direk: 148, hucreMmhGazli: 0, hucreMmmhHavali: 3, kesiciSf6: 0, panoAgDagilim: 6, panoAydinlatma: 0, panoSdk: 0, trafoDagitimHr: 0, genelToplam: 157 },
    { bolge: 'HATAY', om: 'Reyhanlı', direk: 114, hucreMmhGazli: 0, hucreMmmhHavali: 12, kesiciSf6: 0, panoAgDagilim: 15, panoAydinlatma: 0, panoSdk: 0, trafoDagitimHr: 2, genelToplam: 143 },
    { bolge: 'MERSİN', om: 'Silifke', direk: 151, hucreMmhGazli: 0, hucreMmmhHavali: 0, kesiciSf6: 0, panoAgDagilim: 0, panoAydinlatma: 0, panoSdk: 0, trafoDagitimHr: 6, genelToplam: 157 },
    { bolge: 'MERSİN', om: 'Tarsus', direk: 189, hucreMmhGazli: 0, hucreMmmhHavali: 0, kesiciSf6: 0, panoAgDagilim: 23, panoAydinlatma: 8, panoSdk: 0, trafoDagitimHr: 6, genelToplam: 226 },
];

export const envanterTotal = {
    direk: 2578, hucreMmhGazli: 12, hucreMmmhHavali: 135, kesiciSf6: 2,
    panoAgDagilim: 313, panoAydinlatma: 27, panoSdk: 48, trafoDagitimHr: 33, genelToplam: 3148
};
