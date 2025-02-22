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

// Table component removed temporarily - will be added back later

function Scene({ modelUrl }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={4} castShadow />
      <SpotLight
        position={[-10, 10, -5]}
        intensity={0.6}
        angle={0.3}
        penumbra={1}
        color="#4f46e5"
        castShadow
      />
      <Suspense fallback={null}>
        {modelUrl ? <Model url={modelUrl} /> : null}
      </Suspense>
      <Grid
        position={[0, -1.5, 0]}
        args={[40, 40]}
        cellSize={0.4}
        cellThickness={2.2}
        cellColor="#666666"
        sectionSize={4}
        sectionThickness={1}
        sectionColor="#888888"
        fadeDistance={55}
        fadeStrength={0.95}
        followCamera={false}
        infiniteGrid={true}
      />
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
