/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, CheckCircle, ArrowRight, Radio } from 'lucide-react';
import { NewsletterSubscriber } from '../types';

interface NewsletterProps {
  source: string;
  onSubscribe: (subscriber: NewsletterSubscriber) => void;
  variant?: 'full' | 'compact' | 'sidebar';
}

export default function NewsletterBox({ source, onSubscribe, variant = 'full' }: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [integration, setIntegration] = useState<'mailchimp' | 'brevo'>('brevo');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    const newSub: NewsletterSubscriber = {
      id: `sub-${Date.now()}`,
      email: email,
      date: new Date().toISOString().split('T')[0],
      source: source
    };

    onSubscribe(newSub);
    setSubscribed(true);
    setEmail('');
  };

  if (subscribed) {
    return (
      <div className="bg-gradient-to-br from-blue-950 to-neutral-900 border border-amber-500/20 rounded-xl p-6 text-center shadow-lg animate-fade-in">
        <CheckCircle className="w-12 h-12 text-amber-500 mx-auto mb-2" />
        <h4 className="text-lg font-sans font-bold text-white">Inscrição Efetuada com Sucesso!</h4>
        <p className="text-sm text-neutral-300 mt-1 max-w-sm mx-auto">
          Você foi cadastrado na lista do portal <strong>Memórias da TV</strong>.
        </p>
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-amber-900/40 text-amber-300 text-[11px] font-mono rounded">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>Integrado com {integration === 'brevo' ? 'Brevo API' : 'Mailchimp Sync'}</span>
        </div>
        <button 
          onClick={() => setSubscribed(false)}
          className="text-xs text-neutral-400 underline block mx-auto mt-4 hover:text-white"
        >
          Cadastrar outro e-mail
        </button>
      </div>
    );
  }

  if (variant === 'sidebar' || variant === 'compact') {
    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-5 shadow-sm">
        <h4 className="text-sm font-sans font-bold text-white uppercase tracking-wider mb-2">Boletim de Nostalgia</h4>
        <p className="text-xs text-neutral-300 mb-4">
          Receba diretamente em seu e-mail o melhor da história da TV, do Silvio Santos e novidades raras.
        </p>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 w-4 h-4 text-neutral-500" />
            <input
              type="email"
              placeholder="Seu melhor e-mail..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-neutral-950 border border-neutral-700 rounded p-2.5 pl-9 text-xs text-white focus:outline-none focus:border-amber-500 placeholder:text-neutral-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-neutral-950 text-xs font-bold py-2 px-3 rounded flex items-center justify-center gap-2 transition"
          >
            <span>Assinar Boletim</span>
            <ArrowRight className="w-3 px-0.5 pointer-events-none" />
          </button>
        </form>
        <div className="flex justify-between items-center mt-3 pt-3 border-t border-neutral-800 text-[9px] text-neutral-400">
          <span>Sincronização:</span>
          <div className="flex gap-2">
            <button 
              type="button" 
              onClick={() => setIntegration('brevo')}
              className={`hover:text-amber-500 ${integration === 'brevo' ? 'text-amber-400 font-semibold' : ''}`}
            >
              Brevo
            </button>
            <button 
              type="button" 
              onClick={() => setIntegration('mailchimp')}
              className={`hover:text-amber-500 ${integration === 'mailchimp' ? 'text-amber-400 font-semibold' : ''}`}
            >
              Mailchimp
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#010f25] to-neutral-900 border border-neutral-800 rounded-xl p-8 shadow-md">
      <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-6">
        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-full hidden md:block">
          <Mail className="w-8 h-8 text-amber-500" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-sans font-bold text-white tracking-tight">O melhor da TV brasileira em sua caixa de entrada</h3>
          <p className="text-sm text-neutral-300 mt-1.5">
            Inscreva-se hoje para receber artigos de nostalgia pura, revelações de antes e depois e causos famosos semanais. Sem Spam, saia quando quiser.
          </p>
        </div>
        <div className="w-full md:w-auto min-w-[280px]">
          <form onSubmit={handleSubmit} className="flex gap-2 flex-col sm:flex-row">
            <input
              type="email"
              placeholder="Seu endereço de e-mail..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 sm:w-64 bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-amber-500 placeholder:text-neutral-500"
            />
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold px-5 py-3 rounded-lg text-sm flex items-center justify-center gap-2 whitespace-nowrap transition cursor-pointer"
            >
              Inscrever-se
            </button>
          </form>
          <div className="flex justify-center md:justify-end gap-3 text-[10px] text-neutral-400 mt-2">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
              Fácil cancelamento
            </span>
            <span className="text-neutral-500">|</span>
            <span className="flex items-center gap-1">
              API Ativo: 
              <select 
                value={integration} 
                onChange={(e) => setIntegration(e.target.value as any)}
                className="bg-transparent border-none text-neutral-300 outline-none cursor-pointer hover:text-amber-400 font-sans"
              >
                <option value="brevo" className="bg-neutral-900">Brevo</option>
                <option value="mailchimp" className="bg-neutral-900">Mailchimp</option>
              </select>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
