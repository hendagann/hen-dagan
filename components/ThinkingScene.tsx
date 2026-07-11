"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type ThinkingStage = { label: string; title: string; text: string };

const STAGE_SECONDS = 5; // חמש שניות לכל שלב, לבקשת חן

// מספר החלקיקים מותאם לפי המכשיר (פחות במובייל, לחיסכון בסוללה וחלקות)
function buildTargets(COUNT: number): Float32Array[] {
  const rng = (seed: number) => {
    let s = seed;
    return () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  };

  // שלב 1: מידע מפוזר, ענן אקראי רחב
  const scatter = new Float32Array(COUNT * 3);
  const r1 = rng(42);
  for (let i = 0; i < COUNT; i++) {
    scatter[i * 3] = (r1() - 0.5) * 14;
    scatter[i * 3 + 1] = (r1() - 0.5) * 8;
    scatter[i * 3 + 2] = (r1() - 0.5) * 6;
  }

  // שלב 2: דפוס, גל מסודר
  const pattern = new Float32Array(COUNT * 3);
  const cols = 34;
  for (let i = 0; i < COUNT; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = (col / (cols - 1) - 0.5) * 12;
    const y = (row / Math.ceil(COUNT / cols) - 0.5) * 6;
    pattern[i * 3] = x;
    pattern[i * 3 + 1] = y + Math.sin(x * 1.1) * 0.9;
    pattern[i * 3 + 2] = Math.cos(x * 0.8) * 0.6;
  }

  // שלב 3: תובנה, התכנסות לליבה זוהרת אחת
  const insight = new Float32Array(COUNT * 3);
  const r3 = rng(7);
  for (let i = 0; i < COUNT; i++) {
    const theta = r3() * Math.PI * 2;
    const phi = Math.acos(2 * r3() - 1);
    const rad = 0.5 + Math.pow(r3(), 2.2) * 1.6;
    insight[i * 3] = rad * Math.sin(phi) * Math.cos(theta);
    insight[i * 3 + 1] = rad * Math.sin(phi) * Math.sin(theta);
    insight[i * 3 + 2] = rad * Math.cos(phi);
  }

  // שלב 4: כיוון מסרים, שלושה פסים אופקיים מיושרים
  const messages = new Float32Array(COUNT * 3);
  const r4 = rng(99);
  for (let i = 0; i < COUNT; i++) {
    const lane = i % 3;
    messages[i * 3] = (r4() - 0.5) * 11;
    messages[i * 3 + 1] = (lane - 1) * 1.7 + (r4() - 0.5) * 0.22;
    messages[i * 3 + 2] = (r4() - 0.5) * 0.4;
  }

  // שלב 5: תוצר, מסגרת של פריים וידאו עם משולש נגינה
  const product = new Float32Array(COUNT * 3);
  const r5 = rng(23);
  const W = 4.4;
  const H = 6.2;
  const frameCount = Math.floor(COUNT * 0.72);
  for (let i = 0; i < frameCount; i++) {
    const t = (i / frameCount) * 4;
    const side = Math.floor(t);
    const f = t - side;
    let x = 0;
    let y = 0;
    if (side === 0) {
      x = (f - 0.5) * W;
      y = H / 2;
    } else if (side === 1) {
      x = W / 2;
      y = (0.5 - f) * H;
    } else if (side === 2) {
      x = (0.5 - f) * W;
      y = -H / 2;
    } else {
      x = -W / 2;
      y = (f - 0.5) * H;
    }
    product[i * 3] = x + (r5() - 0.5) * 0.12;
    product[i * 3 + 1] = y + (r5() - 0.5) * 0.12;
    product[i * 3 + 2] = (r5() - 0.5) * 0.3;
  }
  for (let i = frameCount; i < COUNT; i++) {
    const a = r5();
    const b = r5() * (1 - a);
    const v0 = [-0.7, 1.0];
    const v1 = [-0.7, -1.0];
    const v2 = [1.1, 0.0];
    product[i * 3] = v0[0] + a * (v1[0] - v0[0]) + b * (v2[0] - v0[0]);
    product[i * 3 + 1] = v0[1] + a * (v1[1] - v0[1]) + b * (v2[1] - v0[1]);
    product[i * 3 + 2] = (r5() - 0.5) * 0.25;
  }

  return [scatter, pattern, insight, messages, product];
}

/* החלקיקים רודפים אחרי צורת השלב הנוכחי. השלב מגיע מבחוץ (טיימר),
   כך שהכיתוב מתקדם גם אם הדפדפן מאט את ה WebGL. */
