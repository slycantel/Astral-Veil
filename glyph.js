class Glyph {
  constructor(x, y, shape) {
    this.x = x;
    this.y = y;
    this.shape = shape; // 0: circle, 1: triangle, 2: square
    this.aether = Math.random() * 50 + 50;
  }

  draw(ctx) {
    ctx.fillStyle = this.shape === 0 ? '#ff6666' : this.shape === 1 ? '#66b2ff' : '#ffcc66';
    ctx.beginPath();
    if (this.shape === 0) {
      ctx.arc(this.x + 20, this.y + 20, this.aether / 5, 0, Math.PI * 2);
    } else if (this.shape === 1) {
      const size = this.aether / 4;
      ctx.moveTo(this.x + 20, this.y + 20 - size);
      ctx.lineTo(this.x + 20 - size * 0.866, this.y + 20 + size * 0.5);
      ctx.lineTo(this.x + 20 + size * 0.866, this.y + 20 + size * 0.5);
      ctx.closePath();
    } else {
      const size = this.aether / 4;
      ctx.rect(this.x + 20 - size, this.y + 20 - size, size * 2, size * 2);
    }
    ctx.fill();
  }

  update() {
    this.aether -= 0.5;
    return this.aether <= 0;
  }
}

module.exports = Glyph;
