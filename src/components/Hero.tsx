import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { HeroSettings, initialHeroSettings } from '../data/officeData';

interface HeroProps {
  onExploreClick: () => void;
  onContactClick: () => void;
  heroSettings?: HeroSettings;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onContactClick,
  heroSettings = initialHeroSettings,
}) => {
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const fullText = heroSettings.sloganHighlight || 'a sua jornada.';
    let currentIdx = 0;
    setTypedText('');
    setIsTyping(true);

    const timer = setInterval(() => {
      currentIdx++;
      setTypedText(fullText.slice(0, currentIdx));
      if (currentIdx >= fullText.length) {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, 95);

    return () => clearInterval(timer);
  }, [heroSettings.sloganHighlight]);

  return (
    <section
      id="inicio"
      className="relative z-10 min-h-[90vh] lg:min-h-screen flex items-center bg-[#17130F] pt-28 sm:pt-36 lg:pt-32 pb-16 overflow-hidden"
    >
      {/* Background Image: Deusa Têmis e Biblioteca Jurídica */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/4a48d6bf-68bb-412f-a222-e15eb6adb959.png"
          alt="Deusa Têmis e Biblioteca Jurídica - Advocacia Nicolau"
          className="w-full h-full object-cover object-[82%_center] sm:object-right lg:object-center filter brightness-[0.86] sm:brightness-[0.95] contrast-[1.05]"
          referrerPolicy="no-referrer"
        />

        {/* Subtle mobile darkening scrim (um pouquinho mais escura, pouca coisa no mobile) */}
        <div className="absolute inset-0 bg-black/20 sm:bg-transparent pointer-events-none" />

        {/* Gradient scrim for maximum legibility of left-hand text */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#17130F] via-[#17130F]/85 to-transparent lg:w-[65%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17130F]/90 via-transparent to-[#17130F]/40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-14 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Text Content */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            {/* Kicker Tag with Line matching image_54ac8ba8.png */}
            <div className="flex items-center gap-3.5 mb-5">
              <span
                className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#CBA86B] font-semibold"
                style={{ fontFamily: "'Cinzel', Georgia, serif" }}
              >
                {heroSettings.kicker}
              </span>
              <span className="w-16 sm:w-28 h-[1.5px] bg-[#CBA86B]/60" />
            </div>

            {/* Main Headline with typewriter animation on 'a sua jornada.' */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.6rem] text-[#FAF8F4] font-normal leading-[1.08] mb-6 tracking-normal"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {heroSettings.sloganPart1}<br />
              {heroSettings.sloganPart2}<br />
              <span className="text-[#CBA86B] italic font-normal inline-block">
                {typedText}
                <span
                  className={`inline-block w-[3px] h-[0.8em] bg-[#CBA86B] ml-1.5 align-middle ${
                    isTyping ? 'opacity-100 animate-pulse' : 'opacity-80'
                  }`}
                  aria-hidden="true"
                />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-[1.12rem] text-[#FAF8F4]/85 leading-relaxed font-light max-w-xl mb-9">
              {heroSettings.subtitle}
            </p>

            {/* Button 'Entre em contato' (Chamativo, vibrante e prestigioso) */}
            <div>
              <button
                onClick={onContactClick}
                className="relative inline-flex items-center gap-3.5 px-8 py-4 sm:px-9 sm:py-4.5 rounded-full bg-gradient-to-r from-[#D6B779] via-[#F2E3C6] to-[#CBA86B] text-[#17130F] text-xs sm:text-sm font-bold tracking-[0.08em] uppercase transition-all duration-300 cursor-pointer group shadow-[0_0_30px_rgba(203,168,107,0.55)] hover:shadow-[0_0_45px_rgba(214,183,121,0.85)] hover:scale-105 active:scale-95 border-2 border-[#FAF8F4]/80 ring-2 ring-[#CBA86B]/70"
              >
                <span className="relative z-10 font-bold">Entre em contato</span>
                <span className="relative z-10 w-7 h-7 rounded-full bg-[#17130F] text-[#FAF8F4] flex items-center justify-center group-hover:bg-[#8C6F36] transition-colors shadow-sm">
                  <ArrowRight className="w-4 h-4 text-[#FAF8F4] group-hover:translate-x-0.5 transition-transform duration-300" />
                </span>
                {/* Ambient pulsing glow behind button */}
                <span className="absolute -inset-1 rounded-full bg-[#CBA86B]/30 blur-md group-hover:bg-[#CBA86B]/50 transition-all pointer-events-none" />
              </button>
            </div>
          </div>

          {/* Right Column: Floating Badge (DESDE 1978 EM GUARAPUAVA/PR) */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end items-end pt-8 lg:pt-48">
            <div className="flex items-center gap-4 pl-4 border-l border-[#B89554]/70 bg-[#17130F]/40 backdrop-blur-sm py-2 pr-4">
              <div className="flex flex-col">
                <span
                  className="text-[10px] tracking-[0.25em] uppercase text-[#D6B779] font-medium"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  DESDE
                </span>
                <span
                  className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF8F4] leading-none my-1 tracking-wider"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  1978
                </span>
                <span
                  className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-[#FAF8F4]/85 font-medium"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  GUARAPUAVA / PR
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
