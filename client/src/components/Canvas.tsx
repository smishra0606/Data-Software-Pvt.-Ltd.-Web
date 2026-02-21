import { Canvas } from "@react-three/fiber";
import { Model } from "./model/Dspl";
import { Suspense, useEffect } from "react";

const CanvasPage = () => {
  // Handle WebGL context loss
  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.log('WebGL context lost. Attempting to restore...');
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored!');
      window.location.reload(); // Reload to reinitialize
    };

    canvas.addEventListener('webglcontextlost', handleContextLost);
    canvas.addEventListener('webglcontextrestored', handleContextRestored);

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, []);

  return (
    <div className="w-full h-[100vh] fixed top-0 -z-10 pointer-events-none">
      <div className="w-full h-full filter blur-2xl absolute">
        <div className="w-[30vw] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 absolute rounded-full aspect-square gradient-shapes"></div>
        <div className="w-[20rem] animate-float absolute -left-10 -bottom-20 rounded-full aspect-square gradient-shapes"></div>
      </div>
      <Canvas
        frameloop="demand"
        dpr={Math.min(window.devicePixelRatio, 1.5)}
        camera={{ fov: 75 }}
        shadows
        className="will-change-auto"
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          alpha: true,
          preserveDrawingBuffer: false,
        }}
        performance={{ min: 0.5 }}
        onCreated={({ gl }) => {
          // Optimize WebGL settings
          gl.setClearColor(0x000000, 0);
        }}
      >
        <Suspense fallback={null}>
          <directionalLight
            intensity={3}
            color={"red"}
            position={[0, 0, 4]}
            castShadow
          />
          <Model />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CanvasPage;
