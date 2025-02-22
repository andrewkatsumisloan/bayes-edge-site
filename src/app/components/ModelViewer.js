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
} from "@react-three/drei";

function Model({
  url,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 0.01,
}) {
  const { scene } = useGLTF(url);
  const clonedScene = scene.clone();

  useEffect(() => {
    clonedScene.scale.set(scale, scale, scale);
    clonedScene.position.set(...position);
    clonedScene.rotation.set(...rotation);

    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.color.set("#2563eb");
        child.material.metalness = 0.6;
        child.material.roughness = 0.4;
      }
    });
  }, [clonedScene, position, rotation, scale]);

  return <primitive object={clonedScene} />;
}

function Scene({ modelUrl }) {
  const radius = 8;
  const numModels = 8;

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.9} />
      {/* <SpotLight
        position={[-10, 10, -5]}
        intensity={0.3}
        angle={0.3}
        penumbra={1}
        color="#4f46e5"
      /> */}
      <Suspense fallback={null}>
        {modelUrl && (
          <>
            {/* Center model */}
            <Model
              url={modelUrl}
              position={[0, 1.5, 0]}
              rotation={[0, Math.PI / 4, 0]}
              scale={0.012}
            />

            {/* Circle of models */}
            {Array.from({ length: numModels }).map((_, i) => {
              const angle = (i / numModels) * Math.PI * 2;
              const x = Math.cos(angle) * radius;
              const z = Math.sin(angle) * radius;

              return (
                <Model
                  key={i}
                  url={modelUrl}
                  position={[x, 1.5, z]}
                  rotation={[0, angle + Math.PI / 2, 0]}
                  scale={0.008}
                />
              );
            })}
          </>
        )}
      </Suspense>
      <Grid
        position={[0, 0, 0]}
        args={[40, 40]}
        cellSize={1}
        cellThickness={0.6}
        cellColor="#666666"
        sectionSize={4}
        sectionThickness={1}
        sectionColor="#888888"
        fadeDistance={35}
        fadeStrength={1}
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
          position: isMobile ? [20, 10, 20] : [15, 8, 15],
          fov: isMobile ? 40 : 60,
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
