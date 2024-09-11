import { formatDistance, isPast } from "date-fns";
export { fixedDate }

class fixedDate {
    #date;
    get #now() {
        return new Date()
    }
    constructor(day, month, year=this.#now.getFullYear()) {
        this.#date = new Date(year, month -1, day)
    }
    get distance() {
        return formatDistance(this.#date, this.#now)
    }
    get isPast() {
        return isPast(this.#date)
    }
}