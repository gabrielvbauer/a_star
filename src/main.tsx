import ReactDOM from 'react-dom/client';
import { Game } from './game'
import './index.css'
import React from 'react';
import { Menu } from './ui/components/menu';
import { CellTypeSwitch } from './ui/components/cell-type-switch';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div id="append-game-container">
      <Menu />
      <CellTypeSwitch />
    </div>
  </React.StrictMode>
);

(async () => {
  const game = new Game()

  await game.start()

  document.getElementById('append-game-container')?.appendChild(game.app.canvas)
})()