const osfs = require('fs')
const args = process.argv.slice(2)

const lines = osfs.readFileSync(args[0], 'utf8').split('\n')

const grid = {}

const S = createGrid()
console.log('Start:', S)
const path = findPath(S)
console.log('Dag 12 del 1:', path.length)

function findPath(start) {
    const path = []
    let steps = 0
    let crt = start

    return path
}


function createGrid() {
    let start = {x: 0, y: 0}
    lines.forEach((line, y) => {
        line.split('').forEach((c, x) => {
            grid[`${x},${y}`] = c
            if(c === 'S') start = {x, y}
        })
    })
    return start
}
