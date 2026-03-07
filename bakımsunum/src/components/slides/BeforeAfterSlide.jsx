import React, { useState, useRef, useEffect } from 'react';
import { Maximize, Minimize, MoveHorizontal, Info, CheckCircle2, Hand, ChevronLeft, ChevronRight } from 'lucide-react';

export default function BeforeAfterSlide({ categoryTitle, items }) {
    const [isFullscreen, setIsFullscreen] = useState(() => !!document.fullscreenElement);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sliderPos, setSliderPos] = useState(50);
    const [imgPos, setImgPos] = useState({ x: 50, y: 50 }); // % for object-position panning

    const containerRef = useRef(null);
    const sliderRef = useRef(null);

    const activeAction = useRef(null); // 'slider' or 'pan'
    const panStart = useRef({ x: 0, y: 0, initialImgX: 50, initialImgY: 50 });

    const currentItem = items && items.length > 0 ? items[currentIndex] : null;

    useEffect(() => {
        const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // Reset slider and pan position when slide index changes
    useEffect(() => {
        setSliderPos(50);
        setImgPos({ x: 50, y: 50 });
    }, [currentIndex]);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.getElementById('presentation-fullscreen-wrapper')?.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    const handleNext = () => {
        if (items && currentIndex < items.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (items && currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    // Centralized event listener for robust dragging & panning
    useEffect(() => {
        const handleGlobalMove = (e) => {
            if (!activeAction.current) return;

            const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;

            if (activeAction.current === 'slider' && sliderRef.current) {
                e.preventDefault();
                const rect = sliderRef.current.getBoundingClientRect();
                let pos = ((clientX - rect.left) / rect.width) * 100;
                setSliderPos(Math.max(0, Math.min(100, pos)));
            } else if (activeAction.current === 'pan') {
                e.preventDefault();
                // Ters yönlü hesaplama: resmi çektiğimiz yöne kaydırmak için eksi
                const dx = panStart.current.x - clientX;
                const dy = panStart.current.y - clientY;

                // Kaydırma hassasiyeti
                const newX = panStart.current.initialImgX + (dx * 0.15);
                const newY = panStart.current.initialImgY + (dy * 0.15);

                setImgPos({
                    x: Math.max(0, Math.min(100, newX)),
                    y: Math.max(0, Math.min(100, newY))
                });
            }
        };

        const handleGlobalUp = () => {
            activeAction.current = null;
        };

        window.addEventListener('mousemove', handleGlobalMove);
        window.addEventListener('mouseup', handleGlobalUp);
        window.addEventListener('touchmove', handleGlobalMove, { passive: false });
        window.addEventListener('touchend', handleGlobalUp);

        return () => {
            window.removeEventListener('mousemove', handleGlobalMove);
            window.removeEventListener('mouseup', handleGlobalUp);
            window.removeEventListener('touchmove', handleGlobalMove);
            window.removeEventListener('touchend', handleGlobalUp);
        };
    }, []);

    const handlePointerDown = (e, actionType) => {
        const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;

        activeAction.current = actionType;
        if (actionType === 'pan') {
            panStart.current = {
                x: clientX,
                y: clientY,
                initialImgX: imgPos.x,
                initialImgY: imgPos.y
            };
        }
    };

    if (!currentItem) return null;

    const { title, beforeUrl, afterUrl, notes } = currentItem;

    return (
        <div className="flex flex-col h-full w-full">
            <div className="mb-6 flex justify-between items-start">
                <div>
                    <h2 className="text-3xl font-extrabold text-base-content mb-2">{categoryTitle}</h2>
                    <p className="text-base-content/60 text-lg">Öncesi ve Sonrası Durum Analizi</p>
                </div>
                <div className="flex items-center gap-4">
                    {/* Navigation Controls */}
                    {items && items.length > 1 && (
                        <div className="flex items-center gap-2 bg-base-200/50 p-1 rounded-2xl border border-base-200 shadow-sm mr-2 animate-in slide-in-from-right-4 duration-300">
                            <button
                                onClick={handlePrev}
                                disabled={currentIndex === 0}
                                className="btn btn-sm btn-ghost btn-circle bg-base-100/50 hover:bg-base-200 disabled:bg-transparent disabled:opacity-20"
                                title="Önceki Çalışma"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <span className="text-sm font-bold opacity-70 px-2 min-w-[50px] text-center tracking-widest text-primary">
                                {currentIndex + 1} / {items.length}
                            </span>
                            <button
                                onClick={handleNext}
                                disabled={currentIndex === items.length - 1}
                                className="btn btn-sm btn-ghost btn-circle bg-base-100/50 hover:bg-base-200 disabled:bg-transparent disabled:opacity-20"
                                title="Sonraki Çalışma"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    )}

                    <button
                        onClick={toggleFullscreen}
                        className="btn btn-sm btn-outline shadow-sm bg-base-100"
                        title={isFullscreen ? "Küçült" : "Tam Ekran"}
                    >
                        {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                    </button>
                </div>
            </div>

            <div
                ref={containerRef}
                className={`flex-1 flex flex-col xl:flex-row gap-6 ${isFullscreen ? 'h-screen w-screen p-6 bg-base-100 m-0 fixed inset-0 z-50 rounded-none' : 'relative bg-base-200/50 shadow-inner rounded-3xl p-6 h-full'}`}
            >
                {/* Sol/Üst Taraf: Resim Slider */}
                <div
                    key={currentIndex} // Re-render animation handler
                    className="flex-1 w-full bg-base-100 rounded-3xl shadow-md overflow-hidden relative border border-base-200 min-h-[450px] cursor-grab active:cursor-grabbing select-none group animate-in zoom-in-95 fade-in duration-500"
                    ref={sliderRef}
                    onMouseDown={(e) => handlePointerDown(e, 'pan')}
                    onTouchStart={(e) => handlePointerDown(e, 'pan')}
                >
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-base-300/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-base-content/70 flex items-center gap-1 z-30 pointer-events-none opacity-50 transition-opacity group-hover:opacity-100">
                        <Hand size={12} /> Detaylar için resmi kaydırın
                    </div>

                    {/* After Image (Background) */}
                    <div className="absolute inset-0 w-full h-full select-none">
                        <img
                            src={afterUrl}
                            alt="After"
                            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                            style={{ objectPosition: `${imgPos.x}% ${imgPos.y}%` }}
                        />
                        <div className="absolute top-6 right-6 bg-base-100/90 text-success px-4 py-2 rounded-xl text-sm font-black drop-shadow-xl backdrop-blur-md border border-success/20 flex items-center gap-2 z-10 transition-transform">
                            <CheckCircle2 size={16} />
                            SONRASI
                        </div>
                    </div>

                    {/* Before Image (Foreground, clipped) */}
                    <div
                        className="absolute inset-0 w-full h-full select-none z-10 pointer-events-none"
                        style={{ clipPath: `polygon(0% 0%, ${sliderPos}% 0%, ${sliderPos}% 100%, 0% 100%)` }}
                    >
                        <img
                            src={beforeUrl}
                            alt="Before"
                            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                            style={{ objectPosition: `${imgPos.x}% ${imgPos.y}%` }}
                        />
                        <div className="absolute top-6 left-6 bg-base-100/90 text-error px-4 py-2 rounded-xl text-sm font-black drop-shadow-xl backdrop-blur-md border border-error/20 z-10 pointer-events-auto transition-transform">
                            ÖNCESİ
                        </div>
                    </div>

                    {/* Slider handle */}
                    <div
                        className="absolute top-0 bottom-0 w-1.5 bg-white cursor-ew-resize z-20 shadow-[-2px_0_10px_rgba(0,0,0,0.3)] transition-colors hover:bg-primary"
                        style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
                        onMouseDown={(e) => { e.stopPropagation(); handlePointerDown(e, 'slider'); }}
                        onTouchStart={(e) => { e.stopPropagation(); handlePointerDown(e, 'slider'); }}
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-white text-base-content/60 transition-all duration-300 hover:scale-110 hover:text-primary hover:border-primary/20 cursor-ew-resize backdrop-blur-md z-30">
                            <MoveHorizontal size={24} />
                        </div>

                        {/* Ortadaki çizginin altı ve üstündeki ufak ok okları (Estetik) */}
                        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-1 h-12 bg-base-content/20 rounded-full cursor-ew-resize pointer-events-none"></div>
                        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-1 h-12 bg-base-content/20 rounded-full cursor-ew-resize pointer-events-none"></div>
                    </div>
                </div>

                {/* Sağ/Alt Taraf: Notlar Kartı */}
                <div key={currentIndex + '-notes'} className="w-full xl:w-1/3 flex flex-col gap-4 animate-in slide-in-from-right-4 fade-in duration-500">
                    <div className="card bg-base-100 shadow-sm border border-base-200 flex-1 hover:border-primary/30 transition-colors duration-300">
                        <div className="card-body">
                            <h3 className="card-title text-xl text-primary flex items-start gap-2 mb-2 leading-tight">
                                <Info size={24} className="mt-1 flex-shrink-0" />
                                {title}
                            </h3>
                            <div className="w-12 h-1 bg-primary/20 rounded-full mb-4"></div>

                            <p className="text-base-content/80 text-lg leading-relaxed flex-1 whitespace-pre-line">
                                {notes}
                            </p>

                            <div className="mt-8">
                                <div className="bg-base-200/50 border border-base-200 rounded-2xl p-5">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-xs font-bold uppercase tracking-widest text-base-content/50">İyileştirme Durumu</span>
                                        <div className="badge badge-success font-bold gap-1 p-3">
                                            <CheckCircle2 size={12} />
                                            Tamamlandı
                                        </div>
                                    </div>
                                    <div className="w-full bg-base-300 rounded-full h-2 overflow-hidden">
                                        <div className="bg-success h-full rounded-full transition-all duration-1000 w-full"></div>
                                    </div>
                                    <div className="mt-3 text-right">
                                        <span className="text-[10px] text-base-content/40 font-bold uppercase">Görsel Onaylı</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
