import React, { useEffect, useRef, useState, useId } from 'react';
import './App.css';
import { ArrowDownRight, ArrowUpRight, X, Menu, Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { careerPath, projects, skills, certifications, impactStats, experienceNotes } from './content.js';

// CRA / react-scripts: respects PUBLIC_URL on GitHub Pages and localhost.
const BASE = `${(process.env.PUBLIC_URL || '').replace(/\/$/, '')}/`;
const STOPS = [
  { id: 'intro', label: 'Intro' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'connect', label: 'Connect' },
];
const clamp = (v, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));
const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });

function useScrollJourney() {
  const [position, setPosition] = useState({ progress: 0, active: 'intro' });
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const first = document.getElementById('intro');
      const last = document.getElementById('connect');
      if (!first || !last) return;
      const top = first.getBoundingClientRect().top + window.scrollY - window.innerHeight * .48;
      const end = last.getBoundingClientRect().top + window.scrollY + last.offsetHeight * .53 - window.innerHeight * .48;
      const p = clamp((window.scrollY - top) / Math.max(1, end - top));
      let active = 'intro';
      STOPS.forEach(s => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * .58) active = s.id;
      });
      setPosition(old => Math.abs(old.progress - p) < .001 && old.active === active ? old : { progress: p, active });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, []);
  return position;
}

const KG_CONCEPTS = [
  {label:'LLM',r:32},{label:'RAG',r:28},{label:'HEALTHCARE',r:38},
  {label:'ETL',r:28},{label:'ANALYTICS',r:36},{label:'ML',r:30},
  {label:'VECTORS',r:30},{label:'NLP',r:26},{label:'PIPELINE',r:32},{label:'INFERENCE',r:30},
];
const KG_EDGES = [[0,1],[0,4],[0,5],[0,7],[1,6],[1,7],[2,4],[2,3],[3,8],[4,8],[5,9],[6,9]];

