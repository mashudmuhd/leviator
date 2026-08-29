import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { PerfumeVariant } from '../types';

interface PerfumeBottle3DProps {
  activeVariant: PerfumeVariant;
  style?: React.CSSProperties;
  className?: string;
}

export const PerfumeBottle3D: React.FC<PerfumeBottle3DProps> = ({
  activeVariant,
  style,
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const bottleGroupRef = useRef<THREE.Group | null>(null);

  // Dynamic canvas-generated crisp 24K gold embossed label texture
  const makeLabelTexture = (variant: PerfumeVariant) => {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 600;
    const ctx = c.getContext('2d');
    if (!ctx) return null;

    const cx = c.width / 2;

    // Matte black plaque
    ctx.fillStyle = '#0a0a0c';
    ctx.fillRect(0, 0, c.width, c.height);

    // 24K gold border
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 4;
    ctx.strokeRect(12, 12, c.width - 24, c.height - 24);

    // Brand Monogram Diamond
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx - 30, 85); ctx.lineTo(cx + 30, 85);
    ctx.lineTo(cx + 45, 120); ctx.lineTo(cx, 175);
    ctx.lineTo(cx - 45, 120); ctx.closePath();
    ctx.stroke();

    // LEVIATOR Brand Name
    ctx.fillStyle = '#ffffff';
    ctx.font = "700 48px 'Cinzel', Georgia, serif";
    ctx.textAlign = 'center';
    ctx.fillText('LEVIATOR', cx, 260);

    // Subtitle
    ctx.fillStyle = '#d4af37';
    ctx.font = "600 18px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText('HAUTE PARFUMERIE', cx, 305);

    // Divider
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx - 100, 345);
    ctx.lineTo(cx + 100, 345);
    ctx.stroke();

    // Variant Name
    ctx.fillStyle = '#f5e6cb';
    ctx.font = "italic 36px Georgia, serif";
    ctx.fillText(variant.name, cx, 410);

    // Volume
    ctx.fillStyle = '#a0a0a8';
    ctx.font = "500 18px monospace";
    ctx.fillText('EXTRAIT DE PARFUM • 100ML', cx, 475);

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 5.2);
    camera.lookAt(0, 0, 0);

    // Studio Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));

    const key = new THREE.DirectionalLight(0xfff4e0, 2.5);
    key.position.set(4, 6, 4);
    scene.add(key);

    const rim = new THREE.DirectionalLight(0xf3e5ab, 2.0);
    rim.position.set(-4, -2, -4);
    scene.add(rim);

    const point = new THREE.PointLight(
      new THREE.Color(activeVariant.liquidColor || '#d4af37'),
      1.5,
      8
    );
    point.position.set(0, 0, 2);
    scene.add(point);

    // Bottle Group
    const bottleGroup = new THREE.Group();
    scene.add(bottleGroup);
    bottleGroupRef.current = bottleGroup;

    const glassColor = new THREE.Color(activeVariant.glassColor || '#0a0a0d');
    const liquidColor = new THREE.Color(activeVariant.liquidColor || '#e28743');
    const goldAccent = new THREE.Color(activeVariant.accentColor || '#d4af37');

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: glassColor,
      metalness: 0.15,
      roughness: activeVariant.roughness || 0.1,
      transmission: activeVariant.transmission || 0.88,
      ior: activeVariant.ior || 1.52,
      thickness: 0.8,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      reflectivity: 0.65,
    });

    const profile = [
      new THREE.Vector2(0.0, -0.9),
      new THREE.Vector2(0.38, -0.87),
      new THREE.Vector2(0.46, -0.78),
      new THREE.Vector2(0.48, -0.65),
      new THREE.Vector2(0.48, 0.22),
      new THREE.Vector2(0.46, 0.30),
      new THREE.Vector2(0.32, 0.40),
      new THREE.Vector2(0.16, 0.45),
      new THREE.Vector2(0.15, 0.58),
      new THREE.Vector2(0.17, 0.63),
      new THREE.Vector2(0.18, 0.73),
      new THREE.Vector2(0.26, 0.77),
      new THREE.Vector2(0.26, 0.96),
      new THREE.Vector2(0.18, 1.02),
    ];
    const latheGeo = new THREE.LatheGeometry(profile, 64);
    const bottleMesh = new THREE.Mesh(latheGeo, glassMat);
    bottleGroup.add(bottleMesh);

    // Liquid Core
    const liquidProfile = [
      new THREE.Vector2(0.0, -0.85),
      new THREE.Vector2(0.35, -0.82),
      new THREE.Vector2(0.44, -0.74),
      new THREE.Vector2(0.45, -0.62),
      new THREE.Vector2(0.45, 0.18),
      new THREE.Vector2(0.43, 0.26),
      new THREE.Vector2(0.29, 0.35),
      new THREE.Vector2(0.0, 0.35),
    ];
    const liquidGeo = new THREE.LatheGeometry(liquidProfile, 48);
    const liquidMat = new THREE.MeshPhysicalMaterial({
      color: liquidColor,
      metalness: 0.1,
      roughness: 0.15,
      transmission: 0.82,
      ior: 1.45,
      thickness: 0.5,
      emissive: liquidColor,
      emissiveIntensity: 0.15,
    });
    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
    bottleGroup.add(liquidMesh);

    // Label Plaque
    const labelTex = makeLabelTexture(activeVariant);
    const labelMat = new THREE.MeshStandardMaterial({
      map: labelTex,
      transparent: true,
      roughness: 0.4,
      metalness: 0.2,
      depthWrite: false,
    });
    const labelMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.65, 0.76), labelMat);
    labelMesh.position.set(0, -0.16, 0.495);
    labelMesh.renderOrder = 2;
    bottleGroup.add(labelMesh);

    // Gold Neck Collar
    const trimGeo = new THREE.TorusGeometry(0.175, 0.016, 16, 36);
    const goldMat = new THREE.MeshStandardMaterial({
      color: goldAccent,
      metalness: 0.95,
      roughness: 0.2,
    });
    const trim = new THREE.Mesh(trimGeo, goldMat);
    trim.rotation.x = Math.PI / 2;
    trim.position.y = 0.65;
    bottleGroup.add(trim);

    // Cap Grooves
    const capMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a1f,
      metalness: 0.6,
      roughness: 0.35,
    });
    for (let i = 0; i < 5; i++) {
      const grooveGeo = new THREE.TorusGeometry(0.26, 0.005, 8, 32);
      const groove = new THREE.Mesh(grooveGeo, capMat);
      groove.rotation.x = Math.PI / 2;
      groove.position.y = 0.8 + i * 0.042;
      bottleGroup.add(groove);
    }

    // Soft Shadow
    const shadowGeo = new THREE.RingGeometry(0.05, 0.85, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      opacity: 0.5,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -0.96;
    scene.add(shadowMesh);

    // Resize
    const resize = () => {
      const w = mount.clientWidth || 400;
      const h = mount.clientHeight || 500;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // Interactive Drag Physics
    let dragging = false;
    let lastX = 0;
    let velocity = 0;

    const pointerDown = (e: MouseEvent | TouchEvent) => {
      dragging = true;
      const p = 'touches' in e ? e.touches[0] : e;
      lastX = p.clientX;
    };

    const pointerMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging || !bottleGroupRef.current) return;
      const p = 'touches' in e ? e.touches[0] : e;
      const dx = p.clientX - lastX;
      lastX = p.clientX;
      bottleGroupRef.current.rotation.y += dx * 0.008;
      velocity = dx * 0.008;
    };

    const pointerUp = () => {
      dragging = false;
    };

    const el = renderer.domElement;
    el.style.cursor = 'grab';
    el.style.touchAction = 'none';

    el.addEventListener('pointerdown', pointerDown as any);
    window.addEventListener('pointermove', pointerMove as any);
    window.addEventListener('pointerup', pointerUp);

    // Animation Loop
    let raf: number;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!dragging && bottleGroupRef.current) {
        velocity *= 0.94;
        bottleGroupRef.current.rotation.y += velocity + 0.005;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      el.removeEventListener('pointerdown', pointerDown as any);
      window.removeEventListener('pointermove', pointerMove as any);
      window.removeEventListener('pointerup', pointerUp);
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose();
        if ((obj as THREE.Mesh).material) {
          const mat = (obj as THREE.Mesh).material;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat.dispose();
        }
      });
      renderer.dispose();
      if (mount.contains(el)) mount.removeChild(el);
    };
  }, [activeVariant]);

  return (
    <div
      ref={mountRef}
      className={`w-full h-full min-h-[360px] rounded-2xl overflow-hidden ${className}`}
      style={style}
    />
  );
};

export default PerfumeBottle3D;
