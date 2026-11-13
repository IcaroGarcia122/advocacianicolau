import React from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { ContactInfo, initialContactInfo } from '../data/officeData';

interface TeamProps {
  contactInfo?: ContactInfo;
  onScheduleWithLawyer?: (lawyerName: string) => void;
  onContactClick?: () => void;
}

export const Team: React.FC<TeamProps> = ({
  contactInfo = initialContactInfo,
  onContactClick,
}) => {
  const whatsappUrl = `https://wa.me/${contactInfo.whatsappNumberDigits}?text=${encodeURIComponent(
    'Olá! Gostaria de falar com os advogados da Advocacia Nicolau.'
  )}`;

  const scheduleWhatsappUrl = `https://wa.me/${contactInfo.whatsappNumberDigits}?text=${encodeURIComponent(
    'Olá! Gostaria de agendar um atendimento jurídico com a Advocacia Nicolau.'
  )}`;

  return (
    <section id="equipe" className="relative py-24 lg:py-32 bg-[#FFFFFF] text-[#17130F] overflow-hidden min-h-[620px] flex items-center">
      {/* Desktop Only: Full-bleed team photo on the RIGHT with subtle gradient overlay */}
      <div className="hidden lg:block absolute inset-y-0 right-0 w-[50%] xl:w-[53%] z-0 overflow-hidden pointer-events-none">
        <img
          src="/team_congresso.webp"
          alt="Advogados da Advocacia Nicolau"
          className="w-full h-full object-cover object-[center_10%] -translate-y-4 sm:-translate-y-6 lg:-translate-y-8 scale-105 filter brightness-[0.98] contrast-[1.04]"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            const target = e.currentTarget;
            target.src = '/team_congresso.jpg';
          }}
        />
        {/* Soft gradient on the left edge to smoothly fade into white */}
        <div className="absolute inset-y-0 left-0 w-28 sm:w-40 lg:w-56 bg-gradient-to-r from-white via-white/35 to-transparent z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Institutional Team Copy & Lawyers Info placed more to the left */}
          <div className="lg:col-span-6 flex flex-col justify-center lg:-ml-8 xl:-ml-16 2xl:-ml-24 max-w-xl lg:max-w-none">
            {/* Kicker with Line */}
            <div className="flex items-center gap-3.5 mb-5">
              <span
                className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#8C6F36] font-semibold"
                style={{ fontFamily: "'Cinzel', Georgia, serif" }}
              >
                NOSSA EQUIPE
              </span>
              <span className="w-16 sm:w-24 h-[1.5px] bg-[#8C6F36]/50" />
            </div>

            {/* Title matching reference image */}
            <h2
              className="text-3xl sm:text-4xl lg:text-[2.85rem] font-normal leading-[1.14] mb-5 text-[#17130F]"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              Profissionais<br />
              comprometidos<br />
              <span className="text-[#8C6F36] italic font-normal">com a sua causa.</span>
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base lg:text-[1.05rem] text-[#2E2721] font-normal leading-relaxed mb-6 max-w-lg">
              Contamos com uma equipe de advogados qualificados, prontos para oferecer um atendimento personalizado e soluções jurídicas eficazes nas esferas criminal, cível e familiar.
            </p>

            {/* Lawyers OAB Credentials Strip */}
            <div className="pt-5 border-t border-[#8C6F36]/25 mb-8 max-w-lg">
              <span
                className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#8C6F36] font-semibold block mb-3.5"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Advogados Integrantes
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="p-3 rounded-xl bg-[#F8F6F1] border border-[#8C6F36]/30 shadow-sm">
                  <h4 className="text-xs sm:text-sm font-semibold text-[#17130F] leading-tight">Miguel Nicolau Junior</h4>
                  <span className="text-[11px] text-[#8C6F36] font-mono mt-1 block font-medium">OAB/PR 7.708</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F8F6F1] border border-[#8C6F36]/30 shadow-sm">
                  <h4 className="text-xs sm:text-sm font-semibold text-[#17130F] leading-tight">Elizanne Marcondes Soares</h4>
                  <span className="text-[11px] text-[#8C6F36] font-mono mt-1 block font-medium">OAB/PR 108.487</span>
                </div>
                <div className="p-3 rounded-xl bg-[#F8F6F1] border border-[#8C6F36]/30 shadow-sm">
                  <h4 className="text-xs sm:text-sm font-semibold text-[#17130F] leading-tight">Felipe Colman Bahls</h4>
                  <span className="text-[11px] text-[#8C6F36] font-mono mt-1 block font-medium">OAB/PR 108.488</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#17130F] hover:bg-[#8C6F36] text-[#FAF8F4] text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md hover:scale-[1.02] active:scale-[0.99] cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#FAF8F4]" />
                <span>Falar com nossos advogados</span>
              </a>

              <a
                href={scheduleWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#8C6F36] text-[#17130F] hover:bg-[#8C6F36]/10 text-xs sm:text-sm font-semibold tracking-wide transition-colors cursor-pointer"
              >
                <span>Agendar atendimento</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile Framed Team Photo (Moldura elegante abaixo dos textos e informações) */}
            <div className="block lg:hidden mt-8 sm:mt-10 w-full reveal-on-scroll">
              <div className="relative rounded-2xl p-2 bg-gradient-to-br from-[#EAD9BA] via-[#D6B779] to-[#8C6F36] shadow-xl">
                <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-[#17130F]">
                  <img
                    src="/team_congresso.webp"
                    alt="Advogados da Advocacia Nicolau"
                    className="w-full h-full object-cover object-[center_12%]"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = '/team_congresso.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-medium tracking-wide">
                    <span className="font-serif">Equipe Advocacia Nicolau</span>
                    <span className="text-[#D6B779] text-[10px] uppercase font-mono tracking-wider">Desde 1978 · Guarapuava/PR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Spacer where the full-bleed team image shows through */}
          <div className="lg:col-span-6 hidden lg:block" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};
