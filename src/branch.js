export class Branch {
    #storage = (function() {
        const storage = [];
        const store = (item) => {storage.push(item)}
        const getStoredItem = (itemNumber) => {
            return storage[itemNumber -1]
        }
        const getAmountStored = () => {return storage.length}
        const deleteItem = (itemNumber) => {
            storage.splice(itemNumber -1, 1)
        }
        const filterItems = (prop, value) => {
            return storage.filter((item) => {
                return item[prop] == value})
        }
        return {store, getStoredItem, getAmountStored, deleteItem, filterItems}
    })();
    #name;
    #description;
    constructor(name, description, ...args) {
        this.#name = name
        this.#description = description
        const restOfArgs = Array.from(args)
        for (const arg of restOfArgs) {
            this.#storage.store(arg)
        }
    }
    get name() {return this.#name}
    get description() {return this.#description}
    selectTwig(itemNumber) {
        return this.#storage.getStoredItem(itemNumber)
    }
    allTwigs(prop="", value=undefined) {
         return this.#storage.filterItems(prop, value)
    }
    addTwig(item) {
        this.#storage.store(item)
    }
    removeTwig(itemNumber) {
        this.#storage.deleteItem(itemNumber)
    }
}