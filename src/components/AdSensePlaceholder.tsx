/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EyeOff, Landmark } from 'lucide-react';
import { AdsSettings } from '../types';

interface AdSenseProps {
  slot: 'top' | 'middle' | 'bottom' | 'sidebar' | 'homepage' | 'mobile';
  height?: string;
  showSimulatedAds: boolean;
  adsSettings?: AdsSettings;
}

export default function AdSensePlaceholder({ slot, height = 'h-[90px]', showSimulatedAds, adsSettings }: AdSenseProps) {
  const isEnabled = adsSettings?.isEnabled ?? false;
  const isConfigured = !!(adsSettings?.publisherId?.trim() && adsSettings?.globalCode?.trim());

  if (!isEnabled || !isConfigured) {
    return null; // Não renderizar nada absolutamente (sem margem, sem bordas, sem placeholders)
  }

  const slotLabels: Record<string, { title: string; size: string; desc: string }> = {
    top: { title: 'Leaderboard Superior', size: '728x90 (Desktop) / 320x50 (Mobile)', desc: 'Excelente taxa de CTR, posicionado no cabeçalho antes do conteúdo principal.' },
    middle: { title: 'Retângulo no Meio do Artigo', size: '336x280 ou Responsivo', desc: 'Ideal para quebrar a leitura longa sem prejudicar a experiência de leitura.' },
    bottom: { title: 'Banner ao Final do Post', size: '300x250 ou 728x90', desc: 'Atrai cliques após o engajamento de leitura completa do usuário.' },
    sidebar: { title: 'Arranha-Céu Lateral', size: '300x600', desc: 'Alta visibilidade, acompanha a barra lateral duradoura com scroll.' },
    homepage: { title: 'In-Feed Home Divisor', size: '970x250 Grid', desc: 'Encaixa de forma nativa entre as chamadas de matérias em destaque.' },
    mobile: { title: 'Âncora Mobile Ad', size: '320x50 Smart-Ad', desc: 'Gruda de forma fluída no rodapé do dispositivo smartphone do leitor.' }
  };

  const adInfo = slotLabels[slot] || { title: 'Espaço de Anúncio', size: 'Responsivo', desc: 'Preparado para Google AdSense.' };

  // Se estiver ativado e configurado, renderiza o mockup do anúncio ativo do Google AdSense
  return (
    <div className={`w-full ${height} bg-[#010f25] border border-amber-500/30 rounded-lg relative overflow-hidden flex flex-col justify-center items-center p-3 text-center transition-all duration-300 shadow-md`}>
      <div className="absolute top-1 right-2 flex items-center gap-1.5">
        <span className="text-[9px] font-mono tracking-wider text-amber-500 bg-amber-950 px-1.5 py-0.5 rounded uppercase font-semibold border border-amber-500/20">Anúncio Ativo</span>
        <span className="text-[8px] text-neutral-400 font-mono">PubID: {adsSettings.publisherId}</span>
      </div>
      <div className="flex items-center gap-2 mb-1 mt-1">
        <Landmark className="w-5 h-5 text-amber-500 animate-pulse" />
        <h4 className="text-xs font-sans font-bold text-amber-200 tracking-tight">Anúncio Google AdSense</h4>
      </div>
      <p className="text-[10px] text-neutral-300 max-w-md line-clamp-1">Bloco automatizado renderizado via Código Global configurado.</p>
      <span className="text-[9px] text-neutral-400 font-mono mt-0.5">{adInfo.title} ({adInfo.size})</span>
    </div>
  );
}

