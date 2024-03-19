import { eventManager } from '../../lib/core/event_manager';
import { uiManager } from '../../lib/ui/ui_manager';
import { screenManager } from '../../lib/screen/screen_manager';
import { Screen } from '../../lib/screen/screen';
import { UIMenuText } from '../../lib/ui_menu_text/ui_menu_text';

import { Player } from '../player/player';
// ---------------------------------------------------------------------------------------

class GameScreen extends Screen {
  constructor() {
    super();
    this.uiMenu = new UIMenuText();
  }

  async onEnter() {
  }

  onExit() {
  }

  handleMenuItemSelected(data) {
  }
}

export { GameScreen };