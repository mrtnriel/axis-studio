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
    { id: 'case', label: 'Chassis', icon: <Palette className="w-3.5 h-3.5" /> },
    { id: 'keycaps', label: 'Keycaps', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'switches', label: 'Switches', icon: <Disc className="w-3.5 h-3.5" /> },
    { id: 'plate', label: 'Plate', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'pcb', label: 'PCB', icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: 'weight', label: 'Weight', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'cable', label: 'Cable', icon: <Cable className="w-3.5 h-3.5" /> },
    { id: 'lighting', label: 'Halo', icon: <Sun className="w-3.5 h-3.5" /> },
    { id: 'layout', label: 'Layout', icon: <ToggleRight className="w-3.5 h-3.5" /> }
  ];

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden select-none">
      
      {/* Studio Category Navigation Tabs */}
      <div className="flex items-center gap-1 p-2 bg-[#fafaf9] border-b border-zinc-200 overflow-x-auto no-scrollbar shrink-0">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'bg-white text-zinc-900 border border-zinc-300 font-semibold shadow-none'
                  : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 border border-transparent'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Options Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        
        {/* ================= CASE COLOR & FINISH ================= */}
        {activeTab === 'case' && (
          <div className="space-y-4">
            <div className="border-b border-zinc-200 pb-2">
              <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">
                DWG 01 // CNC BILLET CHASSIS
              </span>
              <h3 className="text-sm font-semibold text-zinc-900 tracking-tight mt-0.5">
                Chassis Material & Finish
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Aerospace-grade 6063 aluminum anodization or frosted optical polycarbonate.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {CASE_OPTIONS.map((opt) => {
                const isSelected = config.caseColor === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setCaseColor(opt.id as CaseColor)}
                    className={`w-full p-3.5 text-left transition-colors border flex items-center justify-between cursor-pointer active:scale-[0.99] ${
                      isSelected
                        ? 'bg-white border-zinc-900 ring-1 ring-zinc-900'
                        : 'bg-[#fafaf9] hover:bg-white border-zinc-200 hover:border-zinc-400'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div 
                        className="w-6 h-6 border border-zinc-300 flex items-center justify-center shrink-0"
                        style={{ backgroundColor: opt.hex }}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-zinc-900 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-zinc-900">{opt.name}</span>
                          {opt.badge && (
                            <span className="px-1.5 py-0.5 text-[9.5px] bg-zinc-100 border border-zinc-200 text-zinc-600 font-mono">
                              {opt.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-zinc-500 mt-0.5">{opt.description}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-medium text-zinc-700">
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
            <div className="border-b border-zinc-200 pb-2">
              <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">
                DWG 02 // KEYCAP PROFILE
              </span>
              <h3 className="text-sm font-semibold text-zinc-900 tracking-tight mt-0.5">
                Double-Shot PBT Keycaps
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                1.5mm thick double-shot keycaps with dye-sub legends and deep dish ergonomics.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {KEYCAP_OPTIONS.map((opt) => {
                const isSelected = config.keycaps === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setKeycaps(opt.id as KeycapColorway)}
                    className={`w-full p-3.5 text-left transition-colors border flex items-center justify-between cursor-pointer active:scale-[0.99] ${
                      isSelected
                        ? 'bg-white border-zinc-900 ring-1 ring-zinc-900'
                        : 'bg-[#fafaf9] hover:bg-white border-zinc-200 hover:border-zinc-400'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-6 h-6 border border-zinc-300 overflow-hidden flex shrink-0">
                        <div className="w-1/2 h-full" style={{ backgroundColor: opt.hex }} />
                        <div className="w-1/2 h-full" style={{ backgroundColor: opt.secondaryHex || opt.hex }} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-zinc-900">{opt.name}</span>
                          {opt.badge && (
                            <span className="px-1.5 py-0.5 text-[9.5px] bg-zinc-100 border border-zinc-200 text-zinc-600 font-mono">
                              {opt.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-zinc-500 mt-0.5">{opt.description}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-medium text-zinc-700">
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
            <div className="flex items-end justify-between border-b border-zinc-200 pb-2">
              <div>
                <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">
                  DWG 03 // ACOUSTIC ACTUATORS
                </span>
                <h3 className="text-sm font-semibold text-zinc-900 tracking-tight mt-0.5">
                  Mechanical Switches
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Hand-lubed stem and rail guides with Krytox 205g0.
                </p>
              </div>
              <button
                onClick={onOpenSoundTest}
                className="px-2.5 py-1 bg-white hover:bg-zinc-100 border border-zinc-300 text-zinc-800 text-[11px] font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Lab Test</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {SWITCH_OPTIONS.map((opt) => {
                const isSelected = config.switchType === opt.id;
                return (
                  <div
                    key={opt.id}
                    className={`w-full p-3.5 border transition-colors flex flex-col gap-2.5 ${
                      isSelected
                        ? 'bg-white border-zinc-900 ring-1 ring-zinc-900'
                        : 'bg-[#fafaf9] hover:bg-white border-zinc-200 hover:border-zinc-400'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-5 h-5 border border-zinc-300 flex items-center justify-center shrink-0"
                          style={{ backgroundColor: opt.hex }}
                        >
                          <div className="w-1.5 h-1.5 bg-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-zinc-900">{opt.name}</span>
                            {opt.badge && (
                              <span className="px-1.5 py-0.5 text-[9.5px] bg-zinc-100 border border-zinc-200 text-zinc-600 font-mono">
                                {opt.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-zinc-500 mt-0.5">{opt.description}</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-mono font-medium text-zinc-700">
                          {opt.priceDelta === 0 ? 'Included' : `+$${opt.priceDelta}`}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-zinc-200">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSwitchType(opt.id as SwitchType);
                          triggerKeyHit('test');
                        }}
                        className="text-[11px] font-mono text-zinc-600 hover:text-black flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-zinc-600" />
                        <span>Audition sound</span>
                      </button>

                      <button
                        onClick={() => setSwitchType(opt.id as SwitchType)}
                        className={`px-3 py-1 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-zinc-900 text-white font-medium'
                            : 'bg-white border border-zinc-300 text-zinc-700 hover:bg-zinc-100'
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
            <div className="border-b border-zinc-200 pb-2">
              <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">
                DWG 04 // STRUCTURAL PLATE
              </span>
              <h3 className="text-sm font-semibold text-zinc-900 tracking-tight mt-0.5">
                Switch Plate Material
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Shapes the acoustic stiffness and resonant timbre of your keyboard.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {PLATE_OPTIONS.map((opt) => {
                const isSelected = config.plate === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setPlate(opt.id as PlateType)}
                    className={`w-full p-3.5 text-left transition-colors border flex items-center justify-between cursor-pointer active:scale-[0.99] ${
                      isSelected
                        ? 'bg-white border-zinc-900 ring-1 ring-zinc-900'
                        : 'bg-[#fafaf9] hover:bg-white border-zinc-200 hover:border-zinc-400'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div 
                        className="w-6 h-6 border border-zinc-300 flex items-center justify-center shrink-0"
                        style={{ backgroundColor: opt.hex }}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-zinc-900 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-zinc-900">{opt.name}</span>
                          {opt.badge && (
                            <span className="px-1.5 py-0.5 text-[9.5px] bg-zinc-100 border border-zinc-200 text-zinc-600 font-mono">
                              {opt.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-zinc-500 mt-0.5">{opt.description}</p>
                        {opt.acousticNote && (
                          <div className="mt-1 flex items-center gap-1 text-[10px] text-zinc-600 font-mono">
                            <span>TIMBRE:</span>
                            <span>{opt.acousticNote}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-medium text-zinc-700">
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
            <div className="border-b border-zinc-200 pb-2">
              <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">
                DWG 05 // LOGIC ARCHITECTURE
              </span>
              <h3 className="text-sm font-semibold text-zinc-900 tracking-tight mt-0.5">
                PCB & Controller Architecture
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Hot-swap sockets, tri-mode wireless, or flex-cut audiophile acoustics.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {PCB_OPTIONS.map((opt) => {
                const isSelected = config.pcb === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setPcb(opt.id as PcbType)}
                    className={`w-full p-3.5 text-left transition-colors border flex items-center justify-between cursor-pointer active:scale-[0.99] ${
                      isSelected
                        ? 'bg-white border-zinc-900 ring-1 ring-zinc-900'
                        : 'bg-[#fafaf9] hover:bg-white border-zinc-200 hover:border-zinc-400'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-6 h-6 border border-zinc-300 bg-zinc-100 flex items-center justify-center shrink-0">
                        {isSelected ? (
                          <Check className="w-3.5 h-3.5 text-zinc-900 stroke-[3]" />
                        ) : (
                          <Cpu className="w-3.5 h-3.5 text-zinc-500" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-zinc-900">{opt.name}</span>
                          {opt.badge && (
                            <span className="px-1.5 py-0.5 text-[9.5px] bg-zinc-100 border border-zinc-200 text-zinc-600 font-mono">
                              {opt.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-zinc-500 mt-0.5">{opt.description}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-medium text-zinc-700">
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
            <div className="border-b border-zinc-200 pb-2">
              <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">
                DWG 06 // DENSITY MASS
              </span>
              <h3 className="text-sm font-semibold text-zinc-900 tracking-tight mt-0.5">
                Acoustic Weight Ingot
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                High-density ballast bar dampening desk harmonics.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {WEIGHT_OPTIONS.map((opt) => {
                const isSelected = config.weightBar === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setWeightBar(opt.id as WeightBarFinish)}
                    className={`w-full p-3.5 text-left transition-colors border flex items-center justify-between cursor-pointer active:scale-[0.99] ${
                      isSelected
                        ? 'bg-white border-zinc-900 ring-1 ring-zinc-900'
                        : 'bg-[#fafaf9] hover:bg-white border-zinc-200 hover:border-zinc-400'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div 
                        className="w-6 h-6 border border-zinc-300 flex items-center justify-center shrink-0"
                        style={{ backgroundColor: opt.hex }}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-zinc-900 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-zinc-900">{opt.name}</span>
                          {opt.badge && (
                            <span className="px-1.5 py-0.5 text-[9.5px] bg-zinc-100 border border-zinc-200 text-zinc-600 font-mono">
                              {opt.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-zinc-500 mt-0.5">{opt.description}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-medium text-zinc-700">
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
            <div className="border-b border-zinc-200 pb-2">
              <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">
                DWG 07 // INTERCONNECT
              </span>
              <h3 className="text-sm font-semibold text-zinc-900 tracking-tight mt-0.5">
                Desk Interconnect Cable
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Double-sleeved Paracord and Techflex with CNC aviator quick-release.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {CABLE_OPTIONS.map((opt) => {
                const isSelected = config.cable === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setCable(opt.id as CableColor)}
                    className={`w-full p-3.5 text-left transition-colors border flex items-center justify-between cursor-pointer active:scale-[0.99] ${
                      isSelected
                        ? 'bg-white border-zinc-900 ring-1 ring-zinc-900'
                        : 'bg-[#fafaf9] hover:bg-white border-zinc-200 hover:border-zinc-400'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-zinc-900">{opt.name}</span>
                        {opt.badge && (
                          <span className="px-1.5 py-0.5 text-[9.5px] bg-zinc-100 border border-zinc-200 text-zinc-600 font-mono">
                            {opt.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-500 mt-0.5">{opt.description}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-medium text-zinc-700">
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
            <div className="border-b border-zinc-200 pb-2">
              <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">
                DWG 08 // DIFFUSION
              </span>
              <h3 className="text-sm font-semibold text-zinc-900 tracking-tight mt-0.5">
                Underglow & Halo Ambient
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Architectural halo lighting diffused along perimeter channels.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {LIGHTING_OPTIONS.map((opt) => {
                const isSelected = config.lighting === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setLighting(opt.id as LightingEffect)}
                    className={`w-full p-3.5 text-left transition-colors border flex items-center justify-between cursor-pointer active:scale-[0.99] ${
                      isSelected
                        ? 'bg-white border-zinc-900 ring-1 ring-zinc-900'
                        : 'bg-[#fafaf9] hover:bg-white border-zinc-200 hover:border-zinc-400'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div 
                        className="w-5 h-5 border border-zinc-300 shrink-0"
                        style={{ backgroundColor: opt.hex }}
                      />
                      <div>
                        <span className="text-xs font-medium text-zinc-900">{opt.name}</span>
                        <p className="text-[11px] text-zinc-500 mt-0.5">{opt.description}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-medium text-zinc-700">
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
            <div className="border-b border-zinc-200 pb-2">
              <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">
                DWG 09 // FORM FACTOR
              </span>
              <h3 className="text-sm font-semibold text-zinc-900 tracking-tight mt-0.5">
                Footprint & Key Layout
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Select form factor geometry to configure footprint and key count.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
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
                    className={`w-full p-4 text-left transition-colors border flex items-center justify-between cursor-pointer active:scale-[0.99] ${
                      isSelected
                        ? 'bg-white border-zinc-900 ring-1 ring-zinc-900'
                        : 'bg-[#fafaf9] hover:bg-white border-zinc-200 hover:border-zinc-400'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-zinc-900">{item.name}</span>
                        <span className="px-1.5 py-0.5 text-[9.5px] bg-zinc-100 border border-zinc-200 text-zinc-600 font-mono">
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 mt-1">{item.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-mono font-medium text-zinc-900">
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
