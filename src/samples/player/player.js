class Player {
    /*This is the code of the player, it's a static sprite that shoots bullets. The player can move left and right, and shoot bullets. The player can also be hit by bullets, and when it happens, the player loses a life.*/

    constructor() {
        this.variants = {};
    }

    async loadFromData(data) {
        for (const key in data['Variants']) {
            this.addVariant(key, data['Variants'][key]);
        }
    }

    async loadFromFile(path) {
        const response = await fetch(path);
        await this.loadFromData(await response.json());
    }

    addVariant(varloc, value) {
        if (this.variants.hasOwnProperty(varloc)) {
            throw new Error('Player::addVariant: varloc already exist in variants dictionnary');
        }

        this.variants[varloc] = value;
    }

    removeVariant(varloc) {
        if (!this.variants.hasOwnProperty(varloc)) {
            throw new Error('Player::removeVariant: varloc not exist in variants dictionnary');
        }

        delete this.variants[varloc];
    }

    setVariant(varloc, value) {
        if (!this.variants.hasOwnProperty(varloc)) {
            throw new Error('Player::setVariant: varloc not exist in variants dictionnary');
        }

        this.variants[varloc] = value;
    }

    hasVariant(varloc) {
        return this.variants.hasOwnProperty(varloc);
    }

    getVariant(varloc) {
        if (!this.variants.hasOwnProperty(varloc)) {
            throw new Error('Player::getVariant: varloc not exist in variants dictionnary');
        }

        return this.variants[varloc];
    }
}

export { Player };