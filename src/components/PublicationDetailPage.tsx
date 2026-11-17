import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  User,
  Share2,
  Check,
  MessageSquare,
  Volume2,
  VolumeX,
  BookOpen,
} from 'lucide-react';
import { AnnouncementItem, ContactInfo } from '../data/officeData';
import { Logo } from './Logo';

interface PublicationDetailPageProps {
  publication: AnnouncementItem;
  allPublications: AnnouncementItem[];
  contactInfo: ContactInfo;
  onBackToHome: () => void;
  onOpenPublicationsPortal: () => void;
  onSelectPublication: (id: string) => void;
}

export const PublicationDetailPage: React.FC<PublicationDetailPageProps> = ({
  publication,
  allPublications,
  contactInfo,
  onBackToHome,
  onOpenPublicationsPortal,
  onSelectPublication,
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [publication.id]);

  const relatedPublications = allPublications
    .filter((item) => item.id !== publication.id)
    .slice(0, 3);

  const whatsappUrl = `https://wa.me/${contactInfo.whatsappNumberDigits}?text=${encodeURIComponent(
    `Olá! Estive lendo a publicação "${publication.title}" no site da Advocacia Nicolau e gostaria de esclarecer dúvidas.`
  )}`;

  const handleCopyIndividualLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#publicacao/${publication.id}`;
    navigator.clipboard?.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) return;
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const fullText = `${publication.title}. ${publication.excerpt || ''}. ${publication.content.join(' ')}`;
      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const typeLabel = publication.publicationType || 'Comunicado Institucional';

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#17130F] flex flex-col font-sans selection:bg-[#B89554]/30">
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#17130F]/95 backdrop-blur-md border-b border-[#B89554]/30 py-3.5 px-4 sm:px-6 lg:px-8 text-[#FAF8F4]">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onOpenPublicationsPortal}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#D6B779] hover:text-[#FAF8F4] transition-colors cursor-pointer py-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Publicações</span>
            </button>

            <span className="text-[#B89554]/40 hidden sm:inline">|</span>

            <button
              type="button"
              onClick={onBackToHome}
              className="hidden sm:inline-flex items-center text-xs uppercase tracking-wider text-[#FAF8F4]/75 hover:text-[#D6B779] transition-colors cursor-pointer py-1.5"
            >
              Início
            </button>
          </div>

          <button
            type="button"
            onClick={onBackToHome}
            className="cursor-pointer focus-visible:outline-none hover:scale-[1.02] transition-transform"
          >
            <Logo variant="gold" size="sm" />
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#B89554] text-[#D6B779] hover:bg-[#B89554] hover:text-[#17130F] text-xs font-semibold tracking-wider transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Falar pelo WhatsApp</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>
        </div>
      </header>

      {/* Main Article Body */}
      <main className="flex-1 w-full">
        {/* Editorial White Header Strip */}
        <section className="bg-white border-b border-[#8C6F36]/20 py-10 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex flex-wrap items-center gap-2 text-xs text-[#6B5A4E] mb-6">
              <button
                type="button"
                onClick={onBackToHome}
                className="hover:text-[#8C6F36] cursor-pointer"
              >
                Início
              </button>
              <span>/</span>
              <button
                type="button"
                onClick={onOpenPublicationsPortal}
                className="hover:text-[#8C6F36] cursor-pointer"
              >
                Publicações
              </button>
              <span>/</span>
              <span className="text-[#8C6F36] font-medium">{publication.tag}</span>
            </nav>

            {/* Badges & Tools Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3.5 py-1 rounded-full bg-[#17130F] text-[#D6B779] text-[11px] font-semibold uppercase tracking-wider">
                  {typeLabel}
                </span>
                <span className="px-3.5 py-1 rounded-full bg-[#F8F3E8] border border-[#B89554]/40 text-[#8C6F36] text-[11px] font-semibold">
                  {publication.tag}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFontSize((prev) => (prev === 'normal' ? 'large' : 'normal'))}
                  className="px-3 py-1.5 rounded-full border border-[#8C6F36]/30 text-xs font-semibold text-[#17130F] hover:border-[#8C6F36] hover:bg-[#FAF8F4] transition-colors cursor-pointer"
                  title="Alterar tamanho da fonte"
                >
                  {fontSize === 'normal' ? 'A+' : 'A-'}
                </button>

                <button
                  type="button"
                  onClick={handleToggleAudio}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#8C6F36]/30 text-xs font-semibold text-[#17130F] hover:border-[#8C6F36] hover:bg-[#FAF8F4] transition-colors cursor-pointer"
                  title={isPlayingAudio ? 'Parar leitura em voz alta' : 'Ouvir publicação'}
                >
                  {isPlayingAudio ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-rose-600" />
                      <span>Parar áudio</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-[#8C6F36]" />
                      <span>Ouvir</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCopyIndividualLink}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#8C6F36]/30 text-xs font-semibold text-[#17130F] hover:border-[#8C6F36] hover:bg-[#FAF8F4] transition-colors cursor-pointer"
                  title="Copiar link desta publicação"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Link copiado</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-[#8C6F36]" />
                      <span className="hidden sm:inline">Compartilhar</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Title */}
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#17130F] leading-[1.15] mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {publication.title}
            </h1>

            {/* Lead Excerpt */}
            {publication.excerpt && (
              <p className="text-base sm:text-lg text-[#4A3E36] leading-relaxed border-l-4 border-[#B89554] pl-4 italic mb-8">
                {publication.excerpt}
              </p>
            )}

            {/* Metadata Row */}
            <div className="flex flex-wrap items-center gap-5 pt-5 border-t border-[#8C6F36]/20 text-xs sm:text-sm text-[#5C4D43]">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#8C6F36]" />
                <span>{publication.date}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <User className="w-4 h-4 text-[#8C6F36]" />
                <span>{publication.author || 'Advocacia Nicolau'}</span>
              </span>
              {publication.readTime && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#8C6F36]" />
                  <span>{publication.readTime}</span>
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Image & Full Editorial Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
          {publication.image && (
            <div className="rounded-2xl overflow-hidden border border-[#B89554]/30 shadow-xl max-h-[460px] bg-[#17130F]">
              <img
                src={publication.image}
                alt={publication.title}
                className="w-full h-full max-h-[460px] object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/team_juri.webp';
                }}
              />
            </div>
          )}

          {/* Full Content Paragraphs */}
          <div
            className={`space-y-6 text-[#2B231D] leading-[1.85] font-normal ${
              fontSize === 'large' ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
            }`}
          >
            {publication.content.map((paragraph, idx) => (
              <p key={idx} className="first-letter:font-serif">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Institutional Consultation Banner */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#17130F] text-[#FAF8F4] border border-[#B89554]/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span
                className="text-[11px] uppercase tracking-[0.22em] text-[#D6B779] font-semibold block mb-1.5"
                style={{ fontFamily: "'Cinzel', Georgia, serif" }}
              >
                ADVOCACIA NICOLAU · DESDE 1978
              </span>
              <h2
                className="text-xl sm:text-2xl font-normal text-[#FAF8F4]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Precisa de orientação jurídica sobre este tema?
              </h2>
              <p className="text-xs sm:text-sm text-[#FAF8F4]/75 mt-1 font-light">
                Nossa equipe atende de segunda a sexta-feira, das 09h às 11h30 e das 13h às 17h.
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#CBA86B] hover:bg-[#D6B779] text-[#17130F] text-xs font-bold uppercase tracking-wider transition-all shrink-0 shadow-lg"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Falar no WhatsApp</span>
            </a>
          </div>
        </article>

        {/* Related Publications */}
        {relatedPublications.length > 0 && (
          <section className="bg-white border-t border-[#8C6F36]/20 py-14 sm:py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between gap-4 mb-8">
                <div>
                  <span
                    className="text-[11px] uppercase tracking-[0.22em] text-[#8C6F36] font-semibold block mb-1"
                    style={{ fontFamily: "'Cinzel', Georgia, serif" }}
                  >
                    CONTINUE LENDO
                  </span>
                  <h3
                    className="text-2xl sm:text-3xl font-normal text-[#17130F]"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Outras Publicações
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={onOpenPublicationsPortal}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8C6F36] hover:text-[#17130F] transition-colors cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Ver Todas</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPublications.map((rel) => (
                  <article
                    key={rel.id}
                    onClick={() => onSelectPublication(rel.id)}
                    className="group bg-[#FAF8F4] border border-[#8C6F36]/25 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-[#8C6F36] transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-44 overflow-hidden relative bg-[#17130F]">
                        <img
                          src={rel.image}
                          alt={rel.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.src = '/team_juri.webp';
                          }}
                        />
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#17130F]/90 text-[#D6B779] text-[10px] font-semibold">
                          {rel.publicationType || rel.tag}
                        </span>
                      </div>
                      <div className="p-5">
                        <span className="text-[11px] text-[#8C6F36] font-medium block mb-1.5">
                          {rel.date}
                        </span>
                        <h4 className="text-base font-bold text-[#17130F] leading-snug group-hover:text-[#8C6F36] transition-colors line-clamp-2">
                          {rel.title}
                        </h4>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-3 border-t border-[#8C6F36]/15 flex items-center justify-between text-xs font-semibold text-[#8C6F36]">
                      <span>Ler página individual</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Bottom Footer */}
      <footer className="bg-[#100D0B] border-t border-[#B89554]/25 py-8 px-4 text-xs text-[#FAF8F4]/70">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[#D6B779]">
            <span className="font-semibold">Advocacia Nicolau</span>
            <span>•</span>
            <span className="text-[#FAF8F4]/75">Desde 1978 em Guarapuava/PR</span>
          </div>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={onOpenPublicationsPortal}
              className="text-[#CBA86B] hover:underline cursor-pointer"
            >
              Portal de Publicações
            </button>
            <button
              type="button"
              onClick={onBackToHome}
              className="text-[#CBA86B] hover:underline cursor-pointer"
            >
              ← Voltar para a página inicial
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
