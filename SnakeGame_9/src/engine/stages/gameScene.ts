import * as PIXI from "pixi.js"

import Graphics = PIXI.Graphics;
import Rectangle = PIXI.Rectangle;
import Sprite = PIXI.Sprite;
import Container = PIXI.Container;
import Texture = PIXI.Texture;
import { RenderableElement } from "../../utilities/RenderableElement";
import { ColorScheme } from "../../utilities/ColorScheme";
import { GameProperties } from "../../utilities/GameProperties";


export class GameScene implements RenderableElement {
    private snakeX: number;
    private snakeY: number;
    private numberOfBlocks: number;
    private stage: Container;
    private gameScene: Container;
    private id: any;
    private foodPosX: number;
    private foodPosY: number;
    private sceneVisible: boolean;
    private foods: any[];
    private snakeBody: any[];
    private dirX: number;
    private dirY: number;


    constructor(snakeX: number, snakeY: number, numberOBlocks: number, foodPosX: number, foodPosY: number, dirX: number, dirY: number, sceneVisible: boolean) {
        this.foods = []
        this.snakeX = snakeX;
        this.snakeY = snakeY;
        this.foodPosX = foodPosX;
        this.foodPosY = foodPosY;
        this.numberOfBlocks = numberOBlocks;
        this.sceneVisible = sceneVisible;
        this.dirX = dirX;
        this.dirY = dirY;
        let stage = this.buildScene(this.sceneVisible);
        this.stage = stage;
    }
    private buildScene(sceneVisible: boolean) {
        this.gameScene = new PIXI.Container();
        this.gameScene.visible = this.sceneVisible;
        //Make the sprites and add them to the `gameScene`
        //Create an alias for the texture atlas frame ids
        this.id = PIXI.loader.resources["./images/snakeGame.json"].textures;
        //Dungeon
        let dungeon = new PIXI.Sprite(this.id["dungeon.png"]);
        this.gameScene.addChild(dungeon);

        //Snake
        //An array to store all the snakeParts 
        //Make as many block as there are `numberOfBlocks`
        this.snakeBody = [];

        for (var i = 0; i < this.numberOfBlocks; i++) {

            let snake;
            snake = new PIXI.Sprite(this.id["snakeBody.png"]);
            snake.x = this.snakeX - i * this.dirX;
            snake.y = this.snakeY - i * this.dirY;
            this.snakeBody.push(snake);
            this.gameScene.addChild(snake);
            //update the position
        }
        this.move()
        //make the food
        this.addFood()
        //Create the bar which indicates when the door will be open
        let openTheDoorBar = new PIXI.Container();
        openTheDoorBar.position.set(GameProperties.CANVAS_WIDTH - GameProperties.doorPositionX, GameProperties.doorPositionY)
        this.gameScene.addChild(openTheDoorBar);
        //Create the black background rectangle
        let innerBar = new PIXI.Graphics();
        innerBar.beginFill(ColorScheme.Black);
        innerBar.drawRect(0, 0, 130, 8);
        innerBar.endFill();
        openTheDoorBar.addChild(innerBar);
        //Create the front red rectangle
        let outerBar = new PIXI.Graphics();
        outerBar.beginFill(ColorScheme.Orange);
        outerBar.drawRect(0, 0, 130, 8);
        outerBar.endFill();
        openTheDoorBar.addChild(outerBar);
        (<any>openTheDoorBar).outer = outerBar;
        let levelUp = (<any>openTheDoorBar).outer.width / GameProperties.redBarWidthReducer;
        return this.gameScene;
    }
    private addFood() {
        //array to food
        let food = new PIXI.Sprite(this.id["apple.png"]);
        food.x = this.foodPosX;
        food.y = this.foodPosY;
        //Push the food
        this.foods.push(food);
        //Add food
        this.gameScene.addChild(food);
    }
    private move() {
        //move the shift
        let nextmove = this.nextMove();
        this.snakeX = nextmove.x;
        this.snakeY = nextmove.y;

        // Move previous sides
        for (let i = this.snakeBody.length - 1; i >= 1; i--) {
            this.snakeBody[i].x = this.snakeBody[i - 1].x;
            this.snakeBody[i].y = this.snakeBody[i - 1].y;
        }

        // Move from 1st line
        this.snakeBody[0].x = this.snakeX;
        this.snakeBody[0].y = this.snakeY;

    }
    private nextMove() {
        let nextx = this.snakeX + this.dirX;
        let nexty = this.snakeY + this.dirY;
        return { x: nextx, y: nexty };
    }
    public getStage(): PIXI.Container {
        return this.stage;
    }
    public getSnakeBody() {
        return this.snakeBody;
    }
    public getFoodSprite() {
        return this.foods;
    }
    public setFoodSprite(x: number, y: number) {
        this.foods[0].x = x;
        this.foods[0].y = y;
    }

}