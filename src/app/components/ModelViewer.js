"use client";

import { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Box,
  Center,
  Grid,
  SpotLight,
  useGLTF,
  Cylinder,
  MeshWobbleMaterial,
} from "@react-three/drei";
import * as THREE from "three";

function Model({ url }) {
  const { scene } = useGLTF(url);

  useEffect(() => {
    // Scale down the model
    scene.scale.set(0.01, 0.01, 0.01);
    // Adjust position if needed
    scene.position.set(0, 0, -0.5); // Move model to ground level

    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set("#2563eb");
        child.material.metalness = 0.6;
        child.material.roughness = 0.4;
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
}

function ColorGrid({ position, size = 40, cellSize = 0.4 }) {
  const geometry = new THREE.PlaneGeometry(cellSize, cellSize);
  const cells = [];
  const count = Math.floor(size / cellSize);
  const fadeDistance = 18;
  const fadeStrength = 6.5;

  // Time-based animation
  const [time, setTime] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => (t + 0.01) % (Math.PI * 2));
    }, 16);
    return () => clearInterval(interval);
  }, []);

  // Cohesive color palette inspired by Japanese indigo dye (aizome) and complementary tones
  const baseColors = [
    "#223B5C", // Deep indigo
    "#2563eb", // Robot blue (matching the model)
    "#3C526D", // Muted steel blue
    "#506D89", // Soft slate
    "#647D94", // Gentle azure
    "#A5978B", // Warm taupe (accent)
    "#7C8C88", // Muted sage (accent)
  ];

  for (let x = -count / 2; x < count / 2; x++) {
    for (let z = -count / 2; z < count / 2; z++) {
      // Create wave-like patterns using sine waves
      const distanceFromCenter = Math.sqrt(x * x + z * z);
      const angle = Math.atan2(z, x);

      // Subtle wave pattern
      const wave = Math.sin(distanceFromCenter * 0.3 + time) * 0.5 + 0.5;
      const wave2 = Math.cos(angle * 3 + time * 0.5) * 0.5 + 0.5;

      // Combine waves for pattern selection
      const patternValue = (wave + wave2) / 2;

      // Select color based on pattern
      const colorIndex = Math.floor(patternValue * baseColors.length);
      const color = new THREE.Color(baseColors[colorIndex]);

      // Radial fade
      const fadeScale = Math.exp(
        -Math.pow((distanceFromCenter * cellSize) / fadeDistance, fadeStrength)
      );

      // Animate opacity slightly with time
      const breathingEffect =
        0.9 + Math.sin(time + distanceFromCenter * 0.2) * 0.1;
      const opacity = 0.15 * fadeScale * breathingEffect;

      if (opacity > 0.01) {
        cells.push(
          <mesh
            key={`${x}-${z}`}
            geometry={geometry}
            position={[x * cellSize, position[1], z * cellSize]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <meshBasicMaterial
              color={color}
              transparent
              opacity={opacity}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        );
      }
    }
  }

  return <>{cells}</>;
}

function Scene({ modelUrl }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={4} castShadow />
      <SpotLight
        position={[-10, 10, -5]}
        intensity={0.1}
        angle={0.3}
        penumbra={1}
        color="#4f46e5"
        castShadow
      />
      <Suspense fallback={null}>
        {modelUrl ? <Model url={modelUrl} /> : null}
      </Suspense>
      <ColorGrid position={[0, -1.5, 0]} size={40} cellSize={0.4} />
    </>
  );
}

export default function ModelViewer({ modelUrl }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{
          position: isMobile ? [8, 2, 9.5] : [5, 3, 5],
          fov: isMobile ? 45 : 65,
        }}
        style={{ background: "rgb(28, 28, 28)" }}
      >
        <fog attach="fog" args={["#1c1c1c", 25, 45]} />
        <Scene modelUrl={modelUrl} />
        <OrbitControls
          enableZoom={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
          enablePan={false}
          rotateSpeed={0.3}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2.5}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}
