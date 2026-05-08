"use client";

import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAppStore, CAMERA_POSITIONS } from "@/lib/store";

export function CameraController() {
  const { camera } = useThree();
  const { currentZone, isTransitioning, setTransitioning } = useAppStore();
  
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
    if (!isTransitioning) return;
    
    const lerpFactor = 1 - Math.pow(0.001, delta);
    
    // Smoothly interpolate camera position
    camera.position.lerp(targetPosition.current, lerpFactor);
    
    // Smoothly interpolate look-at target
    currentLookAt.current.lerp(targetLookAt.current, lerpFactor);
    camera.lookAt(currentLookAt.current);
    
    // Check if transition is complete
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

  return null;
}
