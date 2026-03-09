import React, { useState, useCallback, useEffect } from 'react';
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
      case 'photo_ag':
        return <BeforeAfterSlide
          categoryTitle="AG Kapsamındaki Çalışmalar"
          items={[
            {
              title: "KADİRLİ OM GAFFARLI FİDER BAKIMI",
              beforeUrl: "https://res.cloudinary.com/dl7jo4fhd/image/upload/v1772452472/gaffal%C4%B1before_wxochd.jpg",
              afterUrl: "https://res.cloudinary.com/dl7jo4fhd/image/upload/v1772452519/gaffarl%C4%B1after_ujdrea.jpg",
              notes: "Kadirli OM ye ait GAFFARLI fiderinde 23 adet müşterek direk dikildi.12 asdet ENH direği dikildi. 1 km AG hat,6 KM YG hat tesis edilmiştir.."
            },
            {
              title: "CART CURT PROJE İŞİ",
              beforeUrl: "https://res.cloudinary.com/dl7jo4fhd/image/upload/v1772452472/gaffal%C4%B1before_wxochd.jpg",
              afterUrl: "https://res.cloudinary.com/dl7jo4fhd/image/upload/v1772452519/gaffarl%C4%B1after_ujdrea.jpg",
              notes: "CAR CURT  operasyon merkezindeki yorgun AG izolatörleri tamamen yenileri ile değiştirilerek kopmalara karşı güvenlik artırıldı."
            }
          ]}
        />;
      case 'photo_yg':
        return <BeforeAfterSlide
          categoryTitle="YG Kapsamındaki Çalışmalar"
          items={[
            {
              title: "YG Travers Değişimi",
              beforeUrl: "https://res.cloudinary.com/dl7jo4fhd/image/upload/v1772452472/gaffal%C4%B1before_wxochd.jpg",
              afterUrl: "https://res.cloudinary.com/dl7jo4fhd/image/upload/v1772452519/gaffarl%C4%B1after_ujdrea.jpg",
              notes: "YG hattındaki riskli bölgelerde yer alan deforme olmuş traversler için yenileme yapıldı. (Temsili Veri)"
            },
            {
              title: "CEYHAN OM GÜÇ YÜKSELTİMİ",
              beforeUrl: "https://res.cloudinary.com/dl7jo4fhd/image/upload/v1772452472/gaffal%C4%B1before_wxochd.jpg",
              afterUrl: "https://res.cloudinary.com/dl7jo4fhd/image/upload/v1772452519/gaffarl%C4%B1after_ujdrea.jpg",
              notes: "Kapasite aşımı olan trafo bölgesinde güç yükseltimi yapıldı ve pano montajı tamamlandı."
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
      <div id="presentation-fullscreen-wrapper" className="w-full h-full flex flex-col bg-base-100/0 relative">
        <TimelineOverlay slides={presentationSlides} activeSlideId={activeSlideId} />

        <div key={activeSlideId} className="flex-1 w-full animate-in fade-in slide-in-from-right-4 duration-500 ease-out flex flex-col">
          {renderSlideContent()}
        </div>
      </div>
    </PresentationLayout>
  );
}

export default App;
