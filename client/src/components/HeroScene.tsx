import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useCallback } from "react";
import * as THREE from "three";

// Fine dust-like particles — gold specks drifting in magnetic currents
function MagneticDust({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) {
  const ref = useRef<THREE.Points>(null!);
  const count = 1200;

  const [positions, basePositions, sizes, opacities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);
    const siz = new Float32Array(count);
    const opa = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5 + Math.random() * 5;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.6 - 0.5;
      const z = r * Math.cos(phi) * 0.4 - 2;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      base[i * 3] = x;
      base[i * 3 + 1] = y;
      base[i * 3 + 2] = z;

      // Very fine particles with variation
      siz[i] = Math.random() * 0.8 + 0.1;
      opa[i] = Math.random() * 0.6 + 0.2;
    }

    return [pos, base, siz, opa];
  }, []);

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = Math.random();
      if (t < 0.7) {
        // Gold spectrum
        col[i * 3] = 0.78 + Math.random() * 0.15;
        col[i * 3 + 1] = 0.64 + Math.random() * 0.15;
        col[i * 3 + 2] = 0.15 + Math.random() * 0.2;
      } else {
        // Cool blue accent
        col[i * 3] = 0.3 + Math.random() * 0.2;
        col[i * 3 + 1] = 0.5 + Math.random() * 0.2;
        col[i * 3 + 2] = 0.7 + Math.random() * 0.2;
      }
    }
    return col;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const posAttr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const t = state.clock.elapsedTime;
    const mx = mousePos.current.x;
    const my = mousePos.current.y;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      // Gentle drift based on original position
      const phase = i * 0.003;
      arr[ix] = basePositions[ix] + Math.sin(t * 0.15 + phase) * 0.08 + mx * 0.15;
      arr[iy] = basePositions[iy] + Math.cos(t * 0.12 + phase * 1.3) * 0.06 + my * 0.1;
      arr[iz] = basePositions[iz] + Math.sin(t * 0.1 + phase * 0.7) * 0.04;
    }

    posAttr.needsUpdate = true;
    ref.current.rotation.y += 0.0002;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Refined globe — dark sphere with subtle atmosphere
function Globe({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null!);
  const wireRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.0008;

    const tx = mousePos.current.y * 0.08;
    const tz = -mousePos.current.x * 0.04;
    groupRef.current.rotation.x += (tx - groupRef.current.rotation.x) * 0.015;
    groupRef.current.rotation.z += (tz - groupRef.current.rotation.z) * 0.015;

    if (wireRef.current) {
      wireRef.current.rotation.y -= 0.0003;
    }
  });

  return (
    <group ref={groupRef} position={[0, -3.5, -3.5]}>
      {/* Core sphere */}
      <mesh>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial
          color="#060e1c"
          roughness={0.9}
          metalness={0.2}
          emissive="#0a1e3d"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Atmosphere rim */}
      <mesh scale={1.015}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshBasicMaterial color="#1a5f9e" transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>
      {/* Outer glow */}
      <mesh scale={1.04}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshBasicMaterial color="#2980b9" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
      {/* Wireframe grid */}
      <mesh ref={wireRef}>
        <sphereGeometry args={[2.52, 48, 48]} />
        <meshBasicMaterial color="#1a4a7a" transparent opacity={0.06} wireframe />
      </mesh>
      {/* Equatorial ring */}
      <mesh rotation={[Math.PI * 0.38, 0, 0]}>
        <torusGeometry args={[3.0, 0.005, 16, 120]} />
        <meshBasicMaterial color="#c8a44e" transparent opacity={0.2} />
      </mesh>
      <mesh rotation={[Math.PI * 0.48, 0.3, 0]}>
        <torusGeometry args={[3.3, 0.003, 16, 120]} />
        <meshBasicMaterial color="#c8a44e" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

function Scene({ mousePos }: { mousePos: React.MutableRefObject<{ x: number; y: number }> }) {
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 3, 5]} intensity={0.3} color="#8ab4f8" />
      <pointLight position={[-4, 2, -1]} intensity={0.4} color="#c8a44e" distance={12} decay={2} />
      <pointLight position={[3, -2, 2]} intensity={0.2} color="#1a6fb5" distance={10} decay={2} />

      <Globe mousePos={mousePos} />
      <MagneticDust mousePos={mousePos} />

      <fog attach="fog" args={["#050d1a", 6, 16]} />
    </>
  );
}

export function HeroScene() {
  const mousePos = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePos.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mousePos.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 z-0"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <Scene mousePos={mousePos} />
      </Canvas>
    </div>
  );
}
