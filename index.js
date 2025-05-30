const { createCanvas } = require('canvas');
const Glyph = require('./glyph.js');

class AstralVeil {
  constructor() {
    this.canvas = createCanvas(480, 720);
    this.ctx = this.canvas.getContext('2d');
    this.gridSize = 40;
    this.cols = 12;
    this.rows = 18;
    this.glyphs = [];
    this.score = 0;
    this.tier = 1;
    this.maxGlyphs = 5;
    this.spawnGlyph();
  }

  spawnGlyph() {
    if (this.glyphs.length >= this.maxGlyphs) return;
    const col = Math.floor(Math.random() * this.cols);
    const row = Math.floor(Math.random() * (this.rows - 2)) + 2; // Avoid top rows for UI
    const shape = Math.floor(Math.random() * 3); // 0: circle, 1: triangle, 2: square
    this.glyphs.push(new Glyph(col * this.gridSize, row * this.gridSize, shape));
  }

  drawGrid() {
    this.ctx.strokeStyle = '#5a5a5a';
    this.ctx.lineWidth = 1;
    for (let x = 0; x <= this.canvas.width; x += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }
    for (let y = 0; y <= this.canvas.height; y += this.gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }
  }

  update() {
    this.ctx.fillStyle = '#1f1f3a';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGrid();

    for (let i = this.glyphs.length - 1; i >= 0; i--) {
      this.glyphs[i].draw(this.ctx);
      if (this.glyphs[i].update()) {
        this.glyphs.splice(i, 1);
        this.spawnGlyph();
      }
    }

    this.checkSeals();
    this.drawUI();
  }

  checkSeals() {
    const toRemove = [];
    for (let i = 0; i < this.glyphs.length; i++) {
      for (let j = i + 1; j < this.glyphs.length; j++) {
        const g1 = this.glyphs[i];
        const g2 = this.glyphs[j];
        if (
          g1.shape === g2.shape &&
          (
            (Math.abs(g1.x - g2.x) <= this.gridSize && g1.y === g2.y) || // Horizontal
            (Math.abs(g1.y - g2.y) <= this.gridSize && g1.x === g2.x)    // Vertical
          )
        ) {
          this.ctx.strokeStyle = g1.shape === 0 ? '#ff6666' : g1.shape === 1 ? '#66b2ff' : '#ffcc66';
          this.ctx.lineWidth = 4;
          this.ctx.beginPath();
          this.ctx.moveTo(g1.x + this.gridSize / 2, g1.y + this.gridSize / 2);
          this.ctx.lineTo(g2.x + this.gridSize / 2, g2.y + this.gridSize / 2);
          this.ctx.stroke();
          toRemove.push(i, j);
          this.score += 40 * this.tier;
        }
      }
    }

    toRemove.sort((a, b) => b - a);
    toRemove.forEach(i => this.glyphs.splice(i, 1));
    if (toRemove.length > 0) {
      this.spawnGlyph();
      if (this.score >= this.tier * 400) this.advanceTier();
    }
  }

  advanceTier() {
    this.tier++;
    this.maxGlyphs = Math.min(this.maxGlyphs + 1, 12);
    this.glyphs.forEach(g => (g.aether = Math.min(g.aether + 10, 100)));
    this.spawnGlyph();
  }

  drawUI() {
    this.ctx.fillStyle = '#00ffcc';
    this.ctx.font = '18px Arial';
    this.ctx.fillText(`Score: ${this.score}`, 10, 20);
    this.ctx.fillText(`Tier: ${this.tier}`, 10, 45);
  }

  handleClick(x, y) {
    for (const glyph of this.glyphs) {
      const d = Math.sqrt(
        Math.pow(x - (glyph.x + this.gridSize / 2), 2) +
        Math.pow(y - (glyph.y + this.gridSize / 2), 2)
      );
      if (d < this.gridSize / 2) {
        glyph.shape = (glyph.shape + 1) % 3;
        break;
      }
    }
  }

  reset() {
    this.glyphs = [];
    this.score = 0;
    this.tier = 1;
    this.maxGlyphs = 5;
    this.spawnGlyph();
  }
}

// Example usage (for testing in Node.js)
const game = new AstralVeil();
game.update();
console.log('Astral Veil game initialized. Use a UI framework or save canvas to render.');
const fs = require('fs');
const out = fs.createWriteStream('output.png');
const stream = game.canvas.createPNGStream();
stream.pipe(out);
