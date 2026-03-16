import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export interface GooeyNavItem {
  label: string;
  to: string;
  matchStartsWith?: boolean;
}

interface GooeyNavProps {
  items: GooeyNavItem[];
}

const particlePalette = ['#ffd7b6', '#ffbf89', '#ff9f57', '#fff1e6'];

const matchesPath = (pathname: string, item: GooeyNavItem) =>
  pathname === item.to || (item.matchStartsWith ? pathname.startsWith(item.to) : false);

export default function GooeyNav({ items }: GooeyNavProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const moveEffectTo = (element: HTMLElement | null) => {
    if (!containerRef.current || !glowRef.current || !pillRef.current || !element) {
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const targetRect = element.getBoundingClientRect();
    const nextStyles = {
      left: `${targetRect.left - containerRect.left}px`,
      top: `${targetRect.top - containerRect.top}px`,
      width: `${targetRect.width}px`,
      height: `${targetRect.height}px`,
      opacity: '1',
    };

    Object.assign(glowRef.current.style, nextStyles);
    Object.assign(pillRef.current.style, nextStyles);
  };

  const hideEffect = () => {
    if (glowRef.current) {
      glowRef.current.style.opacity = '0';
    }

    if (pillRef.current) {
      pillRef.current.style.opacity = '0';
    }
  };

  const clearParticles = () => {
    if (!glowRef.current) {
      return;
    }

    const particles = glowRef.current.querySelectorAll('.gooey-nav__particle');
    particles.forEach((particle) => particle.remove());
  };

  const createParticles = () => {
    if (!glowRef.current) {
      return;
    }

    clearParticles();

    const particleCount = 9;
    const radius = 34;

    for (let index = 0; index < particleCount; index += 1) {
      const particle = document.createElement('span');
      const point = document.createElement('span');
      const angle = (Math.PI * 2 * index) / particleCount + Math.random() * 0.35;
      const startDistance = 18 + Math.random() * 14;
      const endDistance = 40 + Math.random() * radius;
      const x1 = Math.cos(angle) * startDistance;
      const y1 = Math.sin(angle) * startDistance;
      const x2 = Math.cos(angle) * endDistance;
      const y2 = Math.sin(angle) * endDistance;
      const duration = 420 + Math.random() * 240;
      const scale = 0.7 + Math.random() * 0.7;
      const color = particlePalette[index % particlePalette.length];

      particle.className = 'gooey-nav__particle';
      particle.style.setProperty('--x1', `${x1}px`);
      particle.style.setProperty('--y1', `${y1}px`);
      particle.style.setProperty('--x2', `${x2}px`);
      particle.style.setProperty('--y2', `${y2}px`);
      particle.style.setProperty('--duration', `${duration}ms`);
      particle.style.setProperty('--scale', `${scale}`);
      point.className = 'gooey-nav__point';
      point.style.background = color;

      particle.appendChild(point);
      glowRef.current.appendChild(particle);

      window.setTimeout(() => particle.remove(), duration + 80);
    }
  };

  useEffect(() => {
    const nextIndex = items.findIndex((item) => matchesPath(location.pathname, item));
    setActiveIndex(nextIndex >= 0 ? nextIndex : null);
  }, [items, location.pathname]);

  useEffect(() => {
    if (activeIndex === null) {
      hideEffect();
      return;
    }

    const activeElement = itemRefs.current[activeIndex];
    const animationFrame = window.requestAnimationFrame(() => moveEffectTo(activeElement));

    if (!containerRef.current || !activeElement) {
      return () => window.cancelAnimationFrame(animationFrame);
    }

    const resizeObserver = new ResizeObserver(() => moveEffectTo(activeElement));
    resizeObserver.observe(containerRef.current);
    resizeObserver.observe(activeElement);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
    };
  }, [activeIndex]);

  const handleNavigate = (index: number) => {
    const target = itemRefs.current[index];
    setActiveIndex(index);
    moveEffectTo(target);
    createParticles();
    navigate(items[index].to);
  };

  return (
    <>
      <style>
        {`
          :root {
            --gooey-ease: linear(0, 0.234 7.4%, 0.55 17.6%, 0.875 31.3%, 1.008 41.2%, 1.058 48.4%, 1.033 57.6%, 0.996 68.2%, 0.99 80.8%, 1);
          }

          .gooey-nav__pill,
          .gooey-nav__glow {
            position: absolute;
            pointer-events: none;
            border-radius: 999px;
            opacity: 0;
            transition:
              left 520ms var(--gooey-ease),
              top 520ms var(--gooey-ease),
              width 520ms var(--gooey-ease),
              height 520ms var(--gooey-ease),
              opacity 180ms ease;
          }

          .gooey-nav__pill {
            z-index: 1;
            background: linear-gradient(135deg, #ec5b13 0%, #ff8f3d 100%);
            box-shadow:
              0 16px 30px -18px rgba(236, 91, 19, 0.85),
              inset 0 1px 0 rgba(255, 255, 255, 0.28);
          }

          .gooey-nav__glow {
            z-index: 0;
            filter: blur(16px);
            background: radial-gradient(circle, rgba(255, 159, 87, 0.9) 0%, rgba(236, 91, 19, 0.42) 56%, rgba(236, 91, 19, 0) 100%);
          }

          .gooey-nav__particle {
            position: absolute;
            left: calc(50% - 8px);
            top: calc(50% - 8px);
            width: 16px;
            height: 16px;
            animation: gooey-nav-float var(--duration) ease-out forwards;
          }

          .gooey-nav__point {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 999px;
            animation: gooey-nav-pop var(--duration) ease-out forwards;
          }

          @keyframes gooey-nav-float {
            0% {
              opacity: 0;
              transform: translate(var(--x1), var(--y1)) scale(0.25);
            }

            20% {
              opacity: 1;
            }

            100% {
              opacity: 0;
              transform: translate(var(--x2), var(--y2)) scale(0.1);
            }
          }

          @keyframes gooey-nav-pop {
            0% {
              transform: scale(0.25);
            }

            30% {
              transform: scale(var(--scale));
            }

            100% {
              transform: scale(0.12);
            }
          }
        `}
      </style>

      <div
        ref={containerRef}
        className="relative isolate rounded-full border border-[#ec5b13]/15 bg-white/85 p-1.5 shadow-[0_18px_50px_-28px_rgba(236,91,19,0.5)] backdrop-blur-xl"
      >
        <span ref={glowRef} className="gooey-nav__glow" />
        <span ref={pillRef} className="gooey-nav__pill" />

        <ul className="relative z-[2] flex items-center gap-1">
          {items.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <li key={item.to}>
                <button
                  ref={(element) => {
                    itemRefs.current[index] = element;
                  }}
                  type="button"
                  onClick={() => handleNavigate(index)}
                  className={`relative rounded-full px-5 py-2.5 text-sm font-semibold tracking-[0.01em] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ec5b13]/30 ${
                    isActive ? 'text-white' : 'text-slate-600 hover:text-[#ec5b13]'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
