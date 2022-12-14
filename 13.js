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
    console.log(`Pair ${pair} are ${res > 0 ? 'in' : '\x1b[31mNOT\x1b[0m in'} the right order`)

    if (res > 0) rightorderpairs.push(pair)
}
console.log('Dag 13, del 1:', rightorderpairs.reduce((a, b) => a + b, 0))

const allpackets = lines.filter(x => x.length > 1).map(l => { 
    return {l:l.trim(), parsed: JSON.parse(l.trim())}
})
const packet1 = '[[2]]'
const packet2 = '[[6]]'
allpackets.push({l: packet1, parsed: JSON.parse(packet1)})
allpackets.push({l: packet2, parsed: JSON.parse(packet2)})

const sorted = allpackets.sort((a, b) => cmp(b.parsed, a.parsed))

const packet1i = sorted.findIndex(x => x.l === packet1) + 1
const packet2i = sorted.findIndex(x => x.l === packet2) + 1

console.log('Dag 13, del 2:', packet1i * packet2i)

// Jämför Jämför Jämför
function cmp(a, b) {
    const la = Array.isArray(a) ? a : [a]
    const ra = Array.isArray(b) ? b : [b]

    let cmpvalue = 0
    for (let j = 0; j < Math.max(la.length, ra.length) && cmpvalue === 0; j++) {
        const left = la[j];
        const right = ra[j];
        
        // One of the values are an array. Fortsätt gräva!
        if (Array.isArray(left) || Array.isArray(right)) {
            cmpvalue = cmp(left, right)
        } else {
            if (left === undefined && !isNaN(right) ) {
                cmpvalue = 1
            } else if (!isNaN(left) && right === undefined) {
                cmpvalue = -1
            } else if (left === undefined && right === undefined) {
                cmpvalue = 0
            } else {
                cmpvalue = right - left
            }
        }
    }

    return cmpvalue
}

