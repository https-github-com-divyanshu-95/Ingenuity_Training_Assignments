import * as PIXI from "pixi.js"


import Graphics = PIXI.Graphics;
import Rectangle = PIXI.Rectangle;
import Sprite = PIXI.Sprite;
import Container = PIXI.Container;
import Texture = PIXI.Texture;
import { RenderableElement } from "../../utilities/RenderableElement";
import { GameProperties } from "../../utilities/GameProperties";
import { GameBoard } from '../components/GameBoard';

export class GameOverScene implements RenderableElement {

    public snakeSpeed = 5;
    public snakeInitialPosition = 68;

    private id: any;
    private sceneVisible: boolean;
    private stage: Container;

    constructor(sceneVisible: boolean) {
        this.sceneVisible = sceneVisible;
        let stage = this.buildScene(this.sceneVisible)
        this.stage = stage;
    }
    private buildScene(sceneVisible: boolean) {
        let gameOverScene = new PIXI.Container();
        gameOverScene.visible = sceneVisible;
        let message = new PIXI.Text(
            "Game Over!",
            { fontSize: "24px", fill: "white" }
        );
        message.x = GameProperties.gameOverMsgPositionX;
        message.y = GameProperties.gameOverMsgPositionY;
        gameOverScene.addChild(message);

        //load the new game sprite
        let newGameButtonSprite = new PIXI.Sprite(
            PIXI.loader.resources["./images/new-game.png"].texture
        );
        newGameButtonSprite.position.y = 440;
        gameOverScene.addChild(newGameButtonSprite);

        return gameOverScene;
    }

    public getStage(): PIXI.Container {
        return this.stage;
    }

}