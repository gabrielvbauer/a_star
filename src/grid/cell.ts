import { Graphics, PointData, Text } from "pixi.js"

export type CellType = 'default' | 'origin' | 'destination' | 'wall' | 'recharger' | 'checkedPath' | 'path' | 'explored'

type CellConstructor = {
  cellWidth: number
  cellHeight: number
  border: number
  row: number
  column: number
  type?: CellType
  onChangeCellType?: ((cell: Cell) => void) | undefined
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

  constructor({cellWidth, cellHeight, border, row, column, onChangeCellType}: CellConstructor) {
    const pivotPoint: PointData = {
      x: cellWidth / 2,
      y: cellHeight / 2
    }

    super({
      interactive: true,
      pivot: pivotPoint
    })

    this.cellWidth = cellWidth
    this.cellHeight = cellHeight
    this.border = border
    this.index = [row, column]
    this.eventMode = 'static'

    this.createCell()
    this.createIndexText()
    this.createOperationsText()
    this.createDistanceText()
    this.createCostText()

    if (onChangeCellType) {
      this.on('click', () => onChangeCellType(this))
    } else {
      this.on('click', this.changeType)
    }

    this.on('mouseover', this.highlightCell)
    this.on('mouseleave', this.resetCellScale)
  }

  private createCell(props?: CreateCell) {
    this.clear()
    this.rect(
      0,
      0,
      this.cellWidth,
      this.cellHeight
    ).fill({
      color: props?.color ?? 0x2a2a2a,
      alpha: props?.alpha ?? 1 
    }).stroke({
      width: this.border,
      color: props?.strokeColor ?? 0x4f4f4f
    })
    this.x = (this.cellWidth * this.index[1]) + (this.cellWidth / 2)
    this.y = (this.cellHeight * this.index[0]) + (this.cellHeight / 2)
  }

  private createOperationsText() {
    const text = new Text({
      label: 'operations',
      text: `0`,
      style: {
        fill: 0xffffff,
        fontSize: 16
      },
      visible: false
    })
    text.anchor.x = 0.5
    text.anchor.y = 0.5
    text.x = 24
    text.y = 16

    this.addChild(text)
  }

  private createDistanceText() {
    const text = new Text({
      label: 'distance',
      text: `0`,
      style: {
        fill: 0xffffff,
        fontSize: 16
      },
      visible: false
    })
    text.anchor.x = 0.5
    text.anchor.y = 0.5
    text.x = this.cellWidth - 24
    text.y = 16

    this.addChild(text)
  }

  private createCostText() {
    const text = new Text({
      label: 'cost',
      text: `0`,
      style: {
        fill: 0xffffff,
        fontSize: 20
      },
      visible: false
    })
    text.anchor.x = 0.5
    text.anchor.y = 0.5
    text.x = this.cellWidth / 2
    text.y = this.cellHeight / 2

    this.addChild(text)
  }

  private createIndexText() {
    const text = new Text({
      label: 'index',
      text: `[${this.index[0]}, ${this.index[1]}]`,
      style: {
        fill: 0xffffff,
        fontSize: 16
      },
      visible: false
    })
    text.anchor.x = 0.5
    text.anchor.y = 0.5
    text.x = this.width / 2
    text.y = this.height - 20

    this.addChild(text)
  }

  private changeTextColor(color: number) {
    const indexText = this.getChildByLabel('index') as Text
    const operationsText = this.getChildByLabel('operations') as Text
    const distanceText = this.getChildByLabel('distance') as Text
    const costText = this.getChildByLabel('cost') as Text

    indexText.style.fill = color
    operationsText.style.fill = color
    distanceText.style.fill = color
    costText.style.fill = color
  }

  public setOperationsText({
    text,
  }: {
    text: string
  }) {
    const operationsText = this.getChildByLabel('operations') as Text
    operationsText.text = text
  }

  public setDistanceText({
    text,
  }: {
    text: string
  }) {
    const distanceText = this.getChildByLabel('distance') as Text
    distanceText.text = text
  }

  public setCostText({
    text,
  }: {
    text: string
  }) {
    const costText = this.getChildByLabel('cost') as Text
    costText.text = text
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
          alpha: 0.3
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
      case 'explored':
        this.createCell({
          color: 0xff00ff,
          alpha: 0.6
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

  private highlightCell() {
    this.scale.set(1.25)
    this.zIndex = 99
  }
  private resetCellScale() {
    this.scale.set(1)
    this.zIndex = 1
  } 
}