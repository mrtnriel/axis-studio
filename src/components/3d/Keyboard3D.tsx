import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useCustomizer } from '../../context/CustomizerContext';
import type { 
  CaseColor, 
  PlateType, 
  SwitchType, 
  KeycapColorway, 
  WeightBarFinish, 
  LightingEffect 
} from '../../types';

interface KeyDef {
  id: string;
  label: string;
  w: number;
  x: number;
  z: number;
  row: number;
  isAccent?: boolean;
  isModifier?: boolean;
  isSpace?: boolean;
}

// Generate keyboard layout keys based on selected layout
function generateKeys(layout: string): KeyDef[] {
  const keys: KeyDef[] = [];
  const u = 0.96;

  // Row 0: Function Row (Present on 75% and TKL)
  if (layout === '75%' || layout === 'TKL') {
    const z0 = -2.6;
    keys.push({ id: 'Esc', label: 'ESC', w: 1, x: -7.0 * u, z: z0, row: 0, isAccent: true });
    
    for (let i = 1; i <= 4; i++) {
      keys.push({ id: `F${i}`, label: `F${i}`, w: 1, x: (-6.5 + i) * u, z: z0, row: 0 });
    }
    for (let i = 5; i <= 8; i++) {
      keys.push({ id: `F${i}`, label: `F${i}`, w: 1, x: (-6.0 + i) * u, z: z0, row: 0 });
    }
    for (let i = 9; i <= 12; i++) {
      keys.push({ id: `F${i}`, label: `F${i}`, w: 1, x: (-5.5 + i) * u, z: z0, row: 0 });
    }
    if (layout === '75%') {
      keys.push({ id: 'Del', label: 'DEL', w: 1, x: 7.2 * u, z: z0, row: 0, isModifier: true });
    } else if (layout === 'TKL') {
      keys.push({ id: 'Prt', label: 'PRT', w: 1, x: 7.4 * u, z: z0, row: 0, isModifier: true });
      keys.push({ id: 'Scr', label: 'SCR', w: 1, x: 8.5 * u, z: z0, row: 0, isModifier: true });
      keys.push({ id: 'Pau', label: 'PAU', w: 1, x: 9.6 * u, z: z0, row: 0, isModifier: true });
    }
  }

  // Row 1: Number Row
  const z1 = -1.6;
  keys.push({ id: 'Tilde', label: '~', w: 1, x: -7.0 * u, z: z1, row: 1 });
  const nums = ['1','2','3','4','5','6','7','8','9','0','-','='];
  nums.forEach((n, i) => {
    keys.push({ id: `num-${n}`, label: n, w: 1, x: (-6.0 + i) * u, z: z1, row: 1 });
  });
  keys.push({ id: 'Backspace', label: 'BKSP', w: 2, x: 6.5 * u, z: z1, row: 1, isModifier: true });
  if (layout === '75%') {
    keys.push({ id: 'Home', label: 'HOME', w: 1, x: 7.8 * u, z: z1, row: 1, isModifier: true });
  } else if (layout === 'TKL') {
    keys.push({ id: 'Ins', label: 'INS', w: 1, x: 8.4 * u, z: z1, row: 1, isModifier: true });
    keys.push({ id: 'Home', label: 'HOM', w: 1, x: 9.5 * u, z: z1, row: 1, isModifier: true });
    keys.push({ id: 'PgUp', label: 'PGU', w: 1, x: 10.6 * u, z: z1, row: 1, isModifier: true });
  }

  // Row 2: QWERTY Row
  const z2 = -0.6;
  keys.push({ id: 'Tab', label: 'TAB', w: 1.5, x: -6.75 * u, z: z2, row: 2, isModifier: true });
  const rowQ = ['Q','W','E','R','T','Y','U','I','O','P','[',']'];
  rowQ.forEach((letter, i) => {
    keys.push({ id: `key-${letter}`, label: letter, w: 1, x: (-5.5 + i) * u, z: z2, row: 2 });
  });
  keys.push({ id: 'Pipe', label: '\\', w: 1.5, x: 6.75 * u, z: z2, row: 2 });
  if (layout === '75%') {
    keys.push({ id: 'PgUp', label: 'PGUP', w: 1, x: 7.8 * u, z: z2, row: 2, isModifier: true });
  } else if (layout === 'TKL') {
    keys.push({ id: 'Del', label: 'DEL', w: 1, x: 8.4 * u, z: z2, row: 2, isModifier: true });
    keys.push({ id: 'End', label: 'END', w: 1, x: 9.5 * u, z: z2, row: 2, isModifier: true });
    keys.push({ id: 'PgDn', label: 'PGD', w: 1, x: 10.6 * u, z: z2, row: 2, isModifier: true });
  }

  // Row 3: ASDF Row
  const z3 = 0.4;
  keys.push({ id: 'Caps', label: 'CAPS', w: 1.75, x: -6.6 * u, z: z3, row: 3, isModifier: true });
  const rowA = ['A','S','D','F','G','H','J','K','L',';','\''];
  rowA.forEach((letter, i) => {
    keys.push({ id: `key-${letter}`, label: letter, w: 1, x: (-5.2 + i) * u, z: z3, row: 3 });
  });
  keys.push({ id: 'Enter', label: 'ENTER', w: 2.25, x: 6.4 * u, z: z3, row: 3, isAccent: true });
  if (layout === '75%') {
    keys.push({ id: 'PgDn', label: 'PGDN', w: 1, x: 7.8 * u, z: z3, row: 3, isModifier: true });
  }

  // Row 4: ZXCV Row
  const z4 = 1.4;
  keys.push({ id: 'LShift', label: 'SHIFT', w: 2.25, x: -6.35 * u, z: z4, row: 4, isModifier: true });
  const rowZ = ['Z','X','C','V','B','N','M',',','.','/'];
  rowZ.forEach((letter, i) => {
    keys.push({ id: `key-${letter}`, label: letter, w: 1, x: (-4.7 + i) * u, z: z4, row: 4 });
  });
  keys.push({ id: 'RShift', label: 'SHIFT', w: 1.75, x: 5.7 * u, z: z4, row: 4, isModifier: true });
  keys.push({ id: 'Up', label: '▲', w: 1, x: 7.0 * u, z: z4, row: 4, isModifier: true });
  if (layout === '75%') {
    keys.push({ id: 'End', label: 'END', w: 1, x: 7.8 * u, z: z4, row: 4, isModifier: true });
  }

  // Row 5: Spacebar Row
  const z5 = 2.4;
  keys.push({ id: 'LCtrl', label: 'CTRL', w: 1.25, x: -6.85 * u, z: z5, row: 5, isModifier: true });
  keys.push({ id: 'LWin', label: 'WIN', w: 1.25, x: -5.6 * u, z: z5, row: 5, isModifier: true });
  keys.push({ id: 'LAlt', label: 'ALT', w: 1.25, x: -4.35 * u, z: z5, row: 5, isModifier: true });
  keys.push({ id: 'Space', label: 'SPACEBAR', w: 6.25, x: -0.5 * u, z: z5, row: 5, isSpace: true });
  keys.push({ id: 'RAlt', label: 'ALT', w: 1.25, x: 3.35 * u, z: z5, row: 5, isModifier: true });
  keys.push({ id: 'Fn', label: 'FN', w: 1.25, x: 4.6 * u, z: z5, row: 5, isModifier: true });
  keys.push({ id: 'Left', label: '◄', w: 1, x: 5.95 * u, z: z5, row: 5, isModifier: true });
  keys.push({ id: 'Down', label: '▼', w: 1, x: 7.0 * u, z: z5, row: 5, isModifier: true });
  keys.push({ id: 'Right', label: '►', w: 1, x: 8.05 * u, z: z5, row: 5, isModifier: true });

  // Center all keys across X axis around origin (0, 0)
  keys.forEach(k => {
    k.x -= 0.50;
  });

  return keys;
}

