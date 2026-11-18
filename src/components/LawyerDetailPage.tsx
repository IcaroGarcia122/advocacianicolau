import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Briefcase,
  Check,
  MessageSquare,
  Phone,
  Share2,
  UserCheck,
} from 'lucide-react';
import { ContactInfo, Lawyer } from '../data/officeData';
import { Logo } from './Logo';

interface LawyerDetailPageProps {
  lawyer: Lawyer;
  allLawyers: Lawyer[];
  contactInfo: ContactInfo;
  onBackToHome: () => void;
  onBackToTeam: () => void;
  onSelectLawyer: (id: string) => void;
  onScheduleWithLawyer: (lawyerName: string) => void;
}

export const LawyerDetailPage: React.FC<LawyerDetailPageProps> = ({
  lawyer,
  allLawyers,
  contactInfo,
  onBackToHome,
  onBackToTeam,
  onSelectLawyer,
  onScheduleWithLawyer,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const directDigits = lawyer.whatsappDigits || contactInfo.whatsappNumberDigits;
  const directWhatsappUrl = `https://wa.me/${directDigits}?text=${encodeURIComponent(
    `Olá, Dr(a). ${lawyer.name}! Gostaria de agendar um atendimento jurídico na Advocacia Nicolau.`
  )}`;

  const otherLawyers = allLawyers.filter((l) => l.id !== lawyer.id);

  const bioParagraphs = lawyer.fullBio
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const handleShareProfile = async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#advogado/${encodeURIComponent(
      lawyer.id
    )}`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${lawyer.name} | Advocacia Nicolau`,
          text: `${lawyer.name} (${lawyer.oab}) — ${lawyer.role} na Advocacia Nicolau`,
          url: shareUrl,
        });
        return;
      }
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2600);
    } catch {
      // Fallback silent
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#17130F] flex flex-col font-sans">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-[#17130F] text-[#FAF8F4] border-b border-[#B89554]/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-5">
            <button
              onClick={onBackToTeam}
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#D6B779] hover:text-[#FAF8F4] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Nossa Equipe</span>
            </button>
            <span className="hidden sm:inline text-[#B89554]/40">|</span>
            <button
              onClick={onBackToHome}
              className="hidden sm:inline-flex text-xs text-[#FAF8F4]/70 hover:text-[#D6B779] transition-colors cursor-pointer"
            >
              Página Inicial
            </button>
          </div>

          <button onClick={onBackToHome} className="cursor-pointer" aria-label="Advocacia Nicolau">
            <Logo variant="gold" size="sm" />
          </button>

          <a
            href={directWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B89554] hover:bg-[#D6B779] text-[#17130F] text-xs font-semibold tracking-wide transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp Direto</span>
            <span className="sm:hidden">Contato</span>
          </a>
        </div>
      </header>

      {/* Lawyer Switcher Sub-bar */}
      <div className="bg-[#1E1813] text-[#FAF8F4] border-b border-[#B89554]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <span
            className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#D6B779]"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Corpo Jurídico · Perfis Individuais
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {allLawyers.map((item) => {
              const isCurrent = item.id === lawyer.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectLawyer(item.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-[#B89554] text-[#17130F] font-semibold shadow-sm'
                      : 'bg-white/5 text-[#FAF8F4]/80 hover:bg-white/10 hover:text-[#D6B779] border border-[#B89554]/25'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Profile Hero & Biography */}
      <main className="flex-1 py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Clean Large Professional Portrait */}
            <div className="lg:col-span-5">
              <div className="sticky top-28">
                <div className="relative rounded-3xl overflow-hidden border border-[#B89554]/45 bg-[#17130F] shadow-2xl aspect-[3/4]">
                  <img
                    src={lawyer.image}
                    alt={`${lawyer.name} — ${lawyer.role} da Advocacia Nicolau`}
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                    decoding="sync"
                  />
                </div>

                {/* Direct Contact Card below photo */}
                <div className="mt-6 p-5 rounded-2xl bg-white border border-[#B89554]/30 shadow-sm space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#2E2721]">
                    <span className="uppercase tracking-wider font-semibold text-[#8C6F36]">
                      Plantão / WhatsApp
                    </span>
                    <span className="font-mono font-semibold text-[#17130F]">
                      {lawyer.whatsappDisplay || contactInfo.whatsapp}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#2E2721]">
                    <span className="uppercase tracking-wider font-semibold text-[#8C6F36]">
                      Telefone Fixo
                    </span>
                    <span className="font-mono font-medium text-[#17130F]">
                      {contactInfo.phone}
                    </span>
                  </div>
                  <div className="pt-2 flex flex-col gap-2.5">
                    <a
                      href={directWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#17130F] hover:bg-[#8C6F36] text-[#FAF8F4] text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Falar com {lawyer.name.split(' ')[0]}</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => onScheduleWithLawyer(lawyer.name)}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-[#8C6F36] text-[#17130F] hover:bg-[#8C6F36]/10 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#8C6F36]" />
                      <span>Agendar via Formulário</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Highlighted Name, Legible Credentials, Biography */}
            <div className="lg:col-span-7 space-y-8">
              <div className="border-b border-[#B89554]/30 pb-7">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className="text-xs sm:text-sm uppercase tracking-[0.22em] text-[#8C6F36] font-semibold"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {lawyer.role}
                    </span>
                    <span className="px-3 py-1 rounded bg-[#17130F] text-[#D6B779] text-xs sm:text-sm font-semibold tracking-wide">
                      {lawyer.oab}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleShareProfile}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#B89554]/40 bg-white hover:bg-[#B89554]/10 text-xs text-[#17130F] font-medium transition-colors cursor-pointer"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Link copiado</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 text-[#8C6F36]" />
                        <span>Compartilhar perfil</span>
                      </>
                    )}
                  </button>
                </div>

                <h1
                  className="text-4xl sm:text-5xl lg:text-[3.35rem] font-normal text-[#17130F] leading-[1.1] mb-5"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {lawyer.name}
                </h1>

                <p className="text-base sm:text-lg text-[#2E2721] font-normal leading-relaxed border-l-2 border-[#B89554] pl-4">
                  {lawyer.summary}
                </p>
              </div>

              {/* Biography Section */}
              <section aria-labelledby="bio-heading" className="space-y-4">
                <div className="flex items-center gap-2.5 text-[#8C6F36]">
                  <UserCheck className="w-4 h-4" />
                  <h2
                    id="bio-heading"
                    className="text-xs sm:text-sm uppercase tracking-[0.22em] font-semibold"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    Biografia & Atuação Profissional
                  </h2>
                </div>

                <div className="bg-white rounded-3xl border border-[#B89554]/30 p-6 sm:p-8 shadow-sm space-y-4 text-base sm:text-[17px] text-[#1F1914] font-normal leading-[1.8]">
                  {bioParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </section>

              {/* Practice Specialties */}
              {lawyer.specialties && lawyer.specialties.length > 0 && (
                <section className="space-y-4">
                  <div className="flex items-center gap-2.5 text-[#8C6F36]">
                    <Briefcase className="w-4 h-4" />
                    <h2
                      className="text-xs uppercase tracking-[0.24em] font-semibold"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      Áreas de Ênfase e Experiência
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {lawyer.specialties.map((spec, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#B89554]/25 shadow-sm"
                      >
                        <Award className="w-4 h-4 text-[#B89554] shrink-0" />
                        <span className="text-sm font-medium text-[#17130F]">{spec}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Other Lawyers in the Firm */}
              {otherLawyers.length > 0 && (
                <section className="pt-6 border-t border-[#B89554]/30 space-y-4">
                  <h3
                    className="text-xs uppercase tracking-[0.24em] text-[#8C6F36] font-semibold"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    Demais Advogados Integrantes
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {otherLawyers.map((other) => (
                      <button
                        key={other.id}
                        type="button"
                        onClick={() => onSelectLawyer(other.id)}
                        className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#B89554]/30 hover:border-[#8C6F36] shadow-sm hover:shadow-md transition-all text-left cursor-pointer"
                      >
                        <img
                          src={other.image}
                          alt={other.name}
                          className="w-16 h-16 rounded-xl object-cover object-top shrink-0 border border-[#B89554]/30"
                        />
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] uppercase tracking-wider text-[#8C6F36] font-semibold block">
                            {other.oab}
                          </span>
                          <h4
                            className="text-base font-semibold text-[#17130F] group-hover:text-[#8C6F36] transition-colors truncate"
                            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                          >
                            {other.name}
                          </h4>
                          <span className="text-xs text-[#2E2721]/70 inline-flex items-center gap-1 mt-1">
                            <span>Ver biografia</span>
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="bg-[#100D0B] text-[#FAF8F4]/75 border-t border-[#B89554]/25 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span>Advocacia Nicolau — {contactInfo.address}, {contactInfo.city}/{contactInfo.state}</span>
          <button
            onClick={onBackToTeam}
            className="text-[#D6B779] hover:underline cursor-pointer"
          >
            Voltar para Nossa Equipe
          </button>
        </div>
      </footer>
    </div>
  );
};
