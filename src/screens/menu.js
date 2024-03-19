import { eventManager } from '../lib/core/event_manager';
import { UIMenuText } from '../lib/ui_menu_text/ui_menu_text';
import { uiManager } from '../lib/ui/ui_manager';
import { Screen } from '../lib/screen/screen';
import { UIText } from '../lib/ui_text/ui_text';

class MenuScreen extends Screen {
    constructor() {
        super();
        this.uiTitle = new UIText();
        this.uiMainMenu = new UIMenuText();
    }

    async onEnter() {
        this.uiTitle.setText('Space Invaders (WARME Edition)');
        uiManager.addWidget(this.uiTitle, 'display: flex; justify-content: center; align-items: center; margin-top: 80px;margin-left: 50px; margin-right: 50px;');
        this.uiMainMenu.add('START', "Nouvelle partie");
        uiManager.addWidget(this.uiMainMenu, 'position: absolute; top: 50%; left: calc(50% - 100px); width: 200px;display: flex; justify-content: center; align-items: center;');
        eventManager.subscribe(this.uiMainMenu, 'E_CLOSED', this, this.handleMainMenuClosed);
        eventManager.subscribe(this.uiMainMenu, 'E_ITEM_SELECTED', this, this.handleMainMenuItemSelected);
    }

    handleMainMenuClosed() {
        screenManager.requestPopScreen();
    }

    handleMainMenuItemSelected(data) {
        console.log(data);
    }

    onExit() {
        uiManager.removeWidget(this.uiTitle);
        uiManager.removeWidget(this.uiMainMenu);
    }
}

export { MenuScreen };