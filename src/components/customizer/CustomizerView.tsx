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
    <div className="flex-1 flex flex-col h-[calc(100dvh-4rem)] md:h-[calc(100dvh-5rem)] overflow-hidden bg-[#070709]">
      
      {/* Mobile Segmented Switcher (Visible only on screens < lg) */}
      <div className="flex lg:hidden items-center justify-center p-2 bg-[#090a0d] border-b border-white/5 shrink-0 z-30">
        <div className="flex p-0.5 rounded-lg bg-zinc-900 border border-white/10 w-full max-w-xs">
          <button
            onClick={() => setMobileTab('view3d')}
            className={`flex-1 py-1.5 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              mobileTab === 'view3d'
                ? 'bg-amber-400 text-zinc-950 shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>3D Viewport</span>
          </button>
          <button
            onClick={() => setMobileTab('options')}
            className={`flex-1 py-1.5 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              mobileTab === 'options'
                ? 'bg-amber-400 text-zinc-950 shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Customize Specs</span>
          </button>
        </div>
      </div>

      {/* Main Workspace Split */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden relative">
        
        {/* Left / Center: Interactive 3D Canvas Viewport */}
        <div 
          className={`relative overflow-hidden bg-radial from-[#131520] to-[#070709] transition-all duration-300 min-h-[440px] lg:min-h-0 ${
            mobileTab === 'view3d' ? 'flex-1 h-full flex flex-col' : 'hidden lg:flex lg:flex-col lg:flex-1'
          } ${
            isMaximized3D ? 'lg:flex-1 lg:w-full' : 'lg:flex-1'
          }`}
        >
          {/* 3D Scene Container - absolute inset-0 guarantees full container dimensions for WebGL canvas */}
          <div className="absolute inset-0 w-full h-full">
            <KeyboardScene />
          </div>

          {/* Floating Top Left Controls */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-20 pointer-events-auto">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono text-zinc-200 font-semibold uppercase tracking-wider bg-black/75 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 shadow-lg">
                Interactive 3D Stage
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/5 text-[11px] text-zinc-400">
              <span>Rotate 360&deg;</span>
              <span>&bull;</span>
              <span>Scroll to Zoom</span>
              <span>&bull;</span>
              <span>Click keys to audition</span>
            </div>
          </div>

          {/* Floating Top Right Action Strip */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
            {/* Maximize / Expand 3D Viewport Toggle */}
            <button
              onClick={() => setIsMaximized3D(prev => !prev)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-black/70 hover:bg-black/95 backdrop-blur-md text-zinc-200 hover:text-white border border-white/10 text-xs font-medium shadow-xl transition-all cursor-pointer"
              title={isMaximized3D ? 'Show side customization panel' : 'Maximize 3D Viewport'}
            >
              {isMaximized3D ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Split View</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Theater Mode</span>
                </>
              )}
            </button>

            {/* Fit / Re-center Framing */}
            <button
              onClick={resetCameraView}
              className="px-3 py-1.5 rounded-md bg-black/70 hover:bg-black/95 backdrop-blur-md text-zinc-200 hover:text-white border border-white/10 text-xs font-medium flex items-center gap-1.5 shadow-xl transition-all active:scale-[0.98] cursor-pointer"
              title="Reset 3D camera to optimal prominent framing"
            >
              <Focus className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Fit View</span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={toggleMuted}
              className="p-1.5 rounded-md bg-black/70 hover:bg-black/95 backdrop-blur-md text-zinc-200 hover:text-white border border-white/10 text-xs shadow-xl transition-all active:scale-[0.98] cursor-pointer"
              title={isMuted ? 'Unmute typing sound' : 'Mute typing sound'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-zinc-500" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
            </button>
          </div>

          {/* Floating Side Drawer Trigger in Maximized Mode */}
          {isMaximized3D && (
            <div className="absolute bottom-6 right-6 z-20 hidden lg:block">
              <button
                onClick={() => setIsMaximized3D(false)}
                className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-2xl shadow-amber-500/20 transition-all cursor-pointer"
              >
                <Sliders className="w-4 h-4" />
                <span>Customize Options</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Floating Bottom Exploded View Notice */}
          {isExploded && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-20">
              <div className="px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/50 backdrop-blur-md text-amber-300 text-xs font-mono font-medium shadow-xl">
                Exploded Architecture View Active
              </div>
            </div>
          )}

        </div>

        {/* Right: Component Customization Controls Panel */}
        <div 
          className={`shrink-0 flex flex-col z-20 transition-all duration-300 ${
            mobileTab === 'options' ? 'flex-1 h-full w-full' : 'hidden lg:flex'
          } ${
            isMaximized3D ? 'hidden' : 'w-full lg:w-[380px] xl:w-[420px] h-full'
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
