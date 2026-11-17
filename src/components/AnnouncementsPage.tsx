import React, { useState, useMemo, useEffect } from 'react';
import {
  ArrowLeft,
  Search,
  Calendar,
  ArrowRight,
  MessageSquare,
  BellRing,
  Clock,
  BookOpen,
} from 'lucide-react';
import { getStoredAnnouncements, AnnouncementItem, ContactInfo } from '../data/officeData';
import { Logo } from './Logo';

interface AnnouncementsPageProps {
  contactInfo: ContactInfo;
  announcementsList?: AnnouncementItem[];
  onBackToHome: () => void;
  onSelectPublication?: (id: string) => void;
  onOpenAdmin?: () => void;
}

export const AnnouncementsPage: React.FC<AnnouncementsPageProps> = ({
  contactInfo,
  announcementsList,
  onBackToHome,
  onSelectPublication,
}) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Dynamic typewriter animation on hero subtitle highlight
  const wordsToType = useMemo(
    () => [
      'Artigos Jurídicos.',
      'Notícias do Escritório.',
      'Comunicados Oficiais.',
      'Conteúdo Técnico.',
    ],
    []
  );
  const [wordIndex, setWordIndex] = useState(0);
  const [typedTitle, setTypedTitle] = useState('Artigos Jurídicos.');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = wordsToType[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && typedTitle === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && typedTitle === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % wordsToType.length);
    } else {
      const speed = isDeleting ? 38 : 80;
      timeout = setTimeout(() => {
        setTypedTitle((prev) =>
          isDeleting
            ? currentWord.substring(0, prev.length - 1)
            : currentWord.substring(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [typedTitle, isDeleting, wordIndex, wordsToType]);

  const items = announcementsList ?? getStoredAnnouncements();

  const publicationTypes = [
    { id: 'all', label: 'Todos os Tipos' },
    { id: 'Artigo Jurídico', label: 'Artigos Jurídicos' },
    { id: 'Notícia', label: 'Notícias' },
    { id: 'Comunicado Institucional', label: 'Comunicados Institucionais' },
  ];

  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => {
      if (item.tag) set.add(item.tag);
    });
    return ['all', ...Array.from(set)];
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const itemType = item.publicationType || 'Comunicado Institucional';
      const matchesType = selectedType === 'all' || itemType === selectedType;
      const matchesCategory = selectedCategory === 'all' || item.tag === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        item.title.toLowerCase().includes(q) ||
        (item.excerpt || '').toLowerCase().includes(q) ||
        (item.author || '').toLowerCase().includes(q) ||
        (item.content || []).some((c) => c.toLowerCase().includes(q));
      return matchesType && matchesCategory && matchesSearch;
    });
  }, [items, selectedType, selectedCategory, searchQuery]);

  const whatsappUrl = `https://wa.me/${contactInfo.whatsappNumberDigits}?text=${encodeURIComponent(
    'Olá! Gostaria de falar sobre uma publicação do portal da Advocacia Nicolau.'
  )}`;

  const handleOpenPublication = (item: AnnouncementItem) => {
    if (onSelectPublication) {
      onSelectPublication(item.id);
    }
  };

  return (
    <div className="min-h-screen bg-[#15110E] text-[#FAF8F4] flex flex-col font-sans selection:bg-[#B89554]/30 selection:text-[#FAF8F4]">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#17130F]/95 backdrop-blur-md border-b border-[#B89554]/25 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#D6B779] hover:text-[#FAF8F4] transition-colors cursor-pointer py-1.5 focus-visible:outline-none"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Início</span>
          </button>

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
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#B89554] text-[#D6B779] hover:bg-[#B89554] hover:text-[#17130F] text-xs font-semibold tracking-wider transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Falar Conosco</span>
          </a>
        </div>
      </header>

      {/* Hero Banner (Fundo Branco conforme preferência visual) */}
      <section className="relative py-16 sm:py-24 bg-white text-[#17130F] border-b border-[#8C6F36]/20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply">
          <img
            src="/office_facade_nicolau.webp"
            alt=""
            className="w-full h-full object-cover filter contrast-125"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-10 h-[1.5px] bg-[#8C6F36]" />
            <span
              className="text-xs uppercase tracking-[0.28em] text-[#8C6F36] font-semibold"
              style={{ fontFamily: "'Cinzel', Georgia, serif" }}
            >
              CENTRAL DE PUBLICAÇÕES · ADVOCACIA NICOLAU
            </span>
            <span className="w-10 h-[1.5px] bg-[#8C6F36]" />
          </div>

          <h1
            className="text-3xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#17130F] mb-5"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Publicações:<br />
            <span className="text-[#8C6F36] italic inline-block min-h-[1.2em]">
              {typedTitle}
              <span
                className="inline-block w-[3px] h-[0.8em] bg-[#8C6F36] ml-1.5 align-middle animate-pulse"
                aria-hidden="true"
              />
            </span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-[#4A3E36] font-normal max-w-2xl mx-auto leading-relaxed mb-10">
            Acervo unificado de conteúdos jurídicos, artigos doutrinários, notícias e comunicados institucionais da Advocacia Nicolau.
          </p>

          {/* Search Box */}
          <div className="max-w-xl mx-auto relative mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por título, tema jurídico, autor ou palavra-chave..."
              className="w-full pl-12 pr-4 py-3.5 bg-[#F8F6F1] border border-[#8C6F36]/30 rounded-full text-[#17130F] placeholder:text-slate-400 text-sm focus:border-[#8C6F36] focus:ring-2 focus:ring-[#8C6F36]/20 focus:outline-none transition-all shadow-sm"
            />
            <Search className="w-5 h-5 text-[#8C6F36] absolute left-4 top-1/2 -translate-y-1/2" />
          </div>

          {/* Publication Type Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto mb-3">
            {publicationTypes.map((typeOpt) => (
              <button
                key={typeOpt.id}
                type="button"
                onClick={() => setSelectedType(typeOpt.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                  selectedType === typeOpt.id
                    ? 'bg-[#8C6F36] text-white shadow-md'
                    : 'bg-[#F8F6F1] text-[#17130F] border border-[#8C6F36]/30 hover:border-[#8C6F36]'
                }`}
              >
                {typeOpt.label}
              </button>
            ))}
          </div>

          {/* Category Tag Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1 rounded-full text-[11px] font-medium tracking-wide transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#17130F] text-[#FAF8F4] font-semibold shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-[#8C6F36] hover:text-[#17130F]'
                }`}
              >
                {cat === 'all' ? 'Todas as Categorias' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Publications Grid */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#B89554]/25">
          <span className="text-xs sm:text-sm text-[#FAF8F4]/70">
            Exibindo <strong className="text-[#CBA86B] font-semibold">{filteredItems.length}</strong>{' '}
            {filteredItems.length === 1 ? 'publicação' : 'publicações'}
          </span>

          <span
            className="text-[11px] uppercase tracking-wider text-[#CBA86B] font-medium flex items-center gap-1.5"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Páginas Individuais</span>
          </span>
        </div>

        {filteredItems.length === 0 ? (
          <div className="py-20 text-center bg-[#251D17]/40 border border-[#B89554]/20 rounded-2xl p-8">
            <BellRing className="w-12 h-12 text-[#CBA86B]/50 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#FAF8F4] mb-2">
              Nenhuma publicação encontrada
            </h3>
            <p className="text-sm text-[#FAF8F4]/70 max-w-md mx-auto mb-6">
              Nenhum conteúdo corresponde à sua busca ou filtros selecionados.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedType('all');
                setSelectedCategory('all');
              }}
              className="px-5 py-2 rounded-full border border-[#CBA86B] text-[#CBA86B] text-xs font-semibold hover:bg-[#CBA86B] hover:text-[#17130F] transition-colors cursor-pointer"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                onClick={() => handleOpenPublication(item)}
                className="group flex flex-col justify-between bg-[#231B15] border border-[#B89554]/30 rounded-2xl overflow-hidden shadow-xl hover:border-[#CBA86B] hover:shadow-2xl hover:shadow-[#CBA86B]/15 transition-all duration-300 cursor-pointer animate-fadeIn"
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
                  <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center gap-1.5">
                    {item.publicationType && (
                      <span className="px-2.5 py-0.5 bg-[#17130F]/90 border border-[#CBA86B]/50 text-[#D6B779] text-[10px] font-semibold uppercase tracking-wider rounded-full">
                        {item.publicationType}
                      </span>
                    )}
                    <span className="px-3 py-0.5 bg-[#8C6F36] text-[#FAF8F4] text-[11px] font-semibold tracking-wide rounded-full shadow-md">
                      {item.tag}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#CBA86B] mb-3 font-light">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.date}</span>
                      </span>
                      {item.readTime && (
                        <span className="flex items-center gap-1 text-[#FAF8F4]/60">
                          <Clock className="w-3 h-3" />
                          <span>{item.readTime}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#FAF8F4] leading-snug group-hover:text-[#D6B779] transition-colors line-clamp-2 mb-3">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#FAF8F4]/75 font-light leading-relaxed line-clamp-3">
                      {item.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-[#CBA86B]">
                    <span>Abrir página da publicação</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Bottom Footer */}
      <footer className="bg-[#100D0B] border-t border-[#B89554]/25 py-8 px-4 text-center text-xs text-[#FAF8F4]/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[#D6B779]">
            <span className="font-semibold">Advocacia Nicolau</span>
            <span>•</span>
            <span className="text-[#FAF8F4]/75">Desde 1978 em Guarapuava/PR</span>
          </div>

          <button
            type="button"
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
