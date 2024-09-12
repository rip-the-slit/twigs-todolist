import { formatDistance, isPast, nextDay, compareAsc } from "date-fns";
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
    #date;
    #frequency = (function() {
        const weekly = function(days) {
            const dateArray = []
            for (const day in days) {
                dateArray.push(nextDay(new Date(), days[day]))
            }
            dateArray.sort(compareAsc)
            console.log(dateArray)
            return dateArray
        }
        const daily = function() {
            console.log(this)
        }

        return { weekly, daily }
    })()
    constructor(options={
        frequency: "weekly",
        days: ["thu", "sat"]
    }) {
        this.#options = options
        this.#date = this.#callFrequency()
    }
    #daysOfTheWeekToObject(array=["mon"]) {
        return array.reduce(function(accumulator, item) {
            if (item == "sun") {accumulator[item] = 0}
            else if (item == "mon") {accumulator[item] = 1}
            else if (item == "tue") {accumulator[item] = 2}
            else if (item == "wed") {accumulator[item] = 3}
            else if (item == "thu") {accumulator[item] = 4}
            else if (item == "fri") {accumulator[item] = 5}
            else if (item == "sat") {accumulator[item] = 6}

            return accumulator
        }, {})
    }
    #shiftDate() {
        this.#date.shift()
        if (this.#date.length == 0) {
            this.#callFrequency()
        }
    }
    #callFrequency() {
        return this.#frequency[this.#options.frequency]
                              (this.#daysOfTheWeekToObject(this.#options.days))
    }
    get distance() {
        return formatDistance(this.#date[0], new Date(), {
            addSuffix: true
        })
    }
    get hasPassed() {
        const passed = isPast(this.#date[0])
        if (passed) {this.#shiftDate()}
        return passed
    }
}