export interface Lawyer {
  id: string;
  name: string;
  oab: string;
  role: string;
  image: string;
  summary: string;
  fullBio: string;
}

export interface PracticeArea {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: 'ShieldAlert' | 'Scale' | 'HeartHandshake';
  services: string[];
}

export interface Article {
  id: string;
  category: 'Direito Criminal' | 'Direito Civil' | 'Direito de Família';
  title: string;
  description: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  content: string[];
}

export interface ContactInfo {
  address: string;
  city: string;
  state: string;
  cep: string;
  phone: string;
  whatsapp: string;
  whatsappNumberDigits: string;
  email: string;
  workingHours: string;
  googleMapsUrl: string;
}

export const initialContactInfo: ContactInfo = {
  address: 'Rua XV de Novembro, 7840 - Centro',
  city: 'Guarapuava',
  state: 'Paraná',
  cep: '85010-000',
  phone: '(42) 3623-1978',
  whatsapp: '(42) 99876-1978',
  whatsappNumberDigits: '5542998761978',
  email: 'contato@advocacianicolau.adv.br',
  workingHours: 'Segunda a Sexta-feira: 08h30 às 12h00 e 13h30 às 18h00',
  googleMapsUrl: 'https://maps.google.com/maps?q=Guarapuava,+PR,+Brasil&t=&z=15&ie=UTF8&iwloc=&output=embed',
};

export const lawyers: Lawyer[] = [
  {
    id: 'miguel-nicolau',
    name: 'Miguel Nicolau Junior',
    oab: 'OAB/PR 7.708',
    role: 'Sócio Fundador',
    image: '/lawyer_miguel_nicolau.webp',
    summary: 'Atuação consolidada há mais de quatro décadas, liderando estratégias de alta complexidade jurídica com sólida reputação e ética profissional.',
    fullBio: 'Com inscrição histórica na Ordem dos Advogados do Brasil sob o número OAB/PR 7.708, Dr. Miguel Nicolau Junior é o fundador da banca. Desde 1978, atua ativamente na defesa dos interesses de cidadãos e empresas no Paraná e em tribunais superiores. Sua trajetória de integridade, dedicação aos direitos fundamentais e liderança forense construiu a base sólida sobre a qual a Advocacia Nicolau se firmou como referência no estado.',
  },
  {
    id: 'elizanne-soares',
    name: 'Elizanne Marcondes Soares',
    oab: 'OAB/PR 108.487',
    role: 'Advogada Sócia',
    image: '/lawyer_elizanne_soares.webp',
    summary: 'Atuação técnica e diligente com ênfase na defesa preventiva e contenciosa, prezando pelo acolhimento humanizado e soluções ágeis.',
    fullBio: 'Dra. Elizanne Marcondes Soares (OAB/PR 108.487) integra a equipe com perfil dinâmico, rigor analítico e sensibilidade no tratamento das demandas. Dedica-se a casos estratégicos de Direito Civil e Família, aliando precisão processual ao constante aperfeiçoamento acadêmico para assegurar a máxima segurança jurídica aos representados pela banca.',
  },
  {
    id: 'felipe-bahls',
    name: 'Felipe Colman Bahls',
    oab: 'OAB/PR 108.488',
    role: 'Advogado Sócio',
    image: '/lawyer_felipe_bahls.webp',
    summary: 'Advocacia combativa e estratégica, com foco na garantia dos preceitos constitucionais e na defesa vigorosa dos direitos do cliente.',
    fullBio: 'Dr. Felipe Colman Bahls (OAB/PR 108.488) atua com expressiva presença em audiências, defesas processuais e recursos perante cortes estaduais e federais. Seu trabalho se destaca pela oratória apurada, estudo minucioso de provas e abordagem estratégica personalizada para cada fase da persecução processual.',
  },
];

