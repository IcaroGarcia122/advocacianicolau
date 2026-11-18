import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, MapPin, MessageSquare, X } from 'lucide-react';
import { ContactInfo, editorialVisualAssets, initialContactInfo } from '../data/officeData';

interface AboutProps {
  contactInfo?: ContactInfo;
}

export const About: React.FC<AboutProps> = ({ contactInfo = initialContactInfo }) => {
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [activeOfficePhoto, setActiveOfficePhoto] = useState<number>(0);

  const officePhotos = [
    {
      src: editorialVisualAssets.facade,
      alt: 'Fachada frontal da sede própria da Advocacia Nicolau em Guarapuava, PR',
      caption: 'Fachada Frontal',
    },
    {
      src: editorialVisualAssets.facadeAngle,
      alt: 'Vista externa da sede da Advocacia Nicolau em Guarapuava, PR',
      caption: 'Vista Externa da Sede',
    },
  ];

  const whatsappUrl = `https://wa.me/${contactInfo.whatsappNumberDigits}?text=${encodeURIComponent(
    'Olá! Gostaria de falar com a Advocacia Nicolau sobre os serviços do escritório.'
  )}`;

  return (
    <section
      id="sobre"
      className="relative z-10 py-20 lg:py-28 bg-[#1E1712] text-[#FAF8F4] overflow-hidden border-t border-[#B89554]/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Real Architectural Photography Gallery of the Office */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-[#B89554]/35 bg-[#140F0C] shadow-2xl">
              {/* Main Active View */}
              <div className="aspect-[16/10] w-full overflow-hidden bg-[#140F0C]">
                <img
                  src={officePhotos[activeOfficePhoto]?.src || editorialVisualAssets.facade}
                  alt={officePhotos[activeOfficePhoto]?.alt || 'Sede da Advocacia Nicolau'}
                  className="w-full h-full object-cover object-center transition-opacity duration-300"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = editorialVisualAssets.reception;
                  }}
                />
              </div>

              {/* Dual-Photo Selector Strip displaying both office images */}
              <div className="grid grid-cols-2 gap-2.5 p-3 bg-[#100C09] border-t border-[#B89554]/20">
                {officePhotos.map((photo, idx) => {
                  const isSelected = activeOfficePhoto === idx;
                  return (
                    <button
                      key={photo.caption}
                      type="button"
                      onClick={() => setActiveOfficePhoto(idx)}
                      className={`group relative overflow-hidden rounded-lg border transition-all text-left cursor-pointer focus-visible:outline-none ${
                        isSelected
                          ? 'border-[#D6B779] ring-1 ring-[#D6B779]/60 opacity-100'
                          : 'border-[#B89554]/25 opacity-75 hover:opacity-100 hover:border-[#B89554]/60'
                      }`}
                    >
                      <div className="aspect-[16/9] w-full overflow-hidden bg-[#17130F]">
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-300"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="px-5 py-4 sm:px-6 sm:py-4 bg-[#140F0C] border-t border-[#B89554]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs text-[#FAF8F4]/90 font-normal">
                  <MapPin className="w-3.5 h-3.5 text-[#D6B779] shrink-0" />
                  <span>
                    {contactInfo.address} · {contactInfo.city}/{contactInfo.state === 'Paraná' ? 'PR' : contactInfo.state}
                  </span>
                </div>
                <span
                  className="text-[10px] uppercase tracking-[0.22em] text-[#D6B779] font-medium whitespace-nowrap"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Sede Própria · Desde 1978
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial History Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center items-start order-1 lg:order-2">
            <div className="flex items-center gap-3.5 mb-5">
              <span
                className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#CBA86B] font-semibold"
                style={{ fontFamily: "'Cinzel', Georgia, serif" }}
              >
                O ESCRITÓRIO
              </span>
              <span className="w-16 sm:w-24 h-[1.5px] bg-[#CBA86B]/60" />
            </div>

            <h2
              className="text-3xl sm:text-5xl lg:text-[3.15rem] text-[#FAF8F4] font-normal leading-[1.12] mb-6 tracking-normal"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                textWrap: 'balance',
              }}
            >
              Uma trajetória de<br />
              <span className="text-[#CBA86B] italic font-normal">mais de quatro décadas.</span>
            </h2>

            <div className="space-y-5 text-base sm:text-lg text-[#FAF8F4]/85 font-light leading-relaxed mb-8 max-w-xl">
              <p>
                O Escritório de Advocacia Nicolau foi fundado em 1978, na cidade de Guarapuava,
                Paraná, e possui uma trajetória consolidada na prestação de serviços jurídicos,
                pautada pela seriedade, ética, comprometimento e dedicação à defesa dos interesses de
                seus clientes.
              </p>
              <p>
                Nossa proposta é aliar a tradição de um escritório com décadas de história a uma
                atuação jurídica atualizada, técnica e estratégica nas esferas do Direito Criminal,
                Direito Civil e Direito de Família.
              </p>
            </div>

            {/* Clean Architectural Foundation Strip */}
            <div className="w-full max-w-xl grid grid-cols-3 gap-4 py-5 mb-8 border-y border-[#B89554]/25">
              <div>
                <span
                  className="block text-2xl sm:text-3xl font-normal text-[#D6B779]"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  1978
                </span>
                <span className="text-[11px] text-[#FAF8F4]/70 font-light">
                  Ano de fundação
                </span>
              </div>
              <div>
                <span
                  className="block text-2xl sm:text-3xl font-normal text-[#D6B779]"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  +45 anos
                </span>
                <span className="text-[11px] text-[#FAF8F4]/70 font-light">
                  De atuação contínua
                </span>
              </div>
              <div>
                <span
                  className="block text-2xl sm:text-3xl font-normal text-[#D6B779]"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  OAB/PR
                </span>
                <span className="text-[11px] text-[#FAF8F4]/70 font-light">
                  Tradição desde nº 7.708
                </span>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => setIsHistoryModalOpen(true)}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#CBA86B] hover:bg-[#D6B779] text-[#17130F] text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer group shadow-lg hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CBA86B]"
              >
                <span>Saiba mais sobre nossa história</span>
                <ArrowRight className="w-4 h-4 text-[#17130F] group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* History Details Modal rendered in document.body */}
      {isHistoryModalOpen &&
        createPortal(
          <div
            onClick={() => setIsHistoryModalOpen(false)}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
            role="dialog"
            aria-modal="true"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-[#FFFFFF] text-[#17130F] border border-[#B89554] p-6 sm:p-10 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setIsHistoryModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-[#17130F]/70 hover:text-[#17130F] focus:outline-none cursor-pointer"
                aria-label="Fechar história"
              >
                <X className="w-5 h-5" />
              </button>

              <span
                className="text-xs uppercase tracking-[0.25em] text-[#8C6F36] font-semibold"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                DESDE 1978 · GUARAPUAVA/PR
              </span>

              <h3
                className="text-2xl sm:text-3xl font-serif text-[#17130F] mt-2 mb-6"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Mais de 4 Décadas de Tradição e Excelência
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-[#2E2721] font-normal leading-relaxed border-t border-[#B89554]/30 pt-6">
                <p>
                  Fundado pelo Dr. Miguel Nicolau Junior em 1978, o escritório iniciou suas atividades
                  em uma época de grandes transformações sociojurídicas no Paraná. Desde o início, a
                  banca se pautou pela atuação combativa na advocacia criminal e na proteção dos direitos
                  civis e das famílias da região centro-sul paranaense.
                </p>
                <p>
                  Ao longo de sua história, o escritório construiu sua identidade profissional com base
                  na atuação jurídica responsável, no atendimento personalizado e no acompanhamento
                  cuidadoso de cada demanda.
                </p>
                <p>
                  Hoje, combinamos o legado de quase meio século de tradição e ética forense com uma
                  atuação técnica personalizada, assegurando seriedade e rigor em cada caso confiado
                  à nossa equipe.
                </p>
              </div>

              <div className="pt-6 border-t border-[#B89554]/25 flex flex-wrap items-center justify-end gap-3 mt-6">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsHistoryModalOpen(false)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#CBA86B] text-[#17130F] text-xs uppercase tracking-widest rounded-full font-semibold hover:bg-[#D6B779] transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Falar pelo WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsHistoryModalOpen(false)}
                  className="px-6 py-2.5 bg-[#17130F] text-[#FAF8F4] text-xs uppercase tracking-widest rounded-full font-medium hover:bg-[#8C6F36] transition-colors cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};
