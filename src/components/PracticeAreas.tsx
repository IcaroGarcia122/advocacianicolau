import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { ContactInfo, initialContactInfo, practiceAreas, PracticeArea } from '../data/officeData';
import { ArrowRight, CheckCircle2, MessageSquare, X } from 'lucide-react';

interface PracticeAreasProps {
  contactInfo?: ContactInfo;
  onSelectAreaForContact?: (areaTitle: string) => void;
}

export const PracticeAreas: React.FC<PracticeAreasProps> = ({
  contactInfo = initialContactInfo,
}) => {
  const [selectedArea, setSelectedArea] = useState<PracticeArea | null>(null);

  return (
    <section id="areas" className="py-20 lg:py-28 bg-[#FAF7F2] text-[#17130F] overflow-hidden relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Heading and intro button */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            {/* Kicker with Line */}
            <div className="flex items-center gap-3.5 mb-5">
              <span
                className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#8C6F36] font-semibold"
                style={{ fontFamily: "'Cinzel', Georgia, serif" }}
              >
                ÁREAS DE ATUAÇÃO
              </span>
              <span className="w-16 sm:w-24 h-[1.5px] bg-[#8C6F36]/60" />
            </div>

            {/* Title */}
            <h2
              className="text-3xl sm:text-4xl lg:text-[2.85rem] font-normal leading-[1.14] mb-5 text-[#17130F]"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
              }}
            >
              Atuação completa<br />
              nas principais áreas<br />
              <span className="text-[#8C6F36] italic font-normal">do Direito.</span>
            </h2>

            {/* Subtitle matching exact user prompt */}
            <p className="text-xs sm:text-sm text-[#282019]/85 font-light leading-relaxed mb-8 max-w-sm">
              O escritório atua especialmente em três grandes áreas do Direito: Direito Criminal, Direito Civil e Direito de Família, combinando tradição e rigor técnico.
            </p>

            {/* Pill Button */}
            <div>
              <button
                onClick={() => setSelectedArea(practiceAreas[0])}
                className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-[#B89554] text-[#17130F] text-xs font-medium tracking-wider hover:bg-[#B89554] hover:text-[#FAF8F4] transition-all duration-300 cursor-pointer group shadow-sm focus-visible:outline-none"
              >
                <span>Ver todas as especialidades</span>
                <ArrowRight className="w-4 h-4 text-[#8C6F36] group-hover:text-[#FAF8F4] transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right 3 Columns: Grid with vertical separator lines */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-3">
              {/* Direito Criminal */}
              <div className="p-6 sm:p-8 flex flex-col justify-between items-center text-center group border-t md:border-t-0 md:border-l border-[#B89554]/30">
                <div>
                  {/* Custom Balança Icon */}
                  <div className="mb-6 flex justify-center text-[#B89554] group-hover:scale-105 transition-transform duration-300">
                    <svg
                      className="w-12 h-12 stroke-current fill-none"
                      viewBox="0 0 48 48"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M24 6v36M12 42h24M6 14l18-4 18 4" />
                      <path d="M8 15l-4 12h12L12 15M40 15l-4 12h12l-4-12" />
                    </svg>
                  </div>

                  <h3
                    className="text-sm font-semibold tracking-[0.2em] uppercase text-[#17130F] mb-3 leading-tight"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    DIREITO<br />CRIMINAL
                  </h3>

                  <p className="text-xs text-[#282019]/75 font-light leading-relaxed mb-4">
                    Defesa técnica e estratégica em todas as fases da persecução penal.
                  </p>

                  <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#17130F]/5 text-[#8C6F36] border border-[#B89554]/25">
                      Tribunal do Júri
                    </span>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#17130F]/5 text-[#8C6F36] border border-[#B89554]/25">
                      Habeas Corpus
                    </span>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#17130F]/5 text-[#8C6F36] border border-[#B89554]/25">
                      Custódia
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedArea(practiceAreas[0])}
                  className="inline-flex items-center gap-1.5 text-xs text-[#8C6F36] group-hover:text-[#17130F] font-medium tracking-wider cursor-pointer"
                >
                  <span>Ver todas as 14 frentes</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* Direito Civil */}
              <div className="p-6 sm:p-8 flex flex-col justify-between items-center text-center group border-t md:border-t-0 md:border-l border-[#B89554]/30">
                <div>
                  {/* Custom Handshake Icon */}
                  <div className="mb-6 flex justify-center text-[#B89554] group-hover:scale-105 transition-transform duration-300">
                    <svg
                      className="w-12 h-12 stroke-current fill-none"
                      viewBox="0 0 48 48"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 26l6 6 8-8-6-6-8 8z" />
                      <path d="M6 22l8-8 10 4 8-8 10 10-12 12-4-4" />
                      <path d="M28 34l6-6 8 8" />
                    </svg>
                  </div>

                  <h3
                    className="text-sm font-semibold tracking-[0.2em] uppercase text-[#17130F] mb-3 leading-tight"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    DIREITO<br />CIVIL
                  </h3>

                  <p className="text-xs text-[#282019]/75 font-light leading-relaxed mb-4">
                    Proteção dos seus direitos patrimoniais, contratuais e possessórios.
                  </p>

                  <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#17130F]/5 text-[#8C6F36] border border-[#B89554]/25">
                      Indenizações
                    </span>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#17130F]/5 text-[#8C6F36] border border-[#B89554]/25">
                      Contratos
                    </span>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#17130F]/5 text-[#8C6F36] border border-[#B89554]/25">
                      Inventários
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedArea(practiceAreas[1])}
                  className="inline-flex items-center gap-1.5 text-xs text-[#8C6F36] group-hover:text-[#17130F] font-medium tracking-wider cursor-pointer"
                >
                  <span>Ver todas as 9 frentes</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* Direito de Família */}
              <div className="p-6 sm:p-8 flex flex-col justify-between items-center text-center group border-t md:border-t-0 md:border-l border-[#B89554]/30">
                <div>
                  {/* Custom Family Icon */}
                  <div className="mb-6 flex justify-center text-[#B89554] group-hover:scale-105 transition-transform duration-300">
                    <svg
                      className="w-12 h-12 stroke-current fill-none"
                      viewBox="0 0 48 48"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="16" cy="14" r="5" />
                      <circle cx="32" cy="14" r="5" />
                      <path d="M8 38v-4a8 8 0 0116 0v4M24 38v-4a8 8 0 0116 0v4" />
                      <circle cx="24" cy="24" r="3" />
                      <path d="M20 38v-2a4 4 0 018 0v2" />
                    </svg>
                  </div>

                  <h3
                    className="text-sm font-semibold tracking-[0.2em] uppercase text-[#17130F] mb-3 leading-tight"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    DIREITO<br />DE FAMÍLIA
                  </h3>

                  <p className="text-xs text-[#282019]/75 font-light leading-relaxed mb-4">
                    Soluções jurídicas e acolhimento em questões familiares e sucessórias.
                  </p>

                  <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#17130F]/5 text-[#8C6F36] border border-[#B89554]/25">
                      Divórcios
                    </span>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#17130F]/5 text-[#8C6F36] border border-[#B89554]/25">
                      Guarda & Visitas
                    </span>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#17130F]/5 text-[#8C6F36] border border-[#B89554]/25">
                      Partilha de Bens
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedArea(practiceAreas[2])}
                  className="inline-flex items-center gap-1.5 text-xs text-[#8C6F36] group-hover:text-[#17130F] font-medium tracking-wider cursor-pointer"
                >
                  <span>Ver todas as 10 frentes</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Practice Area Modal with Full Service List rendered in document.body */}
      {selectedArea &&
        createPortal(
          <div
            onClick={() => setSelectedArea(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
            role="dialog"
            aria-modal="true"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-[#FAF7F2] border border-[#B89554] p-6 sm:p-10 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedArea(null)}
                className="absolute top-4 right-4 p-2 text-[#17130F]/70 hover:text-[#17130F] focus:outline-none cursor-pointer"
                aria-label="Fechar detalhes"
              >
                <X className="w-5 h-5" />
              </button>

              <span
                className="text-xs uppercase tracking-[0.25em] text-[#8C6F36] font-semibold"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                ESPECIALIDADE
              </span>

              <h3
                className="text-2xl sm:text-3xl text-[#17130F] font-semibold mt-1 mb-2 tracking-wide"
                style={{ fontFamily: "'Cinzel', Georgia, serif" }}
              >
                {selectedArea.title}
              </h3>

              <p className="text-sm sm:text-base text-[#282019]/80 font-light leading-relaxed mb-6 border-b border-[#B89554]/25 pb-5">
                {selectedArea.description}
              </p>

              <h4
                className="text-xs uppercase tracking-[0.2em] text-[#8C6F36] font-semibold mb-4"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Principais Frentes de Atuação:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
                {selectedArea.services.map((service, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 bg-white border border-[#B89554]/20 rounded-lg text-xs sm:text-sm text-[#17130F]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#B89554] shrink-0 mt-0.5" />
                    <span className="font-light leading-snug">{service}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-[#B89554]/25">
                <span className="text-xs text-[#282019]/70">
                  Atendimento sob medida em {selectedArea.title}.
                </span>

                <a
                  href={`https://wa.me/${contactInfo.whatsappNumberDigits}?text=${encodeURIComponent(
                    `Olá! Gostaria de consultar um especialista da Advocacia Nicolau sobre ${selectedArea.title}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSelectedArea(null)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#B89554] text-white font-medium text-xs uppercase tracking-wider rounded-full hover:bg-[#8C6F36] transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Consultar Especialistas</span>
                </a>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};
