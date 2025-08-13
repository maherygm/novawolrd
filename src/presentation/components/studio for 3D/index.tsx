import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { PerspectiveCamera } from '@theatre/r3f'
import { JSX, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Vector3 } from 'three';

import studio from '@theatre/studio'

// import studio from '@theatre/studio'
// @ts-ignore
import extension from '@theatre/r3f/dist/extension'
import { editable as e, SheetProvider } from '@theatre/r3f'
import { getProject } from '@theatre/core'; 

import demoProjectState from './animm.json'
import ThreeDViewer from '@/presentation/pages/landing/subComponents/earth';

// // if(import.meta.env.VITE_THEATRE_MODE=="development"){
// //     studio.initialize()
// //     studio.extend(extension)
// // }

// studio.initialize()
// studio.extend(extension)

const demoSheet = getProject('Demo Project', { state: demoProjectState }).sheet('Demo Sheet')

interface studioProps {
    progress ?: number
}
export function Studio({ progress }: studioProps) {
    useEffect(() => {
        demoSheet.project.ready.then(() => {
            const totalDuration = 5
            demoSheet.sequence.position = totalDuration * (progress ?? 0);
        });

      }, [progress])
      const cameraRef = useRef(null);

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.lookAt(new Vector3(0, 0, 0));
    }
  }, []);

    return (
        <Canvas 
        className="h-full w-full"
        gl={{
          preserveDrawingBuffer: true,
          antialias: true,
          powerPreference: 'high-performance',
          
        }}
        
        shadows
        >
            <SheetProvider sheet={demoSheet}>
            <PerspectiveCamera
        theatreKey="Camera"
        makeDefault
        position={[0, 0, 5]}
        fov={90}
        near={0.1}
        far={70}
      />
                {/* <OrbitControls /> */}

                <ambientLight intensity={0.5} />

                {/* <e.mesh theatreKey="lighcube" position={[0, 0.5, 0]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="lightblue" />
                </e.mesh>

                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                    <planeGeometry args={[10, 10]} />
                    <meshStandardMaterial color="green" />
                </mesh> */}

                <ThreeDViewer modelUrl='/models/globe.glb'/>
            </SheetProvider>
        </Canvas>
    );
}


