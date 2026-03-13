import React, { useState, useEffect, useRef } from 'react';
import {
    ArrowRight, Bookmark, Activity, Map, Image as ImageIcon, Briefcase, Maximize
} from 'lucide-react';
import { presentationSlides } from '../../data/mockData';

const GirisSlide = ({ setActiveSlideId }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(() => !!document.fullscreenElement);
    const containerRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleFullscreenChange = () => {
            const isFull = !!document.fullscreenElement;
            setIsFullscreen(isFull);
            const wrapper = document.getElementById('presentation-fullscreen-wrapper');
            if (wrapper) {
                if (!isFull) {
                    wrapper.removeAttribute('data-theme');
                } else {
                    wrapper.setAttribute('data-theme', 'light');
                }
            }
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.getElementById('presentation-fullscreen-wrapper')?.requestFullscreen?.().catch(err => {
                console.log(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    // Filter out 'giris' slide for the agenda
    const slidesList = presentationSlides.filter(s => s.type !== 'giris');

    // Categorize slides based on context
    const getCategory = (type) => {
        if ([
            'chart_s1_s2', 
            's1_s2_denetleme', 
            'agac_budama_koridor', 
            'agac_budama_koridor_26', 
            'bina_iyilestirme',
            'agac_direk'
        ].includes(type)) return 'seviye12';

        if ([
            '2025_yuklenici_gerceklesme',
            'yer_teslimi',
            'chart_pie',
            'cbs_kabul',
            'kesif_ozeti',
            'yuklenici_bilgileri',
            'ariza_hucre_bakim_25',
            'afet'
        ].includes(type)) return 'seviye3';

        return 'diger';
    };

    const categories = {
        seviye12: { title: "SEVİYE 1-2 PLANLI BAKIM", color: "text-rose-500", bg: "bg-rose-500/10", border: 'border-rose-500/20', icon: <Activity size={20} /> },
        seviye3: { title: "SEVİYE-3", color: "text-blue-500", bg: "bg-blue-500/10", border: 'border-blue-500/20', icon: <Briefcase size={20} /> },
        diger: { title: "DİĞER İŞLER", color: "text-emerald-500", bg: "bg-emerald-500/10", border: 'border-emerald-500/20', icon: <Map size={20} /> }
    };

    // Grouping the slides
    const groupedSlides = slidesList.reduce((acc, slide) => {
        const cat = getCategory(slide.type);
        if (!acc[cat]) acc[cat] = [];

        // Consolidate photos into a single entry
        if (slide.type?.startsWith('photo_')) {
            const hasPhotos = acc[cat].find(s => s.isPhotoPlaceholder);
            if (!hasPhotos) {
                acc[cat].push({
                    id: 101, // Bina Yenileme İşi (First photo slide)
                    title: 'ÖNCESİ VE SONRASI FOTOĞRAFLAR',
                    isPhotoPlaceholder: true
                });
            }
        } else {
            acc[cat].push(slide);
        }
        return acc;
    }, {});

    return (
        <div
            ref={containerRef}
            className={`w-full h-full bg-base-100/95 relative flex flex-col selection:bg-primary/30 ${isFullscreen ? 'fixed inset-0 z-50 overflow-y-auto' : 'overflow-hidden'}`}
            style={isFullscreen ? { background: '#ffffff', color: '#1e293b' } : {}}
        >
            <button
                onClick={toggleFullscreen}
                className="absolute top-4 right-4 z-50 btn btn-sm btn-circle btn-ghost bg-base-200/50 hover:bg-base-300"
                title="Tam Ekran"
            >
                <Maximize size={16} />
            </button>

            {/* Background Background Elements */}
            <div className={`absolute top-[-10%] left-[-10%] w-[50vw] h-[50vh] bg-primary/20 rounded-full blur-[100px] pointer-events-none transition-all duration-1000 ease-out ${isMounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-20 scale-90'}`} />
            <div className={`absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vh] bg-secondary/10 rounded-full blur-[120px] pointer-events-none transition-all duration-1000 delay-300 ease-out ${isMounted ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-20 scale-90'}`} />

            <div className={`flex-1 flex flex-col items-center w-full max-w-[95rem] mx-auto px-6 lg:px-12 py-4 z-10 space-y-8 ${isFullscreen ? '' : 'justify-center'}`}>

                {/* 1. HERO SECTION - Sticky */}
                <section className={`sticky top-0 w-full pt-8 pb-4 bg-base-100/90 backdrop-blur-md z-30 transition-all duration-1000 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-3xl md:text-4xl lg:text-6xl font-black text-base-content tracking-tighter leading-[1.1] max-w-5xl">
                            <span className="block">TOROSLAR EDAŞ</span>
                            <span className="block">SİSTEM İŞLETME MÜDÜRLÜĞÜ</span>
                            <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent pb-2 block mt-1 text-2xl md:text-3xl lg:text-5xl">
                                BAKIM YÖNETİCİLİĞİ
                            </span>
                        </h1>
                    </div>
                </section>

                {/* 2. DYNAMIC AGENDA GRID */}
                <section className={`w-full transition-all duration-1000 delay-300 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8 items-start">
                        {['seviye12', 'seviye3', 'diger'].map((key) => {
                            const slidesInThisCat = groupedSlides[key];
                            if (!slidesInThisCat || slidesInThisCat.length === 0) return null;
                            const catMetaData = categories[key];

                            return (
                                <div key={key} className="flex flex-col gap-4">
                                    <h3 className={`sticky top-[180px] lg:top-[220px] z-20 text-base lg:text-lg font-extrabold flex items-center gap-2 border-b pb-2 bg-base-100/95 backdrop-blur-sm py-2 ${catMetaData.border}`}>
                                        <span className={`p-1.5 rounded-lg ${catMetaData.bg} ${catMetaData.color}`}>
                                            {catMetaData.icon}
                                        </span>
                                        <span className="text-base-content tracking-tight">{catMetaData.title}</span>
                                    </h3>

                                    <div className="flex flex-col gap-3">
                                        {slidesInThisCat.map((slide, idx) => (
                                            <div
                                                key={slide.id}
                                                onClick={() => setActiveSlideId?.(slide.id)}
                                                className="group relative p-4 rounded-xl bg-base-100/70 backdrop-blur-md border border-base-200 shadow-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden flex items-center"
                                            >
                                                <div className={`absolute top-0 left-0 w-1.5 h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${catMetaData.bg.replace('/10', '')}`} />

                                                <div className="flex justify-between items-center w-full z-10">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-[10px] md:text-xs font-black text-base-content/40 bg-base-200 px-2 py-0.5 rounded-md">
                                                            {String(idx + 1).padStart(2, '0')}
                                                        </span>
                                                        <h4 className="text-sm md:text-base font-bold text-base-content leading-snug group-hover:text-primary transition-colors pr-2 line-clamp-2">
                                                            {slide.title}
                                                        </h4>
                                                    </div>
                                                    <ArrowRight size={18} className={`opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${catMetaData.color} flex-shrink-0`} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default GirisSlide;
