import {Particle} from './Particle';

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

const particleCount = 30;
const maxOpacity = 0.4;

export class ParticleAnimation {

  private baseColor;
  private particles: Particle[] = [];
  private size: number;

  constructor(
    private width,
    private height,
    private cx,
    private cy,
    private stage,
    private color
  ) {
    const rgb = hexToRgb(color);
    this.baseColor = `${rgb.r},${rgb.g},${rgb.b}`;
    this.size = width > height ? height / 3 : width / 3;
    this.init();
  }

  init() {
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new Particle(
        ((0.5 - Math.random()) * this.size) + this.cx,
        (0.5 - Math.random()) * this.size + this.cy,
        Math.random(),
        Math.random() * this.size,
        (Math.random() - 0.5) / 40,
        (Math.random() - 0.5) * this.size / 20
      ));
    }
  }

  update() {
    for (let i = 0; i < this.particles.length; i++) {

      const particle = this.particles[i];

      particle.opacity = particle.opacity + particle.opacityChange;
      particle.size = particle.size + particle.sizeChange;

      if (particle.opacity > maxOpacity) {
        particle.opacity = 0.4;
        particle.opacityChange = -Math.abs(particle.opacityChange);
      }
      if (particle.opacity <= 0) {
        particle.opacity = 0;
        particle.opacityChange = Math.abs(particle.opacityChange);
      }

      if (particle.size > this.size) {
        particle.size = this.size;
        particle.sizeChange = -Math.abs(particle.sizeChange);
      }
      if (particle.size <= 0) {
        particle.size = 0;
        particle.sizeChange = Math.abs(particle.sizeChange);
      }


      this.stage.fillStyle = `rgba(${this.baseColor}, ${particle.opacity})`;

      this.stage.beginPath();
      this.stage.arc(
        particle.x,
        particle.y,
        particle.size,
        0,
        2 * Math.PI
      );
      this.stage.fill();
    }
  }


}
