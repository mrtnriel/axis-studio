import React, { useState } from 'react';
import { Volume2, Sliders } from 'lucide-react';
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
      title: 'Poron Leaf Spring Gaskets',
      description: 'Sits between case and plate to decouple typing vibration from your desk.'
    },
    {
      title: 'IXPE Ultra-Dense Switch Film',
      description: 'Directs switch impact frequency forward rather than dispersing into the cavity.'
    },
    {
      title: 'Precision Acoustic Plates',
      description: 'Choose solid brass for bright clack or flex polycarbonate for deep thock.'
    },
    {
      title: 'Solid Brass Counter-Weight',
      description: 'High-density ballast eliminates hollow case resonance completely.'
    }
  ];

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#07070a]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="text-xs font-mono text-amber-400 uppercase tracking-widest">
            Acoustic Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-1">
            Engineered for Pure Mechanical Timbre
          </h2>
          <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
            Eliminating hollow vibration through internal acoustic dampening and high-density brass ballasts.
          </p>
        </div>

        {/* 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Switch Sound Audition Matrix */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 rounded-2xl bg-[#101116] border border-white/5 space-y-5">
              <div>
                <h3 className="text-base font-semibold text-white">
                  Direct Timbre Audition
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Click any switch profile to test acoustic bottom-out in real-time.
                </p>
              </div>

              {/* 4 Switch Sound Trigger Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SWITCH_OPTIONS.map((sw) => {
                  const isPlaying = activeAudition === sw.id;
                  return (
                    <button
                      key={sw.id}
                      onClick={() => handleAudition(sw.id as SwitchType)}
                      className={`p-4 rounded-xl border text-left transition-all active:scale-[0.98] flex flex-col justify-between cursor-pointer ${
                        isPlaying
                          ? 'bg-amber-500/15 border-amber-500/50 shadow-lg shadow-amber-500/10'
                          : 'bg-zinc-900/70 hover:bg-zinc-900 border-white/5 hover:border-white/15'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3.5 h-3.5 rounded-full" 
                            style={{ backgroundColor: sw.hex }}
                          />
                          <span className="text-xs font-bold text-white">
                            {sw.name.split(' ')[0]}
                          </span>
                        </div>
                        <Volume2 className={`w-3.5 h-3.5 ${isPlaying ? 'text-amber-400' : 'text-zinc-500'}`} />
                      </div>

                      <div className="mt-3">
                        <div className="text-[11px] text-amber-300 font-mono font-medium">
                          {sw.badge}
                        </div>
                        <p className="text-[10px] text-zinc-400 mt-0.5 line-clamp-1">
                          {sw.acousticNote}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Profile Readout */}
              <div className="p-3.5 rounded-xl bg-black/60 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                  <Volume2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    Acoustic Profile: <span className="text-amber-400 font-semibold">{activeOpt?.name}</span> &bull; {activeOpt?.acousticNote}
                  </span>
                </div>
              </div>
            </div>

            {/* One Clear Primary Action CTA */}
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-zinc-300">
                Ready to assemble this switch configuration?
              </span>
              <button
                onClick={() => onLaunchStudio(activeAudition)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-amber-400/20 transition-all active:scale-[0.98] cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Configure in 3D</span>
              </button>
            </div>
          </div>

          {/* Right: Macro Photography & Acoustic Stack Layers */}
          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950 aspect-[16/10] relative">
              <img
                src="/images/switch_artisan_macro.jpg"
                alt="CNC Milled Solid Brass Keyboard Plate and Lubed Switches"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-mono uppercase text-amber-400 tracking-widest block">
                  Precision Tolerances &bull; 0.02mm Milled Brass
                </span>
                <h4 className="text-sm font-semibold text-white mt-0.5">
                  High-Density Acoustic Plate & Switches
                </h4>
              </div>
            </div>

            {/* 4 Multi-layer Stack Explanations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {stackLayers.map((layer, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#101116] border border-white/5 space-y-1"
                >
                  <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-amber-400">0{idx + 1}.</span>
                    {layer.title}
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
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