function getKeycapColors(colorway: KeycapColorway) {
  switch (colorway) {
    case 'shiro':
      return {
        alpha: '#f8f8fa',
        mod: '#cdd1d8',
        accent: '#3b4252',
        legend: '#2e3440'
      };
    case 'botanical':
      return {
        alpha: '#ece9df',
        mod: '#3b5549',
        accent: '#c06c52',
        legend: '#1f2e27'
      };
    case 'cyberpunk':
      return {
        alpha: '#161822',
        mod: '#0f1017',
        accent: '#00e5ff',
        legend: '#ff007f'
      };
    case 'retro':
      return {
        alpha: '#ede4cf',
        mod: '#d2c4aa',
        accent: '#962d3e',
        legend: '#34322d'
      };
    case 'kuro':
    default:
      return {
        alpha: '#18191f',
        mod: '#111216',
        accent: '#c89d5c',
        legend: '#ffffff'
      };
  }
}

function getCaseMaterial(color: CaseColor) {
  switch (color) {
    case 'white':
      return { color: '#f3f4f7', roughness: 0.45, metalness: 0.1, transmission: 0, opacity: 1, transparent: false };
    case 'gray':
      return { color: '#3d4049', roughness: 0.35, metalness: 0.7, transmission: 0, opacity: 1, transparent: false };
    case 'polycarb':
      return { color: '#e8edf5', roughness: 0.55, metalness: 0.05, transmission: 0.82, opacity: 0.85, transparent: true };
    case 'navy':
      return { color: '#162238', roughness: 0.3, metalness: 0.65, transmission: 0, opacity: 1, transparent: false };
    case 'forest':
      return { color: '#1f3027', roughness: 0.32, metalness: 0.6, transmission: 0, opacity: 1, transparent: false };
    case 'black':
    default:
      return { color: '#141416', roughness: 0.38, metalness: 0.65, transmission: 0, opacity: 1, transparent: false };
  }
}