export const practiceAreas: PracticeArea[] = [
  {
    id: 'criminal',
    title: 'DIREITO CRIMINAL',
    subtitle: 'Defesa vigorosa da liberdade e garantias individuais',
    description: 'Atuação na defesa dos direitos e garantias individuais em todas as fases da persecução penal, incluindo:',
    iconName: 'ShieldAlert',
    services: [
      'Inquéritos policiais e investigações criminais',
      'Prisão em flagrante e audiência de custódia',
      'Pedidos de liberdade provisória e revogação de prisão preventiva',
      'Habeas corpus',
      'Tribunal do Júri',
      'Crimes contra a vida',
      'Crimes previstos na Lei de Drogas',
      'Crimes patrimoniais',
      'Crimes de trânsito',
      'Crimes relacionados à violência doméstica',
      'Crimes contra a dignidade sexual',
      'Recursos criminais e atuação perante tribunais',
      'Revisão criminal',
      'Execução penal, progressão de regime e benefícios da execução',
    ],
  },
  {
    id: 'civil',
    title: 'DIREITO CIVIL',
    subtitle: 'Proteção patrimonial, contratual e reparações',
    description: 'Atuação na defesa de interesses patrimoniais, contratuais e pessoais, abrangendo:',
    iconName: 'Scale',
    services: [
      'Ações indenizatórias por danos morais e materiais',
      'Responsabilidade civil',
      'Direito de vizinhança',
      'Direito imobiliário e possessório',
      'Elaboração, análise e rescisão de contratos',
      'Ações de cobrança e execuções',
      'Obrigações civis',
      'Conflitos envolvendo propriedade e posse',
      'Inventários e sucessões',
    ],
  },
  {
    id: 'familia',
    title: 'DIREITO DE FAMÍLIA',
    subtitle: 'Acolhimento humanizado e segurança para o patrimônio familiar',
    description: 'Atuação em questões familiares, buscando soluções juridicamente adequadas e respeitando a particularidade de cada situação:',
    iconName: 'HeartHandshake',
    services: [
      'Divórcios judiciais e extrajudiciais',
      'Guarda de filhos',
      'Regulamentação de convivência e visitas',
      'Pensão alimentícia',
      'Revisão, exoneração e execução de alimentos',
      'Reconhecimento e dissolução de união estável',
      'Partilha de bens',
      'Investigação e reconhecimento de paternidade',
      'Alienação parental',
      'Outras demandas relacionadas ao Direito de Família',
    ],
  },
];

export const articles: Article[] = [
  {
    id: 'garantias-criminais',
    category: 'Direito Criminal',
    title: 'Audiência de Custódia e a Preservação das Garantias Constitucionais',
    description: 'Compreenda o papel essencial da defesa técnica nas primeiras 24 horas após a prisão e a avaliação da legalidade do ato.',
    date: '15 de Outubro de 2026',
    author: 'Advocacia Nicolau',
    readTime: '4 min de leitura',
    image: '/hero_justice_themis.webp',
    content: [
      'A audiência de custódia representa um dos maiores avanços do ordenamento processual penal brasileiro, consagrada por pactos internacionais de direitos humanos ratificados pelo país e positivada pela Lei 13.964/2019.',
      'O ato impõe que toda pessoa presa em flagrante seja apresentada à autoridade judicial no prazo máximo de 24 horas, assegurando o controle de legalidade da prisão e a verificação de eventuais abusos ou integridade física do custodiado.',
      'A presença de um advogado criminalista nesse primeiro contato é determinante para pleitear o relaxamento de prisões ilegais, a concessão de liberdade provisória com ou sem fiança e a aplicação de medidas cautelares diversas do encarceramento.',
      'Em nossa atuação de mais de quatro décadas em Guarapuava e região, testemunhamos cotidianamente que a celeridade e o conhecimento técnico das nulidades processuais resguardam o bem mais precioso: a liberdade sob o devido processo legal.',
    ],
  },
  {
    id: 'contratos-imobiliarios',
    category: 'Direito Civil',
    title: 'Segurança Jurídica na Aquisição de Imóveis e Redação Contratual',
    description: 'Aspectos preventivos na due diligence imobiliária para mitigar riscos de evicção, fraudes e disputas possessórias.',
    date: '28 de Setembro de 2026',
    author: 'Advocacia Nicolau',
    readTime: '5 min de leitura',
    image: '/legal_desk_calltoaction.webp',
    content: [
      'A celebração de contratos que envolvem transmissão de propriedade ou posse de bens imóveis exige rigor técnico absoluto. Cláusulas genéricas ou minutas desprovidas de estudo prévio abrem espaço para litígios onerosos.',
      'A análise de certidões cíveis, criminais, trabalhistas e fiscais em nome dos transmitentes (due diligence imobiliária) é imprescindível para atestar a boa-fé do adquirente e repelir riscos de fraude contra credores ou execução.',
      'Além disso, a adequada caracterização das arras, cláusulas penais compensatórias, prazos resolutivos e previsão expressa de responsabilidade por vícios ocultos garantem o equilíbrio financeiro do negócio.',
      'A atuação consultiva e preventiva de um escritório com vivência forense resguarda o investimento e afasta litígios que poderiam perdurar por anos no Judiciário.',
    ],
  },
  {
    id: 'planejamento-sucessorio',
    category: 'Direito de Família',
    title: 'Planejamento Sucessório e Partilha: Preservação do Patrimônio e Harmonia Familiar',
    description: 'Como a estruturação jurídica antecipada evita desgastes emocionais e minimiza a carga tributária na sucessão de bens.',
    date: '10 de Setembro de 2026',
    author: 'Advocacia Nicolau',
    readTime: '6 min de leitura',
    image: '/office_facade_nicolau.webp',
    content: [
      'A sucessão hereditária é um dos momentos mais sensíveis na trajetória de qualquer núcleo familiar e empresarial. Quando não planejada, pode desencadear conflitos duradouros e a dilapidação do patrimônio acumulado ao longo de gerações.',
      'O planejamento sucessório viabiliza instrumentos eficazes como testamentos públicos, doações com reserva de usufruto, cláusulas de incomunicabilidade e inalienabilidade, bem como a constituição de holdings patrimoniais.',
      'Na esfera do Direito de Família e Sucessões, nosso compromisso primordial é conciliar a segurança patrimonial com a preservação dos laços afetivos, privilegiando acordos e soluções personalizadas que respeitem a vontade das partes.',
    ],
  },
];

