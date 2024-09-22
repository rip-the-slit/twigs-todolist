import { Twig } from "./twig"
import { Branch } from "./branch"
import { branches } from "./branches"
import { fixedDate, periodicDate } from "./date"
import { clear, build } from "./dom-manipulation"
import "./base-style.css"
import "./sidebar-style.css"
import "./content-style.css"
import "./branch-editor.css"
import "./twig-editor.css"
import { storageHandler } from "./storage-handler"

function defaultBehavior() {
        const defaultBranch = new Branch("Welcome", 
                        "Things you should do to get started",
                        "purple",
                        new Twig("Create a twig",
                                {distance: "open-ended"},
                                "high",
                                "start"
                        ),
                        new Twig("Burn a twig",
                                {distance: "open-ended"},
                                "high",
                                "start"
                        ),
                        new Twig("Create a branch",
                                {distance: "open-ended"},
                                "high",
                                "start"
                        ))
        branches.add(defaultBranch)
        build.branchListItem(defaultBranch, build.content.branch(defaultBranch))
}

if (storageHandler.storageAvailable()) {
        if (!storageHandler.retrieve()) {
                defaultBehavior()
        } else {
                storageHandler.restore()
                const firstBranch = branches.select(0)
                if (firstBranch) {
                        branches.iterate(build.branchListItem, build.content.branch(firstBranch))
                }
        }
        document.addEventListener('visibilitychange', function() {
                  if (document.visibilityState == 'hidden') {
                        storageHandler.store()
                  }
        });
} else {defaultBehavior()}

console.log(JSON.stringify(branches, null, "\t"))