// const emitter = new WeakMap();



type cb_t = (data: any) => void
type event_t = string
export class EventsEmitter {
    eventLength: number = 0
    events = new WeakMap()
    constructor() {
        // emitter.set(this, {
        //     events: {}
        // });
    }

    on(event: event_t, cb: cb_t, once = false) {
        if (typeof cb === 'undefined') {
            throw new Error('You must provide a callback method.');
        }

        if (typeof cb !== 'function') {
            throw new TypeError('Listener must be a function');
        }

        this.events[event] = this.events[event] || [];
        this.events[event].push({
            cb,
            once
        });

        this.eventLength++;

        return this;
    }

    off(event: event_t, cb: cb_t) {
        if (typeof cb === 'undefined') {
            throw new Error('You must provide a callback method.');
        }

        if (typeof cb !== 'function') {
            throw new TypeError('Listener must be a function');
        }

        if (typeof this.events[event] === 'undefined') {
            throw new Error(`Event not found - the event you provided is: ${event}`);
        }

        const listeners = this.events[event];

        listeners.forEach((v, i) => {
            if (v.cb === cb) {
                listeners.splice(i, 1);
            }
        });

        if (listeners.length === 0) {
            delete this.events[event];

            this.eventLength--;
        }

        return this;
    }

    emit(event: event_t, ...args) {
        if (typeof event === 'undefined') {
            throw new Error('You must provide an event to emit');
        }

        const listeners = this.events[event];
        const newListeners = [];

        if (typeof listeners !== 'undefined') {
            listeners.forEach((v, k) => {
                v.cb.apply(this, args);
                if (!v.once) {
                    newListeners.push(v)
                }
            });
            this.events[event] = newListeners
        }

        return this;
    }

    once(event: event_t, cb: cb_t) {
        this.on(event, cb, true);
    }

    destroy() {
        this.events = new WeakMap()
        this.eventLength = 0;
    }
}