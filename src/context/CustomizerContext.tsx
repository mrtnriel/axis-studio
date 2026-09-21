import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import type { 
  KeyboardCustomization, 
  LayoutType, 
  CaseColor, 
  PlateType, 
  SwitchType, 
  KeycapColorway, 
  WeightBarFinish, 
  CableColor, 
  LightingEffect,
  PcbType 
} from '../types';
import { 
  CASE_OPTIONS, 
  PLATE_OPTIONS, 
  SWITCH_OPTIONS, 
  KEYCAP_OPTIONS, 
  WEIGHT_OPTIONS, 
  CABLE_OPTIONS,
  PCB_OPTIONS 
} from '../data/customizerOptions';
import { soundEngine } from '../components/audio/soundEngine';

export type CameraPreset = 'iso' | 'top' | 'side' | 'exploded' | 'front';

interface CustomizerContextType {
  config: KeyboardCustomization;
  totalPrice: number;
  priceBreakdown: {
    base: number;
    caseDelta: number;
    plateDelta: number;
    switchDelta: number;
    keycapsDelta: number;
    weightDelta: number;
    cableDelta: number;
    pcbDelta: number;
    total: number;
  };
  cameraPreset: CameraPreset;
  setCameraPreset: (preset: CameraPreset) => void;
  isExploded: boolean;
  setIsExploded: (exploded: boolean | ((prev: boolean) => boolean)) => void;
  pressedKey: string | null;
  triggerKeyHit: (keyChar?: string) => void;
  isMuted: boolean;
  toggleMuted: () => void;
  setCaseColor: (color: CaseColor) => void;
  setPlate: (plate: PlateType) => void;
  setSwitchType: (switchType: SwitchType) => void;
  setKeycaps: (keycaps: KeycapColorway) => void;
  setWeightBar: (weight: WeightBarFinish) => void;
  setCable: (cable: CableColor) => void;
  setLighting: (lighting: LightingEffect) => void;
  setPcb: (pcb: PcbType) => void;
  setLayout: (layout: LayoutType) => void;
  loadPreset: (customization: Partial<KeyboardCustomization>) => void;
  resetDefaults: () => void;
  resetCameraTrigger: number;
  resetCameraView: () => void;
}

const DEFAULT_CONFIG: KeyboardCustomization = {
  id: 'custom-build-1',
  name: 'Apex75 Custom Bespoke',
  layout: '75%',
  caseColor: 'black',
  plate: 'fr4',
  switchType: 'linear',
  keycaps: 'kuro',
  weightBar: 'brass',
  cable: 'matching',
  lighting: 'amber',
  pcb: 'hotswap-rgb',
  basePrice: 219
};

const CustomizerContext = createContext<CustomizerContextType | undefined>(undefined);

