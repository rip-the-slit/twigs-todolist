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
        const options = createElement("div")
        const optionsMenu = createElement("div")
        const deleteOption = createElement("div")
        const editOption = createElement("div")

        for (const item of subItems) {
            const li = createElement("li")
            const checkbox = createElement("div")
            const checkboxInner = createElement("div")
            const itemStatus = item.status
            const span = createElement("span")

            checkbox.classList.add("checkbox")
            if (itemStatus == "due") {checkbox.classList.toggle("checked")}
            li.addEventListener("click", (e) => {
                checkbox.classList.toggle("checked")
                item.toggleStatus()
            })

            span.textContent = item.name
            
            checkbox.appendChild(checkboxInner)
            li.appendChild(checkbox)
            li.appendChild(span)
            ul.appendChild(li)
        }

        branch.classList.add("branch")
        options.classList.add("options")
        optionsMenu.classList.add("menu")

        document.addEventListener("click", (e) => {
            if (e.target === options) {
                optionsMenu.classList.toggle("open")
            } else if (e.target === deleteOption) {
                branch.remove()
            } else {
                optionsMenu.classList.remove("open")
            }
        })

        h3.textContent = itemName
        options.textContent = "..."
        deleteOption.textContent = "Delete"
        editOption.textContent = "Edit"

        branch.appendChild(h3)
        branch.appendChild(ul)
        branch.appendChild(options)
        optionsMenu.appendChild(deleteOption)
        optionsMenu.appendChild(editOption)
        branch.appendChild(optionsMenu)
        branchListNode.appendChild(branch)
    }
    return { branchListItem }
})()