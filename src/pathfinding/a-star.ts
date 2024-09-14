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
  parent: Node | null
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

    const listToExplore: Node[] = []
    const listExplored: Node[] = []

    let currentNode = this.createRootNode({
      originCell,
      destinationCell
    })
    listToExplore.push(currentNode)

    while (listToExplore.length > 0) {
      await new Promise(resolve => setTimeout(resolve, 100))
      currentNode = this.getBestNodeInTree({
        tree: listToExplore
      })

      if (currentNode.distanceFromDestination === 0) {
        this.colorizeExploredNodes(listExplored.concat(currentNode))
        this.colorizePathTaken({ finalNode: currentNode })
        return;
      }

      listToExplore.splice(listToExplore.indexOf(currentNode), 1)
      listExplored.push(currentNode)

      const newNodes = directions.map(direction => (
        this.createNewNode({
          row: direction.moveTo.row,
          column: direction.moveTo.column,
          currentNode,
          pathTaken: listExplored,
          destinationCell
        })
      )).filter(newNode => newNode !== undefined)

      newNodes.forEach(newNode => {
        const nodeInListToExplore = listToExplore.find(node => {
          return node.row === newNode.row && node.column === newNode.column
        })
        const nodeInListExplored = listExplored.find(node => {
          return node.row === newNode.row && node.column === newNode.column
        })

        if (!nodeInListToExplore && !nodeInListExplored) {
          listToExplore.push(newNode)
        } else if (nodeInListToExplore && newNode.cost < nodeInListToExplore.cost) {
          nodeInListToExplore.cost = newNode.cost
        }
      })
    }
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
      cost: initialDistance,
      parent: null
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

    const cellBeingChecked = this.grid.getCell({
      row: newRow,
      column: newColumn
    })

    if (!cellBeingChecked) {
      return
    }

    const isInsideRowsGrid = newRow >= 0 && newRow < this.grid.rows
    const isInsideColumnsGrid = newColumn >= 0 && newColumn < this.grid.columns
    const hasCellAlreadyBeenVisited = pathTaken.find((path) => (
      path.row === newRow && path.column === newColumn
    ))

    const isCellNotBlocked = cellBeingChecked.type !== 'wall'

    if (
      isInsideRowsGrid &&
      isInsideColumnsGrid &&
      !hasCellAlreadyBeenVisited &&
      isCellNotBlocked
    ) {
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
        cost,
        parent: currentNode
      }

      if (distanceFromDestination !== 0) {
        this.grid.cells[newNode.row][newNode.column].changeTypeTo('checkedPath')
      }

      return newNode
    }
  }

  private getBestNodeInTree({
    tree
  }: {
    tree: Node[]
  }): Node {
    let bestNode = tree[0]
    tree.forEach(node => {
      if (node.cost < bestNode.cost) {
        bestNode = node
      }
    })
    return bestNode
  }

  private async colorizePathTaken({
    finalNode
  }: {
    finalNode: Node
  }) {
    let currentNode: Node | null = finalNode

    while (currentNode) {
      await new Promise(resolve => setTimeout(resolve, 100))

      if (currentNode.type === 'path') {
        this.grid.cells[currentNode.row][currentNode.column].changeTypeTo('path')
      }

      currentNode = currentNode.parent
    }
  }

  private colorizeExploredNodes(exploredNodes: Node[]) {
    exploredNodes.filter(node => {
      return node.type !== 'origin' && node.type !== 'destination'
    }).forEach(node => {
      this.grid.cells[node.row][node.column].changeTypeTo('explored')
    })
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

