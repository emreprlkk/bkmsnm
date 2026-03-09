import React, { useState, useEffect, useRef } from 'react';
import { Maximize, Minimize, Play, Info } from 'lucide-react';

export default function VideoSlide({ title, videoId, description }) {
    const [isFullscreen, setIsFullscreen] = useState(() => !!document.fullscreenElement);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.getElementById('presentation-fullscreen-wrapper')?.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    return (
        <div
            ref={containerRef}
            className={`flex flex-col h-full w-full ${isFullscreen ? 'fixed inset-0 z-50 bg-base-100 p-8 m-0' : ''}`}
        >
            <div className="mb-6 flex justify-between items-start animate-in slide-in-from-top-4 duration-500 flex-none">
                <div>
                    <h2 className="text-3xl font-extrabold text-base-content mb-2">{title}</h2>
                    <p className="text-base-content/60 text-lg border-b border-base-200 pb-2 inline-block shadow-sm-bottom">{description || 'Dijital Süreçler Demo Ekranı'}</p>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleFullscreen}
                        className="btn btn-sm btn-outline shadow-sm bg-base-100 border-base-300"
                        title={isFullscreen ? "Küçült" : "Tam Ekran"}
                    >
                        {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
                        <span className="hidden sm:inline ml-1">{isFullscreen ? 'Küçült' : 'Tam Ekran'}</span>
                    </button>
                </div>
            </div>

            <div
                className={`flex-1 flex flex-col xl:flex-row gap-6 ${isFullscreen ? '' : 'relative bg-base-200/50 shadow-inner rounded-3xl p-6 h-full'}`}
            >
                {/* Video Container */}
                <div className="flex-1 w-full bg-black/5 rounded-3xl shadow-md overflow-hidden relative border border-base-200/50 min-h-[450px] animate-in zoom-in-95 fade-in duration-500 flex items-center justify-center p-2">
                    {videoId ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`}
                            title={title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded-2xl shadow-2xl w-full h-full object-cover transition-all duration-700"
                        ></iframe>
                    ) : (
                        <div className="text-center text-base-content/50 flex flex-col items-center bg-base-100/50 w-full h-full justify-center rounded-2xl backdrop-blur-sm shadow-inner transition-all hover:bg-base-100/80 duration-500">
                            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                <Play size={36} className="text-primary opacity-80 pl-1" />
                            </div>


                        </div>
                    )}
                </div>

                {/* Right Side Info */}
                <div className="w-full xl:w-1/3 flex flex-col gap-4 animate-in slide-in-from-right-4 fade-in duration-500 delay-150">
                    <div className="card bg-base-100 shadow-sm border border-base-200 flex-1 hover:border-primary/30 transition-colors duration-300">
                        <div className="card-body p-8">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 shadow-inner">
                                <Info size={24} className="text-primary flex-shrink-0" />
                            </div>
                            <h3 className="card-title text-2xl text-primary flex items-start gap-2 mb-2 leading-tight font-black tracking-tight">
                                Süreç Detayları
                            </h3>
                            <div className="w-8 h-1 bg-primary/30 rounded-full mb-6"></div>

                            <p className="text-base-content/80 text-lg leading-relaxed flex-1 whitespace-pre-line tracking-wide">
                                Yüklenici Takip Sistem aracılığıyla kullanıcılar anlık olarak keşif projesi çizebilir.Direk seçimi Atilla Yunusoğlu'nun kitabındaki modellemelere uygun olarak otomatik belirlenir ve atanan direğe uygun envarter (izolatör-travers v.b) otomatik atanır.Keşif Bedeli anlık olarak hesaplanır . <br /><br />
                                Videoda yer alan işlemlere ait detaylı yönergeler ve algoritmik yapılar, kurumsal şebekemize tam entegre olarak çalışmaktadır.
                            </p>



                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
