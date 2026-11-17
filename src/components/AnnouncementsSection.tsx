import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import {
  getStoredAnnouncements,
  AnnouncementItem,
  ContactInfo,
  initialContactInfo,
} from '../data/officeData';

interface AnnouncementsSectionProps {
  contactInfo?: ContactInfo;
  announcementsList?: AnnouncementItem[];
  onOpenAnnouncementsPage?: () => void;
  onSelectPublication?: (id: string) => void;
}

export const AnnouncementsSection: React.FC<AnnouncementsSectionProps> = ({
  announcementsList,
  onOpenAnnouncementsPage,
  onSelectPublication,
}) => {
  const allPublications: AnnouncementItem[] = announcementsList ?? getStoredAnnouncements();
  const featuredOnly = allPublications.filter((item) => item.featured === true);
  const publications: AnnouncementItem[] =
    featuredOnly.length > 0 ? featuredOnly : allPublications.slice(0, 6);

  const handleCardClick = (item: AnnouncementItem) => {
    if (onSelectPublication) {
      onSelectPublication(item.id);
      return;
    }
    if (onOpenAnnouncementsPage) {
      onOpenAnnouncementsPage();
    }
  };

  return (
    <section
      id="publicacoes"
      className="relative z-10 py-20 lg:py-28 bg-white text-[#17130F] border-t border-[#8C6F36]/25 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3.5 mb-4">
              <span
                className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#8C6F36] font-semibold"
                style={{ fontFamily: "'Cinzel', Georgia, serif" }}
              >
                PUBLICAÇÕES
              </span>
              <span className="w-16 sm:w-24 h-[1.5px] bg-[#8C6F36]/50" />
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#17130F] leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Artigos, notícias e<br />
              <span className="text-[#8C6F36] italic font-normal">comunicados oficiais.</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#4A3E36] font-normal max-w-md leading-relaxed">
            Conteúdos jurídicos, artigos técnicos, notícias e comunicados institucionais reunidos com rigor técnico pela equipe da Advocacia Nicolau.
          </p>
        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {publications.map((item) => (
            <article
              key={item.id}
              onClick={() => handleCardClick(item)}
              className="group relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-[#8C6F36]/25 shadow-md cursor-pointer hover:border-[#8C6F36] hover:shadow-2xl hover:shadow-[#8C6F36]/20 transition-all duration-300 flex flex-col justify-end bg-[#17130F] animate-fadeIn"
            >
              {/* Cover Photo */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.src = '/team_juri.webp';
                }}
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none" />

              {/* Card Content Overlay */}
              <div className="relative z-10 p-6 sm:p-7 flex flex-col justify-end">
                {/* Publication Type & Tag Badges */}
                <div className="mb-3 flex flex-wrap items-center gap-1.5">
                  {item.publicationType && (
                    <span className="inline-block px-2.5 py-0.5 bg-[#17130F]/85 border border-[#B89554]/50 text-[#D6B779] text-[10px] font-semibold tracking-wider uppercase rounded-full shadow-md">
                      {item.publicationType}
                    </span>
                  )}
                  <span className="inline-block px-3 py-0.5 bg-[#8C6F36] text-[#FAF8F4] text-[11px] font-semibold tracking-wide rounded-full shadow-md">
                    {item.tag}
                  </span>
                </div>

                {/* Bold Headline */}
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-[#D6B779] transition-colors line-clamp-3">
                  {item.title}
                </h3>

                {/* Date and Read Link */}
                <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-xs text-[#FAF8F4]/80">
                  <span className="flex items-center gap-1.5 font-light">
                    <Calendar className="w-3.5 h-3.5 text-[#D6B779]" />
                    {item.date}
                  </span>

                  <span className="text-[#D6B779] font-medium inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Ler publicação</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Button to open dedicated Publications Archive */}
        {onOpenAnnouncementsPage && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={onOpenAnnouncementsPage}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-[#8C6F36] bg-[#17130F] text-[#FAF8F4] hover:bg-[#8C6F36] hover:text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md hover:scale-[1.02] cursor-pointer"
            >
              <span>Ver Todas as Publicações</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
