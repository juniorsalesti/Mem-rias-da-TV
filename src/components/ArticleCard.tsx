/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, Calendar, Eye, MessageSquare, ChevronRight } from 'lucide-react';
import { Article } from '../types';

interface CardProps {
  article: Article;
  onClick: () => void;
  featured?: boolean;
}

export default function ArticleCard({ article, onClick, featured = false }: CardProps) {
  if (featured) {
    return (
      <div 
        onClick={onClick}
        className="group relative bg-[#010f25] border border-[#041935] rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0"
      >
        {/* Badge of category */}
        <div className="absolute top-4 left-4 z-10 bg-amber-500 text-neutral-950 font-sans font-bold text-xs uppercase px-3 py-1 rounded-full tracking-wider shadow">
          {article.category}
        </div>

        {/* Thumbnail Image component */}
        <div className="lg:col-span-7 relative overflow-hidden min-h-[300px] sm:min-h-[380px] h-full">
          <img 
            src={article.image} 
            alt={article.title} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-neutral-950/80 via-transparent to-transparent"></div>
        </div>

        {/* Meta values and text on right */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-center bg-neutral-900/40 relative">
          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 font-mono mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5" />
              <span>{article.date}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5" />
              <span>{article.readTime}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-amber-500">
              <Eye className="w-3.5" />
              <span>{article.views.toLocaleString()} acessos</span>
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-extrabold text-white tracking-tight leading-tight group-hover:text-amber-400 transition-colors">
            {article.title}
          </h2>

          <p className="text-neutral-300 text-sm mt-3 leading-relaxed">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-2 mt-6 pt-5 border-t border-neutral-800">
            <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400 text-xs font-bold font-mono">
              {article.author.charAt(0)}
            </div>
            <div>
              <p className="text-xs text-neutral-300 font-bold leading-none">{article.author}</p>
              <p className="text-[10px] text-neutral-500 mt-1 uppercase font-mono">Pesquisador Oficial</p>
            </div>
            
            <div className="ml-auto flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{article.commentsCount}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className="group bg-[#010f25]/50 border border-neutral-800 rounded-lg overflow-hidden cursor-pointer shadow hover:shadow-md transition-all duration-300 flex flex-col h-full"
    >
      {/* Small thumbnail div */}
      <div className="relative overflow-hidden aspect-video">
        <img 
          src={article.image} 
          alt={article.title} 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
        />
        <div className="absolute top-2 left-2 z-10 bg-neutral-950/80 backdrop-blur-md text-amber-400 border border-amber-500/20 font-sans font-bold text-[10px] uppercase px-2.5 py-0.5 rounded tracking-wider">
          {article.category}
        </div>
      </div>

      {/* Main text content and tags */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 text-[10px] text-neutral-400 font-mono mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3" />
              <span>{article.date}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3" />
              <span>{article.readTime}</span>
            </span>
          </div>

          <h3 className="text-base font-sans font-bold text-white leading-snug group-hover:text-amber-400 transition-colors line-clamp-2">
            {article.title}
          </h3>

          <p className="text-xs text-neutral-300 mt-2 line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between">
          <span className="text-[10px] text-neutral-400 font-bold">Por: {article.author}</span>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-[#9ab0d7] font-mono flex items-center gap-1">
              <Eye className="w-3" />
              <span>{article.views}</span>
            </span>
            <span className="text-[10px] text-[#9ab0d7] font-mono flex items-center gap-1">
              <MessageSquare className="w-3" />
              <span>{article.commentsCount}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
