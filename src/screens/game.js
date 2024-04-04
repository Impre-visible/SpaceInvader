import { eventManager } from '../lib/core/event_manager';
import { inputManager } from '../lib/input/input_manager';
import { uiManager } from '../lib/ui/ui_manager';
import { Screen } from '../lib/screen/screen';

import { Controller } from '../assets/controller';
import { gfx2TextureManager } from '../lib/gfx2/gfx2_texture_manager';

class GameScreen extends Screen {
    constructor() {
        super();
        this.controller = new Controller();
        this.move_step = 15;

        eventManager.subscribe(inputManager, 'E_ACTION_ONCE', this, this.handleActionOnce);
    }

    async onEnter() {
        this.controller.jss.setTexture(await gfx2TextureManager.loadTexture('textures/ship.png'));
    }

    draw() {
        this.controller.draw();
    }

    update(ts) {
        if (inputManager.isActiveAction('LEFT')) {
            this.moveController(-this.move_step * this.controller.getSpeed() * ts, 0, 'LEFT');
        }
        else if (inputManager.isActiveAction('RIGHT')) {
            this.moveController(this.move_step * this.controller.getSpeed() * ts, 0, 'RIGHT');
        }

    }

    handleActionOnce() {
        console.log('action once');
        if (inputManager.isActiveAction('SELECT')) {
            console.log('SELECT');
            this.controller.shoot();
        }
    }

    moveController(x, y, direction) {
        this.controller.setDirection(direction);
        this.controller.move(x, y);
    }

    handleMainMenuClosed() {
        screenManager.requestPopScreen();
    }

    handleMainMenuItemSelected(data) {
        switch (data.id) {
            case 'START':
                screenManager.requestSetScreen(new GameScreen());
        }
    }

    onExit() {
        uiManager.removeWidget(this.uiTitle);
        uiManager.removeWidget(this.uiMainMenu);
    }
}


export { GameScreen };