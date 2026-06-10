/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Menu, X, Tv, ShieldAlert, Calendar, User, Compass } from 'lucide-react';
import { CategorySpec } from '../types';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, payload?: any) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categories: CategorySpec[];
  adminMode: boolean;
  onToggleAdmin: () => void;
}

export default function PortalHeader({
  currentView,
  onNavigate,
  searchQuery,
  onSearchChange,
  categories,
  adminMode,
  onToggleAdmin
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const mainNavItems = [
    { name: 'Home', view: 'home' },
    { name: 'Silvio Santos', view: 'category', payload: 'Silvio Santos' },
    { name: 'Nostalgia', view: 'category', payload: 'Nostalgia' },
    { name: 'Curiosidades', view: 'category', payload: 'Curiosidades' },
    { name: 'Por Onde Anda?', view: 'category', payload: 'Por Onde Anda?' },
    { name: 'Programas de TV', view: 'category', payload: 'Programas Antigos' },
    { name: 'Celebridades', view: 'category', payload: 'Celebridades' },
    { name: 'Novelas', view: 'category', payload: 'Novelas' },
    { name: 'Últimas Notícias', view: 'category', payload: 'Últimas Notícias' },
    { name: 'Contato', view: 'contato' }
  ];

  const handleNavClick = (item: { name: string; view: string; payload?: any }) => {
    onNavigate(item.view, item.payload);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-[#010f25] text-white border-b border-amber-500/10 sticky top-0 z-40 shadow-md">
      {/* Top Banner (Superbar) */}
      <div className="bg-neutral-950 border-b border-neutral-900 text-[11px] text-neutral-400 py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-mono">
              <Calendar className="w-3" />
              <span>10 de Junho, 2026</span>
            </span>
            <span className="hidden sm:inline text-neutral-700">|</span>
            <span className="hidden sm:inline">Portal Oficial de Preservação da Memória da TV Brasileira</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span>juniorsalesti@gmail.com (Admin)</span>
            </span>
            <button
              onClick={onToggleAdmin}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded font-bold transition text-xs cursor-pointer ${
                adminMode 
                  ? 'bg-amber-500 text-neutral-950 hover:bg-amber-600' 
                  : 'bg-neutral-800 text-amber-400 hover:bg-neutral-700 hover:text-amber-300'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{adminMode ? 'Sair do Painel' : 'Painel de Controle'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <div 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/10 group-hover:bg-amber-600 transition">
            <Tv className="w-6 h-6 text-neutral-950" />
          </div>
          <div>
            <h1 className="text-xl font-heading font-black tracking-tight text-white flex items-center gap-1 leading-none uppercase">
              Memórias <span className="text-amber-400 font-serif lowercase italic font-medium tracking-normal text-lg">da</span> TV
            </h1>
            <p className="text-[10px] tracking-widest text-[#9ab0d7] uppercase font-mono mt-0.5 font-bold">O Maior Acervo do Passado</p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-sm hidden md:block">
          <div className={`relative transition-all duration-300 ${searchFocused ? 'scale-102' : ''}`}>
            <Search className={`absolute left-3 top-3 w-4 h-4 transition-colors ${searchFocused ? 'text-amber-400' : 'text-neutral-400'}`} />
            <input
              type="text"
              placeholder="Pesquisar artigos, categorias, tags..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full bg-neutral-950/80 border border-neutral-800 rounded-full px-4 py-2 pl-9 text-xs text-white focus:outline-none focus:border-amber-400 placeholder:text-neutral-500"
            />
          </div>
        </div>

        {/* Burger Button and Support */}
        <div className="flex items-center gap-2">
          {/* Mobile search bar trigger in burger or navbar */}
          <button
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2 text-neutral-300 hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Secondary Ribbon - Desktop Navigation Links */}
      <div className="bg-[#000d1e] border-t border-[#041935] hidden md:block">
        <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <ul className="flex items-center space-x-1 py-1.5 overflow-x-auto text-[13px] font-sans font-medium text-neutral-300">
            {mainNavItems.map((item, index) => {
              const isActive = (item.view === 'home' && currentView === 'home') ||
                               (item.view === 'category' && currentView === 'category' && typeof item.payload === 'string' && item.payload === currentView);
              
              return (
                <li key={index}>
                  <button
                    onClick={() => handleNavClick(item)}
                    className={`px-3 py-2 rounded-md transition duration-150 cursor-pointer ${
                      currentView === 'category' && item.view === 'category' && item.payload === (onNavigate as any).currentPayload
                        ? 'text-[#010f25] bg-amber-400 font-bold'
                        : currentView === item.view
                        ? 'text-[#010f25] bg-amber-400 font-bold'
                        : 'hover:bg-neutral-950 hover:text-white'
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1 bg-amber-400/5 px-2.5 py-1 text-amber-400 border border-amber-400/10 rounded-full text-xs">
            <Compass className="w-3.5 h-3.5" />
            <span className="font-semibold font-sans">100% Livre de Spam</span>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[84px] bg-[#010f25]/95 backdrop-blur-sm z-50 animate-fade-in flex flex-col md:hidden p-6 gap-6 overflow-y-auto">
          <div className="relative">
            <Search className="absolute left-3 top-3.5 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Pesquise no acervo brasileiro..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 pl-10 text-sm text-white focus:outline-none focus:border-amber-400 placeholder:text-neutral-500"
            />
          </div>

          <h3 className="text-xs uppercase tracking-wider text-[#9ab0d7] font-mono font-bold">Navegação Principal</h3>
          <ul className="flex flex-col space-y-2">
            {mainNavItems.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleNavClick(item)}
                  className="w-full text-left p-3 rounded-lg text-sm hover:bg-[#021c43] text-neutral-200 hover:text-amber-300 font-sans font-medium transition flex items-center justify-between"
                >
                  <span>{item.name}</span>
                  <Compass className="w-4 h-4 text-neutral-500" />
                </button>
              </li>
            ))}
          </ul>

          <div className="border-t border-neutral-800/85 pt-4 mt-auto">
            <button
              onClick={() => {
                onToggleAdmin();
                setMobileMenuOpen(false);
              }}
              className="w-full bg-amber-400 text-neutral-950 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{adminMode ? 'Sair do Painel de Admin' : 'Acessar Painel de Admin'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
