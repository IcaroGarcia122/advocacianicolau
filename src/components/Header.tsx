import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { MessageSquare, Menu, X } from 'lucide-react';
import { ContactInfo } from '../data/officeData';

interface HeaderProps {
  contactInfo: ContactInfo;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenTechnicalPage?: () => void;
  onOpenCorporatePage?: () => void;
  onOpenAnnouncementsPage?: () => void;
  onOpenAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  contactInfo,
  activeSection,
  onNavigate,
  onOpenTechnicalPage,
  onOpenCorporatePage,
  onOpenAnnouncementsPage,
  onOpenAdmin,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'empresarial' && onOpenCorporatePage) {
      onOpenCorporatePage();
      return;
    }
    if (id === 'producao-tecnica' && onOpenTechnicalPage) {
      onOpenTechnicalPage();
      return;
    }
    if (id === 'pagina-comunicados' && onOpenAnnouncementsPage) {
      onOpenAnnouncementsPage();
      return;
    }
    onNavigate(id);
  };

  const whatsappUrl = `https://wa.me/${contactInfo.whatsappNumberDigits}?text=${encodeURIComponent(
    'Olá! Gostaria de falar com a equipe da Advocacia Nicolau.'
  )}`;

  // Navigation links on the LEFT of the logo (Contato removed as requested)
  const leftNavLinks = [
    { id: 'inicio', label: 'Início' },
    { id: 'areas', label: 'Áreas de Atuação' },
    { id: 'sobre', label: 'O Escritório' },
    { id: 'equipe', label: 'Nossa Equipe' },
  ];

  // Navigation links on the RIGHT of the logo (Comunicados positioned immediately to the right of the logo)
  const rightNavLinks = [
    { id: 'comunicados', label: 'Comunicados' },
    { id: 'pagina-comunicados', label: 'Página de Comunicados' },
    { id: 'empresarial', label: 'Empresarial' },
    { id: 'producao-tecnica', label: 'Produção Técnica' },
  ];

  const allNavLinks = [
    ...leftNavLinks,
    ...rightNavLinks,
  ];

  return (
    <header
      className="absolute top-0 left-0 right-0 z-40 bg-gradient-to-b from-[#17130F]/95 via-[#17130F]/75 to-transparent py-5 sm:py-7 px-4 sm:px-6 lg:px-8"
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Desktop & Laptop Layout: Aligned and centered on page (Left in-page links | Center Logo | Right external links) */}
        <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center gap-2 xl:gap-6 2xl:gap-8 w-full">
          
          {/* Left Session Links (In-page anchor sections, aligned towards center) */}
          <nav className="flex items-center justify-end gap-2 xl:gap-4 2xl:gap-5 text-xs lg:text-[11.5px] xl:text-[13px] 2xl:text-[14px] tracking-[0.04em] font-medium">
            {leftNavLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1.5 transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-[#FAF8F4] font-semibold text-shadow-sm'
                      : 'text-[#FAF8F4]/85 hover:text-[#CBA86B]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#CBA86B] rounded-full shadow-[0_0_8px_rgba(203,168,107,0.8)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Center: Official Golden Logo (Perfect horizontal and vertical center of page) */}
          <div className="flex items-center justify-center px-2 xl:px-6 shrink-0">
            <button
              onClick={() => handleNavClick('inicio')}
              className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B89554] cursor-pointer hover:scale-[1.03] transition-transform duration-200"
              aria-label="Advocacia Nicolau - Voltar ao início"
            >
              <Logo
                variant="gold"
                size="lg"
                className="drop-shadow-xl"
              />
            </button>
          </div>

          {/* Right Session Links (External page links, aligned towards center) */}
          <nav className="flex items-center justify-start gap-3 xl:gap-5 2xl:gap-6 text-xs lg:text-[12px] xl:text-[13.5px] 2xl:text-[14.5px] tracking-[0.05em] font-medium">
            {rightNavLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative py-1.5 transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-[#FAF8F4] font-semibold text-shadow-sm'
                      : 'text-[#FAF8F4]/85 hover:text-[#CBA86B]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#CBA86B] rounded-full shadow-[0_0_8px_rgba(203,168,107,0.8)]" />
                  )}
                </button>
              );
            })}
          </nav>

        </div>

        {/* Mobile & Tablet Header with Centered Large Logo */}
        <div className="flex lg:hidden items-center justify-between">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp"
            className="p-2.5 text-[#CBA86B] border border-[#B89554]/50 rounded-full hover:bg-[#B89554]/20 transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
          </a>

          {/* Centered Large Logo on mobile */}
          <button
            onClick={() => handleNavClick('inicio')}
            className="cursor-pointer"
            aria-label="Advocacia Nicolau"
          >
            <Logo variant="gold" size="md" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-[#FAF8F4] border border-[#B89554]/40 rounded-lg hover:text-[#CBA86B] hover:border-[#CBA86B] transition-colors focus-visible:outline-none"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay with all 8 Sessions */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#17130F]/98 backdrop-blur-xl border-b border-[#B89554]/30 px-6 py-8 animate-fadeIn shadow-2xl">
          <nav className="flex flex-col space-y-2.5">
            {allNavLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-left text-base font-medium tracking-wide text-[#FAF8F4]/90 hover:text-[#D6B779] py-2.5 border-b border-white/5 transition-colors cursor-pointer flex items-center justify-between"
              >
                <span>{link.label}</span>
                {activeSection === link.id && (
                  <span className="w-2 h-2 rounded-full bg-[#CBA86B]" />
                )}
              </button>
            ))}

            {onOpenAdmin && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="text-left text-xs tracking-wider text-[#CBA86B]/80 hover:text-[#CBA86B] py-2 border-b border-white/5 transition-colors cursor-pointer flex items-center justify-between pt-3"
              >
                <span>Painel Administrativo</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#B89554]/10 border border-[#B89554]/30">
                  Gerenciar
                </span>
              </button>
            )}

            <div className="pt-4 flex flex-col gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2.5 w-full py-3 text-xs font-semibold tracking-wider uppercase border border-[#B89554] text-[#D6B779] hover:bg-[#B89554] hover:text-[#17130F] rounded-full transition-colors shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Fale Conosco pelo WhatsApp</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
