# Astral Veil

Astral Veil is a unique JavaScript-based puzzle game where players align ethereal glyphs to unlock astral seals. Match glyph shapes (circle, triangle, square) in adjacent grid cells to form patterns, earning points and advancing through astral tiers. Built with Node.js and the `canvas` library, this game is designed for developers seeking a modular, extensible project.

## Features
- **Pattern-Matching Gameplay**: Align glyphs with matching shapes horizontally or vertically to unlock astral seals.
- **Astral Tiers**: Progress through tiers as you score, increasing glyph counts and aether levels.
- **Modular JavaScript**: Clean, object-oriented code for seamless integration and extension.
- **Canvas Rendering**: Server-side rendering with the `canvas` library, suitable for desktop or web applications.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/astral-veil.git
   ```
2. Navigate to the project directory:
   ```bash
   cd astral-veil
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the game:
   ```bash
   npm start
   ```

## How to Play
- **Objective**: Align adjacent glyphs with the same shape (circle: red, triangle: blue, square: yellow) horizontally or vertically by cycling their shapes.
- **Scoring**: Each pattern match earns 40 points multiplied by the current tier.
- **Tier Progression**: Reach 400 points per tier to advance, increasing glyph count and aether levels.
- **Interaction**: Use `game.handleClick(x, y)` to cycle glyph shapes (requires UI integration).
- **Reset**: Call `game.reset()` to restart the game.

## Development
- **Tech Stack**: Node.js, JavaScript, `canvas`
- **Dependencies**: `canvas` for rendering
- **Code Structure**:
  - `index.js`: Main game logic and canvas rendering.
  - `glyph.js`: Glyph class for ethereal entities.
  - `package.json`: Project metadata and dependencies.
- **Extending**: Integrate with a UI framework (e.g., Electron for desktop or a web server) to handle input and display the canvas.

## Notes
- The current implementation outputs a PNG snapshot (`output.png`) for testing. For interactive play, integrate with a UI framework to handle mouse clicks and real-time rendering.
- Example integration: Use Electron for a desktop app or a WebSocket server for web-based play.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes. For major updates, open an issue first to discuss your ideas.

## Support
If you enjoy Astral Veil and want to support its development, consider sponsoring me on [GitHub Sponsors](https://github.com/sponsors/your-username). Your support helps keep this project alive and growing!

## License
MIT License. See [LICENSE](LICENSE) for details.