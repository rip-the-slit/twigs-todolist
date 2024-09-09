export class Branch {
    #storage = (function() {
        const storage = [];
        const store = (item) => {storage.push(item)}
        const getStoredItem = (itemNumber) => {
            return storage[itemNumber -1]
        }
        const getAmountStored = () => {return storage.length}
        return {store, getStoredItem, getAmountStored}
    })();
    constructor() {
        const args = Array.from(arguments)
        for (const arg of args) {
            this.#storage.store(arg)
        }
    }
    allTwigs() {
        for (let i = 1; i <= this.#storage.getAmountStored(); i++) {
            console.log(`${i}: ${this.#storage.getStoredItem(i).name}`)
        }
    }
}