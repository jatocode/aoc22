const osfs = require('fs')
const args = process.argv.slice(2)

const lines = osfs.readFileSync(args[0], 'utf8').split('\n')

let H = { x: 0, y: 0 }
let tails1 = [{ x: 0, y: 0, visit: {} }]
let tails9 = [
    { x: 0, y: 0, visit: {} },
    { x: 0, y: 0, visit: {} },
    { x: 0, y: 0, visit: {} },
    { x: 0, y: 0, visit: {} },
    { x: 0, y: 0, visit: {} },
    { x: 0, y: 0, visit: {} },
    { x: 0, y: 0, visit: {} },
    { x: 0, y: 0, visit: {} },
    { x: 0, y: 0, visit: {} }
]

whipTheTail(tails1)
console.log('Dag 9 del 1, antal rutor: ', tails1[0].count)

H = { x: 0, y: 0 }
whipTheTail(tails9)
console.log('Dag 9 del 2, antal rutor för tail 9: ', tails9.at(-1).count)

function whipTheTail(tails) {
   lines.forEach(line => {
        const m = line.match(/([RLUD]) (\d+)/)
        const dir = m[1]
        const dist = parseInt(m[2])
        for (let i = 0; i < dist; i++) {
            switch (dir) {
                case 'R': H.x += 1; break
                case 'L': H.x -= 1; break
                case 'U': H.y += 1; break
                case 'D': H.y -= 1; break
            }

            tails.forEach((t, i) => {
                const front = i == 0 ? H : tails[i - 1]
                moveTail(front, t, i)
            })
        }
    })
}

function moveTail(H, T, i = 0) {
    const HTdiffX = H.x - T.x
    const HTdiffY = H.y - T.y

    if (Math.abs(HTdiffX) > 1) {
        T.x += HTdiffX > 0 ? 1 : -1
        if (T.y != H.y) T.y += HTdiffY > 0 ? 1 : -1
    } else if (Math.abs(HTdiffY) > 1) {
        T.y += HTdiffY > 0 ? 1 : -1
        if (T.x != H.x) T.x += HTdiffX > 0 ? 1 : -1
    }

    if (T.visit[`${T.x},${T.y}`] != i.toString()) T.count = T.count ? T.count + 1 : 1
    T.visit[`${T.x},${T.y}`] = i.toString()
}