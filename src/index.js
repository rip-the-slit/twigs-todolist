import { Twig } from "./twig"
import { Branch } from "./branch"

const defaultBranch = new Branch(new Twig("Do yoga",
                                        "every day",
                                        "low",
                                        "health"),
                                new Twig("Check email",
                                        "every morning",
                                        "medium",
                                        "work"))
   
defaultBranch.addTwig(new Twig("Study",
                                "every evening",
                                "high",
                                "school"))
defaultBranch.selectTwig(2).toggleStatus()
defaultBranch.dueTwigs()