const fs = require('fs')
const args = process.argv.slice(2)

const data = fs.readFileSync(args[0], 'utf8')
const lines = data.split('\n')

// Bygg crate struktur
let crates = []
let i = 0
while(lines[i].length > 0) {
    const line = lines[i++]
    let cr = 0
    for(let j=0;j<line.length;j+=4,cr+=1) {
        const cl = line.substring(j,j+3)
        const m = cl.match(/\[([A-Z])\]/)
        if(crates[cr] === undefined) crates[cr] = []
        if(m) crates[cr].unshift(m[1])
    }    
}

//Move it
lines.forEach(line => {
    const m = line.match(/move (\d+) from (\d+) to (\d+)/)
    if(m) {
        const a = parseInt(m[1])
        const f = parseInt(m[2]) - 1
        const t = parseInt(m[3]) - 1
        for(let i=0;i<a;i++) {
            crates[t].push( crates[f].pop() )
        }
    }
})

const message = crates.reduce((msg,x) => msg+=x.pop(), '')
console.log('Dag 5, del 1:', message)