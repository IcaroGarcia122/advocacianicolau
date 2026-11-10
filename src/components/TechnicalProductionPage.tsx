import React, { useState, useMemo } from 'react';
import { ArrowLeft, Search, Clock, Calendar, BookOpen, Volume2, VolumeX, Share2, Check, ArrowRight, MessageSquare } from 'lucide-react';
import { articles, Article, ContactInfo } from '../data/officeData';
import { Logo } from './Logo';

interface TechnicalProductionPageProps {
  contactInfo: ContactInfo;
  articlesList?: Article[];
  onBackToHome: () => void;
  onConsultTopic: (topicTitle: string) => void;
  onOpenAdmin?: () => void;
}

export const TechnicalProductionPage: React.FC<TechnicalProductionPageProps> = ({
  contactInfo,
  articlesList,
  onBackToHome,
  onConsultTopic,
  onOpenAdmin,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  // Dynamic typewriter writing animation on title (Animação de escrita contínua)
  const wordsToType = useMemo(
    () => ['Estudos Forenses.', 'Pareceres Jurídicos.', 'Doutrina Aplicada.', 'Teses e Análises.'],
    []
  );
  const [wordIndex, setWordIndex] = useState(0);
  const [typedTitle, setTypedTitle] = useState('Estudos Forenses.');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTyping, setIsTyping] = useState(true);

  React.useEffect(() => {
    const currentWord = wordsToType[wordIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && typedTitle === currentWord) {
      // Pause at full word before deleting
      setIsTyping(false);
      timeout = setTimeout(() => {
        setIsDeleting(true);
        setIsTyping(true);
      }, 2400);
    } else if (isDeleting && typedTitle === '') {
      // Move to next word after deleting
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % wordsToType.length);
      timeout = setTimeout(() => {
        setIsTyping(true);
      }, 400);
    } else {
      // Typing or deleting characters
      const speed = isDeleting ? 40 : 85;
      timeout = setTimeout(() => {
        setTypedTitle((prev) =>
          isDeleting
            ? currentWord.substring(0, prev.length - 1)
            : currentWord.substring(0, prev.length + 1)
        );
        setIsTyping(true);
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [typedTitle, isDeleting, wordIndex, wordsToType]);

  const categories = [
    { id: 'all', label: 'Todas as Áreas' },
    { id: 'Direito Criminal', label: 'Direito Criminal' },
    { id: 'Direito Civil', label: 'Direito Civil' },
    { id: 'Direito de Família', label: 'Direito de Família' },
  ];

  const currentArticles = articlesList && articlesList.length > 0 ? articlesList : articles;

  const filteredArticles = useMemo(() => {
    return currentArticles.filter((art) => {
      const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        art.title.toLowerCase().includes(query) ||
        art.description.toLowerCase().includes(query) ||
        art.content.some((p) => p.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [currentArticles, selectedCategory, searchQuery]);

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
  }, [filteredArticles]);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else if (activeArticle) {
      window.speechSynthesis.cancel();
      const textToRead = `${activeArticle.title}. ${activeArticle.description}. ${activeArticle.content.join(' ')}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const closeArticleModal = () => {
    if ('speechSynthesis' in window && isPlayingAudio) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
    setActiveArticle(null);
  };

  const whatsappUrl = `https://wa.me/${contactInfo.whatsappNumberDigits}?text=${encodeURIComponent(
    'Olá! Estive lendo a produção técnica da Advocacia Nicolau e gostaria de uma orientação jurídica.'
  )}`;

  return (
    <div className="min-h-screen bg-[#17130F] text-[#FAF8F4] flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#17130F]/95 backdrop-blur-md border-b border-[#B89554]/30 py-3.5 px-4 sm:px-8 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#D6B779] hover:text-[#FAF8F4] transition-colors cursor-pointer py-1.5 px-3 rounded-full border border-[#B89554]/40 hover:border-[#D6B779]"
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
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wider rounded-full bg-[#CBA86B] hover:bg-[#D6B779] text-[#17130F] transition-all shadow-md"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#17130F]" />
              <span className="hidden sm:inline">Falar com Advogado</span>
              <span className="sm:hidden">Contato</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Header (Sessão com Fundo Branco) */}
      <section className="relative py-16 lg:py-24 bg-white text-[#17130F] border-b border-[#8C6F36]/20 overflow-hidden">
        {/* Subtle Watermark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full opacity-[0.06] pointer-events-none flex justify-end items-center overflow-hidden">
          <img
            src="/logo_nicolau_dourado.png"
            alt=""
            className="w-[36rem] h-auto object-contain translate-x-1/4 filter contrast-125"
            onError={(e) => {
              const target = e.currentTarget;
              target.src = '/src/assets/images/Logotipo Dourado Advocacia Nicolau (1).png';
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
                PRODUÇÃO TÉCNICA & DOUTRINA JURÍDICA
              </span>
              <span className="w-16 h-[1.5px] bg-[#8C6F36]/50" />
            </div>

            {/* Main Title with Typewriter Writing Animation (Animação de Escrita) */}
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#17130F] mb-5"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Artigos, Pareceres e <br />
              <span className="text-[#8C6F36] italic font-normal inline-block">
                {typedTitle}
                <span
                  className="inline-block w-[3px] h-[0.8em] bg-[#8C6F36] ml-1.5 align-middle animate-cursor-blink"
                  aria-hidden="true"
                />
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#4A3E36] font-normal leading-relaxed mb-8">
              Espaço dedicado à produção acadêmica e técnica dos membros da Advocacia Nicolau. Análises fundamentadas das mais recentes decisões jurisprudenciais, reformas legislativas e teses aplicadas à defesa dos nossos clientes.
            </p>

            {/* Search Bar on White Background */}
            <div className="relative max-w-xl">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#8C6F36]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquisar por tema, tese, palavra-chave ou artigo..."
                className="w-full pl-12 pr-4 py-3.5 bg-[#F8F6F1] border border-[#8C6F36]/30 rounded-full text-sm text-[#17130F] placeholder:text-slate-400 focus:outline-none focus:border-[#8C6F36] focus:ring-2 focus:ring-[#8C6F36]/20 shadow-sm transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#8C6F36] hover:text-[#17130F] cursor-pointer"
                >
                  Limpar
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10 pb-4 border-b border-[#B89554]/20">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2 rounded-full text-xs tracking-wider transition-all cursor-pointer font-medium ${
                selectedCategory === cat.id
                  ? 'bg-[#CBA86B] text-[#17130F] shadow-md shadow-[#CBA86B]/20'
                  : 'bg-[#1F1914] text-[#FAF8F4]/80 hover:text-[#D6B779] border border-[#B89554]/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
          <span className="text-xs text-[#FAF8F4]/50 ml-auto hidden sm:block">
            Exibindo {filteredArticles.length} {filteredArticles.length === 1 ? 'publicação' : 'publicações'}
          </span>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-[#1A1410] rounded-2xl border border-[#B89554]/20 p-8">
            <BookOpen className="w-12 h-12 text-[#D6B779]/60 mx-auto mb-4" />
            <h3 className="text-xl font-serif text-[#FAF8F4] mb-2">Nenhum artigo encontrado</h3>
            <p className="text-xs sm:text-sm text-[#FAF8F4]/60 max-w-md mx-auto mb-6">
              Não encontramos resultados para sua busca com o termo &quot;{searchQuery}&quot;. Tente utilizar outros termos ou selecionar outra área.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-6 py-2.5 rounded-full border border-[#B89554] text-xs text-[#D6B779] hover:bg-[#B89554] hover:text-[#17130F] transition-colors"
            >
              Ver todas as publicações
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, idx) => (
              <article
                key={article.id}
                className="flex flex-col bg-[#1D1713] rounded-2xl overflow-hidden border border-[#B89554]/25 shadow-lg hover:border-[#D6B779]/70 hover:-translate-y-1 transition-all duration-300 group reveal-on-scroll"
                style={{ transitionDelay: `${(idx % 3) * 100}ms` }}
              >
                {/* Thumbnail Image */}
                <div className="relative h-48 overflow-hidden bg-[#282019]">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1D1713] via-transparent to-black/20" />
                  <span
                    className="absolute top-4 left-4 px-3 py-1 bg-[#17130F]/90 backdrop-blur-sm border border-[#B89554]/50 rounded-full text-[10px] tracking-widest uppercase text-[#D6B779] font-semibold"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {article.category}
                  </span>
                </div>

                {/* Article Info */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 text-xs text-[#FAF8F4]/60 mb-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#D6B779]" />
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#D6B779]" />
                        {article.readTime}
                      </span>
                    </div>

                    <h2
                      className="text-xl font-normal text-[#FAF8F4] leading-snug mb-3 group-hover:text-[#D6B779] transition-colors"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {article.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-[#FAF8F4]/75 font-light leading-relaxed line-clamp-3 mb-6">
                      {article.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] text-[#D6B779] font-medium tracking-wider">
                      Por {article.author}
                    </span>

                    <button
                      onClick={() => setActiveArticle(article)}
                      className="inline-flex items-center gap-1.5 text-xs text-[#FAF8F4] group-hover:text-[#D6B779] font-medium cursor-pointer"
                    >
                      <span>Ler Artigo</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Full Article Modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-3xl bg-[#191410] border border-[#B89554] rounded-2xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#B89554]/30 bg-[#14100D]">
              <span
                className="text-xs uppercase tracking-[0.2em] text-[#D6B779] font-semibold"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {activeArticle.category}
              </span>

              <div className="flex items-center gap-3">
                {/* Audio button */}
                {'speechSynthesis' in window && (
                  <button
                    onClick={handleToggleAudio}
                    className={`p-2 rounded-full border transition-colors cursor-pointer ${
                      isPlayingAudio
                        ? 'bg-[#B89554] text-[#17130F] border-[#D6B779]'
                        : 'border-[#B89554]/40 text-[#D6B779] hover:bg-[#B89554]/20'
                    }`}
                    title={isPlayingAudio ? 'Pausar leitura de voz' : 'Ouvir artigo por voz'}
                  >
                    {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                )}

                {/* Font Size Toggler */}
                <button
                  onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
                  className="px-2.5 py-1 rounded-full border border-[#B89554]/40 text-xs text-[#D6B779] hover:bg-[#B89554]/20 cursor-pointer"
                  title="Alternar tamanho da fonte"
                >
                  {fontSize === 'normal' ? 'A+' : 'A-'}
                </button>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full border border-[#B89554]/40 text-[#D6B779] hover:bg-[#B89554]/20 transition-colors cursor-pointer"
                  title="Copiar link"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                </button>

                {/* Close Button */}
                <button
                  onClick={closeArticleModal}
                  className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Fechar artigo"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-10 overflow-y-auto flex-1 space-y-6">
              <div>
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[#FAF8F4] leading-tight mb-4"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {activeArticle.title}
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#D6B779]/80 border-b border-[#B89554]/25 pb-4">
                  <span>Publicado por: {activeArticle.author}</span>
                  <span>•</span>
                  <span>{activeArticle.date}</span>
                  <span>•</span>
                  <span>{activeArticle.readTime}</span>
                </div>
              </div>

              {/* Cover Banner */}
              <div className="h-56 sm:h-64 rounded-xl overflow-hidden border border-[#B89554]/30">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Lead Paragraph */}
              <p className="text-base sm:text-lg italic text-[#D6B779] font-serif border-l-2 border-[#B89554] pl-4 py-1">
                {activeArticle.description}
              </p>

              {/* Article Paragraphs */}
              <div
                className={`space-y-5 text-[#FAF8F4]/90 font-light leading-relaxed ${
                  fontSize === 'large' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                }`}
              >
                {activeArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Formal Academic Citation Box */}
              <div className="p-4 rounded-xl bg-[#120E0B] border border-[#B89554]/20 text-xs text-[#FAF8F4]/70">
                <span className="font-semibold text-[#D6B779] block mb-1">Como citar este artigo:</span>
                <p className="font-mono text-[11px] leading-relaxed">
                  NICOLAU, Advocacia. &quot;{activeArticle.title}&quot;. Portal Institucional Advocacia Nicolau, Guarapuava/PR, {activeArticle.date}. Disponível em meio eletrônico institucional.
                </p>
              </div>

              {/* Contact Callout Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#211A14] to-[#17130F] border border-[#B89554]/40 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
                <div>
                  <h4 className="text-lg font-serif text-[#FAF8F4] mb-1">
                    Dúvidas jurídicas sobre esta matéria?
                  </h4>
                  <p className="text-xs text-[#FAF8F4]/75">
                    Nossa equipe está disponível para consultas detalhadas e pareceres jurídicos.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const title = activeArticle.title;
                    closeArticleModal();
                    onConsultTopic(title);
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#CBA86B] hover:bg-[#D6B779] text-[#17130F] font-semibold text-xs tracking-wider shrink-0 transition-colors cursor-pointer"
                >
                  Consultar sobre o Tema
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Technical Page Footer */}
      <footer className="bg-[#100D0B] border-t border-[#B89554]/30 py-8 px-4 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF8F4]/70">
          <div className="flex items-center gap-3">
            <Logo size="sm" />
            <span>Advocacia Nicolau · Desde 1978</span>
          </div>

          <button
            onClick={onBackToHome}
            className="text-[#D6B779] hover:underline cursor-pointer"
          >
            ← Retornar ao Site Institucional
          </button>
        </div>
      </footer>
    </div>
  );
};
