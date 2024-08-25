import { Graphics, Text } from "pixi.js"

type CellType = 'default' | 'origin' | 'destination'

type CellConstructor = {
  cellWidth: number
  cellHeight: number
  border: number
  row: number
  column: number
  type?: CellType
}

export class Cell extends Graphics {
  cellWidth: number
  cellHeight: number
  border: number
  index: [number, number]
  type?: CellType = 'default'

  constructor({cellWidth, cellHeight, border, row, column}: CellConstructor) {
    super()

    this.cellWidth = cellWidth
    this.cellHeight = cellHeight
    this.border = border
    this.index = [row, column]

    this.createCell()
    this.createIndexText()
  }

  private createCell() {
    this.rect(
      0,
      0,
      this.cellWidth,
      this.cellHeight
    ).fill({
      color: 0xffffff,
      alpha: 0.5
    }).stroke({
      width: this.border,
      color: 0xffea00
    })
    this.x = this.cellWidth * this.index[1]
    this.y = this.cellHeight * this.index[0]
  }

  private createIndexText() {
    const text = new Text({
      text: `[${this.index[0]}, ${this.index[1]}]`,
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

  public changeTypeTo(type: CellType) {
    this.type = type

    switch(type) {
      case "origin":
        this.fill({
          color: 0x00ffff
        })
        break
      case 'destination':
        this.fill({
          color: 0x00ff00
        })
        break
      case 'default':
      default:
        this.fill({
          color: 0xffffff,
          alpha: 0.5
        })
        break      
    }
  }
}