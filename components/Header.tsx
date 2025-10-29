
import React from 'react';
import { LOGO_URL } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/70 backdrop-blur-lg p-4 border-b border-slate-700 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto flex items-center">
        <img src={LOGO_URL} alt="Mwalimu AI Logo" className="h-10 w-10 mr-4" />
        <div>
          <h1 className="text-xl font-bold text-amber-400">Mwalimu AI</h1>
          <p className="text-sm text-slate-400">Your Academic Assistant</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
