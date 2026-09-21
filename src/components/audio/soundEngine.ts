import type { SwitchType, PlateType } from '../../types';

class KeyboardSoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playKeyStroke(switchType: SwitchType, plate: PlateType) {
    if (this.isMuted) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const pitchJitter = 0.96 + Math.random() * 0.08;

      let plateFreqMultiplier = 1.0;
      let resonanceQ = 8;
      if (plate === 'brass') {
        plateFreqMultiplier = 1.35;
        resonanceQ = 12;
      } else if (plate === 'polycarbonate') {
        plateFreqMultiplier = 0.82;
        resonanceQ = 5;
      } else if (plate === 'fr4') {
        plateFreqMultiplier = 1.05;
        resonanceQ = 9;
      }

      const masterGain = this.ctx.createGain();
      masterGain.connect(this.ctx.destination);
      masterGain.gain.setValueAtTime(0.35, now);

      if (switchType === 'linear') {
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        osc.type = 'triangle';
        const startFreq = 340 * plateFreqMultiplier * pitchJitter;
        osc.frequency.setValueAtTime(startFreq, now);
        osc.frequency.exponentialRampToValueAtTime(70, now + 0.045);

        oscGain.gain.setValueAtTime(0.6, now);
        oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.055);

        const noiseBuffer = this.createNoiseBuffer(0.04);
        const noise = this.ctx.createBufferSource();
        noise.buffer = noiseBuffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(260 * plateFreqMultiplier, now);
        filter.Q.setValueAtTime(resonanceQ, now);

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.5, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(masterGain);
        noise.start(now);

      } else if (switchType === 'tactile') {
        const bumpOsc = this.ctx.createOscillator();
        const bumpGain = this.ctx.createGain();
        bumpOsc.type = 'sine';
        bumpOsc.frequency.setValueAtTime(580 * plateFreqMultiplier * pitchJitter, now);
        bumpOsc.frequency.exponentialRampToValueAtTime(160, now + 0.02);
        bumpGain.gain.setValueAtTime(0.4, now);
        bumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
        bumpOsc.connect(bumpGain);
        bumpGain.connect(masterGain);
        bumpOsc.start(now);
        bumpOsc.stop(now + 0.025);

        const clackOsc = this.ctx.createOscillator();
        const clackGain = this.ctx.createGain();
        clackOsc.type = 'square';
        clackOsc.frequency.setValueAtTime(720 * plateFreqMultiplier * pitchJitter, now + 0.008);
        clackOsc.frequency.exponentialRampToValueAtTime(110, now + 0.05);
        clackGain.gain.setValueAtTime(0.25, now + 0.008);
        clackGain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);
        clackOsc.connect(clackGain);
        clackGain.connect(masterGain);
        clackOsc.start(now + 0.008);
        clackOsc.stop(now + 0.06);

      } else if (switchType === 'silent') {
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(180 * pitchJitter, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.035);

        oscGain.gain.setValueAtTime(0.22, now);
        oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.04);

      } else if (switchType === 'clicky') {
        const clickOsc = this.ctx.createOscillator();
        const clickGain = this.ctx.createGain();
        clickOsc.type = 'sawtooth';
        clickOsc.frequency.setValueAtTime(1800 * pitchJitter, now);
        clickOsc.frequency.exponentialRampToValueAtTime(400, now + 0.015);

        clickGain.gain.setValueAtTime(0.45, now);
        clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.018);

        clickOsc.connect(clickGain);
        clickGain.connect(masterGain);
        clickOsc.start(now);
        clickOsc.stop(now + 0.02);

        const bodyOsc = this.ctx.createOscillator();
        const bodyGain = this.ctx.createGain();
        bodyOsc.type = 'triangle';
        bodyOsc.frequency.setValueAtTime(450 * plateFreqMultiplier, now + 0.005);
        bodyOsc.frequency.exponentialRampToValueAtTime(90, now + 0.06);
        bodyGain.gain.setValueAtTime(0.3, now + 0.005);
        bodyGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        bodyOsc.connect(bodyGain);
        bodyGain.connect(masterGain);
        bodyOsc.start(now + 0.005);
        bodyOsc.stop(now + 0.065);
      }
    } catch {
      // Audio context error handling
    }
  }

  private createNoiseBuffer(duration: number): AudioBuffer {
    if (!this.ctx) throw new Error('No context');
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }
}

export const soundEngine = new KeyboardSoundEngine();
