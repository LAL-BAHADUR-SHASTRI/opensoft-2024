import './App.css'
import { Button } from './components/ui/button'
import useWindowDimensions from './hooks/useWindowDimensions'

function App() {

  const {height, width} = useWindowDimensions();

  return (
    <div style={{ height: height, backgroundColor: 'gray'}}>
      <Button style={{ margin: '50%'}}> hello </Button>
    </div>
  )
}

export default App