function getPlateMaterial(plate: PlateType) {
  switch (plate) {
    case 'brass':
      return { color: '#d4af37', roughness: 0.25, metalness: 0.85 };
    case 'polycarbonate':
      return { color: '#f1f5f9', roughness: 0.6, metalness: 0.05 };
    case 'aluminum':
      return { color: '#94a3b8', roughness: 0.35, metalness: 0.75 };
    case 'fr4':
    default:
      return { color: '#1a1917', roughness: 0.8, metalness: 0.2 };
  }
}

function getSwitchStemColor(switchType: SwitchType) {
  switch (switchType) {
    case 'tactile': return '#e58e26';
    case 'silent': return '#38ada9';
    case 'clicky': return '#20bf6b';
    case 'linear':
    default: return '#cfbaa3';
  }
}

function getWeightMaterial(weight: WeightBarFinish) {
  switch (weight) {
    case 'chrome':
      return { color: '#ffffff', roughness: 0.08, metalness: 0.98 };
    case 'chroma':
      return { color: '#9b59b6', roughness: 0.2, metalness: 0.9 };
    case 'black':
      return { color: '#121215', roughness: 0.4, metalness: 0.6 };
    case 'brass':
    default:
      return { color: '#cfa942', roughness: 0.22, metalness: 0.92 };
  }
}

function getLightingColor(lighting: LightingEffect): string | null {
  switch (lighting) {
    case 'amber': return '#f59e0b';
    case 'white': return '#ffffff';
    case 'cyan': return '#06b6d4';
    case 'cycle': return '#8b5cf6';
    case 'off':
    default: return null;
  }
}

