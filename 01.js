const fs = require('fs')
const args = process.argv.slice(2)

const data = fs.readFileSync(args[0], 'utf8')
const lines = data.split('\n')

let elves = []
let elve = 1
let max = 0
let maxElve = 0
lines.forEach(x => {
    if(x.length != 0) {
    const cal = parseInt(x)
    elves[elve] = elves[elve] == undefined ? cal : elves[elve] + cal
    console.log(elves[elve])
    }
    if (elves[elve] > max) {
        max = elves[elve]
        maxElve = elve
    }
    if (x.length === 0) elve++
})

console.log(`Del 1: Most carrying is ${maxElve} with ${max}`)

console.log(elves)