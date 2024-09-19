export { clear, build}
import { Branch } from "./branch"
import { branches } from "./branches"

const getNode = (tag) => {
    return document.querySelector(tag)
}
const createElement = (element) => {
        return document.createElement(element)
}
const branchListNode = getNode("#branch-list")
const contentNode = getNode(".content")
const createBranchButton = getNode("#create-branch-button")

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
    createBranchButton.addEventListener("click", () => {
        clear.content()
        content.branchEditor()
    })

    const branchListItem = (obj) => {
        const itemName = obj.name
        const subItems = obj.allTwigs()
        let contentInstance;

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
            if (itemStatus == "burnt") {checkbox.classList.toggle("checked")}
            li.addEventListener("click", (e) => {
                checkbox.classList.toggle("checked")
                item.toggleStatus()
                if (contentInstance) {contentInstance.update()}
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
            } else if (e.target === editOption) {
                clear.content()
                content.branchEditor(obj)
                optionsMenu.classList.remove("open")
            } else if (e.target ===h3) {
                clear.content()
                contentInstance = content.branch(obj)
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
        const branchEditor = (obj) => {
            const isBranchNew = !obj
            if (isBranchNew) {obj = new Branch("", "")}

            const branchEditor = createElement("div")
            const form = createElement("form")
            const branchName = createElement("label")
            const branchNameInput = createElement("input")
            const branchDescription = createElement("label")
            const branchDescriptionInput = createElement("textarea")
            const fieldset = createElement("fieldset")
            const legend = createElement("legend")
            const colorThemeDiv = createElement("div")
            const purpleTheme = createElement("label")
            const purpleThemeInput = createElement("input")
            const emeraldTheme = createElement("label")
            const emeraldThemeInput = createElement("input")
            const roseTheme = createElement("label")
            const roseThemeInput = createElement("input")
            const submitButton = createElement("button")
            const labelArray = [purpleTheme, emeraldTheme, roseTheme]

            branchEditor.classList.add("branch-editor")
            purpleTheme.classList.add("checked")
            colorThemeDiv.addEventListener("change", (e) => {
                for (const label of labelArray) {
                    label.classList.remove("checked")
                }
                e.target.parentNode.classList.add("checked")
            })
            form.addEventListener("submit", (e) => {
                e.preventDefault()
                obj.name = branchNameInput.value
                obj.description = branchDescriptionInput.value
                if (isBranchNew) {branches.add(obj)}
                clear.content()
                branch(obj)
            })
            
            branchNameInput.id = "branch-name"
            branchDescriptionInput.id = "branch-description"
            purpleThemeInput.id = "purple"
            emeraldThemeInput.id = "emerald"
            roseThemeInput.id = "rose"


            branchName.setAttribute("for", "branch-name")
            branchNameInput.setAttribute("placeholder", "The name of your branch")
            branchDescription.setAttribute("for", "branch-description")
            branchDescriptionInput.setAttribute("placeholder", "A short and clear description of the content of your branch...")
            branchDescriptionInput.setAttribute("rows", "2")
            purpleTheme.setAttribute("for", "purple")
            purpleThemeInput.setAttribute("type", "radio")
            purpleThemeInput.setAttribute("checked", "")
            purpleThemeInput.setAttribute("name", "color-theme")
            purpleThemeInput.setAttribute("value", "purple")
            emeraldTheme.setAttribute("for", "emerald")
            emeraldThemeInput.setAttribute("type", "radio")
            emeraldThemeInput.setAttribute("name", "color-theme")
            emeraldThemeInput.setAttribute("value", "emerald")
            roseTheme.setAttribute("for", "rose")
            roseThemeInput.setAttribute("type", "radio")
            roseThemeInput.setAttribute("name", "color-theme")
            roseThemeInput.setAttribute("value", "rose")
            submitButton.setAttribute("type", "submit")

            branchName.textContent = "Name:"
            branchDescription.textContent = "Description:"
            legend.textContent = "Select a color theme:"
            purpleTheme.textContent = "Purple"
            emeraldTheme.textContent = "Emerald"
            roseTheme.textContent = "Rose"
            submitButton.textContent = "Save"

            branchNameInput.value = obj.name
            branchDescriptionInput.value = obj.description
        
            branchName.appendChild(branchNameInput)
            form.appendChild(branchName)
            branchDescription.appendChild(branchDescriptionInput)
            form.appendChild(branchDescription)
            fieldset.appendChild(legend)
            purpleTheme.appendChild(purpleThemeInput)
            colorThemeDiv.appendChild(purpleTheme)
            emeraldTheme.appendChild(emeraldThemeInput)
            colorThemeDiv.appendChild(emeraldTheme)
            roseTheme.appendChild(roseThemeInput)
            colorThemeDiv.appendChild(roseTheme)
            fieldset.appendChild(colorThemeDiv)
            form.appendChild(fieldset)
            form.appendChild(submitButton)
            branchEditor.appendChild(form)
            contentNode.appendChild(branchEditor)
        }
        const branch = (obj) => {
            const branchName = obj.name
            const branchDescription = obj.description
            const allTwigs = () => {return obj.allTwigs()}
            const dueTwigs = () => {return obj.allTwigs("status", "due")}
            const burntTwigs = () => {return obj.allTwigs("status", "burnt")}
            let currentlyDisplayedTwigs;
            const update = () => {
                filtersInstance.updateCounters()
                iterateTwigs(currentlyDisplayedTwigs)
            }

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

                if (twigStatus == "burnt") {checkbox.classList.toggle("checked")}
                checkbox.addEventListener("click", (e) => {
                    checkbox.classList.toggle("checked")
                    twig.toggleStatus()
                    update()
                    clear.branchList()
                    branches.iterate(branchListItem)
                })

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
            const iterateTwigs = (getArray) => {
                const array = getArray()
                currentlyDisplayedTwigs = getArray
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
                    iterateTwigs(allTwigs)
                    displayFilterBeingSelected(allFilter)
                                    })
                dueFilter.addEventListener("click", (e) => {
                    iterateTwigs(dueTwigs)
                    displayFilterBeingSelected(dueFilter)
                })
                burntFilter.addEventListener("click", (e) => {
                    iterateTwigs(burntTwigs)
                    displayFilterBeingSelected(burntFilter)
                })
                priorityFilter.addEventListener("click", (e) => {
                    iterateTwigs(function() {return obj.allTwigs("priority", select.value)})
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

                return { updateCounters }
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

            const filtersInstance = filters()
            iterateTwigs(allTwigs)

            branchInfoDiv.appendChild(h2)
            branchInfoDiv.appendChild(p)
            branchHeading.appendChild(branchInfoDiv)
            branchHeading.appendChild(createTwigButton)
            branchContent.appendChild(branchHeading)
            branchContent.appendChild(branchFilter)
            branchContent.appendChild(twigsContainer)
            contentNode.appendChild(branchContent)

            return { update }
        }   
        return { branch, branchEditor }
    })()
    return { branchListItem, content }
})()