function Particles({ stage, count }: { stage: number; count: number }) {
  const ref = useRef<THREE.Points>(null);
  const targets = useMemo(() => buildTargets(count), [count]);
  const positions = useMemo(() => new Float32Array(targets[0]), [targets]);

  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const gold = new THREE.Color("#e2b45a");
    const violet = new THREE.Color("#8b7cf6");
    for (let i = 0; i < count; i++) {
      const c = i % 5 === 0 ? gold : violet.clone().lerp(gold, (i % 17) / 34);
      arr[i * 3] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    }
    return arr;
  }, []);

  useFrame(({ clock }, delta) => {
    const target = targets[stage % targets.length];
    const pos = ref.current!.geometry.attributes.position.array as Float32Array;
    // התקרבות חלקה אל הצורה של השלב הנוכחי
    const k = Math.min(1, delta * 2.2);
    for (let i = 0; i < count * 3; i++) {
      pos[i] += (target[i] - pos[i]) * k;
    }
    ref.current!.rotation.y = Math.sin(clock.elapsedTime * 0.12) * 0.12;
    ref.current!.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.075}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ThinkingScene({ stages }: { stages: ThinkingStage[] }) {
  const [stage, setStage] = useState(0);
  const [cycleKey, setCycleKey] = useState(0); // בחירה ידנית מאפסת את הטיימר
  const [mode, setMode] = useState<"loading" | "3d" | "static">("loading");
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(false); // האם הסקשן בתצוגה, לצורך השהיית הרינדור
  const containerRef = useRef<HTMLDivElement>(null);

  const selectStage = (i: number) => {
    setStage(i);
    setCycleKey((k) => k + 1);
  };

  useEffect(() => {
    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrowMq = window.matchMedia("(max-width: 767px)");
    // אנימציית הנקודות פועלת גם במובייל; סטטי רק אם המשתמש ביקש פחות תנועה
    // או במכשיר חלש מאוד (שני ליבות או פחות).
    const weak = (navigator.hardwareConcurrency || 8) <= 2;
    const update = () => {
      setIsMobile(narrowMq.matches);
      setMode(reducedMq.matches || weak ? "static" : "3d");
    };
    update();
    reducedMq.addEventListener("change", update);
    narrowMq.addEventListener("change", update);
    return () => {
      reducedMq.removeEventListener("change", update);
      narrowMq.removeEventListener("change", update);
    };
  }, []);

  // קצב השלבים: טיימר עצמאי, לא תלוי ב WebGL ולא ב IntersectionObserver
  // (שהתנהג לא אמין במובייל). מתחלף כל 5 שניות במצב 3D.
  // cycleKey מאתחל את הספירה אחרי בחירה ידנית, כדי שהשלב שנבחר יקבל זמן מלא.
  useEffect(() => {
    if (mode !== "3d") return;
    const id = setInterval(() => {
      setStage((s) => (s + 1) % stages.length);
    }, STAGE_SECONDS * 1000);
    return () => clearInterval(id);
  }, [mode, stages.length, cycleKey]);

  // מעקב תצוגה אמין (getBoundingClientRect על scroll/resize) כדי להשהות את
  // רינדור ה WebGL כשהסקשן לא על המסך: חוסך סוללה ומונע גמגום, במיוחד במובייל.
  useEffect(() => {
    const check = () => {
      const el = containerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setVisible(r.top < window.innerHeight + 120 && r.bottom > -120);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative flex flex-col gap-5">
      {/* ההסבר של השלב הנוכחי: מעל הריבוע, מתחלף כל 10 שניות.
          כל חמשת ההסברים קיימים תמיד ב HTML; ההחלפה ויזואלית בלבד. */}
      {mode !== "static" ? (
        <div className="grid" aria-live="polite">
          {stages.map((s, i) => {
            const active = i === stage;
            return (
              <div
                key={s.label}
                aria-hidden={!active}
                /* בלי אנימציית כניסה: fill mode דרס את ההסתרה וגרם לשלב 5 להיתקע מעל כולם */
                className={`glass px-5 py-4 sm:px-6 [grid-area:1/1] transition-opacity duration-500 ${
                  active ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <p className="eyebrow pb-1">
                  שלב {i + 1} · {s.label}
                </p>
                <p className="font-semibold text-lg">{s.title}</p>
                <p className="text-[var(--color-muted)] leading-relaxed text-sm sm:text-base pt-1">{s.text}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <ol className="flex flex-col gap-3">
          {stages.map((s, i) => (
            <li key={s.label} className="glass rounded-2xl px-5 py-4">
              <p className="eyebrow pb-1">
                שלב {i + 1} · {s.label}
              </p>
              <p className="font-semibold">{s.title}</p>
              <p className="text-[var(--color-muted)] leading-relaxed text-sm pt-1">{s.text}</p>
            </li>
          ))}
        </ol>
      )}

      <div className="h-[340px] sm:h-[420px] rounded-3xl overflow-hidden relative glass glass-refract">
        {mode === "3d" && (
          <Canvas
            frameloop={visible ? "always" : "never"}
            dpr={[1, isMobile ? 1 : 1.5]}
            camera={{ position: [0, 0, 10.5], fov: 42 }}
            gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
          >
            <Particles stage={stage} count={isMobile ? 420 : 850} />
          </Canvas>
        )}
        {mode === "static" && (
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(18rem 12rem at 50% 45%, rgb(226 180 90 / 0.35), transparent 65%), radial-gradient(26rem 16rem at 30% 60%, rgb(139 124 246 / 0.25), transparent 70%)",
            }}
          />
        )}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <ol
            className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-xs sm:text-sm"
            aria-label="ציר התהליך: מהמידע אל התוצר"
          >
            {stages.map((s, i) => (
              <li key={s.label} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => selectStage(i)}
                  aria-pressed={stage === i}
                  aria-label={`לשלב ${i + 1}: ${s.label}`}
                  className={`px-3 py-1.5 rounded-full border transition-all duration-500 cursor-pointer hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] ${
                    mode !== "3d" || stage === i
                      ? "border-[var(--color-gold)] text-[var(--color-gold)] bg-[var(--color-gold-soft)]"
                      : "border-white/15 text-[var(--color-muted)]"
                  }`}
                >
                  {s.label}
                </button>
                {i < stages.length - 1 && <span className="text-[var(--color-muted)]">←</span>}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
