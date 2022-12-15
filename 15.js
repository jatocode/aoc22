const osfs = require('fs')
const args = process.argv.slice(2)

const lines = osfs.readFileSync(args[0], 'utf8').split('\n')

const grid = {}
lines.forEach(line => {
    const m = line.match(/Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/)
    const sx = parseInt(m[1])
    const sy = parseInt(m[2])
    const bx = parseInt(m[3])
    const by = parseInt(m[3])

    const dist = Math.abs(sx - bx) + Math.abs(sy - by)
    console.log(sx, sy, bx, by, dist)

    for (let y = sy - dist; y < sy + dist; y++) {
        for (let x = sx - dist; x < sx + dist; x++) {
            if (Math.abs(x - sx) + Math.abs(y - sy) <= dist) {
                grid[[x, y]] = '#'
            }            
        }
    }
})

print()

function print() {
    for (let y = 0; y < 20; y++) {
        let line = ''
        for (let x = -20; x < 40; x++) {
            line += grid[[x,y]] || '.'
        }
        console.log(line)
    }
}