import { Application } from 'pixi.js'
import { Grid } from './grid/grid'

export class Game {
  app: Application
  grid: Grid

  constructor() {
    const app = new Application()
    this.app = app;
    this.grid = new Grid(app)
  }

  public async start() {
    await this.app.init({
      resizeTo: window
    })
    this.app.canvas.style.position = 'absolute'
  }
}