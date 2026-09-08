"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { technologies, Technology } from "@/data/technologies";

interface Node3D {
  tech: Technology;
  nx: number;
  ny: number;
  nz: number;
  baseRadius: number;
}

const CATEGORY_COLORS: Record<Technology["category"], { hex: string; glow: string; label: string }> = {
  frontend: { hex: "#B3CFE5", glow: "rgba(179, 207, 229, 0.4)", label: "Frontend" },
  backend: { hex: "#4A7FA7", glow: "rgba(74, 127, 167, 0.4)", label: "Backend" },
  database: { hex: "#6BA4CD", glow: "rgba(107, 164, 205, 0.4)", label: "Database" },
  tools: { hex: "#1A3D63", glow: "rgba(26, 61, 99, 0.5)", label: "Tooling / DevOps" },
  ai: { hex: "#F6FAFD", glow: "rgba(246, 250, 253, 0.6)", label: "Artificial Intelligence" },
};

export default function TechOrbit({
  activeCategory,
  onHoverTech,
}: {
  activeCategory?: string | null;
  onHoverTech?: (tech: Technology | null) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<Technology | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  // Rotation angles (Euler angles in radians)
  const rotationRef = useRef({ x: 0.2, y: 0.4 });
  const velocityRef = useRef({ x: 0.002, y: 0.004 });
  const dragStartRef = useRef({ x: 0, y: 0 });
  const lastMouseRef = useRef({ x: -1000, y: -1000 });
  const hoveredIndexRef = useRef<number | null>(null);

  // Distribute normalized unit points evenly on a sphere using Fibonacci sphere algorithm
  const unitNodes = useMemo<Node3D[]>(() => {
    const total = technologies.length;
    const phi = Math.PI * (Math.sqrt(5) - 1); // Golden angle

    return technologies.map((tech, i) => {
      const y = 1 - (i / (total - 1)) * 2; // y: 1 to -1
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      return {
        tech,
        nx: x,
        ny: y,
        nz: z,
        baseRadius: tech.category === "ai" ? 6 : 5,
      };
    });
  }, []);

  // Handle pointer drag interaction
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    velocityRef.current = { x: 0, y: 0 };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      lastMouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      lastMouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }

    if (isDragging) {
      const deltaX = e.clientX - dragStartRef.current.x;
      const deltaY = e.clientY - dragStartRef.current.y;
      dragStartRef.current = { x: e.clientX, y: e.clientY };

      rotationRef.current.y += deltaX * 0.006;
      rotationRef.current.x -= deltaY * 0.006;

      velocityRef.current = {
        x: -deltaY * 0.0015,
        y: deltaX * 0.0015,
      };
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer was not captured
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    lastMouseRef.current = { x: -1000, y: -1000 };
    hoveredIndexRef.current = null;
    setHoveredNode(null);
    setTooltipPos(null);
    onHoverTech?.(null);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    const fov = 440;

    const render = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Dynamically scale sphere radius to fit mobile vs desktop
      const sphereRadius = Math.min(210, Math.max(120, Math.min(width, height) * 0.38));

      // Apply inert velocity
      if (!isDragging) {
        rotationRef.current.y += velocityRef.current.y;
        rotationRef.current.x += velocityRef.current.x;

        // Dampen velocity back to subtle idle rotation
        velocityRef.current.y = velocityRef.current.y * 0.96 + 0.003 * 0.04;
        velocityRef.current.x = velocityRef.current.x * 0.96 + 0.001 * 0.04;
      }

      const rotX = rotationRef.current.x;
      const rotY = rotationRef.current.y;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // Render 3D Gimbal / Orbital Rings behind
      ctx.lineWidth = 1;
      const drawOrbitRing = (radius: number, tiltX: number, tiltY: number, color: string, alpha: number) => {
        ctx.beginPath();
        const steps = 48;
        let first = true;
        for (let a = 0; a <= steps; a++) {
          const angle = (a / steps) * Math.PI * 2;
          const rx = Math.cos(angle) * radius;
          const ry = 0;
          const rz = Math.sin(angle) * radius;

          const tx = rx;
          const ty = ry * Math.cos(tiltX) - rz * Math.sin(tiltX);
          const tz = ry * Math.sin(tiltX) + rz * Math.cos(tiltX);

          const x1 = tx * cosY + tz * sinY;
          const z1 = -tx * sinY + tz * cosY;
          const y2 = ty * cosX - z1 * sinX;
          const z2 = ty * sinX + z1 * cosX;

          const scale = fov / (fov + z2 + 350);
          const px = cx + x1 * scale;
          const py = cy + y2 * scale;

          if (first) {
            ctx.moveTo(px, py);
            first = false;
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.strokeStyle = color;
        ctx.globalAlpha = alpha;
        ctx.stroke();
        ctx.globalAlpha = 1;
      };

      // Draw 3 atmospheric orbital rings dynamically sized
      drawOrbitRing(sphereRadius * 0.75, 0.4, 0, "#4A7FA7", 0.18);
      drawOrbitRing(sphereRadius * 1.0, -0.6, 0.3, "#B3CFE5", 0.14);
      drawOrbitRing(sphereRadius * 1.25, 0.9, -0.4, "#1A3D63", 0.2);

      // Central glowing orb
      const coreScale = fov / (fov + 350);
      const coreGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, 32 * coreScale);
      coreGrad.addColorStop(0, "rgba(179, 207, 229, 0.85)");
      coreGrad.addColorStop(0.35, "rgba(74, 127, 167, 0.4)");
      coreGrad.addColorStop(0.7, "rgba(26, 61, 99, 0.15)");
      coreGrad.addColorStop(1, "rgba(10, 25, 49, 0)");
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 32 * coreScale, 0, Math.PI * 2);
      ctx.fill();

      // Project each node to 2D
      const projected = unitNodes.map((node, index) => {
        const x0 = node.nx * sphereRadius;
        const y0 = node.ny * sphereRadius;
        const z0 = node.nz * sphereRadius;

        // Rotate around Y
        const x1 = x0 * cosY + z0 * sinY;
        const z1 = -x0 * sinY + z0 * cosY;

        // Rotate around X
        const y2 = y0 * cosX - z1 * sinX;
        const z2 = y0 * sinX + z1 * cosX;

        // Perspective scale
        const scale = fov / (fov + z2 + 300);
        const px = cx + x1 * scale;
        const py = cy + y2 * scale;

        // Depth factor between 0.25 (far) and 1.0 (close)
        const depth = Math.max(0.2, Math.min(1.0, (z2 + sphereRadius) / (sphereRadius * 2)));

        return {
          index,
          node,
          x0,
          y0,
          z0,
          px,
          py,
          scale,
          depth,
          z2,
        };
      });

      // Find node closest to pointer
      let closestIdx: number | null = null;
      let minDistance = width < 480 ? 32 : 28;

      const mx = lastMouseRef.current.x;
      const my = lastMouseRef.current.y;

      if (mx > 0 && my > 0) {
        projected.forEach((p) => {
          const dist = Math.hypot(p.px - mx, p.py - my);
          const adjustedDist = dist - p.depth * 8;
          if (adjustedDist < minDistance) {
            minDistance = adjustedDist;
            closestIdx = p.index;
          }
        });
      }

      if (closestIdx !== hoveredIndexRef.current) {
        hoveredIndexRef.current = closestIdx;
        if (closestIdx !== null) {
          const hovered = unitNodes[closestIdx].tech;
          setHoveredNode(hovered);
          onHoverTech?.(hovered);
          const p = projected[closestIdx];
          setTooltipPos({ x: p.px, y: p.py });
        } else {
          setHoveredNode(null);
          onHoverTech?.(null);
          setTooltipPos(null);
        }
      }

      // 1. Draw Constellation connecting lines
      const maxConnectDist = sphereRadius * 0.9;
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];

          const isSameCategory = p1.node.tech.category === p2.node.tech.category;
          const isHoveredCategory =
            hoveredIndexRef.current !== null &&
            unitNodes[hoveredIndexRef.current].tech.category === p1.node.tech.category &&
            isSameCategory;

          const isFilterActive =
            activeCategory &&
            (p1.node.tech.category === activeCategory || activeCategory === "all");

          const dist3D = Math.hypot(
            p1.x0 - p2.x0,
            p1.y0 - p2.y0,
            p1.z0 - p2.z0
          );

          if (dist3D < maxConnectDist && isSameCategory) {
            const avgDepth = (p1.depth + p2.depth) / 2;
            const categoryMeta = CATEGORY_COLORS[p1.node.tech.category];

            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);

            if (isHoveredCategory || isFilterActive) {
              ctx.strokeStyle = categoryMeta.hex;
              ctx.lineWidth = 1.6 * avgDepth;
              ctx.globalAlpha = Math.min(1, avgDepth * 0.85 + 0.2);
            } else {
              ctx.strokeStyle = "#4A7FA7";
              ctx.lineWidth = 0.75 * avgDepth;
              ctx.globalAlpha = avgDepth * 0.22;
            }
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      // 2. Sort projected nodes by depth
      projected.sort((a, b) => a.z2 - b.z2);

      // 3. Render each node and its label
      projected.forEach((p) => {
        const isHovered = hoveredIndexRef.current === p.index;
        const categoryMeta = CATEGORY_COLORS[p.node.tech.category];
        const isMatchingCategory =
          hoveredIndexRef.current !== null &&
          unitNodes[hoveredIndexRef.current].tech.category === p.node.tech.category;

        const isFiltered =
          activeCategory &&
          activeCategory !== "all" &&
          p.node.tech.category !== activeCategory;

        const radius = (p.node.baseRadius * (isHovered ? 1.4 : 1)) * p.scale;
        const opacity = isFiltered
          ? 0.2
          : isHovered
          ? 1.0
          : isMatchingCategory
          ? Math.min(1.0, p.depth + 0.3)
          : Math.max(0.3, p.depth);

        // Halo for highlighted nodes
        if (isHovered || isMatchingCategory) {
          ctx.beginPath();
          ctx.arc(p.px, p.py, radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = categoryMeta.glow;
          ctx.globalAlpha = isHovered ? 0.9 : 0.4;
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        // Main node circle
        ctx.beginPath();
        ctx.arc(p.px, p.py, radius, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? "#FFFFFF" : categoryMeta.hex;
        ctx.globalAlpha = opacity;
        ctx.fill();

        ctx.lineWidth = isHovered ? 2 : 1;
        ctx.strokeStyle = isHovered ? categoryMeta.hex : "#0A1931";
        ctx.stroke();

        // Node text label
        const fontSize = Math.max(9, Math.min(12, 10.5 * p.scale));
        ctx.font = `${isHovered ? "600" : "500"} ${fontSize}px Inter, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";

        const labelY = p.py + radius + 3;
        const text = p.node.tech.name;

        if (p.depth > 0.45 || isHovered) {
          const textMetrics = ctx.measureText(text);
          const bgWidth = textMetrics.width + 6;
          const bgHeight = fontSize + 3;

          ctx.fillStyle = "rgba(10, 25, 49, 0.75)";
          ctx.globalAlpha = opacity * 0.85;
          ctx.beginPath();
          ctx.roundRect(p.px - bgWidth / 2, labelY - 1, bgWidth, bgHeight, 3);
          ctx.fill();

          ctx.fillStyle = isHovered ? "#FFFFFF" : "#F6FAFD";
          ctx.globalAlpha = isHovered ? 1.0 : Math.max(0.4, p.depth * 0.9);
          ctx.fillText(text, p.px, labelY);
        }

        ctx.globalAlpha = 1;
      });

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [unitNodes, isDragging, activeCategory, onHoverTech]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360px] sm:h-[460px] md:h-[540px] lg:h-[600px] flex items-center justify-center select-none"
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseLeave={handleMouseLeave}
      />

      {/* Responsive Info Tooltip when hovering over a node */}
      {hoveredNode && tooltipPos && (
        <div
          className="absolute pointer-events-none z-30 transition-all duration-150 transform -translate-x-1/2 -translate-y-full mb-3"
          style={{
            left: Math.max(120, Math.min((canvasRef.current?.clientWidth || 360) - 120, tooltipPos.x)),
            top: Math.max(70, tooltipPos.y - 10),
          }}
        >
          <div className="bg-primary/95 backdrop-blur-md border border-accent/40 shadow-2xl p-3 sm:p-4 rounded-xl w-56 sm:w-64 text-left">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs sm:text-sm font-bold text-offwhite tracking-wide">
                {hoveredNode.name}
              </span>
              <span
                className="text-[9px] sm:text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full border"
                style={{
                  color: CATEGORY_COLORS[hoveredNode.category].hex,
                  borderColor: `${CATEGORY_COLORS[hoveredNode.category].hex}55`,
                  backgroundColor: `${CATEGORY_COLORS[hoveredNode.category].hex}15`,
                }}
              >
                {CATEGORY_COLORS[hoveredNode.category].label}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-offwhite/70 leading-relaxed font-sans">
              {hoveredNode.description}
            </p>
          </div>
        </div>
      )}

      {/* Hint Badge */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 sm:py-1.5 rounded-full bg-secondary/40 backdrop-blur-sm border border-secondary/60 text-[10px] sm:text-[11px] font-mono text-offwhite/60 pointer-events-none flex items-center gap-1.5 sm:gap-2 whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-accent-light" />
        <span>Drag to rotate · Tap or hover nodes</span>
      </div>
    </div>
  );
}
