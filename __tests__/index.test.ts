import { EventsEmitter } from "../src"




test('basic event emit', ()=>{
    const events = new EventsEmitter()
    
    events.on('TEST', (data)=>{
        expect(data).toBe(123)
    })

    events.emit('TEST', 123)
})

test('multiple event emit', ()=>{
    const events = new EventsEmitter()
    let count = 0
    events.on('TEST', (data)=>{
        count += 1
    })
    events.emit('TEST', 123)
    events.emit('TEST', 123)
    expect(count).toBe(2)
})

test('complex emit data', ()=>{
    const events = new EventsEmitter()
    const d = {
        abc: {
            xyz: 123
        },
        lmn: 'def'
    }
    events.on('TEST', (data)=>{
        expect(data).toStrictEqual(d)
    })
    events.emit('TEST', d)
})

test('once', ()=>{
    const events = new EventsEmitter()
    let count = 0
    let count2 = 0;
    events.once('TEST', (data)=>{
        expect(data).toBe(123)
        count += 1;
    })
    events.on('TEST', (data)=>{
        expect(data).toBe(123)
        count2 += 1;
    })
    events.emit('TEST', 123)
    events.emit('TEST', 123)
    events.emit('TEST', 123)

    expect(count).toBe(1)
    expect(count2).toBe(3)
})

test('multiple listeners', ()=>{
    const events = new EventsEmitter()
    let count1 = 0
    let count2 = 0
    events.on('TEST', (data)=>{
        expect(data).toBe(123)
        count1 += 1
    })
    events.on('TEST', (data)=>{
        expect(data).toBe(123)
        count2 += 1
    })
    
    events.emit('TEST', 123)
    events.emit('TEST', 123)

    expect(count1).toBe(2)
    expect(count2).toBe(2)
})

test('multiple events', () => {
    const events = new EventsEmitter()
    let count1 = 0
    let count2 = 0
    let count3 = 0
    events.on('TEST1', (data)=>{
        expect(data).toBe(123)
        count1 += 1
    })
    events.on('TEST1', (data)=>{
        expect(data).toBe(123)
        count2 += 1
    })
    events.on('TEST2', (data)=>{
        expect(data).toBe(456)
        count3 += 1
    })
    
    events.emit('TEST1', 123)
    events.emit('TEST1', 123)
    events.emit('TEST2', 456)
    events.emit('TEST2', 456)
    events.emit('TEST2', 456)

    expect(count1).toBe(2)
    expect(count2).toBe(2)
    expect(count3).toBe(3)
})


test('emit without listeners', ()=>{
    const events = new EventsEmitter()
    events.emit('TEST', 123)

})