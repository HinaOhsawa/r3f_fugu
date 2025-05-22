import { Canvas } from "@react-three/fiber";
import SceneContent from "./components/Scene";
import "./App.css";

function App() {
  return (
    <div className="pb-10 relative w-screen h-screen overflow-auto">
      {/* Canvas 全体に広げる */}
      <Canvas
        className="absolute inset-0 w-full h-full"
        style={{ background: "#3cc4f5" }}
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 2.5)}
      >
        <SceneContent />
      </Canvas>

      {/* MV */}
      <div className="absolute inset-0 z-10 top-[3%] left-[0%] pointer-events-none border-white border-y-8 h-6 w-full"></div>

      <div className="max-w-3xl absolute inset-0 z-10 top-[30%] left-[15%] pointer-events-none">
        <h1 className="vertical-text text-9xl kaisei-tokumin-extrabold text-gray-950  animate-float ">
          ふぐ祭り
        </h1>
      </div>

      {/* コンテンツ */}
      <div className="w-9/10 max-w-3xl py-6 px-4 mx-auto mt-8 text-center bg-white rounded-lg shadow-lg">
        <h2 className="mb-2 text-lg font-bold">使用技術</h2>
        <span className="mx-1 px-1 rounded-md bg-gray-100 text-gray-500">
          Vite
        </span>
        <span className="mx-1 px-1 rounded-md bg-gray-100 text-gray-500">
          React
        </span>
        <span className="mx-1 px-1 rounded-md bg-gray-100 text-gray-500">
          React Three Fiber
        </span>
        <span className="mx-1 px-1 rounded-md bg-gray-100 text-gray-500">
          tailwindcss
        </span>

        <h2 className="mt-8 text-lg  font-bold">フグのモデリング</h2>
        <div className="mt-2 flex flex-wrap justify-center gap-4">
          <img
            className="w-90 h-90 object-cover"
            src="/images/fugu.png"
            alt=""
          />
          <img
            className="w-90 h-90 object-cover"
            src="/images/fugu_tenkai.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default App;
