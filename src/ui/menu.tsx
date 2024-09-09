import { AStar } from "../pathfinding/a-star";
import { Container, StartAlgorithmButton } from "./styles";

export function Menu() {
  function handleFindPath() {
    const aStar = AStar.getInstance()
    aStar.findBestPath({
      includeColateralDirections: true
    })
  }

  return (
    <Container>
      <StartAlgorithmButton onClick={handleFindPath}>
        Encontrar caminho
      </StartAlgorithmButton>
    </Container>
  )
}