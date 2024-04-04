import { gfx2TextureManager } from '../lib/gfx2/gfx2_texture_manager';
import { Gfx2SpriteJSS } from '../lib/gfx2_sprite/gfx2_sprite_jss';

class Asteroid {
    constructor(x, y) {
        this.jss = new Gfx2SpriteJSS();
        this.x = x;
        this.y = y;
    }

    async onEnter() {
        this.jss.setTexture(await gfx2TextureManager.loadTexture('textures/asteroid.png'));
    }

    update() {
        this.draw();
    }

    draw() {
        this.jss.setPosition(this.x, this.y);
        this.jss.draw();
    }

    remove() {
        this.alive = false;
    }
}

export { Asteroid };