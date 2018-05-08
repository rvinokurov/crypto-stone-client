export class ElementSector {

  public readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly width: number;
  private readonly height: number;
  private readonly radius: number;
  private readonly cx: number;
  private readonly cy: number;
  private readonly startAngle: number;
  private readonly endAngle: number;
  private readonly color: string;
  private readonly offsetTop: number;
  private readonly offsetLeft: number;

  constructor({
                element,
                startAngle,
                endAngle,
                color
              }) {
    this.canvas = element;

    const rect = this.canvas.getBoundingClientRect();

    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.ctx = this.canvas.getContext('2d');

    this.radius = (this.width > this.height ? this.height : this.width) / 2;
    this.cx = this.width / 2;
    this.cy = this.height / 2;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.color = color;
    this.offsetLeft = rect.left;
    this.offsetTop = rect.top;
    console.log(this.width, this.height, this.cx, this.cy, this.radius);
    this.drawSector();


  }

  drawSector() {
    const innerRadius = this.radius - this.radius / 2;
    const outerRadius = this.radius + this.radius / 10;

    const rgb = this.hexToRgb(this.color);
    const startColor = `rgba(${rgb.r},${rgb.g},${rgb.b},0)`;
    const endColor = `rgba(${rgb.r},${rgb.g},${rgb.b},1)`;

    const gradient = this.ctx.createRadialGradient(this.cx, this.cy, innerRadius, this.cx, this.cy, outerRadius);
    gradient.addColorStop(0, startColor);
    gradient.addColorStop(1, endColor);

    this.ctx.beginPath();
    this.ctx.moveTo(this.cx, this.cy);
    this.ctx.arc(this.cx, this.cy, this.radius, this.startAngle, this.endAngle);
    this.ctx.fillStyle = gradient;
    this.ctx.closePath();
    this.ctx.fill();
  }

  inSector(e) {
    const mx = e.clientX - this.offsetLeft;
    const my = e.clientY - this.offsetTop;

    const dx = mx - this.cx;
    const dy = my - this.cy;
    let angle = Math.atan2(dy, dx);

    if (mx < this.cx && my < this.cy) {
      angle = 2 * Math.PI + angle;
    }

    const hypo = Math.sqrt(dx ** 2 + dy ** 2);
    const validAngle = (angle < this.endAngle && angle > this.startAngle);
    const validRadius = hypo < this.radius;
    return validAngle && validRadius;
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
}
