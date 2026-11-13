import React from 'react';
import { createPortal } from 'react-dom';
import { X, ShieldCheck } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-[#FAF8F4] text-[#17130F] border border-[#B89554] p-6 sm:p-10 shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#17130F]/70 hover:text-[#17130F] hover:bg-[#B89554]/10 transition-colors focus:outline-none"
          aria-label="Fechar aviso institucional"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <ShieldCheck className="w-6 h-6 text-[#8C6F36]" />
          <span
            className="text-xs uppercase tracking-[0.25em] text-[#8C6F36] font-semibold"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            TERMOS INSTITUCIONAIS & PRIVACIDADE
          </span>
        </div>

        <h3
          id="privacy-modal-title"
          className="text-2xl sm:text-3xl text-[#17130F] font-normal mb-6"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Aviso Legal e Política de Privacidade — LGPD
        </h3>

        <div className="space-y-5 text-sm sm:text-base text-[#282019]/85 font-light leading-relaxed border-t border-[#B89554]/25 pt-6">
          <section>
            <h4
              className="text-xs uppercase tracking-wider font-semibold text-[#8C6F36] mb-2"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              1. Conformidade com a OAB e Natureza Informativa
            </h4>
            <p>
              Este sítio eletrônico tem caráter estritamente institucional e informativo, em
              rigorosa consonância com o Código de Ética e Disciplina da Ordem dos Advogados do
              Brasil (OAB) e o Provimento nº 205/2021 do Conselho Federal da OAB. Nenhuma informação
              aqui veiculada configura oferta pública de serviços, captação indevida de clientela ou
              parecer jurídico definitivo para casos concretos.
            </p>
          </section>

          <section>
            <h4
              className="text-xs uppercase tracking-wider font-semibold text-[#8C6F36] mb-2"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              2. Sigilo Profissional da Advocacia
            </h4>
            <p>
              Todas as comunicações, dados preliminares e documentos compartilhados através dos
              canais eletrônicos (formulário, e-mail e aplicativo WhatsApp) são amparados pelo
              inviolável sigilo profissional assegurado pelo artigo 7º, inciso XIX, do Estatuto da
              Advocacia (Lei Federal nº 8.906/1994).
            </p>
          </section>

          <section>
            <h4
              className="text-xs uppercase tracking-wider font-semibold text-[#8C6F36] mb-2"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              3. Tratamento de Dados Pessoais (LGPD)
            </h4>
            <p>
              Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), coletamos
              apenas os dados estritamente necessários para o atendimento inicial e retorno de
              contato (nome, telefone, e-mail e resumo da mensagem). Os dados não são cedidos,
              comercializados ou compartilhados com terceiros sob nenhuma hipótese.
            </p>
          </section>

          <section>
            <h4
              className="text-xs uppercase tracking-wider font-semibold text-[#8C6F36] mb-2"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              4. Direitos do Titular
            </h4>
            <p>
              O titular dos dados pode a qualquer momento solicitar a confirmação de existência de
              tratamento, acesso, correção ou eliminação de seus dados pessoais através do canal:{' '}
              <span className="font-semibold text-[#17130F]">contato@advocacianicolau.adv.br</span>.
            </p>
          </section>
        </div>

        <div className="pt-6 border-t border-[#B89554]/25 flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#17130F] text-[#FAF8F4] text-xs uppercase tracking-widest font-medium hover:bg-[#B89554] hover:text-[#17130F] transition-colors cursor-pointer"
          >
            Entendido e Fechar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
