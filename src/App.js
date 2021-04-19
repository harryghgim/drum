import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRef, useEffect } from 'react'
import './App.scss'

function DrumPad(props) {
  const audioRef = useRef(null);
  const padId = `button-${props.k}`

  const handleClick = (e) => {
    audioRef.current.play()
    document.getElementById('display').innerHTML = audioRef.current.textContent
  }
  
  return (
    <Button 
      id={padId}
      className="drum-pad mr-2" 
      onClick={handleClick}
      variant="secondary"
      size="lg"
    >
      {props.k}
      <audio 
        className="clip" 
        src={`audio/${props.k.toLowerCase()}.wav`}
        id={props.k}
        ref={audioRef}
      >{props.description}
      </audio>
    </Button>
  )
}

function App() {

  const handleKeyDown = (e) => {

    const k = e.key.toUpperCase()
    const audioEl = document.getElementById(k)
    
    if (audioEl) {
      const promise = audioEl.play()
      if (promise !== undefined) {
        promise
          .then(_ => {
            document.getElementById("display").innerHTML = audioEl.textContent
          })
          .catch(error => {
            console.log(error)
          })
      }
    } 
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
  })
  

  return (
    <Jumbotron id="drum-machine">
      <Container id="pad-wrapper">
        <div>
          <DrumPad k="Q" description="Crash"/>
          <DrumPad k="W" description="Hh Close"/>
          <DrumPad k="E" description="Low Conga"/>
        </div>
        <div>
          <DrumPad k="A" description="Bd"/> 
          <DrumPad k="S" description="Clap"/> 
          <DrumPad k="D" description="Ho"/> 
        </div>
        <div>
          <DrumPad k="Z" description="Ma"/> 
          <DrumPad k="X" description="Sd"/> 
          <DrumPad k="C" description="Bongo"/>  
        </div>
      </Container>
      <Container id="display">
        Crash
      </Container>
    </Jumbotron>
  )
}

export default App;
