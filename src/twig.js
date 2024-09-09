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
    }
    get name() {
        return this.#name
    }
    get dueTime() {
        return this.#dueTime
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
    toggleStatus() {
        this.#status = (this.#status == "due") ? "burnt": "due"
    }
}