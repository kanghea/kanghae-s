import type { Project } from "@/content/types";

type Art = NonNullable<Project["art"]>;

/**
 * 이미지가 없는 프로젝트의 표지 — 저장소에 쓸 만한 스크린샷이 없거나 저작권이 불분명할 때
 * 프로젝트 성격을 그린 SVG 를 쓴다(외부 이미지 0, 테마와 무관하게 어두운 판).
 */
export function ProjectArt({ art, label }: { art: Art; label: string }) {
  return (
    <svg viewBox="0 0 640 360" role="img" aria-label={label} className="block h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={`glow-${art}`} cx="50%" cy="0%" r="90%">
          <stop offset="0" stopColor="#f5b841" stopOpacity="0.22" />
          <stop offset="0.5" stopColor="#5c78ff" stopOpacity="0.08" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`gold-${art}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#ffe6ad" />
          <stop offset="0.42" stopColor="#f5b841" />
          <stop offset="1" stopColor="#ff8a3d" />
        </linearGradient>
      </defs>
      <rect width="640" height="360" fill="#0b0b0d" />
      <rect width="640" height="360" fill={`url(#glow-${art})`} />
      {art === "omok" && <Omok />}
      {art === "market" && <Market />}
      {art === "quest" && <Quest />}
      {art === "route" && <Route />}
    </svg>
  );
}

/* 15×15 판 위의 대국 — 흑이 5목을 완성한 순간(마지막 수 골드 링). */
function Omok() {
  const n = 15;
  const size = 300;
  const x0 = 170;
  const y0 = 30;
  const step = size / (n - 1);
  const p = (i: number) => i * step;
  const black: [number, number][] = [[5, 9], [6, 8], [7, 7], [8, 6], [9, 5], [6, 6], [8, 9], [4, 7]];
  const white: [number, number][] = [[6, 7], [7, 8], [5, 8], [8, 8], [7, 6], [9, 7], [6, 10]];
  return (
    <g>
      <rect x={x0 - 18} y={y0 - 18} width={size + 36} height={size + 36} rx="10" fill="#dab86f" />
      <rect x={x0 - 18} y={y0 - 18} width={size + 36} height={size + 36} rx="10" fill="url(#glow-omok)" opacity="0.4" />
      {Array.from({ length: n }, (_, i) => (
        <g key={i} stroke="#5a3a1b" strokeWidth="1" opacity="0.75">
          <line x1={x0} y1={y0 + p(i)} x2={x0 + size} y2={y0 + p(i)} />
          <line x1={x0 + p(i)} y1={y0} x2={x0 + p(i)} y2={y0 + size} />
        </g>
      ))}
      {[[3, 3], [3, 11], [7, 7], [11, 3], [11, 11]].map(([a, b]) => (
        <circle key={`${a}-${b}`} cx={x0 + p(a)} cy={y0 + p(b)} r="2.6" fill="#5a3a1b" />
      ))}
      {white.map(([a, b]) => (
        <circle key={`w${a}-${b}`} cx={x0 + p(a)} cy={y0 + p(b)} r="9" fill="#f5f5f7" stroke="#c9c2b2" strokeWidth="1" />
      ))}
      {black.map(([a, b]) => (
        <circle key={`b${a}-${b}`} cx={x0 + p(a)} cy={y0 + p(b)} r="9" fill="#141416" />
      ))}
      <line x1={x0 + p(5)} y1={y0 + p(9)} x2={x0 + p(9)} y2={y0 + p(5)} stroke="url(#gold-omok)" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
      <circle cx={x0 + p(9)} cy={y0 + p(5)} r="13" fill="none" stroke="#f5b841" strokeWidth="2.5" />
    </g>
  );
}

/* 시장 골목 격자 위 최단 경로 — 길찾기. */
function Market() {
  const cols = 8;
  const rows = 4;
  const w = 56;
  const h = 46;
  const gx = 22;
  const gy = 26;
  const x0 = 320 - (cols * w + (cols - 1) * gx) / 2;
  const y0 = 180 - (rows * h + (rows - 1) * gy) / 2;
  const cell = (c: number, r: number) => ({ x: x0 + c * (w + gx), y: y0 + r * (h + gy) });
  const lane = (c: number) => x0 + c * (w + gx) - gx / 2;
  const row = (r: number) => y0 + r * (h + gy) - gy / 2;
  const path = `M ${lane(0)} ${row(4)} L ${lane(0)} ${row(2)} L ${lane(3)} ${row(2)} L ${lane(3)} ${row(1)} L ${lane(6)} ${row(1)} L ${lane(6)} ${row(3)} L ${lane(7)} ${row(3)}`;
  const highlight = [
    [6, 2],
    [2, 1],
  ];
  return (
    <g>
      {Array.from({ length: cols * rows }, (_, i) => {
        const c = i % cols;
        const r = Math.floor(i / cols);
        const { x, y } = cell(c, r);
        const on = highlight.some(([a, b]) => a === c && b === r);
        return <rect key={i} x={x} y={y} width={w} height={h} rx="7" fill={on ? "#2a2214" : "#18181b"} stroke={on ? "#f5b841" : "rgba(255,255,255,0.08)"} strokeWidth={on ? 1.6 : 1} />;
      })}
      <path d={path} fill="none" stroke="url(#gold-market)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 0" />
      <circle cx={lane(0)} cy={row(4)} r="8" fill="#0b0b0d" stroke="#f5f5f7" strokeWidth="2.5" />
      <circle cx={lane(7)} cy={row(3)} r="9" fill="#f5b841" />
      <circle cx={lane(7)} cy={row(3)} r="16" fill="none" stroke="#f5b841" strokeOpacity="0.4" strokeWidth="2" />
    </g>
  );
}

/* 진단 → 강의 → 퀘스트 → 평가 단계를 오르는 길. */
function Quest() {
  const steps = [
    { x: 120, y: 270 },
    { x: 220, y: 230 },
    { x: 320, y: 190 },
    { x: 420, y: 140 },
    { x: 520, y: 90 },
  ];
  return (
    <g>
      {steps.map((s, i) => (
        <rect key={i} x={s.x - 34} y={s.y + 14} width="68" height={330 - s.y} rx="10" fill="#18181b" stroke="rgba(255,255,255,0.08)" />
      ))}
      <polyline points={steps.map((s) => `${s.x},${s.y}`).join(" ")} fill="none" stroke="url(#gold-quest)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {steps.map((s, i) => (
        <g key={`n${i}`}>
          <circle cx={s.x} cy={s.y} r={i === steps.length - 1 ? 14 : 9} fill={i === steps.length - 1 ? "#f5b841" : "#0b0b0d"} stroke="#f5b841" strokeWidth="2.5" />
          {i === steps.length - 1 && <path d={`M ${s.x - 6} ${s.y} l 4 4 l 8 -9`} stroke="#1d1503" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
        </g>
      ))}
    </g>
  );
}

