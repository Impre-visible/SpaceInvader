import { eventManager } from '../lib/core/event_manager';
import { gfx2TextureManager } from '../lib/gfx2/gfx2_texture_manager';
import { Gfx2Drawable } from '../lib/gfx2/gfx2_drawable';
import { Gfx2SpriteJSS } from '../lib/gfx2_sprite/gfx2_sprite_jss';
// ---------------------------------------------------------------------------------------

class Controller extends Gfx2Drawable {
    constructor() {
        super();
        this.jss = new Gfx2SpriteJSS();
        this.direction = 'FORWARD';
        this.speed = 0.05;
        this.height = 32;
        this.width = 32;
        this.collider1 = [0, 0];
        this.collider2 = [0, 0];
        this.position[1] = 280 - this.height;
        this.jss.setPosition(this.position[0], this.position[1]);
    }

    paint() {
        this.jss.paint()
    }

    shoot() {
        const data = { x: this.position[0] + 16, y: this.position[1], speed: 2 };
        eventManager.emit(this, 'SHOOT', data);
    }

    update(ts) {
        console.log('update');
        this.jss.setPosition(this.position[0], this.position[1]);
        this.jss.update(ts);
    }

    move(x, y) {
        if (!this.checkMovement(x, y)) {
            return;
        }
        this.position[0] += x;
        this.position[1] += y;
        this.jss.setPosition(this.position[0], this.position[1]);
    }

    checkMovement(x) {
        if (this.position[0] + x < -300 || this.position[0] + x > (300 - this.width)) {
            return false;
        }
        return true;
    }


    draw() {
        this.jss.draw();
    }

    setDirection(direction) {
        this.direction = direction;
    }

    getDirection() {
        return this.direction;
    }

    getSpeed() {
        return this.speed;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getCollider1X() {
        return this.collider1[0];
    }

    getCollider1Y() {
        return this.collider1[1];
    }

    getCollider2X() {
        return this.collider2[0];
    }

    getCollider2Y() {
        return this.collider2[1];
    }
}

export { Controller };