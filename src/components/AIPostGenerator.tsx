/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, RefreshCw, Send, CheckCircle, AlertTriangle, Cpu, Radio } from 'lucide-react';
import { Article, CategorySpec } from '../types';

interface AIPostGeneratorProps {
  categories: CategorySpec[];
  onAdoptArticle: (article: Article) => void;
}

export default function AIPostGenerator({ categories, onAdoptArticle }: AIPostGeneratorProps) {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('Nostalgia');
  const [focus, setFocus] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [generatedResult, setGeneratedResult] = useState<any | null>(null);
  const [adoptedMessage, setAdoptedMessage] = useState(false);

  const loadingMessages = [
    'Sintonizando antena parabólica analógica...',
    'Procurando arquivos perdidos no acervo dos anos 90...',
    'Aquecendo as válvulas da TV de tubo de 29 polegadas...',
    'Analisando lembranças do Silvio Santos...',
    'Rebobinando fita VHS com caneta esferográfica...',
    'Consolidando as piadas de camarim e curiosidades...',
    'Empacotando estrutura HTML amigável...',
    'Otimizando títulos para acionar o Google Discover...'
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      let index = 0;
      setLoadingText(loadingMessages[0]);
      interval = setInterval(() => {
        index = (index + 1) % loadingMessages.length;
        setLoadingText(loadingMessages[index]);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword) return;

    setLoading(true);
    setError(null);
    setGeneratedResult(null);
    setAdoptedMessage(false);

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          keyword,
          category,
          focus,
        }),
      });

      if (!response.ok) {
        throw new Error('Falha de resposta no servidor de Inteligência Artificial.');
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setGeneratedResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Houve um erro inexplicável de conexão com o robô Gemini.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdopt = () => {
    if (!generatedResult) return;

    const rawArticle = generatedResult.article;

    const newArticle: Article = {
      id: `art-${Date.now()}`,
      slug: keyword.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
      title: rawArticle.title,
      excerpt: rawArticle.excerpt,
      content: rawArticle.content,
      // Random illustrative unsplash image
      image: 'https://images.unsplash.com/photo-1542204172-e7052809a86e?auto=format&fit=crop&q=80&w=600',
      author: 'Redação',
      date: new Date().toISOString().split('T')[0],
      category: rawArticle.category || category,
      tags: rawArticle.tags || [keyword, "IA"],
      views: 120,
      readTime: rawArticle.readTime || '4 min',
      isDraft: true, // Adopt as Draft for additional review
      isFeatured: false,
      seoTitle: rawArticle.seoTitle,
      seoDescription: rawArticle.seoDescription,
      commentsCount: 0
    };

    onAdoptArticle(newArticle);
    setAdoptedMessage(true);
    setGeneratedResult(null);
    setKeyword('');
    setFocus('');
  };

  return (
    <div className="space-y-6 text-white bg-neutral-950 p-6 rounded-lg border border-neutral-800 animate-fade-in">
      <div className="flex items-center gap-3 bg-gradient-to-r from-amber-500/10 to-neutral-900 p-4 rounded-lg border border-amber-500/20">
        <Sparkles className="w-10 h-10 text-amber-500 shrink-0" />
        <div>
          <h3 className="text-base font-sans font-bold text-amber-300">Assistente de IA do Memórias da TV</h3>
          <p className="text-xs text-neutral-300 mt-1">
            Gere artigos históricos completos, títulos irresistíveis, descrições SEO, tags e categorias automáticas em segundos utilizando o modelo do Google <strong>Gemini 3.5-Flash</strong>.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form panel */}
        <form onSubmit={handleGenerate} className="lg:col-span-4 space-y-4">
          <div className="bg-neutral-900/60 p-4 rounded border border-neutral-800 space-y-3">
            <h4 className="text-xs font-sans font-bold uppercase text-neutral-400">Diretrizes da Redação</h4>
            
            <div>
              <label className="text-xs text-neutral-300 block mb-1">Palavra-chave ou Assunto Principal (Obrigatório)</label>
              <input
                type="text"
                placeholder="Ex: Comercial antigo da Sukita, Trapalhões..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                required
                className="w-full bg-neutral-950 border border-neutral-700 rounded p-2 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs text-neutral-300 block mb-1">Linha do Tempo / Categoria Desejada</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded p-2 text-xs focus:outline-none focus:border-amber-500"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name} className="bg-neutral-900">{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-neutral-300 block mb-1">Foco de Escrita Adicional (Opcional)</label>
              <textarea
                placeholder="Ex: Focar no antes e depois das atrizes ou revelar curiosidades secretas..."
                value={focus}
                onChange={(e) => setFocus(e.target.value)}
                rows={3}
                className="w-full bg-neutral-950 border border-neutral-700 rounded p-2 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !keyword}
              className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-neutral-800 text-neutral-950 py-2.5 px-4 rounded text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-neutral-950" />
                  <span>Gerando Matéria...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-neutral-950" />
                  <span>Gerar Redação por IA</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Output list panel */}
        <div className="lg:col-span-8">
          {loading && (
            <div className="h-[300px] border border-dashed border-neutral-800 bg-neutral-900/10 rounded flex flex-col justify-center items-center text-center p-6 space-y-4">
              <RefreshCw className="w-10 h-10 text-amber-500 animate-spin" />
              <p className="text-sm font-bold text-white max-w-sm">{loadingText}</p>
              <div className="flex gap-2 text-[10px] text-neutral-500 max-w-md">
                <Radio className="w-3.5 h-3.5 text-amber-500 animate-pulse mt-0.5 shrink-0" />
                <span>O algoritmo está processando conhecimentos de TV acumulados. Aguarde 5-10 segundos.</span>
              </div>
            </div>
          )}

          {error && (
            <div className="border border-red-500/20 bg-red-950/20 rounded p-5 text-center text-xs space-y-3">
              <AlertTriangle className="w-10 h-10 text-red-500 mx-auto" />
              <p className="text-sm font-bold text-white">Falha ao Contatar Servidor de IA</p>
              <p className="text-neutral-400 max-w-md mx-auto">{error}</p>
              <button 
                onClick={handleGenerate}
                className="bg-neutral-800 text-white font-bold py-1.5 px-4 rounded hover:bg-neutral-700"
              >
                Tentar Novamente
              </button>
            </div>
          )}

          {adoptedMessage && (
            <div className="border border-green-500/20 bg-green-950/15 rounded p-6 text-center text-xs space-y-3 animate-scale-up">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
              <p className="text-base font-bold text-white">Pronto! Matéria Incorporada ao Portal!</p>
              <p className="text-neutral-300 max-w-lg mx-auto">
                O artigo foi adicionado com sucesso como <strong>Rascunho</strong> na sua lista de matérias. Vá até a aba "Artigos" para revisá-lo fina, adicionar imagens e publicá-lo para seus leitores.
              </p>
              <div className="pt-2">
                <span className="text-[10px] text-neutral-500 font-mono">Indexador de tags e SEO criados automaticamente.</span>
              </div>
            </div>
          )}

          {!loading && !error && !adoptedMessage && !generatedResult && (
            <div className="h-[300px] border border-dashed border-neutral-800 bg-neutral-900/5 rounded flex flex-col justify-center items-center text-center p-6">
              <Cpu className="w-12 h-12 text-neutral-700 mb-2" />
              <h4 className="text-sm text-neutral-400 font-sans font-bold">Aguardando Parâmetros</h4>
              <p className="text-xs text-neutral-500 max-w-md mt-1">
                Insira o assunto pretendido na barra lateral e clique em "Gerar" para ver as mágicas do Gemini em tempo real na tela.
              </p>
            </div>
          )}

          {/* Generated content layout preview */}
          {!loading && generatedResult && (
            <div className="bg-neutral-900 rounded-lg p-5 border border-neutral-800 space-y-5 animate-scale-up">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="text-xs text-neutral-300 font-semibold font-sans">Artigo Gerado com Sucesso</span>
                </div>
                
                <button
                  onClick={handleAdopt}
                  className="bg-amber-400 hover:bg-amber-500 text-neutral-950 font-bold text-xs px-3.5 py-1.5 rounded flex items-center gap-1 cursor-pointer"
                >
                  <span>Adotar como Rascunho</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Real Article fields previews */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-amber-500 uppercase font-mono tracking-widest font-semibold block">Título do Post</span>
                  <h3 className="text-lg font-heading font-black text-white">{generatedResult.article.title}</h3>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs bg-neutral-950 p-3 rounded border border-neutral-800 font-mono">
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase block">Categoria Recomendada</span>
                    <span className="text-white font-sans font-bold">{generatedResult.article.category}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase block">Tempo de Leitura</span>
                    <span className="text-white font-bold">{generatedResult.article.readTime}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-neutral-500 uppercase font-mono block">Resumo Curto (Excerpt)</span>
                  <p className="text-neutral-300 text-xs italic bg-neutral-950/40 p-2.5 rounded border border-neutral-800">{generatedResult.article.excerpt}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-neutral-500 uppercase font-mono block">Texto Completo (Markdown Preview)</span>
                  <div className="bg-neutral-950 p-4 rounded border border-neutral-800 text-xs text-neutral-200 h-[150px] overflow-y-auto font-sans leading-relaxed space-y-3">
                    {generatedResult.article.content.split('\n\n').map((para: string, idx: number) => {
                      if (para.startsWith('###')) {
                        return <h4 key={idx} className="font-bold text-amber-300 text-sm mt-3">{para.replace('###', '')}</h4>;
                      }
                      if (para.startsWith('>')) {
                        return <blockquote key={idx} className="border-l-2 border-amber-500 pl-3 italic text-neutral-400 my-2">{para.replace('>', '')}</blockquote>;
                      }
                      return <p key={idx}>{para}</p>;
                    })}
                  </div>
                </div>

                <div className="space-y-1.5 p-3.5 bg-amber-500/5 rounded border border-amber-500/10">
                  <span className="text-[10px] text-amber-400 uppercase font-mono tracking-wider font-bold block">Meta Tags Otimizadas para Google Discover</span>
                  <div className="text-xs space-y-1">
                    <p className="text-neutral-300 font-bold"><span className="text-neutral-400 font-normal">Título SEO (Title Tag):</span> {generatedResult.article.seoTitle}</p>
                    <p className="text-neutral-300 font-bold mt-1"><span className="text-neutral-400 font-normal">Metadescrição (155 char limit):</span> {generatedResult.article.seoDescription}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-neutral-500 uppercase font-mono block">Tags Sugeridas</span>
                  <div className="flex flex-wrap gap-1.5">
                    {generatedResult.article.tags?.map((tag: string, i: number) => (
                      <span key={i} className="text-[10px] bg-neutral-850 text-neutral-300 px-2 py-0.5 rounded border border-neutral-800">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
