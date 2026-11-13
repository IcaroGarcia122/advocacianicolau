import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, MessageSquare, X } from 'lucide-react';
import { ContactInfo, initialContactInfo } from '../data/officeData';

interface AboutProps {
  contactInfo?: ContactInfo;
}

export const About: React.FC<AboutProps> = ({ contactInfo = initialContactInfo }) => {
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const whatsappUrl = `https://wa.me/${contactInfo.whatsappNumberDigits}?text=${encodeURIComponent(
    'Olá! Gostaria de falar com a Advocacia Nicolau sobre os serviços do escritório.'
  )}`;

  return (
    <section id="sobre" className="relative z-10 pt-20 lg:pt-28 pb-0 bg-[#241A14] text-[#FAF8F4] overflow-hidden shadow-[0_-25px_60px_rgba(0,0,0,0.6)]">
      {/* Subtle Golden Logo Watermark in the background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full lg:w-3/5 h-full pointer-events-none opacity-[0.045] select-none flex items-center justify-end overflow-hidden z-0">
        <img
          src="/logo_nicolau_dourado.webp"
          alt=""
          className="w-[34rem] sm:w-[46rem] lg:w-[56rem] max-w-none h-auto object-contain translate-x-1/4 filter contrast-125"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            const target = e.currentTarget;
            target.src = '/logo_nicolau_dourado.png';
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
          
          {/* Left Column: Enlarged Balança da Justiça shifted further left and rising taller upwards */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start justify-end self-end order-2 lg:order-1 relative">
            <div className="relative flex flex-col items-center lg:items-start justify-end w-full lg:-ml-20 xl:-ml-36 2xl:-ml-44 lg:-mt-40 xl:-mt-60 2xl:-mt-72 -translate-y-8 sm:-translate-y-16 lg:-translate-y-28 pointer-events-none select-none">
              <img
                src="/balanca_livros.webp"
                alt="Balança da Justiça com Livros Jurídicos - Advocacia Nicolau"
                className="w-full max-w-[580px] sm:max-w-[680px] lg:max-w-[850px] xl:max-w-[960px] 2xl:max-w-[1050px] h-auto object-contain object-bottom drop-shadow-[0_25px_35px_rgba(0,0,0,0.5)] block -mb-1 scale-105 lg:scale-115 xl:scale-125 lg:origin-bottom-left"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.src = '/balanca_livros.png';
                }}
              />
              {/* Soft floor shadow underneath the balance and books */}
              <div className="w-4/5 max-w-[560px] h-4 bg-black/40 blur-md rounded-[100%] -mt-1 pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Writings 'Sobre o Escritório' on rich brown background */}
          <div className="lg:col-span-6 flex flex-col justify-center items-start lg:pl-6 pb-16 lg:pb-24 order-1 lg:order-2">
            {/* Kicker with Line */}
            <div className="flex items-center gap-3.5 mb-5">
              <span
                className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#CBA86B] font-semibold"
                style={{ fontFamily: "'Cinzel', Georgia, serif" }}
              >
                SOBRE O ESCRITÓRIO
              </span>
              <span className="w-16 sm:w-24 h-[1.5px] bg-[#CBA86B]/60" />
            </div>

            {/* Title with increased size */}
            <h2
              className="text-3xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] text-[#FAF8F4] font-normal leading-[1.12] mb-6 tracking-normal"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              Uma trajetória de<br />
              <span className="text-[#CBA86B] italic font-normal">mais de quatro décadas.</span>
            </h2>

            {/* Paragraphs with high legibility */}
            <div className="space-y-5 text-base sm:text-lg lg:text-[1.125rem] text-[#FAF8F4]/85 font-light leading-relaxed mb-9 max-w-xl">
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

            {/* Button */}
            <div>
              <button
                onClick={() => setIsHistoryModalOpen(true)}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#CBA86B] hover:bg-[#D6B779] text-[#17130F] text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-[#CBA86B]/25 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CBA86B]"
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
                  Hoje, com uma equipe renovada e multidisciplinar, combinamos o legado de quase meio
                  século de tradição e ética forense com as mais modernas estratégias processuais e
                  tecnologia jurídica, assegurando defesa técnica rigorosa e personalizada.
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
