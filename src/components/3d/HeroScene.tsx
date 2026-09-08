"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, Sphere, Box, Torus } from "@react-three/drei";
import * as THREE from "three";

function FloatingObjects() {
  const groupRef = useRef<THREE.Group>(null);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    elapsed.current += delta;
    if (groupRef.current) {
      groupRef.current.rotation.y = elapsed.current * 0.05;
      groupRef.current.rotation.z = elapsed.current * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central glowing core */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[1, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#4A7FA7"
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.8}
            roughness={0.2}
            distort={0.4}
            speed={2}
          />
        </Sphere>
      </Float>

      {/* Orbiting technical nodes */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Box args={[0.4, 0.4, 0.4]} position={[2.5, 1.5, -1]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <meshStandardMaterial color="#B3CFE5" wireframe transparent opacity={0.6} />
        </Box>
      </Float>

      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.5}>
        <Torus args={[0.3, 0.05, 16, 32]} position={[-2, -1, 1]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#F6FAFD" emissive="#1A3D63" emissiveIntensity={0.5} />
        </Torus>
      </Float>
      
      <Float speed={1} rotationIntensity={0.2} floatIntensity={1}>
        <Sphere args={[0.2, 16, 16]} position={[1.5, -2, 2]}>
          <meshStandardMaterial color="#4A7FA7" metalness={0.9} roughness={0.1} />
        </Sphere>
      </Float>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="w-full h-full absolute inset-0 z-0 pointer-events-none opacity-60">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        onCreated={({ gl }) => {
          const canvas = gl.domElement;
          canvas.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
          });
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#B3CFE5" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4A7FA7" />
        
        <FloatingObjects />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
