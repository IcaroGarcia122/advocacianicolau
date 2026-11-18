import React from 'react';
import { ArrowRight, MessageSquare, UserCheck } from 'lucide-react';
import { ContactInfo, Lawyer, initialContactInfo, lawyers as defaultLawyers } from '../data/officeData';

interface TeamProps {
  contactInfo?: ContactInfo;
  lawyersList?: Lawyer[];
  onSelectLawyer?: (lawyerId: string) => void;
  onScheduleWithLawyer?: (lawyerName: string) => void;
  onContactClick?: () => void;
}

export const Team: React.FC<TeamProps> = ({
  contactInfo = initialContactInfo,
  lawyersList = defaultLawyers,
  onSelectLawyer,
}) => {
  const whatsappUrl = `https://wa.me/${contactInfo.whatsappNumberDigits}?text=${encodeURIComponent(
    'Olá! Gostaria de falar com os advogados da Advocacia Nicolau.'
  )}`;

  const scheduleWhatsappUrl = `https://wa.me/${contactInfo.whatsappNumberDigits}?text=${encodeURIComponent(
    'Olá! Gostaria de agendar um atendimento jurídico com a Advocacia Nicolau.'
  )}`;

  const handleOpenProfile = (lawyerId: string) => {
    if (onSelectLawyer) {
      onSelectLawyer(lawyerId);
    } else {
      window.location.hash = `advogado/${encodeURIComponent(lawyerId)}`;
    }
  };

  return (
    <section id="equipe" className="relative py-20 lg:py-28 bg-[#FFFFFF] text-[#17130F] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Top Row: Editorial Intro & Team Photograph */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="flex items-center gap-3.5 mb-5">
              <span
                className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#8C6F36] font-semibold"
                style={{ fontFamily: "'Cinzel', Georgia, serif" }}
              >
                NOSSA EQUIPE
              </span>
              <span className="w-16 sm:w-24 h-[1.5px] bg-[#8C6F36]/50" />
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-[3rem] font-normal leading-[1.12] mb-5 text-[#17130F]"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              Conheça nossos{' '}
              <span className="text-[#8C6F36] italic font-normal">advogados.</span>
            </h2>

            <p className="text-sm sm:text-base lg:text-[1.05rem] text-[#2E2721] font-normal leading-relaxed mb-8 max-w-xl">
              Contamos com uma equipe de advogados qualificados, prontos para oferecer um atendimento personalizado e soluções jurídicas eficazes nas esferas criminal, cível e familiar.
            </p>

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
          </div>

          {/* Right Column: Clean Framed Team Photograph */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#B89554]/35 bg-[#17130F] shadow-xl">
              <div className="aspect-[16/10] w-full overflow-hidden">
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
              </div>
              <div className="px-5 py-3.5 bg-[#17130F] border-t border-[#B89554]/25 flex items-center justify-between text-xs text-[#FAF8F4]/90">
                <span className="font-serif text-[#FAF8F4]">Advocacia Nicolau</span>
                <span
                  className="text-[10px] uppercase tracking-[0.2em] text-[#D6B779]"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Guarapuava · Desde 1978
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Spacious Individual Lawyer Showcase with Large Portraits & Clear Credentials */}
        <div className="mt-14 pt-12 border-t border-[#8C6F36]/20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div>
              <span
                className="text-[11px] uppercase tracking-[0.24em] text-[#8C6F36] font-semibold block mb-1.5"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                CORPO JURÍDICO · PERFIS INDIVIDUAIS
              </span>
              <p className="text-sm text-[#4A3E36]">
                Selecione um advogado para acessar sua biografia completa, formação e frentes de atuação.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {lawyersList.map((lawyer) => (
              <article
                key={lawyer.id}
                className="group bg-[#FAF8F4] border border-[#B89554]/35 hover:border-[#8C6F36] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Large Unobstructed Portrait Photo */}
                  <div
                    onClick={() => handleOpenProfile(lawyer.id)}
                    className="aspect-[4/5] w-full overflow-hidden bg-[#17130F] cursor-pointer"
                  >
                    <img
                      src={lawyer.image}
                      alt={`${lawyer.name} — ${lawyer.role}`}
                      className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  {/* Clean Legible Credentials & Bio Summary */}
                  <div className="p-6 space-y-4">
                    <div className="border-b border-[#B89554]/25 pb-3.5">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span
                          className="text-xs uppercase tracking-[0.16em] text-[#8C6F36] font-semibold"
                          style={{ fontFamily: "'Cinzel', serif" }}
                        >
                          {lawyer.role}
                        </span>
                        <span className="text-xs font-semibold text-[#17130F] bg-[#EFE8DA] border border-[#B89554]/40 px-2.5 py-0.5 rounded">
                          {lawyer.oab}
                        </span>
                      </div>

                      <h3
                        onClick={() => handleOpenProfile(lawyer.id)}
                        className="text-xl sm:text-2xl font-normal text-[#17130F] group-hover:text-[#8C6F36] transition-colors leading-snug cursor-pointer"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        {lawyer.name}
                      </h3>
                    </div>

                    <p className="text-sm text-[#2E2721] font-normal leading-relaxed">
                      {lawyer.summary}
                    </p>

                    {lawyer.specialties && lawyer.specialties.length > 0 && (
                      <div className="pt-1 space-y-1.5">
                        <span className="text-[11px] uppercase tracking-[0.18em] text-[#8C6F36] font-semibold block">
                          Áreas de Atuação
                        </span>
                        <ul className="space-y-1">
                          {lawyer.specialties.slice(0, 3).map((spec, idx) => (
                            <li
                              key={idx}
                              className="text-xs sm:text-[13px] text-[#17130F]/85 font-medium flex items-start gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#B89554] mt-1.5 shrink-0" />
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <button
                    type="button"
                    onClick={() => handleOpenProfile(lawyer.id)}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#17130F] hover:bg-[#8C6F36] text-[#FAF8F4] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <UserCheck className="w-4 h-4 text-[#D6B779] shrink-0" />
                    <span>Ver Biografia</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform shrink-0" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
