/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MessageSquare, Check, Trash2, Shield, AlertCircle, Filter, CheckCircle } from 'lucide-react';
import { Comment } from '../types';

interface CommentsProps {
  comments: Comment[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onAddSpamKeyword: (keyword: string) => void;
  spamKeywords: string[];
}

export default function CommentsManager({
  comments,
  onApprove,
  onReject,
  onAddSpamKeyword,
  spamKeywords
}: CommentsProps) {
  const [newKeyword, setNewKeyword] = useState('');
  const [modFilter, setModFilter] = useState<'all' | 'pending' | 'approved'>('all');
  const [antiSpamStrict, setAntiSpamStrict] = useState(true);

  const handleAddKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyword) return;
    onAddSpamKeyword(newKeyword.trim().toLowerCase());
    setNewKeyword('');
  };

  const filteredComments = comments.filter((c) => {
    if (modFilter === 'pending') return !c.isApproved;
    if (modFilter === 'approved') return c.isApproved;
    return true;
  });

  return (
    <div className="space-y-6 text-white bg-neutral-950 p-6 rounded-lg border border-neutral-800 animate-fade-in">
      {/* Header section with metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <h2 className="text-xl font-sans font-bold flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-500" />
            <span>Moderação de Comentários</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-1">Monitore, aprove ou delete discussões dos leitores nas matérias.</p>
        </div>

        {/* Filter buttons */}
        <div className="bg-neutral-900 border border-neutral-800 p-1 rounded-lg flex h-fit text-xs font-semibold">
          <button 
            type="button" 
            onClick={() => setModFilter('all')}
            className={`px-3 py-1 rounded transition cursor-pointer ${modFilter === 'all' ? 'bg-amber-400 text-neutral-950 shadow' : 'text-neutral-400 hover:text-white'}`}
          >
            Todos ({comments.length})
          </button>
          <button 
            type="button" 
            onClick={() => setModFilter('pending')}
            className={`px-3 py-1 rounded transition cursor-pointer ${modFilter === 'pending' ? 'bg-amber-400 text-neutral-950 shadow' : 'text-neutral-400 hover:text-white'}`}
          >
            Pendentes ({comments.filter(c => !c.isApproved).length})
          </button>
          <button 
            type="button" 
            onClick={() => setModFilter('approved')}
            className={`px-3 py-1 rounded transition cursor-pointer ${modFilter === 'approved' ? 'bg-amber-400 text-neutral-950 shadow' : 'text-neutral-400 hover:text-white'}`}
          >
            Aprovados ({comments.filter(c => c.isApproved).length})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Anti spam layout config */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg space-y-4">
            <h3 className="text-xs font-sans font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 border-b border-neutral-800 pb-2">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>Controle Anti-Spam</span>
            </h3>

            {/* Smart spam shield toggle */}
            <div className="flex items-center justify-between bg-neutral-950 p-2.5 rounded border border-neutral-850">
              <div className="space-y-0.5 max-w-xs">
                <span className="text-xs font-bold font-sans">Bloqueio Automático</span>
                <p className="text-[10px] text-neutral-500 leading-snug">Detecção instantânea de e-mails inválidos ou links suspeitos.</p>
              </div>
              <input
                type="checkbox"
                checked={antiSpamStrict}
                onChange={(e) => setAntiSpamStrict(e.target.checked)}
                className="w-4 h-4 text-amber-500 focus:outline-none"
              />
            </div>

            {/* Word lists blockages */}
            <div className="space-y-3">
              <label className="text-[11px] text-neutral-400 font-sans block">Palavras-chave Bloqueadas (Spam List)</label>
              
              <form onSubmit={handleAddKeyword} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ex: poker, gratis, win..."
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  className="bg-neutral-950 border border-neutral-700 p-2 text-xs rounded flex-1 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="bg-neutral-850 text-white font-bold p-2 text-xs rounded hover:bg-neutral-700 border border-neutral-700"
                >
                  Adicionar
                </button>
              </form>

              {spamKeywords.length > 0 ? (
                <div className="flex flex-wrap gap-1 bg-neutral-950 p-2 rounded max-h-[80px] overflow-y-auto">
                  {spamKeywords.map((kw, i) => (
                    <span 
                      key={i} 
                      className="text-[10px] bg-neutral-900 text-amber-400 px-2 py-0.5 rounded border border-neutral-850"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-[10px] text-neutral-500 font-mono italic">Nenhuma palavra-chave customizada bloqueada.</p>
              )}
            </div>
          </div>
        </div>

        {/* Comments table moderations lists */}
        <div className="lg:col-span-8">
          {filteredComments.length === 0 ? (
            <div className="h-[200px] border border-dashed border-neutral-800 bg-neutral-900/10 rounded flex flex-col justify-center items-center text-center p-6">
              <CheckCircle className="w-8 h-8 text-neutral-600 mb-1.5" />
              <h4 className="text-xs font-sans font-bold text-neutral-400 uppercase tracking-widest">Fila de Comentários Vazia</h4>
              <p className="text-[11px] text-neutral-500 max-w-sm mt-1 leading-relaxed">Excelente! Não há registros correspondentes pendentes de moderação.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredComments.map((com) => (
                <div 
                  key={com.id} 
                  className={`p-4 rounded bg-neutral-905 border relative transition flex flex-col gap-2 ${
                    com.isApproved 
                      ? 'border-neutral-800 bg-neutral-900/30' 
                      : 'border-amber-500/20 bg-amber-500/5 shadow shadow-amber-500/5'
                  }`}
                >
                  {/* Approval status label */}
                  <div className="absolute top-2.5 right-2.5 flex gap-1">
                    {!com.isApproved && (
                      <span className="text-[9px] bg-amber-500/10 text-amber-400 font-mono px-1.5 py-0.5 rounded uppercase font-bold border border-amber-500/20">
                        Pendente
                      </span>
                    )}
                    {com.isApproved && (
                      <span className="text-[9px] bg-emerald-500/10 text-emerald-400 font-mono px-1.5 py-0.5 rounded uppercase font-bold border border-emerald-500/20">
                        Aprovado
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 pr-16 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-white text-sm">{com.userName}</span>
                      <span className="text-neutral-500 font-mono text-[10px]">({com.email})</span>
                      <span className="text-neutral-600 font-mono text-[10px]">• {com.date}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-400">Em: <strong className="text-neutral-300">{com.articleTitle}</strong></span>
                    </div>
                  </div>

                  <p className="text-neutral-300 text-xs italic bg-neutral-950/40 p-2.5 rounded border border-neutral-850 mt-1">
                    "{com.content}"
                  </p>

                  <div className="flex justify-end gap-1.5 mt-2 border-t border-neutral-850 pt-2 text-[10px]">
                    {!com.isApproved && (
                      <button
                        type="button"
                        onClick={() => onApprove(com.id)}
                        className="px-2.5 py-1 bg-amber-400 hover:bg-amber-500 text-neutral-950 font-bold rounded flex items-center gap-1 transition cursor-pointer"
                      >
                        <Check className="w-3" />
                        <span>Aprovar Comentário</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onReject(com.id)}
                      className="px-2.5 py-1 bg-neutral-900 hover:bg-red-500/10 hover:text-red-500 border border-neutral-800 text-neutral-400 rounded flex items-center gap-1 transition cursor-pointer"
                    >
                      <Trash2 className="w-3" />
                      <span>Excluir</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
