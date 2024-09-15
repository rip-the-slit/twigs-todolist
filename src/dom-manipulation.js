export { clear, build}

const getNode = (tag) => {
    return document.querySelector(tag)
}
const createElement = (element) => {
        return document.createElement(element)
    }

const clear = (function() {
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
        const branchListNode = getNode("#branch-list")
        const itemName = obj.name
        const subItems = obj.allTwigs()

        const branch = createElement("div")
        const h3 = createElement("h3")
        const ul = createElement("ul")

        for (const item of subItems) {
            const li = createElement("li")
            const checkbox = createElement("div")
            const checkboxInner = createElement("div")
            const itemStatus = item.status
            const span = createElement("span")

            checkbox.classList.add("checkbox")
            if (itemStatus == "due") {checkbox.toggleAttribute("checked", true)}
            li.addEventListener("click", (e) => {
                checkbox.toggleAttribute("checked")
                item.toggleStatus()
            })

            span.textContent = item.name
            
            checkbox.appendChild(checkboxInner)
            li.appendChild(checkbox)
            li.appendChild(span)
            ul.appendChild(li)
        }

        branch.classList.add("branch")

        h3.textContent = itemName

        branch.appendChild(h3)
        branch.appendChild(ul)
        branchListNode.appendChild(branch)
    }
    return { branchListItem }
})()