export interface HeroSettings {
  sloganPart1: string;
  sloganPart2: string;
  sloganHighlight: string;
  subtitle: string;
  kicker: string;
  buttonText: string;
}

export const initialHeroSettings: HeroSettings = {
  kicker: 'ADVOCACIA NICOLAU',
  sloganPart1: 'Tradição, experiência',
  sloganPart2: 'e compromisso com',
  sloganHighlight: 'a sua jornada.',
  subtitle: 'Desde 1978, construindo uma história de credibilidade e dedicação na defesa dos seus direitos.',
  buttonText: 'Conheça nosso escritório',
};

export const getStoredHeroSettings = (): HeroSettings => {
  const saved = localStorage.getItem('nicolau_hero_settings');
  if (saved) {
    try {
      return { ...initialHeroSettings, ...JSON.parse(saved) };
    } catch (e) {
      return initialHeroSettings;
    }
  }
  return initialHeroSettings;
};

const safeSaveToStorage = (key: string, value: unknown): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error(`Erro ao salvar ${key} no armazenamento local:`, e);
    return false;
  }
};

export const saveStoredHeroSettings = (settings: HeroSettings) => {
  safeSaveToStorage('nicolau_hero_settings', settings);
};

export const getStoredArticles = (): Article[] => {
  const saved = localStorage.getItem('nicolau_articles_data');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (e) {
      return articles;
    }
  }
  return articles;
};

export const saveStoredArticles = (arts: Article[]): boolean => {
  return safeSaveToStorage('nicolau_articles_data', arts);
};

export const getStoredLawyers = (): Lawyer[] => {
  const saved = localStorage.getItem('nicolau_lawyers_data');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (e) {
      return lawyers;
    }
  }
  return lawyers;
};

export const saveStoredLawyers = (lwys: Lawyer[]): boolean => {
  return safeSaveToStorage('nicolau_lawyers_data', lwys);
};

export interface HighlightItem {
  id: string;
  category: 'Empresarial' | 'Comunicados';
  tagLabel: string;
  title: string;
  subtitle?: string;
  date: string;
  image: string;
  content: string[];
}

