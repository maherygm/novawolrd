import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  url: string;
}

interface IndicatorProps {
  position: [number, number, number];
  label: string;
}

const Indicator: React.FC<IndicatorProps> = ({ position, label }) => {
  return (
    <Html position={position} center scale={[5,5,5]}>
      <div className="flex flex-col items-center bg-gray-800 bg-opacity-80 rounded-lg p-3 shadow-lg text-white">
        <span className="text-sm font-medium text-center">{label}</span>
      </div>
    </Html>
  );
};

const Model: React.FC<ModelProps> = ({ url }) => {
  const { scene } = useGLTF(url);

  useEffect(() => {
    return () => {
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry?.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          }
        }
      });
    };
  }, [scene]);

  return <primitive object={scene} scale={[0.05, 0.05, 0.05]} rotation={[- Math.PI , -Math.PI / 2, 0]} />;
};

const ThreeDViewer: React.FC<{ modelUrl: string }> = ({ modelUrl }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    fetch(modelUrl)
      .then((response) => {
        if (!response.ok) {
          console.error(`Erreur : impossible de charger ${modelUrl}`);
        } else {
          console.log(`Modèle trouvé à ${modelUrl}`);
        }
      })
      .catch((error) => console.error('Erreur lors de la vérification du modèle :', error));
  }, [modelUrl]);

  const indicators = [
    {
      position: [-0.5, 1, 1] as [number, number, number],
      label: 'Solution environnementale',
    },
    {
      position: [1, 1, -1] as [number, number, number],
      label: 'Urbanisme',
    },
    {
      position: [0, 0.8, -3] as [number, number, number],
      label: 'Médical',
    },
  ];

  return (
   
    <>
  {/* Lumière hémisphérique existante */}
  <hemisphereLight
    args={[new THREE.Color('#87CEEB'), new THREE.Color('#ffffff'), 4]}
    position={[0, 10, 0]}
  />
  {/* Ajout d'une lumière directionnelle pour des ombres nettes */}
  <directionalLight
    color="#ffffff"
    intensity={2}
    position={[5, 10, 5]}
    castShadow
    shadow-mapSize-width={1024}
    shadow-mapSize-height={1024}
    shadow-camera-near={0.5}
    shadow-camera-far={50}
  />
  {/* Ajout d'une lumière ambiante douce */}
  {/* <ambientLight color="#ffffff" intensity={0.5} /> */}
  {/* Lumière ponctuelle pour des reflets supplémentaires */}
  {/* <pointLight
    color="#ffffff"
    intensity={1}
    distance={20}
    position={[0, 5, -5]}
  /> */}
  {/* <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} /> */}

  <Suspense
    fallback={
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    }
  >
    <Model url={modelUrl} />
    {indicators.map((indicator, index) => (
      <Indicator
        key={index}
        position={indicator.position}
        label={indicator.label}
      />
    ))}
  </Suspense>
</>
   
  );
};

export default ThreeDViewer;