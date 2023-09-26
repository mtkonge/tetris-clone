import { Graphics } from './Graphics'
import './style.css'

function main() {
  const graphics = new Graphics("game")
  graphics.drawSquare({x: 0,y:0}, "blue")
  graphics.drawRectangle({x:0,y:60}, "red")

  
}

main()