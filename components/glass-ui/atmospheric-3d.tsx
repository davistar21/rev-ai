"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

function RevenueParticles() {
  const ref = useRef<THREE.Points>(null!);
  
  // Generate particles based on "Revenue Velocity"
  const points = useMemo(() => {
    const p = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#06b6d4"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function FloatingRevenueBlock({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.2;
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.z = time * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <MeshDistortMaterial
          color="#06b6d4"
          speed={2}
          distort={0.3}
          radius={1}
          transparent
          opacity={0.2}
          roughness={0}
        />
      </mesh>
    </Float>
  );
}

function MouseTracker() {
  const { camera, viewport } = useThree();
  
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      gsap.to(camera.position, {
        x: x * 0.5,
        y: y * 0.5,
        duration: 1.5,
        ease: "power2.out"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [camera]);

  return null;
}

export function Atmospheric3D() {
  return (
    <div className="fixed inset-0 -z-50 pointer-events-none bg-black">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#06b6d4" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />
        
        <RevenueParticles />
        
        <FloatingRevenueBlock position={[-2, 1, 0]} />
        <FloatingRevenueBlock position={[2, -1.5, -1]} />
        <FloatingRevenueBlock position={[0.5, 2, -2]} />
        
        <MouseTracker />
        
        {/* Subtle background sphere for depth */}
        <Sphere args={[15, 32, 32]}>
          <meshBasicMaterial color="#000" side={THREE.BackSide} />
        </Sphere>
      </Canvas>
    </div>
  );
}
