// mockData.js
// Simple, uncrowded datasets for presentations



export const scopeCategories = [
    'AG Havai Hat Bakımı',
    'YG Enerji Nakil Hattı Bakımı',
    'İM-DM-TRP-KÖK Bakımı',
    'İlave TR İşi',
    'DÜT Bakımı',
    'Güç Yükseltimi',
    'Aydınlatma Bakımı',
    'SDK Bakımı',
];

// data = adet, cost = maliyet (₺) — sütun sırası scopeCategories ile aynı:
// [AG ENH, YG ENH, İM-DM-TRP-KÖK, Güç Yükseltimi, DÜT Bakımı, İlave TR İşi, Aydınlatma Bakımı, SDK Bakımı, Demontaj İşi]
// Sütun sırası: [AG ENH, YG ENH, İM-DM-TRP-KÖK, Güç Yükseltimi, DÜT Bakımı, İlave TR İşi, Aydınlatma Bakımı, SDK Bakımı, Demontaj İşi]



// Sütun sırası: [AG Havai Hat, YG ENH, İM-DM-TRP-KÖK, İlave TR, DÜT, Güç Yükseltimi, Aydınlatma, SDK]
export const scopeData = [
    { name: 'Adana Kuzey', bolge: 'ADANA', data: [9, 14, 2, 0, 0, 0, 0, 0], cost: [45994313.76, 132331030.56, 2663980.54, 0, 0, 0, 0, 0] },
    { name: 'Adana Metropol', bolge: 'ADANA', data: [19, 10, 32, 7, 0, 0, 0, 0], cost: [86878625.70, 67402430.39, 19710844.90, 15363512.93, 0, 0, 0, 0] },
    { name: 'Anamur', bolge: 'MERSİN', data: [11, 9, 8, 0, 2, 0, 0, 0], cost: [45975641.90, 83467447.04, 3160028.29, 0, 772463.18, 0, 0, 0] },
    { name: 'Ceyhan', bolge: 'ADANA', data: [3, 9, 0, 0, 0, 0, 0, 0], cost: [7791484.89, 28710061.41, 0, 0, 0, 0, 0, 0] },
    { name: 'Dörtyol', bolge: 'HATAY', data: [18, 5, 13, 0, 0, 0, 0, 0], cost: [53789491.60, 24549352.43, 6927675.00, 0, 0, 0, 0, 0] },
    { name: 'Düziçi', bolge: 'ADANA', data: [6, 4, 2, 0, 0, 0, 0, 0], cost: [11604329.63, 31539216.22, 202579.91, 0, 0, 0, 0, 0] },
    { name: 'Erdemli', bolge: 'MERSİN', data: [16, 8, 2, 0, 1, 0, 0, 0], cost: [38975520.08, 40332484.81, 699255.40, 0, 621868.34, 0, 0, 0] },
    { name: 'Gaziantep Metropol', bolge: 'GAZİANTEP', data: [12, 8, 27, 1, 0, 0, 3, 0], cost: [17306743.79, 47133078.05, 13440330.71, 1972555.96, 0, 0, 9241944.02, 0] },
    { name: 'Hatay Kırsal', bolge: 'HATAY', data: [18, 9, 0, 3, 0, 1, 0, 0], cost: [111741870.47, 47955726.32, 0, 13770237.93, 0, 6234788.50, 0, 0] },
    { name: 'Hatay Metropol', bolge: 'HATAY', data: [78, 23, 11, 10, 1, 33, 0, 0], cost: [308075615.66, 56614250.51, 9949278.12, 20099603.61, 398688.32, 23453187.06, 0, 0] },
    { name: 'İskenderun', bolge: 'HATAY', data: [19, 2, 6, 1, 0, 6, 0, 0], cost: [91836320.38, 3352293.35, 2432788.49, 5050059.66, 0, 12775468.12, 0, 0] },
    { name: 'İslahiye', bolge: 'GAZİANTEP', data: [11, 6, 2, 0, 0, 0, 0, 0], cost: [14463460.15, 9176539.85, 595979.20, 0, 0, 0, 0, 0] },
    { name: 'Kadirli', bolge: 'ADANA', data: [3, 12, 11, 0, 0, 0, 0, 0], cost: [20138569.53, 41905027.34, 2201110.83, 0, 0, 0, 0, 0] },
    { name: 'Kırıkhan', bolge: 'HATAY', data: [11, 1, 0, 2, 0, 2, 0, 0], cost: [46243175.91, 888664.89, 0, 12550486.53, 0, 8350427.75, 0, 0] },
    { name: 'Kilis', bolge: 'GAZİANTEP', data: [18, 5, 5, 0, 0, 0, 0, 0], cost: [28364741.39, 9847882.59, 4044094.34, 0, 0, 0, 0, 0] },
    { name: 'Mersin Metropol', bolge: 'MERSİN', data: [14, 16, 10, 0, 22, 0, 4, 1], cost: [64745468.45, 116295123.92, 4213271.77, 0, 12310370.70, 0, 250020.10, 349959.97] },
    { name: 'Mut', bolge: 'MERSİN', data: [20, 7, 2, 1, 1, 0, 0, 0], cost: [43360956.65, 48613619.93, 425295.50, 3021114.86, 132871.51, 0, 0, 0] },
    { name: 'Nizip', bolge: 'GAZİANTEP', data: [14, 5, 0, 0, 1, 0, 0, 0], cost: [26103666.04, 7276254.10, 0, 0, 176257.79, 0, 0, 0] },
    { name: 'Osmaniye', bolge: 'ADANA', data: [16, 8, 13, 0, 0, 0, 0, 0], cost: [62659139.45, 23537878.43, 3355687.54, 0, 0, 0, 0, 0] },
    { name: 'Reyhanlı', bolge: 'HATAY', data: [15, 7, 1, 0, 1, 2, 0, 0], cost: [75102476.08, 28774344.41, 159634.87, 0, 108700.30, 1199795.49, 0, 0] },
    { name: 'Silifke', bolge: 'MERSİN', data: [19, 2, 10, 1, 0, 0, 0, 0], cost: [124925691.80, 27089279.00, 3631068.15, 5489359.94, 0, 0, 0, 0] },
    { name: 'Tarsus', bolge: 'MERSİN', data: [30, 6, 3, 0, 5, 3, 0, 0], cost: [82359257.38, 37825746.96, 4099309.84, 0, 8715280.72, 2468601.60, 0, 0] },
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
    { id: 0, title: 'GİRİŞ', type: 'giris' },
    // { id: 1, title: 'SEVİYE-3 PROJE KAPSAMLARI', type: 'chart_line' },
    { id: 9, title: 'USUL VE ESASLAR DEĞİŞİKLİKLERİ', type: 'usul_esas' },
    { id: 8, title: '2025 YÜKLENİCİ GERÇEKLEŞMELERİ', type: '2025_yuklenici_gerceklesme', full: true },
    { id: 5, title: '2025 YER TESLİMLERİ', type: 'yer_teslimi', full: true },
    { id: 1, title: '2025 Yılı Seviye-3 İşleri', type: 'chart_pie' },
    { id: 4, title: 'S1-S2 ANALİZİ', type: 'chart_s1_s2' },
    { id: 7, title: 'S1-S2 DENETLEME', type: 's1_s2_denetleme', full: true },
    { id: 10, title: '2025 AFET-HAKEDİŞ VERİLERİ', type: 'afet', full: true },
    { id: 11, title: 'CBS KABUL', type: 'cbs_kabul', full: true },
    { id: 12, title: '2026 KEŞİF ÖZETİ', type: 'kesif_ozeti', full: true },
    //  { id: 3, title: 'SÖZLEŞME BİLGLERİ', type: 'chart_bar' },
    //  { id: 4, title: 'YÜKLENİCİ BİLGİLERİ', type: 'table' },

    { id: 6, title: '2026 YÜKLENİCİ BİLGİLERİ', type: 'yuklenici_bilgileri' },
    { id: 13, title: 'AĞAÇ DİREK ENVANTERİ', type: 'agac_direk', full: true },
    { id: 14, title: 'BİNA İYİLEŞTİRME', type: 'bina_iyilestirme', full: true },
    { id: 15, title: '2025 YILIAĞAÇ BUDAMA - YG KORİDOR AÇMA', type: 'agac_budama_koridor', full: true },
    { id: 16, title: '2026 YILI AĞAÇ BUDAMA - YG KORİDOR AÇMA', type: 'agac_budama_koridor_26', full: true },
    { id: 17, title: '2025 1 li KODLU HÜCRELER', type: 'ariza_hucre_bakim_25', full: true },


    { id: 101, group: 'Fotoğraflar', title: 'Bina Yenileme İşi', titleShort: 'Bina', type: 'photo_bina' },
    { id: 102, group: 'Fotoğraflar', title: 'Ağaç Budama İşi', titleShort: 'Budama', type: 'photo_budama' },
    { id: 103, group: 'Fotoğraflar', title: 'YG Koridor Açma', titleShort: 'Koridor', type: 'photo_koridor' },
    { id: 104, group: 'Fotoğraflar', title: 'Si-Coat Uygulaması', titleShort: 'Si-Coat', type: 'photo_sicoat' },
    { id: 105, group: 'Fotoğraflar', title: 'Si-Coat Uygunsuzluklar', titleShort: 'Uygunsuz', type: 'photo_uygunsuz' },

    { id: 106, group: 'Dijital Süreçler', title: 'Yüklenici Takip: Keşif Modülü', titleShort: 'Keşif', type: 'video_kesif' },
    //{ id: 107, group: 'Dijital Süreçler', title: 'Yüklenici Takip: Yer Teslimi', titleShort: 'Yer Teslimi', type: 'video_yerteslimi' },
    // { id: 108, group: 'Dijital Süreçler', title: 'Excel Makro Süreçleri', titleShort: 'Makrolar', type: 'video_makro' },





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

export const hatayYatirimData = [
    { ilce: 'ALTINÖZÜ', ilaveTR: 0, gucYukseltimi: 1, bolgeAyrimi: 0, kesitArttirimi: 0, hucreDeğisimi: 0, dikileDirek: 28, iletkenAra: 22, trafoDeğisimi: 0, panoDeğisimi: 0 },
    { ilce: 'ANTAKYA', ilaveTR: 7, gucYukseltimi: 23, bolgeAyrimi: 27, kesitArttirimi: 13, hucreDeğisimi: 7, dikileDirek: 11, iletkenAra: 152, trafoDeğisimi: 3, panoDeğisimi: 1 },
    { ilce: 'DEFNE', ilaveTR: 5, gucYukseltimi: 14, bolgeAyrimi: 8, kesitArttirimi: 18, hucreDeğisimi: 2, dikileDirek: 22, iletkenAra: 11, trafoDeğisimi: 0, panoDeğisimi: 0 },
    { ilce: 'HASSA', ilaveTR: 0, gucYukseltimi: 0, bolgeAyrimi: 2, kesitArttirimi: 0, hucreDeğisimi: 0, dikileDirek: 0, iletkenAra: 0, trafoDeğisimi: 0, panoDeğisimi: 0 },
    { ilce: 'KIRIKHAN', ilaveTR: 0, gucYukseltimi: 0, bolgeAyrimi: 3, kesitArttirimi: 0, hucreDeğisimi: 0, dikileDirek: 0, iletkenAra: 0, trafoDeğisimi: 0, panoDeğisimi: 0 },
    { ilce: 'REYHANLI', ilaveTR: 0, gucYukseltimi: 3, bolgeAyrimi: 0, kesitArttirimi: 0, hucreDeğisimi: 0, dikileDirek: 0, iletkenAra: 0, trafoDeğisimi: 0, panoDeğisimi: 0 },
    { ilce: 'SAMANDAĞ', ilaveTR: 26, gucYukseltimi: 14, bolgeAyrimi: 7, kesitArttirimi: 11, hucreDeğisimi: 0, dikileDirek: 39, iletkenAra: 44, trafoDeğisimi: 0, panoDeğisimi: 6 },
    { ilce: 'YAYLADAĞI', ilaveTR: 0, gucYukseltimi: 0, bolgeAyrimi: 0, kesitArttirimi: 0, hucreDeğisimi: 0, dikileDirek: 167, iletkenAra: 437, trafoDeğisimi: 0, panoDeğisimi: 1 },
];

export const yerTeslimiData = [
    { bolge: 'ADANA', om: 'Adana Kuzey', yuklenici: 'Kayateknik', yerTeslimSayisi: 27, tedas: 11, edas: 14, gerceklesenProje: 25, gerceklesmeTutari: 180989324.85 },
    { bolge: 'ADANA', om: 'Adana Metropol', yuklenici: 'Ayduran', yerTeslimSayisi: 69, tedas: 8, edas: 60, gerceklesenProje: 68, gerceklesmeTutari: 189355413.93 },
    { bolge: 'ADANA', om: 'Ceyhan', yuklenici: 'Erce', yerTeslimSayisi: 36, tedas: 6, edas: 6, gerceklesenProje: 12, gerceklesmeTutari: 36501546.30 },
    { bolge: 'ADANA', om: 'Düziçi', yuklenici: 'Demircan', yerTeslimSayisi: 18, tedas: 4, edas: 8, gerceklesenProje: 12, gerceklesmeTutari: 43346125.76 },
    { bolge: 'ADANA', om: 'Kadirli', yuklenici: 'Erce', yerTeslimSayisi: 27, tedas: 7, edas: 19, gerceklesenProje: 26, gerceklesmeTutari: 64244707.70 },
    { bolge: 'ADANA', om: 'Osmaniye', yuklenici: 'Demircan', yerTeslimSayisi: 47, tedas: 3, edas: 34, gerceklesenProje: 37, gerceklesmeTutari: 89552705.42 },
    { bolge: 'GAZİANTEP', om: 'Gaziantep Metropol', yuklenici: 'Armin', yerTeslimSayisi: 52, tedas: 1, edas: 50, gerceklesenProje: 51, gerceklesmeTutari: 89094652.54 },
    { bolge: 'GAZİANTEP', om: 'İslahiye', yuklenici: 'Armin', yerTeslimSayisi: 23, tedas: 1, edas: 18, gerceklesenProje: 19, gerceklesmeTutari: 24235979.20 },
    { bolge: 'GAZİANTEP', om: 'Kilis', yuklenici: 'Armin', yerTeslimSayisi: 39, tedas: 0, edas: 28, gerceklesenProje: 28, gerceklesmeTutari: 42256718.33 },
    { bolge: 'GAZİANTEP', om: 'Nizip', yuklenici: 'Armin', yerTeslimSayisi: 35, tedas: 0, edas: 20, gerceklesenProje: 20, gerceklesmeTutari: 33556177.93 },
    { bolge: 'HATAY', om: 'Dörtyol', yuklenici: 'Demircan', yerTeslimSayisi: 57, tedas: 0, edas: 36, gerceklesenProje: 36, gerceklesmeTutari: 85266519.03 },
    { bolge: 'HATAY', om: 'Hatay Kırsal', yuklenici: 'Demircan', yerTeslimSayisi: 57, tedas: 3, edas: 28, gerceklesenProje: 31, gerceklesmeTutari: 179702623.22 },
    { bolge: 'HATAY', om: 'Hatay Metropol', yuklenici: 'Demircan', yerTeslimSayisi: 161, tedas: 3, edas: 153, gerceklesenProje: 156, gerceklesmeTutari: 418590623.28 },
    { bolge: 'HATAY', om: 'İskenderun', yuklenici: 'Armin', yerTeslimSayisi: 48, tedas: 0, edas: 34, gerceklesenProje: 34, gerceklesmeTutari: 115446929.99 },
    { bolge: 'HATAY', om: 'Kırıkhan', yuklenici: 'Demircan', yerTeslimSayisi: 19, tedas: 0, edas: 16, gerceklesenProje: 16, gerceklesmeTutari: 68032755.08 },
    { bolge: 'HATAY', om: 'Reyhanlı', yuklenici: 'Demircan', yerTeslimSayisi: 35, tedas: 0, edas: 26, gerceklesenProje: 26, gerceklesmeTutari: 105344951.16 },
    { bolge: 'MERSİN', om: 'Anamur', yuklenici: 'Armin', yerTeslimSayisi: 38, tedas: 2, edas: 28, gerceklesenProje: 30, gerceklesmeTutari: 133375580.41 },
    { bolge: 'MERSİN', om: 'Erdemli', yuklenici: 'Gümüşcü', yerTeslimSayisi: 29, tedas: 4, edas: 23, gerceklesenProje: 27, gerceklesmeTutari: 80629128.63 },
    { bolge: 'MERSİN', om: 'Mersin Metropol', yuklenici: 'MLA', yerTeslimSayisi: 71, tedas: 4, edas: 63, gerceklesenProje: 67, gerceklesmeTutari: 198164214.90 },
    { bolge: 'MERSİN', om: 'Mut', yuklenici: 'Dutar', yerTeslimSayisi: 38, tedas: 3, edas: 28, gerceklesenProje: 31, gerceklesmeTutari: 95553858.46 },
    { bolge: 'MERSİN', om: 'Silifke', yuklenici: 'Gümüşcü', yerTeslimSayisi: 38, tedas: 3, edas: 29, gerceklesenProje: 32, gerceklesmeTutari: 161135398.89 },
    { bolge: 'MERSİN', om: 'Tarsus', yuklenici: 'MLA', yerTeslimSayisi: 89, tedas: 2, edas: 45, gerceklesenProje: 47, gerceklesmeTutari: 135468196.49 },
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
    { "OM": 'Adana Kuzey', "SÖZLEŞME ADI": 'Adana Kuzey Planlı Bakım Seviye - 3', "Yüklenici Firma": 'EMİ', "Sözleşme Bedeli": 171798842.18 },
    { "OM": 'Adana Metropol+Ceyhan', "SÖZLEŞME ADI": 'Adana Metropol+Ceyhan Planlı Bakım Seviye - 3', "Yüklenici Firma": 'AYDURAN', "Sözleşme Bedeli": 212799426.99 },
    { "OM": 'Anamur', "SÖZLEŞME ADI": 'Anamur Planlı Bakım Seviye - 3', "Yüklenici Firma": 'NORTON', "Sözleşme Bedeli": 181130537.43 },
    { "OM": 'Erdemli', "SÖZLEŞME ADI": 'Erdemli Planlı Bakım Seviye - 3', "Yüklenici Firma": 'KAMERİM', "Sözleşme Bedeli": 118728609.09 },
    { "OM": 'Gaziantep Metropol', "SÖZLEŞME ADI": 'Gaziantep Metropol Planlı Bakım Seviye - 3', "Yüklenici Firma": 'MLA', "Sözleşme Bedeli": 88947803.53 },
    { "OM": 'Hatay Kırsal', "SÖZLEŞME ADI": 'Hatay Kırsal Planlı Bakım Seviye - 3', "Yüklenici Firma": 'DEMİRCAN', "Sözleşme Bedeli": 150579029.63 },
    { "OM": 'Hatay Metropol', "SÖZLEŞME ADI": 'Hatay Metropol Planlı Bakım Seviye - 3', "Yüklenici Firma": 'DEMİRCAN', "Sözleşme Bedeli": 225337358.85 },
    { "OM": 'İskenderun+Dörtyol+Arsuz', "SÖZLEŞME ADI": 'İskenderun+Dörtyol+Arsuz Planlı Bakım Seviye - 3', "Yüklenici Firma": 'HASAN BULUT', "Sözleşme Bedeli": 109009025.46 },
    { "OM": 'Kadirli', "SÖZLEŞME ADI": 'Kadirli Planlı Bakım Seviye - 3', "Yüklenici Firma": 'ERSA', "Sözleşme Bedeli": 100224627.69 },
    { "OM": 'Kırıkhan+Reyhanlı', "SÖZLEŞME ADI": 'Kırıkhan+Reyhanlı Planlı Bakım Seviye - 3', "Yüklenici Firma": 'MTE', "Sözleşme Bedeli": 186173372.78 },
    { "OM": 'Kilis+Nizip+İslahiye', "SÖZLEŞME ADI": 'Kilis+Nizip+İslahiye Planlı Bakım Seviye - 3', "Yüklenici Firma": 'BİLGE', "Sözleşme Bedeli": 52145342.72 },
    { "OM": 'Mersin Metropol', "SÖZLEŞME ADI": 'Mersin Metropol Planlı Bakım Seviye - 3', "Yüklenici Firma": 'MLA', "Sözleşme Bedeli": 126073964.24 },
    { "OM": 'Mut', "SÖZLEŞME ADI": 'Mut Planlı Bakım Seviye - 3', "Yüklenici Firma": 'DUTAR', "Sözleşme Bedeli": 94005326.14 },
    { "OM": 'Osmaniye+Düziçi', "SÖZLEŞME ADI": 'Osmaniye+Düziçi Planlı Bakım Seviye - 3', "Yüklenici Firma": 'ERSA', "Sözleşme Bedeli": 101891087.45 },
    { "OM": 'Silifke', "SÖZLEŞME ADI": 'Silifke Planlı Bakım Seviye - 3', "Yüklenici Firma": 'ATAGÜC', "Sözleşme Bedeli": 174457150.53 },
    { "OM": 'Tarsus', "SÖZLEŞME ADI": 'Tarsus Planlı Bakım Seviye - 3', "Yüklenici Firma": 'MLA', "Sözleşme Bedeli": 142203915.07 },
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

//2025 yüklenici gerçekleşmeleri
export const contractData = [
    {
        bm: 'ADANA',
        sozlesmeNo: '25.0615.SSD.41',
        sozlesmeAdi: 'ADANA KUZEY PLANLI BAKIM SEVİYE-3',
        yuklenici: 'KAYATEKNİK',
        sozlesmeBedeli: 91716583.36,
        toplamHakEdis: 84743752.01,
        kalanHakEdis: 6972831.35,
        doluluk: 92.40
    },
    {
        bm: 'ADANA',
        sozlesmeNo: '25.0498.SSD.25',
        sozlesmeAdi: 'ADANA METROPOL PLANLI BAKIM SEVİYE-3',
        yuklenici: 'AYDURAN',
        sozlesmeBedeli: 101127099.48,
        toplamHakEdis: 99456040.53,
        kalanHakEdis: 1671058.95,
        doluluk: 98.35
    },
    {
        bm: 'ADANA',
        sozlesmeNo: '25.0515.SSD.30',
        sozlesmeAdi: 'KADİRLİ+CEYHAN PLANLI BAKIM SEVİYE-3',
        yuklenici: 'ERCE',
        sozlesmeBedeli: 49481860.98,
        toplamHakEdis: 48509315.15,
        kalanHakEdis: 972545.83,
        doluluk: 98.03
    },
    {
        bm: 'ADANA',
        sozlesmeNo: '25.0523.SSD.33',
        sozlesmeAdi: 'OSMANİYE+DÜZİÇİ PLANLI BAKIM SEVİYE-3',
        yuklenici: 'DEMİRCAN',
        sozlesmeBedeli: 70242195.14,
        toplamHakEdis: 65416342.17,
        kalanHakEdis: 4825852.97,
        doluluk: 93.13
    },
    {
        bm: 'GAZİANTEP',
        sozlesmeNo: '25.0528.SSD.38',
        sozlesmeAdi: 'GAZİANTEP METROPOL PLANLI BAKIM SEVİYE-3',
        yuklenici: 'ARMİN',
        sozlesmeBedeli: 45316526.52,
        toplamHakEdis: 35590753.90,
        kalanHakEdis: 9725772.62,
        doluluk: 78.54
    },
    {
        bm: 'GAZİANTEP',
        sozlesmeNo: '25.0524.SSD.34',
        sozlesmeAdi: 'KİLİS+NİZİP+İSLAHİYE PLANLI BAKIM SEVİYE-3',
        yuklenici: 'ARMİN',
        sozlesmeBedeli: 51842391.83,
        toplamHakEdis: 36717601.18,
        kalanHakEdis: 15124790.65,
        doluluk: 70.83
    },
    {
        bm: 'HATAY',
        sozlesmeNo: '25.0526.SSD.36',
        sozlesmeAdi: 'HATAY METROPOL PLANLI BAKIM SEVİYE-3',
        yuklenici: 'DEMİRCAN',
        sozlesmeBedeli: 288188400.86,
        toplamHakEdis: 233251254.12,
        kalanHakEdis: 54937146.74,
        doluluk: 80.94
    },
    {
        bm: 'HATAY',
        sozlesmeNo: '25.0527.SSD.37',
        sozlesmeAdi: 'HATAY KIRSAL PLANLI BAKIM SEVİYE-3',
        yuklenici: 'DEMİRCAN',
        sozlesmeBedeli: 151132670.74,
        toplamHakEdis: 102026547.52,
        kalanHakEdis: 49106123.22,
        doluluk: 67.51
    },
    {
        bm: 'HATAY',
        sozlesmeNo: '25.0525.SSD.35',
        sozlesmeAdi: 'İSKENDERUN+DÖRTYOL+ARSUZ PLANLI BAKIM SEVİYE-3',
        yuklenici: 'ARMİN',
        sozlesmeBedeli: 137930210.39,
        toplamHakEdis: 94136699.94,
        kalanHakEdis: 43793510.45,
        doluluk: 68.25
    },
    {
        bm: 'HATAY',
        sozlesmeNo: '25.0514.SSD.29',
        sozlesmeAdi: 'KIRIKHAN+REYHANLI PLANLI BAKIM SEVİYE-3',
        yuklenici: 'TOKİŞ',
        sozlesmeBedeli: 87564392.24,
        toplamHakEdis: 60870389.54,
        kalanHakEdis: 26694002.70,
        doluluk: 69.52
    },
    {
        bm: 'MERSİN',
        sozlesmeNo: '25.0513.SSD.28',
        sozlesmeAdi: 'MERSİN METROPOL PLANLI BAKIM SEVİYE-3',
        yuklenici: 'MLA',
        sozlesmeBedeli: 100133296.65,
        toplamHakEdis: 70409778.37,
        kalanHakEdis: 29723518.28,
        doluluk: 70.32
    },
    {
        bm: 'MERSİN',
        sozlesmeNo: '25.0497.SSD.24',
        sozlesmeAdi: 'ERDEMLİ PLANLI BAKIM SEVİYE-3',
        yuklenici: 'GÜMÜŞÇÜ',
        sozlesmeBedeli: 36321184.08,
        toplamHakEdis: 29561815.62,
        kalanHakEdis: 6759368.46,
        doluluk: 81.39
    },
    {
        bm: 'MERSİN',
        sozlesmeNo: '25.0522.SSD.32',
        sozlesmeAdi: 'TARSUS PLANLI BAKIM SEVİYE-3',
        yuklenici: 'MLA',
        sozlesmeBedeli: 94041971.06,
        toplamHakEdis: 84296175.12,
        kalanHakEdis: 9745795.94,
        doluluk: 89.64
    },
    {
        bm: 'MERSİN',
        sozlesmeNo: '25.0511.SSD.26',
        sozlesmeAdi: 'SİLİFKE PLANLI BAKIM SEVİYE-3',
        yuklenici: 'GÜMÜŞÇÜ',
        sozlesmeBedeli: 82717890.77,
        toplamHakEdis: 72514443.42,
        kalanHakEdis: 10203447.35,
        doluluk: 87.66
    },
    {
        bm: 'MERSİN',
        sozlesmeNo: '25.0529.SSD.39',
        sozlesmeAdi: 'ANAMUR PLANLI BAKIM SEVİYE-3',
        yuklenici: 'ARMİN',
        sozlesmeBedeli: 97731658.26,
        toplamHakEdis: 85210149.65,
        kalanHakEdis: 12521508.61,
        doluluk: 87.19
    },
    {
        bm: 'MERSİN',
        sozlesmeNo: '25.0512.SSD.27',
        sozlesmeAdi: 'MUT PLANLI BAKIM SEVİYE-3',
        yuklenici: 'DUTAR',
        sozlesmeBedeli: 44476726.84,
        toplamHakEdis: 33252379.22,
        kalanHakEdis: 11224347.62,
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
    { om: "GENEL TOPLAM", ort_gun_personel: 90, ort_gun_arac: 27, ort_gun_vinc: 5, ort_gun_kepce: 1, orman_yangini: 288459.35, sicaklik: 5859645.39, genel_toplam: 6148104.74 },
];

export const afetDepremData = [
    { om: "HATAY METROPOL", ort_gun_personel: 26, ort_gun_arac: 13, ort_gun_vinc: null, ort_gun_kepce: null, deprem_hakedis: 52254562.98 },
    { om: "KIRIKHAN", ort_gun_personel: 4, ort_gun_arac: 2, ort_gun_vinc: null, ort_gun_kepce: null, deprem_hakedis: 2487177.54 },
    { om: "GENEL TOPLAM", ort_gun_personel: 30, ort_gun_arac: 15, ort_gun_vinc: 0, ort_gun_kepce: 0, deprem_hakedis: 54741740.52 },
];

// ── 2026 Keşif Envanteri ──────────────────────────────────────────────────────

export const envanterS3Data = [
    { bolge: 'ADANA', om: 'Adana Metropol OM', hucreler: 99, direkler: 2355, panolar: 382, trafolar: 10 },
    { bolge: 'MERSİN', om: 'Anamur OM', hucreler: 0, direkler: 27809, panolar: 0, trafolar: 0 },
    { bolge: 'HATAY', om: 'Antakya Metropol OM', hucreler: 19, direkler: 4173, panolar: 333, trafolar: 2 },
    { bolge: 'HATAY', om: 'Arsuz OM', hucreler: 0, direkler: 67, panolar: 0, trafolar: 0 },
    { bolge: 'ADANA', om: 'Ceyhan OM', hucreler: 0, direkler: 436, panolar: 10, trafolar: 0 },
    { bolge: 'HATAY', om: 'Dörtyol OM', hucreler: 4, direkler: 932, panolar: 10, trafolar: 4 },
    { bolge: 'ADANA', om: 'Düziçi OM', hucreler: 9, direkler: 474, panolar: 7, trafolar: 0 },
    { bolge: 'MERSİN', om: 'Erdemli OM', hucreler: 8, direkler: 1227, panolar: 0, trafolar: 0 },
    { bolge: 'GAZİANTEP', om: 'Gaziantep Metropol OM', hucreler: 10, direkler: 1074, panolar: 66, trafolar: 1 },
    { bolge: 'GAZİANTEP', om: 'Islahiye OM', hucreler: 0, direkler: 302, panolar: 0, trafolar: 0 },
    { bolge: 'HATAY', om: 'İskenderun OM', hucreler: 6, direkler: 325, panolar: 4, trafolar: 2 },
    { bolge: 'ADANA', om: 'Kadirli OM', hucreler: 5, direkler: 15784, panolar: 11, trafolar: 0 },
    { bolge: 'HATAY', om: 'Kırıkhan OM', hucreler: 0, direkler: 32590, panolar: 0, trafolar: 0 },
    { bolge: 'GAZİANTEP', om: 'Kilis OM', hucreler: 18, direkler: 71, panolar: 0, trafolar: 0 },
    { bolge: 'ADANA', om: 'Kozan OM', hucreler: 0, direkler: 2237, panolar: 11, trafolar: 0 },
    { bolge: 'MERSİN', om: 'Mersin Metropol OM', hucreler: 0, direkler: 1096, panolar: 22, trafolar: 0 },
    { bolge: 'MERSİN', om: 'Mut OM', hucreler: 0, direkler: 3854, panolar: 0, trafolar: 0 },
    { bolge: 'GAZİANTEP', om: 'Nizip OM', hucreler: 0, direkler: 327, panolar: 0, trafolar: 0 },
    { bolge: 'ADANA', om: 'Osmaniye OM', hucreler: 4, direkler: 1084, panolar: 6, trafolar: 0 },
    { bolge: 'HATAY', om: 'Reyhanlı OM', hucreler: 20, direkler: 12518, panolar: 15, trafolar: 2 },
    { bolge: 'MERSİN', om: 'Silifke OM', hucreler: 0, direkler: 2247, panolar: 0, trafolar: 6 },
    { bolge: 'MERSİN', om: 'Tarsus OM', hucreler: 0, direkler: 1496, panolar: 33, trafolar: 6 },
];


//2025 seviye-3 projelerinin edas tedas kırılımlı hali
export const raporlamaData = [
    { bolge: 'ADANA', om: 'Adana Kuzey', tedasSayisi: 11, tedasTutar: 118350129.70, edasSayisi: 14, edasTutar: 62639195.15 },
    { bolge: 'ADANA', om: 'Adana Metropol', tedasSayisi: 8, tedasTutar: 67101711.97, edasSayisi: 60, edasTutar: 122253701.96 },
    { bolge: 'ADANA', om: 'Ceyhan', tedasSayisi: 6, tedasTutar: 26322541.85, edasSayisi: 6, edasTutar: 10179004.45 },
    { bolge: 'ADANA', om: 'Düziçi', tedasSayisi: 4, tedasTutar: 31539216.22, edasSayisi: 8, edasTutar: 11806909.54 },
    { bolge: 'ADANA', om: 'Kadirli', tedasSayisi: 7, tedasTutar: 33809141.63, edasSayisi: 19, edasTutar: 30435566.07 },
    { bolge: 'ADANA', om: 'Osmaniye', tedasSayisi: 3, tedasTutar: 19795198.61, edasSayisi: 34, edasTutar: 69757506.81 },
    { bolge: 'GAZİANTEP', om: 'Gaziantep Metropol', tedasSayisi: 1, tedasTutar: 14381107.38, edasSayisi: 50, edasTutar: 74713545.17 },
    { bolge: 'GAZİANTEP', om: 'İslahiye', tedasSayisi: 1, tedasTutar: 2434062.90, edasSayisi: 18, edasTutar: 21801916.30 },
    { bolge: 'GAZİANTEP', om: 'Kilis', tedasSayisi: 0, tedasTutar: 0, edasSayisi: 28, edasTutar: 42256718.33 },
    { bolge: 'GAZİANTEP', om: 'Nizip', tedasSayisi: 0, tedasTutar: 0, edasSayisi: 20, edasTutar: 33556177.93 },
    { bolge: 'HATAY', om: 'Dörtyol', tedasSayisi: 0, tedasTutar: 0, edasSayisi: 36, edasTutar: 85266519.03 },
    { bolge: 'HATAY', om: 'Hatay Kırsal', tedasSayisi: 3, tedasTutar: 35841809.34, edasSayisi: 28, edasTutar: 143860813.88 },
    { bolge: 'HATAY', om: 'Hatay Metropol', tedasSayisi: 3, tedasTutar: 7614358.73, edasSayisi: 153, edasTutar: 410976264.55 },
    { bolge: 'HATAY', om: 'İskenderun', tedasSayisi: 0, tedasTutar: 0, edasSayisi: 34, edasTutar: 115446929.99 },
    { bolge: 'HATAY', om: 'Kırıkhan', tedasSayisi: 0, tedasTutar: 0, edasSayisi: 16, edasTutar: 68032755.08 },
    { bolge: 'HATAY', om: 'Reyhanlı', tedasSayisi: 0, tedasTutar: 0, edasSayisi: 26, edasTutar: 105344951.16 },
    { bolge: 'MERSİN', om: 'Anamur', tedasSayisi: 2, tedasTutar: 47961218.23, edasSayisi: 28, edasTutar: 85414362.18 },
    { bolge: 'MERSİN', om: 'Erdemli', tedasSayisi: 4, tedasTutar: 25491746.59, edasSayisi: 23, edasTutar: 55137382.03 },
    { bolge: 'MERSİN', om: 'Mersin Metropol', tedasSayisi: 4, tedasTutar: 54281864.95, edasSayisi: 63, edasTutar: 143882349.95 },
    { bolge: 'MERSİN', om: 'Mut', tedasSayisi: 3, tedasTutar: 31501637.62, edasSayisi: 28, edasTutar: 64052220.84 },
    { bolge: 'MERSİN', om: 'Silifke', tedasSayisi: 3, tedasTutar: 61672809.21, edasSayisi: 29, edasTutar: 99462589.68 },
    { bolge: 'MERSİN', om: 'Tarsus', tedasSayisi: 2, tedasTutar: 26847488.05, edasSayisi: 45, edasTutar: 108620708.44 },
];

export const agacDirekOmData = [
    { bm: 'ADANA', om: 'Adana OM', agacDirekSayisi: 16 },
    { bm: 'MERSİN', om: 'Anamur OM', agacDirekSayisi: 96 },
    { bm: 'HATAY', om: 'Dörtyol OM', agacDirekSayisi: 6 },
    { bm: 'OSMANİYE', om: 'Düziçi OM', agacDirekSayisi: 1 },
    { bm: 'MERSİN', om: 'Erdemli OM', agacDirekSayisi: 5 },
    { bm: 'GAZİANTEP', om: 'Gaziantep OM', agacDirekSayisi: 27 },
    { bm: 'HATAY', om: 'Hatay OM', agacDirekSayisi: 14 },
    { bm: 'GAZİANTEP', om: 'Islahiye OM', agacDirekSayisi: 2 },
    { bm: 'HATAY', om: 'İskenderun OM', agacDirekSayisi: 46 },
    { bm: 'ADANA', om: 'Kadirli OM', agacDirekSayisi: 10 },
    { bm: 'ADANA', om: 'Kozan OM', agacDirekSayisi: 43 },
    { bm: 'MERSİN', om: 'Mersin OM', agacDirekSayisi: 5 },
    { bm: 'MERSİN', om: 'Mut OM', agacDirekSayisi: 1 },
    { bm: 'OSMANİYE', om: 'Osmaniye OM', agacDirekSayisi: 15 },
    { bm: 'MERSİN', om: 'Silifke OM', agacDirekSayisi: 32 },
    { bm: 'MERSİN', om: 'Tarsus OM', agacDirekSayisi: 28 },
];

export const kesifButceBinaData26 = [
    { om: 'ADANA KUZEY', butce: 3526571.10 },
    { om: 'ADANA METROPOL', butce: 17270189.76 },
    { om: 'ANAMUR', butce: 673809.56 },
    { om: 'CEYHAN', butce: 2590195.01 },
    { om: 'DÖRTYOL', butce: 1035314.60 },
    { om: 'DÜZİÇİ', butce: 484984.48 },
    { om: 'ERDEMLİ', butce: 5954743.13 },
    { om: 'GAZİANTEP METROPOL', butce: 23622135.76 },
    { om: 'HATAY METROPOL', butce: 5524884.62 },
    { om: 'İSKENDERUN', butce: 5687688.33 },
    { om: 'İSLAHİYE', butce: 1671328.89 },
    { om: 'KADİRLİ', butce: 1297059.24 },
    { om: 'KIRIKHAN', butce: 728084.92 },
    { om: 'KİLİS', butce: 1779028.97 },
    { om: 'MERSİN METROPOL', butce: 22920555.04 },
    { om: 'MUT', butce: 522085.23 },
    { om: 'NİZİP', butce: 1125759.94 },
    { om: 'OSMANİYE', butce: 1844798.27 },
    { om: 'REYHANLI', butce: 1750662.92 },
    { om: 'SİLİFKE', butce: 4406567.41 },
    { om: 'TARSUS', butce: 7583364.96 },
];

export const binaIsiData25 = [
    { om: 'Adana Metropol', hakedis: 1241219.61, binaAdedi: 6 },
    { om: 'Ceyhan', hakedis: 1413862.26, binaAdedi: 15 },
    { om: 'Dörtyol', hakedis: 108021.21, binaAdedi: 1 },
    { om: 'Erdemli', hakedis: 3012074.15, binaAdedi: 21 },
    { om: 'Mersin Metropol', hakedis: 3274297.69, binaAdedi: 32 },
    { om: 'Mut', hakedis: 2000548.92, binaAdedi: 10 },
    { om: 'Silifke', hakedis: 3787354.55, binaAdedi: 22 },
    { om: 'Tarsus', hakedis: 257474.69, binaAdedi: 2 },
];

export const kabulRetData = [
    { bm: 'HATAY', om: 'Kırıkhan OM', ret: 32, kabul: 17 },
    { bm: 'HATAY', om: 'Hatay Metropol', ret: 157, kabul: 145 },
    { bm: 'HATAY', om: 'Reyhanlı', ret: 31, kabul: 30 },
    { bm: 'HATAY', om: 'Dörtyol', ret: 39, kabul: 41 },
    { bm: 'HATAY', om: 'İskenderun', ret: 31, kabul: 36 },
    { bm: 'ADANA', om: 'Adana Kuzey', ret: 34, kabul: 43 },
    { bm: 'ADANA', om: 'Kadirli', ret: 23, kabul: 36 },
    { bm: 'GAZİANTEP', om: 'Islahiye', ret: 11, kabul: 18 },
    { bm: 'ADANA', om: 'Düziçi', ret: 8, kabul: 15 },
    { bm: 'ADANA', om: 'Ceyhan', ret: 12, kabul: 23 },
    { bm: 'MERSİN', om: 'Mersin Metropol', ret: 32, kabul: 66 },
    { bm: 'MERSİN', om: 'Erdemli', ret: 15, kabul: 36 },
    { bm: 'HATAY', om: 'Arsuz', ret: 2, kabul: 5 },
    { bm: 'ADANA', om: 'Adana Metropol', ret: 29, kabul: 73 },
    { bm: 'MERSİN', om: 'Mut', ret: 15, kabul: 38 },
    { bm: 'GAZİANTEP', om: 'Nizip', ret: 7, kabul: 18 },
    { bm: 'MERSİN', om: 'Silifke', ret: 17, kabul: 46 },
    { bm: 'MERSİN', om: 'Tarsus', ret: 15, kabul: 41 },
    { bm: 'GAZİANTEP', om: 'Gaziantep Metropol', ret: 18, kabul: 57 },
    { bm: 'ADANA', om: 'Osmaniye', ret: 12, kabul: 42 },
    { bm: 'GAZİANTEP', om: 'Kilis', ret: 6, kabul: 28 },
    { bm: 'MERSİN', om: 'Anamur', ret: 2, kabul: 32 },
];

export const ygKoridorData25 = [
    { bm: 'ADANA', om: 'Adana Metropol', toplamKm: 74.11 },
    { bm: 'ADANA', om: 'Kadirli', toplamKm: 120.67 },
    { bm: 'ADANA', om: 'Adana Kuzey', toplamKm: 129.56 },
    { bm: 'ADANA', om: 'Düziçi', toplamKm: 21.22 },
    { bm: 'HATAY', om: 'Hatay Metropol', toplamKm: 31.33 },
    { bm: 'HATAY', om: 'Dörtyol', toplamKm: 40.00 },
    { bm: 'HATAY', om: 'Kırıkhan', toplamKm: 23.22 },
    { bm: 'MERSİN', om: 'Mersin Metropol', toplamKm: 54.56 },
    { bm: 'MERSİN', om: 'Erdemli', toplamKm: 27.44 },
    { bm: 'MERSİN', om: 'Anamur', toplamKm: 41.00 },
    { bm: 'MERSİN', om: 'Silifke', toplamKm: 134.33 },
    { bm: 'MERSİN', om: 'Tarsus', toplamKm: 91.89 },
];

export const agacbudama25 = [
    { bm: 'ADANA', om: 'Adana Metropol', toplamKm: 271.72 },
    { bm: 'ADANA', om: 'Ceyhan', toplamKm: 284.73 },
    { bm: 'ADANA', om: 'Kadirli', toplamKm: 402.48 },
    { bm: 'ADANA', om: 'Adana Kuzey', toplamKm: 567.62 },
    { bm: 'ADANA', om: 'Osmaniye', toplamKm: 305.11 },
    { bm: 'ADANA', om: 'Düziçi', toplamKm: 300.85 },
    { bm: 'HATAY', om: 'Hatay Metropol', toplamKm: 101.29 },
    { bm: 'HATAY', om: 'Dörtyol', toplamKm: 216.00 },
    { bm: 'HATAY', om: 'İskenderun', toplamKm: 299.82 },
    { bm: 'HATAY', om: 'Arsuz', toplamKm: 103.79 },
    { bm: 'HATAY', om: 'Kırıkhan', toplamKm: 124.29 },
    { bm: 'HATAY', om: 'Reyhanlı', toplamKm: 5.25 },
    { bm: 'MERSİN', om: 'Mersin Metropol', toplamKm: 316.79 },
    { bm: 'MERSİN', om: 'Erdemli', toplamKm: 36.00 },
    { bm: 'MERSİN', om: 'Anamur', toplamKm: 194.14 },
    { bm: 'MERSİN', om: 'Silifke', toplamKm: 308.17 },
    { bm: 'MERSİN', om: 'Tarsus', toplamKm: 335.71 },
    { bm: 'GAZİANTEP', om: 'Kilis', toplamKm: 8.90 },
];

export const agacBudama26Kesif = [
    { bm: 'ADANA', om: 'Adana Kuzey', toplamKm: 527.80 },
    { bm: 'ADANA', om: 'Adana Metropol', toplamKm: 531.70 },
    { bm: 'ADANA', om: 'Ceyhan', toplamKm: 125.35 },
    { bm: 'ADANA', om: 'Düziçi', toplamKm: 135.10 },
    { bm: 'ADANA', om: 'Kadirli', toplamKm: 307.40 },
    { bm: 'ADANA', om: 'Osmaniye', toplamKm: 90.35 },
    { bm: 'GAZİANTEP', om: 'Gaziantep Metropol', toplamKm: 48.70 },
    { bm: 'GAZİANTEP', om: 'İslahiye', toplamKm: 15.40 },
    { bm: 'GAZİANTEP', om: 'Kilis', toplamKm: 1.70 },
    { bm: 'HATAY', om: 'Arsuz', toplamKm: 103.75 },
    { bm: 'HATAY', om: 'Dörtyol', toplamKm: 411.35 },
    { bm: 'HATAY', om: 'Hatay Metropol', toplamKm: 76.55 },
    { bm: 'HATAY', om: 'İskenderun', toplamKm: 154.55 },
    { bm: 'HATAY', om: 'Kırıkhan', toplamKm: 83.15 },
    { bm: 'HATAY', om: 'Reyhanlı', toplamKm: 7.35 },
    { bm: 'MERSİN', om: 'Anamur', toplamKm: 183.00 },
    { bm: 'MERSİN', om: 'Erdemli', toplamKm: 43.65 },
    { bm: 'MERSİN', om: 'Mersin Metropol', toplamKm: 26.60 },
    { bm: 'MERSİN', om: 'Mut', toplamKm: 50.40 },
    { bm: 'MERSİN', om: 'Silifke', toplamKm: 214.20 },
    { bm: 'MERSİN', om: 'Tarsus', toplamKm: 175.15 },
];

export const ygKoridorAcma26 = [
    { bm: 'ADANA', om: 'Adana Kuzey', toplamKm: 71.72 },
    { bm: 'ADANA', om: 'Adana Metropol', toplamKm: 160.16 },
    { bm: 'ADANA', om: 'Osmaniye', toplamKm: 3.08 },
    { bm: 'GAZİANTEP', om: 'Gaziantep Metropol', toplamKm: 20.46 },
    { bm: 'GAZİANTEP', om: 'Kilis', toplamKm: 1.76 },
    { bm: 'HATAY', om: 'Arsuz', toplamKm: 11.55 },
    { bm: 'HATAY', om: 'Hatay Metropol', toplamKm: 95.92 },
    { bm: 'HATAY', om: 'İskenderun', toplamKm: 24.75 },
    { bm: 'HATAY', om: 'Kırıkhan', toplamKm: 7.15 },
    { bm: 'HATAY', om: 'Reyhanlı', toplamKm: 10.89 },
    { bm: 'MERSİN', om: 'Erdemli', toplamKm: 2.86 },
    { bm: 'MERSİN', om: 'Mersin Metropol', toplamKm: 1.98 },
    { bm: 'MERSİN', om: 'Silifke', toplamKm: 7.81 },
    { bm: 'MERSİN', om: 'Tarsus', toplamKm: 168.96 },
];

export const arizaHucreBakim25 = [
    { bolge: 'ADANA', om: 'Adana Kuzey', toplam: 9 },
    { bolge: 'ADANA', om: 'Adana Metropol', toplam: 25 },
    { bolge: 'ADANA', om: 'Ceyhan', toplam: 10 },
    { bolge: 'ADANA', om: 'Kadirli', toplam: 5 },
    { bolge: 'ADANA', om: 'Düziçi', toplam: 0 },
    { bolge: 'ADANA', om: 'Osmaniye', toplam: 11 },
    { bolge: 'GAZİANTEP', om: 'Gaziantep Metropol', toplam: 14 },
    { bolge: 'GAZİANTEP', om: 'İslahiye', toplam: 5 },
    { bolge: 'GAZİANTEP', om: 'Nizip', toplam: 1 },
    { bolge: 'GAZİANTEP', om: 'Kilis', toplam: 0 },
    { bolge: 'HATAY', om: 'Arsuz', toplam: 6 },
    { bolge: 'HATAY', om: 'Dörtyol', toplam: 6 },
    { bolge: 'HATAY', om: 'Hatay Metropol', toplam: 66 },
    { bolge: 'HATAY', om: 'İskenderun', toplam: 29 },
    { bolge: 'HATAY', om: 'Kırıkhan', toplam: 5 },
    { bolge: 'HATAY', om: 'Reyhanlı', toplam: 7 },
    { bolge: 'MERSİN', om: 'Erdemli', toplam: 0 },
    { bolge: 'MERSİN', om: 'Mersin Metropol', toplam: 9 },
    { bolge: 'MERSİN', om: 'Mut', toplam: 0 },
    { bolge: 'MERSİN', om: 'Silifke', toplam: 0 },
    { bolge: 'MERSİN', om: 'Anamur', toplam: 1 },
    { bolge: 'MERSİN', om: 'Tarsus', toplam: 0 },
];
