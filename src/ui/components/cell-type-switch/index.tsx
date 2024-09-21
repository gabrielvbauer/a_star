import { Ban, Goal, House, Route, Zap } from "lucide-react";
import { Button, Container } from "./styles";
import { useEffect, useState } from "react";
import { Grid } from "../../../grid/grid";
import { CellType } from "../../../grid/cell";

export type PossibleCellTypes = Extract<CellType, 'origin' | 'destination' | 'default' | 'wall' | 'recharger'>

export function CellTypeSwitch() {
  const gridInstance = Grid.getInstance();
  const [selectedType, setSelectedType] = useState<PossibleCellTypes>('default')

  useEffect(() => {
    gridInstance.changeSelectedType(selectedType)
  }, [selectedType, gridInstance])

  return (
    <Container>
      <Button
        data-selected={selectedType === 'default'}
        onClick={() => setSelectedType('default')}
      >
        <Route width={24} height={24} color="#fafafa" />
      </Button>
      <Button
        data-selected={selectedType === 'wall'}
        onClick={() => setSelectedType('wall')}
      >
        <Ban width={24} height={24} color="#fafafa" />
      </Button>
      <Button
        data-selected={selectedType === 'recharger'}
        onClick={() => setSelectedType('recharger')}
      >
        <Zap width={24} height={24} color="#fafafa" />
      </Button>
      <Button
        data-selected={selectedType === 'origin'}
        onClick={() => setSelectedType('origin')}
      >
        <House width={24} height={24} color="#fafafa" />
      </Button>
      <Button
        data-selected={selectedType === 'destination'}
        onClick={() => setSelectedType('destination')}
      >
        <Goal width={24} height={24} color="#fafafa" />
      </Button>
    </Container>
  )
}