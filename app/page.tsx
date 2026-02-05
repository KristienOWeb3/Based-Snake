'use client';

import { useState, useEffect, useRef } from 'react';
import { usePayEntry } from '../hooks/usePayEntry'; 

export default function Home() {
  const { triggerPayment, isProcessing, isPaid } = usePayEntry();
  const [gameState, setGameState] = useState('MENU'); // MENU, PLAYING, GAMEOVER
  const [score, setScore] = useState(0);

  return (
    <main className="min-h-screen bg-white text-black relative overflow-hidden font-mono selection:bg-blue-100">
      
      {/* --- HEADER (Wallet) --- */}
      <header className="absolute top-4 right-4 z-50">
        <button 
          onClick={triggerPayment}
          disabled={isProcessing || isPaid}
          className={`
            px-6 py-2 rounded-full backdrop-blur-md border border-blue-500/20
            transition-all duration-300 font-bold text-sm
            ${isPaid 
              ? 'bg-green-100 text-green-700 shadow-[0_0_20px_rgba(0,255,0,0.2)]' 
              : 'bg-white/70 text-blue-600 shadow-[0_4px_20px_rgba(0,0,255,0.1)] hover:scale-105 active:scale-95'
            }
          `}
        >
          {isProcessing ? 'Processing...' : isPaid ? 'Wallet Connected • Paid' : 'Connect & Pay 0.1 USDC'}
        </button>
      </header>

      {/* --- GAME AREA (Center) --- */}
      <div className="flex flex-col items-center justify-center h-screen w-full">
        {isPaid ? (
          <div className="relative group">
            {/* THIS IS WHERE THE CANVAS WILL GO */}
            <canvas 
              id="snake-canvas" 
              width="400" 
              height="400"
              className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,255,0.15)] border border-slate-100"
            ></canvas>
            
            {/* Overlay Instructions */}
            <div className="absolute -bottom-12 left-0 w-full text-center text-slate-400 text-xs">
              SWIPE TO MOVE
            </div>
          </div>
        ) : (
          /* LOCKED STATE */
          <div className="text-center space-y-6 p-8 backdrop-blur-xl bg-white/40 rounded-3xl border border-white/50 shadow-xl">
            <h1 className="text-6xl font-black text-blue-600 tracking-tighter mb-2">SNAKE</h1>
            <p className="text-slate-500">Pay 0.1 USDC to enter the arena.</p>
            <div className="animate-bounce mt-4 text-2xl">👇</div>
          </div>
        )}
      </div>

      {/* --- BOTTOM DOCK (Navigation) --- */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-2 p-2 bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]">
          
          <NavButton label="Play" active={gameState === 'MENU' || gameState === 'PLAYING'} />
          <NavButton label="Bounty" active={false} />
          <NavButton label="Leaderboard" active={false} />

        </div>
      </div>

    </main>
  );
}

// Simple Helper Component for the Dock Buttons
function NavButton({ label, active }: { label: string, active: boolean }) {
  return (
    <button className={`
      px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200
      ${active 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-100' 
        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
      }
    `}>
      {label}
    </button>
  );
}