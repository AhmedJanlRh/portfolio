import React, { useRef, useEffect } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import { useThree, extend } from "@react-three/fiber";
import * as THREE from "three";

extend({ GLTFLoader });

const Hologram = ({ modelPath }) => {
  const gltf = useRef();
  const { scene, animations, clock } = useThree();

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(modelPath, (gltfResult) => {
      gltf.current = gltfResult;

      gltf.current.scene.scale.set(1, 1, 1);
      gltf.current.scene.position.set(0, 0.3, 1.2);
      gltf.current.scene.rotation.set(0, 0, 0);
      gltf.current.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      const mixer = new THREE.AnimationMixer(gltf.current.scene);
      gltf.current.animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.play();
      });

      gltf.current.scene.animations = animations;
      scene.add(gltf.current.scene);


      animate(mixer);
    });
    console.log(gltf);
  }, [modelPath, scene, animations]);

  const animate = (mixer) => {
    const animateFrame = () => {
      const delta = clock.getDelta() * 10;
      mixer.update(delta);
      requestAnimationFrame(animateFrame);
    };

    animateFrame();
  };

  return null;
};
export default Hologram;
