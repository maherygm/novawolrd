import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import vertexShader from "./vertexShader";
import fragmentShader from "./fragmentShader";
import { MathUtils, Mesh } from "three";

interface BlobProps {
  audioUrl?: string | null; // Changed from string | undefined to string | null
}

const Blob: React.FC<BlobProps> = ({ audioUrl }) => {
  const mesh = useRef<Mesh>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [source, setSource] = useState<AudioBufferSourceNode | null>(null);
  const [frequencyData, setFrequencyData] = useState<Uint8Array | null>(null);
  const [isContextStarted, setIsContextStarted] = useState<boolean>(false);

  // Uniforms
  const uniforms = useMemo<
    Record<string, { value: number | number[] | boolean }>
  >(
    () => ({
      u_time: { value: 0 },
      u_intensity: { value: 0.5 },
    }),
    []
  );

  // Initialize AudioContext after user interaction
  useEffect(() => {
    const startContext = () => {
      if (!audioContext && !isContextStarted) {
        const context = new AudioContext();
        const analyserNode = context.createAnalyser();
        analyserNode.fftSize = 512;
        analyserNode.smoothingTimeConstant = 0.9;
        const dataArray = new Uint8Array(analyserNode.frequencyBinCount);

        setAudioContext(context);
        setAnalyser(analyserNode);
        setFrequencyData(dataArray);
        setIsContextStarted(true);
        console.log("AudioContext initialisé");
      }
    };

    window.addEventListener("click", startContext, { once: true });

    return () => {
      window.removeEventListener("click", startContext);
      if (audioContext && audioContext.state !== "closed") {
        audioContext.close().catch((err) => console.error("Erreur fermeture AudioContext:", err));
      }
    };
  }, [audioContext, isContextStarted]);

  // Load and play audio
  useEffect(() => {
    let isMounted = true;

    if (audioUrl && audioContext && analyser && !source) {
      const loadAudio = async () => {
        try {
          console.log("Chargement audio:", audioUrl);
          const response = await fetch(audioUrl);
          if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
          const arrayBuffer = await response.arrayBuffer();
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

          if (!isMounted) return;

          const sourceNode = audioContext.createBufferSource();
          const gainNode = audioContext.createGain();
          gainNode.gain.setValueAtTime(1.0, audioContext.currentTime);

          sourceNode.buffer = audioBuffer;
          sourceNode.connect(gainNode);
          gainNode.connect(analyser);
          analyser.connect(audioContext.destination);
          sourceNode.loop = false;

          sourceNode.onended = () => {
            if (isMounted) {
              setSource(null);
              console.log("Audio terminé naturellement.");
            }
          };

          sourceNode.start(0);
          setSource(sourceNode);
          console.log("Audio démarré");
        } catch (error) {
          if (isMounted) {
            console.error("Erreur chargement audio:", error);
          }
        }
      };

      loadAudio();
    }

    return () => {
      isMounted = false;
      if (source) {
        try {
          source.stop();
          source.disconnect();
          console.log("Source audio arrêtée");
        } catch (error) {
          console.error("Erreur arrêt source:", error);
        }
      }
    };
  }, [audioUrl, audioContext, analyser]);

  // Animation and visualization
  useFrame((state) => {
    const { clock } = state;
    if (mesh.current) {
      mesh.current.material.uniforms.u_time.value = 0.2 * clock.getElapsedTime();

      if (analyser && frequencyData && source) {
        analyser.getByteFrequencyData(frequencyData);

        const lowerFreqCount = Math.floor(frequencyData.length * 0.3);
        let sum = 0;
        for (let i = 0; i < lowerFreqCount; i++) {
          sum += frequencyData[i];
        }
        const avgFrequency = sum / lowerFreqCount;

        const intensity = MathUtils.clamp((avgFrequency / 255) * 3.0, 0.5, 3.0);
        mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
          mesh.current.material.uniforms.u_intensity.value,
          intensity,
          0.2
        );
      } else {
        mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
          mesh.current.material.uniforms.u_intensity.value,
          0.5 + 0.3 * Math.sin(clock.getElapsedTime()),
          0.1
        );
      }
    }
  });

  return (
    <mesh ref={mesh} scale={1.5} position={[0, 0, 0]}>
      <icosahedronGeometry args={[2, 20]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export default Blob;