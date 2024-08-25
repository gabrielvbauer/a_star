import { Application } from "pixi.js"
import { Cell } from "./cell"

export class Grid {
  app: Application
  rows: number = 10
  columns: number = Math.trunc(this.rows * (16/9))
  cells: Cell[][] = []
  originCell: Cell | undefined = undefined
  destinationCell: Cell | undefined = undefined

  constructor(app: Application) {
    this.app = app;
    this.generateGrid()
    this.defineOriginCell({
      row: 9,
      column: 15
    })
    this.defineDestinationCell({
      row: 1,
      column: 3
    })
  }

  private generateGrid() {
    for (let i = 0; i < this.rows; i++) {
      this.cells[i] = []

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
        this.cells[i].push(cell)
        this.app.stage.addChild(cell)
      }
    }
  }

  public defineOriginCell({
    row,
    column
  }: {
    row: number,
    column: number
  }) {
    const currentOriginCell = this.originCell
    if (currentOriginCell) {
      currentOriginCell.changeTypeTo('default')
    }

    const cell = this.cells[row][column]
    cell.changeTypeTo('origin')
    this.originCell = cell
  }

  public defineDestinationCell({
    row,
    column
  }: {
    row: number,
    column: number
  }) {
    const currentDestinationCell = this.destinationCell
    if (currentDestinationCell) {
      currentDestinationCell.changeTypeTo('default')
    }

    const cell = this.cells[row][column]
    cell.changeTypeTo('destination')
    this.destinationCell = cell
  }
}