export const initialHighlights: HighlightItem[] = [
  // Empresarial
  {
    id: 'emp-1',
    category: 'Empresarial',
    tagLabel: 'Empresarial',
    title: 'Planejamento Societário e Proteção Patrimonial de Grupos Empresariais no Paraná',
    subtitle: 'Estruturação de holdings familiares e blindagem patrimonial preventiva.',
    date: '10 de Novembro de 2026',
    image: '/office_facade_nicolau.webp',
    content: [
      'A expansão de empresas familiares e grupos corporativos no centro-sul paranaense demanda governança societária sólida e instrumentos de proteção patrimonial.',
      'A criação de holdings patrimoniais aliada a acordos de sócios detalhados minimiza riscos tributários e conflitos sucessórios, assegurando a perenidade dos negócios.',
      'A Advocacia Nicolau assessora empresas em auditorias prévias (due diligence), contratos mercantis de alta complexidade e reestruturação societária.'
    ],
  },
  {
    id: 'emp-2',
    category: 'Empresarial',
    tagLabel: 'Empresarial',
    title: 'Contratos Mercantis e Governança Jurídica para Expansão Corporativa',
    subtitle: 'Segurança em negociações bilaterais, fusões e parcerias estratégicas.',
    date: '04 de Novembro de 2026',
    image: '/legal_desk_calltoaction.webp',
    content: [
      'Contratos com cláusulas resolutivas claras, estipulações de confidencialidade e responsabilidade civil personalizada são o escudo primário contra disputas onerosas.',
      'Atuamos na formulação e revisão de minutas estratégicas, franquias, joint ventures e operações de fornecimento de grande porte.',
      'O suporte contínuo de um departamento jurídico consultivo garante velocidade e proteção negocial.'
    ],
  },
  {
    id: 'emp-3',
    category: 'Empresarial',
    tagLabel: 'Empresarial',
    title: 'Gestão de Riscos e Prevenção de Passivos no Agronegócio e Indústria',
    subtitle: 'Compliance trabalhista, ambiental e contratual para o setor produtivo.',
    date: '28 de Outubro de 2026',
    image: '/team_congresso.webp',
    content: [
      'O agronegócio e a indústria representam pilares fundamentais da economia regional. Questões agrárias, possessórias e de regulação ambiental exigem respostas técnicas imediatas.',
      'Oferecemos assessoria jurídica estratégica para prevenir litígios trabalhistas em massa e garantir a regularidade de contratos de arrendamento e parceria rural.'
    ],
  },

  // Comunicados
  {
    id: 'com-1',
    category: 'Comunicados',
    tagLabel: 'Comunicado',
    title: 'Nota Oficial: Posicionamento Institucional e Atuação em Defesas de Repercussão Regional',
    subtitle: 'Compromisso intransigente com as garantias constitucionais e o sigilo profissional.',
    date: '08 de Novembro de 2026',
    image: '/team_juri.webp',
    content: [
      'A Advocacia Nicolau reafirma seu compromisso histórico de mais de quatro décadas na defesa combativa e ética das prerrogativas da advocacia e das garantias individuais.',
      'Nos processos de ampla repercussão midiática, a atuação do escritório permanece estritamente pautada na técnica forense, na ampla defesa e no respeito à legalidade processual penal.',
      'Informações relativas a processos sob sigilo de justiça são resguardadas com absoluto rigor ético e deontológico.'
    ],
  },
  {
    id: 'com-2',
    category: 'Comunicados',
    tagLabel: 'Comunicado',
    title: 'Atendimento Presencial em Guarapuava e Plataforma Digital Integrada',
    subtitle: 'Conectividade segura com clientes em todo o território nacional.',
    date: '02 de Novembro de 2026',
    image: '/hero_justice_themis.webp',
    content: [
      'Comunicamos aos nossos clientes e parceiros que, além do tradicional atendimento em nossa sede própria em Guarapuava/PR, disponibilizamos canal digital criptografado para reuniões virtuais e acompanhamento processual.',
      'Dessa forma, clientes em qualquer comarca ou estado contam com a mesma agilidade e atenção exclusiva que consolidaram nossa história.'
    ],
  },
  {
    id: 'com-3',
    category: 'Comunicados',
    tagLabel: 'Comunicado',
    title: 'Informativo Jurídico: Atualização sobre Prazos Processuais e Sessões nos Tribunais',
    subtitle: 'Orientações sobre o calendário forense e sessões extraordinárias.',
    date: '25 de Outubro de 2026',
    image: '/office_facade_nicolau.webp',
    content: [
      'Informamos que os prazos processuais e o plantão judiciário nos Tribunais de Justiça e Superiores estão devidamente monitorados por nossa controladoria jurídica.',
      'Audiências de custódia, pedidos de liberdade e medidas urgentes permanecem com atendimento ininterrupto em regime de sobreaviso.'
    ],
  },
];

export const getStoredHighlights = (): HighlightItem[] => {
  const saved = localStorage.getItem('nicolau_highlights_data');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (e) {
      return initialHighlights;
    }
  }
  return initialHighlights;
};

