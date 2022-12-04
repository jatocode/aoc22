const fs = require('fs')
const args = process.argv.slice(2)

const data = fs.readFileSync(args[0], 'utf8')
const lines = data.split('\n')

let cont = 0;
lines.forEach(line => {
    const m = line.match(/(\d+)-(\d+),(\d+)-(\d+)/)
    const s1 = {b:parseInt(m[1]), e:parseInt(m[2])}
    const s2 = {b:parseInt(m[3]), e:parseInt(m[4])}

    if(s1.b <= s2.b && s1.e >= s2.e) cont++
    else if(s2.b <= s1.b && s2.e >= s1.e) cont++

})

console.log('Dag 1', cont)
