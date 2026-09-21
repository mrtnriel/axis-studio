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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div 
        className="w-full max-w-3xl bg-white border border-zinc-300 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 bg-[#fafaf9]">
          <div className="flex items-center gap-3">
            <div className="p-1.5 border border-zinc-300 bg-white text-zinc-800">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">
                LAB-04 // ACOUSTIC BENCHMARK
              </div>
              <h2 className="text-base font-medium text-zinc-900 tracking-tight">
                Acoustic Frequency & Timbre Test
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-500 hover:text-black border border-transparent hover:border-zinc-300 transition-colors cursor-pointer"
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
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-700 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-zinc-500" />
                Switch Actuator Profile
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
                      className={`p-2.5 border text-left transition-colors cursor-pointer ${
                        isSel
                          ? 'bg-white border-zinc-900 ring-1 ring-zinc-900 text-zinc-950'
                          : 'bg-[#fafaf9] hover:bg-white border-zinc-200 text-zinc-600'
                      }`}
                    >
                      <span className="text-xs font-medium text-zinc-900 block">{sw.name.split(' ')[0]}</span>
                      <span className="text-[10px] font-mono text-zinc-600">{sw.badge}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Plate Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-700 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-zinc-500" />
                Plate Resonance Density
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
                      className={`p-2.5 border text-left transition-colors cursor-pointer ${
                        isSel
                          ? 'bg-white border-zinc-900 ring-1 ring-zinc-900 text-zinc-950'
                          : 'bg-[#fafaf9] hover:bg-white border-zinc-200 text-zinc-600'
                      }`}
                    >
                      <span className="text-xs font-medium text-zinc-900 block">{pl.name}</span>
                      <span className="text-[10px] font-mono text-zinc-600">{pl.badge || 'Neutral'}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Interactive Acoustic Waveform / Calibration Bar */}
          <div className="p-4 border border-zinc-200 bg-[#fafaf9] space-y-3 blueprint-grid-fine">
            <div className="flex items-center justify-between text-[10.5px] font-mono text-zinc-600 border-b border-zinc-200 pb-2">
              <span>ACTIVE SPECIMEN: {currentSwitchOpt.name.toUpperCase()} + {currentPlateOpt.name.toUpperCase()} PLATE</span>
              <span>SAMPLING: 48 KHZ WAV</span>
            </div>

            {/* Timbre Metrics */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-2 border border-zinc-200 bg-white">
                <div className="text-[9.5px] font-mono text-zinc-600 uppercase">Resonance Center</div>
                <div className="text-xs font-mono font-medium text-zinc-900 mt-0.5">
                  {selectedPlate === 'brass' ? '820 Hz' : selectedPlate === 'aluminum' ? '640 Hz' : selectedPlate === 'fr4' ? '410 Hz' : '220 Hz'}
                </div>
              </div>
              <div className="p-2 border border-zinc-200 bg-white">
                <div className="text-[9.5px] font-mono text-zinc-600 uppercase">Actuation Force</div>
                <div className="text-xs font-mono font-medium text-zinc-900 mt-0.5">
                  {selectedSwitch === 'tactile' ? '58 gf' : selectedSwitch === 'clicky' ? '62 gf' : '50 gf'}
                </div>
              </div>
              <div className="p-2 border border-zinc-200 bg-white">
                <div className="text-[9.5px] font-mono text-zinc-600 uppercase">Damping Factor</div>
                <div className="text-xs font-mono font-medium text-zinc-900 mt-0.5">
                  {selectedPlate === 'polycarbonate' ? '0.88 (Deep)' : selectedPlate === 'fr4' ? '0.74 (Clack)' : '0.45 (Bright)'}
                </div>
              </div>
            </div>
          </div>

          {/* Virtual Keyboard Keypad for Clicking */}
          <div className="space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-600 text-center">
              Type on your keyboard or click below to audition
            </div>

            <div className="p-4 border border-zinc-200 bg-[#fafaf9] flex flex-col items-center gap-1.5 select-none">
              <div className="flex gap-1">
                {virtualKeysRow1.map((k) => (
                  <button
                    key={k}
                    onClick={() => triggerClick(k)}
                    className={`w-9 h-9 sm:w-10 sm:h-10 border text-xs font-mono transition-all flex items-center justify-center cursor-pointer ${
                      activeKey === k
                        ? 'bg-zinc-900 text-white border-zinc-900 scale-95'
                        : 'bg-white hover:bg-zinc-100 border-zinc-300 text-zinc-800'
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>

              <div className="flex gap-1">
                {virtualKeysRow2.map((k) => (
                  <button
                    key={k}
                    onClick={() => triggerClick(k)}
                    className={`w-9 h-9 sm:w-10 sm:h-10 border text-xs font-mono transition-all flex items-center justify-center cursor-pointer ${
                      activeKey === k
                        ? 'bg-zinc-900 text-white border-zinc-900 scale-95'
                        : 'bg-white hover:bg-zinc-100 border-zinc-300 text-zinc-800'
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>

              <div className="flex gap-1">
                {virtualKeysRow3.map((k) => (
                  <button
                    key={k}
                    onClick={() => triggerClick(k)}
                    className={`w-9 h-9 sm:w-10 sm:h-10 border text-xs font-mono transition-all flex items-center justify-center cursor-pointer ${
                      activeKey === k
                        ? 'bg-zinc-900 text-white border-zinc-900 scale-95'
                        : 'bg-white hover:bg-zinc-100 border-zinc-300 text-zinc-800'
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>

              {/* Spacebar */}
              <div className="pt-1">
                <button
                  onClick={() => triggerClick('SPACE')}
                  className={`w-48 sm:w-64 h-8 border text-xs font-mono transition-all flex items-center justify-center cursor-pointer ${
                    activeKey === ' ' || activeKey === 'SPACE'
                      ? 'bg-zinc-900 text-white border-zinc-900 scale-95'
                      : 'bg-white hover:bg-zinc-100 border-zinc-300 text-zinc-600'
                  }`}
                >
                  SPACEBAR ACOUSTIC TEST
                </button>
              </div>
            </div>
          </div>

          {/* Keystroke Activity Log */}
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-600 border-t border-zinc-200 pt-3">
            <span>KEYSTROKES AUDITIONED: {recentHits.length}</span>
            <span>PRESS ANY PHYSICAL KEY TO TRIGGER TIMBRE</span>
          </div>

        </div>

      </div>
    </div>
  );
};
