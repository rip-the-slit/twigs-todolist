import { Twig } from "./twig"
import { Branch } from "./branch"
import { branches } from "./branches"
import { fixedDate, periodicDate } from "./date"
import { clear, build } from "./dom-manipulation"
import "./base-style.css"
import "./sidebar-style.css"
import "./content-style.css"
import "./branch-editor.css"

const defaultBranch = new Branch("Welcome", 
                                "Things you should do to get started",
                                "rose",
                                new Twig("Create a twig",
                                        "every day",
                                        "high",
                                        "start"
                                ),
                                new Twig("Burn a twig",
                                        "ee",
                                        "high",
                                        "start"
                                ),
                                new Twig("Create a branch",
                                        "every morning",
                                        "high",
                                        "start"
                                ))
const otherBranch = new Branch("Other branch",
                                "It's for testing",
                                "emerald",
                                new Twig("something",
                                        "any",
                                        "any",
                                        "any"
                                )
)
branches.add(defaultBranch)
branches.add(otherBranch)

clear.branchList()
branches.iterate(build.branchListItem)
clear.content()
build.content.branchEditor()