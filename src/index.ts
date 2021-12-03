import {Application, ParticleContainer, Container} from "pixi.js"
import * as particles from "@pixi/particle-emitter"
import {gsap} from "gsap";
const app = new Application({
    width: 1300,
    height: 600,
    antialias: true,

    resolution:1
})

document.body.appendChild(app.view)

app.loader.add("gold-coins", "https://pixijs.io/particle-emitter/examples/images/gold_anim.json")
.add('pop', "https://pixijs.io/particle-emitter/examples/images/pop_anim.json")
.add("bubble", "https://pixijs.io/particle-emitter/examples/images/Bubbles99.png")
.add('snow', "https://pixijs.io/particle-emitter/examples/images/Snow100.png")
.add('sparks',"https://pixijs.io/particle-emitter/examples/images/Sparks.png")
.add("diamond","https://cdn-icons.flaticon.com/png/512/3109/premium/3109989.png?token=exp=1638432694~hmac=8dc8d046eb9d0a4cb29e02a2e6ddfe5b")
.load((l, r) => {

  const container = new Container();
  app.stage.addChild(container);
  //bottom to top
  const pConfig: particles.EmitterConfigV3 = {
    lifetime: {
      min: 1.75,
      max: 2.5,
    },
    ease: [
      {
        s: 0,
        cp: 0.379,
        e: 0.548,
      },
      {
        s: 0.548,
        cp: 0.717,
        e: 0.676,
      },
      {
        s: 0.676,
        cp: 0.635,
        e: 1,
      },
    ],
    frequency: 0.005,
    emitterLifetime: 0,
    maxParticles: 500,
    addAtBack: false,
    pos: {
      x: app.screen.width / 2,
      y: app.screen.height ,
    },
    "behaviors": [
      {
        "type": "alpha",
        "config": {
          "alpha": {
            "list": [
              {
                "time": 0,
                "value": 1
              },
              {
                "time": 1,
                "value": 0.31
              }
            ]
          }
        }
      },
      {
        "type": "moveSpeed",
        "config": {
          "speed": {
            "list": [
              {
                "time": 0,
                "value": 1000
              },
              {
                "time": 1,
                "value": 200
              }
            ]
          }
        }
      },
      {
        "type": "scale",
        "config": {
          "scale": {
            "list": [
              {
                "time": 0,
                "value": 0.5
              },
              {
                "time": 1,
                "value": 1
              }
            ]
          },
          "minMult": 1
        }
      },
      {
        "type": "color",
        "config": {
          "color": {
            "list": [
              {
                "time": 0,
                "value": "ffffff"
              },
              {
                "time": 1,
                "value": "9ff3ff"
              }
            ]
          }
        }
      },
      {
        "type": "rotation",
        "config": {
          "accel": 0,
          "minSpeed": 0,
          "maxSpeed": 20,
          "minStart": 225,
          "maxStart": 320
        }
      },
      {
        "type": "textureRandom",
        "config": {
          "textures": [
            "https://pixijs.io/particle-emitter/examples/images/Sparks.png"
          ]
        }
      },
      {
        "type": "spawnShape",
        "config": {
          "type": "torus",
          "data": {
            "x": 0,
            "y": 0,
            "radius": 0,
            "innerRadius": 0,
            "affectRotation": false
          }
        }
      }
    ],
  };
  //top to bottom
  const pConfig4:particles.EmitterConfigV3={
    "lifetime": {
      "min": 0.81,
      "max": 0.81
    },
    "frequency": 0.04,
    "emitterLifetime": 0,
    "maxParticles": 1000,
    "addAtBack": false,
    "pos": {
      "x": 0,
      "y": 0
    },
    "behaviors": [
      {
        "type": "alphaStatic",
        "config": {
          "alpha": 0.5
        }
      },
      {
        "type": "moveSpeedStatic",
        "config": {
          "min": 3000,
          "max": 3000
        }
      },
      {
        "type": "scaleStatic",
        "config": {
          "min": 1,
          "max": 1
        }
      },
      {
        "type": "rotationStatic",
        "config": {
          "min": 65,
          "max": 65
        }
      },
      {
        "type": "textureRandom",
        "config": {
          "textures": [
            "snow",
            "snow"
          ]
        }
      },
      {
        "type": "spawnShape",
        "config": {
          "type": "rect",
          "data": {
            "x": -600,
            "y": -460,
            "w": 1000,
            "h": 20
          }
        }
      }
    ]
  }
  const pConfig3: particles.EmitterConfigV3 = {
    lifetime: {
      min: 1.75,
      max: 2.5,
    },
    ease: [
      {
        s: 0,
        cp: 0.379,
        e: 0.548,
      },
      {
        s: 0.548,
        cp: 0.717,
        e: 0.676,
      },
      {
        s: 0.676,
        cp: 0.635,
        e: 1,
      },
    ],
    frequency: 0.09,
    emitterLifetime: 0,
    maxParticles: 500,
    addAtBack: false,
    pos: {
      x: app.screen.width / 2,
      y: app.screen.height ,
    },
    behaviors: [
      {
        type: "alpha",
        config: {
          alpha: {
            list: [
              {
                time: 0,
                value: 1,
              },
              {
                time: 1,
                value: 0.5,
              },
            ],
          },
        },
      },
      {
        type: "moveAcceleration",
        config: {
          accel: {
            x: 0,
            y: 750,
          },
          minStart: 900,
          maxStart: 1000,
          rotate: true,
        },
      },
      {
        type: "scale",
        config: {
          scale: {
            list: [
              {
                time: 0,
                value: 0.25,
              },
              {
                time: 1,
                value: 0.35,
              },
            ],
          },
          minMult: 1,
        },
      },
      {
        type: "rotation",
        config: {
          accel: 0,
          minSpeed: 50000,
          maxSpeed: 700000,
          minStart: -20,
          maxStart: 0,
        },
      },
      {
        type: "animatedRandom",
        config: {
          anims: [
            {
              framerate: 20,
              loop: true,
              textures: [
                "diamond",
              ],
            },
            {
              framerate: 20,
              loop: true,
              textures: [
                "diamond",
              ],
            },
          ],
        },
      },
      {
        type: "spawnShape",
        config: {
          type: "torus",
          data: {
            x: -650,
            y: -300,
            radius: 5,
            innerRadius: 0,
            affectRotation: false,
          },
        },
      },
    ],
  };
  const pConfig2: particles.EmitterConfigV3 = {
    lifetime: {
      min: 1.75,
      max: 2.5,
    },
    ease: [
      {
        s: 0,
        cp: 0.379,
        e: 0.548,
      },
      {
        s: 0.548,
        cp: 0.717,
        e: 0.676,
      },
      {
        s: 0.676,
        cp: 0.635,
        e: 1,
      },
    ],
    frequency: 0.005,
    emitterLifetime: 0,
    maxParticles: 500,
    addAtBack: false,
    pos: {
      x: app.screen.width,
      y: app.screen.height,
    },
    behaviors: [
      {
        type: "alpha",
        config: {
          alpha: {
            list: [
              {
                time: 0,
                value: 1,
              },
              {
                time: 1,
                value: 0.5,
              },
            ],
          },
        },
      },
      {
        type: "moveAcceleration",
        config: {
          accel: {
            x: 0,
            y: 750,
          },
          minStart: 900,
          maxStart: 1000,
          rotate: true,
        },
      },
      {
        type: "scale",
        config: {
          scale: {
            list: [
              {
                time: 0,
                value: 0.25,
              },
              {
                time: 1,
                value: 0.35,
              },
            ],
          },
          minMult: 1,
        },
      },
      {
        type: "rotation",
        config: {
          accel: 10,
          minSpeed: 0,
          maxSpeed: 250,
          minStart: 250,
          maxStart: 240,
        },
      },
      {
        type: "animatedRandom",
        config: {
          anims: [
            {
              framerate: 30,
              loop: true,
              textures: ["snow"],
            },
            {
              framerate: 20,
              loop: true,
              textures: ["bubble"],
            },
            {
              framerate: 20,
              loop: false,
              textures: [
                "Bubbles99.png",
                "Bubbles99.png",
                "Bubbles99.png",
                "Bubbles99.png",
                "Bubbles99.png",
                "Bubbles99.png",
                "Bubbles99.png",
                "fountain.png",
                "Bubbles99.png",
                "Bubbles99.png",
                "Bubbles99.png",
                "Bubbles99.png",
                "Bubbles99.png",
                "Bubbles99.png",
                "Bubbles99.png",
                "Bubbles99.png",
                "Bubbles99.png",
                "Bubbles99.png",
                "Pop1.png",
                "Pop2.png",
                "Pop3.png",
                "gold_1.png",
              ],
            },
          ],
        },
      },
      {
        type: "spawnShape",
        config: {
          type: "torus",
          data: {
            x: 200,
            y: 0,
            radius: 5,
            innerRadius: 0,
            affectRotation: false,
          },
        },
      },
    ],
  };
  const emiter = new particles.Emitter(container, pConfig);
  const emiter2 = new particles.Emitter(container, pConfig2);
  const emiter3=new particles.Emitter(container,pConfig3);
  const emiter4=new particles.Emitter(container,pConfig4);
  // emiter4.rotate(90);
  // console.log(emiter4);
  
  // emiter.emit=false;
  // emiter2.emit=false;
  // emiter3.emit=false;
  // emiter4.emit=false;
  // emiter3.rotate(2);
  app.ticker.add((delta) => {
    emiter.update(delta  * 0.005);
    emiter2.update(delta * 0.005);
    emiter3.update(delta * 0.005);
    emiter4.update(delta * 0.005);

  });
  (<HTMLInputElement>document.querySelector("#start")).onclick = () => {
    emiter.emit = true;
    emiter2.emit = true;
    emiter3.emit = true;
    emiter4.emit = true;
  };
  const stop = (<HTMLInputElement>document.querySelector("#stop"));
  stop.onclick = () => {
    emiter.emit = false;
    emiter2.emit = false;
    emiter3.emit = false;
    emiter4.emit = false;
  };
  const controlsDiv = (<HTMLInputElement>document.querySelector("#controls"));
  gsap.fromTo(controlsDiv, {top:0}, {top:700, duration:5, ease: "bounce.out", repeat:-1, yoyo:true, repeatDelay:2, yoyoEase: 'elastic.out'});

  // window.onclick = () => {
  //   emiter.emit = false;
  //   emiter2.emit = false;
  //   emiter3.emit=false;
  //   emiter4.emit=false;
  // };
})