function ConnectionCanvas({ mode }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d', { alpha: true });
    if (!ctx) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mobile = window.matchMedia('(max-width: 700px)').matches;
    let width = 0, height = 0, dpr = 1, raf = 0, frame = 0;
    let points = [], labels = [], hexes = [], kgNodes = [], flowLines = [];
    let running = true;

    const TERMS = [
      'NEURAL NETWORK','RAG','ETL PIPELINE','MACHINE LEARNING','HEALTHCARE AI',
      'DATA ENGINEERING','LLM','EMBEDDINGS','ANALYTICS','TRANSFORMERS',
      'FINE-TUNING','SNOWFLAKE','CLASSIFICATION','DATABRICKS','VECTOR DB',
      'LANGCHAIN','FEATURE ENGINEERING','PIPELINE','INFERENCE','GRADIENT',
    ];

    const resize = () => {
      width = window.innerWidth; height = window.innerHeight;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = mobile ? 24 : 52;
      points = Array.from({ length: count }, (_, i) => ({
        x: ((i * 31.73) % 100) / 100 * width,
        y: ((i * 67.11) % 100) / 100 * height,
        vx: Math.sin(i * 2.9) * .10, vy: Math.cos(i * 3.9) * .08, phase: i * .45,
      }));

      labels = TERMS.map((text, i) => ({
        text,
        x: ((i * 173.1) % 100) / 100 * width,
        y: ((i * 89.7 + 30) % 100) / 100 * height,
        vx: Math.sin(i * 1.7) * .13, vy: Math.cos(i * 2.3) * .09,
        alpha: .003 + (i % 3) * .001, phase: i * .6,
      }));

      hexes = [];
      const R = mobile ? 48 : 68;
      const HW = R * Math.sqrt(3), HH = R * 1.5;
      let idx = 0;
      for (let row = 0; row * HH < height + R; row++) {
        for (let col = 0; col * HW < width + HW; col++, idx++) {
          if (idx % 7 !== 0) continue;
          hexes.push({ x: col * HW + (row % 2 ? HW / 2 : 0), y: row * HH, r: R * .88, phase: (row * 3 + col) * .44 });
        }
      }

      // Knowledge graph nodes — spread across canvas
      kgNodes = KG_CONCEPTS.map((c, i) => ({
        ...c,
        x: ((i * 97.3 + 8) % 92) / 100 * width + width * .04,
        y: ((i * 73.1 + 6) % 88) / 100 * height + height * .06,
        vx: Math.sin(i * 1.1) * .055,
        vy: Math.cos(i * 1.7) * .05,
        phase: i * .85,
      }));

      // Flow rivers (data highways across canvas)
      flowLines = [];
      const numRivers = mobile ? 2 : 4;
      for (let ri = 0; ri < numRivers; ri++) {
        const pts = [];
        for (let si = 0; si <= 6; si++) {
          pts.push({
            x: (si / 6) * (width * 1.06) - width * .03,
            y: height * (.12 + ri * .24) + Math.sin(si * 1.3 + ri * 3.1) * height * .1,
          });
        }
        flowLines.push({ pts, phase: ri * 1.8 });
      }
    };

    const hexPath = (x, y, r) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = i * Math.PI / 3 - Math.PI / 6;
        i === 0 ? ctx.moveTo(x + r * Math.cos(a), y + r * Math.sin(a))
                : ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a));
      }
      ctx.closePath();
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      const orbit = mode === 'orbit';
      const stroke = orbit ? '170,108,255' : '20,210,248';
      const stroke2 = orbit ? '232,140,192' : '72,164,255';
      const linked = orbit ? 175 : 155;

      // 0 ── Atmospheric light volumes (dimensional depth)
      {
        const gx = orbit ? width*.65 : width*.82, gy = orbit ? height*.28 : height*.06, gr = orbit ? width*.60 : width*.52;
        const grd = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr);
        grd.addColorStop(0, `rgba(${stroke},.07)`); grd.addColorStop(.55, `rgba(${stroke},.024)`); grd.addColorStop(1, `rgba(${stroke},0)`);
        ctx.fillStyle = grd; ctx.fillRect(0, 0, width, height);
        const g2x = orbit ? width*.18 : width*.1, g2y = orbit ? height*.76 : height*.82;
        const g2rd = ctx.createRadialGradient(g2x, g2y, 0, g2x, g2y, width*.42);
        g2rd.addColorStop(0, `rgba(${stroke2},.048)`); g2rd.addColorStop(1, `rgba(${stroke2},0)`);
        ctx.fillStyle = g2rd; ctx.fillRect(0, 0, width, height);
        if (orbit) {
          [[.28,.35],[.72,.60],[.52,.82]].forEach(([nx,ny],ni) => {
            const ph = Math.sin(frame*.004+ni*2.3)*.3+.7;
            const ngrd = ctx.createRadialGradient(nx*width,ny*height,0,nx*width,ny*height,width*.24);
            ngrd.addColorStop(0,`rgba(${stroke},${.034*ph})`); ngrd.addColorStop(.6,`rgba(${stroke2},${.015*ph})`); ngrd.addColorStop(1,`rgba(${stroke},0)`);
            ctx.fillStyle=ngrd; ctx.fillRect(0,0,width,height);
          });
        }
      }

      // 1 ── Hex grid
      hexes.forEach(h => {
        const p = Math.sin(frame*.016+h.phase)*.5+.5;
        hexPath(h.x, h.y, h.r);
        ctx.strokeStyle=`rgba(${stroke},${.022+p*.028})`; ctx.lineWidth=.55; ctx.stroke();
      });

      // 2 ── Flow rivers (data highways)
      flowLines.forEach((fl, fi) => {
        ctx.beginPath();
        fl.pts.forEach((pt,pi) => {
          if (pi===0) { ctx.moveTo(pt.x,pt.y); return; }
          const prev=fl.pts[pi-1];
          if (orbit) ctx.quadraticCurveTo(prev.x+(pt.x-prev.x)*.4+28*Math.sin(pi+fi),prev.y-(pt.x-prev.x)*.14,pt.x,pt.y);
          else ctx.lineTo(pt.x,pt.y);
        });
        ctx.strokeStyle=`rgba(${stroke},.04)`; ctx.lineWidth=orbit?1.4:1.1; ctx.setLineDash([14,9]); ctx.stroke(); ctx.setLineDash([]);
        for (let k=0;k<2;k++) {
          const t=reduced?.5:((frame*.002+fi*.27+k*.5)%1);
          const si=Math.min(Math.floor(t*(fl.pts.length-1)),fl.pts.length-2);
          const st=(t*(fl.pts.length-1))%1;
          const px=fl.pts[si].x+(fl.pts[si+1].x-fl.pts[si].x)*st;
          const py=fl.pts[si].y+(fl.pts[si+1].y-fl.pts[si].y)*st;
          const pA=Math.sin(t*Math.PI)*.82;
          ctx.beginPath(); ctx.arc(px,py,2.8,0,Math.PI*2); ctx.fillStyle=`rgba(${stroke2},${pA})`; ctx.fill();
          ctx.beginPath(); ctx.arc(px,py,5.5,0,Math.PI*2); ctx.fillStyle=`rgba(${stroke2},${pA*.22})`; ctx.fill();
        }
      });

      // 3 ── Knowledge graph edges + in-flight packets
      KG_EDGES.forEach(([ai,bi]) => {
        const a=kgNodes[ai],b=kgNodes[bi]; if (!a||!b) return;
        const dist=Math.hypot(a.x-b.x,a.y-b.y); if (dist>width*.68) return;
        const edgeA=(1-dist/(width*.68))*.22;
        ctx.beginPath();
        if (orbit) { const cpx=(a.x+b.x)/2+(b.y-a.y)*.18,cpy=(a.y+b.y)/2-(b.x-a.x)*.18; ctx.moveTo(a.x,a.y); ctx.quadraticCurveTo(cpx,cpy,b.x,b.y); }
        else { ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); }
        ctx.strokeStyle=`rgba(${stroke},${edgeA})`; ctx.lineWidth=1.0; ctx.setLineDash([8,5]); ctx.stroke(); ctx.setLineDash([]);
        if (!reduced) {
          const t=((frame*.0038+ai*.15+bi*.09)%1);
          let px,py;
          if (orbit) { const cpx=(a.x+b.x)/2+(b.y-a.y)*.18,cpy=(a.y+b.y)/2-(b.x-a.x)*.18; px=(1-t)*(1-t)*a.x+2*(1-t)*t*cpx+t*t*b.x; py=(1-t)*(1-t)*a.y+2*(1-t)*t*cpy+t*t*b.y; }
          else { px=a.x+(b.x-a.x)*t; py=a.y+(b.y-a.y)*t; }
          const pA=Math.sin(t*Math.PI)*.9;
          ctx.beginPath(); ctx.arc(px,py,2.3,0,Math.PI*2); ctx.fillStyle=`rgba(${stroke2},${pA})`; ctx.fill();
        }
      });

      // 4 ── KG nodes (prominently glowing labeled circles)
      ctx.textAlign='center'; ctx.textBaseline='middle';
      kgNodes.forEach(n => {
        const p=Math.sin(frame*.011+n.phase)*.25+.75;
        for (let g=3;g>=1;g--) { ctx.beginPath(); ctx.arc(n.x,n.y,n.r+g*9,0,Math.PI*2); ctx.fillStyle=`rgba(${stroke},${.014*p/g})`; ctx.fill(); }
        const bg=ctx.createRadialGradient(n.x-n.r*.3,n.y-n.r*.3,0,n.x,n.y,n.r);
        bg.addColorStop(0,`rgba(${stroke},.24)`); bg.addColorStop(1,`rgba(${stroke},.07)`);
        ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2); ctx.fillStyle=bg; ctx.fill();
        ctx.strokeStyle=`rgba(${stroke},${.55*p})`; ctx.lineWidth=1.15; ctx.stroke();
        ctx.font=`bold 9.5px 'DM Mono',monospace`; ctx.fillStyle=`rgba(${stroke},${.82*p})`; ctx.fillText(n.label,n.x,n.y);
        if (!reduced) {
          n.x+=n.vx; n.y+=n.vy;
          if(n.x<-80)n.x=width+80; if(n.x>width+80)n.x=-80;
          if(n.y<-80)n.y=height+80; if(n.y>height+80)n.y=-80;
        }
      });

      // 5 ── Ghost circles (replaced labels)
      labels.forEach(lbl => {
        const p=Math.sin(frame*.007+lbl.phase)*.35+.65;
        const r = 2 + (lbl.phase % 2.5);
        ctx.beginPath(); ctx.arc(lbl.x, lbl.y, r, 0, Math.PI*2);
        ctx.strokeStyle=`rgba(200,220,240,${(.06*p).toFixed(4)})`; ctx.lineWidth=0.6; ctx.stroke();
        if (!reduced) {
          lbl.x+=lbl.vx; lbl.y+=lbl.vy;
          if(lbl.x<-180)lbl.x=width+20; if(lbl.x>width+180)lbl.x=-160;
          if(lbl.y<-14)lbl.y=height+14; if(lbl.y>height+14)lbl.y=-14;
        }
      });

      // 6 ── Dot network
      points.forEach((a,i) => {
        for (let j=i+1;j<points.length;j++) {
          const b=points[j]; const dist=Math.hypot(a.x-b.x,a.y-b.y);
          if (dist>linked) continue;
          ctx.strokeStyle=`rgba(${stroke},${(1-dist/linked)*(orbit?.14:.11)})`; ctx.lineWidth=.7; ctx.beginPath();
          if (orbit) { ctx.moveTo(a.x,a.y); ctx.quadraticCurveTo((a.x+b.x)/2+15,(a.y+b.y)/2-20,b.x,b.y); }
          else { ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); }
          ctx.stroke();
        }
        ctx.beginPath(); ctx.fillStyle=`rgba(${stroke},${orbit?.46:.42})`; ctx.arc(a.x,a.y,i%7===0?1.9:.85,0,Math.PI*2); ctx.fill();
        if (!reduced) {
          a.x+=a.vx; a.y+=a.vy;
          if(a.x<-25)a.x=width+25; if(a.y<-25)a.y=height+25;
          if(a.x>width+25)a.x=-25; if(a.y>height+25)a.y=-25;
        }
      });

      // 7 ── Stream packets
      const packetCount=mobile?6:14;
      for (let i=0;i<packetCount;i++) {
        const a=points[(i*5)%points.length],b=points[(i*5+3)%points.length]; if(!a||!b) continue;
        const t=reduced?.5:(frame*.003+i*.072)%1;
        const alpha=Math.sin(t*Math.PI)*.78;
        ctx.fillStyle=orbit?`rgba(${stroke2},${alpha})`:`rgba(180,238,255,${alpha})`;
        ctx.beginPath(); ctx.arc(a.x*(1-t)+b.x*t,a.y*(1-t)+b.y*t,2.2,0,Math.PI*2); ctx.fill();
      }

      frame++;
      if (!reduced) raf=requestAnimationFrame(draw);
    };

    resize(); draw();
    window.addEventListener('resize', resize);
    const onVisibility = () => {
      if (document.hidden) { running = false; cancelAnimationFrame(raf); }
      else if (!running) { running = true; draw(); }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      running = false; cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [mode]);
  return <canvas className="computation-canvas" ref={ref} aria-hidden="true" />;
}

