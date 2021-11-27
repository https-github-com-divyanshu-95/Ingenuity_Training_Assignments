import { Application, Container, DEG_TO_RAD, Text, Graphics} from "pixi.js";
import gsap from 'gsap'
import {Slice} from './slice'
import {sliceData} from './sliceData'

const pnt = <HTMLSpanElement>document.getElementById('points')
const card = <HTMLElement>document.getElementById('card')
const closeCard = <HTMLElement>document.getElementById('close')
closeCard.addEventListener('click', () => {
  card.style.display = "none"
})

const app = new Application({
  width: 590,
  height: 575,
  resolution: 1,
  antialias: true,
  transparent: true,
  view: document.getElementById('my-can') as HTMLCanvasElement
})

const con = new Container();
con.position.set(288, 288)

const arr: number[] =[]
const prob: number[] = [50, 40, 30, 20, 10, 5, 2.5, 1.25] // weights according to prob


for(let i=0; i<sliceData.slices; ++i){
  const slice = new Slice(i, sliceData.radius, 360/sliceData.slices, sliceData.sliceColors[i], sliceData.points[i]);
  arr.push((i+1)*(360/sliceData.slices)) // 45, 90, 135, .... 360
  con.addChild(slice)
}

const text = new Text("SPIN", {
  fontFamily: "open-sans",
  fill : 0xff00ff
})
text.position.set(260, 275)

const g = new Graphics();
g.lineStyle(5, 0xffffff, 1);//circle outlone
g.beginFill(0xb8b4b4);
g.drawCircle(0, 0, 45)
g.position.set(288, 288)

const pin = new Graphics();
pin.beginFill(0xf52525);
pin.moveTo(550, 180);
pin.lineTo(575, 150);
pin.lineTo(589, 182);
pin.endFill();
pin.closePath();

app.stage.addChild(con, g, text,pin)//con=container,g=spin (circle),text=spin,pin=pin rotate around wheel

app.stage.interactive = true
app.stage.on("pointerdown", (e: any) => {
  spin()
})
app.stage.on("mouseover", (e: any) => {
  app.stage.cursor = "pointer"
})

function spin(){
  const ran: number = getRandNumByProb(arr, prob, arr.length-1)
  gsap.fromTo(con, 
    {rotation: 0},
    {
      duration: 1, 
      rotation: -DEG_TO_RAD*(3600 + ran), 
      ease: "sine.out",
      onComplete: ()=> {
        let ind = (ran)/45 + 1;
        console.log(ind)
        pnt.innerText = sliceData.points[ind]
        card.style.display = "block"
      }
    },
    )
}

function getRandNumByProb(arr: number[], freq: number[],  n: number): number {
  
  let prefix= [];
  let i;
  prefix[0] = freq[0];
  for (i = 1; i < n; ++i)
      prefix[i] = prefix[i - 1] + freq[i];

  let r = Math.floor((Math.random()* prefix[n - 1])) + 1;
  let indexc =findCeil(prefix, r, 0, n - 1);
  
  return arr[indexc];
}

function findCeil(arr: number[], r: number, l: number, h: number): number{
  let mid;
  while (l < h)
  {
      mid = l + ((h - l) >> 1); 
      (r > arr[mid]) ? (l = mid + 1) : (h = mid);
  }
  return (arr[l] >= r) ? l : -1;
}