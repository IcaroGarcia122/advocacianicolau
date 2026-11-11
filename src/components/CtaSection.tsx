import React from 'react';
import { MapPin } from 'lucide-react';
import { ContactInfo } from '../data/officeData';

interface CtaSectionProps {
  contactInfo: ContactInfo;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ contactInfo }) => {
  const whatsappUrl = `https://wa.me/${contactInfo.whatsappNumberDigits}?text=${encodeURIComponent(
    'Olá! Gostaria de falar com a Advocacia Nicolau a respeito de uma consulta jurídica.'
  )}`;

  return (
    <section className="relative bg-[#16120E] text-[#FAF8F4] overflow-hidden border-t border-[#B89554]/30 shadow-2xl min-h-[140px] flex items-center">
      {/* Top subtle transition bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FAF7F2]/20 via-[#B89554]/40 to-[#FAF7F2]/20 z-10" />

      {/* Full-bleed background image taking the ENTIRE section with gradient and blur */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src="/fountain_pen_crop.webp"
          alt="Caneta tinteiro e documentos jurídicos"
          className="w-full h-full object-cover object-left filter brightness-[0.92] contrast-[1.08]"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            const target = e.currentTarget;
            target.src = '/fountain_pen_crop.png';
          }}
          referrerPolicy="no-referrer"
        />
        {/* Degrade horizontal pegando a sessão inteira para destacar as palavras */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#16120E]/20 via-[#16120E]/85 to-[#16120E]" />
        {/* Subtle blur across center and right */}
        <div className="absolute inset-0 backdrop-blur-[0.5px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-9 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
          
          {/* Left Block: Vertical divider + Headings matching reference image */}
          <div className="flex items-center gap-6 sm:gap-7 w-full lg:w-auto">
            {/* Vertical Golden Divider Line */}
            <div className="hidden sm:block w-[1.5px] h-16 lg:h-20 bg-[#CBA86B]/60 self-center shrink-0" />

            {/* Heading & Subtitle matching image with Playfair Display */}
            <div className="flex flex-col text-left">
              <h2
                className="text-2xl sm:text-3xl lg:text-[2rem] text-[#FAF8F4] font-normal leading-[1.18] mb-1.5"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                Conte com a experiência e a tradição<br />
                da Advocacia Nicolau.
              </h2>
              <p className="text-xs sm:text-sm text-[#FAF8F4]/80 font-light leading-relaxed max-w-xl">
                Estamos prontos para atendê-lo e encontrar a melhor solução para o seu caso.
              </p>
            </div>
          </div>

          {/* Right Block: WhatsApp Gold Button + Guarapuava Location */}
          <div className="flex flex-col items-center lg:items-end justify-center gap-2.5 shrink-0 w-full sm:w-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 bg-[#CBA86B] hover:bg-[#D6B779] text-[#17130F] font-semibold text-xs sm:text-sm tracking-wide rounded-full transition-all duration-300 shadow-lg hover:shadow-[#CBA86B]/20 hover:scale-[1.02] cursor-pointer whitespace-nowrap active:scale-[0.99]"
            >
              {/* WhatsApp custom vector icon */}
              <svg
                className="w-4 h-4 fill-current shrink-0"
                viewBox="0 0 24 24"
              >
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.991.542 1.777.814 2.801.814 3.181 0 5.766-2.587 5.766-5.766.001-3.181-2.585-5.766-5.771-5.766zm6.84 5.766c-.001 3.771-3.069 6.839-6.84 6.839-1.208 0-2.336-.316-3.32-.864l-3.711.973.99-3.621c-.604-.997-.959-2.164-.959-3.327.001-3.771 3.069-6.84 6.84-6.84 3.77 0 6.84 3.069 6.84 6.84z" />
              </svg>
              <span>Fale conosco pelo WhatsApp</span>
            </a>

            <div className="flex items-center gap-1.5 text-xs text-[#FAF8F4]/80 pt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#CBA86B]" />
              <span className="text-xs tracking-wider text-[#FAF8F4]/80 font-normal">
                Guarapuava – PR
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

