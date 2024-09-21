import { Application } from "pixi.js"
import { Cell } from "./cell"
import { PossibleCellTypes } from "../ui/components/cell-type-switch"

interface GenerateGridProps {
  rows: number
  columns: number
}

export class Grid {
  private static instance: Grid
  app: Application
  rows: number = 0
  columns: number = 0
  cells: Cell[][] = []
  originCell: Cell | undefined = undefined
  destinationCell: Cell | undefined = undefined
  selectedType: PossibleCellTypes = 'default';

  constructor(app: Application) {
    this.app = app;
    const rows = 10
    const columns = Math.trunc(rows * (16/9))
    this.generateGrid({
      rows,
      columns 
    })
    this.rows = rows
    this.columns = columns
    Grid.instance = this
  }
  
  public setRows(rows: number) {
    this.rows = rows
  }

  public setColumns(columns: number) {
    this.columns = columns
  }

  public static getInstance(): Grid {
    return Grid.instance;
  }

  public generateGrid({
    rows,
    columns
  }: GenerateGridProps) {
    this.app.stage.removeChildren()
    for (let i = 0; i < rows; i++) {
      this.cells[i] = []

      for (let j = 0; j < columns; j++) {
        const width = ((window.innerWidth - 360) / columns)
        const height = (window.innerHeight / rows)

        const cell = new Cell({
          cellWidth: width,
          cellHeight: height,
          border: 2,
          row: i,
          column: j,
          onChangeCellType: this.changeCellType.bind(this)
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

  public defineWallCells({
    row,
    column
  }: {
    row: number,
    column: number
  }) {
    const cell = this.cells[row][column]
    cell.changeTypeTo('wall')
  }

  public getOriginCell() {
    const flatten = this.cells.flat()
    return flatten.find(cell => cell.type === 'origin')
  }

  public getDestinationCell() {
    const flatten = this.cells.flat()
    return flatten.find(cell => cell.type === 'destination')
  }

  public getCell({
    row,
    column
  }: {
    row: number,
    column: number
  }) {
    const cellsInRow = this.cells[row]
    if (!cellsInRow) return null
    return cellsInRow[column]
  }
  
  public toggleCellsIndexes(show: boolean) {
    const flattenedCells = this.cells.flat()
    flattenedCells.forEach(cell => {
      const cellIndexText = cell.getChildByLabel('index')
      if (cellIndexText) {
        cellIndexText.visible = show
      }
    })
  }

  public changeSelectedType(selectedType: PossibleCellTypes) {
    this.selectedType = selectedType
  }

  private changeCellType(cell: Cell) {
    if (!cell) {
      return
    }

    cell.changeTypeTo(this.selectedType)
  }
  
  public toggleCellsCalculations(show: boolean) {
    const flattenedCells = this.cells.flat()
    flattenedCells
      .filter(cell => cell.type !== 'wall' && cell.type !== 'default')
      .forEach(cell => {
        const cellOperationsText = cell.getChildByLabel('operations')
        if (cellOperationsText) {
          cellOperationsText.visible = show
        }

        const cellDistanceText = cell.getChildByLabel('distance')
        if (cellDistanceText) {
          cellDistanceText.visible = show
        }

        const cellCostText = cell.getChildByLabel('cost')
        if (cellCostText) {
          cellCostText.visible = show
        }
      }
    )
  }
}