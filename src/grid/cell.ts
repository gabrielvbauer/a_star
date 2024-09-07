import { Graphics, Text } from "pixi.js"

type CellType = 'default' | 'origin' | 'destination' | 'wall' | 'recharger' | 'checkedPath' | 'path'

type CellConstructor = {
  cellWidth: number
  cellHeight: number
  border: number
  row: number
  column: number
  type?: CellType
}

interface CreateCell {
  color?: number
  alpha?: number
  strokeColor?: number
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

    this.eventMode = 'static'
    this.on('click', this.changeType)
  }

  private createCell(props?: CreateCell) {
    this.clear()
    this.rect(
      0,
      0,
      this.cellWidth,
      this.cellHeight
    ).fill({
      color: props?.color ?? 0xffffff,
      alpha: props?.alpha ?? 0.5
    }).stroke({
      width: this.border,
      color: props?.strokeColor ?? 0xffea00
    })
    this.x = this.cellWidth * this.index[1]
    this.y = this.cellHeight * this.index[0]
  }

  private createIndexText() {
    const text = new Text({
      label: 'index',
      text: `[${this.index[0]}, ${this.index[1]}]`,
      style: {
        fill: 0xffffff,
        fontSize: 16
      },
    })
    text.anchor.x = 0.5
    text.anchor.y = 0.5
    text.x = this.width / 2
    text.y = this.height / 2

    this.addChild(text)
  }

  private changeTextColor(color: number) {
    const text = this.getChildByLabel('index') as Text
    text.style.fill = color
  }

  private changeType() {
    if (this.type === 'default') {
      this.changeTypeTo('origin')
      return;
    }

    if (this.type === 'origin') {
      this.changeTypeTo('destination')
      return;
    }

    if (this.type === 'destination') {
      this.changeTypeTo('wall')
      return;
    }

    if (this.type === 'wall') {
      this.changeTypeTo('recharger')
      return;
    }

    if (this.type === 'recharger') {
      this.changeTypeTo('default')
      return;
    }
  }

  public changeTypeTo(type: CellType) {
    this.type = type
    switch(type) {
      case "origin":
        this.createCell({
          color: 0x00ffff,
          alpha: 1
        })
        this.changeTextColor(0x000000)
        break
      case 'destination':
        this.createCell({
          color: 0x00ff00,
          alpha: 1
        })
        this.changeTextColor(0x000000)
        break
      case 'wall':
        this.createCell({
          color: 0x000000,
          alpha: 1
        })
        this.changeTextColor(0xffffff)
        break;
      case 'recharger':
        this.createCell({
          color: 0xffff00,
          alpha: 1
        })
        this.changeTextColor(0x000000)
        break;
      case 'checkedPath':
        this.createCell({
          color: 0xff00ff,
          alpha: 0.5
        })
        this.changeTextColor(0xffffff)
        break;
      case 'path':
        this.createCell({
          color: 0xff00ff,
          alpha: 1
        })
        this.changeTextColor(0xffffff)
        break;
      case 'default':
      default:
        this.createCell()
        this.changeTextColor(0xffffff)
        break      
    }
  }
}