import React, { useState } from 'react';
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

function App() {
  const [activeSlideId, setActiveSlideId] = useState(1);

  const handleNext = () => {
    setActiveSlideId((prev) => Math.min(prev + 1, presentationSlides.length));
  };

  const handlePrev = () => {
    setActiveSlideId((prev) => Math.max(prev - 1, 1));
  };

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
      <div key={activeSlideId} className="flex-1 w-full animate-in fade-in slide-in-from-right-4 duration-500 ease-out flex flex-col">
        {renderSlideContent()}
      </div>
    </PresentationLayout>
  );
}

export default App;
