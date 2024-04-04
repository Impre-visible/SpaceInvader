import { eventManager } from '../lib/core/event_manager';
import { inputManager } from '../lib/input/input_manager';
import { uiManager } from '../lib/ui/ui_manager';
import { Screen } from '../lib/screen/screen';

import { Controller } from '../assets/controller';
import { gfx2TextureManager } from '../lib/gfx2/gfx2_texture_manager';

import { Bullet } from '../assets/bullet';
import { Asteroid } from '../assets/asteroids';

class GameScreen extends Screen {
    constructor() {
        super();
        this.controller = new Controller();
        this.move_step = 15;

        this.bullets = [];
        this.asteroids = [];

        eventManager.subscribe(inputManager, 'E_ACTION_ONCE', this, this.handleActionOnce);
        eventManager.subscribe(this.controller, 'SHOOT', this, this.handleShoot);
    }

    async onEnter() {
        this.controller.jss.setTexture(await gfx2TextureManager.loadTexture('textures/ship.png'));
        console.log(this.controller.jss.getTexture());
        const positions = [
            [50, 150], [100, 150], [150, 150], [200, 150], [250, 150],
            [50, 100], [100, 100], [150, 100], [200, 100], [250, 100],
            [50, 50], [100, 50], [150, 50], [200, 50], [250, 50]
        ]

        for (let i = 0; i < positions.length; i++) {
            const asteroid = new Asteroid(positions[i][0], positions[i][1]);
            this.asteroids.push(asteroid);
        }
    }

    handleShoot(data) {
        console.log('handleShoot');
        const bullet = new Bullet(data.x, data.y, data.speed);
        this.bullets.push(bullet);
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
        this.bullets.forEach(bullet => {
            bullet.update();

            if (!bullet.alive) {
                this.bullets.splice(this.bullets.indexOf(bullet), 1);
            }

            this.calculateCollision(bullet);
        });
    }
    calculateCollision(bullet) {
        console.log('calculateCollision');
        console.log(`Le bullet est à ${bullet.x}, ${bullet.y}`);

        if (bullet.y < -300) {
            bullet.remove();
            return;
        }

        if (bullet.y > 300) {
            bullet.remove();
            return;
        }

        this.asteroids.forEach(asteroid => {
            const distance = Math.sqrt(Math.pow(bullet.x - asteroid.x, 2) + Math.pow(bullet.y - asteroid.y, 2));

            if (distance < 16) {
                console.log('Collision detected');
                bullet.remove();
                asteroid.remove();
            }
        });
    }

    handleActionOnce(data) {
        if (data.actionId == 'SELECT') {
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