import { Application } from "pixi.js"
import { Cell } from "./cell"

export class Grid {
  app: Application
  rows: number = 10
  columns: number = Math.trunc(this.rows * (16/9))
  cells: Cell[] = []

  constructor(app: Application) {
    this.app = app;
    this.generateGrid()
  }

  private generateGrid() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const width = (window.innerWidth / this.columns)
        const height = (window.innerHeight / this.rows)

        const cell = new Cell({
          cellWidth: width,
          cellHeight: height,
          border: 2,
          row: i,
          column: j
        })
        this.cells.push(cell)
        this.app.stage.addChild(cell)
      }
    }
  }
}