import React, { MouseEvent, Suspense, useRef } from "react";
import { useGLTF, MeshTransmissionMaterial } from "@react-three/drei";
import { degToRad } from "three/src/math/MathUtils.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import * as THREE from "three";
import { useTheme } from "next-themes";
import Envro from "./Enviro";
import { invalidate, useThree } from "@react-three/fiber";
import { useIsMobile } from "@/hooks/use-mobile";

export function Model(props) {
  const { nodes, materials } = useGLTF("../../dspl.glb");
  const sphereRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();
  const { viewport } = useThree();
  const isMobile = useIsMobile();
  let mouseX = 0;

  // Load environment map
  useGSAP((_, cb) => {
    let xTo = gsap.quickTo(sphereRef.current.rotation, "y", {
      onUpdate: () => {
        invalidate();
      },
    });
    if (sphereRef.current && sphereRef.current.rotation) {
      gsap.to(sphereRef.current.rotation, {
        y: 10,
        scrollTrigger: {
          trigger: ".hero-parent",
          scrub: 2,
          onUpdate: () => invalidate(),
        },
        ease: "none",
      });
      gsap.to(torusRef.current.rotation, {
        z: 10,
        y: 3,
        scrollTrigger: {
          trigger: ".hero-parent",
          scrub: true,
          onUpdate: () => invalidate(),
        },
        ease: "none",
      });
      const handleMove = (e: globalThis.MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        xTo(mouseX);
      };

      window.addEventListener("mousemove", handleMove);
      return () => {
        window.removeEventListener("mousemove", handleMove);
      };
    }
  });
  return (
    <group
      scale={isMobile ? 0.7 : 1}
      rotation={[degToRad(90), 0, 0]}
      {...props}
      dispose={null}
    >
      {/* Sphere */}
      <mesh
        ref={sphereRef}
        receiveShadow
        castShadow
        geometry={(nodes.Sphere as THREE.Mesh).geometry}
        material={materials["Material.001"]}
        scale={2}
      />

      {/* Torus with Refraction */}
      <mesh
        ref={torusRef}
        receiveShadow
        geometry={(nodes.Torus as THREE.Mesh).geometry}
        scale={1}
      >
        <MeshTransmissionMaterial
          resolution={128} // Higher resolution improves quality but affects performance
          samples={2} // Increase samples for smoother rendering (lower if performance drops)
          thickness={0.3} // Simulates material thickness for better light behavior
          anisotropy={0.2} // Controls how light scatters through the surface
          chromaticAberration={0.02} // Adds a slight color shift for realism
          roughness={0.4} // A bit of surface roughness makes it look more natural
          distortion={0.15} // Slight distortion for glassy effect
          distortionScale={0.5} // Controls intensity of distortion
          temporalDistortion={0.1} // Adds subtle movement to distortion for realism
          ior={1} // Index of Refraction (1.5 is glass, adjust for other materials)
          // attenuationDistance={0.5} // Simulates light absorption in the material
          // attenuationColor={theme === "dark" ? "#ffffff" : "#ffbbcc"} // Adds tint
          metalness={0.1} // Low metalness for more natural reflections
          reflectivity={theme === "dark" ? 0.4 : 1} // High reflectivity for sharp details
          // transmission={theme === "dark" ? 1 : 0}
        />
      </mesh>

      <Suspense fallback={null}>
        <Envro />
      </Suspense>
    </group>
  );
}

// Preload the model
useGLTF.preload("../../dspl.glb");