function Butterfly({ small = false }) {
  const gradientId = useId().replace(/:/g, '') + '-butterfly';
  return <svg className={`butterfly-svg ${small ? 'butterfly-small' : ''}`} viewBox="0 0 100 90" role="img" aria-label="Iridescent butterfly">
    <defs>
      <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#a8ebf9" stopOpacity=".95" />
        <stop offset=".52" stopColor="#a89de7" stopOpacity=".80" />
        <stop offset="1" stopColor="#f1c6b3" stopOpacity=".72" />
      </linearGradient>
    </defs>
    <g className="wing wing-left" transform="translate(50 47)">
      <path d="M0 1C-13-17-49-41-45-14C-40 8-19 16-2 7C-25 9-43 34-23 38C-10 40-4 21 0 1Z" fill={`url(#${gradientId})`} stroke="#b7d8fa" strokeWidth=".8"/>
      <path d="M-4 4 Q-18-11-37-19 M-6 8 Q-19 20-29 29" stroke="#fff" strokeOpacity=".38" strokeWidth=".6" fill="none" />
    </g>
    <g className="wing wing-right" transform="translate(50 47)">
      <path d="M0 1C13-17 49-41 45-14C40 8 19 16 2 7C25 9 43 34 23 38C10 40 4 21 0 1Z" fill={`url(#${gradientId})`} stroke="#b7d8fa" strokeWidth=".8"/>
      <path d="M4 4 Q18-11 37-19 M6 8 Q19 20 29 29" stroke="#fff" strokeOpacity=".38" strokeWidth=".6" fill="none" />
    </g>
    <path d="M50 33Q47 23 44 21 M50 33Q53 23 57 21" stroke="#dce8ee" strokeWidth="1" fill="none" />
    <path d="M50 37Q53 53 50 64" stroke="#e9d8c7" strokeWidth="3" strokeLinecap="round" fill="none" />
  </svg>;
}

