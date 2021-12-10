

import * as PIXI from 'pixi.js';
import { config } from './config';
import PlayButton from './components/PlayButton';
import Reels from './components/Reels';

import './style.css';

const { gameWidth, gameHeight } = config;

function createApplication(): PIXI.Application {
  const app = new PIXI.Application({
    backgroundColor: 0xd3d3d3,
    width: gameWidth,
    height: gameHeight
  });
  app.renderer.resize(window.innerWidth, window.innerHeight);
  app.stage.scale.x = window.innerWidth / gameWidth;
  app.stage.scale.y = window.innerHeight / gameHeight;
  window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    app.stage.scale.x = window.innerWidth / gameWidth;
    app.stage.scale.y = window.innerHeight / gameHeight;
  });
  return app;
}

function loadAssets(onComplete: () => void): void {
  const loader = PIXI.Loader.shared;
  loader.onComplete.once(onComplete);
  loader.load();
}

function render(app: PIXI.Application) {
  document.body.appendChild(app.view);
}

window.onload = () =>
  loadAssets(() => {
    const app = createApplication();
    const stage = app.stage;

    const button = new PlayButton(config);
    stage.addChild(button);


    const reels = new Reels(config, app.ticker);
    stage.addChild(reels);


    button.on('click', function (this: PlayButton) {
      if (!reels.areSpinning()) {
        this.setDisabled();
        reels.spin(() => {
          this.setInactive();
        });
      }
    });


    render(app);
  });