export const Keyboard3D: React.FC = () => {
  const { config, isExploded, pressedKey, triggerKeyHit } = useCustomizer();
  const keys = useMemo(() => generateKeys(config.layout), [config.layout]);
  const keyColors = useMemo(() => getKeycapColors(config.keycaps), [config.keycaps]);
  const caseMat = useMemo(() => getCaseMaterial(config.caseColor), [config.caseColor]);
  const plateMat = useMemo(() => getPlateMaterial(config.plate), [config.plate]);
  const stemColor = useMemo(() => getSwitchStemColor(config.switchType), [config.switchType]);
  const weightMat = useMemo(() => getWeightMaterial(config.weightBar), [config.weightBar]);
  const lightingColor = useMemo(() => getLightingColor(config.lighting), [config.lighting]);

  const groupRef = useRef<THREE.Group>(null);
  const keycapsLayerRef = useRef<THREE.Group>(null);
  const switchesLayerRef = useRef<THREE.Group>(null);
  const plateLayerRef = useRef<THREE.Group>(null);
  const pcbLayerRef = useRef<THREE.Group>(null);
  const caseTopRef = useRef<THREE.Group>(null);
  const caseBottomRef = useRef<THREE.Group>(null);
  const weightLayerRef = useRef<THREE.Group>(null);
  const knobRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const factor = Math.min(1, delta * 7);
    const targetKeycaps = isExploded ? 3.4 : 0.65;
    const targetSwitches = isExploded ? 2.2 : 0.42;
    const targetPlate = isExploded ? 1.3 : 0.32;
    const targetPcb = isExploded ? 0.5 : 0.18;
    const targetCaseTop = 0;
    const targetCaseBottom = isExploded ? -1.2 : -0.22;
    const targetWeight = isExploded ? -2.3 : -0.45;

    if (keycapsLayerRef.current) {
      keycapsLayerRef.current.position.y += (targetKeycaps - keycapsLayerRef.current.position.y) * factor;
    }
    if (switchesLayerRef.current) {
      switchesLayerRef.current.position.y += (targetSwitches - switchesLayerRef.current.position.y) * factor;
    }
    if (plateLayerRef.current) {
      plateLayerRef.current.position.y += (targetPlate - plateLayerRef.current.position.y) * factor;
    }
    if (pcbLayerRef.current) {
      pcbLayerRef.current.position.y += (targetPcb - pcbLayerRef.current.position.y) * factor;
    }
    if (caseTopRef.current) {
      caseTopRef.current.position.y += (targetCaseTop - caseTopRef.current.position.y) * factor;
    }
    if (caseBottomRef.current) {
      caseBottomRef.current.position.y += (targetCaseBottom - caseBottomRef.current.position.y) * factor;
    }
    if (weightLayerRef.current) {
      weightLayerRef.current.position.y += (targetWeight - weightLayerRef.current.position.y) * factor;
    }

    if (groupRef.current && !isExploded) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.05;
    } else if (groupRef.current) {
      groupRef.current.position.y = 0;
    }

    if (config.lighting === 'cycle') {
      const hue = (state.clock.elapsedTime * 0.15) % 1;
      const cycleColor = new THREE.Color().setHSL(hue, 0.85, 0.55);
      state.scene.traverse((obj) => {
        if (obj.name === 'rgbGlow' && obj instanceof THREE.PointLight) {
          obj.color.copy(cycleColor);
        }
      });
    }
  });

  const caseWidth = config.layout === 'TKL' ? 20.2 : config.layout === '75%' ? 16.8 : 16.0;
  const caseDepth = config.layout === '75%' || config.layout === 'TKL' ? 7.0 : 6.0;

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0.08, 0, 0]} scale={[1.18, 1.18, 1.18]}>
      {lightingColor && (
        <group position={[0, 0, 0]}>
          <pointLight 
            name="rgbGlow" 
            position={[0, -0.2, 0]} 
            color={lightingColor} 
            intensity={2.5} 
            distance={8} 
            decay={2} 
          />
          <pointLight 
            name="rgbGlow" 
            position={[-5, 0.4, 0]} 
            color={lightingColor} 
            intensity={1.2} 
            distance={5} 
          />
          <pointLight 
            name="rgbGlow" 
            position={[5, 0.4, 0]} 
            color={lightingColor} 
            intensity={1.2} 
            distance={5} 
          />
        </group>
      )}

      {/* LAYER 1: KEYCAPS */}
      <group ref={keycapsLayerRef} position={[0, 0.65, 0]}>
        {keys.map((k) => {
          const isPressed = pressedKey === k.id || (pressedKey === 'Space' && k.isSpace);
          let keyColor = keyColors.alpha;
          if (k.isAccent) keyColor = keyColors.accent;
          else if (k.isModifier) keyColor = keyColors.mod;

          return (
            <group 
              key={k.id} 
              position={[k.x, isPressed ? -0.12 : 0, k.z]}
              onClick={(e) => {
                e.stopPropagation();
                triggerKeyHit(k.id);
              }}
            >
              <mesh castShadow receiveShadow>
                <boxGeometry args={[k.w * 0.9 - 0.05, 0.42, 0.85]} />
                <meshStandardMaterial 
                  color={keyColor} 
                  roughness={0.52} 
                  metalness={0.05} 
                />
              </mesh>
              <mesh position={[0, 0.22, 0]}>
                <boxGeometry args={[k.w * 0.78 - 0.06, 0.03, 0.72]} />
                <meshStandardMaterial 
                  color={keyColor} 
                  roughness={0.45} 
                  metalness={0.03} 
                />
              </mesh>
            </group>
          );
        })}

        {config.layout === '75%' && (
          <group 
            position={[7.2 * 0.96 - 0.50, 0.15, -2.6]}
            onClick={(e) => {
              e.stopPropagation();
              triggerKeyHit('Knob');
              if (knobRef.current) {
                knobRef.current.rotation.y += Math.PI / 4;
              }
            }}
          >
            <mesh ref={knobRef} castShadow>
              <cylinderGeometry args={[0.38, 0.38, 0.65, 32]} />
              <meshStandardMaterial 
                color={weightMat.color} 
                roughness={0.25} 
                metalness={0.88} 
              />
            </mesh>
          </group>
        )}

        {isExploded && (
          <Html position={[0, 0.8, -caseDepth / 2 - 0.4]} center>
            <div className="px-3 py-1 rounded bg-black/85 backdrop-blur-md text-amber-400 text-xs font-mono border border-amber-400/30 whitespace-nowrap shadow-xl">
              1. Double-Shot PBT Keycaps ({config.keycaps.toUpperCase()})
            </div>
          </Html>
        )}
      </group>

      {/* LAYER 2: MECHANICAL SWITCHES */}
      <group ref={switchesLayerRef} position={[0, 0.42, 0]}>
        {keys.map((k) => (
          <group key={`sw-${k.id}`} position={[k.x, 0, k.z]}>
            <mesh castShadow>
              <boxGeometry args={[0.72, 0.25, 0.72]} />
              <meshStandardMaterial 
                color="#26272e" 
                roughness={0.6} 
                metalness={0.1} 
              />
            </mesh>
            <mesh position={[0, 0.16, 0]}>
              <boxGeometry args={[0.68, 0.14, 0.68]} />
              <meshPhysicalMaterial 
                color="#e4e8f0" 
                transmission={0.65} 
                opacity={0.75} 
                transparent 
                roughness={0.3} 
              />
            </mesh>
            <mesh position={[0, 0.28, 0]}>
              <boxGeometry args={[0.22, 0.18, 0.22]} />
              <meshStandardMaterial color={stemColor} roughness={0.3} />
            </mesh>
          </group>
        ))}

        {isExploded && (
          <Html position={[0, 0.5, -caseDepth / 2 - 0.4]} center>
            <div className="px-3 py-1 rounded bg-black/85 backdrop-blur-md text-emerald-400 text-xs font-mono border border-emerald-400/30 whitespace-nowrap shadow-xl">
              2. Hand-Lubed Switches ({config.switchType.toUpperCase()})
            </div>
          </Html>
        )}
      </group>

      {/* LAYER 3: SWITCH PLATE */}
      <group ref={plateLayerRef} position={[0, 0.32, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[caseWidth - 0.9, 0.08, caseDepth - 0.9]} />
          <meshStandardMaterial 
            color={plateMat.color} 
            roughness={plateMat.roughness} 
            metalness={plateMat.metalness} 
          />
        </mesh>

        {isExploded && (
          <Html position={[0, 0.3, -caseDepth / 2 - 0.4]} center>
            <div className="px-3 py-1 rounded bg-black/85 backdrop-blur-md text-cyan-400 text-xs font-mono border border-cyan-400/30 whitespace-nowrap shadow-xl">
              3. Precision Plate ({config.plate.toUpperCase()})
            </div>
          </Html>
        )}
      </group>

      {/* LAYER 4: HOT-SWAP PCB & GASKETS */}
      <group ref={pcbLayerRef} position={[0, 0.18, 0]}>
        <mesh receiveShadow>
          <boxGeometry args={[caseWidth - 1.0, 0.06, caseDepth - 1.0]} />
          <meshStandardMaterial color="#1a1c18" roughness={0.7} metalness={0.3} />
        </mesh>
        <mesh position={[0, 0.04, (caseDepth - 1.0) / 2]}>
          <boxGeometry args={[caseWidth - 1.2, 0.04, 0.12]} />
          <meshStandardMaterial color="#0f1012" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.04, -(caseDepth - 1.0) / 2]}>
          <boxGeometry args={[caseWidth - 1.2, 0.04, 0.12]} />
          <meshStandardMaterial color="#0f1012" roughness={0.9} />
        </mesh>

        {isExploded && (
          <Html position={[0, 0.2, -caseDepth / 2 - 0.4]} center>
            <div className="px-3 py-1 rounded bg-black/85 backdrop-blur-md text-purple-400 text-xs font-mono border border-purple-400/30 whitespace-nowrap shadow-xl">
              4. {config.pcb === 'wireless-tri' ? 'Tri-Mode Wireless PCB' : config.pcb === 'solder-audiophile' ? 'Flex-Cut Audiophile PCB' : 'Hot-Swap RGB PCB'} with Poron Gaskets
            </div>
          </Html>
        )}
      </group>

      {/* LAYER 5: TOP CASE */}
      <group ref={caseTopRef} position={[0, 0, 0]}>
        <mesh position={[-(caseWidth / 2 - 0.25), 0.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.55, 0.75, caseDepth]} />
          <meshPhysicalMaterial {...caseMat} />
        </mesh>
        <mesh position={[caseWidth / 2 - 0.25, 0.25, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.55, 0.75, caseDepth]} />
          <meshPhysicalMaterial {...caseMat} />
        </mesh>
        <mesh position={[0, 0.25, -(caseDepth / 2 - 0.25)]} castShadow receiveShadow>
          <boxGeometry args={[caseWidth, 0.75, 0.55]} />
          <meshPhysicalMaterial {...caseMat} />
        </mesh>
        <mesh position={[0, 0.18, caseDepth / 2 - 0.25]} castShadow receiveShadow>
          <boxGeometry args={[caseWidth, 0.65, 0.55]} />
          <meshPhysicalMaterial {...caseMat} />
        </mesh>

        <mesh position={[0, 0.58, -(caseDepth / 2 - 0.05)]}>
          <boxGeometry args={[caseWidth - 0.2, 0.03, 0.03]} />
          <meshStandardMaterial color="#d4af37" roughness={0.15} metalness={0.9} />
        </mesh>

        {isExploded && (
          <Html position={[0, 0.2, -caseDepth / 2 - 0.4]} center>
            <div className="px-3 py-1 rounded bg-black/85 backdrop-blur-md text-amber-200 text-xs font-mono border border-amber-200/30 whitespace-nowrap shadow-xl">
              5. CNC Top Case ({config.caseColor.toUpperCase()})
            </div>
          </Html>
        )}
      </group>

      {/* LAYER 6: BOTTOM CHASSIS */}
      <group ref={caseBottomRef} position={[0, -0.22, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[caseWidth - 0.15, 0.45, caseDepth - 0.15]} />
          <meshPhysicalMaterial {...caseMat} />
        </mesh>

        <mesh position={[-caseWidth / 2 + 1.2, -0.26, -caseDepth / 2 + 0.8]}>
          <cylinderGeometry args={[0.35, 0.35, 0.08, 16]} />
          <meshStandardMaterial color="#050505" roughness={0.9} />
        </mesh>
        <mesh position={[caseWidth / 2 - 1.2, -0.26, -caseDepth / 2 + 0.8]}>
          <cylinderGeometry args={[0.35, 0.35, 0.08, 16]} />
          <meshStandardMaterial color="#050505" roughness={0.9} />
        </mesh>
        <mesh position={[-caseWidth / 2 + 1.2, -0.26, caseDepth / 2 - 0.8]}>
          <cylinderGeometry args={[0.35, 0.35, 0.08, 16]} />
          <meshStandardMaterial color="#050505" roughness={0.9} />
        </mesh>
        <mesh position={[caseWidth / 2 - 1.2, -0.26, caseDepth / 2 - 0.8]}>
          <cylinderGeometry args={[0.35, 0.35, 0.08, 16]} />
          <meshStandardMaterial color="#050505" roughness={0.9} />
        </mesh>

        {isExploded && (
          <Html position={[0, -0.1, -caseDepth / 2 - 0.4]} center>
            <div className="px-3 py-1 rounded bg-black/85 backdrop-blur-md text-amber-200 text-xs font-mono border border-amber-200/30 whitespace-nowrap shadow-xl">
              6. Bottom Acoustic Chamber
            </div>
          </Html>
        )}
      </group>

      {/* LAYER 7: BRASS WEIGHT */}
      <group ref={weightLayerRef} position={[0, -0.45, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[caseWidth * 0.65, 0.12, caseDepth * 0.42]} />
          <meshStandardMaterial 
            color={weightMat.color} 
            roughness={weightMat.roughness} 
            metalness={weightMat.metalness} 
          />
        </mesh>

        <mesh position={[0, -0.07, 0]}>
          <boxGeometry args={[3.2, 0.02, 0.8]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.5} metalness={0.7} />
        </mesh>

        {isExploded && (
          <Html position={[0, -0.2, -caseDepth / 2 - 0.4]} center>
            <div className="px-3 py-1 rounded bg-black/85 backdrop-blur-md text-yellow-300 text-xs font-mono border border-yellow-300/30 whitespace-nowrap shadow-xl">
              7. Acoustic Ingot Weight ({config.weightBar.toUpperCase()})
            </div>
          </Html>
        )}
      </group>

      {/* OPTIONAL COILED AVIATOR CABLE */}
      {config.cable === 'matching' && (
        <group position={[0, 0.15, -caseDepth / 2 - 0.3]}>
          <mesh position={[0, 0, -0.3]}>
            <boxGeometry args={[0.45, 0.22, 0.65]} />
            <meshStandardMaterial color={weightMat.color} roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[0, 0, -1.8]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.26, 0.26, 0.7, 16]} />
            <meshStandardMaterial color={weightMat.color} roughness={0.25} metalness={0.9} />
          </mesh>
          {Array.from({ length: 12 }).map((_, i) => (
            <mesh key={`coil-${i}`} position={[(i - 6) * 0.35, 0.15, -3.2 + Math.sin(i) * 0.1]}>
              <torusGeometry args={[0.22, 0.08, 8, 16]} />
              <meshStandardMaterial color="#2d3038" roughness={0.8} />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
};
