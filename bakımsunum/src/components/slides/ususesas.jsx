import { useState, useRef, useEffect } from 'react';
import {
    BookOpen, Lightbulb, ChevronRight, Tag, ArrowRight,
    Sparkles, Shield, Cpu, Layers, TrendingUp, Clock,
    DollarSign, Maximize, Minimize
} from 'lucide-react';

// ─── Veri ───────────────────────────────────────────────────────────────────
const CARDS = [
    {
        id: 1,
        no: '01',
        madde: 'Madde 1 & 2',
        baslik: 'Sürekli Geçerlilik',
        altBaslik: 'Amaç ve Kapsam',
        kategori: 'Yapısal',
        icon: Layers,
        renk: '#6366f1',
        ozet: 'Usul ve Esaslar belirli bir tarife dönemine bağlı olmaktan çıkarıldı; artık her dönemde otomatik geçerli.',
        anaFark: '2021–2025 tarih aralığı kaldırıldı → Kalıcı düzenleme',
        puan: [
            '"Tarife uygulama dönemi içerisinde" ifadesiyle genelleştirildi',
            'Her dönem için ayrı düzenleme yapılmasına gerek kalmadı',
            'Uygulama sürekliliği ve öngörülebilirlik artırıldı',
        ],
        detay: "Önceki düzenlemede '2021-2025 yıllarını kapsayan tarife uygulama dönemi' ifadesi yer alıyordu. Yeni düzenlemede bu tarih aralığı kaldırılarak metin genelleştirildi.",
    },
    {
        id: 2,
        no: '02',
        madde: 'Madde 5',
        baslik: 'İHA Entegrasyonu',
        altBaslik: '1. Seviye Planlı Bakım',
        kategori: 'Teknoloji',
        icon: Cpu,
        renk: '#10b981',
        ozet: "Drone'lar resmi olarak bakım sürecine girdi. Tüm işlemler GPS koordinatı ve zaman damgasıyla kayıt altına alınıyor.",
        anaFark: 'Termal kamera + İHA → Dijital kayıt zorunluluğu',
        puan: [
            "Madde başlığı 'Gözlem'den 'Gözlem ve Temel Bakım'a güncellendi",
            'İHA (drone) kullanımı resmi olarak tanındı',
            'Koordinat ve zaman kaydı zorunlu hale getirildi',
        ],
        detay: "İHA kullanımının yaygınlaşmasıyla birlikte bu araçların resmi olarak tanınması sağlandı. Koordinat ve zaman kaydı yükümlülüğü gizlilik ve kişisel veri şikayetlerine karşı denetim güvencesi sağlamak amacıyla getirildi.",
    },
    {
        id: 3,
        no: '03',
        madde: 'Madde 6',
        baslik: 'Genişletilmiş Kapsam',
        altBaslik: '2. Seviye Planlı Bakım',
        kategori: 'Kapsam',
        icon: TrendingUp,
        renk: '#f59e0b',
        ozet: 'Münferit Bakım kapsamına kablo testleri, budama ve anahtarlama teçhizatı eklendi. Demirbaş/iş güvenliği ekipmanı harcamaları da raporlanabilir.',
        anaFark: 'Anahtarlama teçhizatı + Demirbaş ekipman → Kapsama alındı',
        puan: [
            'Kesici, ayırıcı, OTK gibi anahtarlama teçhizatı işleri eklendi',
            'Faydalı ömrü 1 yılı aşan demirbaşlar raporlanabilir hale geldi',
            'İş güvenliği ekipman harcamaları kapsama girdi',
        ],
        detay: "Yeni eklenen 'çç' bendi ile münferit anahtarlama teçhizatı işleri kapsama alındı. Yeni 2. fıkra ile faydalı ömrü 1 yılı aşan demirbaş teçhizat harcamaları bu seviye altında raporlanabilecek.",
    },
    {
        id: 4,
        no: '04',
        madde: 'Madde 7',
        baslik: 'Orman & Hat Güzergahı',
        altBaslik: '3. Seviye Planlı Bakım',
        kategori: 'Güvenlik',
        icon: Shield,
        renk: '#ef4444',
        ozet: 'Orman yangını riski olan alanlardaki ağaç kesim/budama işleri 3. seviye kapsamına alındı. Özelleştirme öncesi tesisler için hat güzergahı değişiklikleri yatırım gideri sayılabilir.',
        anaFark: 'Yangın önleme budama → 3. Seviyeye alındı',
        puan: [
            "Yeni 'm' bendi: orman/tarım alanı ağaç kesim/budama işleri",
            'Koridor açma işleri 3. seviye kapsamına girdi',
            'Hat güzergahı değişikliği → yatırım harcaması olarak raporlanabilir',
        ],
        detay: "Yeni 'm' bendi ile orman ve tarımsal alanlardaki yangın önleme kapsamındaki ağaç kesim/budama ve koridor açma işleri 3. seviyeye dahil edildi. Özelleştirme öncesi kurulan tesisler için hat güzergahı değişiklikleri yatırım harcaması olarak raporlanabilecek.",
    },
    {
        id: 5,
        no: '05',
        madde: 'Madde 8',
        baslik: 'Sıkılaştırılmış Periyot',
        altBaslik: 'Genel Esaslar',
        kategori: 'Periyot',
        icon: Clock,
        renk: '#8b5cf6',
        ozet: "Ormanlık alanlardaki hatlar için 1. ve 2. seviye bakım artık yıllık zorunlu. Güvenlik tanımına 'mal güvenliği' de eklendi.",
        anaFark: '2–5 yılda bir → Her yıl zorunlu bakım (ormanlık alanlar)',
        puan: [
            '1. seviye bakım: ormanlık alanlarda yıllık zorunlu (eskiden 2 yılda 1)',
            '2. seviye bakım: ormanlık alanlarda yıllık zorunlu (eskiden 5 yılda 1)',
            'Önleyici bakım harcamaları planlı bakım gideri sayılabilir',
            'Yasal giderlere yol geçiş + kontrollük hizmeti bedeli eklendi',
        ],
        detay: "Orman yangınlarının yarattığı yıkıcı etkiler göz önünde bulundurularak ormanlık alanlardaki hatlar için bakım periyodu sıkılaştırıldı. Yeni 9. fıkra ile arıza riski taşıyan teçhizatlar için önleyici bakım harcamaları raporlanabilir hale geldi.",
    },
    {
        id: 6,
        no: '06',
        madde: 'Madde 9',
        baslik: 'Bütçe & Tarife',
        altBaslik: 'Tarife Hesaplamaları',
        kategori: 'Mali',
        icon: DollarSign,
        renk: '#ec4899',
        ozet: "Bütçenin %75'i 3. seviyeye zorunlu. Tarife tavanı %105 → %110. Dönem içi revizyon hakkı getirildi. TEDAŞ kitabı dışı kalem yasağı netleşti.",
        anaFark: 'Tavan %105 → %110 | %75 alt sınır zorunlu',
        puan: [
            "Toplam bütçenin en az %75'i 3. seviye bakıma ayrılacak",
            "Tarife üst sınırı %105'ten %110'a yükseltildi",
            'Dönem içi Kurul onayıyla bütçe revizyonu mümkün',
            'TEDAŞ kitabında olmayan kalemler 3. seviyede yapılamaz',
        ],
        detay: "Yeni 4. fıkra ile %75 alt sınırı belirlendi. Üst sınır %110'a yükseltilerek esneklik artırıldı. Yeni 8. fıkra ile uygulama dönemi içinde Kurul onayıyla bütçe revizyonu yapılabilmesi mümkün hale geldi.",
    },
];

