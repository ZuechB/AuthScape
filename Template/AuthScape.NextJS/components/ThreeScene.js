import * as THREE from 'three';
import { useRef, useEffect, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const ThreeScene = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(2, 1, 2);

    const scene = new THREE.Scene();

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
    directionalLight.castShadow = true;
    directionalLight.position.set(-1, 2, 4);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const container = new THREE.Object3D();
    container.position.set(0, 0, 0);

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      'https://url.glb',
      (gltf) => {
        const object = gltf.scene;
        object.scale.set(0.05, 0.05, 0.05); // Scaling the object
        object.position.set(0, -0.3, 0);
        container.add(object);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.log(error);
      }
    );
    scene.add(container);

    renderer.setAnimationLoop(() => {
      container.rotation.y -= 0.01; // Rotating the object
      renderer.render(scene, camera);
    });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{height:800, width:500}} />;
}
