const osfs = require('fs')
const args = process.argv.slice(2)

const lines = osfs.readFileSync(args[0], 'utf8').split('\n')

let H = { x: 0, y: 0 }
let T = { x: 0, y: 0 }
let maxX = 0
let maxY = 0
let minY = 100000
let minX = 100000
let grid = {}
let test = 0
for(let l = 0; l < lines.length; l++) {
    const line = lines[l]
    const m = line.match(/([RLUD]) (\d+)/)
    const dir = m[1]
    const dist = parseInt(m[2])
    for (let i = 0; i < dist; i++) {
        switch (dir) {
            case 'R': H.x += 1; break;
            case 'L': H.x -= 1; break;
            case 'U': H.y += 1; break;
            case 'D': H.y -= 1; break;
        }
        if (H.x > maxX) maxX = H.x
        if (H.y > maxY) maxY = H.y

        if (H.x < minX) minX = H.x
        if (H.y < minY) minY = H.y

        const HTdiffX = H.x - T.x
        const HTdiffY = H.y - T.y

        if(Math.abs(HTdiffX) > 1) {
            T.x += HTdiffX > 0 ? 1 : -1
            if(T.y != H.y) {
                T.y += HTdiffY > 0 ? 1 : -1
            }
        } else if(Math.abs(HTdiffY) > 1) {
            T.y += HTdiffY > 0 ? 1 : -1
            if(T.x != H.x) {
                T.x += HTdiffX > 0 ? 1 : -1
            }
        }
        grid[`${T.x},${T.y}`] = '#'
    }
}

const count = printGrid()
console.log('Dag 9 del 1, antal rutor: ', count)

function printGrid() {
    let count = 0
    for (let y = maxY; y >= minY; y--) {
        let row = ''
        for (let x = minX; x <= maxX; x++) {
            row += grid[`${x},${y}`] || '.'
            if(grid[`${x},${y}`]) count++
        }
      //  console.log(row)
    }
    return count
}