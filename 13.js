const osfs = require('fs')
const args = process.argv.slice(2)

const lines = osfs.readFileSync(args[0], 'utf8').split('\n')

let pair = 1
const rightorderpairs = []
for (let i = 0; i < lines.length; i += 3, pair++) {
    const line1 = lines[i]
    const line2 = lines[i + 1]

    const pl1 = JSON.parse(line1)
    const pl2 = JSON.parse(line2)
    const res = cmp(pl1, pl2)
    console.log(`Pair ${pair} are ${res ? 'in' : '\x1b[31mNOT\x1b[0m in'} the right order`)

    if (res) rightorderpairs.push(pair)
}
console.log('Dag 13, del 1:', rightorderpairs.reduce((a, b) => a + b, 0))

function cmp(a, b) {
    //console.log(a,'<->', b)
    let rightorder = false

    const la = Array.isArray(a) ? a : [a]
    const ra = Array.isArray(b) ? b : [b]

    for (let j = 0; j < Math.max(la.length, ra.length) && !rightorder; j++) {
        const left = la[j];
        const right = ra[j];
        // console.log('Comparing', left, right)
        if(Array.isArray(left) || Array.isArray(right)) {
            rightorder = cmp(left, right)   
        }
        if(rightorder) break

        if (left < right || left === undefined) {
          //  console.log('Left side smaller', left, right)
            rightorder = true
            break
        } else if (left > right || right === undefined) {
          //  console.log('Right side smaller', left, right)
            rightorder = false
            break
        }
    }

    return rightorder
}
