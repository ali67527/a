'use strict';
// ===== Synthesized audio (WebAudio) — no external files needed =====
const Sfx = (() => {
  let ctx = null, master = null, sfxGain = null, musicGain = null, noiseBuf = null;
  let musicOn = localStorage.getItem('cww_music') !== '0';
  let sfxOn = localStorage.getItem('cww_sfx') !== '0';
  const MUSIC_VOL = 0.2;
  const rnd = (a, b) => a + Math.random() * (b - a);

  function init() {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = 0.55; master.connect(ctx.destination);
    sfxGain = ctx.createGain(); sfxGain.gain.value = sfxOn ? 0.9 : 0; sfxGain.connect(master);
    musicGain = ctx.createGain(); musicGain.gain.value = musicOn ? MUSIC_VOL : 0; musicGain.connect(master);
    const len = ctx.sampleRate;
    noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    document.addEventListener('visibilitychange', () => {
      if (!ctx) return;
      if (document.hidden) ctx.suspend(); else ctx.resume();
    });
  }

  function noise(dur, type, f0, f1, vol, q = 1, when = 0, dest) {
    if (!ctx) return;
    const t = ctx.currentTime + Math.max(0, when);
    const src = ctx.createBufferSource(); src.buffer = noiseBuf;
    const filt = ctx.createBiquadFilter(); filt.type = type; filt.Q.value = q;
    filt.frequency.setValueAtTime(f0, t);
    filt.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.connect(filt); filt.connect(g); g.connect(dest || sfxGain);
    src.start(t, Math.random() * 0.5); src.stop(t + dur + 0.05);
  }

  function tone(type, f0, f1, dur, vol, when = 0, dest) {
    if (!ctx) return;
    const t = ctx.currentTime + Math.max(0, when);
    const o = ctx.createOscillator(); o.type = type;
    o.frequency.setValueAtTime(f0, t);
    if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, vol), t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(dest || sfxGain);
    o.start(t); o.stop(t + dur + 0.05);
  }

  // throttle identical sounds so rapid-fire weapons don't overload
  const last = {};
  function can(name, gapMs) {
    const n = performance.now();
    if (last[name] && n - last[name] < gapMs) return false;
    last[name] = n; return true;
  }

  // ---------- Music: bouncy chiptune loop (one theme per world) ----------
  let musicTimer = null, nextNote = 0, step = 0;
  const THEMES = [
    { bpm: 140, tr: 0, lead: 'square', leadVol: 0.16, bass: 'triangle', roots: [48, 43, 45, 41] },              // 0: Farm
    { bpm: 132, tr: -2, lead: 'sawtooth', leadVol: 0.14, bass: 'triangle', roots: [45, 48, 41, 40], desert: true }, // 1: Desert (Arabian harmonic pulse)
    { bpm: 116, tr: -3, lead: 'triangle', leadVol: 0.2, bass: 'sine', roots: [48, 45, 41, 43], bell: true },  // 2: Snow
    { bpm: 158, tr: -5, lead: 'sawtooth', leadVol: 0.08, bass: 'sawtooth', roots: [45, 45, 41, 43], heavy: true }, // 3: Volcano
    { bpm: 126, tr: 2, lead: 'sine', leadVol: 0.2, bass: 'triangle', roots: [48, 44, 46, 43], bell: true },   // 4: Space
  ];
  let theme = THEMES[0];
  const mel = [
    72, 0, 76, 0, 79, 0, 76, 0, 81, 0, 79, 0, 76, 0, 74, 0,
    74, 0, 79, 0, 83, 0, 79, 0, 74, 0, 76, 0, 79, 0, 0, 0,
    76, 0, 81, 0, 84, 0, 81, 0, 79, 0, 76, 0, 72, 0, 76, 0,
    77, 0, 81, 0, 84, 0, 81, 0, 79, 0, 77, 0, 76, 0, 74, 0];
  const mel2 = [
    84, 0, 0, 79, 0, 0, 76, 0, 79, 0, 81, 0, 79, 0, 76, 0,
    79, 0, 0, 74, 0, 0, 71, 0, 74, 0, 79, 0, 0, 0, 0, 0,
    81, 0, 0, 76, 0, 0, 72, 0, 76, 0, 81, 0, 84, 0, 81, 0,
    77, 0, 81, 0, 77, 0, 72, 0, 74, 0, 76, 0, 77, 0, 79, 0];
  const midi = n => 440 * Math.pow(2, (n - 69) / 12);

  function sched() {
    if (!ctx) return;
    if (nextNote < ctx.currentTime - 0.1) nextNote = ctx.currentTime + 0.05;
    const stepDur = 60 / theme.bpm / 4;
    while (nextNote < ctx.currentTime + 0.15) {
      const s = step % 64, loop = Math.floor(step / 64) % 2;
      const root = theme.roots[Math.floor(s / 16)] + theme.tr;
      const when = nextNote - ctx.currentTime;
      if (s % 2 === 0) {
        const n = root - 12 + (s % 4 === 2 ? 12 : 0);
        tone(theme.bass, midi(n), midi(n), stepDur * 1.8, theme.bass === 'sawtooth' ? 0.22 : 0.55, when, musicGain);
      }
      if (s % 8 === 0 || (theme.heavy && s % 4 === 0)) tone('sine', 150, 45, 0.18, 0.9, when, musicGain);
      if (s % 8 === 4) noise(0.12, 'highpass', 1500, 1500, 0.35, 1, when, musicGain);
      if (s % 2 === 1) noise(0.03, 'highpass', 7000, 7000, 0.14, 1, when, musicGain);
      const m = (loop ? mel2 : mel)[s];
      if (m) {
        const f = midi(m + theme.tr);
        tone(theme.lead, f, f, stepDur * 1.6, theme.leadVol, when, musicGain);
        if (theme.bell) tone('sine', f * 2, f * 2, stepDur * 3, 0.05, when + stepDur * 1.5, musicGain);
      }
      nextNote += stepDur; step++;
    }
  }

  return {
    init,
    setTheme(i) { theme = THEMES[((i % THEMES.length) + THEMES.length) % THEMES.length]; },
    freeze() { if (!can('frz', 120)) return; noise(0.4, 'highpass', 6000, 2000, 0.3, 2); tone('sine', 1800, 900, 0.3, 0.1); },
    burn() { if (!can('brn', 250)) return; noise(0.3, 'lowpass', 900, 300, 0.25, 1); },
    sandstorm() { if (!can('snd', 180)) return; noise(0.5, 'bandpass', 1200, 400, 0.28, 2); },
    whirlwind() { tone('sine', 150, 450, 0.35, 0.18); noise(0.35, 'bandpass', 800, 1600, 0.22, 3); },
    teleport() { tone('sine', 200, 1600, 0.25, 0.2); noise(0.2, 'bandpass', 3000, 800, 0.2, 4); },
    unlock() { [523, 659, 784, 1047, 1319, 1568].forEach((f, i) => { tone('square', f, f, 0.18, 0.1, i * 0.1); tone('triangle', f / 2, f / 2, 0.3, 0.12, i * 0.1); }); },
    equip() { [659, 880, 1047].forEach((f, i) => tone('triangle', f, f, 0.12, 0.14, i * 0.07)); },
    vortex() { tone('sawtooth', 80, 300, 0.6, 0.15); noise(0.6, 'bandpass', 400, 2000, 0.25, 3); },
    startMusic() { if (!ctx || musicTimer) return; nextNote = ctx.currentTime + 0.1; step = 0; musicTimer = setInterval(sched, 25); },
    toggleMusic() {
      musicOn = !musicOn;
      localStorage.setItem('cww_music', musicOn ? '1' : '0');
      if (musicGain && ctx) musicGain.gain.setTargetAtTime(musicOn ? MUSIC_VOL : 0, ctx.currentTime, 0.05);
      return musicOn;
    },
    get musicOn() { return musicOn; },
    toggleSfx() {
      sfxOn = !sfxOn;
      localStorage.setItem('cww_sfx', sfxOn ? '1' : '0');
      if (sfxGain && ctx) sfxGain.gain.setTargetAtTime(sfxOn ? 0.9 : 0, ctx.currentTime, 0.05);
      return sfxOn;
    },
    get sfxOn() { return sfxOn; },
    saveChime() {
      if (!ctx || !sfxOn) return;
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone('sine', f, f, 0.14, 0.15, i * 0.05));
    },

    shoot(id) {
      if (!ctx) return;
      switch (id) {
        case 'pistol': if (!can('p', 40)) return; noise(0.12, 'bandpass', 2600, 800, 0.5, 2); tone('sine', 900, 300, 0.08, 0.15); break;
        case 'soaker': if (!can('s', 55)) return; noise(0.08, 'bandpass', 3000, 1200, 0.32, 1.5); tone('sine', 700, 400, 0.04, 0.06); break;
        case 'shotgun': noise(0.3, 'lowpass', 4000, 300, 0.8, 1); tone('sine', 200, 60, 0.15, 0.4); break;
        case 'balloon': tone('sine', 250, 700, 0.15, 0.35); noise(0.1, 'highpass', 2000, 4000, 0.2); break;
        case 'hose': if (!can('h', 70)) return; noise(0.12, 'bandpass', 1800, 1300, 0.28, 0.8); break;
        case 'sniper': noise(0.25, 'bandpass', 5000, 600, 0.7, 3); tone('square', 1400, 200, 0.12, 0.12); break;
      }
    },
    enemyShoot() { if (!can('es', 60)) return; noise(0.1, 'bandpass', 1500, 500, 0.22, 2); },
    splash() { if (!can('sp', 50)) return; noise(0.25, 'lowpass', 3000, 200, 0.45, 1); },
    hit() { if (!can('hit', 45)) return; tone('sine', rnd(500, 700), 200, 0.06, 0.12); noise(0.05, 'highpass', 3000, 3000, 0.14); },
    cluck(p = 1) {
      if (!can('cl', 90)) return;
      const f = 520 * p * rnd(0.9, 1.1);
      tone('square', f, f * 1.5, 0.06, 0.07); tone('square', f * 1.3, f * 0.6, 0.12, 0.07, 0.07);
    },
    boom() { noise(0.6, 'lowpass', 2500, 80, 0.9, 1); tone('sine', 140, 40, 0.4, 0.6); },
    coin() { if (!can('coin', 35)) return; const b = rnd(880, 960); tone('square', b, b, 0.05, 0.05); tone('square', b * 1.5, b * 1.5, 0.08, 0.05, 0.05); },
    pickup() { [523, 659, 784, 1047].forEach((f, i) => tone('triangle', f, f, 0.12, 0.16, i * 0.06)); },
    hurt() { if (!can('hurt', 80)) return; tone('sawtooth', 300, 90, 0.25, 0.22); noise(0.15, 'lowpass', 1200, 200, 0.3); },
    dash() { noise(0.2, 'bandpass', 600, 3000, 0.3, 1); },
    reloadStart() { noise(0.25, 'bandpass', 500, 1500, 0.18, 3); },
    reload() { tone('square', 300, 300, 0.04, 0.08); tone('square', 500, 500, 0.05, 0.08, 0.08); },
    empty() { if (!can('em', 200)) return; tone('square', 180, 180, 0.04, 0.1); },
    swap() { tone('triangle', 600, 900, 0.05, 0.1); },
    waveStart() { [392, 523, 659, 784].forEach((f, i) => tone('square', f, f, 0.14, 0.1, i * 0.1)); },
    waveClear() { [523, 659, 784, 1047, 1319].forEach((f, i) => tone('triangle', f, f, 0.2, 0.18, i * 0.09)); },
    bossRoar() { tone('sawtooth', 180, 60, 0.9, 0.35); tone('square', 240, 80, 0.8, 0.18, 0.05); noise(0.8, 'lowpass', 800, 100, 0.4); },
    buy() { tone('triangle', 660, 660, 0.08, 0.2); tone('triangle', 990, 990, 0.15, 0.2, 0.08); },
    charge() { tone('sine', 400, 1600, 0.8, 0.07); },
    block() { if (!can('blk', 60)) return; tone('triangle', 1200, 900, 0.06, 0.12); },
    peck() { if (!can('pk', 80)) return; noise(0.04, 'highpass', 3000, 3000, 0.3); },
    over() { [523, 440, 349, 262].forEach((f, i) => tone('triangle', f, f * 0.98, 0.3, 0.2, i * 0.22)); },
  };
})();
