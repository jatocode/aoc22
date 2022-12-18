const osfs = require('fs')
const args = process.argv.slice(2)

const lines = osfs.readFileSync(args[0], 'utf8').split('\n')

const grid = {}
const max = parseData()

const keys = countSides()
const covered = keys.reduce((acc, key) => acc + grid[key].neighbors, 0)
const total = keys.length * 6
console.log('Del 1: ', total - covered)

const start = [0, 0, 0]
const fill = fillCube(grid, start, max)

console.log('Del 2: ')

function countSides() {
    const keys = Object.keys(grid)
    keys.forEach(key => {
        const cube = grid[key]
        const [x, y, z] = key.split(',').map(n => parseInt(n))
        const neighbors = neighbours(x, y, z)
        neighbors.forEach(neighbor => {
            if (grid[neighbor]) {
                cube.neighbors++
            }
        })
    })
    return keys
}

function parseData() {
    let maxx = 1, maxy = 1, maxz = 1, minx = 1, miny = 1, minz = 1
    lines.forEach(line => {
        const coords = line.split(',')
        const x = parseInt(coords[0])
        const y = parseInt(coords[1])
        const z = parseInt(coords[2])
        grid[[x, y, z]] = { neighbors: 0 }
        maxx = x > maxx ? x : maxx
        maxy = y > maxy ? y : maxy
        maxz = z > maxz ? z : maxz
    })
    return { maxx, maxy, maxz }
}

function fillCube(lavagrid, start, max) {
    const grid = JSON.parse(JSON.stringify(lavagrid))
    const queue = [start]
    const camefrom = {}
    camefrom[start] = null
    while (queue.length > 0) {
        const current = queue.shift()
        neighbours(current[0], current[1], current[2]).forEach(n => {
            const x = n[0]
            const y = n[1]
            const z = n[2]
            const v = camefrom[[x, y, z]]
            if (x < 0 || x + 1 > max.maxx + 1 || y < 0 || y > max.maxy + 1 || z < 0 || z > max.maxz + 1) {
                // outside
            } else if (!v && grid[[x, y, z]] === undefined) {
                queue.push(n)
                camefrom[[x, y, z]] = current
            }
        })
    }
    return Object.keys(camefrom)
}

function neighbours(x, y, z) {
    const neighbors = []
    neighbors.push([x + 1, y, z])
    neighbors.push([x - 1, y, z])
    neighbors.push([x, y + 1, z])
    neighbors.push([x, y - 1, z])
    neighbors.push([x, y, z + 1])
    neighbors.push([x, y, z - 1])

    return neighbors
}