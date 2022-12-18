const osfs = require('fs')
const args = process.argv.slice(2)

const lines = osfs.readFileSync(args[0], 'utf8').split('\n')

let grid = {}
const checkrow = 200000
const r = plotSingleRow(checkrow)
console.log('Dag 15, del 1:', r)

// Needs rework... too slow
grid = {}
const size = 4000000
plotMultiRow(checkrow, size)
const beacon = findbeacon(size)
console.log('Dag 15, del 2:', beacon[0] * 4000000 + beacon[1])

function findbeacon(size) {
    for (let y = 0; y < size; y++) {
        if(y % 10000 === 0) console.log('Searching at', y)
        for (let x = 0; x < size; x++) {
            if (grid[[x, y]] === undefined) return [x, y]
        }
    }
    return null
}

function plotSingleRow(checkrow) {
    let count = 0
    lines.forEach(line => {
        const m = line.match(/Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/)
        const sx = parseInt(m[1])
        const sy = parseInt(m[2])
        const bx = parseInt(m[3])
        const by = parseInt(m[4])

        const dist = Math.abs(sx - bx) + Math.abs(sy - by) + 1
        console.log({ sx, sy, dist })

        const y = checkrow
        for (let x = sx - dist - 1; x < sx + dist + 1; x++) {
            if (x == bx && y == by) grid[[x, y]] = 'B'
            if (Math.abs(x - sx) + Math.abs(y - sy) < dist) {
                // if (x == sx && y == sy) grid[[x, y]] = 'S'
                if (grid[[x, y]] === undefined) {
                    grid[[x, y]] = '#'
                    if (y === checkrow) count++
                }
            }
        }
    })
    return count
}

function plotMultiRow(checkrow, size) {
    let count = 0
    lines.forEach(line => {
        const m = line.match(/Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/)
        const sx = parseInt(m[1])
        const sy = parseInt(m[2])
        const bx = parseInt(m[3])
        const by = parseInt(m[4])

        const dist = Math.abs(sx - bx) + Math.abs(sy - by) + 1
        console.log({ sx, sy, dist })

        const miny = Math.max(0, sy - dist - 1)
        const maxy = Math.min(size, sy + dist + 1)
        const minx = Math.max(0, sx - dist - 1)
        const maxx = Math.min(size, sx + dist + 1)
        console.log({ miny, maxy, minx, maxx })
        for (let y = miny; y < maxy; y++) {
            console.log('y',y)
            for (let x = minx; x < maxx; x++) {
                if (x == bx && y == by) grid[[x, y]] = 'B'
                if (Math.abs(x - sx) + Math.abs(y - sy) < dist) {
                    // if (x == sx && y == sy) grid[[x, y]] = 'S'
                    if (grid[[x, y]] === undefined) {
                        grid[[x, y]] = '#'
                        if (y === checkrow) count++
                    }
                }
            }
        }
    })
    return count
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