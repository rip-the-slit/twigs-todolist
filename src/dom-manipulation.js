export { clear, build}
import { Branch } from "./branch"
import { Twig } from "./twig"
import { branches } from "./branches"
import { fixedDate, periodicDate } from "./date"
import tree from "./assets/tree-in-winter-tree-branch-winter-svgrepo-com.svg"
import minus from "./assets/remove-minus-svgrepo-com.svg"

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

    const branchListItem = (obj, displayBranch) => {
        const itemName = obj.name
        const subItems = obj.allTwigs()
        let contentInstance = displayBranch

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
                const removedBranchIndex = branches.remove(obj)
                const lastBranch = branches.select(removedBranchIndex -1)
                clear.content()
                if (lastBranch) {updateBranchList(content.branch(lastBranch))}
                else {updateBranchList()}
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
    const updateBranchList = (displayedBranch) => {
        clear.branchList()
        branches.iterate(branchListItem, displayedBranch)
    }
    const content = (function() {
        const branchEditor = (obj) => {
            const isBranchNew = !obj
            if (isBranchNew) {obj = new Branch("", "", "purple")}

            const editBranch = () => {
                obj.name = branchNameInput.value
                obj.description = branchDescriptionInput.value
                obj.colorTheme = colorThemeDiv.querySelector(".checked input").value
                if (isBranchNew) {branches.add(obj)}
            }

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
            colorThemeDiv.addEventListener("change", (e) => {
                for (const label of labelArray) {
                    label.classList.remove("checked")
                }
                e.target.parentNode.classList.add("checked")
            })
            form.addEventListener("submit", (e) => {
                e.preventDefault()
                editBranch()
                clear.content()
                updateBranchList(branch(obj))
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

            for (const label of [purpleTheme, emeraldTheme, roseTheme]) {
                const input = label.lastChild
                if (input.value === obj.colorTheme) {
                    label.classList.add("checked")
                    input.setAttribute("checked", "")
                }
            }
        }
        const twigEditor = (thisBranch, twig) => {
            const isTwigNew = !twig
            if (isTwigNew) {twig = new Twig("", {distance: "open-ended"}, "low", "")}
            const isOpenEnded = twig.dueTime.distance == "open-ended"
            const isOneTime = twig.dueTime instanceof fixedDate
            const isPeriodic = twig.dueTime instanceof periodicDate
            let frequencyOption
            let daysOption
            if (isPeriodic) {
                frequencyOption = twig.dueTime.options.frequency
                daysOption = twig.dueTime.options.days
            }

            const duetimeType = () => {
                const handleEvent = (e) => {
                    const eventValue = e.target.value
                    if (eventValue == "open-ended") {
                        oneTimeDuetimeInstance.hide()
                        periodicDuetimeFrequencyInstance.hide()
                        weekdaysInstance.hide()
                    } else if (eventValue == "one-time") {
                        periodicDuetimeFrequencyInstance.hide()
                        weekdaysInstance.hide()
                        oneTimeDuetimeInstance.show()
                    } else {
                        oneTimeDuetimeInstance.hide()
                        periodicDuetimeFrequencyInstance.show()
                    }
                }
                const getValue = () => {
                    return duetimeTypeInput.value
                }

                const duetimeType = createElement("div")
                const duetimeTypeLabel = createElement("label")
                const duetimeTypeInput = createElement("select")
                const openEndedOption = createElement("option")
                const oneTimeOption = createElement("option")
                const periodicOption = createElement("option")

                duetimeTypeInput.addEventListener("change", handleEvent)
                
                duetimeType.classList.add("duetime-type")

                duetimeTypeInput.id = "duetime-type"

                duetimeTypeLabel.style.display = "none"

                duetimeTypeLabel.setAttribute("for", "duetime-type")
                duetimeTypeInput.setAttribute("name", "duetime-type")
                openEndedOption.setAttribute("value", "open-ended")
                oneTimeOption.setAttribute("value", "one-time")
                periodicOption.setAttribute("value", "periodic")

                duetimeTypeLabel.textContent = "Duetime type:"
                openEndedOption.textContent = "Open-ended"
                oneTimeOption.textContent = "One-time"
                periodicOption.textContent = "Periodic"

                duetimeType.appendChild(duetimeTypeLabel)
                duetimeTypeInput.appendChild(openEndedOption)
                duetimeTypeInput.appendChild(oneTimeOption)
                duetimeTypeInput.appendChild(periodicOption)
                duetimeType.appendChild(duetimeTypeInput)
                duetimeOptionsDiv.appendChild(duetimeType)

                if (isOneTime) {
                    duetimeTypeInput.value = "one-time"
                } else if (isPeriodic) {
                    duetimeTypeInput.value = "periodic"
                }

                return { getValue }
            }
            const oneTimeDuetime = () => {
                const show = () => {
                    oneTimeDuetime.style.display = "inherit"
                }
                const hide = () => {
                    oneTimeDuetime.style.display = "none"
                }
                const getValue = () => {
                    return oneTimeDuetimeInput.value
                }
                const oneTimeDuetime = createElement("div")
                const oneTimeDuetimeLabel = createElement("label")
                const oneTimeDuetimeInput = createElement("input")

                if (isOneTime) {show()}
                else {hide()}

                oneTimeDuetime.classList.add("onetime-duetime")

                oneTimeDuetimeInput.id = "date"

                oneTimeDuetimeLabel.style.display = "none"

                oneTimeDuetimeLabel.setAttribute("for", "date")
                oneTimeDuetimeInput.setAttribute("type", "date")

                oneTimeDuetime.appendChild(oneTimeDuetimeLabel)
                oneTimeDuetime.appendChild(oneTimeDuetimeInput)
                duetimeOptionsDiv.appendChild(oneTimeDuetime)

                return { show, hide, getValue }
            }
            const periodicDuetimeFrequency = () => {
                const show = () => {
                    periodicDuetimeFrequency.style.display = "flex"
                }
                const hide = () => {
                    periodicDuetimeFrequency.style.display = "none"
                }
                const handleEvent = (e) => {
                    if (e.target.value == "weekly") {
                        weekdaysInstance.show()
                    } else {
                        weekdaysInstance.hide()
                    }
                    for (const label of [dailyOption, weeklyOption]) {
                        label.classList.remove("checked")
                    }
                    e.target.parentNode.classList.add("checked")
                }
                const getValue = () => {
                    return periodicDuetimeFrequency.querySelector(".checked").lastChild.value
                }

                const periodicDuetimeFrequency = createElement("div")
                const dailyOption = createElement("label")
                const dailyOptionInput = createElement("input")
                const weeklyOption = createElement("label")
                const weeklyOptionInput= createElement("input")

                periodicDuetimeFrequency.addEventListener("change", handleEvent)

                if (isPeriodic) {show()}
                else {hide()}

                periodicDuetimeFrequency.classList.add("periodic-duetime-frequency")

                dailyOptionInput.id = "daily"
                weeklyOptionInput.id = "weekly"

                dailyOption.setAttribute("for", "daily")
                dailyOptionInput.setAttribute("type", "radio")
                dailyOptionInput.setAttribute("value", "daily")
                dailyOptionInput.setAttribute("name", "periodic-duetime-frequency")
                weeklyOptionInput.setAttribute("type", "radio")
                weeklyOptionInput.setAttribute("value", "weekly")
                weeklyOptionInput.setAttribute("name", "periodic-duetime-frequency")

                dailyOption.textContent = "Daily"
                weeklyOption.textContent = "Weekly"

                dailyOption.appendChild(dailyOptionInput)
                periodicDuetimeFrequency.appendChild(dailyOption)
                weeklyOption.appendChild(weeklyOptionInput)
                periodicDuetimeFrequency.appendChild(weeklyOption)
                duetimeOptionsDiv.appendChild(periodicDuetimeFrequency)

                if (frequencyOption == "weekly") {
                    weeklyOptionInput.checked = true
                    weeklyOption.classList.add("checked")
                } else {
                    dailyOptionInput.checked = true
                    dailyOption.classList.add("checked")
                }

                return { show, hide, getValue }
            }
            const weekdays = () => {
                const show = () => {
                    weekdays.style.display = "flex"
                }
                const hide = () => {
                    weekdays.style.display = "none"
                }
                const handleEvent = (e) => {
                    if (e.target.checked) {
                        e.target.parentNode.classList.add("checked")
                    } else {
                        e.target.parentNode.classList.remove("checked")
                    }
                }
                const match = (daysOption) => {
                    const day = weekdays.querySelector(`input[value=${daysOption}]`)
                    day.checked = true
                    day.parentNode.classList.add("checked")
                }
                const getValue = () => {
                    return Array.from(weekdays.querySelectorAll("label.checked"))
                                .map((day) => {return day.lastChild.value})
                }

                const weekdays = createElement("div")
                const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
                for (const day of days) {
                    const dayLowerCased = day.toLowerCase()
                    const label = createElement("label")
                    const input = createElement("input")

                    input.id = `${dayLowerCased}`

                    label.setAttribute("for", `${dayLowerCased}`)
                    input.setAttribute("value", `${dayLowerCased}`)
                    input.setAttribute("type", "checkbox")
                    input.setAttribute("name", "weekdays")

                    label.textContent = day

                    label.appendChild(input)
                    weekdays.appendChild(label)
                }

                weekdays.addEventListener("change", handleEvent)

                if (frequencyOption == "weekly") {show()}
                else {hide()}

                weekdays.classList.add("weekdays")
                duetimeOptionsDiv.appendChild(weekdays)

                if (daysOption) {daysOption.forEach(match)}

                return { show, hide, getValue }
            }
            const handleSubmit = (e) => {
                e.preventDefault()
                twig.name = twigNameInput.value
                twig.topic = twigTopicInput.value
                twig.priority = prioritySelect.value

                const selectedDuetimeType = duetimeTypeInstance.getValue()

                if (selectedDuetimeType == "open-ended") {
                    twig.dueTime = {distance: "open-ended"}
                } else if (selectedDuetimeType == "one-time") {
                    const selectedDate = oneTimeDuetimeInstance.getValue().split("-")
                    twig.dueTime = new fixedDate(+selectedDate[2], +selectedDate[1], +selectedDate[0])
                } else {
                    debugger
                    const selectedFrequency = periodicDuetimeFrequencyInstance.getValue()

                    if (selectedFrequency == "daily") {
                        twig.dueTime = new periodicDate({frequency: "daily"})
                    } else {
                        const selectedDays = weekdaysInstance.getValue()
                        twig.dueTime = new periodicDate({frequency: "weekly", days: selectedDays})
                    }
                }

                if (isTwigNew) {thisBranch.addTwig(twig)}
                clear.content()
                updateBranchList(branch(thisBranch))
            }

            const twigEditor = createElement("div")
            const form = createElement("form")
            const twigName = createElement("label")
            const twigNameInput = createElement("input")
            const topicAndPriorityDiv = createElement("div")
            const twigTopic = createElement("label")
            const twigTopicInput = createElement("input")
            const twigPriority = createElement("label")
            const prioritySelect = createElement("select")
            const lowOption = createElement("option")
            const mediumOption = createElement("option")
            const highOption = createElement("option")
            const fieldset = createElement("fieldset")
            const legend = createElement("legend")
            const duetimeOptionsDiv = createElement("div")
            const submitButton = createElement("button")

            form.addEventListener("submit", handleSubmit)

            twigEditor.classList.add("twig-editor")

            twigNameInput.id = "twig-name"
            twigTopicInput.id = "twig-topic"
            prioritySelect.id = "twig-priority"

            twigName.setAttribute("for", "twig-name")
            twigNameInput.setAttribute("placeholder", "The name of your twig")
            twigNameInput.setAttribute("type", "text")
            twigTopic.setAttribute("for", "twig-topic")
            twigTopicInput.setAttribute("placeholder", "E.g. work")
            twigTopicInput.setAttribute("type", "text")
            twigPriority.setAttribute("for", "twig-priority")
            prioritySelect.setAttribute("name", "twig-priority")
            lowOption.setAttribute("value", "low")
            mediumOption.setAttribute("value", "medium")
            highOption.setAttribute("value", "high")
            submitButton.setAttribute("type", "submit")

            twigName.textContent = "Name:"
            twigTopic.textContent = "Topic:"
            twigPriority.textContent = "Priority"
            lowOption.textContent = "Low"
            mediumOption.textContent = "Medium"
            highOption.textContent = "High"
            legend.textContent = "Select duetime:"
            submitButton.textContent = "Save"

            twigNameInput.value = twig.name
            twigTopicInput.value = twig.topic

            const duetimeTypeInstance = duetimeType()
            const oneTimeDuetimeInstance = oneTimeDuetime()
            const periodicDuetimeFrequencyInstance = periodicDuetimeFrequency()
            const weekdaysInstance = weekdays()

            twigName.appendChild(twigNameInput)
            form.appendChild(twigName)
            twigTopic.appendChild(twigTopicInput)
            topicAndPriorityDiv.appendChild(twigTopic)
            prioritySelect.appendChild(lowOption)
            prioritySelect.appendChild(mediumOption)
            prioritySelect.appendChild(highOption)
            twigPriority.appendChild(prioritySelect)
            topicAndPriorityDiv.appendChild(twigPriority)
            form.appendChild(topicAndPriorityDiv)
            fieldset.appendChild(legend)
            fieldset.appendChild(duetimeOptionsDiv)
            form.appendChild(fieldset)
            form.appendChild(submitButton)
            twigEditor.appendChild(form)
            contentNode.appendChild(twigEditor)

            prioritySelect.value = twig.priority
        }
        const branch = (obj) => {
            const branchName = obj.name
            const branchDescription = obj.description
            const branchColorTheme = obj.colorTheme
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

                const handleEditButton = (e) => {
                    clear.content()
                    twigEditor(obj, twig)
                }

                const handleDeleteButton = (e) => {
                    obj.removeTwig(twig)
                    update()
                    updateBranchList()
                }

                const twigDiv = createElement("div")
                const checkboxContainer = createElement("div")
                const checkbox = createElement("div")
                const h3 = createElement("h3")
                const twigTags = createElement("div")
                const duetimeTag = createElement("span")
                const priorityTag = createElement("span")
                const topicTag = createElement("span")
                const editButton = createElement("button")
                const deleteButton = createElement("button")

                editButton.addEventListener("click", handleEditButton)
                deleteButton.addEventListener("click", handleDeleteButton)

                if (twigStatus == "burnt") {checkbox.classList.toggle("checked")}
                checkbox.addEventListener("click", (e) => {
                    checkbox.classList.toggle("checked")
                    twig.toggleStatus()
                    update()
                    updateBranchList()
                })

                twigDiv.classList.add("twig")
                checkboxContainer.classList.add("checkbox-container")
                checkbox.classList.add("checkbox")
                twigTags.classList.add("twig-tags")
                duetimeTag.classList.add("duetime")
                priorityTag.classList.add("priority")
                topicTag.classList.add("topic")
                editButton.classList.add("edit-twig-button")
                deleteButton.classList.add("delete-button")

                h3.textContent = twigName
                duetimeTag.textContent = twigDuetime
                priorityTag.textContent = twigPriority
                topicTag.textContent = twigTopic
                editButton.textContent = "Edit"

                deleteButton.innerHTML = minus

                checkboxContainer.appendChild(checkbox)
                twigDiv.appendChild(checkboxContainer)
                twigDiv.appendChild(h3)
                twigTags.appendChild(duetimeTag)
                twigTags.appendChild(priorityTag)
                twigTags.appendChild(topicTag)
                twigTags.appendChild(editButton)
                twigDiv.appendChild(twigTags)
                twigDiv.appendChild(deleteButton)
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
            const handleCreateButton = (e) => {
                clear.content()
                twigEditor(obj)
            }

            const branchContent = createElement("div")
            const branchHeading = createElement("div")
            const branchInfoDiv = createElement("div")
            const h2 = createElement("h2")
            const p = createElement("p")
            const createTwigButton = createElement("button")
            const branchFilter = createElement("div")
            const twigsContainer = createElement("div")
            const backgroundTree = createElement("div")

            createTwigButton.addEventListener("click", handleCreateButton)

            branchContent.classList.add("branch-content")
            branchHeading.classList.add("branch-heading")
            branchFilter.classList.add("branch-filters")
            twigsContainer.classList.add("twigs-container")
            backgroundTree.classList.add("background-illustration")
            
            createTwigButton.id = "create-twig-button"

            branchContent.setAttribute("colorTheme", `${branchColorTheme}`)

            h2.textContent = branchName
            p.textContent = branchDescription
            createTwigButton.textContent = "Create Twig"

            backgroundTree.innerHTML = tree

            const filtersInstance = filters()
            iterateTwigs(allTwigs)

            branchInfoDiv.appendChild(h2)
            branchInfoDiv.appendChild(p)
            branchHeading.appendChild(branchInfoDiv)
            branchHeading.appendChild(createTwigButton)
            branchContent.appendChild(branchHeading)
            branchContent.appendChild(branchFilter)
            branchContent.appendChild(twigsContainer)
            branchContent.appendChild(backgroundTree)
            contentNode.appendChild(branchContent)

            return { update, obj }
        }   
        return { branch, branchEditor, twigEditor }
    })()
    return { branchListItem, content }
})()