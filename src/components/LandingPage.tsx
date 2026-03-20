import { useState, useEffect, useRef } from 'react';
const COLORS = {
  primary: '#6366F1',
  primaryHover: '#4F46E5',
  accent: '#06B6D4',
  green: '#22C55E',
  bg: '#FAFAF9',
  text: '#1a1a19',
  textSecondary: '#57534E',
  textTertiary: '#A8A29E',
  border: 'rgba(0, 0, 0, 0.06)',
} as const;

function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      {/* Activity icon — main, shifted down */}
      <svg x="0" y="4" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={COLORS.primary} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
      </svg>
      {/* Workflow badge — top-right: two colored rectangles with L-shaped connector */}
      <rect x="15" y="0" width="17" height="16" rx="3" fill="white" />
      {/* Blue rectangle (top-left of badge) */}
      <rect x="17" y="1.5" width="5" height="5" rx="1.2" fill="none" stroke={COLORS.accent} strokeWidth="1.5" />
      {/* Green rectangle (bottom-right of badge) */}
      <rect x="25" y="8.5" width="5" height="5" rx="1.2" fill="none" stroke={COLORS.green} strokeWidth="1.5" />
      {/* L-shaped connector */}
      <path d="M19.5 6.5v2.5a1.5 1.5 0 0 0 1.5 1.5h4" fill="none" stroke="#A8A29E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const FONT = "'DM Sans', 'Helvetica Neue', Arial, sans-serif";

// ─── Animated background ─────────────────────────────────────────────────────

function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }

    const nodes: Node[] = [];
    const NODE_COUNT = 8;

    interface Connection {
      from: number;
      to: number;
      birth: number;
      duration: number;
    }

    let connections: Connection[] = [];
    let lastConnectionTime = 0;

    function resize() {
      const parent = canvas!.parentElement;
      width = parent?.offsetWidth || window.innerWidth;
      height = parent?.offsetHeight || window.innerHeight;
      // Fallback if parent hasn't laid out yet
      if (height < 100) height = window.innerHeight;
      canvas!.width = width * 2;
      canvas!.height = height * 2;
      ctx!.setTransform(2, 0, 0, 2, 0, 0);
    }

    function init() {
      resize();
      nodes.length = 0;
      connections = [];
      lastConnectionTime = performance.now();
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: 4 + Math.random() * 4,
          color: i % 2 === 0 ? COLORS.primary : COLORS.accent,
        });
      }
    }

    function pickRandomPair(): [number, number] {
      const a = Math.floor(Math.random() * NODE_COUNT);
      let b = Math.floor(Math.random() * (NODE_COUNT - 1));
      if (b >= a) b++;
      return [a, b];
    }

    function draw() {
      const now = performance.now();
      ctx!.clearRect(0, 0, width, height);

      // Spawn a new random connection every 1.5-3s
      if (now - lastConnectionTime > 1500 + Math.random() * 1500) {
        const [from, to] = pickRandomPair();
        // Avoid duplicate active connections
        const exists = connections.some(c => (c.from === from && c.to === to) || (c.from === to && c.to === from));
        if (!exists) {
          connections.push({ from, to, birth: now, duration: 2000 + Math.random() * 2000 });
        }
        lastConnectionTime = now;
      }

      // Remove expired connections
      connections = connections.filter(c => now - c.birth < c.duration);

      // Draw active connections with pulse rings
      for (const conn of connections) {
        const age = now - conn.birth;
        const fadeIn = Math.min(age / 400, 1);
        const fadeOut = Math.max(1 - (age - (conn.duration - 400)) / 400, 0);
        const opacity = Math.min(fadeIn, age > conn.duration - 400 ? fadeOut : 1) * 0.2;

        if (opacity > 0) {
          const a = nodes[conn.from];
          const b = nodes[conn.to];

          // Line
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
          ctx!.lineWidth = 1.5;
          ctx!.stroke();

          // Expanding rings from both nodes
          const ringProgress = Math.min(age / 1000, 1);
          const ringRadius = 6 + ringProgress * 30;
          const ringOpacity = (1 - ringProgress) * opacity * 2;

          for (const node of [a, b]) {
            ctx!.beginPath();
            ctx!.arc(node.x, node.y, ringRadius, 0, Math.PI * 2);
            ctx!.strokeStyle = `rgba(6, 182, 212, ${ringOpacity})`;
            ctx!.lineWidth = 1.5;
            ctx!.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        const gradient = ctx!.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 6
        );
        gradient.addColorStop(0, node.color + '18');
        gradient.addColorStop(1, node.color + '00');
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, node.radius * 6, 0, Math.PI * 2);
        ctx!.fillStyle = gradient;
        ctx!.fill();

        ctx!.beginPath();
        ctx!.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx!.fillStyle = node.color + '30';
        ctx!.fill();
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, node.radius * 0.5, 0, Math.PI * 2);
        ctx!.fillStyle = node.color + '60';
        ctx!.fill();

        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }

      animId = requestAnimationFrame(draw);
    }

    init();
    draw();

    const onResize = () => { init(); };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}