/* 지도 위 노드와 A* 경로 — 여행 코스. */
function Route() {
  const nodes = [
    [110, 250], [180, 130], [250, 210], [300, 90], [360, 260], [420, 170], [480, 80], [540, 230], [210, 300], [470, 300], [380, 60],
  ];
  const edges = [
    [0, 1], [0, 2], [1, 3], [2, 3], [2, 4], [3, 5], [4, 5], [5, 6], [5, 7], [6, 7], [0, 8], [8, 4], [4, 9], [9, 7], [3, 10], [10, 6],
  ];
  const route = [0, 2, 3, 5, 7];
  return (
    <g>
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="4 6" />
      ))}
      <polyline points={route.map((i) => nodes[i].join(",")).join(" ")} fill="none" stroke="url(#gold-route)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      {nodes.map(([x, y], i) => {
        const onRoute = route.includes(i);
        return <circle key={i} cx={x} cy={y} r={onRoute ? 8 : 5} fill={onRoute ? "#f5b841" : "#2a2a2f"} stroke={onRoute ? "#0b0b0d" : "none"} strokeWidth="2" />;
      })}
      <path d={`M ${nodes[7][0]} ${nodes[7][1] - 30} c -12 0 -18 9 -18 17 c 0 11 18 25 18 25 s 18 -14 18 -25 c 0 -8 -6 -17 -18 -17 z`} fill="#f5b841" />
      <circle cx={nodes[7][0]} cy={nodes[7][1] - 13} r="6" fill="#1d1503" />
    </g>
  );
}