function Flower() {
  const gid = useId().replace(/:/g, '') + '-lotus';
  // Front-facing lotus: 5 petals visible in a half-open arc (lower half hidden behind pad)
  // Petal angles: -80° -40° 0° 40° 80° (upward fan, centred on vertical)
  const outerAngles = [-80,-45,0,45,80];
  const innerAngles = [-52,-22,22,52];
  return <svg className="flower-svg" viewBox="0 0 150 185" role="img" aria-label="Electrified lotus rising from water">
    <defs>
      <linearGradient id={`${gid}p`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#b8f6ff" stopOpacity=".98"/>
        <stop offset=".5" stopColor="#90c8f8" stopOpacity=".85"/>
        <stop offset="1" stopColor="#b068ee" stopOpacity=".65"/>
      </linearGradient>
      <radialGradient id={`${gid}c`} cx=".5" cy=".5" r=".5">
        <stop offset="0" stopColor="#fffef0"/>
        <stop offset=".5" stopColor="#f4e040" stopOpacity=".92"/>
        <stop offset="1" stopColor="#c07818" stopOpacity=".5"/>
      </radialGradient>
      <radialGradient id={`${gid}glow`} cx=".5" cy=".5" r=".5">
        <stop offset="0" stopColor="#80f0ff" stopOpacity=".45"/>
        <stop offset="1" stopColor="#80f0ff" stopOpacity="0"/>
      </radialGradient>
      <filter id={`${gid}f`} x="-80%" y="-80%" width="260%" height="260%">
        <feGaussianBlur stdDeviation="3.5" result="b"/>
        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>

    {/* Ambient glow behind whole flower */}
    <ellipse cx="75" cy="95" rx="52" ry="46" fill={`url(#${gid}glow)`}/>

    {/* Water ripples */}
    <path d="M10 170 Q38 162 75 170 Q112 178 140 170" fill="none" stroke="#3cc0d8" strokeWidth="1.4" strokeOpacity=".6"/>
    <path d="M4 178 Q38 170 75 178 Q112 186 146 178" fill="none" stroke="#3cc0d8" strokeWidth=".9" strokeOpacity=".3"/>
    <path d="M22 163 Q48 157 75 163 Q102 169 128 163" fill="none" stroke="#70d8ee" strokeWidth=".8" strokeOpacity=".38"/>

    {/* Lily pad — wide, flat ellipse sitting on water */}
    <ellipse cx="75" cy="162" rx="52" ry="14" fill="#185838" fillOpacity=".78" stroke="#38885a" strokeWidth="1"/>
    {/* Pad veins */}
    <path d="M75 148 L75 176" stroke="#48c870" strokeWidth=".8" strokeOpacity=".38"/>
    <path d="M75 162 Q55 156 38 162" stroke="#48c870" strokeWidth=".7" strokeOpacity=".3"/>
    <path d="M75 162 Q95 156 112 162" stroke="#48c870" strokeWidth=".7" strokeOpacity=".3"/>
    {/* Notch cut */}
    <path d="M71 148 Q75 140 79 148" fill="#091c28" fillOpacity=".55"/>

    {/* Stem */}
    <path d="M75 148 L75 120" stroke="#289050" strokeWidth="2" strokeOpacity=".75"/>

    {/* Flower head — front-facing fan of petals */}
    <g className="flower-head" filter={`url(#${gid}f)`}>
      {/* Outer petals — 5, wide fan */}
      {outerAngles.map((angle, i) => (
        <ellipse key={i} cx="75" cy="74" rx="13" ry="32"
          fill={`url(#${gid}p)`} fillOpacity=".42"
          stroke="#7ee8ff" strokeWidth="1" strokeDasharray="6 3" strokeOpacity=".85"
          transform={`rotate(${angle} 75 118)`}/>
      ))}
      {/* Inner petals — 4 */}
      {innerAngles.map((angle, i) => (
        <ellipse key={i} cx="75" cy="82" rx="9" ry="22"
          fill={`url(#${gid}p)`} fillOpacity=".68"
          stroke="#a888f8" strokeWidth=".9" strokeOpacity=".9"
          transform={`rotate(${angle} 75 118)`}/>
      ))}
      {/* Electric sparks shooting upward */}
      <path d="M75 46 L71 55 L77 54 L73 63" stroke="#d8ffff" strokeWidth="1.1" strokeOpacity=".9" fill="none" strokeLinecap="round"/>
      <path d="M94 54 L91 62 L96 61 L93 69" stroke="#d8ffff" strokeWidth=".9" strokeOpacity=".72" fill="none" strokeLinecap="round"/>
      <path d="M56 54 L59 62 L54 61 L57 69" stroke="#d8ffff" strokeWidth=".9" strokeOpacity=".72" fill="none" strokeLinecap="round"/>
      {/* Outer glow ring */}
      <circle cx="75" cy="105" r="17" fill="none" stroke="#80f0ff" strokeWidth="1.2" strokeOpacity=".22"/>
      {/* Center stamens */}
      <circle cx="75" cy="110" r="15" fill={`url(#${gid}c)`} stroke="#f4dc50" strokeWidth="1.5"/>
      <circle cx="75" cy="110" r="6" fill="#fffde8" stroke="#ffe880" strokeWidth="1"/>
    </g>
  </svg>;
}

function OrbitWorld() {
  const nodes = [{ text:'DATA ENGINEERING', cls:'node-one' },{text:'AI SYSTEMS',cls:'node-two'},{text:'ANALYTICS',cls:'node-three'},{text:'LEARNING',cls:'node-four'}];
  return <div className="orbit-world" aria-label="Abstract orbital network connecting data, AI, analytics and learning">
    <div className="orbit-aura" /><div className="orbit-ring ring-a"/><div className="orbit-ring ring-b"/><div className="orbit-ring ring-c"/>
    <div className="orbit-trace trace-a"/><div className="orbit-trace trace-b"/>
    <div className="orbit-core"><span>IDEAS</span><small>IN MOTION</small></div>
    {nodes.map(n=><div key={n.cls} className={`orbit-label ${n.cls}`}>{n.text}</div>)}
    <div className="orbit-star star-a"/><div className="orbit-star star-b"/><div className="orbit-star star-c"/>
    <div className="orbit-caption">ONE CONNECTED JOURNEY <span>Where curiosity becomes something you can build.</span></div>
  </div>;
}

function SignalWorld() {
  return <div className="signal-world">
    <div className="map-topline"><span>YOUR NEXT TEAM COULD BE ANYWHERE</span><span>42.36° N · 71.06° W</span></div>
    <img className="usa-map" src={`${BASE}usa-boston.svg`} alt="United States map with Boston highlighted in the northeast"/>
    <div className="boston-chip"><span className="boston-led"/><span><strong>BOSTON, MA</strong><small>Open to relocation</small></span></div>
    <div className="map-caption">BASED IN BOSTON · OPEN TO RELOCATION</div>
  </div>;
}

function Header({ mode, onModeChange, onContact }) {
  const [menu, setMenu] = useState(false);
  const set = value => { onModeChange(value); setMenu(false); };
  return <header className="site-header">
    <a className="wordmark" href="#home" onClick={()=>setMenu(false)}>Hiranmai <span>Devarasetty</span></a>
    <nav className={`header-links ${menu?'open':''}`} aria-label="Primary navigation">
      <a href="#intro" onClick={()=>setMenu(false)}>Intro</a><a href="#projects" onClick={()=>setMenu(false)}>Projects</a>
      <a href="#experience" onClick={()=>setMenu(false)}>Experience</a><a href="#skills" onClick={()=>setMenu(false)}>Skills</a>
      <div className="mode-switch" role="group" aria-label="Portfolio viewing mode">
        <button type="button" className={mode==='signal'?'selected':''} aria-pressed={mode==='signal'} onClick={()=>set('signal')}>◈ Signal <span>Impact</span></button>
        <button type="button" className={mode==='orbit'?'selected':''} aria-pressed={mode==='orbit'} onClick={()=>set('orbit')}>◌ Orbit <span>Discover</span></button>
      </div>
      <button className="header-contact" onClick={()=>{onContact();setMenu(false)}}>Let's Talk <ArrowUpRight size={15}/></button>
    </nav>
    <button className="menu-button" aria-label={menu?'Close navigation':'Open navigation'} aria-expanded={menu} onClick={()=>setMenu(v=>!v)}>{menu?<X/>:<Menu/>}</button>
  </header>;
}

function Hero({ mode }) {
  return <section className="hero" id="home">
    <div className="hero-inner">
      <div className="hero-copy">
        <div className="overline reveal-intro">WELCOME TO MY WORLD OF DATA & AI</div>
        <h1>Hiranmai <em>Devarasetty.</em></h1>
        <p className="hero-tagline">Discover with data.<br/><span>Accelerate with AI.</span><br/>Deliver with purpose.</p>
        <div className="hero-areas"><i/> DATA <span>/</span> AI <span>/</span> ANALYTICS ENGINEERING</div>
      </div>
      <div className="hero-visual">{mode==='signal'?<SignalWorld/>:<OrbitWorld/>}</div>
    </div>
    <button className="scroll-hint" onClick={()=>scrollToSection('journey')}><ArrowDownRight size={19}/> SCROLL TO DISCOVER</button>
  </section>;
}


const RAIL_PATH = 'M185 10 C360 10 360 220 185 220 C10 220 10 430 185 430 C360 430 360 640 185 640 C10 640 10 850 185 850 C360 850 360 1060 185 1060';
const RAIL_VB_W = 370, RAIL_VB_H = 1080;
function JourneyRail({ progress, active }) {
  const pathRef = useRef(null);
  const [measure, setMeasure] = useState({ point: {x:104,y:40}, length: 1 });
  const [endPct, setEndPct] = useState({ x: 35.1, y: 99.1 });
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    const end = path.getPointAtLength(len);
    setEndPct({ x: (end.x / RAIL_VB_W) * 100, y: (end.y / RAIL_VB_H) * 100 });
    setMeasure({ point: path.getPointAtLength(len * progress), length: len });
  }, [progress]);
  // top = 20px (heading) + endPct.y% of (100% - 20px)
  const flowerTop = `calc(20px + ${(endPct.y/100).toFixed(4)} * (100% - 20px))`;
  const flowerLeft = `${endPct.x.toFixed(2)}%`;
  return <aside className="journey-rail" aria-label="Scroll progress through portfolio">
    <div className="rail-sticky">
      <div className="rail-heading">THE JOURNEY <span>{String(Math.round(progress * 100)).padStart(2,'0')}%</span></div>
      <svg className="rail-line" viewBox="0 0 370 1080" aria-hidden="true">
        <defs><linearGradient id="railGradient" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#6dd6ed"/><stop offset=".51" stopColor="#a192e9"/><stop offset="1" stopColor="#f0c4a3"/></linearGradient></defs>
        <path d={RAIL_PATH} ref={pathRef} fill="none" stroke="currentColor" strokeOpacity=".18" strokeWidth="1.5"/>
        <path d={RAIL_PATH} fill="none" stroke="url(#railGradient)" strokeWidth="2" strokeDasharray={measure.length} strokeDashoffset={measure.length*(1-progress)}/>
        <g transform={`translate(${measure.point.x-55} ${measure.point.y-55}) rotate(${progress*28-12} 55 55)`}>
          <svg width="110" height="110" viewBox="0 0 100 90"><g className="rail-butterfly">
            <path d="M50 45 C9 -8 -7 14 15 43 C25 52 35 50 50 45 C20 52 23 88 42 70 Z" fill="#9dd6eb" fillOpacity=".55" stroke="#9dd6eb" strokeWidth="1.4" strokeDasharray="5 3.5" strokeLinejoin="round"/>
            <path d="M50 45 C91 -8 107 14 85 43 C75 52 65 50 50 45 C80 52 77 88 58 70 Z" fill="#be9def" fillOpacity=".50" stroke="#be9def" strokeWidth="1.4" strokeDasharray="5 3.5" strokeLinejoin="round"/>
            <path d="M50 33 L50 67" stroke="#f8e7d6" strokeWidth="1.4" strokeDasharray="4 3" strokeLinecap="round"/>
          </g></svg>
        </g>
      </svg>
      <div className="rail-labels">
        {STOPS.map(s=><button key={s.id} className={active===s.id?'active':''} onClick={()=>scrollToSection(s.id)}>{s.label}</button>)}
      </div>
      <div className={`rail-flower ${progress > .97?'arrived':''}`} style={{position:'absolute',left:flowerLeft,top:flowerTop,bottom:'auto',transform:'translate(-50%,-50%)'}}><Flower/></div>
    </div>
  </aside>;
}

