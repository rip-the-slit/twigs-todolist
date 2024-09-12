import { formatDistance, isPast, nextDay, compareAsc, isSameDay, getDay, endOfDay } from "date-fns";
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
            const currentDay = getDay(new Date())
            for (const day in days) {
                if (days[day] == currentDay) {
                    dateArray.push(endOfDay(new Date()))
                } else {
                    dateArray.push(nextDay(new Date(), days[day]))
                }
            }
            dateArray.sort(compareAsc)
            return dateArray
        }
        const daily = function() {
            const dateArray = []
            dateArray.push(endOfDay(new Date()))
            return dateArray
        }

        return { weekly, daily }
    })()
    constructor(options={
        frequency: "weekly",
        days: ["mon", "sat"]
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
        if (this.hasPassed) {
            return "recurring " + formatDistance(this.#date[0], new Date(), {
                addSuffix: true
            })
        } else {
            return "today"
        }
    }
    get hasPassed() {
        const nearestDate = this.#date[0]
        if (isPast(nearestDate)) {this.#shiftDate()}
        return !(isSameDay(new Date(), nearestDate))
    }
}