const KATEGORILER = ['Tümü', 'Yapısal', 'Teknoloji', 'Kapsam', 'Güvenlik', 'Periyot', 'Mali'];

// ─── Puan Satırı ─────────────────────────────────────────────────────────────
function PuanItem({ text, renk, fs }) {
    return (
        <li className="flex items-start gap-2 leading-snug" style={{ color: 'oklch(var(--bc)/0.65)', fontSize: fs ? 14 : 12 }}>
            <ArrowRight size={fs ? 13 : 11} className="flex-shrink-0 mt-0.5" style={{ color: renk }} />
            <span>{text}</span>
        </li>
    );
}

// ─── Ana Component ───────────────────────────────────────────────────────────
export default function PlanliBakimDegisiklikler() {
    const containerRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [aktifKat, setAktifKat] = useState('Tümü');
    const [acilanId, setAcilanId] = useState(null);

    const fs = isFullscreen; // kısa alias

    // ── Fullscreen API ────────────────────────────────────────────────────────
    useEffect(() => {
        const onChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', onChange);
        return () => document.removeEventListener('fullscreenchange', onChange);
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) containerRef.current?.requestFullscreen();
        else document.exitFullscreen();
    };

    const goruntu = aktifKat === 'Tümü'
        ? CARDS
        : CARDS.filter(c => c.kategori === aktifKat);

    return (
        <div
            ref={containerRef}
            className={`flex flex-col w-full gap-4 transition-all duration-300
                ${fs ? 'fixed inset-0 z-50 bg-base-100 overflow-y-auto p-8' : 'h-full overflow-y-auto'}`}
        >

            {/* ── Üst başlık ── */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <BookOpen className="text-primary" size={fs ? 26 : 20} />
                        <h2
                            className="font-extrabold text-base-content"
                            style={{ fontSize: fs ? 26 : 20 }}
                        >
                            Planlı Bakım Usul & Esasları
                        </h2>
                        <span className={`badge badge-primary font-bold ${fs ? 'badge-md' : 'badge-sm'}`}>
                            Yeni Düzenleme
                        </span>
                    </div>
                    <p
                        className="text-base-content/50 leading-relaxed max-w-xl"
                        style={{ fontSize: fs ? 14 : 12 }}
                    >
                        Elektrik dağıtım şirketlerine ilişkin planlı bakım mevzuatında yapılan
                        <strong className="text-base-content/70"> 6 temel değişiklik</strong> — kart başına bir konu, hızlı öğren.
                    </p>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                    {/* İstatistik kartçıkları */}
                    {[
                        { label: 'Değişiklik', val: 6, color: '#6366f1' },
                        { label: 'Seviye', val: '1→3', color: '#10b981' },
                        { label: 'Yeni Tavan', val: '%110', color: '#ec4899' },
                    ].map(s => (
                        <div
                            key={s.label}
                            className="rounded-xl border border-base-200 bg-base-100 text-center shadow-sm"
                            style={{ borderTopColor: s.color, borderTopWidth: 3, padding: fs ? '10px 18px' : '6px 14px' }}
                        >
                            <div
                                className="font-extrabold"
                                style={{ color: s.color, fontSize: fs ? 22 : 16 }}
                            >{s.val}</div>
                            <div
                                className="text-base-content/40 uppercase tracking-widest font-bold"
                                style={{ fontSize: fs ? 11 : 9 }}
                            >{s.label}</div>
                        </div>
                    ))}

                    {/* Tam Ekran butonu */}
                    <button
                        className={`btn ${fs ? 'btn-sm' : 'btn-xs'} btn-outline bg-base-100 shadow-sm`}
                        onClick={toggleFullscreen}
                        title={fs ? 'Küçült' : 'Tam Ekran'}
                    >
                        {fs ? <Minimize size={fs ? 16 : 14} /> : <Maximize size={14} />}
                        <span className="hidden sm:inline ml-1">{fs ? 'Küçült' : 'Tam Ekran'}</span>
                    </button>
                </div>
            </div>

            {/* ── Filtre butonları ── */}
            <div className="flex flex-wrap gap-2">
                {KATEGORILER.map(k => (
                    <button
                        key={k}
                        onClick={() => setAktifKat(k)}
                        className={`btn rounded-full transition-all ${fs ? 'btn-sm' : 'btn-xs'} ${aktifKat === k
                                ? 'btn-primary shadow-sm font-bold'
                                : 'btn-ghost border border-base-300 opacity-60 hover:opacity-100'
                            }`}
                    >
                        {k}
                    </button>
                ))}
                <span
                    className="ml-auto text-base-content/30 self-center"
                    style={{ fontSize: fs ? 13 : 11 }}
                >
                    {goruntu.length} / {CARDS.length} madde
                </span>
            </div>

            {/* ── Kart Grid ── */}
            <div className={`grid gap-4 flex-1 ${fs
                    ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                    : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                }`}>
                {goruntu.map(card => {
                    const Icon = card.icon;
                    const acik = acilanId === card.id;

                    return (
                        <div
                            key={card.id}
                            className="rounded-2xl border border-base-200 bg-base-100 shadow-sm flex flex-col overflow-hidden transition-all duration-300"
                            style={{
                                boxShadow: acik
                                    ? `0 4px 24px ${card.renk}33, 0 0 0 1.5px ${card.renk}55`
                                    : undefined,
                            }}
                        >
                            {/* ── Renk Bandı ── */}
                            <div
                                className="flex items-center justify-between"
                                style={{
                                    padding: fs ? '14px 20px' : '10px 16px',
                                    background: `linear-gradient(135deg, ${card.renk}22, ${card.renk}08)`,
                                    borderBottom: `1px solid ${card.renk}25`,
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <span
                                        className="font-black leading-none opacity-20 select-none"
                                        style={{ color: card.renk, fontSize: fs ? 42 : 30, fontVariantNumeric: 'tabular-nums' }}
                                    >
                                        {card.no}
                                    </span>
                                    <div>
                                        <p
                                            className="font-bold uppercase tracking-widest opacity-70 leading-none mb-1"
                                            style={{ color: card.renk, fontSize: fs ? 12 : 10 }}
                                        >
                                            {card.madde}
                                        </p>
                                        <p
                                            className="text-base-content/50 leading-none"
                                            style={{ fontSize: fs ? 13 : 11 }}
                                        >{card.altBaslik}</p>
                                    </div>
                                </div>

                                {/* İkon çemberi */}
                                <div
                                    className="rounded-full flex items-center justify-center flex-shrink-0"
                                    style={{
                                        width: fs ? 46 : 36,
                                        height: fs ? 46 : 36,
                                        background: `${card.renk}20`,
                                        color: card.renk,
                                    }}
                                >
                                    <Icon size={fs ? 22 : 17} />
                                </div>
                            </div>

                            {/* ── Kart İçerik ── */}
                            <div
                                className="flex flex-col gap-3 flex-1"
                                style={{ padding: fs ? '20px 22px' : '14px 16px' }}
                            >
                                {/* Başlık + Badge */}
                                <div className="flex items-start justify-between gap-2">
                                    <h3
                                        className="font-extrabold text-base-content leading-tight"
                                        style={{ fontSize: fs ? 18 : 14 }}
                                    >
                                        {card.baslik}
                                    </h3>
                                    <span
                                        className="flex-shrink-0 inline-flex items-center gap-1 font-bold rounded-full"
                                        style={{
                                            background: `${card.renk}18`,
                                            color: card.renk,
                                            fontSize: fs ? 11 : 9,
                                            padding: fs ? '3px 10px' : '2px 7px',
                                        }}
                                    >
                                        <Tag size={fs ? 10 : 8} />
                                        {card.kategori}
                                    </span>
                                </div>

                                {/* Özet */}
                                <p
                                    className="text-base-content/60 leading-relaxed"
                                    style={{ fontSize: fs ? 14 : 12 }}
                                >
                                    {card.ozet}
                                </p>

                                {/* Ana değişiklik pill */}
                                <div
                                    className="rounded-xl flex items-start gap-2"
                                    style={{
                                        background: `${card.renk}12`,
                                        borderLeft: `3px solid ${card.renk}`,
                                        padding: fs ? '10px 14px' : '8px 12px',
                                    }}
                                >
                                    <Lightbulb size={fs ? 15 : 13} className="flex-shrink-0 mt-0.5" style={{ color: card.renk }} />
                                    <p
                                        className="font-semibold leading-snug"
                                        style={{ color: card.renk, fontSize: fs ? 14 : 12 }}
                                    >
                                        {card.anaFark}
                                    </p>
                                </div>

                                {/* Puan listesi */}
                                <ul className="flex flex-col gap-2">
                                    {card.puan.map((p, i) => (
                                        <PuanItem key={i} text={p} renk={card.renk} fs={fs} />
                                    ))}
                                </ul>

                                {/* Detay toggle */}
                                <div
                                    className="mt-auto border-t border-base-200"
                                    style={{ paddingTop: fs ? 12 : 8 }}
                                >
                                    <button
                                        className="flex items-center gap-1.5 font-bold transition-opacity hover:opacity-75"
                                        style={{ color: card.renk, fontSize: fs ? 13 : 11 }}
                                        onClick={() => setAcilanId(acik ? null : card.id)}
                                    >
                                        <Sparkles size={fs ? 13 : 11} />
                                        {acik ? 'Gizle' : 'Tam Açıklama'}
                                        <ChevronRight
                                            size={fs ? 15 : 13}
                                            className="transition-transform duration-200"
                                            style={{ transform: acik ? 'rotate(90deg)' : 'rotate(0deg)' }}
                                        />
                                    </button>

                                    {acik && (
                                        <div
                                            className="rounded-xl text-base-content/60 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200"
                                            style={{
                                                marginTop: fs ? 12 : 8,
                                                padding: fs ? '14px 16px' : '10px 12px',
                                                fontSize: fs ? 13 : 11,
                                                background: `${card.renk}0a`,
                                                border: `1px dashed ${card.renk}44`,
                                            }}
                                        >
                                            {card.detay}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* ── Kaynak notu ── */}
            <div
                className="rounded-xl border border-base-300 bg-base-200/40 leading-relaxed text-base-content/35"
                style={{ padding: fs ? '12px 18px' : '8px 14px', fontSize: fs ? 12 : 10 }}
            >
                <span className="font-bold text-base-content/50">Kaynak: </span>
                Elektrik Dağıtım Şirketlerinin Planlı Bakım Harcamalarının Tarife Hesaplamalarında
                Dikkate Alınmasına İlişkin Usul ve Esaslar — Mevcut / Yeni Düzenleme Karşılaştırması
            </div>

        </div>
    );
}
