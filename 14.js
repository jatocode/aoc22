const osfs = require('fs')
const args = process.argv.slice(2)

const lines = osfs.readFileSync(args[0], 'utf8').split('\n')
let grid = {}
let maxX = 0
let minX = Infinity
let maxY = 0
let minY = Infinity

point(500, 0, '+')
draw()
let units = 0
while (dropsand(500, 0) === true)  units++;

print()
console.log('Del 1: ', units)

// Del 2 
grid = {}
draw()
drawBottom(maxY + 2) // Behövs bara för utskriften..
units = 0
while (dropsand(500, 0, true) === true)  units++;
console.log('Del 2: ', units + 1)

function dropsand(x, y, fill=false) {
    if(!fill && (x < 0 || y > maxY)) return false
    
    if(fill && y === maxY + 1) {
        if(getpoint(x, y) != '#') point(x, y, 'o')
        return true
    }

    if (!getpoint(x, y + 1))          return dropsand(x,     y + 1, fill)
    else if (!getpoint(x - 1, y + 1)) return dropsand(x - 1, y + 1, fill)
    else if (!getpoint(x + 1, y + 1)) return dropsand(x + 1, y + 1, fill)
    
    point(x, y, 'o')

    if(x === 500 && y === 0) return false

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
    return grid[[x,y]]
}

function point(x, y, value) {
    grid[[x,y]] = value
}

function drawBottom(y) {
    for (let x = minX-50; x < maxX + 51; x++) {
        point(x, y, '#')
    }
}

function print() {
    for (let y = 0; y < maxY + 3; y++) {
        let line = ''
        for (let x = minX-20; x < maxX + 20; x++) {
            line += grid[[x,y]] || '.'
        }
        console.log(line)
    }
}