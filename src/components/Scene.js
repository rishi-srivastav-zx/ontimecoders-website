'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment, useScroll, Stars } from '@react-three/drei';
import * as THREE from 'three';

function TrackObject({ position, color, speed = 1, scale = 1 }) {
  const meshRef = useRef(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime() * speed;
    meshRef.current.rotation.x = Math.cos(t / 4) / 2;
    meshRef.current.rotation.y = Math.sin(t / 4) / 2;
    meshRef.current.rotation.z = Math.sin(t / 4) / 2;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <octahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial color={color} wireframe emissive={color} emissiveIntensity={2} />
    </mesh>
  );
}

function Track() {
  const scroll = useScroll();
  const groupRef = useRef(null);

  const objects = useMemo(() => {
    const items = [];
    const count = 200;
    const radius = 5;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 40;
      const z = -i * 2;
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 2;
      const y = Math.sin(angle) * radius + (Math.random() - 0.5) * 2;
      items.push({
        position: [x, y, z],
        color: i % 3 === 0 ? '#0066ff' : i % 3 === 1 ? '#8a2be2' : '#ffffff',
        speed: 0.2 + Math.random() * 0.5,
        scale: 0.5 + Math.random(),
      });
    }
    return items;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const offset = scroll.offset;
    groupRef.current.position.z = offset * 400;
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      Math.sin(state.clock.getElapsedTime() * 0.5) * 0.5,
      0.1,
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      Math.cos(state.clock.getElapsedTime() * 0.5) * 0.5,
      0.1,
    );
    groupRef.current.rotation.z = offset * Math.PI;
  });

  return (
    <group ref={groupRef}>
      {objects.map((obj, i) => (
        <TrackObject
          key={i}
          position={obj.position}
          color={obj.color}
          speed={obj.speed}
          scale={obj.scale}
        />
      ))}
    </group>
  );
}

export default function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
      <fog attach="fog" args={['#050505', 5, 25]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#0066ff" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Track />
      <Environment preset="night" />
    </>
  );
}
