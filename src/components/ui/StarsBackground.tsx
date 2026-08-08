"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface StarsBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  factor?: number;
  speed?: number;
  starColor?: string;
  pointerEvents?: boolean;
  mouseRadius?: number;
  repulsionForce?: number;
  isFixed?: boolean;
}

interface Star {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  speed: number;
  twinkleSpeed: number;
}

export function StarsBackground({
  factor = 0.12,
  speed = 45,
  starColor = "#ffffff",
  pointerEvents = true,
  mouseRadius = 200,
  repulsionForce = 3.0,
  isFixed = false,
  className,
  children,
  ...props
}: StarsBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];

    let mouse = {
      x: -1000,
      y: -1000,
      active: false,
    };

    const handleResize = () => {
      if (!canvas) return;
      if (isFixed) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      } else {
        const parent = container || canvas.parentElement;
        canvas.width = parent?.clientWidth || window.innerWidth;
        canvas.height = parent?.clientHeight || window.innerHeight;
      }
      initStars();
    };

    const initStars = () => {
      if (!canvas) return;
      const count = Math.floor((canvas.width * canvas.height * factor) / 700);
      stars = Array.from({ length: count }, () => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        return {
          x,
          y,
          baseX: x,
          baseY: y,
          vx: 0,
          vy: 0,
          size: Math.random() * 2.4 + 0.6,
          alpha: Math.random() * 0.7 + 0.3,
          speed: (Math.random() * 0.4 + 0.15) * (speed / 50),
          twinkleSpeed: Math.random() * 0.025 + 0.008,
        };
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isFixed) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.active = true;
      } else if (container) {
        const rect = container.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.active = true;
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);

    if (isFixed) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseleave", handleMouseLeave);
    } else if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    handleResize();

    const render = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render glowing cursor aura
      if (mouse.active) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouseRadius * 0.85
        );
        gradient.addColorStop(0, "rgba(168, 85, 247, 0.15)");
        gradient.addColorStop(0.5, "rgba(59, 130, 246, 0.06)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.save();
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouseRadius * 0.85, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      stars.forEach((star) => {
        // Base vertical movement
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }

        // Mouse interaction & Repulsion
        if (mouse.active) {
          const dx = star.x - mouse.x;
          const dy = star.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseRadius && distance > 0) {
            const force = (1 - distance / mouseRadius) * repulsionForce;
            const angle = Math.atan2(dy, dx);
            star.vx += Math.cos(angle) * force * 0.8;
            star.vy += Math.sin(angle) * force * 0.8;
          }
        }

        // Apply velocities with damping
        star.x += star.vx;
        star.y += star.vy;
        star.vx *= 0.92;
        star.vy *= 0.92;

        // Twinkle effect
        star.alpha += Math.sin(Date.now() * star.twinkleSpeed) * 0.01;
        star.alpha = Math.max(0.15, Math.min(0.95, star.alpha));

        ctx.save();
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = starColor;
        ctx.globalAlpha = star.alpha;

        // Glow effect for larger stars
        if (star.size > 1.2) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = starColor;
        }

        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (isFixed) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseleave", handleMouseLeave);
      } else if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [factor, speed, starColor, mouseRadius, repulsionForce, isFixed]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full bg-[#09090b]", className)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className={cn(
          "pointer-events-none z-0",
          isFixed ? "fixed inset-0 w-screen h-screen" : "absolute inset-0 w-full h-full"
        )}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
