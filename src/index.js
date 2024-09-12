import { Twig } from "./twig"
import { Branch } from "./branch"
import { fixedDate } from "./date"

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
defaultBranch.selectTwig(3).dueTime = new fixedDate(16, 9)
defaultBranch.allTwigs()
defaultBranch.selectTwig(3).dueTime = new fixedDate(16, 8)
defaultBranch.allTwigs()