export const saveStoredHighlights = (items: HighlightItem[]): boolean => {
  return safeSaveToStorage('nicolau_highlights_data', items);
};

export interface AnnouncementItem {
  id: string;
  tag: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  content: string[];
  featured?: boolean;
}

export const initialAnnouncements: AnnouncementItem[] = [
  {
    id: 'com-1',
    tag: 'Nota Oficial',
    title: 'Posicionamento Institucional e Atuação em Defesas de Repercussão Regional',
    date: '08 de Novembro de 2026',
    image: '/team_juri.webp',
    excerpt: 'Reafirmação do compromisso histórico da Advocacia Nicolau com as garantias constitucionais e o sigilo processual.',
    featured: true,
    content: [
      'A Advocacia Nicolau reafirma seu compromisso histórico de mais de quatro décadas na defesa combativa e ética das prerrogativas da advocacia e das garantias individuais asseguradas pela Constituição Federal.',
      'Nos processos de ampla repercussão pública e perante o Tribunal do Júri, a atuação do escritório permanece estritamente pautada na técnica forense, na ampla defesa e no respeito à legalidade processual penal.',
      'Informações relativas a processos sob sigilo de justiça são resguardadas com absoluto rigor ético e deontológico em respeito aos nossos clientes e ao Poder Judiciário.'
    ],
  },
  {
    id: 'com-2',
    tag: 'Atendimento & Estrutura',
    title: 'Atendimento Presencial em Guarapuava e Plataforma Digital Integrada',
    date: '02 de Novembro de 2026',
    image: '/hero_justice_themis.webp',
    excerpt: 'Disponibilização de canal digital criptografado para reuniões virtuais com clientes em todo o território nacional.',
    featured: true,
    content: [
      'Comunicamos aos nossos clientes e parceiros que, além do tradicional atendimento em nossa sede própria em Guarapuava/PR, disponibilizamos canal digital criptografado para reuniões virtuais e acompanhamento processual.',
      'Dessa forma, clientes em qualquer comarca ou estado contam com a mesma agilidade e atenção exclusiva que consolidaram nossa história.'
    ],
  },
  {
    id: 'com-3',
    tag: 'Plantão Forense',
    title: 'Informativo Jurídico: Atualização sobre Prazos Processuais e Sessões nos Tribunais',
    date: '25 de Outubro de 2026',
    image: '/office_facade_nicolau.webp',
    excerpt: 'Orientações sobre o calendário forense, sessões dos Tribunais Superiores e regime de sobreaviso criminal.',
    featured: true,
    content: [
      'Informamos que os prazos processuais e o plantão judiciário nos Tribunais de Justiça e Superiores estão devidamente monitorados por nossa controladoria jurídica.',
      'Audiências de custódia, pedidos de liberdade e medidas urgentes permanecem com atendimento ininterrupto em regime de sobreaviso.'
    ],
  },
  {
    id: 'com-4',
    tag: 'Tribunal do Júri',
    title: 'Atuação Técnica Forense no Tribunal do Júri e Defesa das Garantias Processuais',
    date: '18 de Outubro de 2026',
    image: '/team_congresso.webp',
    excerpt: 'Sustentação oral e rigor na análise de perícias balísticas e documentais perante o Conselho de Sentença.',
    featured: true,
    content: [
      'A defesa em plenário do Tribunal do Júri requer dedicação exclusiva, oratória precisa e profundo domínio das ciências forenses e da medicina legal.',
      'Nossa equipe jurídica atua em todas as etapas, desde a fase investigativa e pronúncia até os debates finais em sessão solene de júri popular.',
      'Reafirmamos o zelo pelo contraditório efetivo e a preservação do estado de inocência como esteio do Estado Democrático de Direito.'
    ],
  },
  {
    id: 'com-5',
    tag: 'Direito Empresarial & Cível',
    title: 'Planejamento Sucessório e Blindagem Patrimonial Preventiva para Famílias e Empresas',
    date: '10 de Outubro de 2026',
    image: '/legal_desk_calltoaction.webp',
    excerpt: 'Estruturação jurídica personalizada de holdings familiares, doações com cláusulas protetivas e governança corporativa.',
    featured: true,
    content: [
      'O planejamento sucessório e patrimonial preventivo representa uma das ferramentas mais eficazes para garantir a continuidade dos negócios e a harmonia familiar.',
      'Nossa consultoria jurídica elabora instrumentos sob medida, minimizando litígios e custos tributários em transmissões de bens e quotas empresariais.',
      'Realizamos diagnóstico detalhado do patrimônio e da estrutura societária com total confidencialidade e segurança jurídica.'
    ],
  },
  {
    id: 'com-6',
    tag: 'Institucional & Tradição',
    title: 'Mais de Quatro Décadas de Advocacia Ética e Combate Incessante no Paraná',
    date: '28 de Setembro de 2026',
    image: '/destaque_isis_sample.webp',
    excerpt: 'Balanço das mais de quatro décadas de atuação contínua da banca em Guarapuava, Curitiba e comarcas de todo o Paraná.',
    featured: true,
    content: [
      'Desde a fundação em 1978 pelo Dr. Miguel Nicolau Junior, o escritório consolidou sua reputação baseada na lealdade aos clientes, na técnica refinada e na coragem jurídica.',
      'Ao longo de 48 anos, acumulamos precedentes favoráveis, atuação combativa em tribunais e a confiança inabalável da sociedade paranaense.',
      'Seguimos inovando com ferramentas tecnológicas sem abrir mão dos valores clássicos da advocacia artesanal e humanizada.'
    ],
  },
];

