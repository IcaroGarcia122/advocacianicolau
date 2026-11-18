import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, MessageSquare, Phone } from 'lucide-react';
import { ContactInfo, PracticeArea } from '../data/officeData';
import { Logo } from './Logo';

interface PracticeAreaDetailPageProps {
  area: PracticeArea;
  allAreas: PracticeArea[];
  contactInfo: ContactInfo;
  onBackToHome: () => void;
  onBackToAreas: () => void;
  onSelectArea: (areaId: string) => void;
  onScheduleWithArea: (areaTitle: string) => void;
}

export const PracticeAreaDetailPage: React.FC<PracticeAreaDetailPageProps> = ({
  area,
  allAreas,
  contactInfo,
  onBackToHome,
  onBackToAreas,
  onSelectArea,
  onScheduleWithArea,
}) => {
  const whatsappUrl = `https://wa.me/${contactInfo.whatsappNumberDigits}?text=${encodeURIComponent(
    `Olá! Gostaria de falar com a Advocacia Nicolau sobre atendimento em ${area.title}.`
  )}`;

  const otherAreas = allAreas.filter((item) => item.id !== area.id);

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#17130F] flex flex-col font-sans">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-[#17130F] text-[#FAF8F4] border-b border-[#B89554]/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              type="button"
              onClick={onBackToAreas}
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#D6B779] hover:text-[#FAF8F4] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Áreas de Atuação</span>
            </button>
            <span className="hidden sm:inline text-[#B89554]/40">|</span>
            <button
              type="button"
              onClick={onBackToHome}
              className="hidden sm:inline-flex text-xs text-[#FAF8F4]/70 hover:text-[#D6B779] transition-colors cursor-pointer"
            >
              Página Inicial
            </button>
          </div>

          <button type="button" onClick={onBackToHome} className="cursor-pointer" aria-label="Advocacia Nicolau">
            <Logo variant="gold" size="sm" />
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B89554] hover:bg-[#D6B779] text-[#17130F] text-xs font-semibold tracking-wide transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
            <span className="sm:hidden">Contato</span>
          </a>
        </div>
      </header>

      {/* Clean Area Switcher Strip */}
      <div className="bg-[#1E1813] text-[#FAF8F4] border-b border-[#B89554]/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <span
            className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#D6B779]"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Especialidades do Escritório
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {allAreas.map((item) => {
              const isCurrent = item.id === area.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectArea(item.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-[#B89554] text-[#17130F] font-semibold shadow-sm'
                      : 'bg-white/5 text-[#FAF8F4]/80 hover:bg-white/10 hover:text-[#D6B779] border border-[#B89554]/25'
                  }`}
                >
                  {item.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Clean Typography-Led Content */}
      <main className="flex-1 py-12 sm:py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Editorial Header */}
          <div className="border-b border-[#B89554]/30 pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1.5px] bg-[#8C6F36]" />
              <span
                className="text-xs uppercase tracking-[0.26em] text-[#8C6F36] font-semibold"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                ÁREA DE ATUAÇÃO
              </span>
            </div>

            <h1
              className="text-3xl sm:text-5xl lg:text-[3.25rem] font-normal text-[#17130F] leading-[1.1] mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {area.title}
            </h1>

            <p className="text-lg sm:text-xl text-[#8C6F36] italic font-normal mb-5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {area.subtitle}
            </p>

            <p className="text-base text-[#2E2721] font-light leading-relaxed max-w-3xl">
              {area.description}
            </p>
          </div>

          {/* Detailed Structured Services List (Clean, no legal symbols/clutter) */}
          <section aria-labelledby="services-heading">
            <div className="flex items-center justify-between mb-6">
              <h2
                id="services-heading"
                className="text-xs uppercase tracking-[0.24em] text-[#8C6F36] font-semibold"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Serviços Jurídicos e Frentes de Atuação
              </h2>
              <span className="text-xs text-[#2E2721]/65 font-mono tabular-nums">
                {area.services.length} especialidades
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {area.services.map((service, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-4 sm:p-5 bg-white border border-[#B89554]/25 rounded-2xl shadow-sm"
                >
                  <span className="text-xs font-mono font-semibold text-[#8C6F36] pt-0.5 tabular-nums shrink-0">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <div className="flex-1 flex items-start justify-between gap-2">
                    <span className="text-sm sm:text-base text-[#17130F] font-normal leading-snug">
                      {service}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-[#B89554] shrink-0 mt-0.5" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Direct Contact Strip */}
          <section className="p-6 sm:p-8 rounded-3xl bg-[#17130F] text-[#FAF8F4] border border-[#B89554]/35 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-xl">
              <span
                className="text-[10px] uppercase tracking-[0.24em] text-[#D6B779] font-semibold block"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Atendimento Especializado
              </span>
              <h3
                className="text-2xl font-normal text-[#FAF8F4]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Precisa de orientação em {area.title}?
              </h3>
              <p className="text-xs sm:text-sm text-[#FAF8F4]/75 font-light">
                Entre em contato com nossa equipe em Guarapuava/PR pelo WhatsApp ou encaminhe sua mensagem pelo formulário institucional.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#B89554] hover:bg-[#D6B779] text-[#17130F] text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={() => onScheduleWithArea(area.title)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#B89554]/60 text-[#FAF8F4] hover:bg-[#B89554]/15 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-[#D6B779]" />
                <span>Formulário</span>
              </button>
            </div>
          </section>

          {/* Other Areas Links */}
          <section className="pt-4 border-t border-[#B89554]/25">
            <h3
              className="text-xs uppercase tracking-[0.24em] text-[#8C6F36] font-semibold mb-4"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Outras Áreas de Atuação
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {otherAreas.map((other) => (
                <button
                  key={other.id}
                  type="button"
                  onClick={() => onSelectArea(other.id)}
                  className="group p-5 rounded-2xl bg-white border border-[#B89554]/30 hover:border-[#8C6F36] shadow-sm hover:shadow-md transition-all text-left cursor-pointer flex items-center justify-between gap-4"
                >
                  <div>
                    <h4
                      className="text-base font-semibold text-[#17130F] group-hover:text-[#8C6F36] transition-colors"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {other.title}
                    </h4>
                    <p className="text-xs text-[#2E2721]/75 mt-1">{other.subtitle}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#8C6F36] shrink-0 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="bg-[#100D0B] text-[#FAF8F4]/75 border-t border-[#B89554]/25 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span>
            Advocacia Nicolau — {contactInfo.address}, {contactInfo.city}/{contactInfo.state}
          </span>
          <button
            type="button"
            onClick={onBackToAreas}
            className="text-[#D6B779] hover:underline cursor-pointer"
          >
            Voltar para Áreas de Atuação
          </button>
        </div>
      </footer>
    </div>
  );
};
