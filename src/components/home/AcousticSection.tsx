import React, { useState } from 'react';
import { Volume2, Sliders, Activity } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';
import { SWITCH_OPTIONS } from '../../data/customizerOptions';
import type { SwitchType } from '../../types';

interface AcousticSectionProps {
  onOpenSoundTest: () => void;
  onLaunchStudio: (switchType?: SwitchType) => void;
}

export const AcousticSection: React.FC<AcousticSectionProps> = ({
  onLaunchStudio
}) => {
  const [activeAudition, setActiveAudition] = useState<SwitchType>('linear');

  const handleAudition = (swType: SwitchType) => {
    setActiveAudition(swType);
    soundEngine.playKeyStroke(swType, 'fr4');
  };

  const activeOpt = SWITCH_OPTIONS.find(s => s.id === activeAudition);

  const stackLayers = [
    {
      step: '01',
      title: 'Poron Leaf Spring Gaskets',
      description: 'Sits between case and plate to decouple typing vibration from the desktop.'
    },
    {
      step: '02',
      title: 'IXPE Ultra-Dense Switch Film',
      description: 'Directs switch impact frequency forward rather than dispersing into the internal cavity.'
    },
    {
      step: '03',
      title: 'Precision Acoustic Plates',
      description: 'Choose solid milled brass for bright clack or flex polycarbonate for deep thock.'
    },
    {
      step: '04',
      title: 'Solid Brass Counter-Weight',
      description: 'High-density ballast eliminates hollow case resonance completely.'
    }
  ];

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-200 bg-[#fafaf9] blueprint-grid-fine">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-zinc-200">
          <div className="max-w-2xl">
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-zinc-700" />
              <span>TEST BENCH // ACOUSTIC TIMBRE ANALYSIS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-950 tracking-tight mt-1">
              Engineered for Pure Mechanical Timbre
            </h2>
            <p className="text-sm text-zinc-600 mt-1 leading-relaxed">
              Eliminating cavity resonance through internal acoustic dampening and high-density brass ballasts.
            </p>
          </div>

          <div className="text-[11px] font-mono text-zinc-500 text-left sm:text-right">
            <div>CALIBRATION: 2026 LAB SPEC</div>
            <div>TOLERANCE: ±0.5 dB</div>
          </div>
        </div>

        {/* 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Switch Sound Audition Matrix */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 rounded border border-zinc-300 bg-white shadow-sm space-y-5">
              <div>
                <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-zinc-900">
                  Switch Timbre Matrix
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Click any switch channel to trigger authentic acoustic bottom-out.
                </p>
              </div>

              {/* 4 Switch Sound Trigger Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SWITCH_OPTIONS.map((sw, idx) => {
                  const isPlaying = activeAudition === sw.id;
                  return (
                    <button
                      key={sw.id}
                      onClick={() => handleAudition(sw.id as SwitchType)}
                      className={`p-3.5 rounded border text-left transition-all active:scale-[0.98] flex flex-col justify-between cursor-pointer ${
                        isPlaying
                          ? 'bg-zinc-100 border-zinc-900 shadow-sm'
                          : 'bg-white hover:bg-zinc-50 border-zinc-200'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3.5 h-3.5 rounded-none border border-zinc-400" 
                            style={{ backgroundColor: sw.hex }}
                          />
                          <span className="text-xs font-mono font-bold text-zinc-900">
                            CH-0{idx + 1} // {sw.name.split(' ')[0]}
                          </span>
                        </div>
                        <Volume2 className={`w-3.5 h-3.5 ${isPlaying ? 'text-zinc-950' : 'text-zinc-400'}`} />
                      </div>

                      <div className="mt-3 font-mono">
                        <div className="text-[11px] text-zinc-900 font-semibold">
                          {sw.badge}
                        </div>
                        <p className="text-[10px] text-zinc-500 mt-0.5 line-clamp-1">
                          {sw.acousticNote}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Profile Readout & Frequency Meter */}
              <div className="p-3.5 rounded border border-zinc-200 bg-zinc-50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-700">
                  <Volume2 className="w-4 h-4 text-zinc-900 shrink-0" />
                  <span>
                    ACTIVE PROFILE: <strong className="text-zinc-950">{activeOpt?.name}</strong> &bull; {activeOpt?.acousticNote}
                  </span>
                </div>
              </div>
            </div>

            {/* One Clear Primary Action CTA */}
            <div className="p-4 rounded border border-zinc-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
              <span className="text-xs text-zinc-600 font-mono">
                Pair this switch with custom plates in 3D:
              </span>
              <button
                onClick={() => onLaunchStudio(activeAudition)}
                className="w-full sm:w-auto px-5 py-2.5 rounded bg-zinc-900 hover:bg-black text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Configure in 3D</span>
                <span className="text-zinc-400">&rarr;</span>
              </button>
            </div>
          </div>

          {/* Right: Technical Macro Photography & Multi-layer Stack */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded border border-zinc-300 bg-white p-2 shadow-sm relative">
              <div className="aspect-[16/10] overflow-hidden bg-zinc-100 rounded border border-zinc-200 relative">
                <img
                  src="/images/switch_artisan_macro.jpg"
                  alt="CNC Milled Solid Brass Keyboard Plate and Lubed Switches"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-white/90 backdrop-blur-md border border-zinc-200 text-[10px] font-mono text-zinc-800">
                  SEC A-A &bull; PLATE &amp; SWITCH INTERFACE
                </div>
              </div>
              <div className="p-2 pt-3 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span>CNC MILLED SOLID BRASS PLATE</span>
                <span>TOLERANCE: 0.02 mm</span>
              </div>
            </div>

            {/* 4 Multi-layer Stack Explanations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {stackLayers.map((layer, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded border border-zinc-200 bg-white space-y-1 shadow-sm"
                >
                  <div className="text-xs font-mono font-bold text-zinc-900 flex items-center gap-1.5">
                    <span className="text-zinc-400">[{layer.step}]</span>
                    <span>{layer.title}</span>
                  </div>
                  <p className="text-[11px] text-zinc-600 leading-relaxed font-mono">
                    {layer.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
