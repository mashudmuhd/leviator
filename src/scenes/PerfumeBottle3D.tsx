import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { PerfumeVariant } from '../types';
import { useSceneStore } from '../stores/useSceneStore';

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
  const labelMeshRef = useRef<THREE.Mesh | null>(null);
  const glassMatRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const podiumLightRef = useRef<THREE.PointLight | null>(null);

  // Function to create dynamic label texture based on variant name & details
  const makeLabelTexture = (variant: PerfumeVariant) => {
    const c = document.createElement('canvas');
    c.width = 430;
    c.height = 500;
    const ctx = c.getContext('2d');
    if (!ctx) return null;

    const cx = c.width / 2;

    // Solid black plaque with thin border
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.strokeStyle = 'rgba(255,255,255,0.22)';
    ctx.lineWidth = 2;
    ctx.strokeRect(6, 6, c.width - 12, c.height - 12);

    // Monogram square outline
    ctx.strokeStyle = '#e9e2d3';
    ctx.lineWidth = 1.6;
    ctx.strokeRect(cx - 95, 60, 190, 190);

    // Diamond icon
    ctx.save();
    ctx.translate(cx, 155);
    ctx.strokeStyle = '#e9e2d3';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(-24, 0); ctx.lineTo(24, 0);
    ctx.moveTo(-24, 0); ctx.lineTo(-12, 24); ctx.lineTo(0, 0);
    ctx.moveTo(0, 0); ctx.lineTo(12, 24); ctx.lineTo(24, 0);
    ctx.moveTo(-12, 24); ctx.lineTo(0, 40); ctx.lineTo(12, 24);
    ctx.stroke();
    ctx.restore();

    // "LA" monogram letters
    ctx.fillStyle = '#f3ede0';
    ctx.font = "600 62px Georgia, 'Times New Roman', serif";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText('LA', cx, 235);

    // Brand name -- Leviatur
    ctx.fillStyle = '#ffffff';
    ctx.font = "700 46px Georgia, 'Times New Roman', serif";
    ctx.fillText('Leviatur', cx, 320);

    // Variant script line -- Rose La vie or Signature
    ctx.fillStyle = variant.accentColor || '#e7ddc8';
    ctx.font = "italic 30px 'Brush Script MT', cursive, serif";
    const variantSubtext = variant.id === 'rose-lavie' ? 'Rose La vie' : 'Signature';
    ctx.fillText(variantSubtext, cx, 385);

    // EAU DE PARFUM
    ctx.fillStyle = '#cfc6b4';
    ctx.font = '400 19px Georgia, serif';
    const label = 'EAU DE PARFUM';
    let totalW = 0;
    const spacing = 6;
    for (const ch of label) totalW += ctx.measureText(ch).width + spacing;
    let sx = cx - totalW / 2;
    for (const ch of label) {
      const w = ctx.measureText(ch).width;
      ctx.fillText(ch, sx + w / 2, 460);
      sx += w + spacing;
    }

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Renderer / Scene / Camera
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0.05, 5.6);
    camera.lookAt(0, -0.05, 0);

    // Lighting
    scene.add(new THREE.AmbientLight(0x3a2a1a, 0.9));

    const key = new THREE.SpotLight(0xffcf8a, 4.4, 20, Math.PI / 5, 0.5, 1.2);
    key.position.set(-3.2, 4, 3.2);
    scene.add(key);

    const rim = new THREE.PointLight(0xffb35c, 2.2, 15);
    rim.position.set(2.4, 1.6, -2.4);
    scene.add(rim);

    const fill = new THREE.PointLight(0x8899ff, 0.45, 15);
    fill.position.set(-1.6, -0.8, 2.4);
    scene.add(fill);

    const podiumLight = new THREE.PointLight(0xffd9a0, 1.3, 6);
    podiumLight.position.set(0, -0.9, 2);
    scene.add(podiumLight);
    podiumLightRef.current = podiumLight;

    // Bottle Group
    const bottleGroup = new THREE.Group();
    scene.add(bottleGroup);
    bottleGroupRef.current = bottleGroup;

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(activeVariant.glassColor || '#070707'),
      metalness: 0.2,
      roughness: activeVariant.roughness || 0.32,
      clearcoat: 1,
      clearcoatRoughness: 0.2,
      reflectivity: 0.55,
    });
    glassMatRef.current = glassMat;

    // Profile traced lathe geometry
    const profile = [
      new THREE.Vector2(0.0, -0.9),
      new THREE.Vector2(0.4229, -0.8662),
      new THREE.Vector2(0.511, -0.7875),
      new THREE.Vector2(0.5228, -0.675),
      new THREE.Vector2(0.5169, 0.225),
      new THREE.Vector2(0.511, 0.2925),
      new THREE.Vector2(0.3289, 0.3937),
      new THREE.Vector2(0.1703, 0.45),
      new THREE.Vector2(0.1527, 0.5737),
      new THREE.Vector2(0.1762, 0.63),
      new THREE.Vector2(0.188, 0.7312),
      new THREE.Vector2(0.2878, 0.765),
      new THREE.Vector2(0.2878, 0.9563),
      new THREE.Vector2(0.1938, 1.0237),
    ];
    const latheGeo = new THREE.LatheGeometry(profile, 96);
    const bottleMesh = new THREE.Mesh(latheGeo, glassMat);
    bottleGroup.add(bottleMesh);

    // Label Plaque
    const labelTex = makeLabelTexture(activeVariant);
    const labelMat = new THREE.MeshStandardMaterial({
      map: labelTex,
      transparent: true,
      roughness: 0.5,
      metalness: 0.05,
      depthWrite: false,
    });
    const labelMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.73, 0.85), labelMat);
    labelMesh.position.set(0, -0.18, 0.535);
    labelMesh.renderOrder = 2;
    bottleGroup.add(labelMesh);
    labelMeshRef.current = labelMesh;

    // Gold collar trim
    const goldMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(activeVariant.accentColor || '#d8ae5f'),
      metalness: 1,
      roughness: 0.25,
    });
    const trimGeo = new THREE.TorusGeometry(0.185, 0.018, 12, 32);
    const trim = new THREE.Mesh(trimGeo, goldMat);
    trim.rotation.x = Math.PI / 2;
    trim.position.y = 0.665;
    bottleGroup.add(trim);

    // Cap Grooves
    const capMat = new THREE.MeshStandardMaterial({
      color: 0x0d0d0d,
      metalness: 0.55,
      roughness: 0.4,
    });
    for (let i = 0; i < 5; i++) {
      const grooveGeo = new THREE.TorusGeometry(0.285, 0.004, 6, 28);
      const groove = new THREE.Mesh(grooveGeo, capMat);
      groove.rotation.x = Math.PI / 2;
      groove.position.y = 0.8 + i * 0.045;
      bottleGroup.add(groove);
    }

    bottleGroup.position.y = 0;

    // Marble texture for podium
    const makeMarbleTexture = () => {
      const c = document.createElement('canvas');
      c.width = 256;
      c.height = 256;
      const ctx = c.getContext('2d');
      if (!ctx) return null;
      ctx.fillStyle = '#0c0c0d';
      ctx.fillRect(0, 0, 256, 256);
      ctx.strokeStyle = 'rgba(212,175,110,0.35)';
      for (let i = 0; i < 14; i++) {
        ctx.beginPath();
        let x = Math.random() * 256,
          y = Math.random() * 256;
        ctx.moveTo(x, y);
        for (let j = 0; j < 5; j++) {
          x += (Math.random() - 0.5) * 90;
          y += (Math.random() - 0.5) * 90;
          ctx.lineTo(x, y);
        }
        ctx.lineWidth = Math.random() * 1.2 + 0.3;
        ctx.stroke();
      }
      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      return tex;
    };

    // Podium
    const marbleTex = makeMarbleTexture();
    const podiumGeo = new THREE.CylinderGeometry(1.25, 1.4, 0.4, 48);
    const podiumMat = new THREE.MeshStandardMaterial({
      map: marbleTex,
      color: 0x1a1714,
      roughness: 0.4,
      metalness: 0.3,
    });
    const podium = new THREE.Mesh(podiumGeo, podiumMat);
    podium.position.y = -1.1;
    scene.add(podium);

    const podiumRingGeo = new THREE.TorusGeometry(1.25, 0.02, 10, 60);
    const podiumRing = new THREE.Mesh(podiumRingGeo, goldMat);
    podiumRing.rotation.x = Math.PI / 2;
    podiumRing.position.y = -0.9;
    scene.add(podiumRing);

    // Backdrop gold ring
    const backRingGeo = new THREE.TorusGeometry(1.7, 0.025, 12, 80);
    const backRing = new THREE.Mesh(backRingGeo, goldMat);
    backRing.position.set(-0.75, 0.25, -2);
    scene.add(backRing);

    // Accent Props: Gem + Gold Sphere
    const gemGeo = new THREE.OctahedronGeometry(0.18, 0);
    const gemMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(activeVariant.accentColor || '#e8c98a'),
      metalness: 0,
      roughness: 0.05,
      transmission: 0.6,
      thickness: 0.5,
      clearcoat: 1,
    });
    const gem = new THREE.Mesh(gemGeo, gemMat);
    gem.position.set(-1.5, -0.95, 1.05);
    gem.rotation.set(0.3, 0.6, 0);
    scene.add(gem);

    const ballGeo = new THREE.SphereGeometry(0.1, 24, 24);
    const ball = new THREE.Mesh(ballGeo, goldMat);
    ball.position.set(1.35, -0.95, 0.85);
    scene.add(ball);

    // Floating Dust Particles
    const PCOUNT = 110;
    const positions = new Float32Array(PCOUNT * 3);
    for (let i = 0; i < PCOUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 5.5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      color: new THREE.Color(activeVariant.accentColor || '#e6c07a'),
      size: 0.015,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Soft Shadow Blob
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = shadowCanvas.height = 256;
    const sctx = shadowCanvas.getContext('2d');
    if (sctx) {
      const grad = sctx.createRadialGradient(128, 128, 10, 128, 128, 128);
      grad.addColorStop(0, 'rgba(0,0,0,0.55)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      sctx.fillStyle = grad;
      sctx.fillRect(0, 0, 256, 256);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -0.895;
    scene.add(shadowMesh);

    // Resize handler
    const resize = () => {
      const w = mount.clientWidth || 480;
      const h = mount.clientHeight || 640;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // Pointer Interaction (Drag-to-rotate)
    let dragging = false;
    let lastX = 0,
      lastY = 0;
    let velocity = 0;
    let idleTimer = 0;

    const pointerDown = (e: MouseEvent | TouchEvent) => {
      dragging = true;
      idleTimer = 0;
      const p = 'touches' in e ? e.touches[0] : e;
      lastX = p.clientX;
      lastY = p.clientY;
      renderer.domElement.style.cursor = 'grabbing';
    };

    const pointerMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging || !bottleGroupRef.current) return;
      const p = 'touches' in e ? e.touches[0] : e;
      const dx = p.clientX - lastX;
      const dy = p.clientY - lastY;
      lastX = p.clientX;
      lastY = p.clientY;
      bottleGroupRef.current.rotation.y += dx * 0.01;
      bottleGroupRef.current.rotation.x = THREE.MathUtils.clamp(
        bottleGroupRef.current.rotation.x + dy * 0.005,
        -0.35,
        0.35
      );
      velocity = dx * 0.01;
    };

    const pointerUp = () => {
      dragging = false;
      if (renderer.domElement) {
        renderer.domElement.style.cursor = 'grab';
      }
    };

    const el = renderer.domElement;
    el.style.cursor = 'grab';
    el.style.touchAction = 'none';

    el.addEventListener('pointerdown', pointerDown as any);
    window.addEventListener('pointermove', pointerMove as any);
    window.addEventListener('pointerup', pointerUp);

    // Animation Loop
    let raf: number;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const dt = clock.getDelta();
      const t = clock.getElapsedTime();

      if (!dragging && bottleGroupRef.current) {
        idleTimer += dt;
        velocity *= 0.92;
        bottleGroupRef.current.rotation.y += velocity + (idleTimer > 1.2 ? 0.0022 : 0);
      }

      gem.rotation.y += 0.01;
      gem.rotation.x += 0.005;
      particles.rotation.y += 0.0008;
      if (podiumLightRef.current) {
        podiumLightRef.current.intensity = 1.3 + Math.sin(t * 1.5) * 0.15;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
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
      className={`w-full h-full min-h-[480px] rounded-2xl overflow-hidden ${className}`}
      style={{
        background:
          activeVariant.id === 'rose-lavie'
            ? 'radial-gradient(circle at 25% 20%, rgba(224,86,253,0.24), transparent 55%), radial-gradient(circle at 75% 80%, rgba(80,20,50,0.3), transparent 60%), #060405'
            : 'radial-gradient(circle at 25% 20%, rgba(212,168,90,0.22), transparent 55%), radial-gradient(circle at 75% 80%, rgba(80,50,20,0.25), transparent 60%), #060504',
        ...style,
      }}
    />
  );
};

export default PerfumeBottle3D;
