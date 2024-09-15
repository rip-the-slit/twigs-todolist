export { clear, build}

const clear = (function() {
    const getNode = (tag) => {
        return document.querySelector(tag)
    }
    const branchListNode = getNode("#branch-list")
    const clear = (item) => {
        while(item.lastChild) {
            item.lastChild.remove()
        }
    }
    const branchList = () => {
        clear(branchListNode)
    }
    return { branchList }
})()

const build = (function() {
    const branchListItem = (obj) => {
        const subItems = obj.allTwigs()
    }
    return { branchListItem }
})()