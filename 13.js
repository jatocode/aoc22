const osfs = require('fs')
const args = process.argv.slice(2)

const lines = osfs.readFileSync(args[0], 'utf8').split('\n')

for (let i = 0; i < lines.length; i+=3) {
    const line1 = lines[i]
    const line2 = lines[i + 1]

    console.log(line1, getList(line1))
    console.log(line2, getList(line2))
    let res = cmp(getList(line1), getList(line2))
    console.log(res)
    console.log()
    
}

function cmp(a, b) {
    let smaller = true
    for (let i = 0; i < a.length; i++) {
        const e = a[i];
        console.log(e, b[i])
        if(b[i] < e) {
            smaller = false
            break
        }
    }
    return smaller
}

function isList(input) {
    return input.includes('[')
}

function getList(input) {
    const m = input.match(/\[(.*)\]/)

    if(isList(m[1])) {
        console.log(m)
        return getList(m[1]) 
    }

    const list = []
    const split = m[1].split(',')
    for (let i = 0; i < split.length; i++) {
        const e = parseInt(split[i])
        if(!isNaN(e)) list.push(e)
    }

    return list
}