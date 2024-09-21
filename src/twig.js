export class Twig {
    #name;
    #dueTime;
    #priority;
    #topic;
    #status = "due"
    constructor(name, dueTime, priority, topic) {
        this.#name = name
        this.#dueTime = dueTime
        this.#priority = priority
        this.#topic = topic

        if (this.isOverdue) {this.#status = "burnt"}
    }
    get name() {
        return this.#name
    }
    set name(newValue) {
        this.#name = newValue
    }
    get dueTime() {
        return this.#dueTime
    }
    set dueTime(newValue) {
        this.#dueTime = newValue

        if (!(this.isOverdue)) {
            this.#status = "due"
        } else {this.#status = "burnt"}
    }
    get priority() {
        return this.#priority
    }
    set priority(newValue) {
        this.#priority = newValue
    }
    get topic() {
        return this.#topic
    }
    set topic(newValue) {
        this.#topic = newValue
    }
    get status() {
        return this.#status
    }
    get isOverdue() {
        return this.dueTime.hasPassed
    }
    toggleStatus() {
        this.#status = (this.#status == "due") ? "burnt": "due"
    }
}