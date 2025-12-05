"use client";

import { useEffect, useRef } from "react";

export const SnowCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // always fullscreen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // ❗ w, h эндээс авна
    const w = canvas.width;
    const h = canvas.height;

    // ❗ fullscreen snowflakes
    const flakes = Array.from({ length: 120 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 3 + 1,
      d: Math.random() + 0.5,
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "white";
      ctx.beginPath();
      flakes.forEach((f) => {
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      });
      ctx.fill();

      update();
    }

    function update() {
      flakes.forEach((f) => {
        f.y += f.d;

        if (f.y > canvas.height) {
          f.y = 0;
          f.x = Math.random() * canvas.width;
        }
      });
    }

    function anim() {
      draw();
      requestAnimationFrame(anim);
    }

    anim();

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 20,
      }}
    />
  );
};
