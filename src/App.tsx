/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Tv, Eye, Clock, MessageSquare, ChevronRight, Share2, 
  Send, Compass, Heart, ShieldEllipsis, AlertCircle, ArrowLeft, Mail, FileText, CheckCircle2 
} from 'lucide-react';

import PortalHeader from './components/PortalHeader';
import PortalFooter from './components/PortalFooter';
import ArticleCard from './components/ArticleCard';
import AdSensePlaceholder from './components/AdSensePlaceholder';
import NewsletterBox from './components/NewsletterBox';
import AdminDashboard from './components/AdminDashboard';

import { Article, Comment, NewsletterSubscriber, CategorySpec, PortalEvent } from './types';
import { INITIAL_ARTICLES, CATEGORIES, MOCK_REVIEWS } from './data/seedData';

export default function App() {
  // --- Persistent Local Database State ---
  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('mtv_articles');
    return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
  });

  const [comments, setComments] = useState<Comment[]>(() => {
    const saved = localStorage.getItem('mtv_comments');
    return saved ? JSON.parse(saved) : MOCK_REVIEWS;
  });

  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>(() => {
    const saved = localStorage.getItem('mtv_subscribers');
    return saved ? JSON.parse(saved) : [];
  });

  const [spamKeywords, setSpamKeywords] = useState<string[]>(() => {
    const saved = localStorage.getItem('mtv_spam_keywords');
    return saved ? JSON.parse(saved) : ['gratis', 'poker', 'casino', 'win-free', 'buy-cheap', 'click-here', 'promocional'];
  });

  const [events, setEvents] = useState<PortalEvent[]>(() => {
    const saved = localStorage.getItem('mtv_events');
    return saved ? JSON.parse(saved) : [];
  });

  // --- UI/Routing State ---
  const [currentView, setCurrentView] = useState<'home' | 'category' | 'article' | 'contato' | 'admin'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSimulatedAds, setShowSimulatedAds] = useState(false);
  const [adminMode, setAdminMode] = useState(false);

  // --- Article Comments Submission form ---
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [commentSuccessMsg, setCommentSuccessMsg] = useState<string | null>(null);

  // --- Contact Form ---
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('Geral');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  // --- Side Effects Sync ---
  useEffect(() => {
    localStorage.setItem('mtv_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('mtv_comments', JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem('mtv_subscribers', JSON.stringify(subscribers));
  }, [subscribers]);

  useEffect(() => {
    localStorage.setItem('mtv_spam_keywords', JSON.stringify(spamKeywords));
  }, [spamKeywords]);

  useEffect(() => {
    localStorage.setItem('mtv_events', JSON.stringify(events));
  }, [events]);

  // Sync site name "Memórias da TV" and current view details into the browser tab title
  useEffect(() => {
    if (adminMode && currentView === 'admin') {
      document.title = 'Painel de Controle | Memórias da TV';
    } else if (currentView === 'home') {
      document.title = 'Memórias da TV - O Portal da Nostalgia da Televisão Brasileira';
    } else if (currentView === 'category' && selectedCategory) {
      document.title = `${selectedCategory} | Memórias da TV`;
    } else if (currentView === 'article' && activeArticle) {
      document.title = `${activeArticle.title} | Memórias da TV`;
    } else if (currentView === 'contato') {
      document.title = 'Fale Conosco | Memórias da TV';
    } else {
      document.title = 'Memórias da TV - O Portal da Nostalgia da Televisão Brasileira';
    }
  }, [currentView, selectedCategory, activeArticle, adminMode]);

  // --- Telemetry Event Tracker ---
  const trackEvent = (type: PortalEvent['type'], payload: Partial<PortalEvent>) => {
    let visitorId = sessionStorage.getItem('mtv_visitor_id');
    if (!visitorId) {
      visitorId = 'visitor_' + Math.random().toString(36).substring(2, 11);
      sessionStorage.setItem('mtv_visitor_id', visitorId);
    }

    let source = payload.source || 'Direto';
    if (typeof window !== 'undefined' && source === 'Direto') {
      const ref = document.referrer;
      if (ref) {
        if (ref.includes('google.com')) {
          source = 'Google';
        } else if (ref.includes('facebook.com')) {
          source = 'Facebook';
        } else if (ref.includes('instagram.com')) {
          source = 'Instagram';
        } else if (ref.includes('whatsapp.com')) {
          source = 'WhatsApp';
        } else if (ref.includes('t.co') || ref.includes('twitter.com') || ref.includes('x.com')) {
          source = 'X / Twitter';
        } else {
          source = 'Outros sites / Fóruns de Tv';
        }
      }
    }

    const newEvent: PortalEvent = {
      id: 'event_' + Math.random().toString(36).substring(2, 11),
      type,
      visitorId,
      timestamp: payload.timestamp || new Date().toISOString(),
      source,
      articleId: payload.articleId,
      articleTitle: payload.articleTitle,
      durationSeconds: payload.durationSeconds,
    };

    setEvents((prev) => {
      const updated = [...prev, newEvent];
      if (updated.length > 1000) {
        return updated.slice(updated.length - 1000);
      }
      return updated;
    });

    if (type === 'page_view') {
      const alreadyCheckedKey = `mtv_uv_${visitorId}_${new Date().toISOString().substring(0, 10)}`;
      if (!localStorage.getItem(alreadyCheckedKey)) {
        localStorage.setItem(alreadyCheckedKey, '1');
        const uvEvent: PortalEvent = {
          id: 'event_' + Math.random().toString(36).substring(2, 11),
          type: 'unique_visitor',
          visitorId,
          timestamp: payload.timestamp || new Date().toISOString(),
          source,
          articleId: payload.articleId,
          articleTitle: payload.articleTitle,
        };
        setEvents((prev) => {
          const updated = [...prev, uvEvent];
          if (updated.length > 1000) {
            return updated.slice(updated.length - 1000);
          }
          return updated;
        });
      }
    }
  };

  const simulateInteractiveTraffic = () => {
    const sources = ['Google', 'WhatsApp', 'Facebook', 'Instagram', 'Direto'];
    const numEvents = 35;
    const itemsToInsert: PortalEvent[] = [];
    
    for (let i = 0; i < numEvents; i++) {
      const randSource = sources[Math.floor(Math.random() * sources.length)];
      const randArt = articles[Math.floor(Math.random() * articles.length)];
      const randomDaysAgo = Math.floor(Math.random() * 7);
      const randomHoursAgo = Math.floor(Math.random() * 24);
      const eventTime = new Date();
      eventTime.setDate(eventTime.getDate() - randomDaysAgo);
      eventTime.setHours(eventTime.getHours() - randomHoursAgo);
      
      const visId = 'vsim_' + Math.random().toString(36).substring(2, 11);
      
      itemsToInsert.push({
        id: 'event_sim_' + Math.random().toString(36).substring(2, 11),
        type: 'page_view',
        visitorId: visId,
        timestamp: eventTime.toISOString(),
        source: randSource,
        articleId: randArt?.id,
        articleTitle: randArt?.title
      });

      itemsToInsert.push({
        id: 'event_sim_u_' + Math.random().toString(36).substring(2, 11),
        type: 'unique_visitor',
        visitorId: visId,
        timestamp: eventTime.toISOString(),
        source: randSource,
        articleId: randArt?.id,
        articleTitle: randArt?.title
      });

      if (Math.random() > 0.4) {
        itemsToInsert.push({
          id: 'event_sim_c_' + Math.random().toString(36).substring(2, 11),
          type: 'click_article',
          visitorId: visId,
          timestamp: eventTime.toISOString(),
          source: randSource,
          articleId: randArt?.id,
          articleTitle: randArt?.title
        });
      }

      if (Math.random() > 0.3) {
        itemsToInsert.push({
          id: 'event_sim_d_' + Math.random().toString(36).substring(2, 11),
          type: 'dwell_time',
          visitorId: visId,
          timestamp: eventTime.toISOString(),
          source: randSource,
          articleId: randArt?.id,
          articleTitle: randArt?.title,
          durationSeconds: Math.floor(Math.random() * 200) + 12
        });
      }
    }

    setEvents((prev) => {
      const updated = [...prev, ...itemsToInsert];
      if (updated.length > 1000) {
        return updated.slice(updated.length - 1000);
      }
      return updated;
    });
  };

  useEffect(() => {
    // Record initial load page view event on mount to guarantee at least 1 real event is registered organically
    trackEvent('page_view', {});
  }, []);

  // --- Navigation Coordinator ---
  const handleNavigate = (view: string, payload?: any) => {
    setSearchQuery('');
    if (view === 'home') {
      setCurrentView('home');
      setSelectedCategory(null);
      setActiveArticle(null);
      setAdminMode(false);
      trackEvent('page_view', {});
    } else if (view === 'category' && typeof payload === 'string') {
      setCurrentView('category');
      setSelectedCategory(payload);
      setActiveArticle(null);
      setAdminMode(false);
      trackEvent('page_view', {});
    } else if (view === 'article' && payload && typeof payload === 'object') {
      setCurrentView('article');
      setActiveArticle(payload as Article);
      setAdminMode(false);

      // Increment views count realistically on click
      setArticles((prev) => 
        prev.map((a) => (a.id === (payload as Article).id ? { ...a, views: a.views + 1 } : a))
      );
      trackEvent('page_view', {
        articleId: (payload as Article).id,
        articleTitle: (payload as Article).title
      });
    } else if (view === 'contato') {
      setCurrentView('contato');
      setActiveArticle(null);
      setAdminMode(false);
      trackEvent('page_view', {});
    } else if (view === 'admin') {
      setCurrentView('admin');
      setAdminMode(true);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleToggleAdmin = () => {
    if (adminMode) {
      handleNavigate('home');
    } else {
      handleNavigate('admin');
    }
  };

  // --- Database modifications ---
  const handleAddArticle = (newArt: Article) => {
    setArticles((prev) => [newArt, ...prev]);
  };

  const handleEditArticle = (updatedArt: Article) => {
    setArticles((prev) => prev.map((a) => (a.id === updatedArt.id ? updatedArt : a)));
  };

  const handleDeleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  const handleApproveComment = (id: string) => {
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, isApproved: true } : c)));
  };

  const handleRejectComment = (id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
  };

  const handleAddSpamKeyword = (keyword: string) => {
    if (!spamKeywords.includes(keyword)) {
      setSpamKeywords((prev) => [...prev, keyword]);
    }
  };

  const handleSubscribe = (newSub: NewsletterSubscriber) => {
    setSubscribers((prev) => [newSub, ...prev]);
  };

  // --- Article Reader Comment Submission ---
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeArticle || !commentName || !commentContent) return;

    // Run custom anti-spam scan immediately
    const textToScan = `${commentContent} ${commentName} ${commentEmail}`.toLowerCase();
    const containsSpam = spamKeywords.some((word) => textToScan.includes(word));

    // If it contains spam keywords, auto-quarantine (disapprove)
    const isApprovedByDefault = !containsSpam;

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      articleId: activeArticle.id,
      articleTitle: activeArticle.title,
      userName: commentName,
      email: commentEmail || 'anonimo@memoriasdatv.com.br',
      content: commentContent,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      isApproved: isApprovedByDefault
    };

    setComments((prev) => [newComment, ...prev]);

    // Track commentary count in active article
    setArticles((prev) => 
      prev.map((a) => (a.id === activeArticle.id ? { ...a, commentsCount: a.commentsCount + 1 } : a))
    );

    if (isApprovedByDefault) {
      setCommentSuccessMsg('Seu comentário foi publicado com sucesso!');
    } else {
      setCommentSuccessMsg('Comentário enviado para fila de moderação técnica (Filtro Anti-Spam ativado).');
    }

    setCommentName('');
    setCommentEmail('');
    setCommentContent('');

    setTimeout(() => {
      setCommentSuccessMsg(null);
    }, 4500);
  };

  // --- Contact form Submit simulation ---
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactMessage) return;
    setContactSuccess(true);
    setContactName('');
    setContactEmail('');
    setContactMessage('');
    setTimeout(() => {
      setContactSuccess(false);
    }, 4500);
  };

  // --- Simple High-Fidelity Custom Markdown Parser ---
  const renderCleanContent = (text: string) => {
    if (!text) return null;
    return text.split('\n\n').map((block, index) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // H3 Section Heading
      if (trimmed.startsWith('###')) {
        return (
          <h3 key={index} className="text-lg font-heading font-extrabold text-white tracking-tight mt-6 mb-2.5 flex items-center gap-2">
            <span className="w-1.5 h-4 bg-amber-500 rounded-sm"></span>
            <span>{trimmed.replace('###', '').trim()}</span>
          </h3>
        );
      }

      // Blockquotes
      if (trimmed.startsWith('>')) {
        return (
          <blockquote key={index} className="border-l-4 border-amber-500 bg-neutral-900/60 p-4 rounded-r-lg text-xs italic text-neutral-300 my-5 font-serif shadow-sm">
            {trimmed.replace('>', '').trim()}
          </blockquote>
        );
      }

      // Check for bullet lists
      if (trimmed.startsWith('*') || trimmed.startsWith('-')) {
        const items = trimmed.split('\n').map(li => li.replace(/^[\*\-]\s+/, '').trim());
        return (
          <ul key={index} className="list-disc pl-5 my-3 text-xs text-neutral-300 space-y-1.5">
            {items.map((item, idx) => (
              <li key={idx}>
                {item.includes('**') ? (
                  <span>
                    <strong>{item.split('**')[1]}</strong>{item.split('**')[2]}
                  </span>
                ) : item}
              </li>
            ))}
          </ul>
        );
      }

      // Check for bold terms inline like **foo**
      let renderedBlock: React.ReactNode = trimmed;
      if (trimmed.includes('**')) {
        const parts = trimmed.split('**');
        renderedBlock = parts.map((part, i) => i % 2 !== 0 ? <strong className="text-amber-300 font-bold" key={i}>{part}</strong> : part);
      }

      // Paragraph
      return (
        <p key={index} className="text-xs sm:text-xs text-neutral-300 leading-relaxed tracking-wider mb-4 font-sans text-justify">
          {renderedBlock}
        </p>
      );
    });
  };

  // --- Filtering Articles ---
  // Rascunho filtering: Admins see drafts, normal users don't!
  const isSearchActive = searchQuery.trim().length > 0;
  
  const publicArticles = articles.filter((art) => {
    if (art.isDraft && !adminMode) return false;
    
    // Category check
    if (selectedCategory && art.category !== selectedCategory) return false;
    
    // Keywords check
    if (isSearchActive) {
      const q = searchQuery.toLowerCase();
      const matchTitle = art.title.toLowerCase().includes(q);
      const matchExcerpt = art.excerpt.toLowerCase().includes(q);
      const matchTags = art.tags.some(t => t.toLowerCase().includes(q));
      const matchAuthor = art.author.toLowerCase().includes(q);
      return matchTitle || matchExcerpt || matchTags || matchAuthor;
    }

    return true;
  });

  // Featured Hero article
  const featuredArticle = publicArticles.find(a => a.isFeatured) || publicArticles[0];
  const gridArticles = featuredArticle 
    ? publicArticles.filter(a => a.id !== featuredArticle.id)
    : publicArticles;

  return (
    <div className="bg-[#010915] min-h-screen text-neutral-200 font-sans selection:bg-amber-400 selection:text-neutral-950 flex flex-col justify-between">
      {/* Header bar */}
      <PortalHeader
        currentView={selectedCategory || currentView}
        onNavigate={handleNavigate}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categories={CATEGORIES}
        adminMode={adminMode}
        onToggleAdmin={handleToggleAdmin}
      />

      {/* Main Container screen panel */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        {/* Router View: Admin Dashboard */}
        {adminMode && currentView === 'admin' ? (
          <AdminDashboard
            articles={articles}
            categories={CATEGORIES}
            comments={comments}
            subscribers={subscribers}
            events={events}
            onAddArticle={handleAddArticle}
            onEditArticle={handleEditArticle}
            onDeleteArticle={handleDeleteArticle}
            onApproveComment={handleApproveComment}
            onRejectComment={handleRejectComment}
            onAddSpamKeyword={handleAddSpamKeyword}
            spamKeywords={spamKeywords}
            showSimulatedAds={showSimulatedAds}
            onToggleAds={() => setShowSimulatedAds(!showSimulatedAds)}
            onExit={() => handleNavigate('home')}
            onSimulateTraffic={simulateInteractiveTraffic}
          />
        ) : currentView === 'article' && activeArticle ? (
          /* --- Detailed Article View --- */
          <div className="space-y-6 animate-fade-in">
            {/* Breadcrumb banner */}
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-neutral-400 font-mono">
              <button onClick={() => handleNavigate('home')} className="hover:text-amber-400 transition">HOME</button>
              <ChevronRight className="w-3" />
              <button onClick={() => handleNavigate('category', activeArticle.category)} className="hover:text-amber-400 font-bold uppercase transition">{activeArticle.category}</button>
              <ChevronRight className="w-3" />
              <span className="text-neutral-500 truncate max-w-xs">{activeArticle.title}</span>
            </div>

            {/* Layout grids: Main Content Left, Sidebar Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main article Content Card */}
              <article className="lg:col-span-8 bg-[#010f25]/40 border border-neutral-800 rounded-xl p-6 sm:p-8 space-y-6 h-fit relative">
                {/* Category tags */}
                <div className="flex items-center justify-between">
                  <span className="bg-amber-400/10 text-amber-300 border border-amber-500/20 font-sans font-bold text-xs uppercase px-3 py-1 rounded tracking-wider">
                    {activeArticle.category}
                  </span>
                  <div className="flex gap-2 text-[11px] text-neutral-400 font-mono">
                    <span className="flex items-center gap-1 font-bold text-amber-400">
                      <Eye className="w-3.5" />
                      <span>{activeArticle.views} acessos</span>
                    </span>
                  </div>
                </div>

                {/* Main Heading title */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black text-white leading-tight tracking-tight">
                  {activeArticle.title}
                </h1>

                {/* Author description row */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 font-mono border-y border-neutral-800/80 py-4">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                      {activeArticle.author.charAt(0)}
                    </span>
                    <span className="text-neutral-200 font-bold">Por: {activeArticle.author}</span>
                  </div>
                  <span>•</span>
                  <span>Publicado em: {activeArticle.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5" />
                    <span>Leitura: {activeArticle.readTime}</span>
                  </span>
                </div>

                {/* AdSense Top Header space */}
                <AdSensePlaceholder slot="top" showSimulatedAds={showSimulatedAds} />

                {/* Featured core Image */}
                <div className="aspect-video rounded-xl overflow-hidden border border-neutral-800/80 shadow-md">
                  <img 
                    src={activeArticle.image} 
                    alt={activeArticle.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover" 
                  />
                </div>

                {/* Body article description */}
                <div className="prose prose-invert max-w-none prose-p:text-neutral-300 prose-headings:text-white prose-p:leading-relaxed">
                  {renderCleanContent(activeArticle.content)}
                </div>

                {/* Video Youtube Embed Frame */}
                {activeArticle.youtubeUrl && (
                  <div className="space-y-2 mt-8">
                    <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <Tv className="w-4" />
                      <span>Arquivo Audiovisual do SBT/Globo</span>
                    </h4>
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-neutral-800/80 shadow-lg">
                      <iframe
                        src={`https://www.youtube.com/embed/${activeArticle.youtubeUrl.split('v=')[1] || 'FqI9L5jA0rU'}`}
                        title="Embedded YouTube Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full border-none"
                      ></iframe>
                    </div>
                  </div>
                )}

                {/* Gallery Images block */}
                {activeArticle.gallery && activeArticle.gallery.length > 0 && (
                  <div className="space-y-2.5 mt-8 border-t border-neutral-800 pt-6">
                    <h4 className="text-xs font-sans font-bold text-neutral-400 uppercase tracking-widest">Galeria de Memórias Raras</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {activeArticle.gallery.map((imgUrl, i) => (
                        <div key={i} className="aspect-video rounded overflow-hidden border border-neutral-800 shadow">
                          <img 
                            src={imgUrl} 
                            alt="Gallery detail" 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover hover:scale-103 transitionduration-300" 
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Related tags list */}
                <div className="flex flex-wrap gap-1.5 pt-6 border-t border-neutral-800">
                  {activeArticle.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] bg-neutral-900 text-neutral-300 border border-neutral-800 px-2.5 py-0.5 rounded font-mono">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* AdSense bottom banner */}
                <AdSensePlaceholder slot="bottom" showSimulatedAds={showSimulatedAds} />

                {/* Floating/Responsive Social Sharing toolbar */}
                <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800 mt-6 space-y-3">
                  <h4 className="text-xs font-sans font-bold text-white flex items-center gap-1.5 uppercase tracking-widest">
                    <Share2 className="w-4 h-4 text-amber-500" />
                    <span>Compartilhar matéria com os amigos do retro</span>
                  </h4>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link copiado para a área de transferência! Envie para seus amigos do WhatsApp.');
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded text-[11px] text-center transition cursor-pointer"
                    >
                      WhatsApp
                    </button>
                    <button 
                      onClick={() => alert('Link copiado! Compartilhe no Telegram.')}
                      className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 rounded text-[11px] text-center transition cursor-pointer"
                    >
                      Telegram
                    </button>
                    <button 
                      onClick={() => alert('Redirecionando para compartilhar no Facebook.')}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded text-[11px] text-center transition cursor-pointer"
                    >
                      Facebook
                    </button>
                    <button 
                      onClick={() => alert('Compartilhar no X.')}
                      className="bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-750 font-bold py-2 rounded text-[11px] text-center transition cursor-pointer"
                    >
                      X
                    </button>
                    <button 
                      onClick={() => alert('Salvar no Pinterest.')}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded text-[11px] text-center transition cursor-pointer"
                    >
                      Pinterest
                    </button>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link copiado!');
                      }}
                      className="bg-neutral-800 hover:bg-neutral-750 text-white font-bold py-2 rounded text-[11px] text-center transition cursor-pointer"
                    >
                      Copiar Link
                    </button>
                  </div>
                </div>

                {/* --- Reader Comments Section --- */}
                <div className="space-y-6 pt-10 border-t border-neutral-800">
                  <h3 className="text-lg font-sans font-bold text-white flex items-center gap-2">
                    <MessageSquare className="w-5 text-amber-500" />
                    <span>Discussões e Lembranças dos Leitores</span>
                  </h3>

                  {/* Comments lists */}
                  <div className="space-y-4">
                    {comments.filter((c) => c.articleId === activeArticle.id && c.isApproved).length === 0 ? (
                      <p className="text-xs text-neutral-550 italic">Nenhum comentário aprovado. Seja o primeiro a registrar sua saudade!</p>
                    ) : (
                      comments
                        .filter((c) => c.articleId === activeArticle.id && c.isApproved)
                        .map((com) => (
                          <div key={com.id} className="p-4 bg-neutral-950 rounded-lg border border-neutral-850 space-y-1.5 text-xs">
                            <div className="flex justify-between items-center text-[10px] text-neutral-400 font-mono">
                              <span className="font-bold text-white text-xs">{com.userName}</span>
                              <span>{com.date}</span>
                            </div>
                            <p className="text-neutral-300 leading-relaxed font-sans mt-1">"{com.content}"</p>
                          </div>
                        ))
                    )}
                  </div>

                  {/* Submission form with Anti Spam warning label */}
                  <form onSubmit={handleCommentSubmit} className="bg-neutral-900/40 p-5 rounded-lg border border-neutral-800 space-y-4">
                    <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-amber-400">Escrever Comentário</h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="text-neutral-400 block mb-1">Seu Nome / Apelido</label>
                        <input
                          type="text"
                          required
                          value={commentName}
                          onChange={(e) => setCommentName(e.target.value)}
                          placeholder="Ex: Carlos Mendes"
                          className="w-full bg-neutral-950 border border-neutral-700 rounded p-2 text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="text-neutral-400 block mb-1">E-mail (Opcional - não exibido)</label>
                        <input
                          type="email"
                          value={commentEmail}
                          onChange={(e) => setCommentEmail(e.target.value)}
                          placeholder="Ex: carlos@email.com"
                          className="w-full bg-neutral-950 border border-neutral-700 rounded p-2 text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div className="text-xs">
                      <label className="text-neutral-400 block mb-1">Mensagem de Lembrança</label>
                      <textarea
                        required
                        rows={3}
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        placeholder="Quais são as suas lembranças sobre esse assunto da TV brasileira?..."
                        className="w-full bg-neutral-950 border border-neutral-700 rounded p-2 text-white focus:outline-none focus:border-amber-500 text-xs"
                      />
                    </div>

                    {commentSuccessMsg && (
                      <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded text-[11px] text-amber-300 text-center font-bold">
                        {commentSuccessMsg}
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[10px] text-neutral-500 leading-tight">
                        🔒 Proteção SpamShield ativa. E-mails e palavras com links publicitários serão auto-moderados.
                      </span>
                      <button
                        type="submit"
                        className="bg-amber-500 hover:bg-amber-600 text-neutral-950 font-sans font-bold px-4 py-2 rounded text-xs transition cursor-pointer"
                      >
                        Enviar Comentário
                      </button>
                    </div>
                  </form>
                </div>
              </article>

              {/* Sidebar Content Right */}
              <aside className="lg:col-span-4 space-y-6">
                {/* AdSense Sidebar widget */}
                <AdSensePlaceholder slot="sidebar" height="h-[300px]" showSimulatedAds={showSimulatedAds} />

                {/* Newsletter widget */}
                <NewsletterBox source="sidebar" onSubscribe={handleSubscribe} variant="sidebar" />

                {/* Related Articles list */}
                <div className="bg-neutral-900/40 p-5 rounded-xl border border-neutral-800 space-y-3.5">
                  <h4 className="text-sm font-sans font-bold uppercase tracking-wider text-white border-b border-neutral-800 pb-2 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-amber-500" />
                    <span>Veja também</span>
                  </h4>
                  <div className="space-y-3">
                    {articles
                      .filter((a) => a.id !== activeArticle.id && a.category === activeArticle.category)
                      .slice(0, 3)
                      .map((art) => (
                        <div 
                          key={art.id} 
                          onClick={() => handleNavigate('article', art)}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <img 
                            src={art.image} 
                            alt={art.title} 
                            referrerPolicy="no-referrer"
                            className="w-14 h-11 rounded object-cover shrink-0 border border-neutral-800" 
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="text-xs font-bold text-white group-hover:text-amber-400 transition truncate line-clamp-1">{art.title}</h5>
                            <span className="text-[9px] text-neutral-500 font-mono flex items-center gap-1 mt-0.5"><Eye className="w-2.5" /> {art.views} lidas</span>
                          </div>
                        </div>
                      ))}
                    {articles.filter((a) => a.id !== activeArticle.id && a.category === activeArticle.category).length === 0 && (
                      <p className="text-[10px] text-neutral-550 italic">Busca concluída. Sem mais artigos nesta linha do tempo.</p>
                    )}
                  </div>
                </div>

                {/* Floating TV Trivia Card */}
                <div className="bg-gradient-to-br from-[#010f25] to-neutral-950 border border-[#041935] p-5 rounded-lg space-y-2">
                  <span className="text-[10px] font-mono tracking-widest text-[#9ab0d7] uppercase font-bold">Curiosidade Secreta do SBT</span>
                  <p className="text-xs text-white font-bold leading-snug">O famoso auditório feminino!</p>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    Silvio Santos batizou suas caravanas de "colegas de auditório" e não de público comum. Ele argumentava que as mulheres transmitiam uma simpatia única e espontânea que contagiavam quem assistia de casa.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        ) : currentView === 'contato' ? (
          /* --- Conctat Page --- */
          <div className="max-w-2xl mx-auto bg-neutral-900 border border-neutral-800 rounded-xl p-6 sm:p-8 space-y-6 text-white animate-scale-up">
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-3 border border-amber-500/20">
                <Mail className="w-6 h-6 text-amber-500" />
              </div>
              <h2 className="text-xl font-sans font-black uppercase text-white">Central de Contato do Portal</h2>
              <p className="text-xs text-neutral-305 mt-1">Envie-nos sugestões de pautas de TV, parcerias editoriais ou dúvidas de aprovação de AdSense.</p>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-neutral-400 block mb-1">Nome Completo</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded p-2.5 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">E-mail de Retorno</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-700 rounded p-2.5 focus:outline-none"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="text-neutral-400 block mb-1">Assunto do Contato</label>
                <select
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded p-2.5 focus:outline-none"
                >
                  <option value="Geral">Assunto Geral / Sugestão de Fatos</option>
                  <option value="Anuncio">Anúncios / Google AdSense</option>
                  <option value="Parceria">Parceria Editorial / Divulgação de Vídeos</option>
                  <option value="Suporte">Denunciar Spam ou Plágio</option>
                </select>
              </div>

              <div className="text-xs">
                <label className="text-neutral-400 block mb-1">Sua Mensagem</label>
                <textarea
                  required
                  rows={4}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-700 rounded p-2.5 focus:outline-none"
                />
              </div>

              {contactSuccess && (
                <div className="p-3.5 bg-amber-500/10 border border-amber-400/20 rounded text-xs text-amber-300 font-bold text-center">
                  Sua mensagem foi enviada com sucesso! Responderemos em até 24h úteis.
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold py-3 rounded text-xs transition uppercase tracking-wide cursor-pointer"
              >
                Enviar Mensagem Securitária
              </button>
            </form>
          </div>
        ) : (
          /* --- Global Home View / Category Search Results --- */
          <div className="space-y-8 animate-fade-in">
            
            {/* Title category bar */}
            {selectedCategory && (
              <div className="bg-[#010f25] border border-amber-500/10 p-5 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-amber-401 uppercase font-bold block">FILTRO DE CATEGORIA</span>
                  <h2 className="text-xl font-sans font-black text-white">{selectedCategory}</h2>
                  <p className="text-xs text-neutral-400 mt-1">Todos os registros catalogados sobre {selectedCategory} na nossa linha do tempo.</p>
                </div>
                <button
                  onClick={() => handleNavigate('home')}
                  className="text-xs bg-neutral-955 border border-neutral-800 text-amber-400 px-3 py-1.5 rounded"
                >
                  Ver Tudo
                </button>
              </div>
            )}

            {/* Title search result bar */}
            {isSearchActive && (
              <div className="bg-[#010f25] border border-neutral-800 p-5 rounded-xl">
                <span className="text-[10px] font-mono tracking-widest text-[#9ab0d7] uppercase block font-bold">FILTRO DE BUSCA GLOBAL</span>
                <p className="text-xs text-neutral-400 mt-1">Resultados rápidos correspondentes para: <strong className="text-white">"{searchQuery}"</strong> ({publicArticles.length} encontrados)</p>
              </div>
            )}

            {/* AdSense Top Home spot */}
            <AdSensePlaceholder slot="top" showSimulatedAds={showSimulatedAds} />

            {/* Grid display layout */}
            {publicArticles.length === 0 ? (
              <div className="h-[250px] border border-dashed border-neutral-800 bg-neutral-900/10 rounded flex flex-col justify-center items-center text-center p-6 space-y-2">
                <AlertCircle className="w-10 h-10 text-neutral-600" />
                <h4 className="text-sm text-neutral-400 font-sans font-bold uppercase tracking-widest">Nenhum Artigo Encontrado</h4>
                <p className="text-xs text-neutral-500 max-w-sm leading-relaxed">Não encontramos artigos correspondentes sob este critério. Visite nosso painel de controle e clique em criar.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* 1. Main Headline Hero Card - Only on standard homepage / first page */}
                {!selectedCategory && !isSearchActive && featuredArticle && (
                  <div className="space-y-4">
                    <h3 className="text-xs uppercase tracking-widest text-[#9ab0d7] font-mono font-black flex items-center gap-1">
                      <span>Destaque Principal de Hoje</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                    </h3>
                    <ArticleCard 
                      article={featuredArticle} 
                      onClick={() => handleNavigate('article', featuredArticle)} 
                      featured={true} 
                    />
                  </div>
                )}

                {/* 2. Secondary Bento Grid Articles columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gridArticles.map((art) => (
                    <div key={art.id}>
                      <ArticleCard 
                        article={art} 
                        onClick={() => handleNavigate('article', art)} 
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mid Page AdSense and Newsletter break block */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 items-center">
              <div className="lg:col-span-2">
                <NewsletterBox source="homepage_middle" onSubscribe={handleSubscribe} />
              </div>
              <div>
                <AdSensePlaceholder slot="middle" height="h-[180px]" showSimulatedAds={showSimulatedAds} />
              </div>
            </div>

            {/* Retro Section grids: specific categories blocks */}
            {!selectedCategory && !isSearchActive && (
              <div className="space-y-8 pt-8 border-t border-neutral-900">
                {/* Section Silvio Santos specific block */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                    <h3 className="text-base font-sans font-extrabold uppercase tracking-widest text-white flex items-center gap-2">
                      <Tv className="w-4 h-4 text-amber-500" />
                      <span>Legado de Silvio Santos</span>
                    </h3>
                    <button onClick={() => handleNavigate('category', 'Silvio Santos')} className="text-xs text-amber-400 hover:underline">Ver Todos</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {articles
                      .filter((a) => a.category === 'Silvio Santos' && !a.isDraft)
                      .slice(0, 2)
                      .map((art) => (
                        <div 
                          key={art.id}
                          onClick={() => handleNavigate('article', art)}
                          className="p-4 bg-[#010f25]/30 border border-neutral-850 rounded hover:border-neutral-750 transition flex gap-4 cursor-pointer group"
                        >
                          <img 
                            src={art.image} 
                            alt={art.title} 
                            referrerPolicy="no-referrer"
                            className="w-20 h-16 rounded object-cover shrink-0 border border-neutral-901" 
                          />
                          <div>
                            <span className="text-[9px] text-[#9ab0d7] font-mono block">SBT • LINHA DO TEMPO</span>
                            <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition line-clamp-2 mt-0.5">{art.title}</h4>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Section "Por onde anda" specific block */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                    <h3 className="text-base font-sans font-extrabold uppercase tracking-widest text-white flex items-center gap-2">
                      <Compass className="w-4 h-4 text-purple-400" />
                      <span>Por Onde Anda?</span>
                    </h3>
                    <button onClick={() => handleNavigate('category', 'Por Onde Anda?')} className="text-xs text-amber-400 hover:underline">Ver Todos</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {articles
                      .filter((a) => a.category === 'Por Onde Anda?' && !a.isDraft)
                      .slice(0, 2)
                      .map((art) => (
                        <div 
                          key={art.id}
                          onClick={() => handleNavigate('article', art)}
                          className="p-4 bg-[#010f25]/30 border border-neutral-850 rounded hover:border-neutral-750 transition flex gap-4 cursor-pointer group"
                        >
                          <img 
                            src={art.image} 
                            alt={art.title} 
                            referrerPolicy="no-referrer"
                            className="w-20 h-16 rounded object-cover shrink-0 border border-neutral-901" 
                          />
                          <div>
                            <span className="text-[9px] text-purple-300 font-mono block">REVELAÇÕES DE CARREIRAS</span>
                            <h4 className="text-xs font-bold text-white group-hover:text-amber-400 transition line-clamp-2 mt-0.5">{art.title}</h4>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer bar */}
      <PortalFooter onNavigate={handleNavigate} />
    </div>
  );
}
