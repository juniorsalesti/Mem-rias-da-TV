/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Facebook, Instagram, Send, MessageCircle, Twitter, Compass, FileText, CheckCircle2, ShieldCheck, HelpCircle, X, Tv } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, payload?: any) => void;
}

export default function PortalFooter({ onNavigate }: FooterProps) {
  const [modalType, setModalType] = useState<string | null>(null);

  const legalContent: Record<string, { title: string; content: React.ReactNode }> = {
    sobre: {
      title: 'Sobre Nós - Memórias da TV',
      content: (
        <div className="space-y-4 text-sm text-neutral-300">
          <p>O portal <strong>Memórias da TV</strong> nasceu com a missão de catalogar, registrar e espalhar a rica história da televisão nacional do Brasil.</p>
          <p>Nosso acervo foca nos anos 80, 90 e 2000, revisitando os programas de auditório marcantes, as novelas inesquecíveis, o legado inestimável de Silvio Santos, Gugu Liberato, Hebe Camargo e a evolução histórica da nossa teledramaturgia escolar e infanto-juvenil.</p>
          <p>Com jornalistas e pesquisadores dedicados, oferecemos artigos profundos e nostálgicos baseados em fatos, entrevistas antigas e farto e rigoroso arquivo fotográfico. Nossa meta é manter viva a chama da nostalgia nacional de forma séria e responsável.</p>
        </div>
      )
    },
    privacidade: {
      title: 'Política de Privacidade',
      content: (
        <div className="space-y-4 text-sm text-neutral-300">
          <p>No <strong>Memórias da TV</strong>, a privacidade dos nossos visitantes é de extrema importância para nós. Esta política detalha quais dados pessoais são recebidos, coletados e como os utilizamos.</p>
          <h4 className="font-bold text-white mt-1">Arquivos de Log</h4>
          <p>Assim como a maioria dos sites, o Memórias da TV utiliza arquivos de log. As informações nos arquivos de log incluem endereços IP, tipo de navegador, Provedor de Internet (ISP), carimbo de data/hora, páginas de referência/saída e número de cliques para analisar tendências e administrar o site.</p>
          <h4 className="font-bold text-white mt-1">Cookies e Web Beacons</h4>
          <p>Nós utilizamos cookies para armazenar informações sobre as preferências dos visitantes, registrar dados específicos sobre quais páginas o usuário acede e customizar o conteúdo da nossa página web com base no tipo de navegador ou outras informações que envie.</p>
        </div>
      )
    },
    cookies: {
      title: 'Política de Cookies',
      content: (
        <div className="space-y-4 text-sm text-neutral-300">
          <p>Esta política de cookies descreve como as tecnologias de armazenamento identificadoras (cookies) agem no portal.</p>
          <p><strong>Por que usamos cookies?</strong> Coletamos cookies para melhorar seu carregamento, memorizar suas preferências locais de acessibilidade, coletar estatísticas anônimas através do Google Analytics e apoiar a veiculação de anúncios patrocinados pelo Google AdSense.</p>
          <p><strong>Configuração do Usuário:</strong> Você pode optar por desativar ou desativar seletivamente nossos cookies ou cookies de terceiros nas configurações do seu navegador de internet, embora isso possa afetar a forma como você interage com o nosso e outros portais.</p>
        </div>
      )
    },
    termos: {
      title: 'Termos de Uso',
      content: (
        <div className="space-y-4 text-sm text-neutral-300">
          <p>Ao acessar o portal <strong>Memórias da TV</strong>, você concorda em cumprir e respeitar os presentes Termos de Uso, todas as leis aplicáveis de direitos de patentes e marcas registradas.</p>
          <p><strong>Licença de Uso:</strong> O conteúdo textual gerado de forma nativa por nós é protegido pelas leis de direitos autorais. É concedida permissão para download temporário ou compartilhamento de parte das matérias estritamente para uso pessoal e não comercial, desde que citada devidamente a fonte por link amigável.</p>
          <p><strong>Responsabilidades:</strong> Não garantimos que a completude de certas memórias populares não sofra pequenas variações regionais do cotidiano dos anos correspondentes.</p>
        </div>
      )
    },
    disclaimer: {
      title: 'Disclaimer / Isenção de Responsabilidade',
      content: (
        <div className="space-y-4 text-sm text-neutral-300">
          <p>As opiniões expressas nos artigos assinados por autores convidados ou nos comentários de usuários não refletem necessariamente a linha editorial ou convicção institucional do <strong>Memórias da TV</strong>.</p>
          <p>Este é um site focado em entretenimento, curiosidades, história da comunicação e jornalismo de variedades. Nossas peças editoriais usam fatos documentados e contextualização artística sem intenção de ofender moralmente ou depreciar marcas, celebridades ou emissoras mencionadas.</p>
        </div>
      )
    }
  };

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5 text-neutral-400 hover:text-blue-500" />, href: '#', label: 'Facebook' },
    { icon: <Instagram className="w-5 h-5 text-neutral-400 hover:text-pink-500" />, href: '#', label: 'Instagram' },
    { icon: <Send className="w-5 h-5 text-neutral-400 hover:text-sky-500" />, href: '#', label: 'Telegram' },
    { icon: <MessageCircle className="w-5 h-5 text-neutral-400 hover:text-green-500" />, href: '#', label: 'WhatsApp' },
    { icon: <Twitter className="w-5 h-5 text-neutral-400 hover:text-neutral-100" />, href: '#', label: 'X' }
  ];

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 text-neutral-400 mt-12">
      {/* Upper Footer section */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-white font-sans font-bold text-base mb-3 flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-500" />
            <span>Memórias da TV</span>
          </h4>
          <span className="text-xs leading-relaxed block text-neutral-300">
            A mais completa enciclopédia digital sobre a era de ouro da televisão aberta do Brasil. Fatos marcantes, causos curiosos, antes e depois dos famosos e as lembranças nostálgicas que unem várias gerações de telespectadores em um só lugar.
          </span>
          {/* Social Profiles */}
          <div className="flex items-center gap-3 mt-4">
            {socialLinks.map((social, i) => (
              <a 
                href={social.href} 
                key={i} 
                title={social.label}
                className="p-2 bg-neutral-900 rounded border border-neutral-800 transition"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Categories footer quick views */}
        <div>
          <h4 className="text-white font-sans font-bold text-sm uppercase tracking-wider mb-3">Linhas do Tempo</h4>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => onNavigate('category', 'Silvio Santos')} className="hover:text-amber-400 transition cursor-pointer">Sílvio Santos e SBT</button></li>
            <li><button onClick={() => onNavigate('category', 'Globo')} className="hover:text-amber-400 transition cursor-pointer">História da Globo</button></li>
            <li><button onClick={() => onNavigate('category', 'Nostalgia')} className="hover:text-amber-400 transition cursor-pointer">Anos 80 e 90</button></li>
            <li><button onClick={() => onNavigate('category', 'Por Onde Anda?')} className="hover:text-amber-400 transition cursor-pointer">Segredos de Por Onde Anda?</button></li>
            <li><button onClick={() => onNavigate('category', 'Programas Antigos')} className="hover:text-amber-400 transition cursor-pointer">Programas Clássicos</button></li>
          </ul>
        </div>

        {/* AdSense checklist compliance */}
        <div>
          <h4 className="text-white font-sans font-bold text-sm uppercase tracking-wider mb-3">Qualificação AdSense</h4>
          <div className="space-y-2.5 text-xs text-neutral-300">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
              <span>Sitemap XML gerado e dinâmico</span>
            </div>
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
              <span>Cookies consentidos em conformidade com a LGPD</span>
            </div>
            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
              <span>Texto 100% original redigido por humanos e IA</span>
            </div>
          </div>
        </div>

        {/* Mandatory links */}
        <div>
          <h4 className="text-white font-sans font-bold text-sm uppercase tracking-wider mb-3">Estrutura Legal</h4>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => setModalType('sobre')} className="hover:text-amber-400 transition cursor-pointer">Sobre Nós</button></li>
            <li><button onClick={() => onNavigate('contato')} className="hover:text-amber-400 transition cursor-pointer">Contato</button></li>
            <li><button onClick={() => setModalType('privacidade')} className="hover:text-amber-400 transition cursor-pointer">Política de Privacidade</button></li>
            <li><button onClick={() => setModalType('cookies')} className="hover:text-amber-400 transition cursor-pointer">Política de Cookies</button></li>
            <li><button onClick={() => setModalType('termos')} className="hover:text-amber-400 transition cursor-pointer">Termos de Uso</button></li>
            <li><button onClick={() => setModalType('disclaimer')} className="hover:text-amber-400 transition cursor-pointer">Disclaimer</button></li>
          </ul>
        </div>
      </div>

      {/* Underbar */}
      <div className="bg-neutral-950 border-t border-neutral-900 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <span>&copy; {new Date().getFullYear()} Memórias da TV. Todos os direitos reservados.</span>
          <span className="text-neutral-500 text-[11px] font-mono">
            Hospedagem de Alta Performance compatível com Vercel, Supabase e Cloud Run
          </span>
        </div>
      </div>

      {/* Statutory Pages Modal Popup overlay */}
      {modalType && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl max-w-xl w-full p-6 shadow-2xl relative animate-scale-up">
            <button 
              onClick={() => setModalType(null)} 
              className="absolute right-4 top-4 p-2 text-neutral-400 hover:text-white rounded-full bg-neutral-950/60 hover:bg-neutral-800 transition"
            >
              <X className="w-5.5 h-5.5" />
            </button>
            <div className="flex items-center gap-2.5 border-b border-neutral-800 pb-3 mb-4">
              <Tv className="w-6 h-6 text-amber-500" />
              <h2 className="text-lg font-sans font-bold text-white">{legalContent[modalType].title}</h2>
            </div>
            <div className="overflow-y-auto max-h-[350px] pr-2 scrollbar-thin">
              {legalContent[modalType].content}
            </div>
            <div className="mt-5 pt-3 border-t border-neutral-800 text-right">
              <button 
                onClick={() => setModalType(null)}
                className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-bold px-4 py-2 rounded text-xs transition cursor-pointer"
              >
                Entendi e Aceito
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
