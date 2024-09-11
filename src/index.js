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
                                new fixedDate(16, 9),
                                "high",
                                "school"))
console.log(defaultBranch.selectTwig(3).dueTime.isPast)
defaultBranch.allTwigs("status", "burnt")