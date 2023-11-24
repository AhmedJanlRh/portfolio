import React, { useRef, useEffect } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import { useThree, extend } from "@react-three/fiber";
import * as THREE from "three";
extend({ GLTFLoader });

const Hologram = ({ modelPath, setIsRotating }) => {
  const gltf = useRef();
  const { scene, animations, clock, camera } = useThree();
  const mouse = new THREE.Vector2();
  const rotationState = { x: 0, y: 0 };

  useEffect(() => {
    const loader = new GLTFLoader();
    let position;

    if (window.innerWidth < 600) {
      position = [0, 0, 1];
    } else {
      position = [0, 0.3, 1.2];
    }

    loader.load(modelPath, (gltfResult) => {
      gltf.current = gltfResult;

      gltf.current.scene.scale.set(1, 1, 1);
      gltf.current.scene.position.set(position[0], position[1], position[2]);
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

    const handleMouseMove = (event) => {
      setIsRotating(true);
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleTouchMove = (event) => {
      setIsRotating(true);
      const touch = event.touches[0];
      mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      setIsRotating(false);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [modelPath, scene, animations, setIsRotating]);

  const handleModelClick = () => {
    setIsRotating(true);
  };

  window.addEventListener("click", handleModelClick);

  const animate = (mixer) => {
    const animateFrame = () => {
      if (gltf.current) {
        const delta = clock.getDelta() * 13;
        mixer.update(delta);

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(
          [gltf.current.scene],
          true
        );

        if (intersects.length > 0) {
          const targetRotationY = mouse.x * Math.PI * 3.5;
          const targetRotationX = mouse.y * Math.PI * 3.5;

          rotationState.y = THREE.MathUtils.lerp(
            rotationState.y * 1.03,
            targetRotationY,
            0.01
          );
          console.log("asss", rotationState.y);
          gltf.current.scene.rotation.y = rotationState.y;

          rotationState.x = THREE.MathUtils.lerp(
            rotationState.x,
            targetRotationX,
            0.01
          );
          gltf.current.scene.rotation.x = rotationState.x;
        }
      }

      requestAnimationFrame(animateFrame);
    };

    animateFrame();
  };

  return null;
};

export default Hologram;
