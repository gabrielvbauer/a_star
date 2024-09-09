import { Cell } from "../grid/cell";
import { Grid } from "../grid/grid";

interface FindBestPathConfigs {
  includeColateralDirections: boolean
}

type Directions = {
  direction: string
  type: 'cardeal' | 'colateral'
  moveTo: {
    row: number,
    column: number
  }
}

type Node = {
  row: number
  column: number
  type: 'origin' | 'destination' | 'path'
  amountOfOperations: number
  distanceFromDestination: number
  cost: number
}

export class AStar {
  private static instance: AStar
  grid: Grid

  constructor(grid: Grid) {
    this.grid = grid;
  }

  public static getInstance(grid?: Grid): AStar {
    if (!AStar.instance && grid) {
      AStar.instance = new AStar(grid)
    }
    return AStar.instance
  }

  async findBestPath({
    includeColateralDirections = false
  }: FindBestPathConfigs) {
    const directions = this.createDirections({
      includeColateralDirections
    });

    const originCell = this.grid.getOriginCell()
    const destinationCell = this.grid.getDestinationCell()

    if (!originCell || !destinationCell) {
      return
    }

    const pathTaken: Node[] = []

    let currentNode = this.createRootNode({
      originCell,
      destinationCell
    })
    pathTaken.push(currentNode)

    while (currentNode.distanceFromDestination !== 0) {
      // await new Promise(resolve => setTimeout(resolve, 500))

      const newNodes = directions.map(direction => (
        this.createNewNode({
          row: direction.moveTo.row,
          column: direction.moveTo.column,
          currentNode,
          pathTaken,
          destinationCell
        })
      )).filter(newNode => newNode !== undefined)

      console.log(newNodes)

      const bestNode = this.getBestNodeInTree({
        tree: newNodes
      })

      currentNode = bestNode
      pathTaken.push(bestNode)
      // await new Promise(resolve => setTimeout(resolve, 500))
      if (bestNode.type != 'destination') {
        this.colorizeBestNode(bestNode)
      }
    }

    this.colorizePathTaken({pathTaken})
  }

  calculateDistanceBetweenPoints({
    xA, yA, xB, yB
  }: {
    xA: number
    yA: number
    xB: number
    yB: number
  }) {
    const deltaA = Math.pow(xB - xA, 2)
    const deltaB = Math.pow(yB - yA, 2)
    return Math.sqrt(deltaA + deltaB)
  }

  private createRootNode({
    originCell,
    destinationCell
  }: {
    originCell: Cell,
    destinationCell: Cell
  }): Node {
    const initialDistance = this.calculateDistanceBetweenPoints({
      xA: destinationCell.index[0],
      yA: destinationCell.index[1],
      xB: originCell.index[0],
      yB: originCell.index[1]
    })

    return {
      row: originCell.index[0],
      column: originCell.index[1],
      type: 'origin',
      amountOfOperations: 0,
      distanceFromDestination: initialDistance,
      cost: initialDistance
    }
  }

  private createNewNode({
    row,
    column,
    currentNode,
    pathTaken,
    destinationCell
  }: {
    row: number,
    column: number,
    currentNode: Node,
    pathTaken: Node[],
    destinationCell: Cell
  }): Node | undefined {
    const newRow = currentNode.row + row
    const newColumn = currentNode.column + column

    const isInsideRowsGrid = newRow >= 0 && newRow < this.grid.rows
    const isInsideColumnsGrid = newColumn >= 0 && newColumn < this.grid.columns
    const hasCellAlreadyBeenVisited = pathTaken.find((path) => (
      path.row === newRow && path.column === newColumn
    ))

    if (isInsideRowsGrid && isInsideColumnsGrid && !hasCellAlreadyBeenVisited) {
      const amountOfOperations = currentNode.amountOfOperations + 1
      const distanceFromDestination = this.calculateDistanceBetweenPoints({
        xA: destinationCell.index[0],
        yA: destinationCell.index[1],
        xB: newRow,
        yB: newColumn
      })
      const cost = amountOfOperations + distanceFromDestination

      const newNode: Node = {
        row: newRow,
        column: newColumn,
        type: distanceFromDestination === 0 ? 'destination' : 'path',
        amountOfOperations,
        distanceFromDestination,
        cost
      }

      if (distanceFromDestination !== 0) {
        this.grid.cells[newNode.row][newNode.column].changeTypeTo('checkedPath')
      }

      return newNode
    }
  }

  private getBestNodeInTree({
    tree
  } : {
    tree: Node[]
  }): Node {
    let bestNode = tree[0]
    tree.forEach(newNode => {
      if (newNode.cost < bestNode.cost) {
        bestNode = newNode
      }
    })
    return bestNode
  }

  colorizeBestNode(node: Node) {
    this.grid.cells[node.row][node.column].changeTypeTo('path')
  }

  private colorizePathTaken({
    pathTaken
  }: {
    pathTaken: Node[]
  }) {
    pathTaken.filter((path) => (
      path.type === 'path'
    )).forEach((path) => (
      this.grid.cells[path.row][path.column].changeTypeTo('path')
    ))
  }

  private createDirections({
    includeColateralDirections
  }: {
    includeColateralDirections: boolean
  }) {
    let directions: Directions[] = [
      {
        direction: "N",
        type: 'cardeal',
        moveTo: {
          row: -1,
          column: 0
        }
      },
      {
        direction: "NO",
        type: 'colateral',
        moveTo: {
          row: -1,
          column: -1
        }
      },
      {
        direction: "O",
        type: 'cardeal',
        moveTo: {
          row: 0,
          column: -1
        }
      },
      {
        direction: "SO",
        type: 'colateral',
        moveTo: {
          row: 1,
          column: -1,
        }
      },
      {
        direction: "S",
        type: 'cardeal',
        moveTo: {
          row: 1,
          column: 0
        }
      },
      {
        direction: 'SE',
        type: 'colateral',
        moveTo: {
          row: 1,
          column: 1
        }
      },
      {
        direction: "L",
        type: 'cardeal',
        moveTo: {
          row: 0,
          column: 1
        }
      },
      {
        direction: "NE",
        type: 'colateral',
        moveTo: {
          row: -1,
          column: 1
        }
      }
    ]

    if (!includeColateralDirections) {
      directions = directions.filter((direction) => direction.type !== 'colateral')
    }

    return directions
  }
}