function Chapter({ id, number, eyebrow, title, accent, lede, children }) {
  return <section id={id} className="chapter">
    <div className="chapter-kicker"><span>{number}</span><i/>{eyebrow}</div>
    <h2 className="chapter-title">{title} <em>{accent}</em></h2>
    {lede && <p className="chapter-lede">{lede}</p>}
    {children}
  </section>;
}

function Introduction() {
  return <Chapter id="intro" number="01" eyebrow="The introduction" title="The person behind" accent="the systems." lede="I’ve built dashboards Directors approve budgets on, and AI systems that answer questions dashboards can’t.">
    <div className="rich-copy">
      <p>I'm a data-driven problem solver who turns raw, messy information into decisions that matter. A recent Master's in Data Science graduate from Northeastern University (GPA: 3.8), I bring hands-on experience across the full data stack, from architecting ETL pipelines and building ML models to designing executive dashboards and deploying AI-powered applications.</p>
      <p>At AstraZeneca / Alexion Pharmaceuticals, I reduced report load times by 60%, cut data pipeline errors by 75%, and shipped Agentic AI solutions that cut manual onboarding work in half. My background spans pharma analytics, Fortune 500 healthcare consulting, academic research, LLM fine-tuning, and cross-functional stakeholder communication.</p>
      <p>What sets me apart: I don't just analyze data. I engineer systems around it. Outside of data, I'm a people-first leader who has led teams, hired talent, and mentored students.</p>
    </div>
    <div className="impact-strip">{impactStats.map(s=><div key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>)}</div>
  </Chapter>;
}

function ProjectGlyph({ index }) {
  const shapes = [
    <><path d="M7 39Q23 6 43 32T80 12"/><path d="M7 16Q36 54 79 25"/><circle cx="43" cy="32" r="5"/></>,
    <><path d="M8 29Q43 2 77 29Q43 56 8 29Z"/><path d="M43 4V54M8 29H77"/><circle cx="43" cy="29" r="7"/></>,
    <><path d="M12 40L30 12L50 37L70 16"/><circle cx="12" cy="40" r="5"/><circle cx="30" cy="12" r="5"/><circle cx="50" cy="37" r="5"/><circle cx="70" cy="16" r="5"/></>,
    <><circle cx="38" cy="29" r="20"/><path d="M38 9V49M18 29H58M25 15L51 43M51 15L25 43"/></>,
    <><path d="M9 43C25 39 20 16 40 19S57 48 73 13"/><path d="M8 44H74"/></>,
    <><path d="M11 28Q26 6 41 28T72 28Q56 51 41 28T11 28Z"/><circle cx="41" cy="28" r="7"/></>
  ];
  return <svg viewBox="0 0 88 58" className="project-glyph" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">{shapes[index%shapes.length]}</svg>;
}

