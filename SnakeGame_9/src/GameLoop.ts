import * as PIXI from "pixi.js"

import {GameBoard} from "./engine/components/GameBoard";
import {RenderableElement} from "./utilities/RenderableElement";



export class Game {
    private readonly renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
    private readonly gameBoard: GameBoard;


    constructor(rendered: PIXI.CanvasRenderer | PIXI.WebGLRenderer){
        this.renderer = rendered;
        this.gameBoard = new GameBoard();
    }
    public update(): void {
        this.gameBoard.update();
    }
    public render(): void {
        let rootStage = new PIXI.Container();
        ([
            this.gameBoard,
        ] as Array<RenderableElement>)
            .map(element => element.getStage())
            .forEach(stage => rootStage.addChild(stage));
        this.renderer.render(rootStage);
    }
}