// Performance Optimized Canvas Component
import { Canvas } from "@react-three/fiber";
import { Model } from "./model/Dspl";
import { Suspense, memo } from "react";

const CanvasPage = memo(() => {
  return (
    <div className="w-full h-[100vh] fixed top-0 -z-10 pointer-events-none">
      <div className="w-full h-full filter blur-2xl absolute">
        <div className="w-[30vw] -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 absolute rounded-full aspect-square gradient-shapes"></div>
        <div className="w-[20rem] animate-float absolute -left-10 -bottom-20 rounded-full aspect-square gradient-shapes"></div>
      </div>
      <Canvas
        frameloop="demand"
        dpr={Math.min(window.devicePixelRatio, 1.5)} // Limit DPR for performance
        camera={{ fov: 75 }}
        shadows
        className="will-change-auto"
        gl={{ 
          antialias: false, // Disable for better performance
          powerPreference: "high-performance",
          alpha: true
        }}
        performance={{ min: 0.5 }} // Enable adaptive performance
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
});

CanvasPage.displayName = "CanvasPage";

export default CanvasPage;
