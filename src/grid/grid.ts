import { Application } from "pixi.js"
import { Cell } from "./cell"
import { AStar } from "../pathfinding/a-star"

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
    this.defineOriginCell({row: 1, column: 3})
    this.defineDestinationCell({row: 5, column: 16})
    const aStar = new AStar(this)
    aStar.findBestPath()
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
      currentOriginCell.changeTypeTo('path')
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
      currentDestinationCell.changeTypeTo('path')
    }

    const cell = this.cells[row][column]
    cell.changeTypeTo('destination')
    this.destinationCell = cell
  }

  public getOriginCell() {
    const flatten = this.cells.flat()
    return flatten.find(cell => cell.type === 'origin')
  }

  public getDestinationCell() {
    const flatten = this.cells.flat()
    return flatten.find(cell => cell.type === 'destination')
  }
}