function Projects() {
  return <Chapter id="projects" number="02" eyebrow="Selected and built" title="Ideas made" accent="real." lede="A selection of systems, experiments and applications built across data, machine learning and AI.">
    <div className="project-grid">
      {projects.map((p,i)=><article className="project-card" key={p.title}>
        <div className="project-top"><ProjectGlyph index={i}/><span className="project-index">{String(i+1).padStart(2,'0')} / {String(projects.length).padStart(2,'0')}</span></div>
        <h3>{p.title}</h3><p>{p.description}</p>
        <div className="tags">{p.tech.map(t=><span key={t}>{t}</span>)}</div>
        <details className="project-details"><summary>Explore implementation <ChevronDown size={14}/></summary>
          <ul>{p.highlights.map((h,j)=><li key={j}>{h}</li>)}</ul>
        </details>
      </article>)}
    </div>
  </Chapter>;
}

function ExperienceIllustration({ org }) {
  const uid = useId().replace(/:/g, '');
  const s = { width: '100%', height: '100%', display: 'block' };

  if (org.includes('AstraZeneca')) return (
    <svg viewBox="0 0 800 180" preserveAspectRatio="xMidYMid slice" style={s} aria-hidden="true">
      <defs><linearGradient id={`${uid}a`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#74d9ec" stopOpacity=".85"/><stop offset="1" stopColor="#dfc39a" stopOpacity=".65"/></linearGradient></defs>
      <rect width="800" height="180" fill="#07141f"/>
      {[45,90,135].map(y=><line key={y} x1="0" y1={y} x2="800" y2={y} stroke="#74d9ec" strokeOpacity=".05" strokeWidth="1"/>)}
      {[130,260,390,520,650].map(x=><line key={x} x1={x} y1="0" x2={x} y2="180" stroke="#74d9ec" strokeOpacity=".04" strokeWidth="1"/>)}
      <path d="M60 90 C150 36 200 145 300 90 S440 30 540 90 S670 148 760 90" fill="none" stroke={`url(#${uid}a)`} strokeWidth="1.8" strokeOpacity=".65"/>
      {[[60,90],[180,52],[300,90],[420,48],[540,90],[660,134],[760,90]].map(([x,y],i)=>(
        <g key={i}><circle cx={x} cy={y} r="18" fill="#091c2e" stroke="#74d9ec" strokeWidth="1" strokeOpacity=".5"/><circle cx={x} cy={y} r="6.5" fill="#74d9ec" fillOpacity=".75"/></g>
      ))}
      {[38,56,30,66,50].map((h,i)=><rect key={i} x={638+i*19} y={140-h} width="13" height={h} fill="#dfc39a" fillOpacity={.12+i*.05} rx="2"/>)}
      {[[110,30],[165,148],[255,50],[380,140],[500,35],[620,118]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="2.5" fill="#74d9ec" fillOpacity=".3"/>)}
      <text x="60" y="170" fontSize="8" fontFamily="monospace" letterSpacing=".14em" fill="#74d9ec" fillOpacity=".38">DATA ANALYTICS · ETL PIPELINE · REPORTING</text>
    </svg>
  );

  if (org.includes('Saxbys')) return (
    <svg viewBox="0 0 800 180" preserveAspectRatio="xMidYMid slice" style={s} aria-hidden="true">
      <rect width="800" height="180" fill="#07131d"/>
      {[[185,42],[255,150],[400,15],[545,150],[615,42]].map(([x,y],i)=>(
        <line key={i} x1="400" y1="90" x2={x} y2={y} stroke="#74d9ec" strokeOpacity=".22" strokeWidth="1.4"/>
      ))}
      <path d="M185 42 Q220 96 255 150" fill="none" stroke="#dfc39a" strokeOpacity=".12" strokeWidth="1"/>
      <path d="M615 42 Q580 96 545 150" fill="none" stroke="#dfc39a" strokeOpacity=".12" strokeWidth="1"/>
      <path d="M185 42 Q292 14 400 15" fill="none" stroke="#74d9ec" strokeOpacity=".1" strokeWidth="1"/>
      <path d="M615 42 Q508 14 400 15" fill="none" stroke="#74d9ec" strokeOpacity=".1" strokeWidth="1"/>
      <circle cx="400" cy="90" r="32" fill="#0c1e30" stroke="#74d9ec" strokeWidth="1.5" strokeOpacity=".5"/>
      <circle cx="400" cy="90" r="12" fill="#74d9ec" fillOpacity=".7"/>
      {[[185,42],[255,150],[400,15],[545,150],[615,42]].map(([x,y],i)=>(
        <g key={i}><circle cx={x} cy={y} r="21" fill="#091826" stroke="#dfc39a" strokeWidth="1" strokeOpacity=".4"/><circle cx={x} cy={y} r="7.5" fill="#dfc39a" fillOpacity=".55"/></g>
      ))}
      <text x="60" y="170" fontSize="8" fontFamily="monospace" letterSpacing=".14em" fill="#74d9ec" fillOpacity=".38">TEAM LEADERSHIP · OPERATIONS · TALENT ACQUISITION</text>
    </svg>
  );

  if (org.includes('Northeastern')) return (
    <svg viewBox="0 0 800 180" preserveAspectRatio="xMidYMid slice" style={s} aria-hidden="true">
      <defs><linearGradient id={`${uid}b`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#74d9ec"/><stop offset="1" stopColor="#c6a1f1"/></linearGradient></defs>
      <rect width="800" height="180" fill="#070e1b"/>
      <line x1="80" y1="14" x2="80" y2="155" stroke="#74d9ec" strokeOpacity=".18" strokeWidth="1"/>
      <line x1="80" y1="155" x2="680" y2="155" stroke="#74d9ec" strokeOpacity=".18" strokeWidth="1"/>
      {[40,80,120].map(y=><line key={y} x1="74" y1={y} x2="86" y2={y} stroke="#74d9ec" strokeOpacity=".25" strokeWidth="1"/>)}
      <line x1="100" y1="148" x2="668" y2="22" stroke="#dfc39a" strokeOpacity=".38" strokeWidth="1.3" strokeDasharray="7 5"/>
      {[[104,142],[148,126],[192,112],[236,100],[280,86],[324,74],[368,62],[412,54],[456,44],[500,38],[544,32],[588,42],[632,24]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r={i%3===0?6:4} fill={`url(#${uid}b)`} fillOpacity={.45+i*.025}/>
      ))}
      {[[710,40],[744,82],[710,124],[758,104]].map(([x,y],i)=>(
        <g key={i}><circle cx={x} cy={y} r="13" fill="#10102a" stroke="#c6a1f1" strokeWidth="1" strokeOpacity=".45"/><circle cx={x} cy={y} r="4.5" fill="#c6a1f1" fillOpacity=".55"/></g>
      ))}
      <line x1="710" y1="40" x2="744" y2="82" stroke="#c6a1f1" strokeOpacity=".18" strokeWidth="1"/>
      <line x1="744" y1="82" x2="710" y2="124" stroke="#c6a1f1" strokeOpacity=".18" strokeWidth="1"/>
      <line x1="744" y1="82" x2="758" y2="104" stroke="#c6a1f1" strokeOpacity=".18" strokeWidth="1"/>
      <text x="60" y="170" fontSize="8" fontFamily="monospace" letterSpacing=".14em" fill="#74d9ec" fillOpacity=".38">RESEARCH · TEACHING · STATISTICAL ANALYSIS</text>
    </svg>
  );

  if (org.includes('Turingminds')) return (
    <svg viewBox="0 0 800 180" preserveAspectRatio="xMidYMid slice" style={s} aria-hidden="true">
      <rect width="800" height="180" fill="#090616"/>
      {[30,65,100,135].flatMap((iy,ii)=>[22,54,86,118,150].map((hy,hi)=>(
        <line key={`a${ii}${hi}`} x1="178" y1={iy+10} x2="308" y2={hy+10} stroke="#c6a1f1" strokeOpacity=".07" strokeWidth=".9"/>
      )))}
      {[22,54,86,118,150].flatMap((h1,i)=>[22,54,86,118,150].map((h2,j)=>(
        <line key={`b${i}${j}`} x1="338" y1={h1+10} x2="468" y2={h2+10} stroke="#74d9ec" strokeOpacity=".05" strokeWidth=".9"/>
      )))}
      {[22,54,86,118,150].flatMap((hy,i)=>[44,88,132].map((oy,j)=>(
        <line key={`c${i}${j}`} x1="498" y1={hy+10} x2="618" y2={oy+10} stroke="#dfc39a" strokeOpacity=".09" strokeWidth=".9"/>
      )))}
      {[44,88,132].map((oy,i)=>(
        <line key={`d${i}`} x1="634" y1={oy+10} x2="706" y2="90" stroke="#dfc39a" strokeOpacity=".3" strokeWidth="1.3"/>
      ))}
      {[30,65,100,135].map((y,i)=>(
        <g key={i}><circle cx="164" cy={y+10} r="15" fill="#140a26" stroke="#c6a1f1" strokeWidth="1" strokeOpacity=".5"/><circle cx="164" cy={y+10} r="5.5" fill="#c6a1f1" fillOpacity=".65"/></g>
      ))}
      {[22,54,86,118,150].map((y,i)=>(
        <g key={i}><circle cx="323" cy={y+10} r="15" fill="#0d1220" stroke="#74d9ec" strokeWidth="1" strokeOpacity=".5"/><circle cx="323" cy={y+10} r="5.5" fill="#74d9ec" fillOpacity=".65"/></g>
      ))}
      {[22,54,86,118,150].map((y,i)=>(
        <g key={i}><circle cx="483" cy={y+10} r="15" fill="#0d1220" stroke="#74d9ec" strokeWidth="1" strokeOpacity=".4"/><circle cx="483" cy={y+10} r="5.5" fill="#74d9ec" fillOpacity=".5"/></g>
      ))}
      {[44,88,132].map((y,i)=>(
        <g key={i}><circle cx="626" cy={y+10} r="16" fill="#1a100a" stroke="#dfc39a" strokeWidth="1.2" strokeOpacity=".65"/><circle cx="626" cy={y+10} r="6" fill="#dfc39a" fillOpacity=".7"/></g>
      ))}
      <circle cx="714" cy="100" r="22" fill="#1a100a" stroke="#dfc39a" strokeWidth="1.5" strokeOpacity=".8"/>
      <circle cx="714" cy="100" r="9" fill="#dfc39a" fillOpacity=".8"/>
      <text x="164" y="173" textAnchor="middle" fontSize="7" fontFamily="monospace" letterSpacing=".1em" fill="#c6a1f1" fillOpacity=".4">INPUT</text>
      <text x="323" y="173" textAnchor="middle" fontSize="7" fontFamily="monospace" letterSpacing=".1em" fill="#74d9ec" fillOpacity=".4">HIDDEN</text>
      <text x="483" y="173" textAnchor="middle" fontSize="7" fontFamily="monospace" letterSpacing=".1em" fill="#74d9ec" fillOpacity=".4">HIDDEN</text>
      <text x="626" y="173" textAnchor="middle" fontSize="7" fontFamily="monospace" letterSpacing=".1em" fill="#dfc39a" fillOpacity=".4">OUTPUT</text>
    </svg>
  );

  return <div className="experience-art-fallback"><span>CONNECTIONS & IMPACT</span></div>;
}

function Experience() {
  const work = careerPath.filter(x=>x.type==='work');
  const schools = careerPath.filter(x=>x.type==='education');
  return <Chapter id="experience" number="03" eyebrow="Career and education" title="The work." accent="The learning." lede="The experiences that shaped how I build, collaborate and think.">
    <div className="subhead">Experience</div>
    <div className="experience-stack">
      <div className="experience-mini-path" aria-hidden="true"><svg viewBox="0 0 56 980" preserveAspectRatio="none"><path d="M31 0Q1 138 28 245T29 490T24 735T34 980" fill="none" stroke="currentColor" strokeOpacity=".25" strokeWidth="1.4" strokeDasharray="5 8"/></svg><div className="experience-mini-butterfly"><Butterfly small/></div></div>
      {work.map((x,i)=><article key={`${x.org}-${i}`} className="experience-card">
        <div className="experience-art">
          <ExperienceIllustration org={x.org} />
        </div>
        <div className="experience-text"><div className="experience-period">{x.period} <span>· {x.location}</span></div><h3>{x.title}</h3><div className="experience-org">{x.org}</div>
          <p>{experienceNotes[x.org] || 'A part of my professional journey bringing together technical capability, communication and hands-on ownership.'}</p>
        </div>
      </article>)}
    </div>
    <div className="subhead schools-title">Education</div>
    <div className="school-grid">{schools.map(s=><div className="school-card" key={s.org}><div className="school-emblem">✧</div><div><div className="experience-period">{s.period}</div><h3>{s.title}</h3><p>{s.org}</p><small>{s.location} · {s.detail}</small></div></div>)}</div>
  </Chapter>;
}

function Capabilities() {
  return <Chapter id="skills" number="04" eyebrow="Skills and technical toolkit" title="Capabilities," accent="connected." lede="Tools and methods across programming, analytics, data engineering, applied AI and deployment.">
    <div className="capability-grid">
      {Object.entries(skills).map(([name,v],i)=><div className="capability" key={name}>
        <div className="capability-heading"><span>{String(i+1).padStart(2,'0')}</span><h3>{name}</h3></div>
        <div className="tags">{v.items.map(skill=><span key={skill}>{skill}</span>)}</div>
      </div>)}
    </div>
    <div className="subhead credentials-heading">Certifications & Publications</div>
    <div className="cert-list">{certifications.map(c=><div key={c.title}><span>↗</span><strong>{c.title}</strong><small>{c.issuer}</small></div>)}</div>
  </Chapter>;
}

function Connect({ mode, onContact }) {
  return <Chapter id="connect" number="05" eyebrow="The destination" title={mode==='signal'?'The next destination?':'Great ideas begin'} accent={mode==='signal'?'Your team.':'with connection.'} lede={mode==='signal'?'I’d love to bring this mix of analytical thinking, practical AI and ownership to your team, and build work that makes a difference.':'Whether it starts with an interesting question, an ambitious idea or a new perspective, I’d love to explore where it could lead.'}>
    <div className="destination-wrap">
      <div className="destination-actions"><button className="main-cta" onClick={onContact}>Let's Talk <ArrowUpRight size={17}/></button><div className="socials"><a href="https://www.linkedin.com/in/hiranmaidev/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={19}/></a><a href="https://github.com/Hiranmai28" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={19}/></a><a href="mailto:hiranmaid05@gmail.com" aria-label="Email"><Mail size={19}/></a></div></div>
    </div>
  </Chapter>;
}

function ContactModal({ open, onClose }) {
  const [intent,setIntent]=useState('Full-time opportunity');
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [organization,setOrganization]=useState('');
  const [message,setMessage]=useState('');
  const dialogRef=useRef(null);
  const closeRef=useRef(onClose);
  closeRef.current=onClose;
  useEffect(()=>{
    if(!open)return;
    const prev=document.activeElement;
    document.body.style.overflow='hidden';
    dialogRef.current?.querySelector('button')?.focus();
    const onKey=(e)=>{
      if(e.key==='Escape') closeRef.current();
      if(e.key==='Tab') {
        const candidates=Array.from(dialogRef.current?.querySelectorAll('button:not([disabled]),input:not([disabled]),textarea:not([disabled]),a[href]')||[]);
        const first=candidates[0],last=candidates[candidates.length-1];
        if(e.shiftKey && document.activeElement===first){e.preventDefault();last?.focus()}
        else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first?.focus()}
      }
    };
    document.addEventListener('keydown',onKey);
    return ()=>{document.body.style.overflow='';document.removeEventListener('keydown',onKey);prev?.focus?.()};
  },[open]);
  const submit=e=>{
    e.preventDefault();
    const body=`Name: ${name}\nEmail: ${email}\nOrganization: ${organization||'Not provided'}\nReason: ${intent}\n\n${message}`;
    window.location.href=`mailto:hiranmaid05@gmail.com?subject=${encodeURIComponent(`[Portfolio] ${intent}`)}&body=${encodeURIComponent(body)}`;
  };
  if(!open)return null;
  return <div className="modal-scrim" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}>
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="contact-title" className="contact-panel">
      <div className="contact-top"><span className="overline">OPEN A CONNECTION</span><button className="icon-close" onClick={onClose} aria-label="Close contact form"><X size={20}/></button></div>
      <h2 id="contact-title">Every connection <em>starts somewhere.</em></h2>
      <p className="contact-desc">What brings you here?</p>
      <div className="contact-choices" role="group" aria-label="Reason for reaching out">
        {['Full-time opportunity','Collaboration','Just saying hello'].map(c=><button key={c} type="button" aria-pressed={intent===c} className={intent===c?'active':''} onClick={()=>setIntent(c)}>{c}</button>)}
      </div>
      <form onSubmit={submit} className="contact-form">
        <div className="form-row"><label>Your name<input required value={name} onChange={e=>setName(e.target.value)} placeholder="Your name"/></label><label>Organization (optional)<input value={organization} onChange={e=>setOrganization(e.target.value)} placeholder="Company or school"/></label></div>
        <label>Email address<input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></label>
        <label>Your message<textarea required rows={4} value={message} onChange={e=>setMessage(e.target.value)} placeholder="I'd love to talk about..."/></label>
        <div className="form-bottom"><p>Opens your email application; no message is sent from this site.</p><button className="main-cta" type="submit">Continue <ArrowUpRight size={16}/></button></div>
      </form>
    </div>
  </div>;
}