// ─── Main landing page ───────────────────────────────────────────────────────

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      const res = await fetch('https://formspree.io/f/xlgpvabq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      // fail silently
    }
  };

  return (
    <div style={{
      fontFamily: FONT,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* ── Nav ─────────────────────────────────────────────────── */}
      <nav style={{
        padding: '0 32px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 10,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}>
          <Logo size={32} />
          <span style={{
            fontSize: 18,
            fontWeight: 700,
            color: COLORS.text,
            letterSpacing: '-0.02em',
          }}>
            agent-socket
          </span>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 32px',
        position: 'relative',
        textAlign: 'center',
      }}>
        <HeroBackground />

        <div style={{
          position: 'absolute',
          top: -200,
          right: -200,
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.primary}08 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: -100,
          left: -100,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${COLORS.accent}06 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 720 }}>
          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 64px)',
            fontWeight: 700,
            color: COLORS.text,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: 20,
          }}>
            agent-socket
          </h1>

          <p style={{
            fontSize: 'clamp(18px, 2.5vw, 24px)',
            fontWeight: 500,
            color: COLORS.textSecondary,
            lineHeight: 1.5,
            marginBottom: 48,
          }}>
            Realtime Communication & Heartbeats for AI Agents
          </p>

          {/* ── Waitlist form ─────────────────────────────────── */}
          {!submitted ? (
            <div>
              <p style={{
                fontSize: 15,
                fontWeight: 600,
                color: COLORS.text,
                marginBottom: 16,
              }}>
                Join the Waitlist
              </p>
              <form
                onSubmit={handleSubmit}
                style={{
                  display: 'flex',
                  gap: 12,
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  required
                  style={{
                    width: 320,
                    maxWidth: '100%',
                    height: 48,
                    padding: '0 16px',
                    borderRadius: 8,
                    border: focused
                      ? `1px solid ${COLORS.primary}`
                      : `1px solid ${COLORS.border}`,
                    boxShadow: focused
                      ? `0 0 0 2px rgba(99, 102, 241, 0.15)`
                      : 'none',
                    background: '#fff',
                    fontSize: 15,
                    fontFamily: FONT,
                    color: COLORS.text,
                    outline: 'none',
                    transition: 'all 180ms ease',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    height: 48,
                    padding: '0 28px',
                    borderRadius: 8,
                    background: COLORS.primary,
                    color: '#fff',
                    border: 'none',
                    fontSize: 15,
                    fontWeight: 600,
                    fontFamily: FONT,
                    cursor: 'pointer',
                    transition: 'all 180ms ease',
                  }}
                >
                  Sign up
                </button>
              </form>
            </div>
          ) : (
            <p style={{
              fontSize: 16,
              fontWeight: 500,
              color: COLORS.primary,
            }}>
              Thanks! We'll be in touch.
            </p>
          )}
        </div>
      </main>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer style={{
        padding: '24px 32px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 10,
      }}>
        <span style={{
          fontSize: 13,
          color: COLORS.textTertiary,
        }}>
          Builder Magic Inc.
        </span>
      </footer>
    </div>
  );
}
