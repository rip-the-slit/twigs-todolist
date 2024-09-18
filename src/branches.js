export const branches = (function() {
    const storage = []
    const iterate = (callback) => {
        for (const item of storage) {
            callback(item)
        }
    }
    const add = (item) => {
        storage.push(item)
    }
    const remove = (item) => {
        const index = storage.indexOf(item)
        if (index > -1) {
            storage.splice(index, 1)
        }
    }
    return{ iterate, add, remove }
})()