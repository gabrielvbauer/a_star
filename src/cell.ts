import { Graphics, Text } from "pixi.js"

type CellConstructor = {
  cellWidth: number
  cellHeight: number
  border: number
  row: number
  column: number
}

export class Cell extends Graphics {
  cellWidth: number
  cellHeight: number
  border: number
  index: [number, number]

  constructor({cellWidth, cellHeight, border, row, column}: CellConstructor) {
    super()

    this.cellWidth = cellWidth
    this.cellHeight = cellHeight
    this.border = border
    this.index = [row, column]
    this.rect(
      0,
      0,
      cellWidth,
      cellHeight
    ).fill({
      color: 0xffffff,
      alpha: 0.5
    }).stroke({
      width: border,
      color: 0xffea00
    })
    this.x = cellWidth * column
    this.y = cellHeight * row

    const text = new Text({
      text: `[${row}, ${column}]`,
      style: {
        fill: 0xffffff,
        fontSize: 16
      }
    })
    text.anchor.x = 0.5
    text.anchor.y = 0.5
    text.x = this.width / 2
    text.y = this.height / 2

    this.addChild(text)
  }
}