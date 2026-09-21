import React, { useState } from 'react';
import { 
  Volume2, 
  Check, 
  Sparkles, 
  Palette, 
  Disc, 
  ToggleRight, 
  Layers, 
  Cpu, 
  Cable, 
  Sun 
} from 'lucide-react';
import { useCustomizer } from '../../context/CustomizerContext';
import { 
  CASE_OPTIONS, 
  PLATE_OPTIONS, 
  SWITCH_OPTIONS, 
  KEYCAP_OPTIONS, 
  WEIGHT_OPTIONS, 
  CABLE_OPTIONS, 
  LIGHTING_OPTIONS,
  PCB_OPTIONS 
} from '../../data/customizerOptions';
import type { 
  CaseColor, 
  PlateType, 
  SwitchType, 
  KeycapColorway, 
  WeightBarFinish, 
  CableColor, 
  LightingEffect, 
  PcbType,
  LayoutType 
} from '../../types';

type SectionTab = 'case' | 'keycaps' | 'switches' | 'plate' | 'pcb' | 'weight' | 'cable' | 'lighting' | 'layout';

interface ComponentSelectorProps {
  onOpenSoundTest: () => void;
}

export const ComponentSelector: React.FC<ComponentSelectorProps> = ({ onOpenSoundTest }) => {
  const { 
    config, 
    setCaseColor, 
    setPlate, 
    setSwitchType, 
    setKeycaps, 
    setWeightBar, 
    setCable, 
    setLighting, 
    setPcb,
    setLayout,
    triggerKeyHit 
  } = useCustomizer();

  const [activeTab, setActiveTab] = useState<SectionTab>('case');

  const tabs: { id: SectionTab; label: string; icon: React.ReactNode }[] = [
    { id: 'case', label: 'Case', icon: <Palette className="w-3.5 h-3.5" /> },
    { id: 'keycaps', label: 'Keycaps', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'switches', label: 'Switches', icon: <Disc className="w-3.5 h-3.5" /> },
    { id: 'plate', label: 'Plate', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'pcb', label: 'PCB', icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: 'weight', label: 'Weight', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'cable', label: 'Cable', icon: <Cable className="w-3.5 h-3.5" /> },
    { id: 'lighting', label: 'Lighting', icon: <Sun className="w-3.5 h-3.5" /> },
    { id: 'layout', label: 'Layout', icon: <ToggleRight className="w-3.5 h-3.5" /> }
  ];

  return (
    <div className="flex flex-col h-full bg-[#0d0e12] border-l border-white/5 overflow-hidden">
      
      {/* Studio Category Navigation Tabs */}
      <div className="flex items-center gap-1 p-2 bg-[#090a0d] border-b border-white/5 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-white/10 text-white shadow-sm border border-white/10'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Options Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        
        {/* ================= CASE COLOR & FINISH ================= */}
        {activeTab === 'case' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                  CNC Milled Case
                </h3>
                <p className="text-xs text-zinc-400">
                  Select aerospace aluminum anodization or frosted optical polycarbonate.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {CASE_OPTIONS.map((opt) => {
                const isSelected = config.caseColor === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setCaseColor(opt.id as CaseColor)}
                    className={`group w-full p-3.5 rounded-lg text-left transition-all border flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/50 shadow-sm'
                        : 'bg-zinc-900/60 hover:bg-zinc-900 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Color swatch disc */}
                      <div 
                        className="w-7 h-7 rounded-full border border-white/20 shadow-inner flex items-center justify-center shrink-0"
                        style={{ backgroundColor: opt.hex }}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-white">{opt.name}</span>
                          {opt.badge && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] bg-white/10 text-zinc-300 font-mono">
                              {opt.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-zinc-400 mt-0.5">{opt.description}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-medium text-zinc-300">
                        {opt.priceDelta === 0 ? 'Included' : `+$${opt.priceDelta}`}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= KEYCAP COLORWAYS ================= */}
        {activeTab === 'keycaps' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                Double-Shot PBT Keycaps
              </h3>
              <p className="text-xs text-zinc-400">
                1.5mm thick double-shot keycaps with dye-sub legends and deep dish ergonomics.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {KEYCAP_OPTIONS.map((opt) => {
                const isSelected = config.keycaps === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setKeycaps(opt.id as KeycapColorway)}
                    className={`group w-full p-3.5 rounded-lg text-left transition-all border flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/50 shadow-sm'
                        : 'bg-zinc-900/60 hover:bg-zinc-900 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Dual color swatch representing alpha vs modifier */}
                      <div className="w-7 h-7 rounded-md border border-white/20 overflow-hidden flex shrink-0 shadow-inner">
                        <div className="w-1/2 h-full" style={{ backgroundColor: opt.hex }} />
                        <div className="w-1/2 h-full" style={{ backgroundColor: opt.secondaryHex || opt.hex }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-white">{opt.name}</span>
                          {opt.badge && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] bg-white/10 text-zinc-300 font-mono">
                              {opt.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-zinc-400 mt-0.5">{opt.description}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-medium text-zinc-300">
                        {opt.priceDelta === 0 ? 'Included' : `+$${opt.priceDelta}`}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= SWITCHES & ACOUSTICS ================= */}
        {activeTab === 'switches' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                  Mechanical Switches
                </h3>
                <p className="text-xs text-zinc-400">
                  Precision hand-lubed switches with Krytox 205g0 and Tribosys 3203.
                </p>
              </div>
              <button
                onClick={onOpenSoundTest}
                className="px-2.5 py-1 rounded bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Lab Test</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {SWITCH_OPTIONS.map((opt) => {
                const isSelected = config.switchType === opt.id;
                return (
                  <div
                    key={opt.id}
                    className={`w-full p-3.5 rounded-lg border transition-all flex flex-col gap-2.5 ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/50 shadow-sm'
                        : 'bg-zinc-900/60 hover:bg-zinc-900 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-6 h-6 rounded-md border border-white/20 flex items-center justify-center shrink-0"
                          style={{ backgroundColor: opt.hex }}
                        >
                          <div className="w-2 h-2 rounded-sm bg-white/70" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-white">{opt.name}</span>
                            {opt.badge && (
                              <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-400/20 text-amber-300 font-mono">
                                {opt.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-zinc-400 mt-0.5">{opt.description}</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-mono font-medium text-zinc-300">
                          {opt.priceDelta === 0 ? 'Included' : `+$${opt.priceDelta}`}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-white/5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSwitchType(opt.id as SwitchType);
                          triggerKeyHit('test');
                        }}
                        className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Tap to audition sound</span>
                      </button>

                      <button
                        onClick={() => setSwitchType(opt.id as SwitchType)}
                        className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                          isSelected
                            ? 'bg-amber-400 text-zinc-950 font-semibold'
                            : 'bg-white/10 hover:bg-white/15 text-zinc-200'
                        }`}
                      >
                        {isSelected ? 'Equipped' : 'Select'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= SWITCH PLATE ================= */}
        {activeTab === 'plate' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                Switch Plate Material
              </h3>
              <p className="text-xs text-zinc-400">
                The plate shapes acoustic stiffness and resonant timbre of your keyboard.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {PLATE_OPTIONS.map((opt) => {
                const isSelected = config.plate === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setPlate(opt.id as PlateType)}
                    className={`group w-full p-3.5 rounded-lg text-left transition-all border flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/50 shadow-sm'
                        : 'bg-zinc-900/60 hover:bg-zinc-900 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div 
                        className="w-7 h-7 rounded border border-white/20 flex items-center justify-center shrink-0"
                        style={{ backgroundColor: opt.hex }}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-white">{opt.name}</span>
                          {opt.badge && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] bg-white/10 text-zinc-300 font-mono">
                              {opt.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-zinc-400 mt-0.5">{opt.description}</p>
                        {opt.acousticNote && (
                          <div className="mt-1 flex items-center gap-1 text-[10px] text-amber-300/80 font-mono">
                            <span className="w-1 h-1 rounded-full bg-amber-400" />
                            {opt.acousticNote}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-medium text-zinc-300">
                        {opt.priceDelta === 0 ? 'Included' : `+$${opt.priceDelta}`}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= PCB & CONTROLLER ================= */}
        {activeTab === 'pcb' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                PCB Architecture
              </h3>
              <p className="text-xs text-zinc-400">
                Choose hot-swap convenience, low-latency tri-mode wireless, or flex-cut audiophile acoustics.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {PCB_OPTIONS.map((opt) => {
                const isSelected = config.pcb === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setPcb(opt.id as PcbType)}
                    className={`group w-full p-3.5 rounded-lg text-left transition-all border flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/50 shadow-sm'
                        : 'bg-zinc-900/60 hover:bg-zinc-900 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-7 h-7 rounded border border-white/20 bg-zinc-800 flex items-center justify-center shrink-0">
                        {isSelected ? (
                          <Check className="w-3.5 h-3.5 text-amber-400" />
                        ) : (
                          <Cpu className="w-3.5 h-3.5 text-zinc-400" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-white">{opt.name}</span>
                          {opt.badge && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] bg-white/10 text-zinc-300 font-mono">
                              {opt.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-zinc-400 mt-0.5">{opt.description}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-medium text-zinc-300">
                        {opt.priceDelta === 0 ? 'Included' : `+$${opt.priceDelta}`}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= ACOUSTIC WEIGHT ================= */}
        {activeTab === 'weight' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                Acoustic Weight Ingot
              </h3>
              <p className="text-xs text-zinc-400">
                Solid metal mass dampening chassis resonance and providing desk stability.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {WEIGHT_OPTIONS.map((opt) => {
                const isSelected = config.weightBar === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setWeightBar(opt.id as WeightBarFinish)}
                    className={`group w-full p-3.5 rounded-lg text-left transition-all border flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/50 shadow-sm'
                        : 'bg-zinc-900/60 hover:bg-zinc-900 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div 
                        className="w-7 h-7 rounded border border-white/20 flex items-center justify-center shrink-0 shadow-inner"
                        style={{ backgroundColor: opt.hex }}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-white">{opt.name}</span>
                          {opt.badge && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] bg-white/10 text-zinc-300 font-mono">
                              {opt.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-zinc-400 mt-0.5">{opt.description}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-medium text-zinc-300">
                        {opt.priceDelta === 0 ? 'Included' : `+$${opt.priceDelta}`}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= COILED AVIATOR CABLE ================= */}
        {activeTab === 'cable' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                Desk Interconnect Cable
              </h3>
              <p className="text-xs text-zinc-400">
                Custom double-sleeved Paracord and Techflex with CNC aviator quick-release.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {CABLE_OPTIONS.map((opt) => {
                const isSelected = config.cable === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setCable(opt.id as CableColor)}
                    className={`group w-full p-3.5 rounded-lg text-left transition-all border flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/50 shadow-sm'
                        : 'bg-zinc-900/60 hover:bg-zinc-900 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-white">{opt.name}</span>
                        {opt.badge && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] bg-amber-400/20 text-amber-300 font-mono">
                            {opt.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-0.5">{opt.description}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-medium text-zinc-300">
                        {opt.priceDelta === 0 ? 'Included' : opt.priceDelta > 0 ? `+$${opt.priceDelta}` : `-$${Math.abs(opt.priceDelta)}`}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= LIGHTING EFFECT ================= */}
        {activeTab === 'lighting' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                Underglow & Halo Ambient
              </h3>
              <p className="text-xs text-zinc-400">
                Architectural halo lighting diffused along perimeter channels.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {LIGHTING_OPTIONS.map((opt) => {
                const isSelected = config.lighting === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setLighting(opt.id as LightingEffect)}
                    className={`group w-full p-3.5 rounded-lg text-left transition-all border flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/50 shadow-sm'
                        : 'bg-zinc-900/60 hover:bg-zinc-900 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div 
                        className="w-5 h-5 rounded-full border border-white/20 shadow-md shrink-0"
                        style={{ backgroundColor: opt.hex }}
                      />
                      <div>
                        <span className="text-xs font-medium text-white">{opt.name}</span>
                        <p className="text-[11px] text-zinc-400 mt-0.5">{opt.description}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-medium text-zinc-300">
                        Included
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= LAYOUT SELECTOR ================= */}
        {activeTab === 'layout' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                Form Factor Layout
              </h3>
              <p className="text-xs text-zinc-400">
                Choose between compact ergonomics and classic function row accessibility.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {[
                {
                  id: '75%',
                  name: '75% Compact with Rotary Encoder',
                  tag: 'Most Popular',
                  description: 'Compact 82-key footprint with dedicated arrow keys, F-row, and volume knob.',
                  basePrice: 219
                },
                {
                  id: '65%',
                  name: '65% Minimalist Pure',
                  tag: 'Ergonomic Space Saver',
                  description: 'Ultra sleek 68-key format maximizing desk area for mouse mobility.',
                  basePrice: 189
                },
                {
                  id: 'TKL',
                  name: 'TKL (Tenkeyless 80%) Classic',
                  tag: 'Full Function Row',
                  description: '87 keys with classic separated navigation island for engineers and writers.',
                  basePrice: 259
                }
              ].map((item) => {
                const isSelected = config.layout === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setLayout(item.id as LayoutType)}
                    className={`w-full p-4 rounded-lg text-left transition-all border flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/50 shadow-sm'
                        : 'bg-zinc-900/60 hover:bg-zinc-900 border-white/5 hover:border-white/15'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">{item.name}</span>
                        <span className="px-1.5 py-0.2 rounded text-[10px] bg-white/10 text-amber-400 font-mono">
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1">{item.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-mono font-semibold text-white">
                        ${item.basePrice}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
