const fs = require('fs')
const args = process.argv.slice(2)

const data = fs.readFileSync(args[0], 'utf8')
const lines = data.split('\n')

function prio(x) {
    return x > 96 ? x - 96 : x - 65 + 27
}

const tot = lines.reduce((sum, l) => {
    const h1 = l.substring(0, l.length/2).split('')
    const h2 = l.substring(l.length/2).split('')
    const both = h1.filter(x => h2.includes(x)).join().charCodeAt(0)
    return sum + prio(both)
},0)
console.log('Dag 3, del 1', tot)

let sum = 0
for(let i=0;i<lines.length;i+=3) {
    const h1 = lines[i].split('')
    const h2 = lines[i+1].split('')
    const h3 = lines[i+2].split('')

    const all = h1.filter(x => h2.includes(x)).filter(x => h3.includes(x)).join().charCodeAt(0)
    sum += prio(all)
}
console.log('Dag 3, del 2', sum)

