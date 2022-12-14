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
    console.log(`Pair ${pair} are ${res === 1 ? 'in' : '\x1b[31mNOT\x1b[0m in'} the right order\n`)

    if (res === 1) rightorderpairs.push(pair)
}
console.log('Dag 13, del 1:', rightorderpairs.reduce((a, b) => a + b, 0))

function cmp(a, b) {
    const la = Array.isArray(a) ? a : [a]
    const ra = Array.isArray(b) ? b : [b]

    let cmpvalue = 0
    for (let j = 0; j < Math.max(la.length, ra.length) && cmpvalue === 0; j++) {
        const left = la[j];
        const right = ra[j];

        console.log('Comparing', left, ' and ', right)

        // One of the values are an arrays
        if (Array.isArray(left) || Array.isArray(right)) {
            cmpvalue = cmp(left, right)
        } else {
            if (left === undefined && right) {
                console.log('Left is undefined.', left, right)
                cmpvalue = 1
                break
            } else if (left && right === undefined) {
                console.log('Right is undefined.', left, right)
                cmpvalue = -1
                break
            } else if (left === undefined && right === undefined) {
                console.log('Both are undefined.', left, right)
                cmpvalue = 0
            } else if (left < right) {
                console.log('Left is smaller. Right order', left, right)
                // Right order
                cmpvalue = 1
                break
            } else if (left > right) {
                console.log('Right side is smaller. NOT in order', left, right)
                // Wrong order
                cmpvalue = -1
            } else if (left === right) {
                // Equal, continue
                console.log('Equal, continue', left, right)
                cmpvalue = 0
            }
        }
    }

    return cmpvalue
}

