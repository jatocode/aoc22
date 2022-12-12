const osfs = require('fs')
const args = process.argv.slice(2)

const lines = osfs.readFileSync(args[0], 'utf8').split('\n')

const grid = {}

const [S, E] = createGrid()
console.log('Start:', S, 'End:', E)
let path = findPath(S, E)
console.log('Dag 12 del 1:', path.length)
// console.log(path.reduce((acc, p) => {
//     const c = grid[`${p.x},${p.y}`]
//     return acc + c + ' '
// }, ''))


function findPath(start, end) {
    let queue = [start]
    let visited = {}
    visited[`${start.x},${start.y}`] = true
    let i = 0
    let crt = start
    while (queue.length > 0 &&  i++ < 500000) {
        crt = queue.shift()
        if (crt.x === end.x && crt.y === end.y) {
            break
        }
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

    let path = []
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
    let start = { x: 0, y: 0 }
    let end = { x: 0, y: 0 }
    for (let y = 0; y < lines.length; y++) {
        const line = lines[y];
        let row = ''
        for (let x = 0; x < line.length; x++) {
            const c = line[x]
            const ccode = c.charCodeAt(0)
            if (ccode > 65) {
                grid[`${x},${y}`] = c
                row += grid[`${x},${y}`] + ' '
                if (c === 'S') {
                    start = { x, y }
                    grid[`${x},${y}`] = 'ö'
                }
                if (c === 'E') {
                    end = { x, y }
                    grid[`${x},${y}`] = String.fromCharCode('z'.charCodeAt(0) + 1)
                }
            }
        }
        //  console.log(row)
    }
    return [start, end]
}
