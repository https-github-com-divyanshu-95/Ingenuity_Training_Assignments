import * as PIXI from "pixi.js"
import Texture = PIXI.Texture;
import DisplayObject = PIXI.DisplayObject;
import Container = PIXI.Container;
import Graphics = PIXI.Graphics;
import { RenderableElement } from "../../utilities/RenderableElement";
import { UpdateableElement } from "../../utilities/UpdateableElement";
import { CheckForWall } from '../../utilities/checkForWallCollision';
import { PlayerHitsFood } from '../../utilities/checkForPlayerHitsFood';
import { GameProperties } from '../../utilities/GameProperties';
import { GameScene } from "../stages/gameScene";
import { GameOverScene } from "../stages/gameOverScene";
export class GameBoard implements RenderableElement, UpdateableElement {
    private gameScene: GameScene;
    private gameOverScene: GameOverScene;
    private stage: PIXI.Container;
    private snakeX: number = 100;
    private snakeY: number = 150;
    private numberOfBlocks: number = 10;
    private foodPosX: number = 150;
    private foodPosY: number = 250;
    private gameOverSceneVisible: boolean = false;
    private gameSceneVisible: boolean = true;
    private direction: number = 0;
    private snakeHitsFood: boolean = false;
    private score: number = 0;
    private speed: number = 3;
    private snakeBody: any;
    private snakeHead: any;

    private foodSprite: any;
    private food: any;

    private keyCodeToDirs: any = {
        "37": 2,
        "38": 3,
        "39": 0,
        "40": 1
    };
    private dirDeltas = [{
        "x": +this.speed,
        "y": 0
    }, {
        "x": 0,
        "y": +this.speed
    }, {
        "x": -this.speed,
        "y": 0
    }, {
        "x": 0,
        "y": -this.speed
    }];
    public update(): void {
        if (this.snakeBody && this.foodSprite) {
            this.snakeHead = this.snakeBody[0];
            this.food = this.foodSprite[0];
            //eat food by snake
            this.snakeHitsFood = PlayerHitsFood.collision(this.snakeHead, this.food);
        }
        //direction of moving
        this.snakeX += this.dirDeltas[this.direction].x;
        this.snakeY += this.dirDeltas[this.direction].y;

        //food collision
        if (this.snakeHitsFood) {
            this.foodPosX = this.randomInt(0, (GameProperties.CANVAS_WIDTH - 120));
            this.foodPosY = this.randomInt(0, (GameProperties.CANVAS_HEIGHT - 30));
            this.score ++;
            this.numberOfBlocks += 1;
            this.snakeHitsFood = false;
            //snakeGrowth
        }

        //wall collision
        this.gameOverSceneVisible = CheckForWall.collision(this.snakeX, this.snakeY, GameProperties.CANVAS_WIDTH, GameProperties.CANVAS_HEIGHT);
        if (this.gameOverSceneVisible) {
            this.gameSceneVisible = false;
            document.addEventListener('keydown', e => {
                if (e.keyCode == 32 && this.gameOverSceneVisible) {
                    this.snakeX = 100;
                    this.snakeY = 150;
                    this.direction = 0;
                    this.numberOfBlocks = 10;
                    this.score = 0;
                    this.gameSceneVisible = true;
                    this.gameOverSceneVisible = false;

                }
            });
        }
        // Capture keyboard keys
        document.body.addEventListener("keydown", (ev) => {
            if (!this.keyCodeToDirs.hasOwnProperty(ev.keyCode)) {
                // console.log("**");
                return;
            }
            if (this.direction === 0 && this.keyCodeToDirs[ev.keyCode] !== 2) {
                this.direction = this.keyCodeToDirs[ev.keyCode];
            } else if (this.direction === 2 && this.keyCodeToDirs[ev.keyCode] !== 0) {
                this.direction = this.keyCodeToDirs[ev.keyCode];
            } else if (this.direction === 1 && this.keyCodeToDirs[ev.keyCode] !== 3) {
                this.direction = this.keyCodeToDirs[ev.keyCode];
            } else if (this.direction === 3 && this.keyCodeToDirs[ev.keyCode] !== 1) {
                this.direction = this.keyCodeToDirs[ev.keyCode];
            }
        });
    }
    public getStage(): PIXI.Container {

        this.stage = new PIXI.Container();
        //Make the game scene and add it to the stage)
        this.gameScene = new GameScene(this.snakeX, this.snakeY, this.numberOfBlocks, this.foodPosX, this.foodPosY, this.dirDeltas[this.direction].x, this.dirDeltas[this.direction].y, this.gameSceneVisible);
        this.stage.addChild(this.gameScene.getStage());
        //Create the `gameOver` scene
        this.gameOverScene = new GameOverScene(this.gameOverSceneVisible);
        this.stage.addChild(this.gameOverScene.getStage());
        this.snakeBody = this.gameScene.getSnakeBody()
        this.foodSprite = this.gameScene.getFoodSprite()
        //Set the game state
        return this.stage;
    }
    //The `randomInt` helper function
    private randomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    //snake next move
}