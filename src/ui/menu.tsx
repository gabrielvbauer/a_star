import { useState } from "react";
import { AStar } from "../pathfinding/a-star";
import { ConfigSection, ConfigSectionTitle, Container, GridSizeInput, HorizontalView, InputLabel, StartAlgorithmButton } from "./styles";
import { Grid } from "../grid/grid";

export function Menu() {
  const [rows, setRows] = useState(10)
  const [columns, setColumns] = useState(16)

  function handleChangeRows() {
    const columnsValue = Math.trunc(rows * (16/9))
    const gridInstance = Grid.getInstance()
    gridInstance.generateGrid({
      rows,
      columns: columnsValue
    })
    gridInstance.setRows(rows)
    gridInstance.setColumns(columnsValue)
    setColumns(columnsValue)
  }

  function handleFindPath() {
    const aStar = AStar.getInstance()
    aStar.findBestPath({
      includeColateralDirections: true
    })
  }

  return (
    <Container>
      <ConfigSection>
        <ConfigSectionTitle>Grid</ConfigSectionTitle>
        <HorizontalView>
          <div>
            <InputLabel htmlFor="rows">Linhas</InputLabel>
            <GridSizeInput
              type="number"
              name="rows"
              id="rows"
              placeholder="9"
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
              onBlur={handleChangeRows}
            />
          </div>
          <div>
            <InputLabel htmlFor="columns">Colunas</InputLabel>
            <GridSizeInput
              type="number"
              name="columns"
              id="columns"
              placeholder="16"
              value={columns}
              disabled
            />
          </div>
        </HorizontalView>
      </ConfigSection>
      <StartAlgorithmButton onClick={handleFindPath}>
        Encontrar caminho
      </StartAlgorithmButton>
    </Container>
  )
}