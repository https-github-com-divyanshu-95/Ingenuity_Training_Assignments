import * as PIXI from "pixi.js"
import Sprite = PIXI.Sprite;

import {GameProperties} from "./utilities/GameProperties";
import {Game} from "./GameLoop";
import IRendererOptions = PIXI.IRendererOptions;

function onLoad(): void {
    PIXI.loader
        .add("./images/snakeGame.json")
        .add("./images/new-game.png")
        .load(setup);

    function setup(): void {
        let rendererOptions: IRendererOptions = {
            antialias: true,
            transparent: true,
            resolution: 1
        };
        let renderer = PIXI.autoDetectRenderer(
            GameProperties.CANVAS_WIDTH,
            GameProperties.CANVAS_HEIGHT,
            rendererOptions);

        document.body.appendChild(renderer.view);

        gameLoop(new Game(renderer));
    }

    function gameLoop(game: Game): void {
        requestAnimationFrame(() => gameLoop(game));
        game.update();
        game.render();
    }
}

window.onload = () => onLoad();
