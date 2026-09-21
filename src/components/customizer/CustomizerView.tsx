import React, { useState } from 'react';
import { KeyboardScene } from '../3d/Scene';
import { ComponentSelector } from './ComponentSelector';
import { ConfigSummaryBar } from './ConfigSummaryBar';
import { 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  Sliders, 
  Eye, 
  ChevronLeft,
  Focus
} from 'lucide-react';
import { useCustomizer } from '../../context/CustomizerContext';

interface CustomizerViewProps {
  onOpenSoundTest: () => void;
}

export const CustomizerView: React.FC<CustomizerViewProps> = ({ onOpenSoundTest }) => {
  const { isMuted, toggleMuted, isExploded, resetCameraView } = useCustomizer();
  
  // Theater / Full-screen 3D view toggle
  const [isMaximized3D, setIsMaximized3D] = useState(false);
  // Mobile active tab ('view3d' | 'options')
  const [mobileTab, setMobileTab] = useState<'view3d' | 'options'>('view3d');

  return (
    <div className="flex-1 flex flex-col h-[calc(100dvh-4rem)] md:h-[calc(100dvh-5rem)] overflow-hidden bg-[#fafaf9]">
      
      {/* Mobile Segmented Switcher (Visible only on screens < lg) */}
      <div className="flex lg:hidden items-center justify-center p-2 bg-white border-b border-zinc-200 shrink-0 z-30">
        <div className="flex p-0.5 bg-[#fafaf9] border border-zinc-200 w-full max-w-xs">
          <button
            onClick={() => setMobileTab('view3d')}
            className={`flex-1 py-1.5 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors ${
              mobileTab === 'view3d'
                ? 'bg-zinc-900 text-white font-medium'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>3D Stage</span>
          </button>
          <button
            onClick={() => setMobileTab('options')}
            className={`flex-1 py-1.5 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors ${
              mobileTab === 'options'
                ? 'bg-zinc-900 text-white font-medium'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Specs & BOM</span>
          </button>
        </div>
      </div>

      {/* Main CAD Workspace Split */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden relative">
        
        {/* Left / Center: Interactive 3D Canvas Viewport */}
        <div 
          className={`relative overflow-hidden bg-[#fafaf9] transition-all duration-300 min-h-[440px] lg:min-h-0 blueprint-grid-fine ${
            mobileTab === 'view3d' ? 'flex-1 h-full flex flex-col' : 'hidden lg:flex lg:flex-col lg:flex-1'
          } ${
            isMaximized3D ? 'lg:flex-1 lg:w-full' : 'lg:flex-1'
          }`}
        >
          {/* Blueprint Corner Registration Marks */}
          <div className="absolute top-3 left-3 text-[11px] font-mono text-zinc-400 select-none pointer-events-none z-10">+</div>
          <div className="absolute top-3 right-3 text-[11px] font-mono text-zinc-400 select-none pointer-events-none z-10">+</div>
          <div className="absolute bottom-3 left-3 text-[11px] font-mono text-zinc-400 select-none pointer-events-none z-10">+</div>
          <div className="absolute bottom-3 right-3 text-[11px] font-mono text-zinc-400 select-none pointer-events-none z-10">+</div>

          {/* 3D Scene Container */}
          <div className="absolute inset-0 w-full h-full">
            <KeyboardScene />
          </div>

          {/* Architectural Drawing Metadata - Top Left */}
          <div className="absolute top-4 left-5 flex flex-col gap-1.5 z-20 pointer-events-none select-none">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-700 bg-white/90 border border-zinc-200 px-2 py-0.5">
                DWG // CAD WORKBENCH
              </span>
              <span className="text-[9.5px] font-mono uppercase tracking-wider text-zinc-700 hidden sm:inline">
                SCALE 1:1 ORTHO
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-zinc-700">
              <span>DRAG TO ORBIT</span>
              <span>/</span>
              <span>SCROLL TO ZOOM</span>
              <span>/</span>
              <span>CLICK TO AUDITION</span>
            </div>
          </div>

          {/* Floating Top Right Action Strip */}
          <div className="absolute top-4 right-5 flex items-center gap-2 z-20">
            {/* Maximize / Expand 3D Viewport Toggle */}
            <button
              onClick={() => setIsMaximized3D(prev => !prev)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-white/90 hover:bg-white text-zinc-700 hover:text-black border border-zinc-200 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer active:scale-[0.98]"
              title={isMaximized3D ? 'Show side specification panel' : 'Maximize 3D Viewport'}
            >
              {isMaximized3D ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-zinc-700" />
                  <span>Split</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-zinc-700" />
                  <span>Expand</span>
                </>
              )}
            </button>

            {/* Fit / Re-center Framing */}
            <button
              onClick={resetCameraView}
              className="px-3 py-1.5 bg-white/90 hover:bg-white text-zinc-700 hover:text-black border border-zinc-200 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors active:scale-[0.98] cursor-pointer"
              title="Reset 3D camera to optimal prominent framing"
            >
              <Focus className="w-3.5 h-3.5 text-zinc-700" />
              <span className="hidden sm:inline">Fit</span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={toggleMuted}
              className="p-1.5 bg-white/90 hover:bg-white text-zinc-700 hover:text-black border border-zinc-200 transition-colors active:scale-[0.98] cursor-pointer"
              title={isMuted ? 'Unmute typing sound' : 'Mute typing sound'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-zinc-400" /> : <Volume2 className="w-4 h-4 text-zinc-800" />}
            </button>
          </div>

          {/* Floating Side Drawer Trigger in Maximized Mode */}
          {isMaximized3D && (
            <div className="absolute bottom-6 right-6 z-20 hidden lg:block">
              <button
                onClick={() => setIsMaximized3D(false)}
                className="px-4 py-2.5 bg-zinc-900 hover:bg-black text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer active:scale-[0.98]"
              >
                <Sliders className="w-4 h-4" />
                <span>Open Specifications</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Floating Bottom Exploded View Notice */}
          {isExploded && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-20">
              <div className="px-3.5 py-1 bg-white/95 border border-zinc-300 text-zinc-900 text-[11px] font-mono uppercase tracking-wider shadow-sm">
                + EXPLODED COMPONENT SPECIFICATION STACK ACTIVE
              </div>
            </div>
          )}

        </div>

        {/* Right: Component Customization Controls Panel */}
        <div 
          className={`shrink-0 flex flex-col z-20 transition-all duration-300 border-l border-zinc-200 ${
            mobileTab === 'options' ? 'flex-1 h-full w-full' : 'hidden lg:flex'
          } ${
            isMaximized3D ? 'hidden' : 'w-full lg:w-[390px] xl:w-[430px] h-full'
          }`}
        >
          <ComponentSelector onOpenSoundTest={onOpenSoundTest} />
        </div>

      </div>

      {/* Bottom Persistent Summary & Action Bar */}
      <ConfigSummaryBar />

    </div>
  );
};
