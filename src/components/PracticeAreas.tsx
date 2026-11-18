import React from 'react';
import { ContactInfo, initialContactInfo, practiceAreas } from '../data/officeData';
import { ArrowRight } from 'lucide-react';

interface PracticeAreasProps {
  contactInfo?: ContactInfo;
  onSelectAreaPage?: (areaId: string) => void;
  onSelectAreaForContact?: (areaTitle: string) => void;
}

export const PracticeAreas: React.FC<PracticeAreasProps> = ({
  onSelectAreaPage,
}) => {
  const handleOpenArea = (areaId: string) => {
    if (onSelectAreaPage) {
      onSelectAreaPage(areaId);
    } else {
      window.location.hash = `area/${encodeURIComponent(areaId)}`;
    }
  };

  return (
    <section id="areas" className="py-20 lg:py-28 bg-[#FAF7F2] text-[#17130F] overflow-hidden relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading and intro */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <div className="flex items-center gap-3.5 mb-5">
              <span
                className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#8C6F36] font-semibold"
                style={{ fontFamily: "'Cinzel', Georgia, serif" }}
              >
                ÁREAS DE ATUAÇÃO
              </span>
              <span className="w-16 sm:w-24 h-[1.5px] bg-[#8C6F36]/60" />
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-normal leading-[1.15] mb-5 text-[#17130F]"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                textWrap: 'balance',
              }}
            >
              Atuação em Direito Criminal,{' '}
              <span className="text-[#8C6F36] italic font-normal">Civil e de Família.</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#282019]/85 font-light leading-relaxed mb-8 max-w-sm">
              O escritório atua especialmente em três grandes áreas do Direito, combinando mais de quatro décadas de experiência forense com atendimento personalizado e rigor técnico.
            </p>

            <div>
              <button
                type="button"
                onClick={() => handleOpenArea(practiceAreas[0].id)}
                className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-[#B89554] text-[#17130F] text-xs font-medium tracking-wider hover:bg-[#B89554] hover:text-[#FAF8F4] transition-all duration-300 cursor-pointer group shadow-sm focus-visible:outline-none"
              >
                <span>Ver páginas das especialidades</span>
                <ArrowRight className="w-4 h-4 text-[#8C6F36] group-hover:text-[#FAF8F4] transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right 3 Columns: Clean, sober typographic columns without decorative legal symbols */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-3">
              {practiceAreas.map((area, index) => (
                <div
                  key={area.id}
                  onClick={() => handleOpenArea(area.id)}
                  className="p-6 sm:p-8 flex flex-col justify-between items-start text-left group border-t md:border-t-0 md:border-l border-[#B89554]/30 hover:bg-white/70 transition-colors cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between w-full mb-5">
                      <span
                        className="text-2xl font-light text-[#8C6F36] tabular-nums"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="w-8 h-[1px] bg-[#B89554]/60" />
                    </div>

                    <h3
                      className="text-base font-semibold tracking-[0.14em] uppercase text-[#17130F] group-hover:text-[#8C6F36] transition-colors mb-3 leading-snug"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {area.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#282019]/80 font-light leading-relaxed mb-5">
                      {area.subtitle}.
                    </p>

                    <p className="text-[11px] text-[#8C6F36] font-medium mb-6">
                      {area.services.slice(0, 3).join(' · ')}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenArea(area.id);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-[#8C6F36] group-hover:text-[#17130F] font-semibold tracking-wide cursor-pointer"
                  >
                    <span>Ver todas as {area.services.length} frentes</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const _unusedDefaultContact = initialContactInfo;
