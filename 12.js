const osfs = require('fs')
const args = process.argv.slice(2)

const lines = osfs.readFileSync(args[0], 'utf8').split('\n')

const [S, E, grid, alist] = createGrid()
const path = findPath(S, E, grid)
console.log('Dag 12 del 1:', path.length)

const apaths = alist.map(a => findPath(a, E, grid).length).filter(p => p > 0).sort((a, b) => a - b)
console.log('Dag 12 del 2:', apaths[0])

function findPath(start, end, gr) {
    const grid = JSON.parse(JSON.stringify(gr))
    const queue = [start]
    const visited = {}
    visited[`${start.x},${start.y}`] = true
    let crt = start
    while (queue.length > 0) {
        crt = queue.shift()
        if (crt.x === end.x && crt.y === end.y) break
        const neighbours = getNeighbours(crt)
        neighbours.forEach(n => {
            let v = visited[`${n.x},${n.y}`]
            if (!v && grid[`${n.x},${n.y}`].charCodeAt(0) - grid[`${crt.x},${crt.y}`].charCodeAt(0) < 2) {
                queue.push(n)
                visited[`${n.x},${n.y}`] = true
                n.parent = crt
            }
        })
    }

    // Not found
    if (!(crt.x === end.x && crt.y === end.y)) return []

    // Unroll
    const path = []
    while (!(crt.x === start.x && crt.y === start.y)) {
        path.push(crt.parent)
        crt = crt.parent
    }
    path.reverse()
    return path
}

function getNeighbours(n) {
    const neighbours = []
    if (grid[`${n.x + 1},${n.y}`]) neighbours.push({ x: n.x + 1, y: n.y })
    if (grid[`${n.x},${n.y + 1}`]) neighbours.push({ x: n.x, y: n.y + 1 })
    if (grid[`${n.x - 1},${n.y}`]) neighbours.push({ x: n.x - 1, y: n.y })
    if (grid[`${n.x},${n.y - 1}`]) neighbours.push({ x: n.x, y: n.y - 1 })
    return neighbours
}

function createGrid() {
    const grid = {}
    let start = { x: 0, y: 0 }
    let end = { x: 0, y: 0 }
    const a = []
    for (let y = 0; y < lines.length; y++) {
        const line = lines[y];
        for (let x = 0; x < line.length; x++) {
            const c = line[x]
            grid[`${x},${y}`] = c
            if (c === 'S') {
                start = { x, y }
                a.push(start)
                grid[`${x},${y}`] = String.fromCharCode('z'.charCodeAt(0) + 1)
            } else if (c === 'E') {
                end = { x, y }
                grid[`${x},${y}`] = String.fromCharCode('z'.charCodeAt(0) + 1)
            } else if (c === 'a') {
                a.push({ x, y })
            }
        }
    }
    return [start, end, grid, a]
}
