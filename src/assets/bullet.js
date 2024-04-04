import { gfx2TextureManager } from '../lib/gfx2/gfx2_texture_manager';
import { Gfx2SpriteJSS } from '../lib/gfx2_sprite/gfx2_sprite_jss';

class Bullet {
    constructor(x, y, speed) {
        this.jss = new Gfx2SpriteJSS();
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    async onEnter() {
        this.jss.setTexture(await gfx2TextureManager.loadTexture('textures/bullet.png'));
    }

    update() {
        this.y -= this.speed;

        if (this.collidesWithSomething()) {
            this.remove();
        }
    }

    draw() {
        this.jss.setPosition(this.x, this.y);
        this.jss.draw();
    }

    collidesWithSomething() {
    }

    remove() {
        // Implement the logic to remove the bullet from the game
    }
}

export { Bullet };