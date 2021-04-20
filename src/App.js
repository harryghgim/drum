import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRef, useState } from 'react'
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

function Message(props) {

  const id = props.show ? 'show' : 'hide'
  return (
    <Alert variant="danger" id={id} className="message">
      <Alert.Heading>qweasdzxc only</Alert.Heading>
    </Alert>
  )    

}

function App() {

  const MAP = {
    '81': 'Q',  
    '87': 'W',
    '69': 'E',
    '65': 'A',
    '83': 'S',
    '68': 'D',
    '90': 'Z',
    '88': 'X',
    '67': 'C'
 }
 
 const [show, setShow] = useState(false)

  const handleKeyDown = (e) => {

    const audioEl = document.getElementById(MAP[e.keyCode])
    
    if (audioEl) {
      setShow(false)
      const promise = audioEl.play()
      if (promise !== undefined) {
        promise
          .then(_ => {
            document.getElementById("display").innerHTML = audioEl.textContent
            audioEl.parentElement.style.backgroundColor = 'rgb(67, 87, 87)'
            audioEl.parentElement.style.borderColor = 'rgb(67, 87, 87)'
          })
          .catch(error => {
            console.log(error)
          })
      }
    } 
    else {      
      setShow(true)
    }
  }

  const handleKeyUp = (e) => {
    const audioEl = document.getElementById(MAP[e.keyCode])
    if (audioEl) {
      const btnEl = audioEl.parentElement
      btnEl.style.backgroundColor = "#6c757d"
      btnEl.style.borderColor = "#6c757d"
    }
  }

  window.onkeydown = handleKeyDown
  window.onkeyup =  handleKeyUp
  
  return (
  <div>
    <Message show={show}/>
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
  </div>
  )
}

export default App;
