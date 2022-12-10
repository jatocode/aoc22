const osfs = require('fs')
const args = process.argv.slice(2)

const lines = osfs.readFileSync(args[0], 'utf8').split('\n')

let x = 1
let cycle = 0
let sum = 0 
let checkCycles = [20,60,100,140,180,220]

lines.forEach(line => {
    const m = line.match(/([a-z]+)( -?\d+)?/)
    if(!m) console.log('No match', line)
    const inst = m[1]
    const val = parseInt(m[2])
    switch (inst) {
        case 'noop': 
            tick()
            break
        case 'addx':
            tick() 
            tick()
            x += val
            break
        default: console.log('Unknown instruction', inst)
    }
})

console.log('Del 1:', sum)

function tick() {
    cycle += 1    
   // if(cycle % 20 == 0) console.log({cycle,x, signal:x * cycle})
    if(checkCycles.includes(cycle)) sum += x * cycle
}