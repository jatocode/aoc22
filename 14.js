const osfs = require('fs')
const args = process.argv.slice(2)

const lines = osfs.readFileSync(args[0], 'utf8').split('\n')
const grid = {}
let maxX = 0
let minX = Infinity
let maxY = 0
let minY = Infinity

point(500, 0, '+')
draw()
console.log(minX, maxX, minY, maxY)

let units = 0
while (dropsand(500, 0) === true) units++;

print()
console.log('Del 1: ', units)

function dropsand(x, y) {
    if (x < 0 || y > maxY) return false
    //console.log(x, y)
    if (getpoint(x, y + 1) === undefined) {
        return dropsand(x, y + 1)
    } else if (getpoint(x - 1, y + 1) === undefined) {
        return dropsand(x - 1, y + 1)
    } else if (getpoint(x + 1, y + 1) === undefined) {
        return dropsand(x + 1, y + 1)
    }

    point(x, y, 'o')
    return true

}

function draw() {
    for (let i = 0; i < lines.length; i++) {
        const pathdata = lines[i].split(' -> ')
        const paths = pathdata.map(path => {
            const m = path.match(/(\d+),(\d+)/)
            return { right: parseInt(m[1]), down: parseInt(m[2]) }
        })
        let prev = paths[0]
        for (let pi = 1; pi < paths.length; pi++) {
            const point1 = paths[pi]
            if (prev.right === point1.right) {
                const top = Math.min(prev.down, point1.down)
                const bottom = Math.max(prev.down, point1.down)
                maxY = Math.max(maxY, bottom)
                minY = Math.min(minY, top)
                for (let y = top; y <= bottom; y++) {
                    point(prev.right, y, '#')
                }
            } else if (prev.down === point1.down) {
                const right = Math.max(prev.right, point1.right)
                const left = Math.min(prev.right, point1.right)
                maxX = Math.max(maxX, right)
                minX = Math.min(minX, left)
                for (let x = left; x <= right; x++) {
                    point(x, prev.down, '#')
                }
            }

            prev = point1
        }
    }
    return { maxX, minX, maxY, minY }
}

function getpoint(x, y) {
    return grid[`${x},${y}`]
}

function point(x, y, value) {
    grid[`${x},${y}`] = value
}

function print() {
    for (let y = 0; y < maxY + 1; y++) {
        let line = ''
        for (let x = minX; x < maxX + 1; x++) {
            line += grid[`${x},${y}`] || '.'
        }
        console.log(line)
    }
}