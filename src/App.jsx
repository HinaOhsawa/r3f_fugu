import { Canvas } from "@react-three/fiber";
import SceneContent from "./components/Scene";
import "./App.css";

function App() {
  return (
    <div className="pb-10 relative w-screen h-screen overflow-auto">
      {/* 3Dコンテンツ */}
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

      {/* 説明 */}
      <div className="w-9/10 max-w-3xl py-6 px-4 mx-auto mt-10 text-center bg-white rounded-lg shadow-lg">
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

        <p className="mt-6 text-gray-600">
          参考サイト
          <br />
          <a
            className="underline text-gray-500 hover:text-gray-400 transition"
            href="https://codesandbox.io/p/sandbox/zxpv7?file=%2Fsrc%2Fstyles.css"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://codesandbox.io/p/sandbox/zxpv7?file=%2Fsrc%2Fstyles.css
          </a>
        </p>

        <h2 className="mt-10 text-lg  font-bold">フグのモデリング</h2>
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
      <footer className="flex flex-col w-9/10 mx-auto py-8">
        <div className="text-center text-sm text-gray-500">
          &copy; 2025 Fugu. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;
