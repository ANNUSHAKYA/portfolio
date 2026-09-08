"use client";

import { useEffect, useRef } from "react";

interface FloatingNode {
  x: number;
  y: number;
  z: number;
  size: number;
  speed: number;
  phase: number;
  color: string;
  type: "sphere" | "cube" | "ring";
}

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.clientWidth);
    let height = (canvas.height = canvas.clientHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.clientWidth;
      height = canvas.height = canvas.clientHeight;
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Initialize 3D floating technical objects
    const nodes: FloatingNode[] = [
      { x: 0.15, y: -0.1, z: 1.2, size: 55, speed: 0.0008, phase: 0, color: "#4A7FA7", type: "sphere" },
      { x: 0.65, y: -0.2, z: 0.8, size: 28, speed: 0.0012, phase: 1.5, color: "#B3CFE5", type: "cube" },
      { x: 0.75, y: 0.25, z: 0.9, size: 36, speed: 0.0009, phase: 3.2, color: "#1A3D63", type: "ring" },
      { x: -0.25, y: 0.35, z: 0.6, size: 42, speed: 0.0007, phase: 4.8, color: "#4A7FA7", type: "ring" },
      { x: 0.35, y: 0.45, z: 0.5, size: 20, speed: 0.0015, phase: 2.1, color: "#F6FAFD", type: "sphere" },
      { x: -0.65, y: -0.25, z: 0.7, size: 32, speed: 0.001, phase: 5.4, color: "#B3CFE5", type: "cube" },
    ];

    // Ambient floating particles
    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.0003,
      vy: -Math.random() * 0.0004 - 0.0001,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      const isMobile = width < 768;
      const cx = isMobile ? width * 0.5 : width * 0.65;
      const cy = height * 0.5;

      // 1. Soft Volumetric Light Gradients
      const glowGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, Math.max(width, height) * 0.55);
      glowGrad.addColorStop(0, "rgba(74, 127, 167, 0.18)");
      glowGrad.addColorStop(0.35, "rgba(26, 61, 99, 0.14)");
      glowGrad.addColorStop(0.7, "rgba(10, 25, 49, 0.06)");
      glowGrad.addColorStop(1, "rgba(10, 25, 49, 0)");
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Ambient Drift Particles
      ctx.fillStyle = "#B3CFE5";
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 0) p.y = 1;
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;

        ctx.globalAlpha = p.opacity * (0.6 + 0.4 * Math.sin(time + i));
        ctx.beginPath();
        ctx.arc(p.x * width, p.y * height, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // 3. 3D Geometric Floating Objects
      const scaleMultiplier = isMobile ? 0.65 : 1.0;

      nodes.forEach((node) => {
        const floatY = Math.sin(time * 0.8 + node.phase) * (isMobile ? 12 : 22);
        const floatX = Math.cos(time * 0.6 + node.phase) * (isMobile ? 8 : 16);

        const px = cx + node.x * (width * 0.35) + floatX;
        const py = cy + node.y * (height * 0.35) + floatY;
        const size = node.size * scaleMultiplier;

        if (node.type === "sphere") {
          // Glass Sphere with volumetric specular highlight
          const sphereGrad = ctx.createRadialGradient(
            px - size * 0.3,
            py - size * 0.3,
            size * 0.1,
            px,
            py,
            size
          );
          sphereGrad.addColorStop(0, "rgba(246, 250, 253, 0.85)");
          sphereGrad.addColorStop(0.3, `${node.color}cc`);
          sphereGrad.addColorStop(0.7, "rgba(26, 61, 99, 0.5)");
          sphereGrad.addColorStop(1, "rgba(10, 25, 49, 0.15)");

          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = sphereGrad;
          ctx.fill();

          ctx.strokeStyle = "rgba(179, 207, 229, 0.4)";
          ctx.lineWidth = 1;
          ctx.stroke();
        } else if (node.type === "cube") {
          // Wireframe Isometric Cube
          const angle = time * 0.5 + node.phase;
          const cosA = Math.cos(angle);
          const sinA = Math.sin(angle);

          const s = size * 0.7;
          ctx.save();
          ctx.translate(px, py);

          // Draw 3D wireframe box
          ctx.strokeStyle = node.color;
          ctx.lineWidth = 1.2;
          ctx.globalAlpha = 0.55;

          ctx.beginPath();
          ctx.moveTo(-s * cosA, -s * 0.5);
          ctx.lineTo(s * cosA, -s * 0.5);
          ctx.lineTo(s * cosA + sinA * 8, s * 0.5);
          ctx.lineTo(-s * cosA + sinA * 8, s * 0.5);
          ctx.closePath();
          ctx.stroke();

          // Internal cross connection
          ctx.beginPath();
          ctx.moveTo(0, -s * 0.5);
          ctx.lineTo(sinA * 8, s * 0.5);
          ctx.strokeStyle = "rgba(179, 207, 229, 0.3)";
          ctx.stroke();

          ctx.restore();
          ctx.globalAlpha = 1;
        } else if (node.type === "ring") {
          // Orbital Technical Ring
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(time * 0.3 + node.phase);

          ctx.beginPath();
          ctx.ellipse(0, 0, size * 1.3, size * 0.5, Math.PI / 4, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(179, 207, 229, 0.35)";
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Small orbiting bead on ring
          const beadAngle = time * 1.5 + node.phase;
          const bx = Math.cos(beadAngle) * (size * 1.3);
          const by = Math.sin(beadAngle) * (size * 0.5);
          ctx.beginPath();
          ctx.arc(bx, by, 3 * scaleMultiplier, 0, Math.PI * 2);
          ctx.fillStyle = "#F6FAFD";
          ctx.fill();

          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full h-full absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
