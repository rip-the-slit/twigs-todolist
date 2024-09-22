import { storageHandler } from "./storage-handler";

export class Branch {
    #storage = (function() {
        const storage = [];
        const store = (item) => {storage.push(item)}
        const getStoredItem = (itemNumber) => {
            return storage[itemNumber -1]
        }
        const getAmountStored = () => {return storage.length}
        const deleteItem = (item) => {
            const index = storage.indexOf(item)
            if (index > -1) {
                storage.splice(index, 1)
            }
            return index
        }
        const filterItems = (prop, value) => {
            return storage.filter((item) => {
                return item[prop] == value})
        }
        return {store, getStoredItem, getAmountStored, deleteItem, filterItems}
    })();
    #name;
    #description;
    #colorTheme;
    constructor(name, description, colorTheme, ...args) {
        this.#name = name
        this.#description = description
        this.#colorTheme = colorTheme
        const restOfArgs = Array.from(args)
        for (const arg of restOfArgs) {
            this.#storage.store(arg)
        }
    }
    get name() {return this.#name}
    set name(newValue) {this.#name = newValue}
    get description() {return this.#description}
    set description(newValue) {this.#description = newValue}
    get colorTheme() {return this.#colorTheme}
    set colorTheme(newValue) {this.#colorTheme = newValue}
    selectTwig(itemNumber) {
        return this.#storage.getStoredItem(itemNumber)
    }
    allTwigs(prop="", value=undefined) {
         return this.#storage.filterItems(prop, value)
    }
    addTwig(item) {
        this.#storage.store(item)
        storageHandler.store()
    }
    removeTwig(item) {
        this.#storage.deleteItem(item)
        storageHandler.store()
    }
    toJSON() {
        const storedStuff = this.allTwigs()
        return {
            branchName: this.#name,
            description: this.#description,
            colorTheme: this.#colorTheme,
            storage: storedStuff
        }
    }
}