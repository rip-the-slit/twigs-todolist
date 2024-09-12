import { formatDistance, isPast } from "date-fns";
export { fixedDate, periodicDate }

class fixedDate {
    #date;
    get #now() {
        return new Date()
    }
    constructor(day, month, year=this.#now.getFullYear()) {
        this.#date = new Date(year, month -1, day)
    }
    get distance() {
        return formatDistance(this.#date, this.#now, {
            addSuffix: true
        })
    }
    get hasPassed() {
        return isPast(this.#date)
    }
}

class periodicDate {
    #options;
    #frequency = (function() {
        const weekly = function() {
            console.log("lol")
        }
        const daily = function() {
            console.log(this)
        }

        return { weekly, daily }
    })()
    constructor(options={
        frequency: "weekly",
        days: ["mon", "fri"]
    }) {
        this.#options = options
        this.#frequency[options.frequency]()
    }
}