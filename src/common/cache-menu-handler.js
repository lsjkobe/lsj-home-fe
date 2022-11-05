class CacheMenuHandler {

    static CONST = {
        KEY_CACHE_MENU: 'KEY_CACHE_MENU',
    }

    static MENU_CACHE = {
        curPaneKey: "",
        curTopMenuKey: "",
    }

    constructor() {

    }

    static saveCurPaneKey = (curPaneKey) => {
        let menuCache = this.getMenuCache();
        localStorage.setItem(this.CONST.KEY_CACHE_MENU, JSON.stringify({...menuCache, curPaneKey: curPaneKey}));
    }

    static saveCurTopMenuKey = (curTopMenuKey) => {
        let menuCache = this.getMenuCache();
        localStorage.setItem(this.CONST.KEY_CACHE_MENU, JSON.stringify({...menuCache, curTopMenuKey: curTopMenuKey}));
    }

    static getMenuCache = () => {
        let menuCacheJson = localStorage.getItem(this.CONST.KEY_CACHE_MENU);
        if (menuCacheJson) {
            return JSON.parse(menuCacheJson);
        } else {
            return {};
        }
    }

}

export default CacheMenuHandler;
