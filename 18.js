const osfs = require('fs')
const args = process.argv.slice(2)

const lines = osfs.readFileSync(args[0], 'utf8').split('\n')

const grid = {}
lines.forEach(line => {
    const coords = line.split(',')
    const x = parseInt(coords[0])
    const y = parseInt(coords[1])
    const z = parseInt(coords[2])
    grid[[x, y, z]] = { neighbors: 0 }
})

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

const covered = keys.reduce((acc, key) => acc + grid[key].neighbors, 0)
const total = keys.length * 6
//console.log(grid, covered, total)
console.log(grid, covered, total, 'Del 1: ', total-covered)

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