export const getStoredAnnouncements = (): AnnouncementItem[] => {
  const saved = localStorage.getItem('nicolau_announcements_data');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const hasFeaturedProp = parsed.some((item) => typeof item?.featured === 'boolean');
        if (!hasFeaturedProp) {
          return parsed.map((item, idx) => ({ ...item, featured: idx < 6 }));
        }
        return parsed;
      }
    } catch (e) {
      return initialAnnouncements;
    }
  }
  return initialAnnouncements;
};

export const saveStoredAnnouncements = (items: AnnouncementItem[]): boolean => {
  return safeSaveToStorage('nicolau_announcements_data', items);
};

export interface ClientLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  area: string;
  message: string;
  date: string;
  status: 'Novo' | 'Em Análise' | 'Atendido';
}

export const initialClientLeads: ClientLead[] = [
  {
    id: 'lead-1',
    name: 'Carlos Eduardo Silveira',
    phone: '(42) 99123-4567',
    email: 'carlos.silveira@agronegocio.com.br',
    area: 'Direito Civil',
    message: 'Gostaria de agendar uma consulta sobre revisão de contrato de arrendamento rural e posse de imóvel.',
    date: '10/11/2026 09:30',
    status: 'Novo',
  },
  {
    id: 'lead-2',
    name: 'Mariana Duarte Prado',
    phone: '(42) 98877-1234',
    email: 'mariana.prado@email.com',
    area: 'Direito de Família',
    message: 'Necessito de assessoria para partilha amigável de bens e regulamentação de guarda.',
    date: '09/11/2026 15:45',
    status: 'Em Análise',
  },
  {
    id: 'lead-3',
    name: 'Roberto Fernandes Lima',
    phone: '(42) 99988-5544',
    email: 'roberto.fernandes@empresa.com.br',
    area: 'Direito Criminal',
    message: 'Solicitação de atuação técnica para audiência e defesa preliminar em processo perante a Vara Criminal.',
    date: '08/11/2026 11:20',
    status: 'Atendido',
  },
];

export const getStoredClientLeads = (): ClientLead[] => {
  const saved = localStorage.getItem('nicolau_client_leads');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (e) {
      return initialClientLeads;
    }
  }
  return initialClientLeads;
};

export const saveStoredClientLeads = (leads: ClientLead[]) => {
  localStorage.setItem('nicolau_client_leads', JSON.stringify(leads));
};

export interface CorporatePillar {
  id: string;
  tag: string;
  title: string;
  shortDesc: string;
  details: string[];
}

export interface CorporateIndustry {
  title: string;
  desc: string;
}

export interface CorporateSettings {
  kicker: string;
  titlePart1: string;
  titleHighlight: string;
  description: string;
  ctaButtonText: string;
  pillarsTitle: string;
  pillarsSubtitle: string;
  pillars: CorporatePillar[];
  industries: CorporateIndustry[];
}

