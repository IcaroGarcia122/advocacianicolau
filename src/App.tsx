import React, { useState, useEffect } from 'react';
import {
  initialContactInfo,
  ContactInfo,
  HeroSettings,
  Article,
  Lawyer,
  getStoredHeroSettings,
  saveStoredHeroSettings,
  getStoredArticles,
  saveStoredArticles,
  getStoredLawyers,
  saveStoredLawyers,
  AnnouncementItem,
  getStoredAnnouncements,
  saveStoredAnnouncements,
  loadAnnouncementsFromIDB,
  subscribeAnnouncementsSync,
} from './data/officeData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Team } from './components/Team';
import { PracticeAreas } from './components/PracticeAreas';
import { CtaSection } from './components/CtaSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PrivacyModal } from './components/PrivacyModal';
import { AnnouncementsPage } from './components/AnnouncementsPage';
import { PublicationDetailPage } from './components/PublicationDetailPage';
import { AdminPanel } from './components/AdminPanel';
import { AnnouncementsSection } from './components/AnnouncementsSection';

type AppView =
  | 'institutional'
  | 'publications'
  | 'publication-detail'
  | 'admin';

const parseHashState = (
  hash: string
): { view: AppView; publicationId: string | null } => {
  if (hash.startsWith('#publicacao/')) {
    const id = decodeURIComponent(hash.slice('#publicacao/'.length)).trim();
    if (id) {
      return { view: 'publication-detail', publicationId: id };
    }
  }
  if (
    hash === '#publicacoes-portal' ||
    hash === '#comunicados-oficiais' ||
    hash === '#pagina-comunicados' ||
    hash === '#producao-tecnica'
  ) {
    return { view: 'publications', publicationId: null };
  }
  if (hash === '#admin' || hash === '#painel') {
    return { view: 'admin', publicationId: null };
  }
  return { view: 'institutional', publicationId: null };
};

const loadNormalizedContactInfo = (): ContactInfo => {
  const saved = localStorage.getItem('nicolau_contact_info');
  if (!saved) return initialContactInfo;

  try {
    const parsed = JSON.parse(saved) as Partial<ContactInfo>;
    const migrated: ContactInfo = {
      ...initialContactInfo,
      ...parsed,
    };

    // Automatically replace legacy placeholder defaults when cached in browser storage
    if (!parsed.whatsappNumberDigits || parsed.whatsappNumberDigits === '5542998761978') {
      migrated.whatsappNumberDigits = initialContactInfo.whatsappNumberDigits;
    }
    if (!parsed.whatsapp || parsed.whatsapp === '(42) 99876-1978') {
      migrated.whatsapp = initialContactInfo.whatsapp;
    }
    if (!parsed.phone || parsed.phone === '(42) 3623-1978') {
      migrated.phone = initialContactInfo.phone;
    }
    if (
      !parsed.workingHours ||
      parsed.workingHours === 'Segunda a Sexta-feira: 08h30 às 12h00 e 13h30 às 18h00'
    ) {
      migrated.workingHours = initialContactInfo.workingHours;
    }
    if (!parsed.instagramUrl || parsed.instagramUrl === 'https://wa.me/5542999771939') {
      migrated.instagramUrl = initialContactInfo.instagramUrl;
    }
    if (!parsed.address || parsed.address === 'Rua XV de Novembro, 7840 - Centro') {
      migrated.address = initialContactInfo.address;
    }
    if (!parsed.cep || parsed.cep === '85010-000') {
      migrated.cep = initialContactInfo.cep;
    }
    if (
      !parsed.googleMapsUrl ||
      parsed.googleMapsUrl.includes('q=Guarapuava,+PR,+Brasil') ||
      parsed.googleMapsUrl.includes('Rua%20XV%20de%20Novembro')
    ) {
      migrated.googleMapsUrl = initialContactInfo.googleMapsUrl;
    }
    if (!parsed.googleMapsPlaceUrl) {
      migrated.googleMapsPlaceUrl = initialContactInfo.googleMapsPlaceUrl;
    }

    return migrated;
  } catch {
    return initialContactInfo;
  }
};

