import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const MotionDiv = motion.div;
import PresentationLayout from './components/PresentationLayout';
import { presentationSlides } from './data/mockData';

// Slide components
import LineChartSlide from './components/slides/LineChartSlide';
import PieChartSlide from './components/slides/PieChartSlide';
import BarChartSlide from './components/slides/BarChartSlide';
import TableSlide from './components/slides/TableSlide';
import BeforeAfterSlide from './components/slides/BeforeAfterSlide';
import S1S2Slide from './components/slides/S1S2Slide';
import YerTeslimiSlide from './components/slides/YerTeslimiSlide';
import YukleniciBilgileriSlide from './components/slides/YukleniciBilgileriSlide';
import S1S2DenetlemeSlide from './components/slides/S1S2DenetlemeSlide';
import YukleniciGerceklesme2025 from './components/slides/2025YukleniciGerceklesme';
import PlanliBakimDegisiklikler from './components/slides/usulesas';
import AfetSlide from './components/slides/AfetSlide';
import CBSDurumuSlide from './components/slides/CBSDurumuSlide';
import EnvanterSlide from './components/slides/EnvanterSlide';
import GirisSlide from './components/slides/GirisSlide';
import VideoSlide from './components/slides/VideoSlide';
import { X, GripHorizontal, Eye } from 'lucide-react';

