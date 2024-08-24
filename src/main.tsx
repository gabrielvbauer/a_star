import { Game } from './game'
import './index.css'

(async () => {
  const game = new Game()

  await game.start()

  document.body.appendChild(game.app.canvas)
})()