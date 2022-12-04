const fs = require('fs')
const args = process.argv.slice(2)

const data = fs.readFileSync(args[0], 'utf8')
const lines = data.split('\n')

let cont = 0
let overlaps = 0
lines.forEach(line => {
    const m = line.match(/(\d+)-(\d+),(\d+)-(\d+)/)
    const s1 = {b:parseInt(m[1]), e:parseInt(m[2])}
    const s2 = {b:parseInt(m[3]), e:parseInt(m[4])}

    // Del 1
    if(s1.b <= s2.b && s1.e >= s2.e) cont++
    else if(s2.b <= s1.b && s2.e >= s1.e) cont++

    // Del 2
    const r1 = Array.from(new Array(s1.e-s1.b+1), (x, i) => i + s1.b);
    const r2 = Array.from(new Array(s2.e-s2.b+1), (x, i) => i + s2.b);
    const intersect = r1.filter(x => r2.includes(x));

    if(intersect.length > 0) overlaps++
})

console.log('Dag 1', cont)
console.log('Dag 2', overlaps)
