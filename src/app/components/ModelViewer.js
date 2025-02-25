"use client";

import { useEffect, useState, Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  Box,
  Center,
  Grid,
  SpotLight,
  useGLTF,
  Cylinder,
  MeshWobbleMaterial,
  useMaterial,
} from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { MeshStandardMaterial } from "three";

// Component to load GLTF files
function GltfModel({ url }) {
  const { scene } = useGLTF(url);

  useEffect(() => {
    // Scale down the model
    scene.scale.set(0.008, 0.008, 0.008);
    // Position slightly above the grid to prevent wheel clipping
    scene.position.set(0, 0.5, 0);
    // Rotate the model to point upward
    scene.rotation.set(-Math.PI / 2, 0, 0); // Negative rotation on X-axis to point upward

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

// Component to load STL files
function StlModel({ url }) {
  const geometry = useLoader(STLLoader, url);
  const material = new MeshStandardMaterial({
    color: "#2563eb",
    metalness: 0.6,
    roughness: 0.4,
  });

  return (
    <mesh
      geometry={geometry}
      material={material}
      scale={0.008}
      position={[0, 0.5, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
    ></mesh>
  );
}

// Generic Model component that decides which loader to use based on file extension
function Model({ url }) {
  const fileExtension = url.split(".").pop().toLowerCase();

  if (fileExtension === "stl") {
    return <StlModel url={url} />;
  } else {
    return <GltfModel url={url} />;
  }
}

function Scene({ modelUrl }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={4} castShadow />
      <Suspense fallback={null}>
        {modelUrl ? <Model url={modelUrl} /> : null}
      </Suspense>
      <Grid
        position={[0, 0, 0]}
        args={[80, 80]}
        cellSize={1}
        cellThickness={1.5}
        cellColor="#666666"
        sectionSize={8}
        sectionThickness={1}
        sectionColor="#888888"
        fadeDistance={80}
        fadeStrength={0.8}
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
          position: isMobile ? [15, 10, 15] : [12, 10, 12],
          fov: isMobile ? 60 : 70,
          up: [0, 1, 0],
        }}
        style={{ background: "rgb(28, 28, 28)" }}
      >
        <fog attach="fog" args={["#1c1c1c", 25, 45]} />
        <Scene modelUrl={modelUrl} />
        <OrbitControls
          enableZoom={true}
          zoomSpeed={0.5}
          autoRotate={true}
          autoRotateSpeed={0.5}
          enablePan={false}
          rotateSpeed={0.3}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 1.8}
          target={[0, 2.5, 0]}
          minDistance={8}
          maxDistance={20}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}
