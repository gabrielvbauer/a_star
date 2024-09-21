import { useState } from "react";
import { AStar } from "../../../pathfinding/a-star";
import { ConfigSection, ConfigSectionTitle, Container, HorizontalView, Input, InputLabel, StartAlgorithmButton } from "./styles";
import { Grid } from "../../../grid/grid";
import { Switch } from "../switch";

export function Menu() {
  const [rows, setRows] = useState(10)
  const [columns, setColumns] = useState(16)
  const [animate, setAnimate] = useState(false)
  const [animationVelocity, setAnimationVelocity] = useState(100)
  const [showValidatedCells, setShowValidatedCells] = useState(true)
  const [showExpandedCells, setShowExpandedCells] = useState(true)
  const [considerateColateralPoints, setConsiderateColateralPoints] = useState(true)

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

  function handleToggleIndexes(checked: boolean) {
    const gridInstance = Grid.getInstance()
    gridInstance.toggleCellsIndexes(checked)
  }

  function handleToggleAnimation(checked: boolean) {
    setAnimate(checked)
  }

  function handleToggleShowValidatedCells(checked: boolean) {
    setShowValidatedCells(checked)
  }

  function handleToggleShowExpandedCells(checked: boolean) {
    setShowExpandedCells(checked)
  }

  function handleToggleCalculations(checked: boolean) {
    const gridInstance = Grid.getInstance()
    gridInstance.toggleCellsCalculations(checked)
  }

  function handleToggleConsiderateColateralPoints(checked: boolean) {
    setConsiderateColateralPoints(checked)
  }

  function handleFindPath() {
    const aStar = AStar.getInstance()
    aStar.findBestPath({
      includeColateralDirections: considerateColateralPoints,
      animate,
      duration: animationVelocity,
      showValidatedCells,
      showExpandedCells,
    })
  }

  return (
    <Container>
      <ConfigSection>
        <ConfigSectionTitle>Grid</ConfigSectionTitle>
        <HorizontalView>
          <div>
            <InputLabel htmlFor="rows">Linhas</InputLabel>
            <Input
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
            <Input
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

      <ConfigSection>
        <ConfigSectionTitle>Animações</ConfigSectionTitle>

        <Switch label="Animar algoritmo" onCheckedChange={handleToggleAnimation} />
        <div>
          <InputLabel>Velocidade da animação</InputLabel>
          <Input
            type="number"
            id="animation-velocity"
            placeholder="100ms"
            value={animationVelocity}
            onChange={(e) => setAnimationVelocity(Number(e.target.value))}
          />
        </div>
      </ConfigSection>

      <ConfigSection>
        <ConfigSectionTitle>Algoritmo</ConfigSectionTitle>

        <Switch label="Considerar pontos colaterais" onCheckedChange={handleToggleConsiderateColateralPoints} defaultChecked={true} />
        <Switch label="Mostrar cálculos" onCheckedChange={handleToggleCalculations} defaultChecked={false} />
      </ConfigSection>

      <ConfigSection>
        <ConfigSectionTitle>Extra</ConfigSectionTitle>

        <Switch label="Mostrar índices" onCheckedChange={handleToggleIndexes} />
        <Switch label="Pintar células verificadas" onCheckedChange={handleToggleShowValidatedCells} defaultChecked={true} />
        <Switch label="Pintar células expandidas" onCheckedChange={handleToggleShowExpandedCells} defaultChecked={true} />
      </ConfigSection>
      <StartAlgorithmButton onClick={handleFindPath}>
        Encontrar caminho
      </StartAlgorithmButton>
    </Container>
  )
}