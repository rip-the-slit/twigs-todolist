export { clear, build}

const getNode = (tag) => {
    return document.querySelector(tag)
}
const createElement = (element) => {
        return document.createElement(element)
}
const branchListNode = getNode("#branch-list")
const contentNode = getNode(".content")

const clear = (function() {
    const clear = (item) => {
        while(item.lastChild) {
            item.lastChild.remove()
        }
    }
    const branchList = () => {
        clear(branchListNode)
    }
    const content = () => {
        clear(contentNode)
    }
    return { clear, branchList, content }
})()

const build = (function() {
    const branchListItem = (obj) => {
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
    const content = (function() {
        const branch = (obj) => {
            const branchName = obj.name
            const branchDescription = obj.description
            const allTwigs = () => {return obj.allTwigs()}
            const dueTwigs = () => {return obj.allTwigs("status", "due")}
            const burntTwigs = () => {return obj.allTwigs("status", "burnt")}

            const twig = (twig) => {
                const twigName = twig.name
                const twigStatus = twig.status
                const twigDuetime = twigStatus + " " + twig.dueTime.distance
                const twigPriority = "Priority: " + twig.priority
                const twigTopic = "Topic: " + twig.topic

                const twigDiv = createElement("div")
                const checkboxContainer = createElement("div")
                const checkbox = createElement("div")
                const h3 = createElement("h3")
                const twigTags = createElement("div")
                const duetimeTag = createElement("span")
                const priorityTag = createElement("span")
                const topicTag = createElement("span")
                const editButton = createElement("button")

                twigDiv.classList.add("twig")
                checkboxContainer.classList.add("checkbox-container")
                checkbox.classList.add("checkbox")
                twigTags.classList.add("twig-tags")
                duetimeTag.classList.add("duetime")
                priorityTag.classList.add("priority")
                topicTag.classList.add("topic")
                editButton.classList.add("edit-twig-button")

                h3.textContent = twigName
                duetimeTag.textContent = twigDuetime
                priorityTag.textContent = twigPriority
                topicTag.textContent = twigTopic
                editButton.textContent = "Edit"

                checkboxContainer.appendChild(checkbox)
                twigDiv.appendChild(checkboxContainer)
                twigDiv.appendChild(h3)
                twigTags.appendChild(duetimeTag)
                twigTags.appendChild(priorityTag)
                twigTags.appendChild(topicTag)
                twigTags.appendChild(editButton)
                twigDiv.appendChild(twigTags)
                twigsContainer.appendChild(twigDiv)
            }
            const iterateTwigs = (array) => {
                clear.clear(twigsContainer)
                
                array.forEach(twig)
            }
            const filters = () => {
                clear.clear(branchFilter)

                const displayFilterBeingSelected = (selected) => {
                    for (const filter of Array.from(ul.childNodes)) {
                        if (filter === selected) {
                            selected.classList.add("selected")
                        } else {filter.classList.remove("selected")}
                    }
                }
                const updateCounters = () => {
                    allCount.textContent = allTwigs().length
                    dueCount.textContent = dueTwigs().length
                    burntCount.textContent = burntTwigs().length      
                }

                const ul = createElement("ul")
                const allFilter = createElement("li")
                const allCount = createElement("div")
                const dueFilter = createElement("li")
                const dueCount = createElement("div")
                const burntFilter = createElement("li")
                const burntCount = createElement("div")
                const priorityFilter = createElement("li")
                const label = createElement("label")
                const select = createElement("select")
                const lowPriority = createElement("option")
                const mediumPriority = createElement("option")
                const highPriority = createElement("option")

                allFilter.addEventListener("click", (e) => {
                    iterateTwigs(allTwigs())
                    displayFilterBeingSelected(allFilter)
                })
                dueFilter.addEventListener("click", (e) => {
                    iterateTwigs(dueTwigs())
                    displayFilterBeingSelected(dueFilter)
                })
                burntFilter.addEventListener("click", (e) => {
                    iterateTwigs(burntTwigs())
                    displayFilterBeingSelected(burntFilter)
                })
                priorityFilter.addEventListener("click", (e) => {
                    iterateTwigs(obj.allTwigs("priority", select.value))
                    displayFilterBeingSelected(priorityFilter)
                })

                allFilter.classList.add("all")
                dueFilter.classList.add("due")
                burntFilter.classList.add("burnt")
                allCount.classList.add("item-count")
                dueCount.classList.add("item-count")
                burntCount.classList.add("item-count")

                select.id = "priority"

                lowPriority.value = "low"
                mediumPriority.value = "medium"
                highPriority.value = "high"

                label.setAttribute("for", "priority")
                select.setAttribute("name", "priority")

                allFilter.textContent = "All"
                dueFilter.textContent = "Due"
                burntFilter.textContent = "Burnt"
                label.textContent = "Priority"
                lowPriority.textContent = "Low"
                mediumPriority.textContent = "Medium"
                highPriority.textContent = "High"
                
                updateCounters()

                allFilter.appendChild(allCount)
                ul.appendChild(allFilter)
                dueFilter.appendChild(dueCount)
                ul.appendChild(dueFilter)
                burntFilter.appendChild(burntCount)
                ul.appendChild(burntFilter)
                priorityFilter.appendChild(label)
                select.appendChild(lowPriority)
                select.appendChild(mediumPriority)
                select.appendChild(highPriority)
                priorityFilter.appendChild(select)
                ul.appendChild(priorityFilter)
                branchFilter.appendChild(ul)

                displayFilterBeingSelected(allFilter)
            }

            const branchContent = createElement("div")
            const branchHeading = createElement("div")
            const branchInfoDiv = createElement("div")
            const h2 = createElement("h2")
            const p = createElement("p")
            const createTwigButton = createElement("button")
            const branchFilter = createElement("div")
            const twigsContainer = createElement("div")

            branchContent.classList.add("branch-content")
            branchHeading.classList.add("branch-heading")
            branchFilter.classList.add("branch-filters")
            twigsContainer.classList.add("twigs-container")
            
            createTwigButton.id = "create-twig-button"

            h2.textContent = branchName
            p.textContent = branchDescription
            createTwigButton.textContent = "Create Twig"

            filters()
            iterateTwigs(allTwigs())

            branchInfoDiv.appendChild(h2)
            branchInfoDiv.appendChild(p)
            branchHeading.appendChild(branchInfoDiv)
            branchHeading.appendChild(createTwigButton)
            branchContent.appendChild(branchHeading)
            branchContent.appendChild(branchFilter)
            branchContent.appendChild(twigsContainer)
            contentNode.appendChild(branchContent)
        }   
        return { branch }
    })()
    return { branchListItem, content }
})()