const TimelineOverlay = ({ slides, activeSlideId }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const currentIndex = slides.findIndex(s => s.id === activeSlideId);
  const total = slides.length;

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      setPosition(prev => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY
      }));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  if (currentIndex === -1) return null;

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="absolute bottom-6 right-6 z-[9999] btn btn-circle btn-primary shadow-xl opacity-50 hover:opacity-100 transition-opacity hidden md:flex"
        title="Zaman Çizelgesini Göster"
      >
        <Eye size={20} />
      </button>
    );
  }

  return (
    <div
      className={`absolute bottom-6 left-1/2 z-[9999] flex flex-col items-center gap-2 drop-shadow-sm hidden md:flex transition-opacity select-none ${isDragging ? 'opacity-100' : 'opacity-85 hover:opacity-100'}`}
      style={{ transform: `translate(calc(-50% + ${position.x}px), ${position.y}px)` }}
    >
      {/* Top Bar: Drag Handle + Dots + Close */}
      <div
        className={`flex items-center gap-2 bg-base-100/90 backdrop-blur-md pl-2 pr-1 py-1 rounded-full border border-base-200/50 shadow-md ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={(e) => {
          // Sadece kapsayıcıdan veya drag handle'dan tutunca sürüklensin, kapatma butonunu etkilemesin
          if (e.target.closest('button')) return;
          setIsDragging(true);
        }}
      >
        <GripHorizontal size={14} className="text-base-content/40 hover:text-base-content/70 transition-colors" />

        <div className="flex items-center gap-1.5 mx-2">
          {slides.map((s, idx) => (
            <div
              key={s.id}
              className={`h-1.5 rounded-full transition-all duration-500 ease-out ${idx === currentIndex
                ? 'w-6 bg-primary shadow-sm'
                : idx < currentIndex
                  ? 'w-1.5 bg-primary/40'
                  : 'w-1.5 bg-base-content/20'
                }`}
            />
          ))}
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); setIsVisible(false); }}
          className="btn btn-xs btn-circle btn-ghost text-base-content/50 hover:text-error hover:bg-error/10"
          title="Gizle"
        >
          <X size={14} />
        </button>
      </div>

      {/* Breadcrumb style trace */}
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-base-100/90 backdrop-blur-md px-4 py-2 rounded-full border border-base-200/50 shadow-md">
        <div className="flex flex-col items-end mr-1">
          <span className="text-[8px] text-base-content/40 leading-none mb-0.5">Önceki Slayt</span>
          <span className="text-base-content/60 truncate max-w-[120px]">
            {currentIndex > 0 ? (slides[currentIndex - 1].titleShort || slides[currentIndex - 1].title) : 'Başlangıç'}
          </span>
        </div>

        <svg className="w-3 h-3 text-base-content/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>

        <div className="flex flex-col items-center mx-1 scale-105">
          <span className="text-[8px] text-primary/70 leading-none mb-0.5">Mevcut</span>
          <span className="text-primary truncate max-w-[140px] border-b border-primary/20 pb-0.5">
            {slides[currentIndex].titleShort || slides[currentIndex].title}
          </span>
        </div>

        <svg className="w-3 h-3 text-base-content/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>

        <div className="flex flex-col items-start ml-1">
          <span className="text-[8px] text-base-content/40 leading-none mb-0.5">Sonraki Slayt</span>
          <span className="text-base-content/60 truncate max-w-[120px]">
            {currentIndex < total - 1 ? (slides[currentIndex + 1].titleShort || slides[currentIndex + 1].title) : 'Bitiş'}
          </span>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [activeSlideId, setActiveSlideId] = useState(presentationSlides[0]?.id ?? 1);
  const currentIndex = presentationSlides.findIndex(s => s.id === activeSlideId);

  const handleNext = useCallback(() => {
    setActiveSlideId((prevId) => {
      const idx = presentationSlides.findIndex(s => s.id === prevId);
      const nextIdx = Math.min(idx + 1, presentationSlides.length - 1);
      return presentationSlides[nextIdx].id;
    });
  }, []);

  const handlePrev = useCallback(() => {
    setActiveSlideId((prevId) => {
      const idx = presentationSlides.findIndex(s => s.id === prevId);
      const prevIdx = Math.max(idx - 1, 0);
      return presentationSlides[prevIdx].id;
    });
  }, []);

  // ── Klavye navigasyonu ──────────────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Input / textarea / select veya contenteditable odaklanmışsa geçiş yapma
      const el = document.activeElement;
      const tag = el?.tagName?.toLowerCase();
      if (
        tag === 'input' ||
        tag === 'textarea' ||
        tag === 'select' ||
        el?.isContentEditable
      ) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        e.stopPropagation();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        e.stopPropagation();
        handlePrev();
      }
    };

    // capture:true → propagation'dan bağımsız, en erken tetiklenir
    document.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => document.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [handleNext, handlePrev]);

  const activeSlide = presentationSlides.find(s => s.id === activeSlideId);

  const renderSlideContent = () => {
    switch (activeSlide?.type) {
      case 'chart_line':
        return <LineChartSlide />;
      case 'chart_pie':
        return <PieChartSlide />;
      case 'chart_bar':
        return <BarChartSlide />;
      case 'table':
        return <TableSlide />;
      case 'photo_bina':
        return <BeforeAfterSlide
          categoryTitle="Bina Yenileme İşi"
          items={[
            {
              title: "Bina Yenileme İşi",
              afterUrl: "https://res.cloudinary.com/diol6whsz/image/upload/v1773091772/bina_yenilme_%C3%B6ncesi1_awffvg.jpg",

              beforeUrl: "https://res.cloudinary.com/diol6whsz/image/upload/v1773091772/binayenilemesonras%C4%B11_iedcyf.jpg",
              notes: "Dağıtım merkezleri ve trafo binalarında kapsamlı dış cephe yenileme, sıva ve boyama çalışmaları gerçekleştirilmiş, binaların fiziksel dayanımı artırılmıştır."
            }
          ]}
        />;
      case 'photo_budama':
        return <BeforeAfterSlide
          categoryTitle="Ağaç Budama İşi"
          items={[
            {
              title: "Ağaç Budama İşi",
              beforeUrl: "https://res.cloudinary.com/diol6whsz/image/upload/v1773091771/a%C4%9Fa%C3%A7_budama_%C3%B6ncesi_1_gxspln.jpg",
              afterUrl: "https://res.cloudinary.com/diol6whsz/image/upload/v1773091772/a%C4%9Fa%C3%A7_budama_sonras%C4%B1_1_xmmvjp.jpg",
              notes: "Alçak Gerilim (AG) hatlarına temas eden veya risk oluşturan ağaç dalları düzenli periyotta budanarak hat şebeke güvenliği sağlanmış, olası kısa devre ve arıza riskleri giderilmiştir."
            }
          ]}
        />;
      case 'photo_koridor':
        return <BeforeAfterSlide
          categoryTitle="YG Koridor Açma İşi"
          items={[
            {
              title: "YG Koridor Açma İşi",
              beforeUrl: "https://res.cloudinary.com/diol6whsz/image/upload/v1773091774/yg_koridor_a%C3%A7ma_%C3%B6ncesi_1_t0qdtt.jpg",
              afterUrl: "https://res.cloudinary.com/diol6whsz/image/upload/v1773091775/yg_koridor_a%C3%A7ma_sonras%C4%B1_1_llgo1e.jpg",
              notes: "Ormanlık alandaki YG hat güzergahlarında koridor açma ve temizleme işleri yapılarak, yangın ve şiddetli rüzgar kaynaklı iletken kopma riskleri minimize edilmiştir."
            }
          ]}
        />;
      case 'photo_sicoat':
        return <BeforeAfterSlide
          categoryTitle="Si-Coat Uygulaması"
          items={[
            {
              title: "Si-Coat Uygulaması",
              beforeUrl: "https://res.cloudinary.com/diol6whsz/image/upload/v1773091526/sicoat_%C3%B6ncesi_et6agg.jpg",
              afterUrl: "https://res.cloudinary.com/diol6whsz/image/upload/v1773091526/sicoat_sonras%C4%B1_yvncos.jpg",
              notes: "İzolatörlerde kıyı ve kirli sanayi bölgelerinde yaşanan kirlilik kaynaklı atlamaları önlemek amacıyla boyama ve Si-Coat (Silikon Kaplama) izolasyon çalışması yapılmıştır."
            }
          ]}
        />;
      case 'photo_uygunsuz':
        return <BeforeAfterSlide
          categoryTitle="Si-Coat Uygunsuz Durum Analizleri"
          items={[
            {
              title: "Si-Coat Uygunsuz Durum Analizi (1)",
              beforeUrl: null,
              afterUrl: "https://res.cloudinary.com/diol6whsz/image/upload/v1773091773/sicoat_uygunsuz_foto1_rmmwqv.jpg",
              notes: "Si-Coat yalıtım uygulamasının standartlara uygun yapılmadığı noktalarda tespit edilen deformasyon örneği. Boyanın düzensiz kalınlığı yalıtım eksikliğine zemin hazırlamaktadır."
            },
            {
              title: "Si-Coat Uygunsuz Durum Analizi (2)",
              beforeUrl: null,
              afterUrl: "https://res.cloudinary.com/diol6whsz/image/upload/v1773091773/sicoat_uygunsuz_foto2_ahvtjr.jpg",
              notes: "Mevcut yalıtım aparatlarında ve kaplamada gözlemlenen yüzey soyulması, yetersiz malzeme uygulanması ve fiziksel aşınma durumundan kaynaklanan bölgesel uygunsuzluklar."
            },
            {
              title: "Si-Coat Uygunsuz Durum Analizi (3)",
              beforeUrl: null,
              afterUrl: "https://res.cloudinary.com/diol6whsz/image/upload/v1773091774/sicoat_uygunsuz_foto3_mujemb.jpg",
              notes: "Sahadaki denetimler sonucunda Si-Coat işlemi yapılamayan veya ömrünü çok hızlı tamamlamış riskli noktalara ait bulgular detaylandırılmıştır. Düzeltici faaliyet planlanmıştır."
            }
          ]}
        />;
      case 'chart_s1_s2':
        return <S1S2Slide />;
      case 'yer_teslimi':
        return <YerTeslimiSlide />;
      case 'yuklenici_bilgileri':
        return <YukleniciBilgileriSlide />;
      case 's1_s2_denetleme':
        return <S1S2DenetlemeSlide />;
      case '2025_yuklenici_gerceklesme':
        return <YukleniciGerceklesme2025 />;
      case 'usul_esas':
        return <PlanliBakimDegisiklikler />;
      case 'afet':
        return <AfetSlide />;
      case 'cbs_durumu':
        return <CBSDurumuSlide />;
      case 'video_kesif':
        return <VideoSlide
          title="Yüklenici Takip: Sistemi Keşif Modülü"
          description="Gerçek zamanlı metraj,otomatik direk tipi seçimi,direğe otomatik atanan envarter listesi,anlık keşif takibİ,SAP sistemine uygun keşif export'u"
          videoId="-kXSANEsyqc"
        />;
      case 'video_yerteslimi':
        return <VideoSlide
          title="Yüklenici Takip: Yer Teslimi"
          description="Y."
          videoId=""
        />;
      case 'video_makro':
        return <VideoSlide
          title="Excel Makro Süreçleri"
          description="."
          videoId=""
        />;
      case 'kesif_ozeti':
        return <EnvanterSlide />;
      case 'giris':
        return <GirisSlide setActiveSlideId={setActiveSlideId} />;
      default:
        return <div>Slide Type Not Found</div>;
    }
  };

  return (
    <PresentationLayout
      slides={presentationSlides}
      activeSlideId={activeSlideId}
      setActiveSlideId={setActiveSlideId}
      onNext={handleNext}
      onPrev={handlePrev}
    >
      <div id="presentation-fullscreen-wrapper" className="w-full h-full flex flex-col bg-base-100/0 relative overflow-hidden">
        <TimelineOverlay slides={presentationSlides} activeSlideId={activeSlideId} />

        <AnimatePresence mode="wait">
          <MotionDiv
            key={activeSlideId}
            initial={{ opacity: 0, x: 30, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -30, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex-1 w-full flex flex-col"
          >
            {renderSlideContent()}
          </MotionDiv>
        </AnimatePresence>
      </div>
    </PresentationLayout>
  );
}

export default App;
