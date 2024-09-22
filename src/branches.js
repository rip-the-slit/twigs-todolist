import { storageHandler } from "./storage-handler"

export const branches = (function() {
    const storage = []
    const iterate = (callback, displayedBranch) => {
        for (const item of storage) {
            if (displayedBranch) {
                if (item == displayedBranch.obj) {
                    callback(item, displayedBranch)
                } else {callback(item)}
            } else {callback(item)}
        }
    }
    const add = (item) => {
        storage.push(item)
        storageHandler.store()
    }
    const remove = (item) => {
        const index = storage.indexOf(item)
        if (index > -1) {
            storage.splice(index, 1)
        }
        storageHandler.store()
        return index
    }
    const select = (index) => {
        return storage[index]
    }
    const toJSON = () => {
        return storage
    }
    return{ iterate, add, remove, select, toJSON }
})()