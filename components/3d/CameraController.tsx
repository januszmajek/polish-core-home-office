"use client";

import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useAppStore, CAMERA_POSITIONS } from "@/lib/store";

export function CameraController() {
  const { camera } = useThree();
  const { currentZone, isTransitioning, setTransitioning, freeCamera } = useAppStore();

  const targetPosition = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());
  const currentLookAt = useRef(new THREE.Vector3(0, 1, 0));

  // Update targets when zone changes
  useEffect(() => {
    const pos = CAMERA_POSITIONS[currentZone];
    targetPosition.current.set(...pos.position);
    targetLookAt.current.set(...pos.target);
  }, [currentZone]);

  useFrame((_, delta) => {
    // Skip lerp animation when free camera is active
    if (freeCamera || !isTransitioning) return;

    const lerpFactor = 1 - Math.pow(0.001, delta);

    camera.position.lerp(targetPosition.current, lerpFactor);
    currentLookAt.current.lerp(targetLookAt.current, lerpFactor);
    camera.lookAt(currentLookAt.current);

    const positionDist = camera.position.distanceTo(targetPosition.current);
    const lookAtDist = currentLookAt.current.distanceTo(targetLookAt.current);

    if (positionDist < 0.01 && lookAtDist < 0.01) {
      setTransitioning(false);
    }
  });

  // Initialize camera on mount
  useEffect(() => {
    const pos = CAMERA_POSITIONS.overview;
    camera.position.set(...pos.position);
    currentLookAt.current.set(...pos.target);
    camera.lookAt(currentLookAt.current);
  }, [camera]);

  if (freeCamera) {
    return (
      <OrbitControls
        makeDefault
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={0.3}
        maxDistance={8}
        // Keep the camera above the floor
        maxPolarAngle={Math.PI * 0.85}
        target={[0, 1.0, -0.5]}
        enableDamping
        dampingFactor={0.08}
      />
    );
  }

  return null;
}
