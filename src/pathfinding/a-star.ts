import { Grid } from "../grid/grid";

type Directions = {
  direction: string
  moveTo: {
    row: number,
    column: number
  }
}

type Node = {
  row: number
  column: number
  amountOfOperations: number
  distanceFromDestination: number
  cost: number
}

export class AStar {
  grid: Grid

  constructor(grid: Grid) {
    this.grid = grid;
  }

  findBestPath() {
    const directions: Directions[] = [
      {
        direction: "N",
        moveTo: {
          row: -1,
          column: 0
        }
      },
      {
        direction: "S",
        moveTo: {
          row: 1,
          column: 0
        }
      },
      {
        direction: "L",
        moveTo: {
          row: 0,
          column: 1
        }
      },
      {
        direction: "O",
        moveTo: {
          row: 0,
          column: -1
        }
      }
    ]

    const originCell = this.grid.getOriginCell()
    const destinationCell = this.grid.getDestinationCell()

    if (!originCell || !destinationCell) {
      return
    }

    const pathTaken: Node[] = []

    const initialDistance = this.calculateDistanceBetweenPoints({
      xA: destinationCell.index[0],
      yA: destinationCell.index[1],
      xB: originCell.index[0],
      yB: originCell.index[1]
    })

    let currentNode: Node = {
      row: originCell.index[0],
      column: originCell.index[1],
      amountOfOperations: 0,
      distanceFromDestination: initialDistance,
      cost: initialDistance
    }
    while(currentNode.distanceFromDestination !== 0) {
      const newNodes = directions.map(direction => {
        const newRow = currentNode.row + direction.moveTo.row
        const newColumn = currentNode.column + direction.moveTo.column
        const hasCellAlreadyBeenVisited = pathTaken.find((path) => (
          path.row === newRow && path.column === newColumn
        ))
        const isInsideRowsGrid = newRow >= 0 && newRow < this.grid.rows
        const isInsideColumnsGrid = newColumn >= 0 && newColumn < this.grid.columns

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
            amountOfOperations,
            distanceFromDestination,
            cost
          }

          
          this.grid.cells[newNode.row][newNode.column].changeTypeTo('checkedPath')

          return newNode
        }
      }).filter(newNode => newNode !== undefined)

      let bestNode = newNodes[0]
      newNodes.forEach(newNode => {
        if (newNode.cost < bestNode.cost) {
          bestNode = newNode
        }
      })

      currentNode = bestNode
      pathTaken.push(bestNode)
      console.log(bestNode)
    }

    pathTaken.forEach((path) => (
      this.grid.cells[path.row][path.column].changeTypeTo('path')
    ))
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
}

