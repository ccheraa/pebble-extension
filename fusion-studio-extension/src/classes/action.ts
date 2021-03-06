import { FSCore } from "../browser/core";
import { CommandRegistry, MenuModelRegistry, CommandHandler } from "@theia/core";
import { KeybindingRegistry } from "@theia/core/lib/browser";

export const ACTIONS_SCOPE = 'fusion';
export namespace FSAction {
  export function is(action: any): action is FSAction {
    return !!action && typeof action === 'object'
      && 'id' in action
      && 'label' in action
      && 'execute' in action;
  }
}
export interface FSSubMenu {
  menu: string[];
  label: string;
}
export interface FSAction {
  id: string,
  label: string,
  menu?: string[],
  menuLabel?: string,
  contextMenu?: string[],
  contextMenuLabel?: string,
  keys?: string,
  icon?: string,
  order?: string,
  execute: (core: FSCore, prepare?: () => Promise<any>) => (...args: any[]) => any;
  enabled?: (core: FSCore, prepare?: () => Promise<any>) => (...args: any[]) => boolean;
  visible?: (core: FSCore, prepare?: () => Promise<any>) => (...args: any[]) => boolean;
  toggled?: (core: FSCore, prepare?: () => Promise<any>) => (...args: any[]) => boolean;
}

export function actionID(id: string): string {
  return id.indexOf('.') > -1 ? id : ACTIONS_SCOPE + '.' + id;
}

export function registerCommands(core: FSCore, prepare: () => Promise<any>, commands: CommandRegistry, ...actions: FSAction[]) {
  actions.forEach(action => {
    const command = {
      id: actionID(action.id),
      label: action.label,
    }
    const handler: CommandHandler = {
      execute: action.execute(core, prepare),
    }
    if (action.enabled) {
      handler.isEnabled = action.enabled(core, prepare);
    }
    if (action.visible) {
      handler.isVisible = action.visible(core, prepare);
    }
    if (action.toggled) {
      handler.isToggled = action.toggled(core, prepare);
    }
    commands.registerCommand(command, handler);
  });
}
export function registerSubMenus(menus: MenuModelRegistry, ...submenus: FSSubMenu[]) {
  submenus.forEach(submenu => menus.registerSubmenu(submenu.menu, submenu.label));
}
export function registerMenus(menus: MenuModelRegistry, ...actions: FSAction[]) {
  actions.forEach(action => {
    if (action.menu) {
      menus.registerMenuAction(action.menu, {
        commandId: actionID(action.id),
        icon: action.icon,
        label: action.menuLabel || action.label,
        order: action.order,
      })
    }
    if (action.contextMenu) {
      menus.registerMenuAction(action.contextMenu, {
        commandId: actionID(action.id),
        icon: action.icon,
        label: action.contextMenuLabel || action.label,
        order: action.order,
      })
    }
  });
}
export function registerKeybindings(keybindings: KeybindingRegistry, ...actions: FSAction[]) {
  actions.forEach(action => {
    if (action.keys) {
      keybindings.registerKeybinding({
        command: actionID(action.id),
        keybinding: action.keys,
      });
    }
  });
}