export default function App() {
  const initialRoute = parseHashState(window.location.hash);
  const [currentView, setCurrentView] = useState<AppView>(initialRoute.view);
  const [selectedPublicationId, setSelectedPublicationId] = useState<string | null>(
    initialRoute.publicationId
  );

  const [contactInfo, setContactInfo] = useState<ContactInfo>(() =>
    loadNormalizedContactInfo()
  );

  const [heroSettings, setHeroSettings] = useState<HeroSettings>(() => getStoredHeroSettings());
  const [articlesList, setArticlesList] = useState<Article[]>(() => getStoredArticles());
  const [lawyersList, setLawyersList] = useState<Lawyer[]>(() => getStoredLawyers());
  const [announcementsList, setAnnouncementsList] = useState<AnnouncementItem[]>(() =>
    getStoredAnnouncements()
  );

  const [activeSection, setActiveSection] = useState<string>('inicio');
  const [preselectedArea, setPreselectedArea] = useState<string>('');
  const [preselectedLawyer, setPreselectedLawyer] = useState<string>('');
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Hydrate full publications (with attached images) from IndexedDB and listen for cross-tab updates
  useEffect(() => {
    let active = true;
    void loadAnnouncementsFromIDB().then((idbItems) => {
      if (active && idbItems && idbItems.length > 0) {
        setAnnouncementsList(idbItems);
      }
    });
    const unsubscribe = subscribeAnnouncementsSync((syncedItems) => {
      if (active) {
        setAnnouncementsList(syncedItems);
      }
    });
    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  // Sync hash with views
  useEffect(() => {
    const handleHashChange = () => {
      const next = parseHashState(window.location.hash);
      setCurrentView(next.view);
      setSelectedPublicationId(next.publicationId);
      if (next.view !== 'institutional') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (currentView !== 'institutional') return;

    const handleScroll = () => {
      const sections = ['inicio', 'areas', 'sobre', 'equipe', 'publicacoes', 'contato'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  // Scroll animations across the entire page
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.reveal-on-scroll, .reveal-scale'));

    const revealVisible = () => {
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 60) {
          el.classList.add('is-revealed');
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: '60px 0px 0px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));
    revealVisible();
    const fallbackTimer = window.setTimeout(() => {
      revealVisible();
    }, 350);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallbackTimer);
    };
  }, [currentView, announcementsList]);

  const scrollToSection = (id: string) => {
    if (currentView !== 'institutional') {
      window.location.hash = '';
      setCurrentView('institutional');
      setSelectedPublicationId(null);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenPublicationsPage = () => {
    window.location.hash = 'publicacoes-portal';
    setCurrentView('publications');
    setSelectedPublicationId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPublication = (id: string) => {
    window.location.hash = `publicacao/${encodeURIComponent(id)}`;
    setSelectedPublicationId(id);
    setCurrentView('publication-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAdmin = () => {
    window.location.hash = 'admin';
    setCurrentView('admin');
    setSelectedPublicationId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToInstitutional = () => {
    window.location.hash = '';
    setCurrentView('institutional');
    setSelectedPublicationId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateContactInfo = (updated: ContactInfo) => {
    setContactInfo(updated);
    localStorage.setItem('nicolau_contact_info', JSON.stringify(updated));
  };

  const handleUpdateHeroSettings = (updated: HeroSettings) => {
    setHeroSettings(updated);
    saveStoredHeroSettings(updated);
  };

  const handleUpdateArticles = (updated: Article[]) => {
    setArticlesList(updated);
    saveStoredArticles(updated);
  };

  const handleUpdateLawyers = (updated: Lawyer[]) => {
    setLawyersList(updated);
    saveStoredLawyers(updated);
  };

  const handleUpdateAnnouncements = (updated: AnnouncementItem[]): boolean => {
    setAnnouncementsList(updated);
    return saveStoredAnnouncements(updated);
  };

  const handleSelectAreaForContact = (areaTitle: string) => {
    setPreselectedArea(areaTitle);
    scrollToSection('contato');
  };

  // View: Administrative Control Panel
  if (currentView === 'admin') {
    return (
      <AdminPanel
        contactInfo={contactInfo}
        heroSettings={heroSettings}
        articlesList={articlesList}
        lawyersList={lawyersList}
        announcementsList={announcementsList}
        onUpdateContactInfo={handleUpdateContactInfo}
        onUpdateHeroSettings={handleUpdateHeroSettings}
        onUpdateArticles={handleUpdateArticles}
        onUpdateLawyers={handleUpdateLawyers}
        onUpdateAnnouncements={handleUpdateAnnouncements}
        onOpenAnnouncementsPage={handleOpenPublicationsPage}
        onOpenPublication={handleSelectPublication}
        onExit={handleBackToInstitutional}
      />
    );
  }

  // View: Individual Publication Detail Page (#publicacao/<id>)
  if (currentView === 'publication-detail' && selectedPublicationId) {
    const activePublication =
      announcementsList.find((item) => item.id === selectedPublicationId) ||
      announcementsList[0];

    if (activePublication) {
      return (
        <PublicationDetailPage
          publication={activePublication}
          allPublications={announcementsList}
          contactInfo={contactInfo}
          onBackToHome={handleBackToInstitutional}
          onOpenPublicationsPortal={handleOpenPublicationsPage}
          onSelectPublication={handleSelectPublication}
        />
      );
    }
  }

  // View: Unified Publications Portal (#publicacoes-portal)
  if (currentView === 'publications') {
    return (
      <AnnouncementsPage
        contactInfo={contactInfo}
        announcementsList={announcementsList}
        onBackToHome={handleBackToInstitutional}
        onSelectPublication={handleSelectPublication}
        onOpenAdmin={handleOpenAdmin}
      />
    );
  }

  // View: Main Institutional Website
  return (
    <div className="min-h-screen bg-[#17130F] text-[#FAF8F4] flex flex-col font-sans selection:bg-[#B89554]/30 selection:text-[#FAF8F4]">
      {/* 1. Header / Navigation with Centered Logo */}
      <Header
        contactInfo={contactInfo}
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenPublicationsPage={handleOpenPublicationsPage}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Main Institutional Website */}
      <main className="flex-1 relative">
        {/* 1. Hero with background image, Playfair Display typography and typewriter animation */}
        <Hero
          heroSettings={heroSettings}
          contactInfo={contactInfo}
          onExploreClick={() => scrollToSection('areas')}
          onContactClick={() => scrollToSection('contato')}
        />

        {/* 2. Áreas de Atuação */}
        <div className="reveal-on-scroll">
          <PracticeAreas
            contactInfo={contactInfo}
            onSelectAreaForContact={handleSelectAreaForContact}
          />
        </div>

        {/* 3. O Escritório */}
        <div className="reveal-on-scroll">
          <About contactInfo={contactInfo} />
        </div>

        {/* 4. Nossa Equipe */}
        <div className="reveal-on-scroll">
          <Team
            contactInfo={contactInfo}
            onContactClick={() => scrollToSection('contato')}
          />
        </div>

        {/* 5. Publicações (Destaques com link para páginas individuais e portal completo) */}
        <div className="reveal-on-scroll">
          <AnnouncementsSection
            contactInfo={contactInfo}
            announcementsList={announcementsList}
            onOpenAnnouncementsPage={handleOpenPublicationsPage}
            onSelectPublication={handleSelectPublication}
          />
        </div>

        {/* 6. Chamada para Contato */}
        <div className="reveal-on-scroll">
          <CtaSection contactInfo={contactInfo} />
        </div>

        {/* 7. Contato e Localização */}
        <div className="reveal-on-scroll">
          <ContactSection
            contactInfo={contactInfo}
            onUpdateContactInfo={handleUpdateContactInfo}
            preselectedArea={preselectedArea}
            preselectedLawyer={preselectedLawyer}
          />
        </div>
      </main>

      {/* Footer matching main 6-item structure */}
      <Footer
        contactInfo={contactInfo}
        onNavigate={scrollToSection}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenContact={() => scrollToSection('contato')}
        onOpenPublicationsPage={handleOpenPublicationsPage}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Privacy and Institutional Modal */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </div>
  );
}
