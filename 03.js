const fs = require('fs')
const args = process.argv.slice(2)

const data = fs.readFileSync(args[0], 'utf8')
const lines = data.split('\n')

const tot = lines.reduce((sum, l) => {
    const h1 = l.substring(0, l.length/2).split('')
    const h2 = l.substring(l.length/2).split('')

    const both = h1.filter(x => h2.includes(x)).join().charCodeAt(0)

    prio = both > 96 ? both - 96 : both - 65 + 27
    return sum + prio

},0)

console.log('Dag 3, del 1', tot)
