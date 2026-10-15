'use strict';
// ===== Procedural cartoon art: chickens, water guns, farm props =====
const TAU = Math.PI * 2;
const OUTLINE = 'rgba(45,28,12,0.9)';

function rr(g, x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

function ell(g, x, y, rx, ry, rot = 0) {
  g.beginPath(); g.ellipse(x, y, Math.max(0.1, rx), Math.max(0.1, ry), rot, 0, TAU);
}

function circ(g, x, y, r) { g.beginPath(); g.arc(x, y, Math.max(0.1, r), 0, TAU); }

// Customizer Footwear rendering
function drawShoes(g, r, shoe, face, legSwing, bob) {
  if (!shoe || shoe === 'none') return false;
  g.lineCap = 'round'; g.lineJoin = 'round';
  for (const s of [-1, 1]) {
    const lx = s * r * 0.28, sw = legSwing * s;
    const footX = lx + sw, footY = r * 0.88;
    g.save();
    if (shoe === 'sneakers') {
      g.strokeStyle = '#1e293b'; g.lineWidth = Math.max(3, r * 0.16);
      g.beginPath(); g.moveTo(lx, r * 0.5 - bob); g.lineTo(footX, footY); g.stroke();
      g.fillStyle = '#0f172a'; g.strokeStyle = OUTLINE; g.lineWidth = 1.6;
      rr(g, footX - r * 0.18, footY - r * 0.08, r * 0.36, r * 0.16, 3); g.fill(); g.stroke();
      g.fillStyle = '#f8fafc'; circ(g, footX + r * 0.15 * face, footY - r * 0.01, r * 0.08); g.fill();
      g.fillStyle = '#f8fafc'; g.strokeStyle = '#94a3b8'; g.lineWidth = 1.2;
      rr(g, footX - r * 0.2, footY + r * 0.04, r * 0.4, r * 0.06, 2); g.fill(); g.stroke();
      g.strokeStyle = '#06b6d4'; g.lineWidth = 1.8;
      g.beginPath(); g.moveTo(footX - r * 0.08 * face, footY - r * 0.04); g.lineTo(footX + r * 0.06 * face, footY - r * 0.04); g.stroke();
    } else if (shoe === 'red_kicks') {
      g.strokeStyle = '#dc2626'; g.lineWidth = Math.max(3, r * 0.16);
      g.beginPath(); g.moveTo(lx, r * 0.5 - bob); g.lineTo(footX, footY); g.stroke();
      g.fillStyle = '#dc2626'; g.strokeStyle = OUTLINE; g.lineWidth = 1.6;
      rr(g, footX - r * 0.18, footY - r * 0.08, r * 0.36, r * 0.16, 3); g.fill(); g.stroke();
      g.fillStyle = '#f8fafc'; circ(g, footX + r * 0.15 * face, footY - r * 0.01, r * 0.08); g.fill();
      g.fillStyle = '#f8fafc'; g.strokeStyle = '#94a3b8'; g.lineWidth = 1.2;
      rr(g, footX - r * 0.2, footY + r * 0.04, r * 0.4, r * 0.06, 2); g.fill(); g.stroke();
      g.strokeStyle = '#ffffff'; g.lineWidth = 1.6;
      g.beginPath(); g.moveTo(footX - r * 0.08, footY - r * 0.04); g.lineTo(footX + r * 0.06, footY - r * 0.04); g.stroke();
    } else if (shoe === 'cowboy_boots') {
      g.strokeStyle = '#78350f'; g.lineWidth = Math.max(3.5, r * 0.18);
      g.beginPath(); g.moveTo(lx, r * 0.5 - bob); g.lineTo(footX, footY); g.stroke();
      g.fillStyle = '#78350f'; g.strokeStyle = '#451a03'; g.lineWidth = 1.6;
      rr(g, footX - r * 0.18, footY - r * 0.08, r * 0.34, r * 0.18, 3); g.fill(); g.stroke();
      g.fillStyle = '#451a03';
      g.beginPath();
      g.moveTo(footX + r * 0.12 * face, footY - r * 0.07);
      g.lineTo(footX + r * 0.26 * face, footY + r * 0.01);
      g.lineTo(footX + r * 0.12 * face, footY + r * 0.09);
      g.closePath(); g.fill(); g.stroke();
      g.fillStyle = '#facc15'; circ(g, footX - r * 0.2 * face, footY + r * 0.02, r * 0.06); g.fill();
    } else if (shoe === 'snow_boots') {
      g.strokeStyle = '#0284c7'; g.lineWidth = Math.max(3, r * 0.18);
      g.beginPath(); g.moveTo(lx, r * 0.5 - bob); g.lineTo(footX, footY); g.stroke();
      g.fillStyle = '#0f172a'; g.strokeStyle = '#0284c7'; g.lineWidth = 1.6;
      rr(g, footX - r * 0.18, footY - r * 0.06, r * 0.36, r * 0.18, 3); g.fill(); g.stroke();
      g.fillStyle = '#f8fafc'; g.strokeStyle = '#94a3b8'; g.lineWidth = 1.4;
      ell(g, footX, footY - r * 0.12, r * 0.18, r * 0.09); g.fill(); g.stroke();
      g.fillStyle = '#bae6fd'; rr(g, footX - r * 0.2, footY + r * 0.05, r * 0.4, r * 0.06, 2); g.fill();
    } else if (shoe === 'magma_boots') {
      g.strokeStyle = '#1c1917'; g.lineWidth = Math.max(3.5, r * 0.18);
      g.beginPath(); g.moveTo(lx, r * 0.5 - bob); g.lineTo(footX, footY); g.stroke();
      g.fillStyle = '#1c1917'; g.strokeStyle = '#7f1d1d'; g.lineWidth = 1.8;
      rr(g, footX - r * 0.18, footY - r * 0.08, r * 0.36, r * 0.18, 2); g.fill(); g.stroke();
      g.strokeStyle = '#ea580c'; g.lineWidth = 2.0;
      g.beginPath(); g.moveTo(footX - r * 0.12, footY); g.lineTo(footX + r * 0.12, footY); g.stroke();
      g.fillStyle = '#fde047'; circ(g, footX + r * 0.14 * face, footY, r * 0.06); g.fill();
    } else if (shoe === 'gravity_boots') {
      g.strokeStyle = '#334155'; g.lineWidth = Math.max(3, r * 0.18);
      g.beginPath(); g.moveTo(lx, r * 0.5 - bob); g.lineTo(footX, footY); g.stroke();
      g.fillStyle = '#0f172a'; g.strokeStyle = '#06b6d4'; g.lineWidth = 1.8;
      rr(g, footX - r * 0.18, footY - r * 0.08, r * 0.38, r * 0.18, 3); g.fill(); g.stroke();
      g.fillStyle = '#22d3ee'; rr(g, footX - r * 0.2, footY + r * 0.05, r * 0.42, r * 0.06, 2); g.fill();
      g.fillStyle = '#ffffff'; circ(g, footX, footY - r * 0.01, r * 0.05); g.fill();
    }
    g.restore();
  }
  return true;
}

// Customizer Torso / Outfit rendering
function drawOutfit(g, outfit, r, face, t, lw) {
  if (!outfit || outfit === 'none') return false;
  g.save();
  if (outfit === 'ninja_gi') {
    g.fillStyle = '#0f172a'; g.strokeStyle = '#334155'; g.lineWidth = 1.6;
    ell(g, r * 0.12, r * 0.05, r * 0.74, r * 0.64); g.fill(); g.stroke();
    g.strokeStyle = '#e2e8f0'; g.lineWidth = 2.0;
    g.beginPath();
    g.moveTo(r * 0.45, -r * 0.4);
    g.lineTo(r * 0.08, r * 0.05);
    g.lineTo(-r * 0.25, -r * 0.35);
    g.stroke();
    g.fillStyle = '#dc2626'; g.strokeStyle = '#991b1b'; g.lineWidth = 1.4;
    rr(g, -r * 0.45, r * 0.15, r * 0.98, r * 0.16, 2); g.fill(); g.stroke();
    const fl = Math.sin(t * 10) * r * 0.06;
    g.beginPath();
    g.moveTo(r * 0.15, r * 0.3);
    g.lineTo(r * 0.24 + fl, r * 0.58);
    g.lineTo(r * 0.12 + fl, r * 0.58);
    g.closePath(); g.fill();
  } else if (outfit === 'scarf') {
    g.fillStyle = '#dc2626'; g.strokeStyle = '#991b1b'; g.lineWidth = 1.6;
    ell(g, r * 0.28, -r * 0.42, r * 0.54, r * 0.24, 0.1); g.fill(); g.stroke();
    const s1 = Math.sin(t * 12) * r * 0.12;
    const s2 = Math.sin(t * 12 + 1.2) * r * 0.14;
    g.beginPath();
    g.moveTo(-r * 0.1, -r * 0.4);
    g.quadraticCurveTo(-r * 0.6, -r * 0.4 + s1, -r * 1.15, -r * 0.2 + s1);
    g.lineTo(-r * 1.05, -r * 0.05 + s1);
    g.quadraticCurveTo(-r * 0.5, -r * 0.25 + s1 * 0.5, -r * 0.05, -r * 0.3);
    g.closePath(); g.fill(); g.stroke();

    g.beginPath();
    g.moveTo(-r * 0.05, -r * 0.35);
    g.quadraticCurveTo(-r * 0.5, -r * 0.25 + s2, -r * 0.95, -r * 0.05 + s2);
    g.lineTo(-r * 0.88, r * 0.08 + s2);
    g.quadraticCurveTo(-r * 0.4, -r * 0.12 + s2 * 0.5, 0, -r * 0.25);
    g.closePath(); g.fill(); g.stroke();
  } else if (outfit === 'parka') {
    g.fillStyle = '#0369a1'; g.strokeStyle = '#0284c7'; g.lineWidth = 1.6;
    ell(g, r * 0.1, r * 0.05, r * 0.76, r * 0.66); g.fill(); g.stroke();
    g.strokeStyle = '#f8fafc'; g.lineWidth = 2.2;
    g.beginPath(); g.moveTo(r * 0.2, -r * 0.35); g.lineTo(r * 0.2, r * 0.45); g.stroke();
    g.fillStyle = '#f8fafc'; g.strokeStyle = '#94a3b8'; g.lineWidth = 1.4;
    for (let i = 0; i < 5; i++) {
      circ(g, -r * 0.15 + i * r * 0.18, -r * 0.48, r * 0.18); g.fill(); g.stroke();
    }
  } else if (outfit === 'magma_armor') {
    g.fillStyle = '#1c1917'; g.strokeStyle = '#7f1d1d'; g.lineWidth = 1.8;
    ell(g, r * 0.12, r * 0.05, r * 0.74, r * 0.64); g.fill(); g.stroke();
    g.strokeStyle = '#ea580c'; g.lineWidth = 2.6;
    g.beginPath();
    g.moveTo(-r * 0.3, -r * 0.3); g.lineTo(r * 0.45, r * 0.25);
    g.moveTo(-r * 0.3, r * 0.25); g.lineTo(r * 0.45, -r * 0.3);
    g.stroke();
    g.fillStyle = '#f97316'; circ(g, r * 0.12, 0, r * 0.22); g.fill();
    g.fillStyle = '#fde047'; circ(g, r * 0.12, 0, r * 0.12); g.fill();
  } else if (outfit === 'space_suit') {
    g.fillStyle = '#0f172a'; g.strokeStyle = '#22d3ee'; g.lineWidth = 1.8;
    ell(g, r * 0.12, r * 0.05, r * 0.76, r * 0.66); g.fill(); g.stroke();
    g.strokeStyle = '#06b6d4'; g.lineWidth = 1.8;
    g.beginPath();
    g.moveTo(-r * 0.25, -r * 0.2); g.lineTo(r * 0.1, -r * 0.2); g.lineTo(r * 0.35, 0);
    g.moveTo(-r * 0.25, r * 0.2); g.lineTo(r * 0.1, r * 0.2); g.lineTo(r * 0.35, 0);
    g.stroke();
    g.fillStyle = '#22d3ee'; circ(g, r * 0.15, 0, r * 0.18); g.fill();
    g.fillStyle = '#ffffff'; circ(g, r * 0.15, 0, r * 0.08); g.fill();
  } else if (outfit === 'tshirt') {
    g.fillStyle = '#3b82f6'; g.strokeStyle = '#1d4ed8'; g.lineWidth = 1.6;
    ell(g, r * 0.12, r * 0.08, r * 0.75, r * 0.64); g.fill(); g.stroke();
    g.fillStyle = '#ffffff';
    ell(g, r * 0.28, -r * 0.38, r * 0.35, r * 0.16); g.fill();
    g.fillStyle = '#60a5fa';
    circ(g, r * 0.15, r * 0.05, r * 0.14); g.fill();
    g.beginPath();
    g.moveTo(r * 0.15, -r * 0.16);
    g.lineTo(r * 0.05, r * 0.02);
    g.lineTo(r * 0.25, r * 0.02);
    g.closePath(); g.fill();
  } else if (outfit === 'gold_chain') {
    g.strokeStyle = '#facc15'; g.lineWidth = Math.max(2.5, r * 0.12);
    g.beginPath();
    g.arc(r * 0.22, -r * 0.2, r * 0.42, 0.2, Math.PI - 0.2);
    g.stroke();
    const dx = r * 0.22, dy = r * 0.24;
    g.fillStyle = '#38bdf8'; g.strokeStyle = '#facc15'; g.lineWidth = 1.6;
    g.beginPath();
    g.moveTo(dx, dy - r * 0.16);
    g.lineTo(dx + r * 0.14, dy);
    g.lineTo(dx, dy + r * 0.18);
    g.lineTo(dx - r * 0.14, dy);
    g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#ffffff'; circ(g, dx - r * 0.04, dy - r * 0.04, r * 0.05); g.fill();
  }
  g.restore();
  return true;
}

// o: {x,y,r,aim,t,moving,body,wing,comb,gun,hat,shoe,outfit,shades,angry,flash,wet,alpha,scale,ko,recoil,tail1,tail2}
function drawChicken(g, o) {
  const r = o.r, t = o.t || 0;
  const face = Math.cos(o.aim) >= 0 ? 1 : -1;
  const walk = o.moving ? t * 16 : 0;
  const bob = o.ko ? 0 : (o.moving ? Math.abs(Math.sin(walk)) * r * 0.14 : Math.sin(t * 3) * r * 0.03);
  const baseAlpha = o.alpha == null ? 1 : o.alpha;
  g.save();
  g.translate(o.x, o.y);
  if (o.scale != null && o.scale !== 1) g.scale(Math.max(0.05, o.scale), Math.max(0.05, o.scale));
  g.globalAlpha = baseAlpha;

  // shadow
  g.fillStyle = 'rgba(0,0,0,0.22)';
  ell(g, 0, r * 0.92, r * 0.9, r * 0.28); g.fill();

  if (o.ko) { g.rotate(face * 1.35); g.translate(0, -r * 0.2); }

  const wIdx = o.worldIdx != null ? o.worldIdx : 0;
  const isDummy = !!o.isDummy;

  // legs / customizer footwear
  const legSwing = o.moving ? Math.sin(walk) * r * 0.22 : 0;
  const hasCustomShoe = drawShoes(g, r, o.shoe, face, legSwing, bob);
  if (!hasCustomShoe) {
    if (isDummy) {
      // Robot training dummy: hydraulic metal cylinder legs
      g.strokeStyle = '#1e293b'; g.lineWidth = Math.max(3.5, r * 0.18); g.lineCap = 'round';
      for (const s of [-1, 1]) {
        const lx = s * r * 0.28, sw = legSwing * s;
        g.beginPath(); g.moveTo(lx, r * 0.5 - bob); g.lineTo(lx + sw, r * 0.88); g.stroke();
        g.fillStyle = '#0f172a'; circ(g, lx + sw, r * 0.88, r * 0.14); g.fill(); g.stroke();
        g.fillStyle = '#00f0ff'; circ(g, lx + sw * 0.5, r * 0.68 - bob, r * 0.08); g.fill();
      }
    } else if (wIdx === 1) {
      // Desert Mummy legs: wrapped in yellow/tan linen bandages with hanging ribbons
      g.strokeStyle = '#fde68a'; g.lineWidth = Math.max(3, r * 0.14); g.lineCap = 'round';
      for (const s of [-1, 1]) {
        const lx = s * r * 0.28, sw = legSwing * s;
        g.beginPath(); g.moveTo(lx, r * 0.5 - bob); g.lineTo(lx + sw, r * 0.88); g.stroke();
        g.strokeStyle = '#b45309'; g.lineWidth = 1.4;
        g.beginPath(); g.moveTo(lx - 2, r * 0.65 - bob); g.lineTo(lx + 3, r * 0.72 - bob); g.stroke();
        g.strokeStyle = '#f59e0b'; g.lineWidth = Math.max(2, r * 0.11);
        g.beginPath(); g.moveTo(lx + sw - r * 0.1 * face, r * 0.9); g.lineTo(lx + sw + r * 0.18 * face, r * 0.9); g.stroke();
      }
    } else if (wIdx === 2) {
      // Snow Yeti / Eskimo: thick winter snow boots with white fluffy fur trim
      for (const s of [-1, 1]) {
        const lx = s * r * 0.28, sw = legSwing * s;
        g.strokeStyle = '#0284c7'; g.lineWidth = Math.max(3, r * 0.18); g.lineCap = 'round';
        g.beginPath(); g.moveTo(lx, r * 0.5 - bob); g.lineTo(lx + sw, r * 0.88); g.stroke();
        // White fur cuff
        g.fillStyle = '#f8fafc'; g.strokeStyle = '#94a3b8'; g.lineWidth = 1.4;
        ell(g, lx + sw * 0.5, r * 0.65 - bob, r * 0.16, r * 0.09); g.fill(); g.stroke();
        // Boot sole
        g.fillStyle = '#0f172a';
        rr(g, lx + sw - r * 0.15, r * 0.84, r * 0.32, r * 0.14, 2); g.fill(); g.stroke();
      }
    } else if (wIdx === 3) {
      // Volcano Magma Demon: black jagged obsidian drake talons with glowing red claws
      g.strokeStyle = '#1c1917'; g.lineWidth = Math.max(3, r * 0.14); g.lineCap = 'round';
      for (const s of [-1, 1]) {
        const lx = s * r * 0.28, sw = legSwing * s;
        g.beginPath(); g.moveTo(lx, r * 0.5 - bob); g.lineTo(lx + sw, r * 0.88); g.stroke();
        // Sharp glowing red talons
        g.fillStyle = '#ef4444'; g.strokeStyle = '#7f1d1d'; g.lineWidth = 1.2;
        for (let k = -1; k <= 1; k++) {
          g.beginPath();
          g.moveTo(lx + sw + k * 3, r * 0.88);
          g.lineTo(lx + sw + k * 4 + face * 5, r * 0.95);
          g.lineTo(lx + sw + k * 2, r * 0.95);
          g.closePath(); g.fill(); g.stroke();
        }
      }
    } else if (wIdx === 4) {
      // Space Cyborg: articulated robotic titanium legs with neon cyan joints
      g.strokeStyle = '#334155'; g.lineWidth = Math.max(3, r * 0.16); g.lineCap = 'round';
      for (const s of [-1, 1]) {
        const lx = s * r * 0.28, sw = legSwing * s;
        g.beginPath(); g.moveTo(lx, r * 0.5 - bob); g.lineTo(lx + sw, r * 0.88); g.stroke();
        // Cyan glowing knee servomotor
        g.fillStyle = '#22d3ee'; circ(g, lx + sw * 0.5, r * 0.66 - bob, r * 0.09); g.fill();
        // Magnetic anti-gravity boot pad
        g.fillStyle = '#0f172a'; g.strokeStyle = '#06b6d4'; g.lineWidth = 1.5;
        rr(g, lx + sw - r * 0.16, r * 0.85, r * 0.35, r * 0.12, 2); g.fill(); g.stroke();
      }
    } else {
      // Classic Farm legs
      g.strokeStyle = '#f59e0b'; g.lineWidth = Math.max(2, r * 0.11); g.lineCap = 'round';
      for (const s of [-1, 1]) {
        const lx = s * r * 0.28, sw = legSwing * s;
        g.beginPath(); g.moveTo(lx, r * 0.5 - bob); g.lineTo(lx + sw, r * 0.88); g.stroke();
        g.beginPath(); g.moveTo(lx + sw - r * 0.1 * face, r * 0.9); g.lineTo(lx + sw + r * 0.18 * face, r * 0.9); g.stroke();
      }
    }
  }

  g.translate(0, -bob);
  const lw = Math.max(1.5, r * 0.08);
  g.lineWidth = lw; g.strokeStyle = OUTLINE; g.lineJoin = 'round';

  g.save(); g.scale(face, 1);
  const body = o.flash ? '#ffffff' : o.body;

  // tail feathers / thrusters / energy plumes
  if (isDummy) {
    // Training dummy metal antenna spine
    g.fillStyle = '#64748b'; rr(g, -r * 0.95, -r * 0.35, r * 0.25, r * 0.6, 2); g.fill(); g.stroke();
    g.fillStyle = '#f59e0b'; circ(g, -r * 0.85, -r * 0.42, r * 0.12); g.fill(); g.stroke();
  } else if (wIdx === 3) {
    // Volcano: Living Magma Fire Tail Plume!
    for (let i = 0; i < 4; i++) {
      g.save(); g.translate(-r * 0.78, -r * 0.15);
      const fl = Math.sin(t * 16 + i * 1.5) * 0.18;
      g.rotate(-1.0 + i * 0.38 + fl);
      g.fillStyle = i % 2 === 0 ? '#ea580c' : '#fde047';
      ell(g, -r * 0.45, 0, r * 0.55, r * 0.2); g.fill();
      g.restore();
    }
  } else if (wIdx === 4) {
    // Space: Twin Jetpack Rocket Thrusters with Plasma Exhaust Flames!
    g.fillStyle = '#1e1b4b'; g.strokeStyle = '#4338ca'; g.lineWidth = 1.8;
    rr(g, -r * 0.95, -r * 0.4, r * 0.28, r * 0.7, 3); g.fill(); g.stroke();
    // Thruster exhaust flames
    const fl = Math.sin(t * 24) * r * 0.1;
    g.fillStyle = '#06b6d4'; ell(g, -r * 1.15, -r * 0.15, r * 0.25 + fl, r * 0.1); g.fill();
    g.fillStyle = '#c084fc'; ell(g, -r * 1.05, -r * 0.15, r * 0.14, r * 0.06); g.fill();
  } else if (wIdx === 1) {
    // Desert: Sacred Golden Egyptian Fan Tail
    for (let i = 0; i < 3; i++) {
      g.save(); g.translate(-r * 0.78, -r * 0.15);
      g.rotate(-0.9 + i * 0.45 + Math.sin(t * 6 + i) * 0.07);
      g.fillStyle = i === 1 ? '#facc15' : '#d97706';
      ell(g, -r * 0.35, 0, r * 0.48, r * 0.17); g.fill(); g.stroke();
      // Turquoise inlay
      g.fillStyle = '#06b6d4'; circ(g, -r * 0.55, 0, r * 0.08); g.fill();
      g.restore();
    }
  } else {
    // Classic / Snow tail feathers
    for (let i = 0; i < 3; i++) {
      g.save(); g.translate(-r * 0.78, -r * 0.15);
      g.rotate(-0.9 + i * 0.45 + Math.sin(t * 6 + i) * 0.07);
      g.fillStyle = o.flash ? '#fff' : (i === 1 ? (o.tail2 || o.wing) : (o.tail1 || o.body));
      ell(g, -r * 0.35, 0, r * 0.45, r * 0.17); g.fill(); g.stroke();
      if (wIdx === 2) { // Frost tips
        g.fillStyle = '#ffffff'; circ(g, -r * 0.65, 0, r * 0.09); g.fill();
      }
      g.restore();
    }
  }

  // body
  g.fillStyle = body;
  ell(g, 0, 0, r, r * 0.82); g.fill(); g.stroke();

  // Customizer Torso wear / Outfit
  const hasCustomOutfit = drawOutfit(g, o.outfit, r, face, t, lw);

  // Custom body decorations per world & dummies (shown when no custom outfit covers it)
  if (!hasCustomOutfit) {
    if (isDummy) {
      // Overwatch practice bot: Center Bullseye Target & High-Tech Alloy Plating!
      g.fillStyle = '#0f172a'; ell(g, r * 0.1, 0, r * 0.62, r * 0.62); g.fill(); g.stroke();
      g.fillStyle = '#ea580c'; ell(g, r * 0.1, 0, r * 0.48, r * 0.48); g.fill(); // Orange ring
      g.fillStyle = '#f8fafc'; ell(g, r * 0.1, 0, r * 0.34, r * 0.34); g.fill(); // White ring
      g.fillStyle = '#ef4444'; ell(g, r * 0.1, 0, r * 0.20, r * 0.20); g.fill(); // Red center bullseye
      g.fillStyle = '#ffffff'; circ(g, r * 0.1, 0, r * 0.08); g.fill(); // Center light
      // Hazard caution stripes
      g.strokeStyle = '#f59e0b'; g.lineWidth = 2.5;
      g.beginPath();
      g.moveTo(-r * 0.45, -r * 0.4); g.lineTo(-r * 0.2, -r * 0.15);
      g.moveTo(-r * 0.25, -r * 0.45); g.lineTo(0, -r * 0.2);
      g.stroke();
    } else if (wIdx === 1) {
      // Desert Mummy: wrapped linen bandage strips across the body + golden scarab medallion
      g.strokeStyle = '#b45309'; g.lineWidth = 1.4;
      g.beginPath();
      g.moveTo(-r * 0.6, -r * 0.3); g.lineTo(r * 0.5, r * 0.4);
      g.moveTo(-r * 0.5, r * 0.3); g.lineTo(r * 0.4, -r * 0.4);
      g.moveTo(-r * 0.2, -r * 0.5); g.lineTo(r * 0.7, 0);
      g.stroke();
      // Golden Scarab medallion
      g.fillStyle = '#facc15'; g.strokeStyle = '#78350f'; g.lineWidth = 1.2;
      ell(g, r * 0.15, 0, r * 0.24, r * 0.32); g.fill(); g.stroke();
      g.fillStyle = '#06b6d4'; circ(g, r * 0.15, 0, r * 0.1); g.fill();
    } else if (wIdx === 2) {
      // Snow: Fluffy white fur parka collar hugging the neck and back!
      g.fillStyle = '#f8fafc'; g.strokeStyle = '#94a3b8'; g.lineWidth = 1.6;
      const furPuffs = [[-0.2, -0.6, 0.32], [0.1, -0.65, 0.34], [0.4, -0.55, 0.32], [0.65, -0.4, 0.28]];
      for (const [px, py, pr] of furPuffs) {
        circ(g, r * px, r * py, r * pr); g.fill(); g.stroke();
      }
      // Ice crystal frost motif on belly
      g.fillStyle = '#ffffff'; ell(g, r * 0.2, r * 0.2, r * 0.42, r * 0.28); g.fill();
    } else if (wIdx === 3) {
      // Volcano: Spiky cracked obsidian scales & glowing molten lava veins!
      g.strokeStyle = '#f97316'; g.lineWidth = 2.2;
      g.beginPath();
      g.moveTo(-r * 0.4, -r * 0.2); g.lineTo(-r * 0.1, 0); g.lineTo(r * 0.3, -r * 0.1); g.lineTo(r * 0.5, r * 0.2);
      g.moveTo(-r * 0.1, 0); g.lineTo(r * 0.1, r * 0.4);
      g.stroke();
      g.strokeStyle = '#fde047'; g.lineWidth = 1.2;
      g.beginPath();
      g.moveTo(-r * 0.4, -r * 0.2); g.lineTo(-r * 0.1, 0); g.lineTo(r * 0.3, -r * 0.1);
      g.stroke();
    } else if (wIdx === 4) {
      // Space: Cybernetic titanium armor plating with glowing neon circuit paths!
      g.strokeStyle = '#22d3ee'; g.lineWidth = 1.8;
      g.beginPath();
      g.moveTo(-r * 0.3, -r * 0.3); g.lineTo(r * 0.2, -r * 0.3); g.lineTo(r * 0.4, 0); g.lineTo(r * 0.1, r * 0.3);
      g.stroke();
      // Central Arc Reactor
      g.fillStyle = '#06b6d4'; circ(g, r * 0.15, 0, r * 0.22); g.fill();
      g.fillStyle = '#ffffff'; circ(g, r * 0.15, 0, r * 0.11); g.fill();
    } else {
      // Classic sunny belly sheen
      g.fillStyle = 'rgba(255,255,255,0.35)';
      ell(g, r * 0.22, r * 0.18, r * 0.5, r * 0.36); g.fill();
    }
  }

  // head
  const hx = r * 0.42, hy = -r * 0.72, hr = r * 0.5;

  // Comb per world
  if (isDummy) {
    // Training dummy warning beacon
    g.fillStyle = '#0f172a'; rr(g, hx - hr * 0.2, hy - hr * 1.3, hr * 0.4, hr * 0.5, 2); g.fill(); g.stroke();
    g.fillStyle = '#f59e0b'; circ(g, hx, hy - hr * 1.3, hr * 0.25); g.fill(); g.stroke();
  } else if (wIdx === 3) {
    // Volcano: Living roaring fire comb that flickers!
    const fl = Math.sin(t * 18) * hr * 0.15;
    g.fillStyle = '#ea580c';
    g.beginPath();
    g.moveTo(hx - hr * 0.5, hy - hr * 0.6);
    g.quadraticCurveTo(hx - hr * 0.6, hy - hr * 1.5 + fl, hx - hr * 0.1, hy - hr * 1.8 - fl);
    g.quadraticCurveTo(hx + hr * 0.1, hy - hr * 1.3, hx + hr * 0.4, hy - hr * 1.6 + fl);
    g.quadraticCurveTo(hx + hr * 0.6, hy - hr * 0.8, hx + hr * 0.5, hy - hr * 0.6);
    g.closePath(); g.fill();
    g.fillStyle = '#fde047'; circ(g, hx + hr * 0.05, hy - hr * 1.1 + fl * 0.5, hr * 0.22); g.fill();
  } else if (wIdx === 2) {
    // Snow: Jagged frozen icicle comb spikes!
    g.fillStyle = '#bae6fd'; g.strokeStyle = '#0284c7'; g.lineWidth = 1.4;
    for (let i = 0; i < 3; i++) {
      const ix = hx - hr * 0.35 + i * hr * 0.35;
      const iy = hy - hr * 0.75 - (i === 1 ? hr * 0.3 : hr * 0.1);
      g.beginPath();
      g.moveTo(ix - hr * 0.18, hy - hr * 0.5);
      g.lineTo(ix, iy - hr * 0.35);
      g.lineTo(ix + hr * 0.18, hy - hr * 0.5);
      g.closePath(); g.fill(); g.stroke();
      g.fillStyle = '#ffffff'; circ(g, ix, iy - hr * 0.35, hr * 0.08); g.fill();
    }
  } else if (wIdx === 4) {
    // Space: Cybernetic Antenna Array with Glowing Orbs!
    g.strokeStyle = '#475569'; g.lineWidth = 2;
    for (const s of [-1, 1]) {
      g.beginPath();
      g.moveTo(hx + s * hr * 0.25, hy - hr * 0.6);
      g.lineTo(hx + s * hr * 0.45, hy - hr * 1.35);
      g.stroke();
      g.fillStyle = '#22d3ee'; circ(g, hx + s * hr * 0.45, hy - hr * 1.35, hr * 0.16); g.fill();
    }
  } else {
    // Classic / Desert Comb
    g.fillStyle = o.comb;
    for (let i = 0; i < 3; i++) {
      circ(g, hx - hr * 0.35 + i * hr * 0.35, hy - hr * 0.85 - (i === 1 ? hr * 0.15 : 0), hr * 0.3);
      g.fill(); g.stroke();
    }
  }

  // Head base
  g.fillStyle = body; circ(g, hx, hy, hr); g.fill(); g.stroke();

  // Wattle
  if (!isDummy) {
    g.fillStyle = wIdx === 3 ? '#ea580c' : (wIdx === 2 ? '#38bdf8' : o.comb);
    ell(g, hx + hr * 0.7, hy + hr * 0.58, hr * 0.18, hr * 0.3); g.fill();
  }

  // Beak
  g.fillStyle = isDummy ? '#64748b' : (wIdx === 1 ? '#f59e0b' : wIdx === 2 ? '#7dd3fc' : wIdx === 3 ? '#1c1917' : wIdx === 4 ? '#94a3b8' : '#fb923c');
  g.beginPath(); g.moveTo(hx + hr * 0.75, hy - hr * 0.15); g.lineTo(hx + hr * 1.45, hy + hr * 0.12);
  g.lineTo(hx + hr * 0.75, hy + hr * 0.38); g.closePath(); g.fill(); g.stroke();
  if (wIdx === 3) { // Glowing molten beak tip
    g.fillStyle = '#f97316'; circ(g, hx + hr * 1.35, hy + hr * 0.12, hr * 0.1); g.fill();
  }

  // Eyes
  const ex = hx + hr * 0.32, ey = hy - hr * 0.12;
  if (isDummy) {
    // Overwatch practice bot: Blue glowing horizontal cyclops visor!
    g.fillStyle = '#020617'; rr(g, ex - hr * 0.45, ey - hr * 0.25, hr * 0.95, hr * 0.5, hr * 0.15); g.fill(); g.stroke();
    g.fillStyle = '#00f0ff'; rr(g, ex - hr * 0.35, ey - hr * 0.15, hr * 0.75, hr * 0.3, hr * 0.1); g.fill();
    g.fillStyle = '#ffffff'; circ(g, ex, ey, hr * 0.1); g.fill();
  } else if (o.ko) {
    g.strokeStyle = '#111'; g.lineWidth = lw;
    g.beginPath(); g.moveTo(ex - hr * 0.2, ey - hr * 0.2); g.lineTo(ex + hr * 0.2, ey + hr * 0.2);
    g.moveTo(ex + hr * 0.2, ey - hr * 0.2); g.lineTo(ex - hr * 0.2, ey + hr * 0.2); g.stroke();
    g.strokeStyle = OUTLINE;
  } else if (o.shades) {
    g.strokeStyle = '#111'; g.lineWidth = lw * 0.9;
    g.beginPath(); g.moveTo(ex, ey); g.lineTo(hx - hr * 0.92, ey - hr * 0.12); g.stroke();
    g.fillStyle = '#111'; ell(g, ex + hr * 0.05, ey, hr * 0.44, hr * 0.27, 0.05); g.fill();
    g.strokeStyle = 'rgba(255,255,255,0.8)'; g.lineWidth = lw * 0.6;
    g.beginPath(); g.moveTo(ex - hr * 0.15, ey - hr * 0.1); g.lineTo(ex + hr * 0.05, ey - hr * 0.16); g.stroke();
    g.strokeStyle = OUTLINE; g.lineWidth = lw;
  } else if (wIdx === 4) {
    // Space Cyborg: Red/Cyan glowing ocular HUD targeting eye!
    g.fillStyle = '#0f172a'; circ(g, ex, ey, hr * 0.32); g.fill(); g.stroke();
    g.fillStyle = '#ef4444'; circ(g, ex, ey, hr * 0.18); g.fill();
    g.fillStyle = '#22d3ee'; g.lineWidth = 1;
    g.beginPath(); g.arc(ex, ey, hr * 0.26, 0, TAU); g.stroke();
  } else {
    g.fillStyle = '#fff'; circ(g, ex, ey, hr * 0.3); g.fill(); g.lineWidth = lw * 0.6; g.stroke();
    const la = face > 0 ? o.aim : Math.PI - o.aim;
    g.fillStyle = wIdx === 3 ? '#ea580c' : '#111';
    circ(g, ex + Math.cos(la) * hr * 0.12, ey + Math.sin(la) * hr * 0.12, hr * 0.15); g.fill();
    if (wIdx === 1) { // Egyptian kohl eyeliner
      g.strokeStyle = '#78350f'; g.lineWidth = 1.6;
      g.beginPath(); g.moveTo(ex - hr * 0.3, ey); g.lineTo(ex - hr * 0.55, ey - hr * 0.15); g.stroke();
    }
    if (o.angry) {
      g.lineWidth = lw * 1.3; g.strokeStyle = OUTLINE;
      g.beginPath(); g.moveTo(ex - hr * 0.38, ey - hr * 0.52); g.lineTo(ex + hr * 0.32, ey - hr * 0.26); g.stroke();
    }
    g.lineWidth = lw;
  }
  drawHat(g, o.hat, hx, hy, hr, lw, t, o.hatCol, o.gemCol);

  // Astronaut helmet glass dome for Space world
  if (wIdx === 4 && !isDummy) {
    g.save();
    g.fillStyle = 'rgba(34, 211, 238, 0.22)';
    g.strokeStyle = 'rgba(165, 243, 252, 0.85)';
    g.lineWidth = 2;
    circ(g, hx + hr * 0.1, hy, hr * 1.25); g.fill(); g.stroke();
    // Glass shine curved arc
    g.strokeStyle = '#ffffff'; g.lineWidth = 1.5;
    g.beginPath(); g.arc(hx + hr * 0.1, hy, hr * 1.05, Math.PI * 1.15, Math.PI * 1.45); g.stroke();
    g.restore();
  }

  // wet overlay + drips
  if (o.wet > 0.05) {
    g.globalAlpha = baseAlpha * Math.min(0.5, o.wet * 0.5);
    g.fillStyle = o.wetCol || '#38bdf8';
    ell(g, 0, 0, r, r * 0.82); g.fill();
    circ(g, hx, hy, hr); g.fill();
    g.globalAlpha = baseAlpha;
    g.fillStyle = o.dripCol || '#7dd3fc';
    const n = Math.ceil(o.wet * 5);
    for (let i = 0; i < n; i++) {
      const dx = (-0.6 + i * 0.3) * r;
      const dy = r * 0.5 + ((t * 1.5 + i * 0.37) % 1) * r * 0.5;
      circ(g, dx, dy, r * 0.075); g.fill();
    }
  }

  // frozen overlay + frost crystals
  if (o.frozen > 0) {
    g.save();
    g.globalAlpha = baseAlpha * 0.55;
    g.fillStyle = '#bae6fd';
    ell(g, 0, 0, r * 1.08, r * 0.88); g.fill();
    circ(g, hx, hy, hr * 1.05); g.fill();
    g.strokeStyle = '#38bdf8'; g.lineWidth = Math.max(2, lw);
    ell(g, 0, 0, r * 1.08, r * 0.88); g.stroke();
    g.fillStyle = '#ffffff';
    for (let i = 0; i < 3; i++) {
      circ(g, -r * 0.35 + i * r * 0.35, -r * 0.2 + (i % 2) * r * 0.25, r * 0.1); g.fill();
    }
    g.restore();
  }

  // burn overlay + fire sparks
  if (o.burn > 0) {
    g.save();
    g.globalAlpha = baseAlpha * 0.45;
    g.fillStyle = '#f97316';
    ell(g, 0, 0, r * 1.05, r * 0.85); g.fill();
    g.globalAlpha = baseAlpha * 0.8;
    for (let i = 0; i < 4; i++) {
      const fx = Math.sin(t * 15 + i * 1.8) * r * 0.5;
      const fy = -r * 0.2 - ((t * 2.2 + i * 0.25) % 1) * r * 0.75;
      g.fillStyle = i % 2 === 0 ? '#ea580c' : '#fde047';
      circ(g, fx, fy, r * 0.12); g.fill();
    }
    g.restore();
  }
  g.restore(); // un-flip

  if (o.gun && !o.ko) drawGun(g, o, r, face);
  else {
    g.save(); g.scale(face, 1);
    if (isDummy) {
      // Robot alloy wing with hazard orange trim
      g.fillStyle = o.flash ? '#fff' : '#1e293b';
      ell(g, -r * 0.05, r * 0.05, r * 0.48, r * 0.3, Math.sin(t * 12) * 0.2); g.fill(); g.stroke();
      g.fillStyle = '#ea580c';
      ell(g, -r * 0.05, r * 0.05, r * 0.26, r * 0.16, Math.sin(t * 12) * 0.2); g.fill();
    } else {
      g.fillStyle = o.flash ? '#fff' : o.wing;
      ell(g, -r * 0.05, r * 0.05, r * 0.48, r * 0.3, Math.sin(t * 22) * 0.45); g.fill(); g.stroke();
    }
    g.restore();
  }
  g.restore();
}

function drawHat(g, hat, hx, hy, hr, lw, t, col, gem) {
  if (!hat || hat === 'none') return;
  g.lineWidth = lw;
  if (hat === 'bandana') {
    g.strokeStyle = col || '#2563eb'; g.lineWidth = hr * 0.3;
    g.beginPath(); g.arc(hx, hy, hr * 0.86, Math.PI * 1.08, Math.PI * 1.92); g.stroke();
    g.lineWidth = hr * 0.18; g.lineCap = 'round';
    const kx = hx - hr * 0.82, ky = hy - hr * 0.35;
    g.beginPath(); g.moveTo(kx, ky); g.lineTo(kx - hr * 0.7, ky + Math.sin(t * 13) * hr * 0.25 - hr * 0.1); g.stroke();
    g.beginPath(); g.moveTo(kx, ky); g.lineTo(kx - hr * 0.6, ky + Math.sin(t * 13 + 1.5) * hr * 0.25 + hr * 0.2); g.stroke();
    g.fillStyle = '#fff'; circ(g, hx + hr * 0.05, hy - hr * 0.86, hr * 0.07); g.fill();
    g.strokeStyle = OUTLINE; g.lineWidth = lw;
  } else if (hat === 'crown') {
    const by = hy - hr * 0.75, w = hr * 1.2;
    g.fillStyle = col || '#facc15';
    g.beginPath();
    g.moveTo(hx - w / 2, by);
    g.lineTo(hx - w / 2, by - hr * 0.7); g.lineTo(hx - w / 4, by - hr * 0.35);
    g.lineTo(hx, by - hr * 0.85); g.lineTo(hx + w / 4, by - hr * 0.35);
    g.lineTo(hx + w / 2, by - hr * 0.7); g.lineTo(hx + w / 2, by);
    g.closePath(); g.fill(); g.stroke();
    g.fillStyle = gem || '#ef4444'; circ(g, hx, by - hr * 0.22, hr * 0.12); g.fill();
    g.fillStyle = '#22d3ee'; circ(g, hx - w / 3, by - hr * 0.18, hr * 0.08); g.fill();
    circ(g, hx + w / 3, by - hr * 0.18, hr * 0.08); g.fill();
  } else if (hat === 'helmet') {
    g.fillStyle = col || '#4d7c0f';
    g.beginPath(); g.arc(hx, hy - hr * 0.15, hr * 1.02, Math.PI, 0); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = 'rgba(0,0,0,0.3)'; rr(g, hx - hr * 1.15, hy - hr * 0.22, hr * 2.3, hr * 0.22, hr * 0.1); g.fill(); g.stroke();
  } else if (hat === 'beret') {
    g.fillStyle = col || '#7f1d1d';
    ell(g, hx - hr * 0.1, hy - hr * 0.78, hr * 0.8, hr * 0.32, -0.25); g.fill(); g.stroke();
    circ(g, hx - hr * 0.1, hy - hr * 1.12, hr * 0.1); g.fill();
  } else if (hat === 'cap') {
    g.fillStyle = col || '#dc2626';
    g.beginPath(); g.arc(hx, hy - hr * 0.2, hr * 0.9, Math.PI, 0); g.closePath(); g.fill(); g.stroke();
    rr(g, hx - hr * 1.5, hy - hr * 0.3, hr * 0.8, hr * 0.18, hr * 0.08); g.fill(); g.stroke();
  } else if (hat === 'beanie') {
    g.fillStyle = col || '#ef4444';
    g.beginPath(); g.arc(hx, hy - hr * 0.15, hr * 0.98, Math.PI, 0); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#ffffff'; rr(g, hx - hr * 1.05, hy - hr * 0.32, hr * 2.1, hr * 0.32, hr * 0.12); g.fill(); g.stroke();
    circ(g, hx, hy - hr * 1.2, hr * 0.26); g.fill(); g.stroke();
    g.strokeStyle = 'rgba(255,255,255,0.45)'; g.lineWidth = lw * 0.7;
    for (let i = -2; i <= 2; i++) { g.beginPath(); g.moveTo(hx + i * hr * 0.32, hy - hr * 0.35); g.lineTo(hx + i * hr * 0.28, hy - hr * 0.95); g.stroke(); }
    g.strokeStyle = OUTLINE; g.lineWidth = lw;
  } else if (hat === 'earmuffs') {
    g.strokeStyle = '#475569'; g.lineWidth = hr * 0.16;
    g.beginPath(); g.arc(hx, hy, hr * 1.02, Math.PI * 1.05, Math.PI * 1.95); g.stroke();
    g.lineWidth = lw; g.strokeStyle = OUTLINE;
    g.fillStyle = col || '#f472b6';
    circ(g, hx - hr * 0.95, hy, hr * 0.32); g.fill(); g.stroke();
  } else if (hat === 'horns') {
    g.fillStyle = col || '#d6d3d1';
    for (const s of [-1, 1]) {
      g.beginPath();
      g.moveTo(hx + s * hr * 0.35, hy - hr * 0.75);
      g.quadraticCurveTo(hx + s * hr * 1.0, hy - hr * 1.1, hx + s * hr * 0.9, hy - hr * 1.7);
      g.quadraticCurveTo(hx + s * hr * 0.6, hy - hr * 1.15, hx + s * hr * 0.05, hy - hr * 0.9);
      g.closePath(); g.fill(); g.stroke();
    }
  } else if (hat === 'flame') {
    const fl = Math.sin(t * 18) * hr * 0.12;
    g.fillStyle = '#f97316';
    g.beginPath();
    g.moveTo(hx - hr * 0.7, hy - hr * 0.6);
    g.quadraticCurveTo(hx - hr * 0.8, hy - hr * 1.5 + fl, hx - hr * 0.2, hy - hr * 1.9 - fl);
    g.quadraticCurveTo(hx - hr * 0.1, hy - hr * 1.3, hx + hr * 0.25, hy - hr * 1.75 + fl);
    g.quadraticCurveTo(hx + hr * 0.5, hy - hr * 1.2, hx + hr * 0.8, hy - hr * 1.45 - fl);
    g.quadraticCurveTo(hx + hr * 0.9, hy - hr * 0.9, hx + hr * 0.6, hy - hr * 0.6);
    g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#fde047';
    ell(g, hx, hy - hr * 1.05, hr * 0.32, hr * 0.42 + fl * 0.5); g.fill();
  } else if (hat === 'antenna') {
    g.strokeStyle = '#334155'; g.lineWidth = lw;
    for (const s of [-1, 1]) {
      g.beginPath(); g.moveTo(hx + s * hr * 0.3, hy - hr * 0.85);
      g.quadraticCurveTo(hx + s * hr * 0.6, hy - hr * 1.5, hx + s * hr * 0.55 + Math.sin(t * 6 + s) * hr * 0.15, hy - hr * 1.75);
      g.stroke();
      g.fillStyle = col || '#f0abfc'; circ(g, hx + s * hr * 0.55 + Math.sin(t * 6 + s) * hr * 0.15, hy - hr * 1.8, hr * 0.2); g.fill(); g.stroke();
    }
    g.strokeStyle = OUTLINE;
  } else if (hat === 'bubble') {
    g.save();
    g.fillStyle = 'rgba(186,230,253,0.28)'; g.strokeStyle = 'rgba(224,242,254,0.95)'; g.lineWidth = lw * 1.1;
    circ(g, hx + hr * 0.15, hy, hr * 1.45); g.fill(); g.stroke();
    g.strokeStyle = 'rgba(255,255,255,0.85)'; g.lineWidth = lw * 0.9;
    g.beginPath(); g.arc(hx + hr * 0.15, hy, hr * 1.15, Math.PI * 1.15, Math.PI * 1.45); g.stroke();
    g.fillStyle = '#94a3b8'; rr(g, hx - hr * 1.0, hy + hr * 1.1, hr * 2.3, hr * 0.35, hr * 0.15); g.fill();
    g.restore();
  } else if (hat === 'ninja') {
    // Stealth ninja mask & red headband
    g.fillStyle = '#0f172a';
    rr(g, hx - hr * 0.85, hy - hr * 0.1, hr * 1.8, hr * 0.75, hr * 0.2); g.fill(); g.stroke();
    g.strokeStyle = col || '#ef4444'; g.lineWidth = hr * 0.24;
    g.beginPath(); g.arc(hx, hy - hr * 0.1, hr * 0.92, Math.PI * 1.1, Math.PI * 1.9); g.stroke();
    const kx = hx - hr * 0.85, ky = hy - hr * 0.35;
    g.beginPath(); g.moveTo(kx, ky); g.lineTo(kx - hr * 0.65, ky + Math.sin(t * 12) * hr * 0.25); g.stroke();
    g.beginPath(); g.moveTo(kx, ky); g.lineTo(kx - hr * 0.55, ky + Math.sin(t * 12 + 1.2) * hr * 0.25 + hr * 0.15); g.stroke();
    g.strokeStyle = OUTLINE; g.lineWidth = lw;
  } else if (hat === 'cowboy') {
    // Wild West wide-brim leather hat
    g.fillStyle = col || '#78350f';
    ell(g, hx, hy - hr * 0.45, hr * 1.55, hr * 0.38); g.fill(); g.stroke();
    rr(g, hx - hr * 0.7, hy - hr * 1.3, hr * 1.4, hr * 0.9, hr * 0.25); g.fill(); g.stroke();
    g.fillStyle = '#451a03';
    rr(g, hx - hr * 0.72, hy - hr * 0.65, hr * 1.44, hr * 0.2, hr * 0.05); g.fill();
    g.fillStyle = '#facc15'; circ(g, hx, hy - hr * 0.55, hr * 0.1); g.fill();
  } else if (hat === 'turban') {
    // Desert Oasis wrapped turban
    g.fillStyle = col || '#ea580c';
    ell(g, hx, hy - hr * 0.55, hr * 1.25, hr * 0.75); g.fill(); g.stroke();
    g.fillStyle = 'rgba(255,255,255,0.2)';
    ell(g, hx - hr * 0.2, hy - hr * 0.65, hr * 0.8, hr * 0.45, -0.2); g.fill();
    g.fillStyle = gem || '#10b981'; circ(g, hx, hy - hr * 0.6, hr * 0.15); g.fill(); g.stroke();
    g.fillStyle = col || '#ea580c';
    g.beginPath(); g.moveTo(hx - hr * 0.9, hy - hr * 0.3); g.lineTo(hx - hr * 1.2, hy + hr * 0.4); g.lineTo(hx - hr * 0.7, hy + hr * 0.3); g.closePath(); g.fill(); g.stroke();
  } else if (hat === 'safari') {
    // Archaeologist pith helmet
    g.fillStyle = col || '#a16207';
    ell(g, hx, hy - hr * 0.4, hr * 1.4, hr * 0.38); g.fill(); g.stroke();
    g.beginPath(); g.arc(hx, hy - hr * 0.45, hr * 0.92, Math.PI, 0); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#713f12'; rr(g, hx - hr * 0.92, hy - hr * 0.55, hr * 1.84, hr * 0.16, hr * 0.05); g.fill();
  } else if (hat === 'pharaoh') {
    // Ancient Pharaoh nemes headdress
    g.fillStyle = col || '#facc15';
    g.beginPath();
    g.moveTo(hx - hr * 1.3, hy + hr * 0.6);
    g.lineTo(hx - hr * 1.1, hy - hr * 0.8);
    g.lineTo(hx, hy - hr * 1.25);
    g.lineTo(hx + hr * 1.1, hy - hr * 0.8);
    g.lineTo(hx + hr * 1.3, hy + hr * 0.6);
    g.lineTo(hx + hr * 0.75, hy + hr * 0.5);
    g.lineTo(hx + hr * 0.5, hy - hr * 0.3);
    g.lineTo(hx - hr * 0.5, hy - hr * 0.3);
    g.lineTo(hx - hr * 0.75, hy + hr * 0.5);
    g.closePath(); g.fill(); g.stroke();
    // Lapis blue stripes
    g.strokeStyle = gem || '#0284c7'; g.lineWidth = hr * 0.16;
    for (let i = -2; i <= 2; i++) {
      g.beginPath(); g.moveTo(hx + i * hr * 0.4, hy - hr * 1.15); g.lineTo(hx + i * hr * 0.45, hy - hr * 0.3); g.stroke();
    }
    g.fillStyle = '#ef4444'; circ(g, hx, hy - hr * 1.2, hr * 0.14); g.fill(); g.stroke();
    g.strokeStyle = OUTLINE; g.lineWidth = lw;
  } else if (hat === 'viking') {
    // Frost Viking iron helmet with horns
    g.fillStyle = col || '#94a3b8';
    g.beginPath(); g.arc(hx, hy - hr * 0.2, hr * 1.0, Math.PI, 0); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#475569'; rr(g, hx - hr * 1.05, hy - hr * 0.35, hr * 2.1, hr * 0.25, hr * 0.08); g.fill(); g.stroke();
    g.fillStyle = '#f1f5f9';
    for (const s of [-1, 1]) {
      g.beginPath();
      g.moveTo(hx + s * hr * 0.8, hy - hr * 0.3);
      g.quadraticCurveTo(hx + s * hr * 1.5, hy - hr * 0.9, hx + s * hr * 1.4, hy - hr * 1.7);
      g.quadraticCurveTo(hx + s * hr * 1.0, hy - hr * 1.1, hx + s * hr * 0.6, hy - hr * 0.7);
      g.closePath(); g.fill(); g.stroke();
    }
  } else if (hat === 'ice_crown') {
    // Crystalline jagged ice peaks
    g.fillStyle = col || '#bae6fd';
    g.beginPath();
    g.moveTo(hx - hr * 1.1, hy - hr * 0.5);
    g.lineTo(hx - hr * 1.0, hy - hr * 1.4);
    g.lineTo(hx - hr * 0.5, hy - hr * 0.85);
    g.lineTo(hx, hy - hr * 1.75);
    g.lineTo(hx + hr * 0.5, hy - hr * 0.85);
    g.lineTo(hx + hr * 1.0, hy - hr * 1.4);
    g.lineTo(hx + hr * 1.1, hy - hr * 0.5);
    g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#ffffff';
    g.beginPath(); g.moveTo(hx - hr * 0.1, hy - hr * 1.6); g.lineTo(hx, hy - hr * 0.9); g.lineTo(hx + hr * 0.1, hy - hr * 1.6); g.fill();
  } else if (hat === 'biker') {
    // Biker bandana with flame skull
    g.fillStyle = col || '#dc2626';
    g.beginPath(); g.arc(hx, hy - hr * 0.1, hr * 0.92, Math.PI * 1.05, Math.PI * 1.95); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#1c1917'; rr(g, hx - hr * 1.0, hy - hr * 0.28, hr * 2.0, hr * 0.26, hr * 0.08); g.fill(); g.stroke();
    g.fillStyle = '#fbbf24'; circ(g, hx, hy - hr * 0.5, hr * 0.14); g.fill();
  } else if (hat === 'visor') {
    // Cyberpunk glowing neon visor
    g.fillStyle = 'rgba(168,85,247,0.85)'; g.strokeStyle = '#22d3ee'; g.lineWidth = hr * 0.12;
    rr(g, hx - hr * 0.2, hy - hr * 0.35, hr * 1.45, hr * 0.55, hr * 0.18); g.fill(); g.stroke();
    g.strokeStyle = '#ffffff'; g.lineWidth = hr * 0.06;
    g.beginPath(); g.moveTo(hx, hy - hr * 0.15); g.lineTo(hx + hr * 0.9, hy - hr * 0.15); g.stroke();
    g.strokeStyle = OUTLINE; g.lineWidth = lw;
  } else if (hat === 'admiral') {
    // Cosmic Star Admiral officer cap
    g.fillStyle = col || '#1e1b4b';
    ell(g, hx, hy - hr * 0.8, hr * 1.15, hr * 0.4); g.fill(); g.stroke();
    g.fillStyle = '#0f172a';
    rr(g, hx - hr * 0.9, hy - hr * 0.65, hr * 1.8, hr * 0.45, hr * 0.1); g.fill(); g.stroke();
    // Shiny patent visor
    g.fillStyle = '#020617';
    ell(g, hx + hr * 0.4, hy - hr * 0.2, hr * 0.8, hr * 0.22, 0.15); g.fill(); g.stroke();
  } else if (hat === 'mummy_wrap') {
    // Ancient mummy bandages with glowing golden eyes
    g.fillStyle = col || '#fef3c7';
    ell(g, hx, hy - hr * 0.4, hr * 1.15, hr * 0.85); g.fill(); g.stroke();
    g.strokeStyle = '#b45309'; g.lineWidth = 1.4;
    g.beginPath();
    g.moveTo(hx - hr, hy - hr * 0.7); g.lineTo(hx + hr * 0.8, hy - hr * 0.2);
    g.moveTo(hx - hr * 0.8, hy - hr * 0.1); g.lineTo(hx + hr * 0.9, hy - hr * 0.6);
    g.stroke();
    g.fillStyle = '#facc15'; circ(g, hx + hr * 0.3, hy - hr * 0.2, hr * 0.16); g.fill();
  } else if (hat === 'parka_hood') {
    // Arctic warm parka hood with thick fluffy fur border
    g.fillStyle = col || '#0284c7';
    g.beginPath(); g.arc(hx, hy - hr * 0.2, hr * 1.25, Math.PI, 0); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#f8fafc'; g.strokeStyle = '#94a3b8'; g.lineWidth = 1.6;
    for (let i = 0; i < 7; i++) {
      const a = Math.PI + (i / 6) * Math.PI;
      circ(g, hx + Math.cos(a) * hr * 1.25, hy - hr * 0.2 + Math.sin(a) * hr * 1.25, hr * 0.28); g.fill(); g.stroke();
    }
  } else if (hat === 'demon_horns') {
    // Volcanic demonic basalt horns with burning magma tips
    for (const s of [-1, 1]) {
      g.beginPath();
      g.moveTo(hx + s * hr * 0.3, hy - hr * 0.6);
      g.quadraticCurveTo(hx + s * hr * 1.2, hy - hr * 1.2, hx + s * hr * 1.1, hy - hr * 2.0);
      g.quadraticCurveTo(hx + s * hr * 0.7, hy - hr * 1.2, hx + s * hr * 0.05, hy - hr * 0.8);
      g.closePath();
      g.fillStyle = '#1c1917'; g.fill(); g.stroke();
      g.fillStyle = '#f97316'; circ(g, hx + s * hr * 1.1, hy - hr * 2.0, hr * 0.18); g.fill();
    }
  } else if (hat === 'cyber_helmet') {
    // Sci-fi astronaut glass dome with holographic antenna
    g.fillStyle = 'rgba(34,211,238,0.3)'; g.strokeStyle = '#06b6d4'; g.lineWidth = 2;
    circ(g, hx, hy - hr * 0.1, hr * 1.35); g.fill(); g.stroke();
    g.fillStyle = '#0f172a'; rr(g, hx - hr * 0.8, hy + hr * 0.85, hr * 1.6, hr * 0.35, 3); g.fill(); g.stroke();
  } else if (hat === 'dummy_sensor') {
    // Overwatch practice bot top sensor antenna
    g.fillStyle = '#334155'; rr(g, hx - hr * 0.2, hy - hr * 1.2, hr * 0.4, hr * 0.6, 2); g.fill(); g.stroke();
    g.fillStyle = '#ea580c'; circ(g, hx, hy - hr * 1.2, hr * 0.24); g.fill(); g.stroke();
  }
}

function drawGun(g, o, r, face) {
  g.save();
  g.translate(0, r * 0.05);
  g.rotate(o.aim);
  if (face < 0) g.scale(1, -1);
  const s = r / 22;
  g.scale(s, s);
  g.translate(-(o.recoil || 0) * 7, 0);
  g.lineWidth = 1.8; g.strokeStyle = OUTLINE; g.lineJoin = 'round';
  const F = (c) => { g.fillStyle = c; g.fill(); g.stroke(); };
  switch (o.gun) {
    case 'pistol':
      rr(g, 10, 3, 8, 12, 3); F('#ea580c');
      rr(g, 8, -6, 26, 12, 4); F('#f97316');
      rr(g, 33, -3, 8, 6, 2); F('#fde047');
      circ(g, 18, -10, 6.5); F('#22c55e');
      break;
    case 'soaker':
      rr(g, 22, 5, 18, 6, 3); F('#1d4ed8');
      rr(g, 4, -7, 44, 14, 5); F('#3b82f6');
      rr(g, 7, -20, 28, 12, 5); F('#facc15');
      rr(g, 47, -3, 11, 6, 2); F('#f97316');
      g.fillStyle = 'rgba(255,255,255,0.5)'; g.fillRect(10, -17, 18, 3);
      break;
    case 'shotgun':
      rr(g, 6, -7, 34, 14, 4); F('#ef4444');
      g.beginPath(); g.moveTo(40, -6); g.lineTo(53, -12); g.lineTo(53, 12); g.lineTo(40, 6); g.closePath(); F('#fbbf24');
      circ(g, 20, -12, 8); F('#a855f7');
      rr(g, 14, 5, 9, 12, 3); F('#b91c1c');
      break;
    case 'balloon':
      rr(g, 0, -9, 42, 18, 7); F('#8b5cf6');
      g.fillStyle = '#c4b5fd'; g.fillRect(12, -9, 4, 18); g.fillRect(26, -9, 4, 18);
      if (!o.empty) { circ(g, 47, 0, 7.5); F('#f472b6'); }
      break;
    case 'hose':
      g.save(); g.strokeStyle = '#dc2626'; g.lineWidth = 6; g.lineCap = 'round';
      g.beginPath(); g.moveTo(4, 0); g.quadraticCurveTo(-18, 28, -40, 18); g.stroke(); g.restore();
      rr(g, 2, -8, 13, 16, 4); F('#b91c1c');
      g.beginPath(); g.moveTo(14, -6); g.lineTo(44, -4); g.lineTo(44, 4); g.lineTo(14, 6); g.closePath(); F('#d4a017');
      rr(g, 43, -5, 5, 10, 2); F('#92400e');
      break;
    case 'sniper':
      rr(g, -10, -6, 16, 13, 4); F('#0369a1');
      rr(g, 2, -4, 62, 8, 3); F('#0ea5e9');
      rr(g, 18, -15, 22, 7, 3); F('#111827');
      circ(g, 40, -11.5, 3.5); F('#67e8f9');
      rr(g, 26, 3, 12, 7, 3); F('#facc15');
      break;
    case 'mega':
      rr(g, 0, -12, 60, 24, 8); F('#f59e0b');
      rr(g, 6, -30, 40, 18, 7); F('#22d3ee');
      rr(g, 58, -6, 14, 12, 3); F('#dc2626');
      break;
    case 'boss_farm_gun':
      // Royal Golden Water Cannon (Farm Boss King Rooster)
      rr(g, -6, -14, 66, 28, 8); F('#f59e0b');
      rr(g, 8, -32, 38, 20, 8); F('#38bdf8'); // Royal water glass bulb
      g.fillStyle = '#ef4444'; circ(g, 27, -22, 6); g.fill(); // Ruby gem inside
      // Lion-mouth gold cannon muzzle
      g.beginPath(); g.moveTo(58, -16); g.lineTo(76, -22); g.lineTo(76, 22); g.lineTo(58, 16); g.closePath(); F('#facc15');
      g.fillStyle = '#dc2626'; rr(g, 8, 8, 14, 12, 3); g.fill(); g.stroke(); // Velvet grip
      break;
    case 'boss_desert_gun':
      // Sun-God Ankh Blaster (Desert Pharaoh Boss)
      rr(g, -4, -8, 62, 16, 5); F('#f59e0b');
      // Glowing Egyptian Ankh cross
      g.fillStyle = '#06b6d4'; g.strokeStyle = '#facc15'; g.lineWidth = 2;
      circ(g, 58, -12, 10); g.fill(); g.stroke();
      g.fillRect(54, -2, 8, 18); g.fillRect(44, 4, 28, 6);
      // Cobra head golden nozzle
      g.fillStyle = '#ea580c'; circ(g, 72, -1, 7); g.fill(); g.stroke();
      break;
    case 'boss_ice_gun':
      // Glacial Cryo-Minigun (Snow Yeti Boss)
      rr(g, -8, -14, 52, 28, 6); F('#0284c7');
      // Quad icicle freeze barrels
      for (let k = -2; k <= 2; k += 2) {
        rr(g, 42, k * 5 - 3, 26, 6, 2); F('#bae6fd');
      }
      // Frosted liquid nitrogen tank
      rr(g, 6, -26, 32, 14, 5); F('#38bdf8');
      g.fillStyle = '#ffffff'; g.fillRect(10, -23, 24, 4);
      break;
    case 'boss_magma_gun':
      // Volcano Magma Mortar (Magma Rooster Boss)
      rr(g, -6, -16, 56, 32, 6); F('#1c1917'); // Basalt cannon body
      // Glowing lava fissures on cannon
      g.strokeStyle = '#f97316'; g.lineWidth = 2.5;
      g.beginPath(); g.moveTo(4, -10); g.lineTo(24, 0); g.lineTo(44, -8); g.stroke();
      // Molten dragon maw muzzle
      g.beginPath(); g.moveTo(48, -16); g.lineTo(72, -24); g.lineTo(66, 0); g.lineTo(72, 24); g.lineTo(48, 16); g.closePath(); F('#dc2626');
      g.fillStyle = '#fbbf24'; circ(g, 62, 0, 9); g.fill(); // Molten core
      break;
    case 'boss_space_gun':
      // Dual Quantum Laser Cannon (Space Emperor Cluck)
      rr(g, -8, -12, 54, 24, 6); F('#1e1b4b');
      // Dual futuristic neon plasma rail emitters
      rr(g, 44, -14, 30, 8, 3); F('#9333ea');
      rr(g, 44, 6, 30, 8, 3); F('#9333ea');
      g.fillStyle = '#22d3ee'; g.fillRect(48, -12, 22, 4); g.fillRect(48, 8, 22, 4);
      // Pulsing dark matter singularity sphere
      g.fillStyle = '#06b6d4'; circ(g, 20, 0, 10); g.fill();
      g.fillStyle = '#ffffff'; circ(g, 20, 0, 4); g.fill();
      break;
    case 'dummy_blaster':
      // Training practice bot nozzle
      rr(g, 4, -8, 36, 16, 5); F('#3b82f6');
      g.fillStyle = '#ea580c'; circ(g, 40, 0, 8); g.fill(); g.stroke();
      g.fillStyle = '#fde047'; circ(g, 40, 0, 4); g.fill();
      break;
    case 'cryo_cannon':
      rr(g, 0, -10, 48, 20, 6); F('#0284c7');
      rr(g, 10, -18, 26, 10, 4); F('#38bdf8');
      g.fillStyle = '#bae6fd'; g.fillRect(14, -16, 18, 4);
      g.beginPath(); g.moveTo(48, -12); g.lineTo(60, -16); g.lineTo(60, 16); g.lineTo(48, 12); g.closePath(); F('#7dd3fc');
      circ(g, 22, -3, 6); F('#ffffff');
      break;
    case 'magma_blaster':
      rr(g, 2, -10, 46, 20, 5); F('#451a03');
      rr(g, 8, -20, 24, 12, 4); F('#ea580c');
      g.fillStyle = '#fde047'; g.fillRect(12, -18, 16, 4);
      rr(g, 46, -8, 14, 16, 3); F('#dc2626');
      rr(g, 58, -6, 6, 12, 2); F('#fbbf24');
      break;
    case 'plasma_pulsar':
      rr(g, -4, -8, 54, 16, 5); F('#1e1b4b');
      rr(g, 12, -16, 28, 9, 3); F('#9333ea');
      g.fillStyle = '#22d3ee'; g.fillRect(18, -6, 4, 12); g.fillRect(26, -6, 4, 12); g.fillRect(34, -6, 4, 12);
      rr(g, 50, -6, 12, 12, 3); F('#06b6d4');
  }
  // wing holding the gun
  g.fillStyle = o.flash ? '#fff' : o.wing;
  ell(g, 6, 2, 13, 9, 0.3); g.fill(); g.stroke();
  g.restore();
}

// ---------- Props (supports 5 biomes: Farm, Desert, Snow, Volcano, Space) ----------
function drawTree(g, o, fade, wIdx = 0) {
  const { x, y } = o;
  g.fillStyle = 'rgba(0,0,0,0.2)'; ell(g, x, y + 8, 46, 16); g.fill();
  g.lineWidth = 3; g.strokeStyle = OUTLINE;
  g.save();
  g.globalAlpha = fade;

  if (wIdx === 1) { // Desert: Giant Saguaro Cactus
    const cw = 16, ch = 96;
    g.strokeStyle = '#14532d'; g.lineWidth = 3;
    // Main trunk
    rr(g, x - cw / 2, y - ch, cw, ch + 8, cw / 2); g.fillStyle = '#16a34a'; g.fill(); g.stroke();
    // 3D Trunk shadow / highlight stripe
    g.fillStyle = '#22c55e'; g.fillRect(x - cw / 2 + 3, y - ch + 4, cw - 6, ch);
    g.fillStyle = '#4ade80'; g.fillRect(x - 2, y - ch + 6, 4, ch - 4);
    // Vertical ribbed spines
    g.strokeStyle = '#15803d'; g.lineWidth = 1.5;
    g.beginPath();
    g.moveTo(x - 4, y - ch + 6); g.lineTo(x - 4, y + 4);
    g.moveTo(x + 4, y - ch + 6); g.lineTo(x + 4, y + 4);
    g.stroke();

    // Left arm
    g.beginPath();
    g.moveTo(x - cw / 2, y - ch * 0.42);
    g.lineTo(x - cw * 2.1, y - ch * 0.42);
    g.lineTo(x - cw * 2.1, y - ch * 0.82);
    g.lineWidth = cw * 0.85; g.lineCap = 'round'; g.lineJoin = 'round';
    g.strokeStyle = '#14532d'; g.stroke();
    g.lineWidth = cw * 0.62; g.strokeStyle = '#22c55e'; g.stroke();

    // Right arm
    g.beginPath();
    g.moveTo(x + cw / 2, y - ch * 0.32);
    g.lineTo(x + cw * 2.0, y - ch * 0.32);
    g.lineTo(x + cw * 2.0, y - ch * 0.72);
    g.lineWidth = cw * 0.85; g.strokeStyle = '#14532d'; g.stroke();
    g.lineWidth = cw * 0.62; g.strokeStyle = '#22c55e'; g.stroke();

    // Little prickly needle dots along sides
    g.fillStyle = '#fef08a';
    for (let py = y - ch + 15; py < y; py += 18) {
      circ(g, x - cw / 2 - 1, py, 1.5); g.fill();
      circ(g, x + cw / 2 + 1, py, 1.5); g.fill();
    }

    // Blooming cactus flowers (top of trunk & arms)
    const flowers = [
      [x, y - ch - 3, 7.5],
      [x - cw * 2.1, y - ch * 0.82 - 3, 5.5],
      [x + cw * 2.0, y - ch * 0.72 - 3, 5.5]
    ];
    for (const [fx, fy, fr] of flowers) {
      g.fillStyle = '#f43f5e'; circ(g, fx, fy, fr); g.fill();
      g.strokeStyle = '#be123c'; g.lineWidth = 1.5; circ(g, fx, fy, fr); g.stroke();
      g.fillStyle = '#fde047'; circ(g, fx, fy, fr * 0.45); g.fill();
    }
  } else if (wIdx === 2) { // Snow: Majestic Frosted Alpine Fir / Pine Tree
    // --- Trunk ---
    g.beginPath();
    g.moveTo(x - 10, y + 6);
    g.lineTo(x - 7, y - 28);
    g.lineTo(x + 7, y - 28);
    g.lineTo(x + 10, y + 6);
    g.closePath();
    g.fillStyle = '#78350f'; g.fill();
    g.strokeStyle = '#451a03'; g.lineWidth = 2.5; g.stroke();
    // Bark lines
    g.strokeStyle = '#451a03'; g.lineWidth = 1.5;
    g.beginPath();
    g.moveTo(x - 3, y + 4); g.lineTo(x - 2, y - 22);
    g.moveTo(x + 3, y + 2); g.lineTo(x + 2, y - 24);
    g.stroke();
    // Base snow mound around trunk
    g.fillStyle = '#f8fafc'; g.strokeStyle = '#cbd5e1'; g.lineWidth = 2;
    ell(g, x, y + 5, 20, 7); g.fill(); g.stroke();

    // 3 Lush, Wide, Sculpted Pine Tiers (bottom to top)
    const tiers = [
      { topY: -45, botY: -12, hw: 52 }, // Tier 1 (bottom bough)
      { topY: -76, botY: -40, hw: 42 }, // Tier 2 (mid bough)
      { topY: -108, botY: -68, hw: 30 }  // Tier 3 (top bough)
    ];

    for (let i = 0; i < tiers.length; i++) {
      const { topY, botY, hw } = tiers[i];
      const ty = y + topY;
      const by = y + botY;

      // --- Pine Tier Foliage Body (Forest Fir Green) ---
      g.beginPath();
      g.moveTo(x, ty);
      // Left jagged pine bough
      g.lineTo(x - hw * 0.38, ty + (by - ty) * 0.35);
      g.lineTo(x - hw * 0.28, ty + (by - ty) * 0.42);
      g.lineTo(x - hw * 0.72, ty + (by - ty) * 0.72);
      g.lineTo(x - hw * 0.60, ty + (by - ty) * 0.78);
      g.lineTo(x - hw, by);
      // Bottom scalloped branch rim
      g.quadraticCurveTo(x - hw * 0.55, by - 6, x - hw * 0.25, by);
      g.quadraticCurveTo(x, by - 5, x + hw * 0.25, by);
      g.quadraticCurveTo(x + hw * 0.55, by - 6, x + hw, by);
      // Right jagged pine bough
      g.lineTo(x + hw * 0.60, ty + (by - ty) * 0.78);
      g.lineTo(x + hw * 0.72, ty + (by - ty) * 0.72);
      g.lineTo(x + hw * 0.28, ty + (by - ty) * 0.42);
      g.lineTo(x + hw * 0.38, ty + (by - ty) * 0.35);
      g.closePath();

      g.fillStyle = '#15803d'; g.fill();
      g.strokeStyle = '#052e16'; g.lineWidth = 2.8; g.stroke();

      // Pine foliage inner sunny highlight
      g.fillStyle = '#22c55e';
      g.beginPath();
      g.moveTo(x, ty + 6);
      g.lineTo(x - hw * 0.4, by - 6);
      g.quadraticCurveTo(x, by - 2, x + hw * 0.4, by - 6);
      g.closePath();
      g.fill();

      // --- Snow Drift Pillows on this Tier ---
      g.fillStyle = '#ffffff';
      g.strokeStyle = '#94a3b8';
      g.lineWidth = 2;

      // Upper snow drift
      g.beginPath();
      g.moveTo(x, ty);
      g.lineTo(x - hw * 0.38, ty + (by - ty) * 0.35);
      g.quadraticCurveTo(x - hw * 0.15, ty + (by - ty) * 0.48, x, ty + (by - ty) * 0.44);
      g.quadraticCurveTo(x + hw * 0.15, ty + (by - ty) * 0.48, x + hw * 0.38, ty + (by - ty) * 0.35);
      g.closePath();
      g.fill(); g.stroke();

      // Lower bough snow drift pillows
      g.beginPath();
      g.moveTo(x - hw * 0.3, ty + (by - ty) * 0.55);
      g.lineTo(x - hw * 0.72, ty + (by - ty) * 0.72);
      g.quadraticCurveTo(x - hw * 0.4, ty + (by - ty) * 0.82, x, ty + (by - ty) * 0.76);
      g.quadraticCurveTo(x + hw * 0.4, ty + (by - ty) * 0.82, x + hw * 0.72, ty + (by - ty) * 0.72);
      g.lineTo(x + hw * 0.3, ty + (by - ty) * 0.55);
      g.quadraticCurveTo(x, ty + (by - ty) * 0.62, x - hw * 0.3, ty + (by - ty) * 0.55);
      g.closePath();
      g.fill(); g.stroke();

      // Fluffy snow blobs on the bottom tips
      ell(g, x - hw + 6, by - 2, 7, 4, -0.2); g.fill(); g.stroke();
      ell(g, x + hw - 6, by - 2, 7, 4, 0.2); g.fill(); g.stroke();
      ell(g, x, by - 4, 8, 4); g.fill(); g.stroke();

      // Cute holly berry details
      if (i === 0 && o.seed > 0.3) {
        g.fillStyle = '#ef4444';
        circ(g, x - hw + 14, by + 4, 3.5); g.fill();
        circ(g, x - hw + 20, by + 6, 3); g.fill();
        circ(g, x + hw - 14, by + 4, 3.5); g.fill();
      }
    }

    // Top Frosted Star / Snow Crown
    const crownY = y - 110;
    g.fillStyle = '#ffffff';
    g.beginPath();
    circ(g, x, crownY, 7);
    g.fill();
    g.strokeStyle = '#38bdf8'; g.lineWidth = 2; g.stroke();
    // Golden twinkling star center
    g.fillStyle = '#fde047'; circ(g, x, crownY, 3.5); g.fill();
    // Star glint rays
    g.strokeStyle = '#38bdf8'; g.lineWidth = 1.8;
    g.beginPath();
    g.moveTo(x - 9, crownY); g.lineTo(x + 9, crownY);
    g.moveTo(x, crownY - 9); g.lineTo(x, crownY + 9);
    g.stroke();
  } else if (wIdx === 3) { // Volcano: Charred Magma Spire
    // Jagged basalt needle monolith
    g.beginPath();
    g.moveTo(x - 24, y + 4);
    g.lineTo(x - 18, y - 45);
    g.lineTo(x - 12, y - 88);
    g.lineTo(x, y - 114);
    g.lineTo(x + 14, y - 82);
    g.lineTo(x + 20, y - 40);
    g.lineTo(x + 24, y + 4);
    g.closePath();
    g.fillStyle = '#1c1917'; g.fill();
    g.strokeStyle = '#0c0a09'; g.lineWidth = 3; g.stroke();

    // Faceted stone shadow
    g.fillStyle = '#292524';
    g.beginPath();
    g.moveTo(x, y - 114);
    g.lineTo(x + 14, y - 82);
    g.lineTo(x + 20, y - 40);
    g.lineTo(x + 24, y + 4);
    g.lineTo(x + 4, y + 4);
    g.lineTo(x + 2, y - 50);
    g.closePath();
    g.fill();

    // Branching glowing lava fissures
    g.strokeStyle = '#ea580c'; g.lineWidth = 3.5;
    g.beginPath();
    g.moveTo(x - 2, y - 105);
    g.lineTo(x + 3, y - 72);
    g.lineTo(x - 6, y - 35);
    g.lineTo(x + 5, y + 2);
    g.stroke();

    g.strokeStyle = '#fde047'; g.lineWidth = 1.8;
    g.beginPath();
    g.moveTo(x - 2, y - 105);
    g.lineTo(x + 3, y - 72);
    g.lineTo(x - 6, y - 35);
    g.lineTo(x + 5, y + 2);
    g.moveTo(x + 3, y - 72);
    g.lineTo(x + 12, y - 62);
    g.stroke();

    // Glowing magma pulse at summit
    g.fillStyle = '#f97316'; circ(g, x, y - 116, 7); g.fill();
    g.fillStyle = '#fde047'; circ(g, x, y - 116, 4); g.fill();
  } else if (wIdx === 4) { // Space: Alien Cosmic Pylon
    // Metallic Obelisk Tower
    g.beginPath();
    g.moveTo(x - 18, y + 4);
    g.lineTo(x - 10, y - 82);
    g.lineTo(x + 10, y - 82);
    g.lineTo(x + 18, y + 4);
    g.closePath();
    g.fillStyle = '#1e1b4b'; g.fill();
    g.strokeStyle = '#4338ca'; g.lineWidth = 3; g.stroke();

    // Neon circuit pathways
    g.strokeStyle = '#a855f7'; g.lineWidth = 2.5;
    g.strokeRect(x - 6, y - 75, 12, 65);
    g.strokeStyle = '#22d3ee'; g.lineWidth = 1.8;
    g.beginPath();
    g.moveTo(x, y - 72); g.lineTo(x, y - 12);
    g.moveTo(x - 5, y - 45); g.lineTo(x + 5, y - 45);
    g.stroke();

    // Levitating Quantum Crystal at Summit
    const cryY = y - 108;
    g.strokeStyle = 'rgba(34, 211, 238, 0.6)'; g.lineWidth = 2;
    g.beginPath(); g.moveTo(x, y - 82); g.lineTo(x, cryY + 12); g.stroke();

    // Crystal Octahedron Diamond
    g.beginPath();
    g.moveTo(x, cryY - 14);
    g.lineTo(x + 11, cryY);
    g.lineTo(x, cryY + 14);
    g.lineTo(x - 11, cryY);
    g.closePath();
    g.fillStyle = '#06b6d4'; g.fill();
    g.strokeStyle = '#22d3ee'; g.lineWidth = 2.2; g.stroke();

    // Crystal facet highlight
    g.beginPath();
    g.moveTo(x, cryY - 14);
    g.lineTo(x + 11, cryY);
    g.lineTo(x, cryY + 14);
    g.closePath();
    g.fillStyle = 'rgba(255, 255, 255, 0.4)'; g.fill();

    // Orbiting energy ring
    g.strokeStyle = '#c084fc'; g.lineWidth = 1.8;
    g.beginPath();
    g.ellipse(x, cryY, 18, 6, -0.2, 0, TAU);
    g.stroke();
  } else { // Farm: Classic Lush Oak Tree
    // Sturdy Oak Trunk
    g.beginPath();
    g.moveTo(x - 13, y + 4);
    g.lineTo(x - 9, y - 42);
    g.lineTo(x + 9, y - 42);
    g.lineTo(x + 13, y + 4);
    g.closePath();
    g.fillStyle = '#78350f'; g.fill();
    g.strokeStyle = '#451a03'; g.lineWidth = 3; g.stroke();
    // Bark grain
    g.strokeStyle = '#451a03'; g.lineWidth = 1.6;
    g.beginPath();
    g.moveTo(x - 4, y + 2); g.lineTo(x - 3, y - 36);
    g.moveTo(x + 4, y + 1); g.lineTo(x + 3, y - 30);
    g.stroke();

    // Rich Layered Foliage Canopies
    const blobs = [[0, -78, 56], [-40, -58, 40], [40, -60, 42], [0, -112, 40], [-26, -96, 34], [28, -98, 34]];
    g.fillStyle = '#14532d';
    for (const b of blobs) { circ(g, x + b[0], y + b[1], b[2] + 4); g.fill(); }
    g.strokeStyle = '#052e16'; g.lineWidth = 2.5;
    for (const b of blobs) { circ(g, x + b[0], y + b[1], b[2] + 4); g.stroke(); }
    g.fillStyle = '#16a34a';
    for (const b of blobs) { circ(g, x + b[0], y + b[1], b[2]); g.fill(); }
    g.fillStyle = '#4ade80';
    for (const b of blobs) { circ(g, x + b[0] - b[2] * 0.25, y + b[1] - b[2] * 0.3, b[2] * 0.45); g.fill(); }

    // Ripe Red Apples
    if (o.seed > 0.4) {
      g.fillStyle = '#ef4444';
      for (let i = 0; i < 6; i++) {
        const ax = x - 38 + ((o.seed * 1000 + i * 37) % 76);
        const ay = y - 116 + ((o.seed * 777 + i * 53) % 76);
        circ(g, ax, ay, 5.5); g.fill();
        g.strokeStyle = '#991b1b'; g.lineWidth = 1.2; circ(g, ax, ay, 5.5); g.stroke();
        g.fillStyle = '#86efac'; circ(g, ax + 2, ay - 4, 2); g.fill();
      }
    }
  }
  g.restore();
}

function drawHay(g, o, wIdx = 0) {
  const { x, y } = o;
  g.fillStyle = 'rgba(0,0,0,0.2)'; ell(g, x, y + 10, 40, 13); g.fill();
  g.lineWidth = 3;

  if (wIdx === 1) { // Desert: Terracotta Ancient Urn
    g.strokeStyle = '#7c2d12';
    g.beginPath();
    g.moveTo(x - 14, y - 44); g.lineTo(x + 14, y - 44);
    g.bezierCurveTo(x + 30, y - 30, x + 28, y - 6, x + 16, y + 6);
    g.lineTo(x - 16, y + 6);
    g.bezierCurveTo(x - 28, y - 6, x - 30, y - 30, x - 14, y - 44);
    g.closePath();
    g.fillStyle = '#ea580c'; g.fill(); g.stroke();
    rr(g, x - 16, y - 50, 32, 8, 3); g.fillStyle = '#c2410c'; g.fill(); g.stroke();
    // Aztec turquoise & gold trim
    g.strokeStyle = '#fde047'; g.lineWidth = 2.5;
    g.beginPath(); g.moveTo(x - 20, y - 22); g.lineTo(x + 20, y - 22); g.stroke();
    circ(g, x, y - 22, 4.5); g.fillStyle = '#38bdf8'; g.fill();
    circ(g, x - 12, y - 22, 3); g.fillStyle = '#38bdf8'; g.fill();
    circ(g, x + 12, y - 22, 3); g.fillStyle = '#38bdf8'; g.fill();
  } else if (wIdx === 2) { // Snow: Snowdrift Igloo
    // Base snowdrift footprint
    g.fillStyle = '#e2e8f0'; ell(g, x, y + 4, 38, 14); g.fill();

    // Igloo dome
    g.strokeStyle = '#64748b'; g.lineWidth = 2.8;
    g.beginPath();
    g.arc(x, y + 2, 32, Math.PI, 0);
    g.closePath();
    g.fillStyle = '#f8fafc'; g.fill(); g.stroke();

    // Ice brick seams (horizontal arcs)
    g.strokeStyle = '#94a3b8'; g.lineWidth = 1.8;
    g.beginPath(); g.arc(x, y + 2, 23, Math.PI * 0.95, Math.PI * 0.05); g.stroke();
    g.beginPath(); g.arc(x, y + 2, 13, Math.PI * 0.95, Math.PI * 0.05); g.stroke();
    // Vertical brick mortar cuts
    g.beginPath();
    g.moveTo(x - 26, y + 2); g.lineTo(x - 21, y - 8);
    g.moveTo(x - 7, y - 3); g.lineTo(x - 5, y - 12);
    g.moveTo(x + 12, y + 1); g.lineTo(x + 10, y - 9);
    g.moveTo(x - 13, y - 14); g.lineTo(x - 11, y - 22);
    g.moveTo(x + 4, y - 14); g.lineTo(x + 3, y - 22);
    g.stroke();

    // Igloo Entrance Tunnel on the side
    g.strokeStyle = '#475569'; g.lineWidth = 2.5;
    g.beginPath();
    g.arc(x + 15, y + 2, 13, Math.PI, 0);
    g.closePath();
    g.fillStyle = '#cbd5e1'; g.fill(); g.stroke();

    // Deep warm glowing doorway
    g.beginPath();
    g.arc(x + 15, y + 2, 9, Math.PI, 0);
    g.closePath();
    g.fillStyle = '#1e293b'; g.fill();
    // Warm golden lantern light spilling out from doorway
    g.fillStyle = 'rgba(251, 191, 36, 0.75)';
    circ(g, x + 15, y - 1, 6); g.fill();
    g.fillStyle = 'rgba(254, 240, 138, 0.9)';
    circ(g, x + 15, y - 1, 3); g.fill();

    // Frosted ventilation chimney on top
    rr(g, x - 4, y - 36, 8, 7, 2);
    g.fillStyle = '#94a3b8'; g.fill(); g.stroke();
    // Tiny gentle steam puff
    g.fillStyle = 'rgba(255, 255, 255, 0.7)';
    circ(g, x, y - 41, 3); g.fill();
    circ(g, x + 2, y - 46, 4.5); g.fill();
  } else if (wIdx === 3) { // Volcano: Sulfur Fumarole Vent
    g.strokeStyle = '#451a03';
    g.beginPath(); g.moveTo(x - 30, y + 6); g.lineTo(x - 18, y - 32); g.lineTo(x + 18, y - 32); g.lineTo(x + 30, y + 6); g.closePath();
    g.fillStyle = '#292524'; g.fill(); g.stroke();
    ell(g, x, y - 32, 16, 7); g.fillStyle = '#ea580c'; g.fill();
    ell(g, x, y - 32, 9, 4); g.fillStyle = '#fde047'; g.fill();
    // Fiery spark embers
    g.fillStyle = '#fbbf24';
    circ(g, x - 5, y - 42, 2.5); g.fill();
    circ(g, x + 7, y - 47, 2); g.fill();
  } else if (wIdx === 4) { // Space: Plasma Warp Capsule
    g.strokeStyle = '#6366f1';
    rr(g, x - 26, y - 38, 52, 44, 12); g.fillStyle = '#1e1b4b'; g.fill(); g.stroke();
    ell(g, x, y - 16, 14, 14); g.fillStyle = '#a855f7'; g.fill();
    circ(g, x, y - 16, 7); g.fillStyle = '#22d3ee'; g.fill();
  } else { // Farm: Classic Hay Bale
    g.strokeStyle = '#854d0e';
    rr(g, x - 34, y - 42, 68, 54, 14); g.fillStyle = '#eab308'; g.fill(); g.stroke();
    ell(g, x, y - 40, 32, 11); g.fillStyle = '#fde047'; g.fill(); g.stroke();
    g.strokeStyle = 'rgba(133,77,14,0.6)'; g.lineWidth = 2;
    for (let i = -2; i <= 2; i++) { g.beginPath(); g.moveTo(x + i * 12, y - 28); g.lineTo(x + i * 12 + 3, y + 8); g.stroke(); }
    g.beginPath(); g.ellipse(x, y - 40, 18, 6, 0, 0, TAU); g.stroke();
    g.strokeStyle = '#b91c1c'; g.lineWidth = 3;
    g.beginPath(); g.moveTo(x - 34, y - 14); g.lineTo(x + 34, y - 14); g.stroke();
  }
}

function drawRock(g, o, wIdx = 0) {
  const { x, y, r } = o;
  g.fillStyle = 'rgba(0,0,0,0.2)'; ell(g, x, y + 8, r * 1.1, r * 0.4); g.fill();
  g.lineWidth = 3;
  const strokeCol = wIdx === 1 ? '#78350f' : wIdx === 2 ? '#0284c7' : wIdx === 3 ? '#b91c1c' : wIdx === 4 ? '#9333ea' : '#334155';
  const fillCol = wIdx === 1 ? '#d97706' : wIdx === 2 ? '#bfdbfe' : wIdx === 3 ? '#1c1917' : wIdx === 4 ? '#312e81' : '#94a3b8';
  const hiCol = wIdx === 1 ? '#fde047' : wIdx === 2 ? '#ffffff' : wIdx === 3 ? '#f97316' : wIdx === 4 ? '#06b6d4' : '#cbd5e1';

  g.strokeStyle = strokeCol;
  g.beginPath();
  for (let i = 0; i < 8; i++) {
    const a = i / 8 * TAU, rad = r * (0.85 + ((o.seed * 1000 * (i + 1)) % 1) * 0.3);
    const px = x + Math.cos(a) * rad * 1.1, py = y - r * 0.4 + Math.sin(a) * rad * 0.8;
    i ? g.lineTo(px, py) : g.moveTo(px, py);
  }
  g.closePath(); g.fillStyle = fillCol; g.fill(); g.stroke();
  g.fillStyle = hiCol; ell(g, x - r * 0.3, y - r * 0.75, r * 0.4, r * 0.22, -0.3); g.fill();
  if (wIdx === 2) {
    // Snow cap perched on top of boulder
    g.fillStyle = '#ffffff'; g.strokeStyle = '#94a3b8'; g.lineWidth = 2;
    g.beginPath();
    g.moveTo(x - r * 0.85, y - r * 0.4);
    g.quadraticCurveTo(x - r * 0.4, y - r * 1.05, x, y - r * 1.05);
    g.quadraticCurveTo(x + r * 0.4, y - r * 1.05, x + r * 0.85, y - r * 0.4);
    g.quadraticCurveTo(x + r * 0.4, y - r * 0.35, x, y - r * 0.45);
    g.quadraticCurveTo(x - r * 0.4, y - r * 0.35, x - r * 0.85, y - r * 0.4);
    g.closePath();
    g.fill(); g.stroke();
  } else if (wIdx === 3) {
    g.strokeStyle = '#fde047'; g.lineWidth = 2;
    g.beginPath(); g.moveTo(x - r * 0.2, y - r * 0.3); g.lineTo(x + r * 0.2, y - r * 0.5); g.stroke();
  }
}

function drawBarrel(g, o, wIdx = 0) {
  const { x, y } = o;
  const fl = o.flash > 0;
  g.fillStyle = 'rgba(0,0,0,0.2)'; ell(g, x, y + 6, 26, 9); g.fill();
  g.lineWidth = 3;

  let bodyCol = '#0284c7', topCol = '#7dd3fc', borderCol = '#0c4a6e', icon = '💧';
  if (wIdx === 1) { bodyCol = '#ea580c'; topCol = '#fde047'; borderCol = '#7c2d12'; icon = '🌴'; }
  else if (wIdx === 2) { bodyCol = '#38bdf8'; topCol = '#f0f9ff'; borderCol = '#0369a1'; icon = '❄️'; }
  else if (wIdx === 3) { bodyCol = '#dc2626'; topCol = '#f97316'; borderCol = '#451a03'; icon = '🔥'; }
  else if (wIdx === 4) { bodyCol = '#7c3aed'; topCol = '#22d3ee'; borderCol = '#1e1b4b'; icon = '⚛️'; }

  g.strokeStyle = borderCol;
  rr(g, x - 19, y - 40, 38, 46, 9); g.fillStyle = fl ? '#fff' : bodyCol; g.fill(); g.stroke();
  g.fillStyle = '#475569'; g.fillRect(x - 19, y - 31, 38, 5); g.fillRect(x - 19, y - 8, 38, 5);
  ell(g, x, y - 40, 18, 6); g.fillStyle = topCol; g.fill(); g.stroke();

  const img = emojiImg(icon, 18);
  g.drawImage(img, x - img.width / 2, y - 28);

  if (o.hp < o.maxHp * 0.5) {
    g.strokeStyle = borderCol; g.lineWidth = 2;
    g.beginPath(); g.moveTo(x - 10, y - 20); g.lineTo(x - 4, y - 12); g.lineTo(x - 9, y - 4); g.stroke();
  }
}

// ---------- Background (pre-rendered per world) ----------
function buildBackground(W, H, worldIndex = 0) {
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const g = c.getContext('2d');
  const R = (a, b) => a + Math.random() * (b - a);
  const m = 22;

  if (worldIndex === 1) {
    // ===== World 1: Desert / Golden Dunes =====
    g.fillStyle = '#f59e0b'; g.fillRect(0, 0, W, H);
    for (let i = 0; i < 320; i++) {
      g.fillStyle = Math.random() < 0.5 ? 'rgba(251,191,36,0.38)' : 'rgba(217,119,6,0.22)';
      ell(g, R(0, W), R(0, H), R(50, 220), R(35, 130), R(-0.4, 0.4)); g.fill();
    }
    const dunePaths = () => {
      g.beginPath(); g.moveTo(-50, H * 0.35); g.bezierCurveTo(W * 0.3, H * 0.15, W * 0.5, H * 0.7, W + 50, H * 0.5); g.stroke();
      g.beginPath(); g.moveTo(W * 0.6, -50); g.bezierCurveTo(W * 0.45, H * 0.4, W * 0.75, H * 0.65, W * 0.5, H + 50); g.stroke();
    };
    g.lineCap = 'round';
    g.strokeStyle = '#d97706'; g.lineWidth = 92; dunePaths();
    g.strokeStyle = '#fbbf24'; g.lineWidth = 66; dunePaths();
    // oasis lake
    g.fillStyle = '#0284c7'; ell(g, W * 0.22, H * 0.75, 170, 90); g.fill();
    g.fillStyle = '#38bdf8'; ell(g, W * 0.22, H * 0.75, 145, 74); g.fill();
    g.fillStyle = '#bae6fd'; ell(g, W * 0.2, H * 0.73, 70, 18); g.fill();
    // oasis palm shadows
    for (let i = 0; i < 18; i++) {
      g.fillStyle = 'rgba(22,101,52,0.45)';
      circ(g, W * 0.22 + Math.cos(i) * 110, H * 0.75 + Math.sin(i) * 60, 22); g.fill();
    }
    // second smaller oasis
    g.fillStyle = '#0284c7'; ell(g, W * 0.82, H * 0.22, 110, 60); g.fill();
    g.fillStyle = '#38bdf8'; ell(g, W * 0.82, H * 0.22, 90, 46); g.fill();
    // sand wind ripple lines
    for (let i = 0; i < 900; i++) {
      const x = R(0, W), y = R(0, H);
      g.strokeStyle = 'rgba(254,240,138,0.7)'; g.lineWidth = 1.6;
      g.beginPath(); g.moveTo(x - 5, y); g.lineTo(x + 5, y); g.stroke();
    }
    // sandstone slab border
    g.strokeStyle = '#92400e'; g.lineWidth = 7;
    g.strokeRect(m, m, W - m * 2, H - m * 2);
    g.fillStyle = '#d97706'; g.strokeStyle = '#78350f'; g.lineWidth = 2;
    for (let x = m; x <= W - m; x += 55) {
      rr(g, x - 7, m - 8, 14, 30, 3); g.fill(); g.stroke();
      rr(g, x - 7, H - m - 22, 14, 30, 3); g.fill(); g.stroke();
    }
  } else if (worldIndex === 2) {
    // ===== World 2: Snow / Ice Peaks =====
    g.fillStyle = '#e2e8f0'; g.fillRect(0, 0, W, H);
    for (let i = 0; i < 280; i++) {
      g.fillStyle = Math.random() < 0.5 ? 'rgba(255,255,255,0.7)' : 'rgba(186,230,253,0.3)';
      ell(g, R(0, W), R(0, H), R(40, 180), R(30, 110), R(0, TAU)); g.fill();
    }
    // frozen ice paths
    const icePaths = () => {
      g.beginPath(); g.moveTo(-50, H * 0.35); g.bezierCurveTo(W * 0.3, H * 0.15, W * 0.5, H * 0.7, W + 50, H * 0.5); g.stroke();
      g.beginPath(); g.moveTo(W * 0.6, -50); g.bezierCurveTo(W * 0.45, H * 0.4, W * 0.75, H * 0.65, W * 0.5, H + 50); g.stroke();
    };
    g.lineCap = 'round';
    g.strokeStyle = '#93c5fd'; g.lineWidth = 90; icePaths();
    g.strokeStyle = '#bae6fd'; g.lineWidth = 66; icePaths();
    // frozen ice lake
    g.fillStyle = '#0284c7'; ell(g, W * 0.22, H * 0.75, 160, 85); g.fill();
    g.fillStyle = '#38bdf8'; ell(g, W * 0.22, H * 0.75, 140, 70); g.fill();
    g.fillStyle = 'rgba(255,255,255,0.7)'; ell(g, W * 0.2, H * 0.73, 60, 14); g.fill();
    // ice cracks on lake
    g.strokeStyle = 'rgba(255,255,255,0.85)'; g.lineWidth = 2.5;
    g.beginPath(); g.moveTo(W * 0.22, H * 0.75); g.lineTo(W * 0.25, H * 0.72); g.lineTo(W * 0.28, H * 0.76); g.stroke();
    // second pond
    g.fillStyle = '#0284c7'; ell(g, W * 0.82, H * 0.22, 120, 65); g.fill();
    g.fillStyle = '#38bdf8'; ell(g, W * 0.82, H * 0.22, 100, 50); g.fill();
    // snowflakes & frost tufts
    for (let i = 0; i < 900; i++) {
      const x = R(0, W), y = R(0, H);
      g.strokeStyle = 'rgba(255,255,255,0.9)'; g.lineWidth = 1.8;
      g.beginPath();
      g.moveTo(x - 4, y); g.lineTo(x + 4, y);
      g.moveTo(x, y - 4); g.lineTo(x, y + 4);
      g.moveTo(x - 3, y - 3); g.lineTo(x + 3, y + 3);
      g.stroke();
    }
    // icicle border
    g.strokeStyle = '#0284c7'; g.lineWidth = 7;
    g.strokeRect(m, m, W - m * 2, H - m * 2);
    g.fillStyle = '#bae6fd'; g.strokeStyle = '#0369a1'; g.lineWidth = 2;
    for (let x = m; x <= W - m; x += 55) {
      g.beginPath(); g.moveTo(x - 6, m - 4); g.lineTo(x + 6, m - 4); g.lineTo(x, m + 22); g.closePath(); g.fill(); g.stroke();
      g.beginPath(); g.moveTo(x - 6, H - m + 4); g.lineTo(x + 6, H - m + 4); g.lineTo(x, H - m - 22); g.closePath(); g.fill(); g.stroke();
    }

  } else if (worldIndex === 3) {
    // ===== World 3: Volcano / Caldera =====
    g.fillStyle = '#1c1917'; g.fillRect(0, 0, W, H);
    for (let i = 0; i < 300; i++) {
      g.fillStyle = Math.random() < 0.5 ? 'rgba(41,37,36,0.9)' : 'rgba(69,26,3,0.4)';
      ell(g, R(0, W), R(0, H), R(50, 190), R(35, 120), R(0, TAU)); g.fill();
    }
    // glowing lava rivers
    const lavaPaths = () => {
      g.beginPath(); g.moveTo(-50, H * 0.4); g.bezierCurveTo(W * 0.35, H * 0.2, W * 0.45, H * 0.8, W + 50, H * 0.6); g.stroke();
      g.beginPath(); g.moveTo(W * 0.65, -50); g.bezierCurveTo(W * 0.5, H * 0.35, W * 0.7, H * 0.75, W * 0.4, H + 50); g.stroke();
    };
    g.lineCap = 'round';
    g.strokeStyle = '#7c2d12'; g.lineWidth = 92; lavaPaths();
    g.strokeStyle = '#ea580c'; g.lineWidth = 64; lavaPaths();
    g.strokeStyle = '#fde047'; g.lineWidth = 26; lavaPaths();
    // magma pools
    g.fillStyle = '#b91c1c'; ell(g, W * 0.2, H * 0.75, 150, 80); g.fill();
    g.fillStyle = '#ea580c'; ell(g, W * 0.2, H * 0.75, 130, 65); g.fill();
    g.fillStyle = '#fde047'; ell(g, W * 0.2, H * 0.75, 75, 30); g.fill();
    // fiery embers
    for (let i = 0; i < 700; i++) {
      const x = R(0, W), y = R(0, H);
      g.fillStyle = ['#ea580c', '#f97316', '#fde047', '#dc2626'][i % 4];
      circ(g, x, y, R(1.5, 3.5)); g.fill();
    }
    // volcanic basalt pillar border
    g.strokeStyle = '#451a03'; g.lineWidth = 7;
    g.strokeRect(m, m, W - m * 2, H - m * 2);
    g.fillStyle = '#292524'; g.strokeStyle = '#ea580c'; g.lineWidth = 2;
    for (let x = m; x <= W - m; x += 60) {
      rr(g, x - 7, m - 8, 14, 32, 4); g.fill(); g.stroke();
      rr(g, x - 7, H - m - 24, 14, 32, 4); g.fill(); g.stroke();
    }

  } else if (worldIndex === 4) {
    // ===== World 3: Space / Cosmic Void =====
    g.fillStyle = '#050515'; g.fillRect(0, 0, W, H);
    // glowing nebulae
    for (let i = 0; i < 80; i++) {
      g.fillStyle = ['rgba(76,29,149,0.22)', 'rgba(30,27,75,0.35)', 'rgba(14,116,144,0.18)', 'rgba(147,51,234,0.15)'][i % 4];
      ell(g, R(0, W), R(0, H), R(120, 360), R(90, 260), R(0, TAU)); g.fill();
    }
    // starfield
    for (let i = 0; i < 1200; i++) {
      const x = R(0, W), y = R(0, H);
      g.fillStyle = ['#ffffff', '#bae6fd', '#fbcfe8', '#fef08a', '#c4b5fd'][i % 5];
      circ(g, x, y, R(0.8, 2.6)); g.fill();
    }
    // space crater decals
    for (let i = 0; i < 6; i++) {
      const cx = (i * 450 + 200) % W, cy = ((i + 1) * 350 + 150) % H;
      g.fillStyle = 'rgba(15,23,42,0.85)'; ell(g, cx, cy, 110, 65, 0.4); g.fill();
      g.strokeStyle = 'rgba(168,85,247,0.5)'; g.lineWidth = 3; ell(g, cx, cy, 110, 65, 0.4); g.stroke();
    }
    // neon laser perimeter grid
    g.strokeStyle = '#8b5cf6'; g.lineWidth = 5;
    g.strokeRect(m, m, W - m * 2, H - m * 2);
    g.strokeStyle = '#22d3ee'; g.lineWidth = 2;
    g.strokeRect(m + 10, m + 10, W - (m + 10) * 2, H - (m + 10) * 2);
    for (let x = m; x <= W - m; x += 70) {
      g.fillStyle = '#06b6d4'; circ(g, x, m, 5); g.fill(); circ(g, x, H - m, 5); g.fill();
    }

  } else {
    // ===== World 0: Farm (Default) =====
    g.fillStyle = '#84d45c'; g.fillRect(0, 0, W, H);
    for (let i = 0; i < 300; i++) {
      g.fillStyle = Math.random() < 0.5 ? 'rgba(255,255,255,0.05)' : 'rgba(30,90,20,0.07)';
      ell(g, R(0, W), R(0, H), R(40, 170), R(30, 110), R(0, TAU)); g.fill();
    }
    const paths = () => {
      g.beginPath(); g.moveTo(-50, H * 0.3); g.bezierCurveTo(W * 0.3, H * 0.1, W * 0.5, H * 0.75, W + 50, H * 0.55); g.stroke();
      g.beginPath(); g.moveTo(W * 0.62, -50); g.bezierCurveTo(W * 0.42, H * 0.4, W * 0.78, H * 0.7, W * 0.55, H + 50); g.stroke();
    };
    g.lineCap = 'round';
    g.strokeStyle = '#c9a26a'; g.lineWidth = 96; paths();
    g.strokeStyle = '#e0bf8c'; g.lineWidth = 70; paths();
    // pond decals
    g.fillStyle = '#3aa0d8'; ell(g, W * 0.18, H * 0.78, 150, 80); g.fill();
    g.fillStyle = '#5cc3f0'; ell(g, W * 0.18, H * 0.78, 130, 66); g.fill();
    g.fillStyle = 'rgba(255,255,255,0.5)'; ell(g, W * 0.16, H * 0.76, 50, 12); g.fill();
    g.fillStyle = '#3aa0d8'; ell(g, W * 0.86, H * 0.2, 110, 60); g.fill();
    g.fillStyle = '#5cc3f0'; ell(g, W * 0.86, H * 0.2, 94, 48); g.fill();
    // grass tufts
    for (let i = 0; i < 1600; i++) {
      const x = R(0, W), y = R(0, H);
      g.strokeStyle = ['#5fb847', '#6cc24f', '#4fa63a'][i % 3]; g.lineWidth = 2;
      g.beginPath();
      g.moveTo(x, y); g.lineTo(x - 4, y - 8);
      g.moveTo(x, y); g.lineTo(x, y - 10);
      g.moveTo(x, y); g.lineTo(x + 4, y - 8);
      g.stroke();
    }
    // flowers
    const fc = ['#ffffff', '#fde047', '#f472b6', '#f87171', '#a78bfa'];
    for (let i = 0; i < 300; i++) {
      const x = R(0, W), y = R(0, H);
      g.fillStyle = fc[i % fc.length];
      for (let k = 0; k < 5; k++) { const a = k / 5 * TAU; circ(g, x + Math.cos(a) * 4, y + Math.sin(a) * 4, 3); g.fill(); }
      g.fillStyle = '#f59e0b'; circ(g, x, y, 2.2); g.fill();
    }
    // wooden fence border
    g.strokeStyle = '#7c4a1e'; g.lineWidth = 7;
    g.strokeRect(m, m, W - m * 2, H - m * 2);
    g.strokeRect(m + 14, m + 14, W - (m + 14) * 2, H - (m + 14) * 2);
    g.fillStyle = '#a16207'; g.strokeStyle = '#5b3410'; g.lineWidth = 2;
    for (let x = m; x <= W - m; x += 60) { rr(g, x - 6, m - 8, 12, 34, 3); g.fill(); g.stroke(); rr(g, x - 6, H - m - 26, 12, 34, 3); g.fill(); g.stroke(); }
    for (let y = m; y <= H - m; y += 60) { rr(g, m - 6, y - 8, 12, 34, 3); g.fill(); g.stroke(); rr(g, W - m - 6, y - 8, 12, 34, 3); g.fill(); g.stroke(); }
  }

  return c;
}

// emoji -> cached bitmap (fast pickup drawing)
const _emojiCache = {};
function emojiImg(ch, size) {
  const k = ch + size;
  let c = _emojiCache[k];
  if (!c) {
    c = document.createElement('canvas');
    c.width = c.height = Math.ceil(size * 1.5);
    const g = c.getContext('2d');
    g.font = `${size}px "Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif`;
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(ch, c.width / 2, c.height / 2 + size * 0.06);
    _emojiCache[k] = c;
  }
  return c;
}
