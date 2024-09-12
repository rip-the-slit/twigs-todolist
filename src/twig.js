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
    get topic() {
        return this.#topic
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