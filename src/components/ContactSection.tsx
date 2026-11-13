import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { ContactInfo } from '../data/officeData';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  CheckCircle,
  Settings,
  X,
  ExternalLink,
} from 'lucide-react';

interface ContactSectionProps {
  contactInfo: ContactInfo;
  onUpdateContactInfo: (updated: ContactInfo) => void;
  preselectedArea?: string;
  preselectedLawyer?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contactInfo,
  onUpdateContactInfo,
  preselectedArea,
  preselectedLawyer,
}) => {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    area: preselectedArea || 'Direito Criminal',
    message: preselectedLawyer
      ? `Olá, gostaria de agendar uma consulta preferencialmente com ${preselectedLawyer}.`
      : '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sendViaWhatsApp, setSendViaWhatsApp] = useState(true);

  // Edit Contact Information Modal State (Requested in Prompt: "deixar campo editável")
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editableInfo, setEditableInfo] = useState<ContactInfo>(contactInfo);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      if (sendViaWhatsApp) {
        const text = `*Contato via Site Advocacia Nicolau*\n\n*Nome:* ${formData.name}\n*Telefone:* ${formData.phone}\n*E-mail:* ${formData.email}\n*Área:* ${formData.area}\n*Mensagem:* ${formData.message}`;
        const waUrl = `https://wa.me/${contactInfo.whatsappNumberDigits}?text=${encodeURIComponent(text)}`;
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      }
    }, 600);
  };

  const handleSaveContactSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateContactInfo(editableInfo);
    setIsEditModalOpen(false);
  };

  return (
    <section id="contato" className="py-24 lg:py-32 bg-[#17130F] text-[#FAF8F4] relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#B89554]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Kicker */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-[1px] bg-[#B89554]" />
          <span
            className="text-xs uppercase tracking-[0.3em] text-[#D6B779] font-medium"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            ATENDIMENTO & LOCALIZAÇÃO
          </span>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Office Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.2] text-[#FAF8F4]"
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    textWrap: 'balance',
                  }}
                >
                  Estamos à disposição para atendê-lo.
                </h2>
              </div>

              <p className="text-base text-[#FAF8F4]/75 font-light leading-relaxed mb-10">
                Entre em contato com nossa equipe jurídica. Atendemos presencialmente em nossa sede
                em Guarapuava e também remotamente para clientes de outras comarcas e estados.
              </p>

              {/* Contact Data Items */}
              <div className="space-y-6 border-t border-[#B89554]/20 pt-8">
                {/* Endereço */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-[#282019] border border-[#B89554]/40 shrink-0 mt-0.5 rounded-xl">
                    <MapPin className="w-4 h-4 text-[#D6B779]" />
                  </div>
                  <div>
                    <h4
                      className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D6B779] mb-1"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      Endereço da Sede
                    </h4>
                    <p className="text-sm text-[#FAF8F4]/85 font-light leading-relaxed">
                      {contactInfo.address}
                    </p>
                    <p className="text-xs text-[#FAF8F4]/60">
                      {contactInfo.city} — {contactInfo.state}, CEP {contactInfo.cep}
                    </p>
                  </div>
                </div>

                {/* Telefones */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-[#282019] border border-[#B89554]/40 shrink-0 mt-0.5 rounded-xl">
                    <Phone className="w-4 h-4 text-[#D6B779]" />
                  </div>
                  <div>
                    <h4
                      className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D6B779] mb-1"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      Telefone & WhatsApp
                    </h4>
                    <p className="text-sm text-[#FAF8F4]/85 font-light">
                      Fixo: <span className="font-normal">{contactInfo.phone}</span>
                    </p>
                    <p className="text-sm text-[#FAF8F4]/85 font-light">
                      Plantão / WhatsApp: <span className="text-[#D6B779]">{contactInfo.whatsapp}</span>
                    </p>
                  </div>
                </div>

                {/* E-mail */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-[#282019] border border-[#B89554]/40 shrink-0 mt-0.5 rounded-xl">
                    <Mail className="w-4 h-4 text-[#D6B779]" />
                  </div>
                  <div>
                    <h4
                      className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D6B779] mb-1"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      E-mail Institucional
                    </h4>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-sm text-[#FAF8F4]/85 hover:text-[#D6B779] transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                {/* Horário */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-[#282019] border border-[#B89554]/40 shrink-0 mt-0.5 rounded-xl">
                    <Clock className="w-4 h-4 text-[#D6B779]" />
                  </div>
                  <div>
                    <h4
                      className="text-xs uppercase tracking-[0.2em] font-semibold text-[#D6B779] mb-1"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      Horário de Atendimento
                    </h4>
                    <p className="text-sm text-[#FAF8F4]/85 font-light leading-relaxed">
                      {contactInfo.workingHours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Button + Config button */}
              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <a
                  href={`https://wa.me/${contactInfo.whatsappNumberDigits}?text=${encodeURIComponent(
                    'Olá! Gostaria de falar diretamente com a equipe da Advocacia Nicolau.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-[#CBA86B] hover:bg-[#D6B779] text-[#17130F] text-xs font-semibold uppercase tracking-wider transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Ir direto para o WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setEditableInfo(contactInfo);
                    setIsEditModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-[#D6B779]/80 hover:text-[#D6B779] transition-colors cursor-pointer py-1"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Personalizar dados</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#282019]/60 border border-[#B89554]/40 p-8 sm:p-10 shadow-2xl rounded-3xl relative">
              <div className="mb-6">
                <h3
                  className="text-2xl font-normal text-[#FAF8F4] mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Envie sua Mensagem
                </h3>
                <p className="text-xs text-[#FAF8F4]/70 font-light">
                  Preencha as informações abaixo para que nossa equipe faça um primeiro diagnóstico.
                </p>
              </div>

              {isSubmitted ? (
                <div className="py-12 px-6 text-center bg-[#17130F] border border-[#B89554] rounded-2xl animate-fadeIn">
                  <CheckCircle className="w-12 h-12 text-[#D6B779] mx-auto mb-4" />
                  <h4
                    className="text-2xl font-normal text-[#FAF8F4] mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    Mensagem Recebida com Sucesso
                  </h4>
                  <p className="text-sm text-[#FAF8F4]/80 max-w-md mx-auto mb-6 font-light">
                    Agradecemos o contato. Nossa equipe jurídica entrará em contato com você o mais
                    breve possível respeitando o sigilo do seu caso.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        area: 'Direito Criminal',
                        message: '',
                      });
                    }}
                    className="px-6 py-2.5 border border-[#B89554] text-[#D6B779] text-xs uppercase tracking-widest hover:bg-[#B89554] hover:text-[#17130F] rounded-full transition-colors cursor-pointer"
                  >
                    Enviar Outra Mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#FAF8F4]/80 font-medium mb-1.5">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Ex: Carlos Eduardo Silveira"
                        className="w-full px-4 py-3 bg-[#17130F] border border-[#B89554]/30 rounded-xl text-[#FAF8F4] text-sm focus:border-[#D6B779] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#FAF8F4]/80 font-medium mb-1.5">
                        Telefone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Ex: (42) 99999-0000"
                        className="w-full px-4 py-3 bg-[#17130F] border border-[#B89554]/30 rounded-xl text-[#FAF8F4] text-sm focus:border-[#D6B779] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#FAF8F4]/80 font-medium mb-1.5">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Ex: seuemail@exemplo.com.br"
                        className="w-full px-4 py-3 bg-[#17130F] border border-[#B89554]/30 rounded-xl text-[#FAF8F4] text-sm focus:border-[#D6B779] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#FAF8F4]/80 font-medium mb-1.5">
                        Área de Interesse
                      </label>
                      <select
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[#17130F] border border-[#B89554]/30 rounded-xl text-[#FAF8F4] text-sm focus:border-[#D6B779] focus:outline-none transition-colors"
                      >
                        <option value="Direito Criminal">Direito Criminal</option>
                        <option value="Direito Civil">Direito Civil</option>
                        <option value="Direito de Família">Direito de Família</option>
                        <option value="Consulta Geral / Outras Questões">Consulta Geral / Outras Questões</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#FAF8F4]/80 font-medium mb-1.5">
                      Descreva resumidamente a sua demanda *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Descreva as principais circunstâncias do seu caso. Garantimos absoluto sigilo..."
                      className="w-full px-4 py-3 bg-[#17130F] border border-[#B89554]/30 rounded-xl text-[#FAF8F4] text-sm focus:border-[#D6B779] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* WhatsApp redirect toggle option */}
                  <div className="flex items-center gap-3 py-1">
                    <input
                      type="checkbox"
                      id="sendWhatsApp"
                      checked={sendViaWhatsApp}
                      onChange={(e) => setSendViaWhatsApp(e.target.checked)}
                      className="accent-[#B89554] w-4 h-4 cursor-pointer"
                    />
                    <label htmlFor="sendWhatsApp" className="text-xs text-[#FAF8F4]/80 cursor-pointer">
                      Encaminhar também cópia direta pelo WhatsApp para agilidade imediata
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#B89554] text-[#17130F] font-semibold text-xs uppercase tracking-[0.22em] hover:bg-[#D6B779] rounded-full transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Enviando mensagem...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Enviar Mensagem</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-[#FAF8F4]/50 text-center font-light pt-2">
                    Seus dados estão protegidos nos termos da LGPD (Lei nº 13.709/18) e protegidos pelo
                    sigilo da advocacia.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Extended Rectangular Google Maps aligned below form and office details */}
        <div className="mt-12 sm:mt-16 border border-[#B89554]/40 overflow-hidden bg-[#282019] shadow-2xl rounded-3xl">
          <div className="p-3.5 sm:p-4 bg-[#282019] border-b border-[#B89554]/30 rounded-t-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#D6B779]">
            <span className="font-semibold uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D6B779]" /> Localização da Sede da Advocacia Nicolau
            </span>
            <span className="text-[#FAF8F4]/80 text-[11px] sm:text-xs">
              {contactInfo.address} — {contactInfo.city}/{contactInfo.state}
            </span>
          </div>
          <div className="h-64 sm:h-80 md:h-96 w-full rounded-b-3xl overflow-hidden">
            <iframe
              title="Mapa de Localização - Advocacia Nicolau em Guarapuava, PR"
              src={contactInfo.googleMapsUrl}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(0.25) contrast(1.08)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* Editable Contact Info Modal rendered in document.body */}
      {isEditModalOpen &&
        createPortal(
          <div
            onClick={() => setIsEditModalOpen(false)}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
            role="dialog"
            aria-modal="true"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl bg-[#FAF8F4] text-[#17130F] border border-[#B89554] p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#17130F]/70 hover:text-[#17130F] focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>

            <h3
              className="text-2xl font-semibold mb-2 text-[#17130F]"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Configurar Informações do Escritório
            </h3>
            <p className="text-xs text-[#282019]/70 mb-6">
              Edite os dados cadastrais da banca (endereço, telefones, e-mail e horários). As alterações
              são atualizadas instantaneamente em toda a landing page.
            </p>

            <form onSubmit={handleSaveContactSettings} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#8C6F36] mb-1">
                  Logradouro e Número
                </label>
                <input
                  type="text"
                  value={editableInfo.address}
                  onChange={(e) =>
                    setEditableInfo({ ...editableInfo, address: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-[#B89554]/40 text-sm bg-white"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#8C6F36] mb-1">
                    Cidade
                  </label>
                  <input
                    type="text"
                    value={editableInfo.city}
                    onChange={(e) =>
                      setEditableInfo({ ...editableInfo, city: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-[#B89554]/40 text-sm bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#8C6F36] mb-1">
                    Estado
                  </label>
                  <input
                    type="text"
                    value={editableInfo.state}
                    onChange={(e) =>
                      setEditableInfo({ ...editableInfo, state: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-[#B89554]/40 text-sm bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#8C6F36] mb-1">
                    CEP
                  </label>
                  <input
                    type="text"
                    value={editableInfo.cep}
                    onChange={(e) =>
                      setEditableInfo({ ...editableInfo, cep: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-[#B89554]/40 text-sm bg-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#8C6F36] mb-1">
                    Telefone Fixo
                  </label>
                  <input
                    type="text"
                    value={editableInfo.phone}
                    onChange={(e) =>
                      setEditableInfo({ ...editableInfo, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-[#B89554]/40 text-sm bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#8C6F36] mb-1">
                    WhatsApp (Exibição)
                  </label>
                  <input
                    type="text"
                    value={editableInfo.whatsapp}
                    onChange={(e) =>
                      setEditableInfo({ ...editableInfo, whatsapp: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-[#B89554]/40 text-sm bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#8C6F36] mb-1">
                  WhatsApp (Apenas Dígitos com DDI e DDD)
                </label>
                <input
                  type="text"
                  value={editableInfo.whatsappNumberDigits}
                  onChange={(e) =>
                    setEditableInfo({ ...editableInfo, whatsappNumberDigits: e.target.value.replace(/\D/g, '') })
                  }
                  className="w-full px-3 py-2 border border-[#B89554]/40 text-sm bg-white"
                  placeholder="5542998761978"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#8C6F36] mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  value={editableInfo.email}
                  onChange={(e) =>
                    setEditableInfo({ ...editableInfo, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-[#B89554]/40 text-sm bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#8C6F36] mb-1">
                  Horário de Atendimento
                </label>
                <input
                  type="text"
                  value={editableInfo.workingHours}
                  onChange={(e) =>
                    setEditableInfo({ ...editableInfo, workingHours: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-[#B89554]/40 text-sm bg-white"
                  required
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#B89554]/20">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-xs uppercase tracking-wider text-slate-700 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#B89554] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#8C6F36]"
                >
                  Salvar Atualizações
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};
