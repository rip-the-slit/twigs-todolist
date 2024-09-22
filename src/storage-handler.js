import { Branch } from "./branch";
import { Twig } from "./twig";
import { branches } from "./branches";
import { fixedDate, periodicDate } from "./date";

export const storageHandler = (function() {
    function storageAvailable() {
        let storage;
        try {
          storage = window.localStorage;
          const x = "__storage_test__";
          storage.setItem(x, x);
          storage.removeItem(x);
          return true;
        } catch (e) {
          return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
          );
        }
    }
    function retrieve() {
        return localStorage.getItem("branches")
    }
    function store() {
        localStorage.setItem("branches", JSON.stringify(branches, null, "\t"))
    }
    function restore() {
        const retrievedData = JSON.parse(retrieve())
        for (const branch of retrievedData) {
            const branchObj = new Branch(
                branch.branchName,
                branch.description,
                branch.colorTheme
            )
            branches.add(branchObj)
            debugger
            for (const twig of branch.storage) {
                const twigObj = new Twig(
                    twig.twigName,
                    twig.dueTime,
                    twig.priority,
                    twig.topic,
                    twig.status
                )
                const dueTime = twig.dueTime
                if (dueTime.type) {
                    const args = dueTime.arguments
                    if (dueTime.type == "fixed") {
                        twigObj.dueTime = new fixedDate(args.day, args.month, args.year)
                    } else {
                        twigObj.dueTime = new periodicDate(args)
                    }
                }
                branchObj.addTwig(twigObj)
            }
        }
    }

    return { storageAvailable, retrieve, store, restore }
})()