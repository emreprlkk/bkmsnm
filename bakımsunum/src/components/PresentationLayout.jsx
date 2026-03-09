import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Menu, Play } from 'lucide-react';

export default function PresentationLayout({
    children,
    slides,
    activeSlideId,
    setActiveSlideId,
    onNext,
    onPrev
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="drawer lg:drawer-open bg-base-200 min-h-screen !transition-all !duration-500">
            <input id="slide-drawer" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col h-screen overflow-hidden relative">
                {/* Navbar */}
                <div className="w-full navbar bg-base-100 shadow-sm z-10 px-4 transition-all duration-300">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="slide-drawer" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <Menu size={20} />
                        </label>
                    </div>
                    <div className="flex-none hidden lg:flex">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="btn btn-square btn-ghost"
                            aria-label="toggle sidebar"
                        >
                            <Menu size={20} />
                        </button>
                    </div>
                    <div className="flex-1 px-2 mx-2 text-xl font-bold flex items-center gap-2">
                        <img
                            src="https://www.toroslaredas.com.tr/frontEndPages/img/toroslar-logo-black.svg"
                            width={250}
                            height={250}
                            style={{ objectFit: "contain" }}
                        />
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            EDAŞ BAKIM DASHBOARD-SUNUM PORTALI
                        </span>
                    </div>
                    <div className="flex-none hidden sm:flex gap-2">
                        <div className="badge badge-primary badge-outline font-semibold py-3 px-4">
                            {(slides.findIndex(s => s.id === activeSlideId) + 1)} / {slides.length}
                        </div>
                        {/* Fullscreen simulation or play mode */}
                        <button className="btn btn-ghost btn-circle">
                            <Play fill="currentColor" size={18} />
                        </button>
                    </div>
                </div>

                {/* Main Slide Content Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col justify-center items-center bg-base-200/50 backdrop-blur-sm relative">

                    <div className="w-full max-w-5xl h-full min-h-[600px] bg-base-100 rounded-3xl shadow-xl shadow-base-300/50 border border-base-300 flex flex-col transition-all duration-500 overflow-hidden relative group">

                        {/* Slide Control Overlays (Hover to show) */}
                        <div className="absolute inset-y-0 left-0 w-16 md:w-24 group-hover:opacity-100 opacity-0 transition-opacity duration-300 flex items-center justify-center z-20 pointer-events-none">
                            <button
                                onClick={onPrev}
                                disabled={activeSlideId === slides[0]?.id}
                                className="btn btn-circle btn-primary btn-sm md:btn-md shadow-lg pointer-events-auto"
                            >
                                <ChevronLeft />
                            </button>
                        </div>

                        <div className="absolute inset-y-0 right-0 w-16 md:w-24 group-hover:opacity-100 opacity-0 transition-opacity duration-300 flex items-center justify-center z-20 pointer-events-none">
                            <button
                                onClick={onNext}
                                disabled={activeSlideId === slides[slides.length - 1]?.id}
                                className="btn btn-circle btn-primary btn-sm md:btn-md shadow-lg pointer-events-auto"
                            >
                                <ChevronRight />
                            </button>
                        </div>

                        {/* Slide Body */}
                        <div className="flex-1 p-8 md:p-12 overflow-y-auto w-full relative z-10 flex flex-col">
                            {children}
                        </div>

                        {/* Slide Progress Bar */}
                        <div className="h-1.5 w-full bg-base-300 absolute bottom-0">
                            <div
                                className="h-full bg-primary transition-all duration-500 ease-out"
                                style={{ width: `${((slides.findIndex(s => s.id === activeSlideId) + 1) / slides.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Sidebar Focus / Outline View */}
            <div className="drawer-side z-20">
                <label htmlFor="slide-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className={`h-full transition-all duration-500 ease-in-out overflow-x-hidden bg-base-100 border-r border-base-300 block shrink-0 w-[18rem] ${!isSidebarOpen ? 'lg:!w-0 lg:border-r-0' : 'lg:w-[18rem]'}`}>
                    <ul className="menu p-4 w-[18rem] min-h-full text-base-content flex-nowrap">
                        <li className="mb-4">
                            <div className="text-xl font-black px-2 flex items-center gap-2 whitespace-nowrap">
                                Sunum İçeriği
                            </div>
                        </li>
                        {Object.entries(
                            slides.reduce((acc, slide) => {
                                if (slide.group) {
                                    if (!acc[slide.group]) acc[slide.group] = [];
                                    acc[slide.group].push(slide);
                                } else {
                                    acc['none'].push(slide);
                                }
                                return acc;
                            }, { none: [] })
                        ).map(([groupName, groupSlides]) => {
                            if (groupName === 'none') {
                                return groupSlides.map((slide) => (
                                    <li key={slide.id} className="mb-1">
                                        <button
                                            className={`py-3 ${activeSlideId === slide.id ? 'active bg-primary font-bold text-primary-content outline-none' : 'hover:bg-base-200'}`}
                                            onClick={() => setActiveSlideId(slide.id)}
                                        >
                                            <span className="opacity-60 text-xs w-4">
                                                {(slides.findIndex(s => s.id === slide.id) + 1).toString().padStart(2, '0')}
                                            </span>
                                            <span className="ml-2 truncate flex-1">{slide.title}</span>
                                        </button>
                                    </li>
                                ));
                            } else {
                                const isActiveGroup = groupSlides.some(s => s.id === activeSlideId);
                                return (
                                    <li key={groupName} className="mb-1 group-item">
                                        <details open={true}>
                                            <summary className={`py-3 font-bold opacity-80 ${isActiveGroup ? 'text-primary opacity-100' : 'text-base-content hover:bg-base-200'}`}>
                                                {groupName}
                                            </summary>
                                            <ul className="pl-4 mt-2 border-l border-base-300 ml-2">
                                                {groupSlides.map((slide) => (
                                                    <li key={slide.id} className="mb-1">
                                                        <button
                                                            className={`py-2 text-sm ${activeSlideId === slide.id ? 'active bg-primary/20 font-bold text-primary outline-none' : 'opacity-70 hover:opacity-100 hover:bg-base-200'}`}
                                                            onClick={() => setActiveSlideId(slide.id)}
                                                        >
                                                            <span className="truncate flex-1">{slide.titleShort || slide.title}</span>
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </details>
                                    </li>
                                );
                            }
                        })}
                        <li className="mt-auto">
                            <div className="flex flex-col gap-2 opacity-60 text-xs mt-10 text-center">
                                <p>DEVELOPER BY EMRE PARLAK</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
