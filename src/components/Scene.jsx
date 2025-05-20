import * as THREE from "three";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
} from "@react-three/rapier";
import { useMemo } from "react";
import { clone } from "three/examples/jsm/utils/SkeletonUtils";

THREE.ColorManagement.legacyMode = false;

// // 球体のマテリアル
// const baubleMaterial = new THREE.MeshLambertMaterial({
//   color: "#d7c86e",
//   emissive: "#ecd13a",
// });

// // キャップのマテリアル
// const capMaterial = new THREE.MeshStandardMaterial({
//   // metalness: 0.75,
//   // roughness: 0.15,
//   color: "#baae6c",
//   // emissive: "#603600",
//   envMapIntensity: 20, // 環境マップの反射
// });

// //球体ジオメトリ（28分割）を作成
// const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

// 50個の bauble を作成、スケールをランダムに決定（小・中・大の3パターン）
const baubles = [...Array(50)].map(() => ({
  scale: [0.75, 0.75, 1, 1, 1.25][Math.floor(Math.random() * 5)],
}));

function Bauble({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
}) {
  //外部GLBを読み込み。
  // const { nodes } = useGLTF("/cap.glb");
  const { scene } = useGLTF("/hamburger.glb");
  console.log(scene);

  // 必ず clone する（SkeletonUtils.clone はアニメ付きGLTFでもOK）
  // SkeletonUtils.clone(scene) を使うことで、アニメーション・スキニングのあるモデルも複製できます。
  const clonedScene = useMemo(() => clone(scene), [scene]);

  const api = useRef();
  // フレームごとに飾りに力を加えて動きを出している
  useFrame((state, delta) => {
    delta = Math.min(0.1, delta); // 長すぎるフレームを制限
    api.current.applyImpulse(
      vec
        .copy(api.current.translation()) // 現在の位置を取得して
        .normalize() // 単位ベクトルに（方向だけ取得）
        .multiply({
          x: -50 * delta * scale,
          y: -150 * delta * scale,
          z: -50 * delta * scale,
        }) // スケールに応じた力を生成
    );
  });
  return (
    //bauble は物理演算対象（RigidBody）
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
      dispose={null}
    >
      {/* 球体のコリジョン設定 */}
      <BallCollider args={[scale]} />
      <primitive
        object={clonedScene}
        scale={scale} // ここでスケールを適用
        castShadow
        receiveShadow
      />
      {/* 飾りのコリジョン設定 */}
      {/* <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      /> */}

      {/* 描画部分 */}
      {/* <mesh
        castShadow
        receiveShadow
        scale={scale}
        // geometry={sphereGeometry}
        geometry={scene}
        material={baubleMaterial}
      /> */}
      {/* <mesh
        console.log(scene);
        castShadow
        scale={2.5 * scale}
        position={[0, 0, -1.8 * scale]}
        geometry={nodes.Mesh_1.geometry}
        material={capMaterial}
      /> */}
    </RigidBody>
  );
}
function Pointer({ vec = new THREE.Vector3() }) {
  const ref = useRef();
  useFrame(({ mouse, viewport }) => {
    vec.lerp(
      {
        x: (mouse.x * viewport.width) / 2,
        y: (mouse.y * viewport.height) / 2,
        z: 0,
      },
      0.2
    );
    ref.current?.setNextKinematicTranslation(vec);
  });
  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

export default function Scene() {
  return (
    <Canvas
      style={{ background: "#43c2ec" }}
      shadows
      gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
      camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
      onCreated={(state) => (state.gl.toneMappingExposure = 2.5)}
    >
      <ambientLight intensity={2.5} />
      <spotLight
        position={[20, 20, 25]}
        penumbra={1}
        angle={0.2}
        color="white"
        castShadow
        shadow-mapSize={[512, 512]}
        intensity={2}
      />
      <directionalLight position={[0, 5, -4]} intensity={5} />
      <directionalLight position={[0, -15, -0]} intensity={4} color="red" />
      <Physics gravity={[0, 0, 0]}>
        <Pointer />
        {
          baubles.map((props, i) => <Bauble key={i} {...props} />) /* prettier-ignore */
        }
      </Physics>
      <Environment files="/adamsbridge.hdr" />
      <EffectComposer disableNormalPass>
        <N8AO color="red" aoRadius={2} intensity={1.15} />
      </EffectComposer>
      {/* <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} />
    <BoxMesh position={[0, 0, 0]} />
    <OrbitControls /> */}
    </Canvas>
  );
}