export const CustomizerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<KeyboardCustomization>(DEFAULT_CONFIG);
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('iso');
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [resetCameraTrigger, setResetCameraTrigger] = useState<number>(0);

  const resetCameraView = useCallback(() => {
    setResetCameraTrigger(prev => prev + 1);
  }, []);

  const priceBreakdown = useMemo(() => {
    const caseOpt = CASE_OPTIONS.find(c => c.id === config.caseColor);
    const plateOpt = PLATE_OPTIONS.find(p => p.id === config.plate);
    const switchOpt = SWITCH_OPTIONS.find(s => s.id === config.switchType);
    const keycapsOpt = KEYCAP_OPTIONS.find(k => k.id === config.keycaps);
    const weightOpt = WEIGHT_OPTIONS.find(w => w.id === config.weightBar);
    const cableOpt = CABLE_OPTIONS.find(cb => cb.id === config.cable);
    const pcbOpt = PCB_OPTIONS.find(p => p.id === config.pcb);

    const base = config.basePrice;
    const caseDelta = caseOpt?.priceDelta || 0;
    const plateDelta = plateOpt?.priceDelta || 0;
    const switchDelta = switchOpt?.priceDelta || 0;
    const keycapsDelta = keycapsOpt?.priceDelta || 0;
    const weightDelta = weightOpt?.priceDelta || 0;
    const cableDelta = cableOpt?.priceDelta || 0;
    const pcbDelta = pcbOpt?.priceDelta || 0;

    const total = base + caseDelta + plateDelta + switchDelta + keycapsDelta + weightDelta + cableDelta + pcbDelta;

    return {
      base,
      caseDelta,
      plateDelta,
      switchDelta,
      keycapsDelta,
      weightDelta,
      cableDelta,
      pcbDelta,
      total
    };
  }, [config]);

  const triggerKeyHit = useCallback((keyChar?: string) => {
    const key = keyChar || 'Space';
    setPressedKey(key);
    soundEngine.playKeyStroke(config.switchType, config.plate);

    setTimeout(() => {
      setPressedKey(null);
    }, 120);
  }, [config.switchType, config.plate]);

  const toggleMuted = useCallback(() => {
    setIsMuted(prev => {
      const next = !prev;
      soundEngine.setMuted(next);
      return next;
    });
  }, []);

  const setCaseColor = useCallback((caseColor: CaseColor) => {
    setConfig(prev => ({ ...prev, caseColor }));
  }, []);

  const setPlate = useCallback((plate: PlateType) => {
    setConfig(prev => ({ ...prev, plate }));
  }, []);

  const setSwitchType = useCallback((switchType: SwitchType) => {
    setConfig(prev => ({ ...prev, switchType }));
  }, []);

  const setKeycaps = useCallback((keycaps: KeycapColorway) => {
    setConfig(prev => ({ ...prev, keycaps }));
  }, []);

  const setWeightBar = useCallback((weightBar: WeightBarFinish) => {
    setConfig(prev => ({ ...prev, weightBar }));
  }, []);

  const setCable = useCallback((cable: CableColor) => {
    setConfig(prev => ({ ...prev, cable }));
  }, []);

  const setLighting = useCallback((lighting: LightingEffect) => {
    setConfig(prev => ({ ...prev, lighting }));
  }, []);

  const setPcb = useCallback((pcb: PcbType) => {
    setConfig(prev => ({ ...prev, pcb }));
  }, []);

  const setLayout = useCallback((layout: LayoutType) => {
    const layoutPrices: Record<LayoutType, number> = {
      '65%': 189,
      '75%': 219,
      'TKL': 259,
      'Pad': 89
    };
    setConfig(prev => ({
      ...prev,
      layout,
      basePrice: layoutPrices[layout] || 219
    }));
  }, []);

  const loadPreset = useCallback((preset: Partial<KeyboardCustomization>) => {
    setConfig(prev => ({
      ...prev,
      ...preset,
      basePrice: preset.basePrice ?? prev.basePrice
    }));
  }, []);

  const resetDefaults = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
    setCameraPreset('iso');
    setIsExploded(false);
  }, []);

  const value = useMemo(() => ({
    config,
    totalPrice: priceBreakdown.total,
    priceBreakdown,
    cameraPreset,
    setCameraPreset,
    isExploded,
    setIsExploded,
    pressedKey,
    triggerKeyHit,
    isMuted,
    toggleMuted,
    setCaseColor,
    setPlate,
    setSwitchType,
    setKeycaps,
    setWeightBar,
    setCable,
    setLighting,
    setPcb,
    setLayout,
    loadPreset,
    resetDefaults,
    resetCameraTrigger,
    resetCameraView
  }), [
    config,
    priceBreakdown,
    cameraPreset,
    isExploded,
    pressedKey,
    triggerKeyHit,
    isMuted,
    toggleMuted,
    setCaseColor,
    setPlate,
    setSwitchType,
    setKeycaps,
    setWeightBar,
    setCable,
    setLighting,
    setPcb,
    setLayout,
    loadPreset,
    resetDefaults,
    resetCameraTrigger,
    resetCameraView
  ]);

  return (
    <CustomizerContext.Provider value={value}>
      {children}
    </CustomizerContext.Provider>
  );
};

export const useCustomizer = () => {
  const context = useContext(CustomizerContext);
  if (!context) {
    throw new Error('useCustomizer must be used within a CustomizerProvider');
  }
  return context;
};
