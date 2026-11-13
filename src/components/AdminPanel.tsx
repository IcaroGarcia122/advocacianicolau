import React, { useState } from 'react';
import {
  Lock,
  ArrowLeft,
  Plus,
  Trash2,
  Edit3,
  Save,
  CheckCircle2,
  AlertCircle,
  FileText,
  Phone,
  Scale,
  Layout,
  RefreshCw,
  Eye,
  X,
  MapPin,
  Calendar,
  Clock,
  User,
  Search,
  MessageSquare,
  ShieldAlert,
  BellRing,
  ExternalLink,
  ChevronRight,
  Database,
  Download,
  KeyRound,
  Check,
  TrendingUp,
  Inbox,
  Sparkles,
  Building2,
  Upload,
  Image as ImageIcon,
  Menu,
  Camera,
  ArrowLeftRight,
  Star,
  EyeOff,
  ChevronLeft,
} from 'lucide-react';
import {
  Article,
  ContactInfo,
  HeroSettings,
  Lawyer,
  initialContactInfo,
  initialHeroSettings,
  articles as defaultArticles,
  lawyers as defaultLawyers,
  HighlightItem,
  getStoredHighlights,
  saveStoredHighlights,
  AnnouncementItem,
  initialAnnouncementIds,
  ClientLead,
  getStoredClientLeads,
  saveStoredClientLeads,
  CorporateSettings,
  getStoredCorporateSettings,
  saveStoredCorporateSettings,
} from '../data/officeData';
import { Logo } from './Logo';

interface AdminPanelProps {
  contactInfo: ContactInfo;
  heroSettings: HeroSettings;
  articlesList: Article[];
  lawyersList: Lawyer[];
  announcementsList: AnnouncementItem[];
  onUpdateContactInfo: (updated: ContactInfo) => void;
  onUpdateHeroSettings: (updated: HeroSettings) => void;
  onUpdateArticles: (updated: Article[]) => void;
  onUpdateLawyers: (updated: Lawyer[]) => void;
  onUpdateAnnouncements: (updated: AnnouncementItem[]) => boolean | void;
  onOpenAnnouncementsPage?: () => void;
  onExit: () => void;
}

type AdminSection =
  | 'dashboard'
  | 'corporate'
  | 'announcements'
  | 'articles'
  | 'destaques'
  | 'hero'
  | 'lawyers'
  | 'leads'
  | 'contact'
  | 'settings';

interface ImageAttachmentPickerProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  helperText?: string;
}

const ImageAttachmentPicker: React.FC<ImageAttachmentPickerProps> = ({
  label,
  value,
  onChange,
  helperText = 'Anexe uma foto do seu dispositivo (celular/computador) ou escolha das imagens do escritório.',
}) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [isOptimizingImage, setIsOptimizingImage] = React.useState(false);
  const [pickerError, setPickerError] = React.useState<string | null>(null);

  const compressImageToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('Falha ao ler o arquivo.'));
      reader.onload = (event) => {
        const rawDataUrl = event.target?.result as string;
        if (!rawDataUrl) {
          reject(new Error('Arquivo vazio.'));
          return;
        }
        const img = new Image();
        img.onerror = () => reject(new Error('Formato de imagem não suportado pelo navegador.'));
        img.onload = () => {
          const encodeWithLimit = (maxDim: number, quality: number): string => {
            let { width, height } = img;
            if (width > maxDim || height > maxDim) {
              if (width >= height) {
                height = Math.round((height * maxDim) / width);
                width = maxDim;
              } else {
                width = Math.round((width * maxDim) / height);
                height = maxDim;
              }
            }
            const canvas = document.createElement('canvas');
            canvas.width = Math.max(1, width);
            canvas.height = Math.max(1, height);
            const ctx = canvas.getContext('2d');
            if (!ctx) return rawDataUrl;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const webpUrl = canvas.toDataURL('image/webp', quality);
            if (webpUrl.startsWith('data:image/webp')) {
              return webpUrl;
            }
            return canvas.toDataURL('image/jpeg', quality);
          };

          let result = encodeWithLimit(960, 0.78);
          if (result.length > 220000) {
            result = encodeWithLimit(800, 0.65);
          }
          if (result.length > 220000) {
            result = encodeWithLimit(640, 0.52);
          }
          resolve(result);
        };
        img.src = rawDataUrl;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    setPickerError(null);
    if (!file) return;
    if (file.size > 15 * 1024 * 1024) {
      setPickerError('A imagem é muito grande (máx. 15MB). Escolha outra foto.');
      return;
    }
    try {
      setIsOptimizingImage(true);
      const compressed = await compressImageToDataUrl(file);
      onChange(compressed);
    } catch (err) {
      setPickerError(err instanceof Error ? err.message : 'Não foi possível processar a imagem selecionada.');
    } finally {
      setIsOptimizingImage(false);
    }
  };

  const officePresets = [
    { label: 'Júri', path: '/team_juri.webp' },
    { label: 'Congresso', path: '/team_congresso.webp' },
    { label: 'Balança', path: '/balanca_livros.webp' },
    { label: 'Fachada', path: '/office_facade_nicolau.webp' },
    { label: 'Têmis', path: '/hero_justice_bg.webp' },
    { label: 'Dr. Miguel', path: '/lawyer_miguel_nicolau.webp' },
    { label: 'Dra. Elizanne', path: '/lawyer_elizanne_soares.webp' },
    { label: 'Dr. Felipe', path: '/lawyer_felipe_bahls.webp' },
  ];

  const isInlineDataUrl = value.startsWith('data:image');

  return (
    <div className="space-y-2.5 p-3.5 sm:p-4 bg-slate-50/90 rounded-2xl border border-slate-200">
      <div className="flex items-center justify-between">
        <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold">
          {label}
        </label>
        <span className="text-[11px] text-[#8C6F36] font-medium">
          {isOptimizingImage ? 'Otimizando imagem...' : 'Anexar ou Escolher'}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        {/* Thumbnail Preview */}
        <div className="w-24 h-20 sm:w-28 sm:h-20 rounded-xl overflow-hidden border border-slate-300 bg-slate-200 shrink-0 relative group">
          {value ? (
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/team_juri.webp';
              }}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 text-[10px]">
              <ImageIcon className="w-5 h-5 mb-1 opacity-50" />
              <span>Sem imagem</span>
            </div>
          )}
        </div>

        {/* Buttons & Input */}
        <div className="flex-1 w-full space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#17130F] hover:bg-[#8C6F36] text-[#FAF8F4] text-xs font-semibold transition-colors cursor-pointer shadow-sm active:scale-95"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Anexar Foto do Dispositivo</span>
            </button>

            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-300 text-slate-600 hover:text-red-600 hover:border-red-300 text-xs transition-colors cursor-pointer"
              >
                <Trash2 className="w-3 h-3" />
                <span>Remover</span>
              </button>
            )}
          </div>

          {/* Direct URL input or attached indicator */}
          <div>
            {isInlineDataUrl ? (
              <div className="flex items-center justify-between gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                <span className="font-medium truncate">Imagem anexada do dispositivo (pronta para publicação)</span>
                <button
                  type="button"
                  onClick={() => onChange('/team_juri.webp')}
                  className="text-[11px] font-semibold underline shrink-0 cursor-pointer hover:text-emerald-950"
                >
                  Usar link/padrão
                </button>
              </div>
            ) : (
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Ou cole o link ou caminho da imagem..."
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#8C6F36]"
              />
            )}
          </div>

          {/* Presets */}
          <div className="flex flex-wrap items-center gap-1 pt-0.5">
            <span className="text-[10px] text-slate-400 font-medium mr-1">Predefinidas:</span>
            {officePresets.map((preset) => (
              <button
                key={preset.path}
                type="button"
                onClick={() => {
                  setPickerError(null);
                  onChange(preset.path);
                }}
                className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] text-slate-600 hover:border-[#8C6F36] hover:text-[#8C6F36] transition-colors cursor-pointer"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {pickerError && (
        <div className="flex items-center gap-2 p-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
          <span>{pickerError}</span>
        </div>
      )}

      {helperText && (
        <p className="text-[11px] text-slate-500 font-light mt-0.5">{helperText}</p>
      )}
    </div>
  );
};

