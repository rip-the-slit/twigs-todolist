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
    constructor() {
        const args = Array.from(arguments)
        for (const arg of args) {
            this.#storage.store(arg)
        }
    }
    selectTwig(itemNumber) {
        return this.#storage.getStoredItem(itemNumber)
    }
    allTwigs(prop="", value=undefined) {
        this.#storage.filterItems(prop, value)
                     .forEach((item, index) => {
                        console.log(`${index +1}: ${item.name} [${item.status}]`)
                     })
    }
    addTwig(item) {
        this.#storage.store(item)
    }
    removeTwig(itemNumber) {
        this.#storage.deleteItem(itemNumber)
    }
}