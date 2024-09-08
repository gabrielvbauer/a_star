import ReactDOM from 'react-dom/client';
import { Game } from './game'
import './index.css'
import React from 'react';
import { Menu } from './ui/menu';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div id="append-game-container">
      <Menu />
    </div>
  </React.StrictMode>
);

(async () => {
  const game = new Game()

  await game.start()

  document.getElementById('append-game-container')?.appendChild(game.app.canvas)
})()