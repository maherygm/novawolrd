import React, { useEffect, useRef, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';
import { GLTF } from 'three-stdlib';

// Définir les types pour le modèle GLTF
type GLTFResult = GLTF & {
  nodes: {
    Object_5: THREE.Mesh;
    Object_8: THREE.Mesh;
    mesh_2: THREE.Mesh & {
      morphTargetDictionary: Record<string, number>;
      morphTargetInfluences: number[];
    };
    Object_13: THREE.Mesh;
  };
  materials: {
    lambert5: THREE.Material;
  };
  animations: THREE.AnimationClip[];
};

// Définir les props du composant
interface ThreeDModelProps extends GroupProps {
  voice: boolean;
  concatenatedDescriptions: string;
  animationComplete: boolean;
}

export function ThreeDModel({ 
  voice, 
  concatenatedDescriptions, 
  animationComplete, 
  ...props 
}: ThreeDModelProps) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF('/models/face.glb') as GLTFResult;
  const { actions } = useAnimations(animations, group);
  const [scale, setScale] = useState<number>(12.393);

  useEffect(() => {
    // Only play animation when conditions are met, but don't stop it on initial load
    if (voice && concatenatedDescriptions && actions && Object.keys(actions).length > 0) {
      const action = actions[Object.keys(actions)[0]];
      action.play();
    }
    // Removing the else block prevents the animation from being stopped on initial load
  }, [actions, voice, concatenatedDescriptions]);

  useEffect(() => {
    const updateScale = () => {
      if (window.innerWidth <= 768) {
        setScale(10);
      } else if (window.innerWidth <= 1200) {
        setScale(10);
      } else {
        setScale(12.393);
      }
    };

    if (animationComplete && actions && Object.keys(actions).length > 0) {
      const action = actions[Object.keys(actions)[0]];
      action.paused = true;  // Correctly pause the action by setting its paused property to true
    }
    
    window.addEventListener('resize', updateScale);
    updateScale();

    return () => window.removeEventListener('resize', updateScale);
  }, [animationComplete, actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={scale}
        >
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group
                name="grp_eyeLeft_1"
                position={[-0.027, 0.031, 0.025]}
                rotation={[1.69, -0.2, 0.039]}
                scale={0.01}
              >
                <group name="eyeLeft_0">
                  <mesh
                    name="Object_5"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_5.geometry}
                    material={materials.lambert5}
                  />
                </group>
              </group>
              <group
                name="grp_eyeRight_3"
                position={[0.038, 0.018, 0.024]}
                rotation={[1.69, -0.205, -0.025]}
                scale={0.01}
              >
                <group name="eyeRight_2">
                  <mesh
                    name="Object_8"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_8.geometry}
                    material={materials.lambert5}
                  />
                </group>
              </group>
              <group
                name="grp_transform_6"
                rotation={[1.598, -0.202, -0.02]}
                scale={0.01}
              >
                <group name="head_4">
                  <mesh
                    name="mesh_2"
                    castShadow
                    receiveShadow
                    geometry={nodes.mesh_2.geometry}
                    material={materials.lambert5}
                    morphTargetDictionary={nodes.mesh_2.morphTargetDictionary}
                    morphTargetInfluences={nodes.mesh_2.morphTargetInfluences}
                  />
                </group>
                <group name="teeth_5">
                  <mesh
                    name="Object_13"
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_13.geometry}
                    material={materials.lambert5}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/models/face.glb');