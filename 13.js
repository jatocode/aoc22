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

    if(pair == 121) {console.log(line1); console.log(line2) }
    if (res) rightorderpairs.push(pair)
}
console.log('Dag 13, del 1:', rightorderpairs.reduce((a, b) => a + b, 0))

function cmp(a, b) {
    const la = Array.isArray(a) ? a : [a]
    const ra = Array.isArray(b) ? b : [b]

    for (let j = 0; j < Math.max(la.length, ra.length); j++) {
        const left = la[j];
        const right = ra[j];

        console.log('Comparing', left, ' and ', right)
        if(Array.isArray(left) || Array.isArray(right)) {
            if(left && right === undefined) {
                return false
            } else if(left === undefined && right) {
                return true
            }

            if(left.length === 0 && right.length === 0) {
                console.log('Both empty - här borde jag fortsätta jämföra tror jag...orkar inte')
                return true
            }
        
            return cmp(left, right)   
        }

        if (left < right || left === undefined) {
            console.log('Left side smaller', left, right)
            return true
        } else if (left > right || right === undefined) {
            console.log('Right side smaller', left, right)
            return false
        }
    }

    return true
}
