import { Twig } from "./twig"
import { Branch } from "./branch"
import { branches } from "./branches"
import { fixedDate, periodicDate } from "./date"
import { clear, build } from "./dom-manipulation"
import "./base-style.css"
import "./sidebar-style.css"
import "./content-style.css"

const defaultBranch = new Branch("Welcome", 
                                "Things you should do to get started",
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
branches.add(defaultBranch)

clear.branchList()
branches.iterate(build.branchListItem)