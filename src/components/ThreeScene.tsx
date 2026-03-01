"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';

import { Mesh } from 'three';

function RotatingShape() {
  const meshRef = useRef<Mesh>(null!);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotation
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;

      // Subtly follow mouse
      const targetX = state.pointer.x * 2;
      const targetY = state.pointer.y * 2;
      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 0]} />
        <meshStandardMaterial 
             color="#22d3ee" 
             wireframe 
             emissive="#22d3ee"
             emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
}

export default function ThreeScene() {
  return (
    <div className="w-full h-full absolute inset-0 -z-10 opacity-30">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <RotatingShape />
        <Stars radius={100} depth={50} count={5000} factor={6} saturation={0.5} fade speed={1.5} />
      </Canvas>
    </div>
  );
}
