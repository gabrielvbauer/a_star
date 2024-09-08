import { Application } from 'pixi.js'
import { Grid } from './grid/grid'
import { AStar } from './pathfinding/a-star'

export class Game {
  app: Application
  grid: Grid

  constructor() {
    const app = new Application()
    this.app = app;
    const grid = new Grid(app)
    this.grid = grid
    const aStar = new AStar(grid)
    aStar.findBestPath({
      includeColateralDirections: true
    })
  }

  public async start() {
    await this.app.init({
      resizeTo: window
    })
    this.app.canvas.style.position = 'absolute'
  }
}