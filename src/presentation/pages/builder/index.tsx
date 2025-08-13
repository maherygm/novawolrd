import { useEffect, useRef, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// Ground texture types
type GroundType = 'sand' | 'grass' | 'concrete'

// House types
const HOUSE_TYPES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  MANSION: 'mansion'
} as const

const CityBuilder = () => {
  const [groundType, setGroundType] = useState<GroundType>('grass')
  const [selectedHouse, setSelectedHouse] = useState<string | null>(null)
  const sceneRef = useRef<THREE.Scene>(null)
  const [groundTexture, setGroundTexture] = useState<THREE.Texture | null>(null)
  
  // Ground textures
  const groundTextures = {
    sand: '/textures/sand.jpg',
    grass: '/textures/grass.jpg',
    concrete: '/textures/concrete.jpg'
  }

  // House models
  const houseModels = {
    [HOUSE_TYPES.SMALL]: '/models/small-house.glb',
    [HOUSE_TYPES.MEDIUM]: '/models/medium-house.glb',
    [HOUSE_TYPES.LARGE]: '/models/large-house.glb',
    [HOUSE_TYPES.MANSION]: '/models/mansion.glb'
  }

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader()
    textureLoader.load(groundTextures[groundType], (texture) => {
      setGroundTexture(texture)
    })
  }, [groundType])

  const DragControlsComponent = () => {
    const { camera, gl } = useThree()
    
    useEffect(() => {
      if (sceneRef.current) {
        const controls = new DragControls([], camera, gl.domElement)
        
        controls.addEventListener('dragstart', (event) => {
          gsap.to(event.object.position, {
            y: 2,
            duration: 0.3,
            ease: 'power2.out'
          })
        })

        controls.addEventListener('dragend', (event) => {
          gsap.to(event.object.position, {
            y: 0,
            duration: 0.5,
            ease: 'bounce.out'
          })
        })

        return () => {
          controls.dispose()
        }
      }
    }, [camera, gl])

    return null
  }

  return (
    <div className="city-builder">
      <motion.div className="controls-panel">
        <div className="ground-controls">
          {Object.keys(groundTextures).map((type) => (
            <button
              key={type}
              onClick={() => setGroundType(type as GroundType)}
              className={groundType === type ? 'active' : ''}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="house-controls">
          {Object.values(HOUSE_TYPES).map((type) => (
            <motion.div
              key={type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="house-item"
              onClick={() => setSelectedHouse(type)}
            >
              <img src={`/thumbnails/${type}-house.png`} alt={type} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <DragControlsComponent />
        
        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
          <planeGeometry args={[100, 100]} />
          {groundTexture && <meshStandardMaterial map={groundTexture} />}
        </mesh>

        {/* Scene for house placement */}
        <scene ref={sceneRef} />
      </Canvas>
    </div>
  )
}

export default CityBuilder
