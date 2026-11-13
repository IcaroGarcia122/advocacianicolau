import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Calendar, ArrowRight, X, Share2, Check, MessageSquare } from 'lucide-react';
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
}

export const AnnouncementsSection: React.FC<AnnouncementsSectionProps> = ({
  contactInfo = initialContactInfo,
  announcementsList,
  onOpenAnnouncementsPage,
}) => {
  const [selectedItem, setSelectedItem] = useState<AnnouncementItem | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const allAnnouncements: AnnouncementItem[] = announcementsList ?? getStoredAnnouncements();
  const featuredOnly = allAnnouncements.filter((item) => item.featured === true);
  const announcements: AnnouncementItem[] =
    featuredOnly.length > 0 ? featuredOnly : allAnnouncements.slice(0, 6);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section id="comunicados" className="relative z-10 py-20 lg:py-28 bg-white text-[#17130F] border-t border-[#8C6F36]/25 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3.5 mb-4">
              <span
                className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#8C6F36] font-semibold"
                style={{ fontFamily: "'Cinzel', Georgia, serif" }}
              >
                COMUNICADOS & NOTAS OFICIAIS
              </span>
              <span className="w-16 sm:w-24 h-[1.5px] bg-[#8C6F36]/50" />
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#17130F] leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Transparência, ética e<br />
              <span className="text-[#8C6F36] italic font-normal">informação oficial.</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#4A3E36] font-normal max-w-md leading-relaxed">
            Notas públicas, informativos processuais e comunicados oficiais emitidos pela diretoria da Advocacia Nicolau.
          </p>
        </div>

        {/* Announcements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {announcements.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
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
                {/* Pill Tag Badge */}
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-[#8C6F36] text-[#FAF8F4] text-[11px] font-semibold tracking-wide rounded-full shadow-md">
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
                    <span>Ler nota</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Button to open dedicated Announcements Page */}
        {onOpenAnnouncementsPage && (
          <div className="mt-12 text-center">
            <button
              onClick={onOpenAnnouncementsPage}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-[#8C6F36] bg-[#17130F] text-[#FAF8F4] hover:bg-[#8C6F36] hover:text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md hover:scale-[1.02] cursor-pointer"
            >
              <span>Acessar Página Completa de Comunicados</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Modal rendered in document.body so it never sits behind page sections */}
      {selectedItem &&
        createPortal(
          <div
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
            role="dialog"
            aria-modal="true"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-[#1C1714] border border-[#B89554] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-[#FAF8F4]"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#B89554]/30 bg-[#14100D]">
                <span className="inline-block px-3 py-1 bg-[#967444] text-[#FAF8F4] text-[11px] font-medium rounded-full">
                  {selectedItem.tag}
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-full border border-[#B89554]/40 text-[#CBA86B] hover:bg-[#B89554]/20 transition-colors cursor-pointer"
                    title="Compartilhar"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => setSelectedItem(null)}
                    className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
                    aria-label="Fechar"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto space-y-5">
                <div>
                  <span className="text-xs text-[#CBA86B] font-light flex items-center gap-1.5 mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    {selectedItem.date}
                  </span>

                  <h2
                    className="text-2xl sm:text-3xl font-serif text-[#FAF8F4] leading-tight"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {selectedItem.title}
                  </h2>

                  <p className="text-sm text-[#CBA86B] italic font-light mt-2 border-l-2 border-[#CBA86B] pl-3">
                    {selectedItem.excerpt}
                  </p>
                </div>

                <div className="h-56 sm:h-64 rounded-xl overflow-hidden border border-[#B89554]/30">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4 text-sm sm:text-base text-[#FAF8F4]/85 font-light leading-relaxed">
                  {selectedItem.content.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#B89554]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#FAF8F4]/60">
                  <div>
                    <span className="block">Advocacia Nicolau · Desde 1978</span>
                    <span className="text-[#CBA86B]">Guarapuava – PR</span>
                  </div>

                  <a
                    href={`https://wa.me/${contactInfo.whatsappNumberDigits}?text=${encodeURIComponent(
                      `Olá! Estive lendo o comunicado "${selectedItem.title}" no site da Advocacia Nicolau e gostaria de esclarecer dúvidas.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#CBA86B] text-[#17130F] hover:bg-[#D6B779] text-xs font-semibold tracking-wide transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Falar pelo WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};
