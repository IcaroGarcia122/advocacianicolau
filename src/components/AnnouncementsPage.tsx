import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Search,
  Calendar,
  Share2,
  Check,
  ArrowRight,
  MessageSquare,
  Volume2,
  VolumeX,
  X,
  BellRing,
  Filter,
} from 'lucide-react';
import { initialAnnouncements, AnnouncementItem, ContactInfo } from '../data/officeData';
import { Logo } from './Logo';

interface AnnouncementsPageProps {
  contactInfo: ContactInfo;
  announcementsList?: AnnouncementItem[];
  onBackToHome: () => void;
  onOpenAdmin?: () => void;
}

export const AnnouncementsPage: React.FC<AnnouncementsPageProps> = ({
  contactInfo,
  announcementsList,
  onBackToHome,
  onOpenAdmin,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeItem, setActiveItem] = useState<AnnouncementItem | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const items = announcementsList && announcementsList.length > 0 ? announcementsList : initialAnnouncements;

  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => set.add(item.tag));
    return ['all', ...Array.from(set)];
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.tag === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        item.title.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        item.content.some((c) => c.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      { threshold: 0.08 }
    );
    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [filteredItems]);

  const handleShare = (itemTitle: string) => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else if (activeItem) {
      window.speechSynthesis.cancel();
      const text = `${activeItem.title}. ${activeItem.excerpt}. ${activeItem.content.join(' ')}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const closeModal = () => {
    if (isPlayingAudio && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
    setActiveItem(null);
  };

  const whatsappUrl = `https://wa.me/${contactInfo.whatsappNumberDigits}?text=${encodeURIComponent(
    'Olá! Gostaria de falar sobre um comunicado oficial da Advocacia Nicolau.'
  )}`;

  return (
    <div className="min-h-screen bg-[#15110E] text-[#FAF8F4] flex flex-col font-sans selection:bg-[#B89554]/30 selection:text-[#FAF8F4]">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#17130F]/95 backdrop-blur-md border-b border-[#B89554]/25 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#D6B779] hover:text-[#FAF8F4] transition-colors cursor-pointer py-1.5 focus-visible:outline-none"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Início</span>
          </button>

          <button
            onClick={onBackToHome}
            className="cursor-pointer focus-visible:outline-none hover:scale-[1.02] transition-transform"
          >
            <Logo variant="gold" size="sm" />
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#B89554] text-[#D6B779] hover:bg-[#B89554] hover:text-[#17130F] text-xs font-semibold tracking-wider transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Falar Conosco</span>
          </a>
        </div>
      </header>

      {/* Hero Banner (Sessão com Fundo Branco) */}
      <section className="relative py-16 sm:py-24 bg-white text-[#17130F] border-b border-[#8C6F36]/20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-multiply">
          <img
            src="/office_facade_nicolau.webp"
            alt=""
            className="w-full h-full object-cover filter contrast-125"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              const target = e.currentTarget;
              target.src = '/src/assets/images/office_facade_nicolau_1794270160258.jpg';
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-10 h-[1.5px] bg-[#8C6F36]" />
            <span
              className="text-xs uppercase tracking-[0.28em] text-[#8C6F36] font-semibold"
              style={{ fontFamily: "'Cinzel', Georgia, serif" }}
            >
              CANAL DE NOTAS & INFORMATIVOS OFICIAIS
            </span>
            <span className="w-10 h-[1.5px] bg-[#8C6F36]" />
          </div>

          <h1
            className="text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#17130F] mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Comunicados & Notas Oficiais
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-[#4A3E36] font-normal max-w-2xl mx-auto leading-relaxed mb-10">
            Transparência, posicionamentos institucionais e informações jurídicas oficiais emitidas pela banca da Advocacia Nicolau.
          </p>

          {/* Search Box on White Background */}
          <div className="max-w-xl mx-auto relative mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar comunicado por título, assunto ou termo jurídico..."
              className="w-full pl-12 pr-4 py-3.5 bg-[#F8F6F1] border border-[#8C6F36]/30 rounded-full text-[#17130F] placeholder:text-slate-400 text-sm focus:border-[#8C6F36] focus:ring-2 focus:ring-[#8C6F36]/20 focus:outline-none transition-all shadow-sm"
            />
            <Search className="w-5 h-5 text-[#8C6F36] absolute left-4 top-1/2 -translate-y-1/2" />
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#17130F] text-[#FAF8F4] font-semibold shadow-md'
                    : 'bg-[#F8F6F1] text-slate-700 border border-[#8C6F36]/30 hover:border-[#8C6F36] hover:bg-slate-100 hover:text-[#17130F]'
                }`}
              >
                {cat === 'all' ? 'Todos os Comunicados' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements List / Grid */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#B89554]/25">
          <span className="text-xs sm:text-sm text-[#FAF8F4]/70">
            Exibindo <strong className="text-[#CBA86B] font-semibold">{filteredItems.length}</strong> {filteredItems.length === 1 ? 'comunicado' : 'comunicados'}
          </span>

          <span
            className="text-[11px] uppercase tracking-wider text-[#CBA86B] font-medium"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Publicações Oficiais
          </span>
        </div>

        {filteredItems.length === 0 ? (
          <div className="py-20 text-center bg-[#251D17]/40 border border-[#B89554]/20 rounded-2xl p-8">
            <BellRing className="w-12 h-12 text-[#CBA86B]/50 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#FAF8F4] mb-2">Nenhum comunicado encontrado</h3>
            <p className="text-sm text-[#FAF8F4]/70 max-w-md mx-auto mb-6">
              Nenhum item corresponde à sua busca ou categoria selecionada.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-5 py-2 rounded-full border border-[#CBA86B] text-[#CBA86B] text-xs font-semibold hover:bg-[#CBA86B] hover:text-[#17130F] transition-colors"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, idx) => (
              <article
                key={item.id}
                onClick={() => setActiveItem(item)}
                className="group flex flex-col justify-between bg-[#231B15] border border-[#B89554]/30 rounded-2xl overflow-hidden shadow-xl hover:border-[#CBA86B] hover:shadow-2xl hover:shadow-[#CBA86B]/15 transition-all duration-300 cursor-pointer reveal-on-scroll"
                style={{ transitionDelay: `${(idx % 3) * 100}ms` }}
              >
                {/* Image Cover */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = '/team_juri.webp';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#231B15] via-black/40 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-[#8C6F36] text-[#FAF8F4] text-[11px] font-semibold tracking-wide rounded-full shadow-md">
                    {item.tag}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#CBA86B] mb-3 font-light">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.date}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#FAF8F4] leading-snug group-hover:text-[#D6B779] transition-colors line-clamp-2 mb-3">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#FAF8F4]/75 font-light leading-relaxed line-clamp-3">
                      {item.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[#CBA86B]">
                    <span>Ler nota completa</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Reader Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div
            className="bg-[#1F1813] border border-[#B89554]/50 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-[#1F1813]/95 backdrop-blur-md border-b border-[#B89554]/30 p-5 sm:p-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-[#8C6F36] text-[#FAF8F4] text-[11px] font-semibold tracking-wide rounded-full">
                  {activeItem.tag}
                </span>
                <span className="text-xs text-[#FAF8F4]/70 flex items-center gap-1.5 ml-2">
                  <Calendar className="w-3.5 h-3.5 text-[#CBA86B]" />
                  {activeItem.date}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleAudio}
                  className="p-2 text-[#D6B779] hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                  title={isPlayingAudio ? 'Parar leitura de áudio' : 'Ouvir comunicado'}
                >
                  {isPlayingAudio ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5" />}
                </button>

                <button
                  onClick={() => handleShare(activeItem.title)}
                  className="p-2 text-[#D6B779] hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                  title="Copiar link"
                >
                  {copiedLink ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
                </button>

                <button
                  onClick={closeModal}
                  className="p-2 text-[#FAF8F4]/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              {activeItem.image && (
                <div className="rounded-xl overflow-hidden max-h-72 w-full border border-[#B89554]/30">
                  <img
                    src={activeItem.image}
                    alt={activeItem.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = '/team_juri.jpg';
                    }}
                  />
                </div>
              )}

              <h2
                className="text-2xl sm:text-3xl font-bold text-[#FAF8F4] leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {activeItem.title}
              </h2>

              <p className="text-sm sm:text-base font-medium text-[#D6B779] leading-relaxed border-l-2 border-[#CBA86B] pl-4 italic">
                {activeItem.excerpt}
              </p>

              <div className="space-y-4 pt-4 border-t border-white/10 text-sm sm:text-base text-[#FAF8F4]/85 leading-relaxed font-light">
                {activeItem.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-[#17130F] border-t border-[#B89554]/30 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#FAF8F4]/60">
                Advocacia Nicolau · Publicações Oficiais
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#CBA86B] text-[#17130F] hover:bg-[#D6B779] text-xs font-semibold tracking-wide transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Esclarecer dúvidas</span>
                </a>
                <button
                  onClick={closeModal}
                  className="px-5 py-2.5 rounded-full border border-white/20 text-[#FAF8F4] hover:bg-white/10 text-xs font-semibold transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Footer */}
      <footer className="bg-[#100D0B] border-t border-[#B89554]/25 py-8 px-4 text-center text-xs text-[#FAF8F4]/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[#D6B779]">
            <span className="font-semibold">Advocacia Nicolau</span>
            <span>•</span>
            <span className="text-[#FAF8F4]/75">Desde 1978 em Guarapuava/PR</span>
          </div>

          <button
            onClick={onBackToHome}
            className="text-[#CBA86B] hover:underline cursor-pointer"
          >
            ← Voltar para a página inicial
          </button>
        </div>
      </footer>
    </div>
  );
};
