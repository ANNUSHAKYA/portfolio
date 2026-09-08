"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { technologies, Technology } from "@/data/technologies";

interface Node3D {
  tech: Technology;
  x: number;
  y: number;
  z: number;
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
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const hoveredIndexRef = useRef<number | null>(null);

  // Distribute nodes evenly on a sphere using Fibonacci sphere algorithm
  const nodes = useMemo<Node3D[]>(() => {
    const total = technologies.length;
    const radius = 220; // 3D sphere radius in pixels
    const phi = Math.PI * (Math.sqrt(5) - 1); // Golden angle ~ 2.39996323

    return technologies.map((tech, i) => {
      const y = 1 - (i / (total - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      return {
        tech,
        x: x * radius,
        y: y * radius,
        z: z * radius,
        baseRadius: tech.category === "ai" ? 6.5 : 5.5,
      };
    });
  }, []);

  // Handle pointer drag interaction
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    velocityRef.current = { x: 0, y: 0 };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
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

      rotationRef.current.y += deltaX * 0.007;
      rotationRef.current.x -= deltaY * 0.007;

      velocityRef.current = {
        x: -deltaY * 0.002,
        y: deltaX * 0.002,
      };
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if not captured
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
    const fov = 480;

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
        const steps = 64;
        let first = true;
        for (let a = 0; a <= steps; a++) {
          const angle = (a / steps) * Math.PI * 2;
          // Unrotated ring in XZ plane
          const rx = Math.cos(angle) * radius;
          const ry = 0;
          const rz = Math.sin(angle) * radius;

          // Apply static tilt then current camera rotation
          const tx = rx;
          const ty = ry * Math.cos(tiltX) - rz * Math.sin(tiltX);
          const tz = ry * Math.sin(tiltX) + rz * Math.cos(tiltX);

          // Rotate by global rotY & rotX
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

      // Draw 3 atmospheric orbital rings
      drawOrbitRing(160, 0.4, 0, "#4A7FA7", 0.18);
      drawOrbitRing(220, -0.6, 0.3, "#B3CFE5", 0.14);
      drawOrbitRing(270, 0.9, -0.4, "#1A3D63", 0.22);

      // Central glowing orb
      const coreZ = 0;
      const coreScale = fov / (fov + coreZ + 350);
      const coreGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, 38 * coreScale);
      coreGrad.addColorStop(0, "rgba(179, 207, 229, 0.8)");
      coreGrad.addColorStop(0.3, "rgba(74, 127, 167, 0.45)");
      coreGrad.addColorStop(0.7, "rgba(26, 61, 99, 0.2)");
      coreGrad.addColorStop(1, "rgba(10, 25, 49, 0)");
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 38 * coreScale, 0, Math.PI * 2);
      ctx.fill();

      // Project each node to 2D
      const projected = nodes.map((node, index) => {
        // Rotate around Y
        const x1 = node.x * cosY + node.z * sinY;
        const z1 = -node.x * sinY + node.z * cosY;

        // Rotate around X
        const y2 = node.y * cosX - z1 * sinX;
        const z2 = node.y * sinX + z1 * cosX;

        // Perspective scale (z2: -250 to +250)
        const scale = fov / (fov + z2 + 300);
        const px = cx + x1 * scale;
        const py = cy + y2 * scale;

        // Depth factor between 0.25 (far) and 1.0 (close)
        const depth = Math.max(0.2, Math.min(1.0, (z2 + 250) / 500));

        return {
          index,
          node,
          px,
          py,
          scale,
          depth,
          z2,
        };
      });

      // Find node closest to mouse
      let closestIdx: number | null = null;
      let minDistance = 28; // hit target radius in px

      const mx = lastMouseRef.current.x;
      const my = lastMouseRef.current.y;

      if (mx > 0 && my > 0) {
        projected.forEach((p) => {
          const dist = Math.hypot(p.px - mx, p.py - my);
          // Prefer nodes closer to camera
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
          const hovered = nodes[closestIdx].tech;
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
      // Draw lines between nodes in the same category or neighboring
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];

          const isSameCategory = p1.node.tech.category === p2.node.tech.category;
          const isHoveredCategory =
            hoveredIndexRef.current !== null &&
            nodes[hoveredIndexRef.current].tech.category === p1.node.tech.category &&
            isSameCategory;

          const isFilterActive =
            activeCategory &&
            (p1.node.tech.category === activeCategory || activeCategory === "all");

          // Calculate 3D distance between original nodes
          const dist3D = Math.hypot(
            p1.node.x - p2.node.x,
            p1.node.y - p2.node.y,
            p1.node.z - p2.node.z
          );

          if (dist3D < 190 && isSameCategory) {
            const avgDepth = (p1.depth + p2.depth) / 2;
            const categoryMeta = CATEGORY_COLORS[p1.node.tech.category];

            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);

            if (isHoveredCategory || isFilterActive) {
              ctx.strokeStyle = categoryMeta.hex;
              ctx.lineWidth = 1.8 * avgDepth;
              ctx.globalAlpha = Math.min(1, avgDepth * 0.9 + 0.2);
            } else {
              ctx.strokeStyle = "#4A7FA7";
              ctx.lineWidth = 0.8 * avgDepth;
              ctx.globalAlpha = avgDepth * 0.25;
            }
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      // 2. Sort projected nodes by depth (painter's algorithm)
      projected.sort((a, b) => a.z2 - b.z2);

      // 3. Render each node and its label
      projected.forEach((p) => {
        const isHovered = hoveredIndexRef.current === p.index;
        const categoryMeta = CATEGORY_COLORS[p.node.tech.category];
        const isMatchingCategory =
          hoveredIndexRef.current !== null &&
          nodes[hoveredIndexRef.current].tech.category === p.node.tech.category;

        const isFiltered =
          activeCategory &&
          activeCategory !== "all" &&
          p.node.tech.category !== activeCategory;

        const radius = (p.node.baseRadius * (isHovered ? 1.45 : 1)) * p.scale;
        const opacity = isFiltered
          ? 0.2
          : isHovered
          ? 1.0
          : isMatchingCategory
          ? Math.min(1.0, p.depth + 0.3)
          : Math.max(0.35, p.depth);

        // Glowing outer halo for highlighted nodes
        if (isHovered || isMatchingCategory) {
          ctx.beginPath();
          ctx.arc(p.px, p.py, radius * 3.2, 0, Math.PI * 2);
          ctx.fillStyle = categoryMeta.glow;
          ctx.globalAlpha = isHovered ? 0.9 : 0.4;
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        // Main node sphere
        ctx.beginPath();
        ctx.arc(p.px, p.py, radius, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? "#FFFFFF" : categoryMeta.hex;
        ctx.globalAlpha = opacity;
        ctx.fill();

        // Node border
        ctx.lineWidth = isHovered ? 2 : 1;
        ctx.strokeStyle = isHovered ? categoryMeta.hex : "#0A1931";
        ctx.stroke();

        // Node text label
        const fontSize = Math.max(10, Math.min(13, 11 * p.scale));
        ctx.font = `${isHovered ? "600" : "500"} ${fontSize}px Inter, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";

        const labelY = p.py + radius + 4;
        const text = p.node.tech.name;

        // Subtle text backdrop for readability when closer
        if (p.depth > 0.45 || isHovered) {
          const textMetrics = ctx.measureText(text);
          const bgWidth = textMetrics.width + 8;
          const bgHeight = fontSize + 4;

          ctx.fillStyle = "rgba(10, 25, 49, 0.75)";
          ctx.globalAlpha = opacity * 0.85;
          ctx.beginPath();
          ctx.roundRect(p.px - bgWidth / 2, labelY - 2, bgWidth, bgHeight, 3);
          ctx.fill();

          ctx.fillStyle = isHovered ? "#FFFFFF" : "#F6FAFD";
          ctx.globalAlpha = isHovered ? 1.0 : Math.max(0.4, p.depth * 0.95);
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
  }, [nodes, isDragging, activeCategory, onHoverTech]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[520px] md:h-[600px] flex items-center justify-center select-none"
    >
      {/* Interactive Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseLeave={handleMouseLeave}
      />

      {/* Floating Info Tooltip when hovering over a node */}
      {hoveredNode && tooltipPos && (
        <div
          className="absolute pointer-events-none z-30 transition-all duration-150 transform -translate-x-1/2 -translate-y-full mb-4"
          style={{
            left: Math.max(140, Math.min((canvasRef.current?.clientWidth || 500) - 140, tooltipPos.x)),
            top: Math.max(100, tooltipPos.y - 12),
          }}
        >
          <div className="bg-primary/95 backdrop-blur-md border border-accent/40 shadow-2xl p-4 rounded-xl w-64 text-left">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-sm font-bold text-offwhite tracking-wide">
                {hoveredNode.name}
              </span>
              <span
                className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full border"
                style={{
                  color: CATEGORY_COLORS[hoveredNode.category].hex,
                  borderColor: `${CATEGORY_COLORS[hoveredNode.category].hex}55`,
                  backgroundColor: `${CATEGORY_COLORS[hoveredNode.category].hex}15`,
                }}
              >
                {CATEGORY_COLORS[hoveredNode.category].label}
              </span>
            </div>
            <p className="text-xs text-offwhite/70 leading-relaxed font-sans">
              {hoveredNode.description}
            </p>
            <div className="mt-2.5 pt-2 border-t border-secondary/60 flex items-center gap-1.5 text-[10px] text-accent-light font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Connected in Architecture
            </div>
          </div>
        </div>
      )}

      {/* Hint Badge */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-secondary/40 backdrop-blur-sm border border-secondary/60 text-[11px] font-mono text-offwhite/50 pointer-events-none flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-accent-light" />
        Drag to rotate · Hover nodes to inspect
      </div>
    </div>
  );
}
