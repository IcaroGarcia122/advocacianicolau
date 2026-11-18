import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import {
  getStoredAnnouncements,
  AnnouncementItem,
  ContactInfo,
  editorialVisualAssets,
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
              <span className="text-[#8C6F36] italic font-normal">informações jurídicas.</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#4A3E36] font-normal max-w-md leading-relaxed">
            Espaço dedicado à futura publicação de artigos técnicos, análises jurídicas, notícias e comunicados oficiais aprovados pela Advocacia Nicolau.
          </p>
        </div>

        {/* Clean Editorial Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {publications.map((item) => (
            <article
              key={item.id}
              onClick={() => handleCardClick(item)}
              className="group rounded-2xl overflow-hidden border border-[#B89554]/30 bg-[#FAF8F4] hover:border-[#8C6F36] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer animate-fadeIn"
            >
              <div>
                {/* Editorial Cover Photography */}
                <div className="relative h-56 overflow-hidden bg-[#17130F]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = editorialVisualAssets.reception;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Clean Unboxed Editorial Metadata + Title */}
                <div className="p-6 pb-4">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#8C6F36] font-semibold mb-2.5">
                    <span>{item.publicationType || 'Artigo Jurídico'}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.tag}</span>
                  </div>

                  <h3
                    className="text-lg sm:text-xl font-normal text-[#17130F] leading-snug group-hover:text-[#8C6F36] transition-colors line-clamp-3 mb-3"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#4A3E36] font-light leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              {/* Date and Read Link */}
              <div className="px-6 pb-6 pt-3 border-t border-[#B89554]/20 mx-6 flex items-center justify-between text-xs text-[#5C4A26]">
                <span className="flex items-center gap-1.5 font-normal">
                  <Calendar className="w-3.5 h-3.5 text-[#8C6F36]" />
                  {item.date}
                </span>

                <span className="text-[#8C6F36] font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Ler</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
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
