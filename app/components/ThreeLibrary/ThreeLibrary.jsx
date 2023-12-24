import { Canvas } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import React from "react";

function Shelf({ position }) {
  const woodTexture = useTexture("/woodTexture.jpg"); // Replace with the path to your texture
  const baseX = position[0];
  const baseY = position[1];
  const baseZ = position[2];

  return (
    <group position={position}>
      {/* Main Shelf Body */}
      <mesh position={[baseX, baseY, baseZ]}>
        <boxGeometry args={[2, 0.1, 1]} />
        <meshStandardMaterial map={woodTexture} />
      </mesh>

      {/* Back Panel */}
      <mesh position={[baseX, baseY + 0.45, baseZ + 0.45]}>
        <boxGeometry args={[2, 1, 0.1]} />
        <meshStandardMaterial map={woodTexture} />
      </mesh>

      {/* Left Side Panel */}
      <mesh position={[baseX - 1.05, baseY + 0.45, baseZ]}>
        <boxGeometry args={[0.1, 1, 1]} />
        <meshStandardMaterial map={woodTexture} />
      </mesh>

      {/* Right Side Panel */}
      <mesh position={[baseX + 1.05, baseY + 0.45, baseZ]}>
        <boxGeometry args={[0.1, 1, 1]} />
        <meshStandardMaterial map={woodTexture} />
      </mesh>
    </group>
  );
}

function Book() {
  return (
    <mesh position={[-0.85, 0.45, 0]}>
      <boxGeometry args={[0.2, 0.9, 0.8]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}

function Scene() {
  const shelfSpacing = 0.5; // Adjust this value as needed

  // Relative positions: -2 and -1 for below, 0 for middle, 1 and 2 for above
  const relativeShelfPositions = [-2, -1, 0, 1, 2];

  // Convert relative positions to actual positions
  const shelfPositions = relativeShelfPositions.map((relativePosition) => [
    0,
    relativePosition * shelfSpacing,
    0,
  ]);

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      {shelfPositions.map((position, index) => (
        <Shelf key={index} position={position} />
      ))}
      <Book />
      <OrbitControls />
    </Canvas>
  );
}

export default function ThreeLibrary() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Scene />
    </div>
  );
}
