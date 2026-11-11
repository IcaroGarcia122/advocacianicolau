import React, { useState, useEffect } from 'react';
import { ArrowLeft, Building2, FileText, ShieldCheck, Scale, CheckCircle2, MessageSquare, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import {
  ContactInfo,
  initialContactInfo,
  CorporateSettings,
  getStoredCorporateSettings,
} from '../data/officeData';
import { Logo } from './Logo';

interface CorporatePageProps {
  contactInfo?: ContactInfo;
  onBackToHome: () => void;
  onConsultCorporate?: (subject: string) => void;
}

export const CorporatePage: React.FC<CorporatePageProps> = ({
  contactInfo = initialContactInfo,
  onBackToHome,
  onConsultCorporate,
}) => {
  const [corporateSettings, setCorporateSettings] = useState<CorporateSettings>(() => getStoredCorporateSettings());
  const [selectedPillar, setSelectedPillar] = useState<{
    title: string;
    description: string;
    details: string[];
  } | null>(null);

  // Sync stored settings on mount or window focus
  useEffect(() => {
    const refresh = () => setCorporateSettings(getStoredCorporateSettings());
    window.addEventListener('storage', refresh);
    return () => window.removeEventListener('storage', refresh);
  }, []);

  const whatsappUrl = `https://wa.me/${contactInfo.whatsappNumberDigits}?text=${encodeURIComponent(
    'Olá! Gostaria de agendar uma reunião corporativa com a Advocacia Nicolau a respeito de assessoria empresarial.'
  )}`;

  const pillarIcons: Record<string, typeof Building2> = {
    societario: Building2,
    contratos: FileText,
    compliance: ShieldCheck,
    contencioso: Scale,
  };

  const pillars = corporateSettings.pillars.map((p) => ({
    ...p,
    icon: pillarIcons[p.id] || Building2,
  }));

  const industries = corporateSettings.industries;

  return (
    <div className="min-h-screen bg-[#14100D] text-[#FAF8F4] flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#14100D]/95 backdrop-blur-md border-b border-[#B89554]/30 py-3.5 px-4 sm:px-8 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#CBA86B] hover:text-[#FAF8F4] transition-colors cursor-pointer py-1.5 px-3 rounded-full border border-[#B89554]/40 hover:border-[#CBA86B]"
              title="Voltar ao portal institucional"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Voltar ao Início</span>
              <span className="sm:hidden">Início</span>
            </button>

            <button onClick={onBackToHome} className="cursor-pointer">
              <Logo size="md" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider rounded-full bg-[#CBA86B] hover:bg-[#D6B779] text-[#17130F] transition-all shadow-md"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#17130F]" />
              <span className="hidden sm:inline">Agendar Reunião Corporativa</span>
              <span className="sm:hidden">Contato</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Header Exclusivo - Fundo Branco conforme solicitado */}
      <section className="relative py-20 lg:py-28 bg-white text-[#17130F] border-b border-[#B89554]/25 overflow-hidden shadow-sm">
        {/* Subtle Watermark on white background */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full opacity-[0.07] pointer-events-none flex justify-end items-center overflow-hidden">
          <img
            src="/logo_nicolau_dourado.webp"
            alt=""
            className="w-[36rem] h-auto object-contain translate-x-1/4 filter contrast-125"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const target = e.currentTarget;
              target.src = '/logo_nicolau_dourado.png';
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#8C6F36] font-semibold"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {corporateSettings.kicker}
              </span>
              <span className="w-16 h-[1.5px] bg-[#8C6F36]/60" />
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#17130F] mb-5"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {corporateSettings.titlePart1}<br />
              <span className="text-[#8C6F36] italic font-normal">{corporateSettings.titleHighlight}</span>
            </h1>

            <p className="text-sm sm:text-base text-[#282019]/80 font-normal leading-relaxed mb-8">
              {corporateSettings.description}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#B89554] hover:bg-[#A37E3E] text-[#FAF8F4] font-semibold text-xs sm:text-sm tracking-wide rounded-full transition-all shadow-md"
              >
                <MessageSquare className="w-4 h-4 text-[#FAF8F4]" />
                <span>{corporateSettings.ctaButtonText}</span>
              </a>

              <button
                onClick={onBackToHome}
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#17130F]/30 hover:border-[#8C6F36] text-[#17130F] hover:text-[#8C6F36] hover:bg-[#8C6F36]/5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-colors cursor-pointer"
              >
                <span>Conhecer outras áreas</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars Section */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span
            className="text-xs uppercase tracking-[0.25em] text-[#CBA86B] font-semibold"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            ÁREAS DE ESPECIALIZAÇÃO CORPORATIVA
          </span>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#FAF8F4] mt-2 mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Pilares da Nossa Assessoria
          </h2>
          <p className="text-xs sm:text-sm text-[#FAF8F4]/70 font-light">
            Atuação integrada para proteger o fluxo de caixa, o patrimônio dos sócios e os contratos mercantis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                onClick={() => setSelectedPillar({
                  title: pillar.title,
                  description: pillar.shortDesc,
                  details: pillar.details,
                })}
                className="bg-[#1C1714] border border-[#B89554]/30 hover:border-[#D6B779] rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#B89554]/15 cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#251E19] border border-[#B89554]/40 flex items-center justify-center text-[#CBA86B] group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-[#CBA86B]/80 font-medium bg-[#14100D] px-2.5 py-1 rounded-full border border-[#B89554]/25">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3
                    className="text-lg sm:text-xl font-normal text-[#FAF8F4] group-hover:text-[#D6B779] transition-colors leading-snug mb-3"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#FAF8F4]/75 font-light leading-relaxed mb-6">
                    {pillar.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#CBA86B] font-medium group-hover:text-[#FAF8F4] transition-colors">
                  <span>Ver escopo completo</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Setores Atendidos */}
      <section className="py-16 bg-[#18130F] border-t border-b border-[#B89554]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <span
              className="text-xs uppercase tracking-[0.25em] text-[#CBA86B] font-semibold"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              EXPERIÊNCIA SETORIAL
            </span>
            <h2
              className="text-2xl sm:text-3xl font-normal text-[#FAF8F4] mt-1"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Setores Atendidos pela Advocacia Nicolau
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {industries.map((ind, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#1C1714] border border-[#B89554]/25">
                <h4 className="text-base font-serif text-[#CBA86B] mb-2 font-medium" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {ind.title}
                </h4>
                <p className="text-xs text-[#FAF8F4]/75 font-light leading-relaxed">
                  {ind.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal: Scope of Corporate Services */}
      {selectedPillar && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-xl bg-[#1C1714] border border-[#B89554] rounded-2xl shadow-2xl p-6 sm:p-8 text-[#FAF8F4] max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedPillar(null)}
              className="absolute top-4 right-4 p-2 text-[#FAF8F4]/70 hover:text-[#CBA86B] transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              ✕
            </button>

            <span className="text-[11px] uppercase tracking-[0.2em] text-[#CBA86B] font-semibold block mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
              Assessoria Jurídica Especializada
            </span>

            <h3 className="text-2xl font-serif text-[#FAF8F4] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              {selectedPillar.title}
            </h3>

            <p className="text-xs sm:text-sm text-[#CBA86B] italic font-light mb-6 border-l-2 border-[#CBA86B] pl-3">
              {selectedPillar.description}
            </p>

            <div className="space-y-3 mb-8">
              {selectedPillar.details.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#FAF8F4]/85 leading-relaxed font-light">
                  <CheckCircle2 className="w-4 h-4 text-[#CBA86B] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-5 border-t border-[#B89554]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#FAF8F4]/60">
                Atendimento presencial em Guarapuava e em todo o Paraná.
              </span>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setSelectedPillar(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#CBA86B] text-[#17130F] font-semibold text-xs tracking-wider uppercase hover:bg-[#D6B779] transition-colors text-center"
              >
                Falar com Especialista
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#100D0B] border-t border-[#B89554]/30 py-8 px-4 text-center mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF8F4]/70">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <span>Advocacia Nicolau · Desde 1978</span>
          </div>

          <button
            onClick={onBackToHome}
            className="text-[#CBA86B] hover:underline cursor-pointer"
          >
            ← Retornar ao Site Institucional
          </button>
        </div>
      </footer>
    </div>
  );
};
