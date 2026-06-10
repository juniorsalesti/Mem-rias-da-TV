/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EyeOff, Landmark } from 'lucide-react';

interface AdSenseProps {
  slot: 'top' | 'middle' | 'bottom' | 'sidebar' | 'homepage' | 'mobile';
  height?: string;
  showSimulatedAds: boolean;
}

export default function AdSensePlaceholder({ slot, height = 'h-[90px]', showSimulatedAds }: AdSenseProps) {
  const slotLabels: Record<string, { title: string; size: string; desc: string }> = {
    top: { title: 'Leaderboard Superior', size: '728x90 (Desktop) / 320x50 (Mobile)', desc: 'Excelente taxa de CTR, posicionado no cabeçalho antes do conteúdo principal.' },
    middle: { title: 'Retângulo no Meio do Artigo', size: '336x280 ou Responsivo', desc: 'Ideal para quebrar a leitura longa sem prejudicar a experiência de leitura.' },
    bottom: { title: 'Banner ao Final do Post', size: '300x250 ou 728x90', desc: 'Atrai cliques após o engajamento de leitura completa do usuário.' },
    sidebar: { title: 'Arranha-Céu Lateral', size: '300x600', desc: 'Alta visibilidade, acompanha a barra lateral duradoura com scroll.' },
    homepage: { title: 'In-Feed Home Divisor', size: '970x250 Grid', desc: 'Encaixa de forma nativa entre as chamadas de matérias em destaque.' },
    mobile: { title: 'Âncora Mobile Ad', size: '320x50 Smart-Ad', desc: 'Gruda de forma fluída no rodapé do dispositivo smartphone do leitor.' }
  };

  const adInfo = slotLabels[slot] || { title: 'Espaço de Anúncio', size: 'Responsivo', desc: 'Preparado para Google AdSense.' };

  if (showSimulatedAds) {
    // Return a highly premium mock visual advertisement
    return (
      <div className={`w-full ${height} bg-neutral-900 border border-amber-500/20 rounded-md relative overflow-hidden flex flex-col justify-center items-center p-3 text-center transition-all duration-300 shadow`}>
        <div className="absolute top-1 right-2 flex items-center gap-1.5">
          <span className="text-[9px] font-mono tracking-wider text-amber-500 bg-amber-900/40 px-1.5 py-0.5 rounded uppercase font-semibold">Anúncio Ativo</span>
          <span className="text-[8px] text-neutral-400">AdSense Ad_ID: #{Math.floor(100000 + Math.random() * 900000)}</span>
        </div>
        <div className="flex items-center gap-2 mb-1 mt-1">
          <Landmark className="w-5 h-5 text-amber-500 animate-pulse animate-duration-100" />
          <h4 className="text-sm font-sans font-bold text-amber-200 tracking-tight">Anuncie no Memórias da TV</h4>
        </div>
        <p className="text-xs text-neutral-300 max-w-md line-clamp-1">As marcas que fizeram sua infância feliz estão reunidas aqui. Anuncie sua marca!</p>
        <span className="text-[10px] text-neutral-400 font-mono mt-0.5">{adInfo.size}</span>
      </div>
    );
  }

  return (
    <div className={`w-full ${height} border-2 border-dashed border-neutral-700 bg-neutral-950/40 rounded-lg flex flex-col justify-center items-center p-4 text-center transition-all duration-300 hover:border-neutral-500`}>
      <div className="flex items-center gap-2 mb-1">
        <EyeOff className="w-4 h-4 text-neutral-500" />
        <span className="text-xs font-semibold text-neutral-400 font-sans tracking-wide uppercase">
          {adInfo.title}
        </span>
      </div>
      <p className="text-[11px] text-neutral-500 max-w-xl leading-relaxed">
        {adInfo.desc} <span className="text-neutral-400 font-mono">({adInfo.size})</span>
      </p>
      <span className="text-[9px] text-neutral-600 bg-neutral-900/60 border border-neutral-800/80 px-1.5 py-0.5 rounded mt-1 font-mono">
        AdSense Pronto (Inativo)
      </span>
    </div>
  );
}
