import React from 'react';
import { Logo } from './Logo';
import { ContactInfo } from '../data/officeData';
import { MessageSquare, Instagram, MapPin, Lock } from 'lucide-react';

interface FooterProps {
  contactInfo: ContactInfo;
  onNavigate: (sectionId: string) => void;
  onOpenPrivacy: () => void;
  onOpenContact: () => void;
  onOpenTechnicalPage?: () => void;
  onOpenCorporatePage?: () => void;
  onOpenAnnouncementsPage?: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  contactInfo,
  onNavigate,
  onOpenPrivacy,
  onOpenContact,
  onOpenTechnicalPage,
  onOpenCorporatePage,
  onOpenAnnouncementsPage,
  onOpenAdmin,
}) => {
  const whatsappUrl = `https://wa.me/${contactInfo.whatsappNumberDigits}?text=${encodeURIComponent(
    'Olá! Entrei em contato através do site da Advocacia Nicolau.'
  )}`;

  const navLinks = [
    { id: 'inicio', label: 'Início' },
    { id: 'areas', label: 'Áreas de Atuação' },
    { id: 'sobre', label: 'O Escritório' },
    { id: 'equipe', label: 'Nossa Equipe' },
    { id: 'comunicados', label: 'Comunicados' },
    { id: 'empresarial', label: 'Empresarial' },
    { id: 'contato', label: 'Contato' },
  ];

  const handleLinkClick = (id: string) => {
    if (id === 'empresarial' && onOpenCorporatePage) {
      onOpenCorporatePage();
      return;
    }
    if (id === 'pagina-comunicados' && onOpenAnnouncementsPage) {
      onOpenAnnouncementsPage();
      return;
    }
    onNavigate(id);
  };

  return (
    <footer className="relative bg-[#100D0B] text-[#FAF8F4] border-t border-[#B89554]/25 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 relative z-10">
        {/* Main Footer Row matching template */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 pb-6">
          {/* Zone 1: Logo */}
          <div className="shrink-0">
            <button
              onClick={() => onNavigate('inicio')}
              className="cursor-pointer focus:outline-none"
            >
              <Logo variant="gold" size="md" />
            </button>
          </div>

          {/* Zone 2: Navigation Links separated by vertical lines */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4 text-xs tracking-wider font-light text-[#FAF8F4]/80 px-4 py-2 border-t md:border-t-0 md:border-l lg:border-r border-[#B89554]/30">
            {navLinks.map((link, idx) => (
              <React.Fragment key={link.id}>
                <button
                  onClick={() => handleLinkClick(link.id)}
                  className="hover:text-[#D6B779] transition-colors cursor-pointer py-1"
                >
                  {link.label}
                </button>
                <span className="text-[#B89554]/40 select-none" aria-hidden="true">
                  |
                </span>
              </React.Fragment>
            ))}

            {onOpenTechnicalPage && (
              <button
                onClick={onOpenTechnicalPage}
                className="text-[#D6B779] hover:text-[#FAF8F4] transition-colors cursor-pointer py-1 font-medium"
              >
                Produção Técnica
              </button>
            )}
          </div>

          {/* Zone 3: Social & Location Icons */}
          <div className="flex items-center gap-4 text-[#D6B779]">
            <button
              onClick={onOpenContact}
              title="Ver endereço e localização"
              className="p-2 hover:text-[#FAF8F4] hover:bg-[#B89554]/20 rounded-full transition-colors cursor-pointer"
              aria-label="Localização do escritório"
            >
              <MapPin className="w-4 h-4" />
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Falar no WhatsApp"
              className="p-2 hover:text-[#FAF8F4] hover:bg-[#B89554]/20 rounded-full transition-colors cursor-pointer"
              aria-label="WhatsApp da Advocacia Nicolau"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram Oficial"
              className="p-2 hover:text-[#FAF8F4] hover:bg-[#B89554]/20 rounded-full transition-colors cursor-pointer"
              aria-label="Instagram da Advocacia Nicolau"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Sub-footer exact template line */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#D6B779] font-light text-center">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="font-medium text-[#D6B779]">Advocacia Nicolau</span>
            <span className="text-[#B89554]/50">•</span>
            <span className="text-[#FAF8F4]/75">Desde 1978, ao seu lado.</span>
          </div>

          <div className="flex items-center gap-4">
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-[11px] text-[#CBA86B]/60 hover:text-[#CBA86B] flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Acessar painel administrativo para artigos e controle da página"
              >
                <Lock className="w-3 h-3 text-[#CBA86B]" />
                <span>Painel Admin</span>
              </button>
            )}

            <button
              onClick={onOpenPrivacy}
              className="text-[11px] text-[#FAF8F4]/50 hover:text-[#D6B779] underline underline-offset-2 transition-colors cursor-pointer"
            >
              Aviso Institucional & Privacidade
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
