const fs = require('fs')
const args = process.argv.slice(2)

const data = fs.readFileSync(args[0], 'utf8')
const lines = data.split('\n')

let elves = []
let elve = 0
let max = 0
let maxElve = 0
lines.forEach(x => {
    if(x.length != 0) {
        const cal = parseInt(x)
        elves[elve] = elves[elve] == undefined ? cal : elves[elve] + cal
    }
    if (elves[elve] > max) {
        max = elves[elve]
        maxElve = elve
    }
    if (x.length === 0) elve++
})

// Del 1
console.log(`Del 1: Most carrying is ${maxElve + 1} with ${max}`)

// Del 2
const sorted = elves.sort((a,b) => b-a)
const top3 = sorted[0] + sorted[1] + sorted[2]

console.log(`Del 2: Topp tre = ${top3}`)
