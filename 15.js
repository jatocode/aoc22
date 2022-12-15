const osfs = require('fs')
const args = process.argv.slice(2)

const lines = osfs.readFileSync(args[0], 'utf8').split('\n')

const grid = {}
const checkrow = 2000000
plot(checkrow)
//print()

// Y-koordinat  som inte har en beacon
console.log('Done plotting, checking row:', checkrow)
const keysNoBeacon = Object.keys(grid).filter(x => {
    y = parseInt(x.split(',')[1])
    return y === checkrow && grid[x] !== 'B'
})
console.log('Dag 15, del 1:', keysNoBeacon.length)

function plot(checkrow) {
    lines.forEach(line => {
        const m = line.match(/Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/)
        const sx = parseInt(m[1])
        const sy = parseInt(m[2])
        const bx = parseInt(m[3])
        const by = parseInt(m[4])

        const dist = Math.abs(sx - bx) + Math.abs(sy - by) + 1
        console.log({sx, sy, dist})

        const y = checkrow
        for (let x = sx - dist - 1; x < sx + dist + 1; x++) {
            if (x == bx && y == by) grid[[x, y]] = 'B'
            if (Math.abs(x - sx) + Math.abs(y - sy) < dist) {
//                if (x == sx && y == sy) grid[[x, y]] = 'S'
                if (grid[[x, y]] === undefined) grid[[x, y]] = '#'
            }
        }
    })
}

function print() {
    for (let y = 8; y < 12; y++) {
        let line = ''
        for (let x = -10; x < 30; x++) {
            line += grid[[x, y]] || '.'
        }
        console.log(line)
    }
}