import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Calendar, Share2, Check, ArrowRight, MessageSquare } from 'lucide-react';
import { ContactInfo, initialContactInfo } from '../data/officeData';

interface DestaqueItem {
  id: string;
  tag: string;
  title: string;
  date: string;
  image: string;
  subtitle: string;
  content: string[];
}

interface HighlightsSectionProps {
  contactInfo?: ContactInfo;
}

export const HighlightsSection: React.FC<HighlightsSectionProps> = ({
  contactInfo = initialContactInfo,
}) => {
  const [selectedItem, setSelectedItem] = useState<DestaqueItem | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const destaques: DestaqueItem[] = [
    {
      id: 'isis',
      tag: 'Notícias',
      title: 'Caso Isis: Justiça Aceita Denúncia E Vigilante Vira Réu: “Irá A Julgamento”, Diz Dalledone',
      date: 'Novembro de 2026',
      image: '/destaque_isis.webp',
      subtitle: 'Tribunal do Júri e atuação técnica em caso de repercussão estadual.',
      content: [
        'A denúncia criminal foi aceita pelo Poder Judiciário, determinando o encaminhamento dos autos para a fase de instrução e futuro julgamento pelo Tribunal do Júri.',
        'A defesa técnica reafirma que todas as provas periciais e testemunhais serão minuciosamente examinadas sob o prisma do devido processo legal e das garantias constitucionais da ampla defesa.',
        'Nossa atuação em processos de júri segue rigorosamente os mais altos padrões de técnica forense, análise de perícia e proteção aos preceitos da advocacia criminal combativa.'
      ],
    },
    {
      id: 'dranka',
      tag: 'Notícias',
      title: '“Perdi Meu Amigo E Arruinaram Minha Vida Com Uma Falsa Acusação ”, Desabafa Gilberto Dranka',
      date: 'Outubro de 2026',
      image: '/destaque_dranka.webp',
      subtitle: 'Comprovação da inocência e combate a imputações falsas no processo penal.',
      content: [
        'Em declaração pública e perante os autos, demonstrou-se a inconsistência material das imputações acusatórias que levaram à responsabilização indevida do acusado.',
        'A defesa produziu provas documentais e periciais contundentes evidenciando a ausência de dolo e a improcedência das alegações formuladas pela acusação.',
        'O escritório de advocacia mantém seu firme compromisso de combater acusações precipitadas e restabelecer a honra, a liberdade e a dignidade das pessoas submetidas a equívocos da persecução criminal.'
      ],
    },
    {
      id: 'sotero',
      tag: 'Notícias',
      title: 'Delegado Gustavo Sotero Diz Que É Um Homem Da Lei E Que Apenas Se Defendeu',
      date: 'Setembro de 2026',
      image: '/destaque_sotero.webp',
      subtitle: 'Defesa baseada na legítima defesa e estrita observância das provas periciais balísticas.',
      content: [
        'A tese de legítima defesa real foi sustentada com base no conjunto pericial, reconstrução topográfica dos disparos e testemunhos colhidos durante a instrução probatória.',
        'A advocacia combativa atuou na demonstração técnica da dinâmica dos fatos, delimitando o contexto de perigo iminente e a moderação indispensável aos meios empregados.',
        'A atuação da banca perante o plenário do júri pauta-se pelo rigor metodológico, oratória estruturada e respeito aos jurados e à justiça paranaense e nacional.'
      ],
    },
  ];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section id="destaques" className="relative z-10 py-16 sm:py-20 lg:py-24 bg-[#15110E] text-[#FAF8F4] border-b border-[#B89554]/25 shadow-[0_-25px_60px_rgba(0,0,0,0.6)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title 'Destaques' matching image_53823e9f.png */}
        <div className="mb-6 sm:mb-8">
          <h2
            className="text-4xl sm:text-5xl lg:text-[3.25rem] font-normal text-[#CBA86B] tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Destaques
          </h2>
        </div>

        {/* 3 Side-by-side cards exactly as in image_53823e9f.png */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          {destaques.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative h-72 sm:h-80 md:h-[340px] lg:h-[380px] overflow-hidden rounded-xl border border-[#B89554]/30 shadow-xl hover:border-[#D6B779] hover:shadow-2xl hover:shadow-[#B89554]/20 transition-all duration-300 cursor-pointer bg-neutral-900"
            >
              {/* Cropped photo containing original banner and text */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 filter brightness-[1.02]"
              />

              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none flex items-end justify-end p-4">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold text-white bg-[#B89554] px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                  <span>Ler detalhes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reader Modal rendered in document.body */}
      {selectedItem &&
        createPortal(
          <div
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
            role="dialog"
            aria-modal="true"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-[#1C1714] border border-[#B89554] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-[#FAF8F4]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#B89554]/30 bg-[#14100D]">
                <span className="inline-block px-3 py-1 bg-[#967444] text-[#FAF8F4] text-xs font-medium rounded-full">
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

              {/* Modal Body */}
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
                    {selectedItem.subtitle}
                  </p>
                </div>

                {/* Cover Image */}
                <div className="h-56 sm:h-64 rounded-xl overflow-hidden border border-[#B89554]/30">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Paragraphs */}
                <div className="space-y-4 text-sm sm:text-base text-[#FAF8F4]/85 font-light leading-relaxed">
                  {selectedItem.content.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {/* Sub-footer inside modal */}
                <div className="pt-4 border-t border-[#B89554]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#FAF8F4]/60">
                  <div>
                    <span className="block">Advocacia Nicolau · Destaques</span>
                    <span className="text-[#CBA86B]">Guarapuava – PR</span>
                  </div>
                  <a
                    href={`https://wa.me/${contactInfo.whatsappNumberDigits}?text=${encodeURIComponent(
                      `Olá! Gostaria de falar com a Advocacia Nicolau sobre "${selectedItem.title}".`
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