export const AdminPanel: React.FC<AdminPanelProps> = ({
  contactInfo,
  heroSettings,
  articlesList,
  lawyersList,
  announcementsList,
  onUpdateContactInfo,
  onUpdateHeroSettings,
  onUpdateArticles,
  onUpdateLawyers,
  onUpdateAnnouncements,
  onOpenAnnouncementsPage,
  onExit,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('nicolau_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Mobile sidebar drawer state
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Active Section on Left Sidebar
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');

  // State: Lawyer editing
  const [editingLawyer, setEditingLawyer] = useState<Lawyer | null>(null);

  // Toast State (with optional action link)
  const [toastState, setToastState] = useState<{
    message: string;
    type: 'success' | 'error';
    showAnnouncementsLink?: boolean;
  } | null>(null);
  const toastTimerRef = React.useRef<number | null>(null);

  const showToast = (
    msg: string,
    type: 'success' | 'error' = 'success',
    showAnnouncementsLink = false
  ) => {
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    setToastState({ message: msg, type, showAnnouncementsLink });
    toastTimerRef.current = window.setTimeout(() => setToastState(null), 5000);
  };

  // In-UI Confirmation modal state (avoids blocked window.confirm inside iframes)
  const [pendingDelete, setPendingDelete] = useState<{
    type: 'article' | 'announcement';
    id: string;
    title: string;
  } | null>(null);

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPin = localStorage.getItem('nicolau_admin_pin') || '1978';
    if (pinInput === storedPin || pinInput.toLowerCase() === 'admin' || pinInput === 'nicolau') {
      setIsAuthenticated(true);
      sessionStorage.setItem('nicolau_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Senha incorreta. Utilize o código de acesso padrão 1978 para demonstração.');
    }
  };

  const handleQuickDemoLogin = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('nicolau_admin_auth', 'true');
    setAuthError('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('nicolau_admin_auth');
    setPinInput('');
  };

  // State: Highlights (Destaques & Notícias)
  const [highlights, setHighlights] = useState<HighlightItem[]>(() => getStoredHighlights());
  const [editingHighlight, setEditingHighlight] = useState<HighlightItem | null>(null);

  // State: Announcements (Comunicados Oficiais) controlled by App.tsx
  const announcements = announcementsList;
  const [editingAnnouncement, setEditingAnnouncement] = useState<AnnouncementItem | null>(null);
  const [isNewAnnouncementModalOpen, setIsNewAnnouncementModalOpen] = useState(false);
  const [swapTargetAnnouncement, setSwapTargetAnnouncement] = useState<AnnouncementItem | null>(null);
  const [swapSearch, setSwapSearch] = useState('');
  const [replacingFeaturedSlotId, setReplacingFeaturedSlotId] = useState<string | null>(null);
  const [destaquesSearch, setDestaquesSearch] = useState('');
  const [destaquesFilter, setDestaquesFilter] = useState<'all' | 'new' | 'featured' | 'unfeatured'>('all');

  // State: Corporate Page Settings
  const [corporateForm, setCorporateForm] = useState<CorporateSettings>(() => getStoredCorporateSettings());

  // State: Client Leads (Atendimentos & Mensagens)
  const [leads, setLeads] = useState<ClientLead[]>(() => getStoredClientLeads());

  // State: Articles
  const [articleSearch, setArticleSearch] = useState('');
  const [selectedArticleCategory, setSelectedArticleCategory] = useState<string>('all');
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [previewArticle, setPreviewArticle] = useState<Article | null>(null);

  const [articleForm, setArticleForm] = useState<{
    title: string;
    category: 'Direito Criminal' | 'Direito Civil' | 'Direito de Família';
    description: string;
    author: string;
    readTime: string;
    date: string;
    image: string;
    contentRaw: string;
  }>({
    title: '',
    category: 'Direito Criminal',
    description: '',
    author: 'Advocacia Nicolau',
    readTime: '4 min de leitura',
    date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }),
    image: '/team_juri.webp',
    contentRaw: '',
  });

  // State: Hero & Slogan
  const [heroForm, setHeroForm] = useState<HeroSettings>({ ...heroSettings });

  // State: Contact Info Form
  const [contactForm, setContactForm] = useState<ContactInfo>({ ...contactInfo });

  // State: PIN Management
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  // Handlers for Articles
  const handleOpenNewArticle = () => {
    setEditingArticleId(null);
    setArticleForm({
      title: '',
      category: 'Direito Criminal',
      description: '',
      author: 'Advocacia Nicolau',
      readTime: '4 min de leitura',
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }),
      image: '/team_juri.webp',
      contentRaw: '',
    });
    setIsArticleModalOpen(true);
  };

  const handleOpenEditArticle = (art: Article) => {
    setEditingArticleId(art.id);
    setArticleForm({
      title: art.title,
      category: art.category,
      description: art.description,
      author: art.author,
      readTime: art.readTime,
      date: art.date,
      image: art.image,
      contentRaw: art.content.join('\n\n'),
    });
    setIsArticleModalOpen(true);
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleForm.title.trim()) return;

    const contentParagraphs = articleForm.contentRaw
      .split('\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const articleData: Article = {
      id: editingArticleId || `art-${Date.now()}`,
      title: articleForm.title.trim(),
      category: articleForm.category,
      description: articleForm.description.trim(),
      author: articleForm.author.trim() || 'Advocacia Nicolau',
      readTime: articleForm.readTime.trim() || '4 min de leitura',
      date: articleForm.date,
      image: articleForm.image.trim() || '/team_juri.webp',
      content: contentParagraphs.length > 0 ? contentParagraphs : [articleForm.description],
    };

    let updatedList: Article[];
    if (editingArticleId) {
      updatedList = articlesList.map((a) => (a.id === editingArticleId ? articleData : a));
      showToast('Artigo atualizado com sucesso!');
    } else {
      updatedList = [articleData, ...articlesList];
      showToast('Novo artigo publicado com sucesso!');
    }

    onUpdateArticles(updatedList);
    setIsArticleModalOpen(false);
  };

  const handleDeleteArticle = (id: string, title: string) => {
    setPendingDelete({ type: 'article', id, title });
  };

  // Handler for Lawyers
  const handleSaveLawyer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLawyer) return;
    const updated = lawyersList.map((l) => (l.id === editingLawyer.id ? editingLawyer : l));
    onUpdateLawyers(updated);
    setEditingLawyer(null);
    showToast('Perfil e foto do advogado atualizados com sucesso!');
  };

  // Handlers for Highlights
  const handleSaveHighlight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingHighlight) return;
    const updated = highlights.map((h) => (h.id === editingHighlight.id ? editingHighlight : h));
    setHighlights(updated);
    saveStoredHighlights(updated);
    setEditingHighlight(null);
    showToast('Destaque atualizado com sucesso!');
  };

  const isNewlyRegisteredAnnouncement = (item: AnnouncementItem) =>
    !initialAnnouncementIds.has(item.id);

  // Featured Announcements computed list (matches AnnouncementsSection on home page)
  const featuredAnnouncements = React.useMemo(() => {
    const flagged = announcements.filter((a) => a.featured === true);
    return flagged.length > 0 ? flagged : announcements.slice(0, 6);
  }, [announcements]);

  const orderedAllForDestaques = React.useMemo(() => {
    // Bring all newly registered announcements to the top first
    const newlyAdded = announcements.filter((a) => !initialAnnouncementIds.has(a.id));
    const standard = announcements.filter((a) => initialAnnouncementIds.has(a.id));
    return [...newlyAdded, ...standard];
  }, [announcements]);

  const filteredSelectorAnnouncements = React.useMemo(() => {
    const q = destaquesSearch.toLowerCase().trim();
    return orderedAllForDestaques.filter((item) => {
      const isNew = !initialAnnouncementIds.has(item.id);
      if (destaquesFilter === 'new' && !isNew) return false;
      if (destaquesFilter === 'featured' && !item.featured) return false;
      if (destaquesFilter === 'unfeatured' && item.featured) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.tag.toLowerCase().includes(q) ||
        (item.excerpt || '').toLowerCase().includes(q)
      );
    });
  }, [orderedAllForDestaques, destaquesSearch, destaquesFilter]);

  // Handlers for Announcements & Featured Highlights
  const handleOpenNewAnnouncement = (featuredByDefault = true, replaceSlotId: string | null = null) => {
    setReplacingFeaturedSlotId(replaceSlotId);
    setEditingAnnouncement({
      id: `com-${Date.now()}`,
      tag: 'Nota Oficial',
      title: '',
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }),
      image: '/team_juri.webp',
      excerpt: '',
      content: [''],
      featured: featuredByDefault,
    });
    setIsNewAnnouncementModalOpen(true);
  };

  const handleSaveAnnouncement = (item: AnnouncementItem) => {
    const cleanedContent = item.content.map((p) => p.trim()).filter((p) => p.length > 0);
    const normalizedItem: AnnouncementItem = {
      ...item,
      title: item.title.trim(),
      tag: item.tag.trim() || 'Nota Oficial',
      date: item.date.trim() || new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }),
      image: item.image.trim() || '/team_juri.webp',
      excerpt: item.excerpt.trim(),
      content: cleanedContent.length > 0 ? cleanedContent : [item.excerpt.trim() || item.title.trim()],
      featured: item.featured ?? true,
    };

    let updated: AnnouncementItem[];
    const exists = announcements.some((a) => a.id === normalizedItem.id);
    if (exists) {
      updated = announcements.map((a) => (a.id === normalizedItem.id ? normalizedItem : a));
    } else if (replacingFeaturedSlotId) {
      // Replace the chosen featured slot in exact position and unfeature the old one
      const slotIndex = announcements.findIndex((a) => a.id === replacingFeaturedSlotId);
      const unfeaturedList = announcements.map((a) =>
        a.id === replacingFeaturedSlotId ? { ...a, featured: false } : a
      );
      if (slotIndex >= 0) {
        updated = [
          ...unfeaturedList.slice(0, slotIndex),
          { ...normalizedItem, featured: true },
          ...unfeaturedList.slice(slotIndex),
        ];
      } else {
        updated = [{ ...normalizedItem, featured: true }, ...unfeaturedList];
      }
    } else {
      updated = [normalizedItem, ...announcements];
    }

    onUpdateAnnouncements(updated);

    showToast(
      exists
        ? 'Comunicado atualizado e salvo na Página de Comunicados!'
        : replacingFeaturedSlotId
        ? 'Nova notícia publicada e colocada em destaque!'
        : 'Novo comunicado publicado na Página de Comunicados!',
      'success',
      true
    );
    setReplacingFeaturedSlotId(null);
    setEditingAnnouncement(null);
    setIsNewAnnouncementModalOpen(false);
  };

  const handleDeleteAnnouncement = (id: string, title: string) => {
    setPendingDelete({ type: 'announcement', id, title });
  };

  const handleConfirmPendingDelete = () => {
    if (!pendingDelete) return;
    if (pendingDelete.type === 'article') {
      const updated = articlesList.filter((a) => a.id !== pendingDelete.id);
      onUpdateArticles(updated);
      showToast('Artigo removido com sucesso.');
    } else {
      const updated = announcements.filter((a) => a.id !== pendingDelete.id);
      onUpdateAnnouncements(updated);
      showToast('Comunicado removido.');
    }
    setPendingDelete(null);
  };

  const handleToggleAnnouncementFeatured = (id: string) => {
    const target = announcements.find((a) => a.id === id);
    if (!target) return;
    const nextFeatured = !target.featured;
    // Prevent removing the very last featured item unintentionally while keeping fallback safe
    const updated = announcements.map((a) => (a.id === id ? { ...a, featured: nextFeatured } : a));
    onUpdateAnnouncements(updated);
    showToast(
      nextFeatured
        ? 'Comunicado selecionado para os Destaques da Página Inicial!'
        : 'Comunicado removido dos Destaques (continua na Página de Comunicados).'
    );
  };

  const handleMoveFeaturedAnnouncement = (id: string, direction: 'left' | 'right') => {
    const featuredIds = featuredAnnouncements.map((a) => a.id);
    const posInFeatured = featuredIds.indexOf(id);
    if (posInFeatured === -1) return;
    const targetPos = direction === 'left' ? posInFeatured - 1 : posInFeatured + 1;
    if (targetPos < 0 || targetPos >= featuredIds.length) return;

    const swapPartnerId = featuredIds[targetPos];
    const idxA = announcements.findIndex((a) => a.id === id);
    const idxB = announcements.findIndex((a) => a.id === swapPartnerId);
    if (idxA === -1 || idxB === -1) return;

    const updated = [...announcements];
    const temp = updated[idxA];
    updated[idxA] = updated[idxB];
    updated[idxB] = temp;
    onUpdateAnnouncements(updated);
    showToast('Ordem dos destaques atualizada!');
  };

  const handleSwapFeaturedWithAnnouncement = (oldId: string, replacementId: string) => {
    const oldIdx = announcements.findIndex((a) => a.id === oldId);
    const replacement = announcements.find((a) => a.id === replacementId);
    if (oldIdx === -1 || !replacement) return;

    const withoutReplacement = announcements
      .filter((a) => a.id !== replacementId)
      .map((a) => (a.id === oldId ? { ...a, featured: false } : a));

    const targetInsertIndex = Math.min(oldIdx, withoutReplacement.length);
    const updated = [
      ...withoutReplacement.slice(0, targetInsertIndex),
      { ...replacement, featured: true },
      ...withoutReplacement.slice(targetInsertIndex),
    ];

    onUpdateAnnouncements(updated);
    setSwapTargetAnnouncement(null);
    setSwapSearch('');
    showToast('Destaque trocado pela publicação selecionada!');
  };

  const handleSwapFeaturedWithArticle = (oldId: string, article: Article) => {
    const existingConverted = announcements.find((a) => a.id === `art-dest-${article.id}`);
    const newAnnouncementFromArticle: AnnouncementItem = existingConverted || {
      id: `art-dest-${article.id}`,
      tag: article.category,
      title: article.title,
      date: article.date,
      image: article.image || '/team_juri.webp',
      excerpt: article.description,
      content: article.content,
      featured: true,
    };

    const oldIdx = announcements.findIndex((a) => a.id === oldId);
    const filtered = announcements
      .filter((a) => a.id !== newAnnouncementFromArticle.id)
      .map((a) => (a.id === oldId ? { ...a, featured: false } : a));

    const targetInsertIndex = oldIdx >= 0 ? Math.min(oldIdx, filtered.length) : 0;
    const updated = [
      ...filtered.slice(0, targetInsertIndex),
      { ...newAnnouncementFromArticle, featured: true },
      ...filtered.slice(targetInsertIndex),
    ];

    onUpdateAnnouncements(updated);
    setSwapTargetAnnouncement(null);
    setSwapSearch('');
    showToast(`Artigo "${article.title}" colocado no lugar do destaque!`);
  };

  const handlePromoteArticleToFeatured = (article: Article) => {
    const existingId = `art-dest-${article.id}`;
    const alreadyExists = announcements.some((a) => a.id === existingId);
    let updated: AnnouncementItem[];
    if (alreadyExists) {
      updated = announcements.map((a) => (a.id === existingId ? { ...a, featured: true } : a));
    } else {
      const newItem: AnnouncementItem = {
        id: existingId,
        tag: article.category,
        title: article.title,
        date: article.date,
        image: article.image || '/team_juri.webp',
        excerpt: article.description,
        content: article.content,
        featured: true,
      };
      updated = [newItem, ...announcements];
    }
    onUpdateAnnouncements(updated);
    showToast('Notícia adicionada aos destaques da Página Principal!');
  };

  // Handlers for Leads
  const handleUpdateLeadStatus = (leadId: string, newStatus: 'Novo' | 'Em Análise' | 'Atendido') => {
    const updated = leads.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l));
    setLeads(updated);
    saveStoredClientLeads(updated);
    showToast(`Status atualizado para "${newStatus}".`);
  };

  // Handlers for Corporate Page
  const handleSaveCorporate = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredCorporateSettings(corporateForm);
    showToast('Configurações da Página Empresarial salvas com sucesso!');
  };

  // Handlers for Hero
  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateHeroSettings(heroForm);
    showToast('Textos e slogan do Hero atualizados com sucesso!');
  };

  // Handlers for Contact Info
  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateContactInfo(contactForm);
    showToast('Dados de contato e localização atualizados com sucesso!');
  };

  // Handlers for PIN Change
  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPin || newPin.length < 4) {
      showToast('O PIN deve conter pelo menos 4 caracteres.', 'error');
      return;
    }
    if (newPin !== confirmPin) {
      showToast('As senhas digitadas não coincidem.', 'error');
      return;
    }
    localStorage.setItem('nicolau_admin_pin', newPin);
    setNewPin('');
    setConfirmPin('');
    showToast('Código de acesso PIN atualizado com sucesso!');
  };

  // Filtered articles
  const filteredArticles = articlesList.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(articleSearch.toLowerCase()) ||
      art.description.toLowerCase().includes(articleSearch.toLowerCase()) ||
      art.author.toLowerCase().includes(articleSearch.toLowerCase());
    const matchesCategory =
      selectedArticleCategory === 'all' || art.category === selectedArticleCategory;
    return matchesSearch && matchesCategory;
  });

  // =========================================================================
  // VIEW: AUTHENTICATION / LOGIN SCREEN (WHITE BACKGROUND)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] text-[#1E293B] flex flex-col justify-center items-center p-4 sm:p-6 font-sans">
        <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/60 relative overflow-hidden">
          {/* Subtle gold line on top */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#B89554] via-[#D6B779] to-[#8C6F36]" />

          <div className="text-center mb-8 relative z-10 pt-2">
            <div className="flex justify-center mb-5">
              <Logo size="md" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B89554]/10 border border-[#B89554]/30 text-[#8C6F36] text-[11px] uppercase tracking-widest font-semibold mb-2.5">
              <Lock className="w-3.5 h-3.5" />
              <span>Painel Administrativo</span>
            </div>

            <h1
              className="text-2xl sm:text-3xl font-serif text-[#17130F] font-medium"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Acesso Restrito
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Área de controle do portal Advocacia Nicolau
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1.5">
                Senha / Código de Acesso
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Digite a senha (padrão: 1978)"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#8C6F36] focus:ring-2 focus:ring-[#8C6F36]/20 transition-all"
                autoFocus
              />
            </div>

            {authError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-[#17130F] hover:bg-[#8C6F36] text-[#FAF8F4] font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Entrar no Painel</span>
            </button>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="text-[#8C6F36] font-medium hover:underline cursor-pointer"
              >
                Acesso Rápido Demo (1978)
              </button>

              <button
                type="button"
                onClick={onExit}
                className="text-slate-500 hover:text-slate-900 hover:underline cursor-pointer"
              >
                ← Voltar ao Site
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW: MAIN EXECUTIVE DASHBOARD (WHITE BACKGROUND + LEFT SIDEBAR)
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1E293B] flex font-sans">
      {/* Toast Notification */}
      {toastState && (
        <div
          className={`fixed top-5 right-5 z-[60] flex flex-wrap items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl animate-fadeIn text-xs sm:text-sm font-medium border ${
            toastState.type === 'error'
              ? 'bg-rose-950 text-rose-50 border-rose-500'
              : 'bg-[#17130F] text-[#FAF8F4] border-[#8C6F36]'
          }`}
        >
          {toastState.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <span>{toastState.message}</span>
          {toastState.showAnnouncementsLink && onOpenAnnouncementsPage && (
            <button
              type="button"
              onClick={() => {
                setToastState(null);
                onOpenAnnouncementsPage();
              }}
              className="px-3 py-1 rounded-lg bg-[#CBA86B] text-[#17130F] hover:bg-[#D6B779] text-xs font-bold transition-colors cursor-pointer"
            >
              Ver Página de Comunicados →
            </button>
          )}
        </div>
      )}

      {/* Mobile Backdrop Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 1. LEFT SIDEBAR (Sticky on desktop, off-canvas drawer on mobile) */}
      {/* ------------------------------------------------------------------- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200/90 flex flex-col justify-between shrink-0 h-screen transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Top Branding & Close Button on Mobile */}
        <div>
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Logo size="sm" />
              <div className="flex flex-col">
                <span
                  className="text-sm font-bold tracking-wider text-[#17130F] leading-tight"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  ADVOCACIA NICOLAU
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#8C6F36] font-semibold">
                  Painel Administrativo
                </span>
              </div>
            </div>

            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              aria-label="Fechar menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Status Card */}
          <div className="p-4 mx-3 my-3 bg-slate-50/80 rounded-2xl border border-slate-200/60 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#17130F] text-[#FAF8F4] flex items-center justify-center font-serif text-sm font-bold shrink-0">
              MN
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-slate-900 truncate">
                Dr. Miguel Nicolau Jr.
              </span>
              <span className="text-[11px] text-[#8C6F36] font-mono">
                OAB/PR 7.708 · Titular
              </span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="px-3 py-2 space-y-1 overflow-y-auto max-h-[calc(100vh-280px)]">
            <button
              onClick={() => {
                setActiveSection('dashboard');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeSection === 'dashboard'
                  ? 'bg-[#17130F] text-[#FAF8F4] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <TrendingUp className="w-4 h-4 text-[#CBA86B]" />
                <span>Visão Geral</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            </button>

            <div className="pt-2 pb-1 px-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Páginas Secundárias
              </span>
            </div>

            <button
              onClick={() => {
                setActiveSection('corporate');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeSection === 'corporate'
                  ? 'bg-[#17130F] text-[#FAF8F4] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-[#CBA86B]" />
                <span>Página Empresarial</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            </button>

            <button
              onClick={() => {
                setActiveSection('announcements');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeSection === 'announcements'
                  ? 'bg-[#17130F] text-[#FAF8F4] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BellRing className="w-4 h-4 text-[#CBA86B]" />
                <span>Página Comunicados</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8C6F36]/15 text-[#8C6F36] font-bold">
                {announcements.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveSection('articles');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeSection === 'articles'
                  ? 'bg-[#17130F] text-[#FAF8F4] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-[#CBA86B]" />
                <span>Produção Técnica</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8C6F36]/15 text-[#8C6F36] font-bold">
                {articlesList.length}
              </span>
            </button>

            <div className="pt-2 pb-1 px-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Página Principal
              </span>
            </div>

            <button
              onClick={() => {
                setActiveSection('destaques');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeSection === 'destaques'
                  ? 'bg-[#17130F] text-[#FAF8F4] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#CBA86B]" />
                <span>Destaques & Pauta</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#8C6F36]/15 text-[#8C6F36] font-bold">
                {featuredAnnouncements.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveSection('hero');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeSection === 'hero'
                  ? 'bg-[#17130F] text-[#FAF8F4] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layout className="w-4 h-4 text-[#CBA86B]" />
                <span>Hero & Slogan</span>
              </div>
            </button>

            <button
              onClick={() => {
                setActiveSection('lawyers');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeSection === 'lawyers'
                  ? 'bg-[#17130F] text-[#FAF8F4] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Scale className="w-4 h-4 text-[#CBA86B]" />
                <span>Corpo Jurídico (3)</span>
              </div>
            </button>

            <button
              onClick={() => {
                setActiveSection('leads');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeSection === 'leads'
                  ? 'bg-[#17130F] text-[#FAF8F4] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Inbox className="w-4 h-4 text-[#CBA86B]" />
                <span>Atendimentos (Leads)</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                {leads.filter((l) => l.status === 'Novo').length} novo
              </span>
            </button>

            <button
              onClick={() => {
                setActiveSection('contact');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeSection === 'contact'
                  ? 'bg-[#17130F] text-[#FAF8F4] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#CBA86B]" />
                <span>Contato & Sede</span>
              </div>
            </button>

            <button
              onClick={() => {
                setActiveSection('settings');
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeSection === 'settings'
                  ? 'bg-[#17130F] text-[#FAF8F4] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <KeyRound className="w-4 h-4 text-[#CBA86B]" />
                <span>Segurança & PIN</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Bottom Sidebar Controls */}
        <div className="p-4 border-t border-slate-100 space-y-2">
          <button
            onClick={onExit}
            className="w-full py-2.5 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Retornar ao Portal</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-2.5 px-3.5 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Encerrar Sessão</span>
          </button>
        </div>
      </aside>

      {/* ------------------------------------------------------------------- */}
      {/* 2. MAIN WORKSPACE CONTENT (White / Slate Light Theme) */}
      {/* ------------------------------------------------------------------- */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto max-h-screen">
        {/* Top Header Bar with Mobile Drawer Trigger */}
        <header className="bg-white border-b border-slate-200/80 px-4 sm:px-8 py-3.5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-[#8C6F36] transition-colors cursor-pointer shrink-0"
              aria-label="Abrir menu do painel"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h1
                className="text-lg sm:text-2xl font-serif text-[#17130F] font-medium leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {activeSection === 'dashboard' && 'Visão Geral & Métricas'}
                {activeSection === 'corporate' && 'Página Empresarial & Societário'}
                {activeSection === 'destaques' && 'Destaques & Notícias em Pauta'}
                {activeSection === 'announcements' && 'Comunicados Oficiais do Escritório'}
                {activeSection === 'articles' && 'Produção Técnica & Artigos'}
                {activeSection === 'hero' && 'Textos da Home & Slogan'}
                {activeSection === 'lawyers' && 'Corpo Jurídico & Advogados'}
                {activeSection === 'leads' && 'Atendimentos & Solicitações de Clientes'}
                {activeSection === 'contact' && 'Informações de Contato & Sede'}
                {activeSection === 'settings' && 'Segurança, PIN & Sistema'}
              </h1>
              <p className="text-[11px] sm:text-xs text-slate-500">
                Controle centralizado do site institucional da Advocacia Nicolau
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Portal Online
            </span>

            {activeSection === 'articles' && (
              <button
                onClick={handleOpenNewArticle}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#17130F] hover:bg-[#8C6F36] text-[#FAF8F4] text-xs font-semibold rounded-xl transition-all shadow-sm cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Novo Artigo</span>
              </button>
            )}

            {activeSection === 'announcements' && (
              <button
                onClick={() => handleOpenNewAnnouncement(true, null)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#17130F] hover:bg-[#8C6F36] text-[#FAF8F4] text-xs font-semibold rounded-xl transition-all shadow-sm cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Novo Comunicado</span>
              </button>
            )}

            {activeSection === 'destaques' && (
              <button
                onClick={() => handleOpenNewAnnouncement(true, null)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#17130F] hover:bg-[#8C6F36] text-[#FAF8F4] text-xs font-semibold rounded-xl transition-all shadow-sm cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Nova Notícia em Destaque</span>
              </button>
            )}
          </div>
        </header>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* =============================================================== */}
          {/* TAB 1: VISÃO GERAL (DASHBOARD) */}
          {/* =============================================================== */}
          {activeSection === 'dashboard' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                      Produção Técnica
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif text-[#17130F] font-bold mt-1">
                      {articlesList.length}
                    </h3>
                    <span className="text-[11px] text-[#8C6F36]">Artigos Publicados</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#B89554]/10 text-[#8C6F36] flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                      Destaques
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif text-[#17130F] font-bold mt-1">
                      {featuredAnnouncements.length}
                    </h3>
                    <span className="text-[11px] text-emerald-600">Ativos na Página Principal</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Sparkles className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                      Comunicados
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif text-[#17130F] font-bold mt-1">
                      {announcements.length}
                    </h3>
                    <span className="text-[11px] text-blue-600">Notas Oficiais</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <BellRing className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                      Atendimentos
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif text-[#17130F] font-bold mt-1">
                      {leads.length}
                    </h3>
                    <span className="text-[11px] text-amber-600 font-medium">
                      {leads.filter((l) => l.status === 'Novo').length} novos recebidos
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Inbox className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Quick Actions & Recent Leads */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Recent Leads */}
                <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                      <Inbox className="w-4 h-4 text-[#8C6F36]" />
                      <span>Últimas Solicitações de Consulta</span>
                    </h3>
                    <button
                      onClick={() => setActiveSection('leads')}
                      className="text-xs text-[#8C6F36] hover:underline font-medium cursor-pointer"
                    >
                      Ver todas ({leads.length})
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {leads.slice(0, 3).map((lead) => (
                      <div key={lead.id} className="py-3.5 flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-semibold text-slate-900 truncate">
                              {lead.name}
                            </h4>
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                lead.status === 'Novo'
                                  ? 'bg-amber-100 text-amber-800'
                                  : lead.status === 'Em Análise'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}
                            >
                              {lead.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 truncate mt-0.5">{lead.message}</p>
                          <span className="text-[11px] text-slate-400 font-mono">{lead.date} · {lead.area}</span>
                        </div>

                        <a
                          href={`https://wa.me/55${lead.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Olá, ${lead.name}! Aqui é da Advocacia Nicolau referente à sua consulta jurídica.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-[#8C6F36] hover:bg-[#6E5528] text-white text-xs font-semibold rounded-lg shrink-0 transition-colors flex items-center gap-1.5 shadow-sm"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">WhatsApp</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Editor Navigation */}
                <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Layout className="w-4 h-4 text-[#8C6F36]" />
                      <span>Atalhos de Gerenciamento</span>
                    </h3>
                    <p className="text-xs text-slate-500 mb-4">
                      Acesse diretamente qualquer módulo para atualizar o site em tempo real:
                    </p>

                    <div className="space-y-2">
                      <button
                        onClick={() => setActiveSection('destaques')}
                        className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/70 text-xs font-medium text-slate-800 flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span>📰 Atualizar Matérias de Destaques (2ª Sessão)</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>

                      <button
                        onClick={() => setActiveSection('articles')}
                        className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/70 text-xs font-medium text-slate-800 flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span>✍️ Publicar Novo Artigo na Produção Técnica</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>

                      <button
                        onClick={() => setActiveSection('hero')}
                        className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/70 text-xs font-medium text-slate-800 flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span>🏛️ Modificar Slogan e Animação do Hero</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>

                      <button
                        onClick={() => setActiveSection('contact')}
                        className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/70 text-xs font-medium text-slate-800 flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span>📞 Atualizar Telefones, WhatsApp e Endereço</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs text-slate-500">
                    <span>Advocacia Nicolau · Desde 1978</span>
                    <button onClick={onExit} className="text-[#8C6F36] font-semibold hover:underline cursor-pointer">
                      Ver Site Institucional →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* TAB: PÁGINA EMPRESARIAL (CONFIGURAÇÃO COMPLETA) */}
          {/* =============================================================== */}
          {activeSection === 'corporate' && (
            <div className="space-y-6">
              {/* Top Banner Card */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B89554]/10 border border-[#B89554]/30 text-[#8C6F36] text-[11px] uppercase tracking-wider font-semibold mb-2">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Página Exclusiva de Direito Empresarial</span>
                  </div>
                  <h3 className="text-xl font-serif text-slate-900 font-semibold">
                    Personalização da Página Corporativa
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-xl">
                    Configure os textos do Hero (sessão com fundo branco), os 4 pilares de atendimento e os setores econômicos assessorados pela banca.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSaveCorporate}
                  className="px-5 py-2.5 bg-[#8C6F36] hover:bg-[#6E5528] text-white text-xs font-semibold rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-2 shrink-0 self-start sm:self-center"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar Alterações</span>
                </button>
              </div>

              <form onSubmit={handleSaveCorporate} className="space-y-6">
                {/* 1. Hero Section (White Background) */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h4 className="text-sm uppercase tracking-wider font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#8C6F36]" />
                      Sessão Principal (Hero com Fundo Branco)
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Textos de abertura exibidos com fundo branco e contraste institucional:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1.5">
                        Kicker / Tag Superior
                      </label>
                      <input
                        type="text"
                        value={corporateForm.kicker}
                        onChange={(e) => setCorporateForm({ ...corporateForm, kicker: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1.5">
                        Texto do Botão CTA (WhatsApp)
                      </label>
                      <input
                        type="text"
                        value={corporateForm.ctaButtonText}
                        onChange={(e) => setCorporateForm({ ...corporateForm, ctaButtonText: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1.5">
                        Título Principal (Linha 1)
                      </label>
                      <input
                        type="text"
                        value={corporateForm.titlePart1}
                        onChange={(e) => setCorporateForm({ ...corporateForm, titlePart1: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1.5">
                        Destaque em Itálico Dourado
                      </label>
                      <input
                        type="text"
                        value={corporateForm.titleHighlight}
                        onChange={(e) => setCorporateForm({ ...corporateForm, titleHighlight: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1.5">
                      Texto Institucional / Descritivo
                    </label>
                    <textarea
                      rows={3}
                      value={corporateForm.description}
                      onChange={(e) => setCorporateForm({ ...corporateForm, description: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36] resize-none"
                    />
                  </div>
                </div>

                {/* 2. The 4 Pillars */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-6">
                  <div className="border-b border-slate-100 pb-3">
                    <h4 className="text-sm uppercase tracking-wider font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#8C6F36]" />
                      Os 4 Pilares da Assessoria Corporativa
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Edite as 4 áreas de atuação especializada, suas descrições e os tópicos de atendimento:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {corporateForm.pillars.map((pillar, idx) => (
                      <div
                        key={pillar.id}
                        className="p-5 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6F36]">
                            Pilar {idx + 1}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-mono">
                            ID: {pillar.id}
                          </span>
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-slate-600 font-semibold mb-1">
                            Tag / Categoria
                          </label>
                          <input
                            type="text"
                            value={pillar.tag}
                            onChange={(e) => {
                              const updated = [...corporateForm.pillars];
                              updated[idx].tag = e.target.value;
                              setCorporateForm({ ...corporateForm, pillars: updated });
                            }}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-slate-600 font-semibold mb-1">
                            Título do Pilar
                          </label>
                          <input
                            type="text"
                            value={pillar.title}
                            onChange={(e) => {
                              const updated = [...corporateForm.pillars];
                              updated[idx].title = e.target.value;
                              setCorporateForm({ ...corporateForm, pillars: updated });
                            }}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-slate-600 font-semibold mb-1">
                            Resumo Curto
                          </label>
                          <textarea
                            rows={2}
                            value={pillar.shortDesc}
                            onChange={(e) => {
                              const updated = [...corporateForm.pillars];
                              updated[idx].shortDesc = e.target.value;
                              setCorporateForm({ ...corporateForm, pillars: updated });
                            }}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#8C6F36] resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-wider text-slate-600 font-semibold mb-1">
                            Pontos Detalhados (1 por linha)
                          </label>
                          <textarea
                            rows={3}
                            value={pillar.details.join('\n')}
                            onChange={(e) => {
                              const updated = [...corporateForm.pillars];
                              updated[idx].details = e.target.value.split('\n').filter((l) => l.trim().length > 0);
                              setCorporateForm({ ...corporateForm, pillars: updated });
                            }}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Sectors / Industries */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h4 className="text-sm uppercase tracking-wider font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#8C6F36]" />
                      Setores Econômicos Atendidos
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Segmentos do agronegócio, indústria e comércio destacados na página corporativa:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {corporateForm.industries.map((ind, idx) => (
                      <div key={idx} className="p-4 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-2">
                        <label className="block text-[11px] uppercase tracking-wider text-slate-600 font-semibold">
                          Nome do Setor {idx + 1}
                        </label>
                        <input
                          type="text"
                          value={ind.title}
                          onChange={(e) => {
                            const updated = [...corporateForm.industries];
                            updated[idx].title = e.target.value;
                            setCorporateForm({ ...corporateForm, industries: updated });
                          }}
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                        />

                        <label className="block text-[11px] uppercase tracking-wider text-slate-600 font-semibold pt-1">
                          Descrição de Atuação
                        </label>
                        <textarea
                          rows={2}
                          value={ind.desc}
                          onChange={(e) => {
                            const updated = [...corporateForm.industries];
                            updated[idx].desc = e.target.value;
                            setCorporateForm({ ...corporateForm, industries: updated });
                          }}
                          className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-[#8C6F36] resize-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="flex items-center justify-end gap-3 pt-4">
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-[#17130F] hover:bg-[#8C6F36] text-[#FAF8F4] text-xs uppercase tracking-wider font-semibold rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Salvar Todas as Alterações da Página Empresarial</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* =============================================================== */}
          {/* TAB 2: DESTAQUES & NOTÍCIAS NA PÁGINA PRINCIPAL */}
          {/* =============================================================== */}
          {activeSection === 'destaques' && (
            <div className="space-y-8">
              {/* Header Info Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Destaques na Página Inicial ({featuredAnnouncements.length} selecionado{featuredAnnouncements.length === 1 ? '' : 's'})
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Escolha abaixo quais comunicados devem aparecer na vitrine da página inicial. Todos os novos comunicados registrados aparecem listados para seleção imediata.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  {onOpenAnnouncementsPage && (
                    <button
                      type="button"
                      onClick={onOpenAnnouncementsPage}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#8C6F36]" />
                      <span>Ver Página Comunicados</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleOpenNewAnnouncement(true, null)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#8C6F36] hover:bg-[#6E5528] text-white text-xs font-semibold rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Registrar Nova Notícia</span>
                  </button>
                </div>
              </div>

              {/* Active Featured Cards */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500">
                    Em Exibição na Página Inicial ({featuredAnnouncements.length})
                  </h4>
                  <span className="text-[11px] text-slate-500">
                    Use as setas para reordenar ou &quot;Trocar Notícia&quot; para substituir
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredAnnouncements.map((item, idx) => {
                    const isNewItem = isNewlyRegisteredAnnouncement(item);
                    return (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl border-2 border-[#B89554]/50 shadow-sm overflow-hidden flex flex-col justify-between"
                      >
                        <div>
                          <div className="h-44 relative overflow-hidden bg-slate-900">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = '/team_juri.webp';
                              }}
                            />
                            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#967444] text-white text-[10px] font-bold">
                              {item.tag}
                            </span>
                            <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center gap-1 shadow">
                              <Star className="w-3 h-3 fill-current" />
                              <span>Destaque #{idx + 1}</span>
                            </span>
                            {isNewItem && (
                              <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full bg-amber-400 text-[#17130F] text-[10px] font-extrabold uppercase tracking-wider shadow">
                                Novo Registrado
                              </span>
                            )}
                          </div>

                          <div className="p-5">
                            <span className="text-[11px] text-[#8C6F36] font-medium block mb-1">
                              {item.date}
                            </span>
                            <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                              {item.title}
                            </h4>
                            <p className="text-xs text-slate-500 mt-2 line-clamp-3">
                              {item.excerpt || item.content[0]}
                            </p>
                          </div>
                        </div>

                        <div className="p-4 border-t border-slate-100 bg-slate-50/70 space-y-2">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setSwapSearch('');
                                setSwapTargetAnnouncement(item);
                              }}
                              className="flex-1 min-w-[125px] px-3 py-2 bg-[#8C6F36] hover:bg-[#6E5528] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                              title="Trocar este destaque por outra notícia registrada"
                            >
                              <ArrowLeftRight className="w-3.5 h-3.5" />
                              <span>Trocar Notícia</span>
                            </button>

                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => handleMoveFeaturedAnnouncement(item.id, 'left')}
                                className="p-2 border border-slate-200 bg-white text-slate-600 hover:text-slate-900 disabled:opacity-35 rounded-xl transition-colors cursor-pointer"
                                title="Mover antes"
                              >
                                <ChevronLeft className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                disabled={idx === featuredAnnouncements.length - 1}
                                onClick={() => handleMoveFeaturedAnnouncement(item.id, 'right')}
                                className="p-2 border border-slate-200 bg-white text-slate-600 hover:text-slate-900 disabled:opacity-35 rounded-xl transition-colors cursor-pointer"
                                title="Mover depois"
                              >
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setReplacingFeaturedSlotId(null);
                                  setEditingAnnouncement(item);
                                  setIsNewAnnouncementModalOpen(true);
                                }}
                                className="p-2 bg-[#17130F] hover:bg-[#8C6F36] text-white rounded-xl transition-colors cursor-pointer"
                                title="Editar conteúdo"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              {featuredAnnouncements.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleToggleAnnouncementFeatured(item.id)}
                                  className="p-2 border border-slate-300 text-slate-600 hover:text-rose-600 hover:border-rose-300 rounded-xl transition-colors cursor-pointer"
                                  title="Remover dos destaques da página inicial"
                                >
                                  <EyeOff className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Unified Selector: Choose WHICH Comunicados to keep as Destaque on the Home Page */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-5">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h4 className="text-base font-semibold text-slate-900">
                      Escolher Comunicados para Destaque na Página Inicial ({announcements.length} cadastrados)
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Marque ou desmarque qualquer comunicado (incluindo todos os novos registrados) para definir o que fica em destaque na página inicial:
                    </p>
                  </div>

                  <div className="relative w-full lg:w-72">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={destaquesSearch}
                      onChange={(e) => setDestaquesSearch(e.target.value)}
                      placeholder="Filtrar comunicados..."
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                    />
                  </div>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { id: 'all', label: `Todos (${announcements.length})` },
                    {
                      id: 'new',
                      label: `Novos Registrados (${announcements.filter((a) => !initialAnnouncementIds.has(a.id)).length})`,
                    },
                    {
                      id: 'featured',
                      label: `Em Destaque (${announcements.filter((a) => a.featured === true).length})`,
                    },
                    {
                      id: 'unfeatured',
                      label: `Fora do Destaque (${announcements.filter((a) => !a.featured).length})`,
                    },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setDestaquesFilter(tab.id as any)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        destaquesFilter === tab.id
                          ? 'bg-[#17130F] text-[#FAF8F4]'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {filteredSelectorAnnouncements.length === 0 ? (
                  <p className="text-xs text-slate-500 py-6 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                    Nenhum comunicado encontrado neste filtro. Clique em &quot;Registrar Nova Notícia&quot; para adicionar um novo comunicado.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {filteredSelectorAnnouncements.map((item) => {
                      const isNewItem = isNewlyRegisteredAnnouncement(item);
                      const isFeatured = item.featured === true;
                      const isLastFeatured = isFeatured && featuredAnnouncements.length <= 1;
                      return (
                        <div
                          key={item.id}
                          className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                            isFeatured
                              ? 'border-[#B89554] bg-amber-50/35 shadow-xs'
                              : 'border-slate-200 bg-slate-50/60 hover:border-slate-300'
                          }`}
                        >
                          <label className="flex items-center gap-3 min-w-0 flex-1 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isFeatured}
                              disabled={isLastFeatured}
                              onChange={() => handleToggleAnnouncementFeatured(item.id)}
                              className="w-4 h-4 accent-[#8C6F36] rounded cursor-pointer shrink-0 disabled:opacity-50"
                            />
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-14 h-12 rounded-lg object-cover shrink-0 border border-slate-200"
                              onError={(e) => {
                                e.currentTarget.src = '/team_juri.webp';
                              }}
                            />
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                                <span className="text-[10px] uppercase tracking-wider font-bold text-[#8C6F36]">
                                  {item.tag}
                                </span>
                                {isNewItem && (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 text-amber-950 font-bold">
                                    Novo Registrado
                                  </span>
                                )}
                              </div>
                              <h5 className="text-xs font-bold text-slate-900 line-clamp-2">{item.title}</h5>
                              <span className="text-[11px] text-slate-500">{item.date}</span>
                            </div>
                          </label>

                          <button
                            type="button"
                            disabled={isLastFeatured}
                            onClick={() => handleToggleAnnouncementFeatured(item.id)}
                            className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold shrink-0 transition-colors cursor-pointer flex items-center gap-1 disabled:opacity-50 ${
                              isFeatured
                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                : 'bg-[#17130F] hover:bg-[#8C6F36] text-white'
                            }`}
                          >
                            <Star className={`w-3 h-3 ${isFeatured ? 'fill-current' : ''}`} />
                            <span>{isFeatured ? 'No Destaque' : 'Destacar'}</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Technical Articles available to promote to home highlights */}
                {articlesList.length > 0 && (
                  <div className="pt-5 border-t border-slate-100 space-y-3">
                    <h5 className="text-xs uppercase tracking-wider font-bold text-slate-500">
                      Artigos da Produção Técnica (Promover para Destaque na Inicial)
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {articlesList.map((art) => {
                        const alreadyFeaturedAsAnnouncement = announcements.some(
                          (a) => a.id === `art-dest-${art.id}` && a.featured === true
                        );
                        return (
                          <div
                            key={art.id}
                            className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <img
                                src={art.image}
                                alt={art.title}
                                className="w-14 h-12 rounded-lg object-cover shrink-0 border border-slate-200"
                                onError={(e) => {
                                  e.currentTarget.src = '/team_juri.webp';
                                }}
                              />
                              <div className="min-w-0">
                                <span className="text-[10px] uppercase tracking-wider font-bold text-blue-700 block">
                                  Artigo · {art.category}
                                </span>
                                <h5 className="text-xs font-bold text-slate-900 line-clamp-2">{art.title}</h5>
                                <span className="text-[11px] text-slate-500">{art.date}</span>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => handlePromoteArticleToFeatured(art)}
                              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold shrink-0 transition-colors cursor-pointer flex items-center gap-1 ${
                                alreadyFeaturedAsAnnouncement
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                  : 'bg-[#17130F] hover:bg-[#8C6F36] text-white'
                              }`}
                            >
                              <Star className={`w-3 h-3 ${alreadyFeaturedAsAnnouncement ? 'fill-current' : 'text-[#CBA86B]'}`} />
                              <span>{alreadyFeaturedAsAnnouncement ? 'No Destaque' : 'Destacar'}</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* TAB 3: COMUNICADOS OFICIAIS */}
          {/* =============================================================== */}
          {activeSection === 'announcements' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Notas Públicas & Comunicados Forenses ({announcements.length})
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Todos os comunicados abaixo são exibidos na Página de Comunicados. Os marcados como &quot;Em Destaque&quot; também aparecem na Página Principal.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  {onOpenAnnouncementsPage && (
                    <button
                      type="button"
                      onClick={onOpenAnnouncementsPage}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#8C6F36]" />
                      <span>Ver Página de Comunicados</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleOpenNewAnnouncement(true, null)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#8C6F36] hover:bg-[#6E5528] text-white text-xs font-semibold rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Adicionar Comunicado</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {announcements.map((item) => {
                  const isNewItem = isNewlyRegisteredAnnouncement(item);
                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between"
                    >
                      <div>
                        <div className="h-44 relative overflow-hidden bg-slate-900">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/team_juri.webp';
                            }}
                          />
                          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#967444] text-white text-[10px] font-bold">
                            {item.tag}
                          </span>
                          {item.featured && (
                            <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center gap-1 shadow">
                              <Star className="w-3 h-3 fill-current" />
                              <span>Em Destaque</span>
                            </span>
                          )}
                          {isNewItem && (
                            <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full bg-amber-400 text-[#17130F] text-[10px] font-extrabold uppercase tracking-wider shadow">
                              Novo
                            </span>
                          )}
                        </div>

                        <div className="p-5">
                          <span className="text-[11px] text-[#8C6F36] font-medium block mb-1">
                            {item.date}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-500 mt-2 line-clamp-3">
                            {item.excerpt}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleDeleteAnnouncement(item.id, item.title)}
                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Excluir comunicado"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleToggleAnnouncementFeatured(item.id)}
                            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                              item.featured
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                                : 'bg-white text-slate-600 border border-slate-200 hover:border-[#8C6F36] hover:text-[#8C6F36]'
                            }`}
                            title={item.featured ? 'Remover dos destaques da home' : 'Colocar nos destaques da home'}
                          >
                            <Star className={`w-3 h-3 ${item.featured ? 'fill-current' : ''}`} />
                            <span>{item.featured ? 'No Destaque' : 'Destacar'}</span>
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setReplacingFeaturedSlotId(null);
                            setEditingAnnouncement(item);
                            setIsNewAnnouncementModalOpen(true);
                          }}
                          className="px-4 py-2 bg-[#17130F] hover:bg-[#8C6F36] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Editar</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* TAB 4: PRODUÇÃO TÉCNICA (ARTIGOS) */}
          {/* =============================================================== */}
          {activeSection === 'articles' && (
            <div className="space-y-6">
              {/* Search and Category Filters */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={articleSearch}
                    onChange={(e) => setArticleSearch(e.target.value)}
                    placeholder="Buscar artigo por título ou autor..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#8C6F36]"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {['all', 'Direito Criminal', 'Direito Civil', 'Direito de Família'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedArticleCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        selectedArticleCategory === cat
                          ? 'bg-[#17130F] text-[#FAF8F4]'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat === 'all' ? 'Todas as Áreas' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <div
                    key={article.id}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
                  >
                    <div>
                      <div className="h-44 relative overflow-hidden bg-slate-900">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#17130F] text-[#FAF8F4] text-[10px] font-bold border border-[#B89554]/40">
                          {article.category}
                        </span>
                      </div>

                      <div className="p-5">
                        <span className="text-[11px] text-[#8C6F36] font-medium block mb-1">
                          {article.date} · {article.readTime}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
                          {article.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-2 line-clamp-3">
                          {article.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setPreviewArticle(article)}
                          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                          title="Pré-visualizar"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteArticle(article.id, article.title)}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => handleOpenEditArticle(article)}
                        className="px-4 py-2 bg-[#17130F] hover:bg-[#8C6F36] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Editar</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* TAB 5: HERO & SLOGAN */}
          {/* =============================================================== */}
          {activeSection === 'hero' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Configuração de Textos do Hero
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Personalize a primeira impressão do portal, o slogan de impacto e a frase manuscrita animada:
                </p>

                <form onSubmit={handleSaveHero} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1">
                      Kicker Superior
                    </label>
                    <input
                      type="text"
                      value={heroForm.kicker}
                      onChange={(e) => setHeroForm({ ...heroForm, kicker: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1">
                        Slogan - Linha 1
                      </label>
                      <input
                        type="text"
                        value={heroForm.sloganPart1}
                        onChange={(e) => setHeroForm({ ...heroForm, sloganPart1: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1">
                        Slogan - Linha 2
                      </label>
                      <input
                        type="text"
                        value={heroForm.sloganPart2}
                        onChange={(e) => setHeroForm({ ...heroForm, sloganPart2: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8C6F36] font-semibold mb-1">
                      Frase em Dourado com Animação de Digitação
                    </label>
                    <input
                      type="text"
                      value={heroForm.sloganHighlight}
                      onChange={(e) => setHeroForm({ ...heroForm, sloganHighlight: e.target.value })}
                      placeholder="a sua jornada."
                      className="w-full px-4 py-2.5 bg-amber-50/40 border border-[#B89554]/50 rounded-xl text-xs sm:text-sm text-slate-900 font-serif italic focus:outline-none focus:border-[#8C6F36]"
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Esta frase é animada letra por letra na página principal.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1">
                      Subtítulo / Descritivo
                    </label>
                    <textarea
                      rows={3}
                      value={heroForm.subtitle}
                      onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1">
                      Texto do Botão Principal
                    </label>
                    <input
                      type="text"
                      value={heroForm.buttonText}
                      onChange={(e) => setHeroForm({ ...heroForm, buttonText: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                    />
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#17130F] hover:bg-[#8C6F36] text-[#FAF8F4] text-xs font-semibold rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Salvar Textos do Hero</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Live Preview Card */}
              <div className="lg:col-span-5 bg-[#17130F] text-[#FAF8F4] p-6 sm:p-8 rounded-2xl border border-[#B89554]/40 shadow-xl flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#CBA86B] font-bold block mb-4 border-b border-[#B89554]/30 pb-2">
                    Pré-Visualização do Hero
                  </span>

                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#CBA86B] font-semibold block mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                    {heroForm.kicker}
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-serif font-normal leading-tight mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {heroForm.sloganPart1}<br />
                    {heroForm.sloganPart2}<br />
                    <span className="text-[#CBA86B] italic">{heroForm.sloganHighlight}</span>
                  </h3>

                  <p className="text-xs text-[#FAF8F4]/80 leading-relaxed font-light mb-6">
                    {heroForm.subtitle}
                  </p>

                  <div className="inline-block px-5 py-2.5 rounded-full bg-[#CBA86B] text-[#17130F] text-xs font-semibold">
                    {heroForm.buttonText}
                  </div>
                </div>

                <div className="pt-6 border-t border-[#B89554]/30 mt-6 text-[11px] text-[#FAF8F4]/60">
                  Visualização idêntica à renderização ao vivo para o visitante.
                </div>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* TAB 6: CORPO JURÍDICO (ADVOGADOS) */}
          {/* =============================================================== */}
          {activeSection === 'lawyers' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">
                  Advogados Sócios da Advocacia Nicolau
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Membros integrantes exibidos na sessão com fundo branco:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {lawyersList.map((lawyer) => (
                  <div
                    key={lawyer.id}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3.5 mb-4">
                        <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-300 bg-slate-900 shrink-0 shadow-sm">
                          <img
                            src={lawyer.image}
                            alt={lawyer.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/team_juri.webp';
                            }}
                          />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-slate-900 leading-tight">
                            {lawyer.name}
                          </h4>
                          <span className="text-xs text-[#8C6F36] font-mono font-medium block">
                            {lawyer.oab}
                          </span>
                        </div>
                      </div>

                      <span className="inline-block px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold mb-3">
                        {lawyer.role}
                      </span>

                      <p className="text-xs text-slate-600 leading-relaxed font-normal">
                        {lawyer.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Inscrição ativa na OAB/PR</span>
                      <button
                        type="button"
                        onClick={() => setEditingLawyer(lawyer)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#17130F] hover:bg-[#8C6F36] text-white text-xs font-semibold transition-colors cursor-pointer shadow-sm active:scale-95"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Editar Foto & Perfil</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* TAB 7: ATENDIMENTOS & LEADS */}
          {/* =============================================================== */}
          {activeSection === 'leads' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Solicitações de Consulta e Contato Recebidas ({leads.length})
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Gerencie o fluxo de novos clientes que enviaram formulários ou iniciaram contato:
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm divide-y divide-slate-100 overflow-hidden">
                {leads.map((lead) => (
                  <div key={lead.id} className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
                    <div className="space-y-2 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-3">
                        <h4 className="text-base font-bold text-slate-900">{lead.name}</h4>
                        <span
                          className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                            lead.status === 'Novo'
                              ? 'bg-amber-100 text-amber-800'
                              : lead.status === 'Em Análise'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {lead.status}
                        </span>
                        <span className="text-xs text-[#8C6F36] font-semibold bg-[#8C6F36]/10 px-2.5 py-0.5 rounded-full">
                          {lead.area}
                        </span>
                      </div>

                      <p className="text-sm text-slate-700 leading-relaxed font-normal">
                        "{lead.message}"
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-light">
                        <span className="flex items-center gap-1 font-mono">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          {lead.phone}
                        </span>
                        <span>{lead.email}</span>
                        <span>{lead.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <select
                        value={lead.status}
                        onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as any)}
                        className="px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none"
                      >
                        <option value="Novo">Status: Novo</option>
                        <option value="Em Análise">Status: Em Análise</option>
                        <option value="Atendido">Status: Atendido</option>
                      </select>

                      <a
                        href={`https://wa.me/55${lead.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Olá, ${lead.name}! Aqui é da Advocacia Nicolau referente à sua consulta jurídica em ${lead.area}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-[#8C6F36] hover:bg-[#6E5528] text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Abrir no WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* TAB 8: DADOS DE CONTATO & SEDE */}
          {/* =============================================================== */}
          {activeSection === 'contact' && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm max-w-3xl">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Informações Institucionais & Telefonia
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Dados exibidos na barra superior, rodapé e sessão de contato:
              </p>

              <form onSubmit={handleSaveContact} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1">
                      Telefone Fixo
                    </label>
                    <input
                      type="text"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1">
                      WhatsApp Comercial
                    </label>
                    <input
                      type="text"
                      value={contactForm.whatsapp}
                      onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1">
                      E-mail Institucional
                    </label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1">
                      Horário de Funcionamento
                    </label>
                    <input
                      type="text"
                      value={contactForm.workingHours}
                      onChange={(e) => setContactForm({ ...contactForm, workingHours: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1">
                      Endereço da Sede
                    </label>
                    <input
                      type="text"
                      value={contactForm.address}
                      onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1">
                      Cidade / UF
                    </label>
                    <input
                      type="text"
                      value={`${contactForm.city} - ${contactForm.state}`}
                      readOnly
                      className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-600 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#17130F] hover:bg-[#8C6F36] text-[#FAF8F4] text-xs font-semibold rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Salvar Dados de Contato</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* =============================================================== */}
          {/* TAB 9: SEGURANÇA & PIN */}
          {/* =============================================================== */}
          {activeSection === 'settings' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-[#8C6F36]" />
                  <span>Alterar Código PIN de Acesso</span>
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Defina um novo PIN para restringir o acesso a este painel administrativo:
                </p>

                <form onSubmit={handleChangePin} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1">
                      Novo PIN de Acesso (Mínimo 4 caracteres)
                    </label>
                    <input
                      type="password"
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                      placeholder="Ex: 1978"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1">
                      Confirmar Novo PIN
                    </label>
                    <input
                      type="password"
                      value={confirmPin}
                      onChange={(e) => setConfirmPin(e.target.value)}
                      placeholder="Repita o novo PIN"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#17130F] hover:bg-[#8C6F36] text-[#FAF8F4] text-xs font-semibold rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Atualizar PIN</span>
                  </button>
                </form>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <Database className="w-5 h-5 text-[#8C6F36]" />
                    <span>Backup & Exportação</span>
                  </h3>
                  <p className="text-xs text-slate-500 mb-6">
                    Baixe uma cópia dos artigos, comunicados, destaques e dados do escritório em formato JSON:
                  </p>

                  <button
                    onClick={() => {
                      const dataToExport = {
                        contactInfo,
                        heroSettings,
                        articlesList,
                        highlights,
                        announcements,
                        lawyersList,
                        exportDate: new Date().toISOString(),
                      };
                      const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `backup_advocacia_nicolau_${new Date().toISOString().slice(0, 10)}.json`;
                      a.click();
                      showToast('Backup JSON exportado com sucesso!');
                    }}
                    className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-200"
                  >
                    <Download className="w-4 h-4 text-[#8C6F36]" />
                    <span>Exportar Backup do Site (.JSON)</span>
                  </button>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-6 text-xs text-slate-500">
                  Advocacia Nicolau · Painel Institucional Seguro
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ------------------------------------------------------------------- */}
      {/* MODAL: EDIT ARTICLE */}
      {/* ------------------------------------------------------------------- */}
      {isArticleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn" role="dialog" aria-modal="true">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                {editingArticleId ? 'Editar Artigo Jurídico' : 'Publicar Novo Artigo'}
              </h3>
              <button onClick={() => setIsArticleModalOpen(false)} className="p-1 rounded-full text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1">
                  Título do Artigo *
                </label>
                <input
                  type="text"
                  required
                  value={articleForm.title}
                  onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                  placeholder="Ex: Tribunal do Júri e as Garantias da Ampla Defesa"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1">
                    Área do Direito
                  </label>
                  <select
                    value={articleForm.category}
                    onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value as any })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none"
                  >
                    <option value="Direito Criminal">Direito Criminal</option>
                    <option value="Direito Civil">Direito Civil</option>
                    <option value="Direito de Família">Direito de Família</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1">
                    Autor
                  </label>
                  <input
                    type="text"
                    value={articleForm.author}
                    onChange={(e) => setArticleForm({ ...articleForm, author: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                  />
                </div>
              </div>

              {/* Image Attachment Picker */}
              <ImageAttachmentPicker
                label="Imagem de Capa do Artigo *"
                value={articleForm.image}
                onChange={(img) => setArticleForm({ ...articleForm, image: img })}
                helperText="Anexe uma foto do seu dispositivo ou escolha das imagens do escritório."
              />

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1">
                  Resumo / Descrição Rápida *
                </label>
                <textarea
                  rows={2}
                  required
                  value={articleForm.description}
                  onChange={(e) => setArticleForm({ ...articleForm, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1">
                  Conteúdo Completo (parágrafos separados por linha em branco) *
                </label>
                <textarea
                  rows={6}
                  required
                  value={articleForm.contentRaw}
                  onChange={(e) => setArticleForm({ ...articleForm, contentRaw: e.target.value })}
                  placeholder="Escreva os parágrafos do artigo..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsArticleModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#17130F] hover:bg-[#8C6F36] text-white transition-colors shadow-sm"
                >
                  Salvar Artigo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* MODAL: EDIT HIGHLIGHT */}
      {/* ------------------------------------------------------------------- */}
      {editingHighlight && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn" role="dialog" aria-modal="true">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                Editar Notícia de Destaque
              </h3>
              <button onClick={() => setEditingHighlight(null)} className="p-1 rounded-full text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveHighlight} className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1">
                  Título da Notícia
                </label>
                <input
                  type="text"
                  required
                  value={editingHighlight.title}
                  onChange={(e) => setEditingHighlight({ ...editingHighlight, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1">
                    Tag / Categoria
                  </label>
                  <input
                    type="text"
                    value={editingHighlight.tagLabel}
                    onChange={(e) => setEditingHighlight({ ...editingHighlight, tagLabel: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1">
                    Data
                  </label>
                  <input
                    type="text"
                    value={editingHighlight.date}
                    onChange={(e) => setEditingHighlight({ ...editingHighlight, date: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1">
                  Subtítulo
                </label>
                <input
                  type="text"
                  value={editingHighlight.subtitle || ''}
                  onChange={(e) => setEditingHighlight({ ...editingHighlight, subtitle: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                />
              </div>

              {/* Image Attachment Picker */}
              <ImageAttachmentPicker
                label="Imagem do Destaque *"
                value={editingHighlight.image || '/team_juri.webp'}
                onChange={(img) => setEditingHighlight({ ...editingHighlight, image: img })}
                helperText="Anexe uma foto para ilustrar esta matéria de destaque."
              />

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1">
                  Texto da Matéria
                </label>
                <textarea
                  rows={4}
                  value={editingHighlight.content.join('\n\n')}
                  onChange={(e) => setEditingHighlight({ ...editingHighlight, content: e.target.value.split('\n\n') })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingHighlight(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#17130F] hover:bg-[#8C6F36] text-white transition-colors shadow-sm"
                >
                  Salvar Notícia
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* MODAL: SWAP FEATURED NEWS WITH REGISTERED PUBLICATIONS */}
      {/* ------------------------------------------------------------------- */}
      {swapTargetAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn" role="dialog" aria-modal="true">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <ArrowLeftRight className="w-4 h-4 text-[#8C6F36]" />
                  <span>Trocar Notícia em Destaque</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                  Substituindo: <strong className="text-slate-800">{swapTargetAnnouncement.title}</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSwapTargetAnnouncement(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5">
              {/* Search and quick create */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={swapSearch}
                    onChange={(e) => setSwapSearch(e.target.value)}
                    placeholder="Buscar comunicado ou artigo registrado..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const slotId = swapTargetAnnouncement.id;
                    setSwapTargetAnnouncement(null);
                    handleOpenNewAnnouncement(true, slotId);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#8C6F36] hover:bg-[#6E5528] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shrink-0 cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Cadastrar Nova &amp; Trocar</span>
                </button>
              </div>

              {/* Other Announcements (Newly registered first) */}
              <div className="space-y-2.5">
                <span className="text-[11px] uppercase tracking-wider font-bold text-slate-500 block">
                  Comunicados Registrados ({orderedAllForDestaques.filter((a) => a.id !== swapTargetAnnouncement.id).length})
                </span>

                <div className="space-y-2.5">
                  {orderedAllForDestaques
                    .filter((a) => a.id !== swapTargetAnnouncement.id)
                    .filter(
                      (a) =>
                        !swapSearch.trim() ||
                        a.title.toLowerCase().includes(swapSearch.toLowerCase()) ||
                        a.tag.toLowerCase().includes(swapSearch.toLowerCase())
                    )
                    .map((candidate) => {
                      const isNewItem = isNewlyRegisteredAnnouncement(candidate);
                      return (
                        <div
                          key={candidate.id}
                          className="p-3.5 rounded-2xl border border-slate-200 hover:border-[#8C6F36] bg-slate-50/70 flex items-center justify-between gap-3 transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={candidate.image}
                              alt={candidate.title}
                              className="w-16 h-14 rounded-xl object-cover shrink-0 border border-slate-200"
                              onError={(e) => {
                                e.currentTarget.src = '/team_juri.webp';
                              }}
                            />
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6F36]">
                                  {candidate.tag}
                                </span>
                                {isNewItem && (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 text-amber-950 font-bold">
                                    Novo Registrado
                                  </span>
                                )}
                                {!isNewItem && !candidate.featured && (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-semibold">
                                    Disponível
                                  </span>
                                )}
                              </div>
                              <h5 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2">
                                {candidate.title}
                              </h5>
                              <span className="text-[11px] text-slate-500">{candidate.date}</span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              handleSwapFeaturedWithAnnouncement(swapTargetAnnouncement.id, candidate.id)
                            }
                            className="px-3.5 py-2 rounded-xl bg-[#17130F] hover:bg-[#8C6F36] text-white text-xs font-semibold shrink-0 cursor-pointer transition-colors"
                          >
                            Usar esta
                          </button>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Articles from Produção Técnica */}
              <div className="space-y-2.5 pt-3 border-t border-slate-100">
                <span className="text-[11px] uppercase tracking-wider font-bold text-slate-500 block">
                  Artigos da Produção Técnica ({articlesList.length})
                </span>

                <div className="space-y-2.5">
                  {articlesList
                    .filter(
                      (art) =>
                        !swapSearch.trim() ||
                        art.title.toLowerCase().includes(swapSearch.toLowerCase()) ||
                        art.category.toLowerCase().includes(swapSearch.toLowerCase())
                    )
                    .map((art) => (
                      <div
                        key={art.id}
                        className="p-3.5 rounded-2xl border border-slate-200 hover:border-[#8C6F36] bg-slate-50/70 flex items-center justify-between gap-3 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={art.image}
                            alt={art.title}
                            className="w-16 h-14 rounded-xl object-cover shrink-0 border border-slate-200"
                            onError={(e) => {
                              e.currentTarget.src = '/team_juri.webp';
                            }}
                          />
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block mb-0.5">
                              Artigo · {art.category}
                            </span>
                            <h5 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2">
                              {art.title}
                            </h5>
                            <span className="text-[11px] text-slate-500">{art.date}</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            handleSwapFeaturedWithArticle(swapTargetAnnouncement.id, art)
                          }
                          className="px-3.5 py-2 rounded-xl bg-[#17130F] hover:bg-[#8C6F36] text-white text-xs font-semibold shrink-0 cursor-pointer transition-colors"
                        >
                          Usar este artigo
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* MODAL: EDIT / NEW ANNOUNCEMENT */}
      {/* ------------------------------------------------------------------- */}
      {isNewAnnouncementModalOpen && editingAnnouncement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn" role="dialog" aria-modal="true">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                {announcements.some((a) => a.id === editingAnnouncement.id)
                  ? 'Editar Comunicado Oficial'
                  : 'Novo Comunicado Oficial'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsNewAnnouncementModalOpen(false);
                  setReplacingFeaturedSlotId(null);
                }}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveAnnouncement(editingAnnouncement);
              }}
              className="p-6 overflow-y-auto space-y-4"
            >
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1">
                  Título do Comunicado *
                </label>
                <input
                  type="text"
                  required
                  value={editingAnnouncement.title}
                  onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, title: e.target.value })}
                  placeholder="Ex: Novo Horário de Atendimento ou Nota Oficial..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1">
                    Tag / Categoria
                  </label>
                  <input
                    type="text"
                    value={editingAnnouncement.tag}
                    onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, tag: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1">
                    Data
                  </label>
                  <input
                    type="text"
                    value={editingAnnouncement.date}
                    onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, date: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                  />
                </div>
              </div>

              {/* Image Attachment Picker */}
              <ImageAttachmentPicker
                label="Imagem do Comunicado Oficial *"
                value={editingAnnouncement.image || '/team_juri.webp'}
                onChange={(img) => setEditingAnnouncement({ ...editingAnnouncement, image: img })}
                helperText="Anexe uma foto do seu dispositivo ou escolha das imagens do escritório."
              />

              {/* Toggle featured on Home */}
              <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-[#B89554]/30 bg-amber-50/40 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingAnnouncement.featured ?? true}
                  onChange={(e) =>
                    setEditingAnnouncement({ ...editingAnnouncement, featured: e.target.checked })
                  }
                  className="w-4 h-4 accent-[#8C6F36] rounded cursor-pointer"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Exibir nos Destaques da Página Principal
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Além de ir para a Página de Comunicados, aparecerá na vitrine da página inicial.
                  </span>
                </div>
              </label>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1">
                  Resumo / Excerpt
                </label>
                <textarea
                  rows={2}
                  value={editingAnnouncement.excerpt}
                  onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, excerpt: e.target.value })}
                  placeholder="Breve resumo exibido no card e na leitura..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1">
                  Conteúdo Completo do Comunicado
                </label>
                <textarea
                  rows={5}
                  value={editingAnnouncement.content.join('\n\n')}
                  onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, content: e.target.value.split('\n\n') })}
                  placeholder="Digite o texto completo da nota oficial..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsNewAnnouncementModalOpen(false);
                    setReplacingFeaturedSlotId(null);
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#17130F] hover:bg-[#8C6F36] text-white transition-colors shadow-sm cursor-pointer"
                >
                  Salvar Comunicado
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* MODAL: EDIT LAWYER */}
      {/* ------------------------------------------------------------------- */}
      {editingLawyer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn" role="dialog" aria-modal="true">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                Editar Foto & Dados do Advogado
              </h3>
              <button onClick={() => setEditingLawyer(null)} className="p-1 rounded-full text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveLawyer} className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={editingLawyer.name}
                  onChange={(e) => setEditingLawyer({ ...editingLawyer, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1">
                    Registro OAB *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingLawyer.oab}
                    onChange={(e) => setEditingLawyer({ ...editingLawyer, oab: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1">
                    Cargo / Função
                  </label>
                  <input
                    type="text"
                    value={editingLawyer.role}
                    onChange={(e) => setEditingLawyer({ ...editingLawyer, role: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                  />
                </div>
              </div>

              {/* Image Attachment Picker for Lawyer */}
              <ImageAttachmentPicker
                label="Foto do Advogado *"
                value={editingLawyer.image}
                onChange={(img) => setEditingLawyer({ ...editingLawyer, image: img })}
                helperText="Anexe uma foto de perfil do seu dispositivo ou escolha das fotos oficiais."
              />

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-700 font-semibold mb-1">
                  Resumo Institucional
                </label>
                <textarea
                  rows={3}
                  value={editingLawyer.summary}
                  onChange={(e) => setEditingLawyer({ ...editingLawyer, summary: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#8C6F36]"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingLawyer(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold bg-[#17130F] hover:bg-[#8C6F36] text-white transition-colors shadow-sm cursor-pointer"
                >
                  Salvar Advogado
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* MODAL: PREVIEW ARTICLE */}
      {/* ------------------------------------------------------------------- */}
      {previewArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn" role="dialog" aria-modal="true">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#17130F] text-[#FAF8F4] font-semibold">
                {previewArticle.category}
              </span>
              <button onClick={() => setPreviewArticle(null)} className="p-1 rounded-full text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
              <span className="text-xs text-[#8C6F36] font-medium block">
                {previewArticle.date} · {previewArticle.readTime}
              </span>

              <h2 className="text-2xl font-serif font-bold text-slate-900 leading-tight">
                {previewArticle.title}
              </h2>

              <p className="text-sm text-slate-500 italic border-l-2 border-[#8C6F36] pl-3">
                {previewArticle.description}
              </p>

              <div className="space-y-3 pt-3 text-sm text-slate-700 leading-relaxed font-normal">
                {previewArticle.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* MODAL: IN-APP DELETE CONFIRMATION (SAFE INSIDE IFRAMES) */}
      {/* ------------------------------------------------------------------- */}
      {pendingDelete && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {pendingDelete.type === 'article' ? 'Excluir Artigo' : 'Excluir Comunicado'}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Tem certeza que deseja excluir <strong className="text-slate-900">&quot;{pendingDelete.title}&quot;</strong>? Essa ação remove a publicação imediatamente.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setPendingDelete(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmPendingDelete}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white transition-colors cursor-pointer"
              >
                Confirmar Exclusão
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
