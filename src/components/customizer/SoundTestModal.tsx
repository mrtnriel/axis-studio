import React, { useState, useEffect } from 'react';
import { X, Activity, Sliders } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';
import { SWITCH_OPTIONS, PLATE_OPTIONS } from '../../data/customizerOptions';
import type { SwitchType, PlateType } from '../../types';

interface SoundTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSwitch?: SwitchType;
  initialPlate?: PlateType;
}

export const SoundTestModal: React.FC<SoundTestModalProps> = ({
  isOpen,
  onClose,
  initialSwitch = 'linear',
  initialPlate = 'fr4'
}) => {
  const [selectedSwitch, setSelectedSwitch] = useState<SwitchType>(initialSwitch);
  const [selectedPlate, setSelectedPlate] = useState<PlateType>(initialPlate);
  const [prevInitial, setPrevInitial] = useState({ sw: initialSwitch, pl: initialPlate });
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [recentHits, setRecentHits] = useState<number[]>([]);

  if (prevInitial.sw !== initialSwitch || prevInitial.pl !== initialPlate) {
    setPrevInitial({ sw: initialSwitch, pl: initialPlate });
    setSelectedSwitch(initialSwitch);
    setSelectedPlate(initialPlate);
  }

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F12' || (e.ctrlKey && e.key === 'r')) return;
      e.preventDefault();

      const keyLabel = e.key.toUpperCase();
      setActiveKey(keyLabel);
      soundEngine.playKeyStroke(selectedSwitch, selectedPlate);

      setRecentHits(prev => [Date.now(), ...prev.slice(0, 8)]);

      setTimeout(() => {
        setActiveKey(null);
      }, 100);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedSwitch, selectedPlate]);

  if (!isOpen) return null;

  const currentSwitchOpt = SWITCH_OPTIONS.find(s => s.id === selectedSwitch) || SWITCH_OPTIONS[0];
  const currentPlateOpt = PLATE_OPTIONS.find(p => p.id === selectedPlate) || PLATE_OPTIONS[0];

  const triggerClick = (label: string) => {
    setActiveKey(label);
    soundEngine.playKeyStroke(selectedSwitch, selectedPlate);
    setRecentHits(prev => [Date.now(), ...prev.slice(0, 8)]);
    setTimeout(() => setActiveKey(null), 100);
  };

  const virtualKeysRow1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const virtualKeysRow2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  const virtualKeysRow3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        className="w-full max-w-3xl bg-[#0e0f14] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#090a0d]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white tracking-wide">
                Acoustic Frequency Lab & Sound Test
              </h2>
              <p className="text-xs text-zinc-400">
                Type on your physical keyboard or click below to audition mechanical timbre.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Switch & Plate Selection Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Switch Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                Switch Profile
              </label>
              <div className="grid grid-cols-2 gap-2">
                {SWITCH_OPTIONS.map((sw) => {
                  const isSel = selectedSwitch === sw.id;
                  return (
                    <button
                      key={sw.id}
                      onClick={() => {
                        setSelectedSwitch(sw.id as SwitchType);
                        soundEngine.playKeyStroke(sw.id as SwitchType, selectedPlate);
                      }}
                      className={`p-2.5 rounded-lg border text-left transition-all flex flex-col justify-between ${
                        isSel
                          ? 'bg-amber-500/15 border-amber-500/50 text-white'
                          : 'bg-zinc-900/60 hover:bg-zinc-900 border-white/5 text-zinc-400'
                      }`}
                    >
                      <span className="text-xs font-medium text-white">{sw.name.split(' ')[0]}</span>
                      <span className="text-[10px] text-zinc-400 mt-0.5">{sw.badge}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Plate Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                Plate Resonance
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PLATE_OPTIONS.map((pl) => {
                  const isSel = selectedPlate === pl.id;
                  return (
                    <button
                      key={pl.id}
                      onClick={() => {
                        setSelectedPlate(pl.id as PlateType);
                        soundEngine.playKeyStroke(selectedSwitch, pl.id as PlateType);
                      }}
                      className={`p-2.5 rounded-lg border text-left transition-all flex flex-col justify-between ${
                        isSel
                          ? 'bg-cyan-500/15 border-cyan-500/50 text-white'
                          : 'bg-zinc-900/60 hover:bg-zinc-900 border-white/5 text-zinc-400'
                      }`}
                    >
                      <span className="text-xs font-medium text-white">{pl.name.split(' ')[0]}</span>
                      <span className="text-[10px] text-zinc-400 mt-0.5">{pl.id.toUpperCase()}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Active Acoustic Timbre Readout Card */}
          <div className="p-4 rounded-lg bg-zinc-900/80 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">
                  {currentSwitchOpt.name} on {currentPlateOpt.name}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-amber-400/20 text-amber-300 font-mono">
                  {currentSwitchOpt.badge}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                {currentPlateOpt.acousticNote}
              </p>
            </div>

            {/* Simulated Live Acoustic Waveform Meter */}
            <div className="flex items-center gap-1 h-8 px-3 py-1 rounded bg-black/60 border border-white/5">
              {[14, 22, 10, 26, 18, 24, 8, 20, 28, 16, 22, 12, 18, 8].map((baseH, i) => {
                const isPulsing = recentHits.length > 0;
                const height = isPulsing ? baseH : 4;
                return (
                  <div
                    key={i}
                    className="w-1 rounded-full bg-amber-400 transition-all duration-75"
                    style={{ height: `${height}px`, opacity: isPulsing ? 1 : 0.3 }}
                  />
                );
              })}
            </div>
          </div>

          {/* Virtual Typing Stage */}
          <div className="space-y-2 text-center">
            <div className="text-[11px] uppercase tracking-wider text-zinc-500 font-mono">
              Interactive Keystroke Surface (Click or press physical keyboard)
            </div>
            
            <div className="p-4 bg-black/40 rounded-xl border border-white/5 flex flex-col items-center gap-2 select-none">
              
              <div className="flex items-center gap-1.5">
                {virtualKeysRow1.map(k => (
                  <button
                    key={k}
                    onClick={() => triggerClick(k)}
                    className={`w-10 h-10 rounded border font-mono text-xs font-semibold flex items-center justify-center transition-all ${
                      activeKey === k
                        ? 'bg-amber-400 text-black border-amber-300 scale-95 shadow-md shadow-amber-400/30'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-white border-white/10'
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                {virtualKeysRow2.map(k => (
                  <button
                    key={k}
                    onClick={() => triggerClick(k)}
                    className={`w-10 h-10 rounded border font-mono text-xs font-semibold flex items-center justify-center transition-all ${
                      activeKey === k
                        ? 'bg-amber-400 text-black border-amber-300 scale-95 shadow-md shadow-amber-400/30'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-white border-white/10'
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                {virtualKeysRow3.map(k => (
                  <button
                    key={k}
                    onClick={() => triggerClick(k)}
                    className={`w-10 h-10 rounded border font-mono text-xs font-semibold flex items-center justify-center transition-all ${
                      activeKey === k
                        ? 'bg-amber-400 text-black border-amber-300 scale-95 shadow-md shadow-amber-400/30'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-white border-white/10'
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>

              <div className="pt-1">
                <button
                  onClick={() => triggerClick('SPACE')}
                  className={`w-64 h-10 rounded border font-mono text-xs font-semibold flex items-center justify-center transition-all ${
                    activeKey === ' ' || activeKey === 'SPACE'
                      ? 'bg-amber-400 text-black border-amber-300 scale-95 shadow-md shadow-amber-400/30'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-white/10'
                  }`}
                >
                  SPACEBAR
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#090a0d] border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-zinc-400">
            Acoustic recordings synthesized in real-time with Web Audio API.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded bg-white text-zinc-950 font-semibold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors"
          >
            Apply to Build
          </button>
        </div>

      </div>
    </div>
  );
};
