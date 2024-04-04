import { gfx2TextureManager } from '../lib/gfx2/gfx2_texture_manager';
import { Gfx2SpriteJSS } from '../lib/gfx2_sprite/gfx2_sprite_jss';

class Bullet {
    constructor(x, y, speed) {
        this.jss = new Gfx2SpriteJSS();
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.alive = true;
    }

    async onEnter() {
        this.jss.setTexture(await gfx2TextureManager.loadTexture('textures/bullet.png'));
    }

    update() {
        if (!this.alive) return;
        this.y -= this.speed;

        this.draw();
    }

    draw() {
        if (!this.alive) return;
        console.log(`Drawing bullet at ${this.x}, ${this.y}`);
        this.jss.setPosition(this.x, this.y);
        console.log(this.jss.getTexture());
        this.jss.draw();
    }

    remove() {
        this.alive = false;
    }
}

export { Bullet };