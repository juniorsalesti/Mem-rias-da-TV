/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Calendar, Layout, User, Tag, Eye, Save, X, ExternalLink, Sparkles, AlertCircle, Sliders } from 'lucide-react';
import { Article, CategorySpec } from '../types';

interface ArticlesManagerProps {
  articles: Article[];
  categories: CategorySpec[];
  onAddArticle: (article: Article) => void;
  onEditArticle: (article: Article) => void;
  onDeleteArticle: (id: string) => void;
  onOpenAIGenerator: () => void;
}

export default function ArticlesManager({
  articles,
  categories,
  onAddArticle,
  onEditArticle,
  onDeleteArticle,
  onOpenAIGenerator
}: ArticlesManagerProps) {
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Form Fields State
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState(categories[0]?.name || 'Nostalgia');
  const [tagsInput, setTagsInput] = useState('');
  const [author, setAuthor] = useState('');
  const [readTime, setReadTime] = useState('4 min');
  const [isDraft, setIsDraft] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [galleryInput, setGalleryInput] = useState('');

  const initForm = (article?: Article) => {
    if (article) {
      setEditingArticle(article);
      setTitle(article.title);
      setExcerpt(article.excerpt);
      setContent(article.content);
      setImage(article.image);
      setCategory(article.category);
      setTagsInput(article.tags.join(', '));
      setAuthor(article.author);
      setReadTime(article.readTime);
      setIsDraft(article.isDraft);
      setScheduledDate(article.scheduledDate || '');
      setIsFeatured(article.isFeatured);
      setSeoTitle(article.seoTitle || '');
      setSeoDescription(article.seoDescription || '');
      setYoutubeUrl(article.youtubeUrl || '');
      setGalleryInput(article.gallery?.join(', ') || '');
      setIsCreatingNew(false);
    } else {
      setEditingArticle(null);
      setTitle('');
      setExcerpt('');
      setContent('');
      setImage('https://images.unsplash.com/photo-1542204172-e7052809a86e?auto=format&fit=crop&q=80&w=600');
      setCategory(categories[0]?.name || 'Nostalgia');
      setTagsInput('SBT, Nostalgia, Anos 90');
      setAuthor('Alexandre Costa');
      setReadTime('5 min');
      setIsDraft(false);
      setScheduledDate('');
      setIsFeatured(false);
      setSeoTitle('');
      setSeoDescription('');
      setYoutubeUrl('');
      setGalleryInput('');
      setIsCreatingNew(true);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const tagsArray = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);
    const galleryArray = galleryInput.split(',').map((g) => g.trim()).filter(Boolean);
    const slug = title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    const newArtData: Article = {
      id: editingArticle ? editingArticle.id : `art-${Date.now()}`,
      slug,
      title,
      excerpt,
      content,
      image,
      gallery: galleryArray.length > 0 ? galleryArray : undefined,
      youtubeUrl: youtubeUrl || undefined,
      author,
      date: editingArticle ? editingArticle.date : new Date().toISOString().split('T')[0],
      category,
      tags: tagsArray,
      views: editingArticle ? editingArticle.views : 210,
      readTime,
      isDraft,
      scheduledDate: scheduledDate || undefined,
      isFeatured,
      seoTitle: seoTitle || `${title} | Memórias da TV`,
      seoDescription: seoDescription || excerpt.substring(0, 155),
      commentsCount: editingArticle ? editingArticle.commentsCount : 0
    };

    if (editingArticle) {
      onEditArticle(newArtData);
    } else {
      onAddArticle(newArtData);
    }

    setEditingArticle(null);
    setIsCreatingNew(false);
  };

  const insertTextAtCursor = (textBefore: string, textAfter: string) => {
    const textarea = document.getElementById('content-text-edit') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selection = textarea.value.substring(start, end);
    const replacement = textBefore + selection + textAfter;

    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + textBefore.length, start + textBefore.length + selection.length);
    }, 50);
  };

  return (
    <div className="space-y-6 text-white bg-neutral-950 p-6 rounded-lg border border-neutral-800 animate-fade-in relative">
      {/* Title block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <h2 className="text-xl font-sans font-bold flex items-center gap-2">
            <Layout className="w-5 h-5 text-amber-500" />
            <span>Gerenciador de Artigos</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-1">Publique, edite e organize o acervo de nostalgia da rede de forma imediata.</p>
        </div>

        {!editingArticle && !isCreatingNew && (
          <div className="flex gap-2">
            <button
              onClick={onOpenAIGenerator}
              className="bg-neutral-900 hover:bg-neutral-800 border border-amber-500/20 hover:border-amber-500/40 text-amber-400 text-xs font-bold py-2.5 px-4 rounded flex items-center gap-2 transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Gerar Nova Matéria com IA</span>
            </button>
            <button
              onClick={() => initForm()}
              className="bg-amber-500 hover:bg-amber-600 text-[#010f25] text-xs font-bold py-2.5 px-4 rounded flex items-center gap-1.5 transition cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3px]" />
              <span>Criar Artigo</span>
            </button>
          </div>
        )}
      </div>

      {/* Editor Panel form view */}
      {(editingArticle || isCreatingNew) ? (
        <form onSubmit={handleSave} className="space-y-6 bg-neutral-900 rounded-lg p-5 border border-neutral-800 animate-scale-up">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4">
            <h3 className="text-sm font-sans font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span>{editingArticle ? `Editando: ${editingArticle.title.substring(0, 30)}...` : 'Novo Artigo'}</span>
            </h3>
            <button
              type="button"
              onClick={() => {
                setEditingArticle(null);
                setIsCreatingNew(false);
              }}
              className="p-1 px-3 text-xs bg-neutral-950 border border-neutral-800 text-neutral-400 rounded hover:text-white transition"
            >
              <X className="w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Main Fields Layout: Title, Content, Metadata */}
            <div className="lg:col-span-8 space-y-4">
              <div>
                <label className="text-xs text-neutral-300 block mb-1">Título do Artigo</label>
                <input
                  type="text"
                  required
                  placeholder="Título atraente otimizado para o Google Discover..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-amber-500 font-bold"
                />
              </div>

              <div>
                <label className="text-xs text-neutral-300 block mb-1">Resumo Otimizado (Excerpt / Linha-Fina)</label>
                <textarea
                  required
                  placeholder="Uma breve introdução para atrair o clique na página inicial..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={2}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-2.5 text-xs text-neutral-300 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Gutenberg / WordPress Styled Visual Helper Toolbar */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-neutral-350">Corpo do Artigo (Formatador Visual de Escrita)</label>
                </div>
                <div className="bg-neutral-950 border border-neutral-700 rounded-lg overflow-hidden flex flex-col">
                  {/* Visual toolbar button acts */}
                  <div className="bg-neutral-900 border-b border-neutral-800 p-1.5 flex flex-wrap gap-1">
                    <button
                      type="button"
                      onClick={() => insertTextAtCursor('**', '**')}
                      className="px-2 py-1 text-xs hover:bg-neutral-800 rounded font-bold hover:text-amber-400 font-sans cursor-pointer"
                      title="Negrito"
                    >
                      B
                    </button>
                    <button
                      type="button"
                      onClick={() => insertTextAtCursor('*', '*')}
                      className="px-2 py-1 text-xs hover:bg-neutral-800 rounded italic hover:text-amber-400 font-sans cursor-pointer"
                      title="Itálico"
                    >
                      I
                    </button>
                    <button
                      type="button"
                      onClick={() => insertTextAtCursor('### ', '')}
                      className="px-2 py-1 text-xs hover:bg-neutral-800 rounded hover:text-amber-400 font-sans cursor-pointer"
                      title="Título de Seção"
                    >
                      H3
                    </button>
                    <span className="text-neutral-700 px-1">|</span>
                    <button
                      type="button"
                      onClick={() => insertTextAtCursor('\n> ', '\n')}
                      className="px-2 py-1 text-xs hover:bg-neutral-800 rounded hover:text-amber-400 font-serif cursor-pointer"
                      title="Citação de Bastidor"
                    >
                      "Citação"
                    </button>
                    <button
                      type="button"
                      onClick={() => insertTextAtCursor('[Texto do Link](', ' )')}
                      className="px-2 py-1 text-xs hover:bg-neutral-800 rounded hover:text-amber-400 font-mono cursor-pointer"
                      title="Inserir Link de Matéria"
                    >
                      [Link Interno]
                    </button>
                    <button
                      type="button"
                      onClick={() => insertTextAtCursor('\n\n*Espaço pronto para Bloco AdSense*\n\n', '')}
                      className="px-2 py-1 text-[10px] bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 h-fit rounded cursor-pointer font-bold border border-amber-500/20"
                      title="Inserir Bloco AdSense no Artigo"
                    >
                      Inserir Código Anúncio
                    </button>
                  </div>
                  <textarea
                    id="content-text-edit"
                    required
                    rows={12}
                    placeholder="Redija o artigo utilizando a barra de atalhos acima ou digite livremente..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full bg-transparent p-3 text-xs text-neutral-200 focus:outline-none min-h-[300px] leading-relaxed resize-y font-sans"
                  />
                </div>
              </div>

              {/* YouTube and extra media embeds */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Vídeo do YouTube (Opcional)</label>
                  <input
                    type="url"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded p-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs text-neutral-400 block mb-1">Galeria de Imagens Adicionais (URLs separadas por vírgula)</label>
                  <input
                    type="text"
                    placeholder="https://imagem1.jpg, https://imagem2.jpg..."
                    value={galleryInput}
                    onChange={(e) => setGalleryInput(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded p-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* SEO specific panel box */}
              <div className="bg-neutral-950 p-4 rounded border border-[#041935] space-y-3.5">
                <h4 className="text-xs font-sans font-extrabold uppercase text-amber-400 tracking-wider flex items-center gap-1">
                  <Sliders className="w-3.5 text-amber-500" />
                  <span>Meta de Indexação Extrema (SEO & Google Discover)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">Título Amigável para o Google (Título SEO)</label>
                    <input
                      type="text"
                      placeholder="Ex: Segredos do Silvio Santos Revelados | Memórias da TV"
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-xs focus:outline-none focus:border-amber-550 mr-4"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-neutral-400 block mb-1">Meta Descrição (Máx. 155 Caracteres)</label>
                    <input
                      type="text"
                      placeholder="Resumo otimizado na busca..."
                      maxLength={155}
                      value={seoDescription}
                      onChange={(e) => setSeoDescription(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-xs focus:outline-none focus:border-amber-550"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Meta Options Panel: Categories, Authors, Draft toggles, Highlights, Scheduling */}
            <div className="lg:col-span-4 bg-neutral-950 p-4 border border-neutral-800 rounded-lg space-y-4 text-xs h-fit">
              <h4 className="text-xs font-sans font-bold uppercase text-neutral-400 tracking-wider">Ajustes de Publicação</h4>

              <div>
                <label className="text-neutral-450 block mb-1">Categoria Principal</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-xs text-white uppercase font-sans font-semibold focus:outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name} className="bg-neutral-900">{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-neutral-450 block mb-1">Autor / Pesquisador Assinante</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                  className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-xs text-white font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-neutral-455 block mb-1">Leitura Est.</label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    required
                    className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-neutral-455 block mb-1">Imagem Destacada (URL)</label>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                    className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-xs text-white"
                  />
                </div>
              </div>

              {/* Draft toggle Switch inline */}
              <div className="bg-neutral-900/60 p-3 rounded border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-neutral-300">Marcar como Rascunho</span>
                  <input
                    type="checkbox"
                    checked={isDraft}
                    onChange={(e) => setIsDraft(e.target.checked)}
                    className="w-4 h-4 text-amber-500 border-neutral-750 bg-neutral-900"
                  />
                </div>
                <p className="text-[10px] text-neutral-500 leading-snug">Rascunhos não aparecem na listagem pública da Home até serem desmarcados.</p>
              </div>

              {/* Homepage Highlight Feature Toggle */}
              <div className="bg-neutral-900/60 p-3 rounded border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-neutral-300">Destaque Principal na Home</span>
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 text-amber-500 border-neutral-750 bg-neutral-900"
                  />
                </div>
                <p className="text-[10px] text-neutral-500 leading-snug">A matéria ganhará o banner massivo superior em toda a homepage do portal.</p>
              </div>

              {/* Post Scheduler date input picker */}
              <div className="bg-neutral-900/60 p-3 rounded border border-neutral-800 space-y-2">
                <label className="font-semibold text-neutral-300 block">Agendar Publicação Futura ({scheduledDate ? 'Ativo' : 'Inativo'})</label>
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="bg-neutral-950 border border-neutral-700 rounded p-1.5 text-[10px] text-white focus:outline-none w-full font-mono"
                  />
                  {scheduledDate && (
                    <button
                      type="button"
                      onClick={() => setScheduledDate('')}
                      className="text-[10px] text-red-400 hover:underline"
                    >
                      Limpar
                    </button>
                  )}
                </div>
                <p className="text-[10px] text-neutral-500 leading-snug">Selecione uma data para publicação automática do post.</p>
              </div>

              {/* Save actions panel */}
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-[#010f25] py-2.5 rounded-lg text-xs font-bold font-sans flex items-center justify-center gap-2 cursor-pointer transition"
              >
                <Save className="w-4 h-4" />
                <span>Salvar & Publicar</span>
              </button>
            </div>
          </div>
        </form>
      ) : (
        /* Render Article List dashboard views */
        <div className="space-y-4">
          <div className="flex border border-neutral-800 rounded bg-neutral-950/45 p-2 overflow-x-auto text-xs text-neutral-400 gap-1.5">
            <span className="p-2 font-bold font-mono text-amber-500 bg-amber-400/5 rounded border border-amber-500/10">Bases: {articles.length} Artigos Cadastrados</span>
            <span className="p-2 font-mono">Destaques: {articles.filter(a => a.isFeatured).length}</span>
            <span className="p-2 font-mono">Rascunhos: {articles.filter(a => a.isDraft).length}</span>
            <span className="p-2 font-mono">Agendados: {articles.filter(a => a.scheduledDate).length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-800 text-neutral-400">
                  <th className="py-2.5 px-2">Título</th>
                  <th className="py-2.5">Categoria</th>
                  <th className="py-2.5">Autor</th>
                  <th className="py-2.5">Status</th>
                  <th className="py-2.5">Acessos</th>
                  <th className="py-2.5 text-right px-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((art) => (
                  <tr key={art.id} className="border-b border-neutral-900 hover:bg-neutral-900/30">
                    <td className="py-3 px-2 font-bold text-white max-w-sm truncate">{art.title}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-neutral-900 text-amber-400 border border-neutral-800 font-mono font-bold uppercase">{art.category}</span>
                    </td>
                    <td className="py-3 text-neutral-300 font-mono text-[11px]">{art.author}</td>
                    <td className="py-3">
                      {art.isFeatured && (
                        <span className="bg-amber-400 text-neutral-950 font-sans px-2 py-0.5 rounded text-[9px] font-extrabold uppercase mr-1.5">Destaque</span>
                      )}
                      {art.isDraft ? (
                        <span className="bg-neutral-800 text-neutral-400 border border-neutral-700 px-2 py-0.5 rounded text-[9px] font-bold font-sans">Rascunho</span>
                      ) : art.scheduledDate ? (
                        <span className="bg-[#010f25] text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-[9px] font-bold font-mono">Agendado ({art.scheduledDate})</span>
                      ) : (
                        <span className="bg-green-500/10 text-green-400 border border-green-500/10 px-2 py-0.5 rounded text-[9px] font-bold font-sans">No Ar</span>
                      )}
                    </td>
                    <td className="py-3 font-mono text-neutral-400 font-medium">{art.views.toLocaleString()}</td>
                    <td className="py-3 text-right px-2">
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => initForm(art)}
                          className="p-1 px-2.5 bg-neutral-900 text-neutral-300 hover:text-amber-400 border border-neutral-800 rounded text-[10px] flex items-center gap-1 transition"
                        >
                          <Edit2 className="w-3" />
                          <span>Editar</span>
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Tem certeza que deseja excluir o artigo: ${art.title}?`)) {
                              onDeleteArticle(art.id);
                            }
                          }}
                          className="p-1 px-2.5 bg-neutral-900/60 text-neutral-500 hover:text-red-500 hover:bg-red-500/10 border border-neutral-800 rounded text-[10px] flex items-center gap-1 transition"
                        >
                          <Trash2 className="w-3" />
                          <span>Excluir</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