export const initialCorporateSettings: CorporateSettings = {
  kicker: 'PÁGINA EXCLUSIVA · DIREITO EMPRESARIAL & SOCIETÁRIO',
  titlePart1: 'Soluções jurídicas estratégicas para a solidez e o crescimento',
  titleHighlight: 'da sua empresa.',
  description: 'Há mais de quatro décadas, a Advocacia Nicolau assessora grupos econômicos, cooperativas, indústrias e empresas familiares em Guarapuava e no Paraná. Nossa atuação corporativa combina visão de negócios, blindagem de patrimônio e defesa intransigente em litígios societários.',
  ctaButtonText: 'Consultar Assessoria Empresarial',
  pillarsTitle: 'Pilares da Nossa Assessoria',
  pillarsSubtitle: 'Atuação integrada para proteger o fluxo de caixa, o patrimônio dos sócios e os contratos mercantis.',
  pillars: [
    {
      id: 'societario',
      tag: 'Societário & Governança',
      title: 'Estruturação Societária & Holdings',
      shortDesc: 'Constituição de holdings familiares e patrimoniais, acordos de sócios e proteção de ativos corporativos.',
      details: [
        'Planejamento sucessório empresarial e estruturação de holdings patrimoniais para blindagem lícita de bens.',
        'Elaboração e revisão minuciosa de Acordos de Sócios, Acordos de Acionistas e Estatutos Sociais.',
        'Governança corporativa para empresas familiares em fase de transição de liderança.',
        'Auditoria prévia (due diligence) para fusões, aquisições e entrada de novos investidores.'
      ],
    },
    {
      id: 'contratos',
      tag: 'Contratos Comerciais',
      title: 'Contratos Mercantis Estratégicos',
      shortDesc: 'Elaboração, negociação e auditoria de contratos de alta complexidade para segurança negocial.',
      details: [
        'Formulação de instrumentos bilaterais com cláusulas penais, resolução expressa e garantias reais personalizadas.',
        'Contratos de representação comercial, distribuição, franquias, joint ventures e fornecimento contínuo.',
        'Auditoria contratual para eliminação de ambiguidades e prevenção de litígios onerosos.',
        'Termos de confidencialidade (NDA), não concorrência e proteção de segredos de negócio.'
      ],
    },
    {
      id: 'compliance',
      tag: 'Prevenção de Riscos',
      title: 'Compliance & Gestão de Passivos',
      shortDesc: 'Mitigação proativa de riscos fiscais, trabalhistas e regulatórios no agronegócio e na indústria.',
      details: [
        'Mapeamento preventivo de passivos trabalhistas estratégicos e readequação de rotinas corporativas.',
        'Adequação jurídica a exigências regulatórias, ambientais e agrárias no setor produtivo paranaense.',
        'Elaboração de códigos de conduta interna e políticas de conformidade jurídica.',
        'Gestão de riscos contratuais para proteção do fluxo financeiro e da imagem corporativa.'
      ],
    },
    {
      id: 'contencioso',
      tag: 'Tribunais & Arbitragem',
      title: 'Contencioso Empresarial Estratégico',
      shortDesc: 'Atuação combativa perante varas especializadas e Tribunais de Justiça e Superiores.',
      details: [
        'Defesa em disputas societárias complexas, dissoluções parciais de sociedade e apuração de haveres.',
        'Recuperação de créditos de alta monta, execuções de títulos extrajudiciais e medidas cautelares.',
        'Representação em câmaras de mediação e arbitragem empresarial.',
        'Recursos especiais e extraordinários perante o Superior Tribunal de Justiça (STJ) e STF.'
      ],
    },
  ],
  industries: [
    { title: 'Agronegócio & Cooperativas', desc: 'Arrendamentos, contratos agrários, crédito rural e proteção patrimonial de produtores.' },
    { title: 'Indústria & Manufatura', desc: 'Compliance ambiental, regulação trabalhista contínua e supply chain corporativo.' },
    { title: 'Varejo & Distribuição', desc: 'Contratos de franquias, locação comercial em shopping centers e mitigação consumerista.' },
    { title: 'Empresas Familiares', desc: 'Holdings patrimoniais, transição geracional e proteção contra litígios entre herdeiros.' },
  ],
};

export const getStoredCorporateSettings = (): CorporateSettings => {
  const saved = localStorage.getItem('nicolau_corporate_settings');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      return initialCorporateSettings;
    }
  }
  return initialCorporateSettings;
};

export const saveStoredCorporateSettings = (settings: CorporateSettings) => {
  localStorage.setItem('nicolau_corporate_settings', JSON.stringify(settings));
};


