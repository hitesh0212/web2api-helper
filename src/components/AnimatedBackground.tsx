
import { useTheme } from "@/contexts/ThemeContext";
import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
};

export const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDarkMode } = useTheme();
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize particles
    const initParticles = () => {
      const particleCount = Math.min(Math.floor(window.innerWidth / 10), 150); // Responsive particle count
      particlesRef.current = [];

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          color: isDarkMode 
            ? `rgba(${Math.floor(Math.random() * 50) + 100}, ${Math.floor(Math.random() * 20) + 50}, ${Math.floor(Math.random() * 100) + 155}, 0.7)`
            : `rgba(${Math.floor(Math.random() * 100) + 155}, ${Math.floor(Math.random() * 50) + 100}, ${Math.floor(Math.random() * 100) + 155}, 0.4)`,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    };

    const connectParticles = (p1: Particle, p2: Particle) => {
      const distance = Math.sqrt(
        Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
      );
      const maxDistance = 150;

      if (distance < maxDistance) {
        ctx.beginPath();
        ctx.strokeStyle = isDarkMode 
          ? `rgba(168, 85, 247, ${0.2 * (1 - distance / maxDistance)})` 
          : `rgba(168, 85, 247, ${0.1 * (1 - distance / maxDistance)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    };

    const draw = () => {
      if (!ctx || !canvas) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((p, index) => {
        // Move particles
        p.x += p.speedX;
        p.y += p.speedY;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Connect with nearby particles
        for (let j = index + 1; j < particlesRef.current.length; j++) {
          connectParticles(p, particlesRef.current[j]);
        }
      });

      // Continue animation
      animationFrameRef.current = requestAnimationFrame(draw);
    };

    // Handle window resize
    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });

    // Handle mouse interaction
    const mouseMoveHandler = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      particlesRef.current.forEach(p => {
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = 0.5 / distance;
          p.speedX -= dx * force * 0.2;
          p.speedY -= dy * force * 0.2;
        }
      });
    };

    canvas.addEventListener('mousemove', mouseMoveHandler);

    // Initialize everything
    resizeCanvas();
    initParticles();
    draw();

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', mouseMoveHandler);
    };
  }, [isDarkMode]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
};
