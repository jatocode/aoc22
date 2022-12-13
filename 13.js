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
    console.log(`Pair ${pair} are ${res ? 'in' : 'NOT in'} the right order`)
    console.log()

    if (res) rightorderpairs.push(pair)
}
console.log('Dag 13, del 1:', rightorderpairs.reduce((a, b) => a + b, 0))

function cmp(a, b) {
    let rightorder = true
    let done = false
    for (let i = 0; i < a.length && !done; i++) {
        if (Array.isArray(a[i]) && Array.isArray(b[i])) {
            const l = a[i]
            const r = b[i]
            if (l.length < 2) {
                console.log('Comparing', l, r, r[0])
                if (r[0] < l[0] || r[0] === undefined) {
                    //console.log('Right side smaller', l[0], r[0])
                    rightorder = false
                    done = true
                    break
                }
            } else {
                rightorder = cmp(l, r)
            }
        } else {
            // Both are integers
            const l = Array.isArray(a[i]) ? a[i] : [a[i]]
            const r = Array.isArray(b[i]) ? b[i] : [b[i]]
            for (let j = 0; j < r.length && !done; j++) {
                const left = l[j];
                const right = r[j];
                console.log('Mixed comparing', left, right, done, j)

                if (left < right || left === undefined) {
                    console.log('Left side smaller', left, right)
                    rightorder = true
                    done = true
                    j = r.length
                    break
                } else if(left > right || right === undefined) {
                    console.log('Right side smaller', left, right)
                    rightorder = false
                    done = true
                    j = r.length

                    break
                }   
            }
        }
    }
    return rightorder
}