export default function App() {
  const [mode,setMode] = useState(() => { try {return localStorage.getItem('hiranmai-mode') === 'orbit' ? 'orbit' : 'signal'} catch {return 'signal'} });
  const [contactOpen,setContactOpen] = useState(false);
  const { progress, active } = useScrollJourney();
  useEffect(() => { document.body.dataset.mode=mode; try {localStorage.setItem('hiranmai-mode',mode)} catch {} },[mode]);
  return <>
    <div className="site-background" aria-hidden="true"/><ConnectionCanvas mode={mode}/><div className="grain" aria-hidden="true"/>
    <Header mode={mode} onModeChange={setMode} onContact={()=>setContactOpen(true)}/>
    <main><Hero mode={mode}/>
      <div className="story-layout"><div className="story-sections"><Introduction/><Projects/><Experience/><Capabilities/><Connect mode={mode} onContact={()=>setContactOpen(true)}/></div>
        <JourneyRail progress={progress} active={active}/></div>
    </main>
    <div className="mobile-flight" aria-label={`Journey progress ${Math.round(progress*100)} percent`}><Butterfly small/><div className="mobile-progress-track"><div style={{width:`${Math.round(progress*100)}%`}}/></div><span>{active.toUpperCase()}</span></div>
    <footer className="site-footer"><span>© {new Date().getFullYear()} Hiranmai Devarasetty</span><span>Discover with data. Accelerate with AI. Deliver with purpose.</span><a href="#home">Back to top ↑</a></footer>
    <ContactModal open={contactOpen} onClose={()=>setContactOpen(false)}/>
  </>;
}
