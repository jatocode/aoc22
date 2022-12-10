const osfs = require('fs')
const args = process.argv.slice(2)

const lines = osfs.readFileSync(args[0], 'utf8').split('\n')

let x = 1
let cycle = 0
let crtpos = 0
let sum = 0 
let crt = Array(240).fill('.')
let checkCycles = [20,60,100,140,180,220]

cpu()
console.log('Del 1:', sum)
console.log('Del 2:')
print()

function cpu() {
    lines.forEach(line => {
        const m = line.match(/([a-z]+)( -?\d+)?/)
        if (!m)
            console.log('No match', line)
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
}

function crttick() {
    const sprite = x
    const linepos = crtpos % 40
    if(sprite-1 <= linepos && linepos <= sprite+1) crt[crtpos] = '#'  
    else crt[crtpos] = '.'

    crtpos = (crtpos + 1) % 240
}
function tick() {
    cycle += 1    
   // if(cycle % 20 == 0) console.log({cycle,x, signal:x * cycle})
    if(checkCycles.includes(cycle)) sum += x * cycle
    crttick()
}

function print() {
    for(let y=0;y<6;y++) {
        let row = ''
        for(let x=0;x<40;x++) {
            row += crt[y*40+x]
        }
        console.log(row)
    }
}