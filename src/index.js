import { Twig } from "./twig"
import { Branch } from "./branch"
import { fixedDate, periodicDate } from "./date"
import { clear } from "./dom-manipulation"
import "./base-style.css"
import "./sidebar-style.css"
import "./content-style.css"

const defaultBranch = new Branch(new Twig("Do yoga",
                                        "every day",
                                        "low",
                                        "health"),
                                new Twig("Check email",
                                        "every morning",
                                        "medium",
                                        "work"))
   
defaultBranch.addTwig(new Twig("Study",
                                new fixedDate(16, 7),
                                "high",
                                "school"))
defaultBranch.allTwigs()
defaultBranch.selectTwig(3).dueTime = new periodicDate()
defaultBranch.selectTwig(3).toggleStatus()
defaultBranch.allTwigs()
defaultBranch.selectTwig(3).dueTime = new fixedDate(16, 8)
defaultBranch.allTwigs()

clear.branchList()