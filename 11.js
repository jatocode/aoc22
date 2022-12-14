const osfs = require('fs')
const args = process.argv.slice(2)

const lines = osfs.readFileSync(args[0], 'utf8').split('\n')

const monkeys = monkeynotes()
let res = monkeyplay(20, monkeys)
console.log('Dag 11 del 1:', res)

// Fortfarande inte helt säker på varför det här funkar men kändes rätt
const factors = monkeys.map(m => m.test)
const factor = factors.reduce((a, b) => a * b)
res = monkeyplay(10000, monkeys, factor)
console.log('Dag 11 del 2:', res)

function monkeyplay(rounds, monkeynotes, factor) {
    // Gör en kopia så vi inte förstör originalen
    const monkeys = JSON.parse(JSON.stringify(monkeynotes))

    for (let round = 1; round <= rounds; round++) {
        monkeys.forEach(monkey => {
            const itemlen = monkey.items.length
            for (let i = 0; i < itemlen; i++) {
                const worry = monkey.items.shift()
                let newworry = calcworry(worry, monkey.op)
                
                if(factor) newworry = newworry % factor
                else newworry = Math.floor(newworry / 3)

                if (newworry % monkey.test == 0) {
                    monkeys[monkey.iftrue].items.push(newworry)
            //        console.log(monkey.monkey, '->', monkey.iftrue, newworry)
                } else {
                    monkeys[monkey.iffalse].items.push(newworry)
            //        console.log(monkey.monkey, '->', monkey.iffalse, newworry)
                }
                monkey.count++
            }
        })
        // if(round % 1000 == 0) {
        //     console.log('Round', round)
        //     monkeys.forEach(m => console.log(`Monkey ${m.monkey} inspected items ${m.count} times`))
        // }
    }
    const sorted = monkeys.sort((a, b) => b.count - a.count)
    return sorted[0].count * sorted[1].count
}

function calcworry(old, op) {
    const rvalue = op[1] == 'old' ? old : parseInt(op[1])
    if (op[0] == '+') {
        return old + rvalue
    } else if (op[0] == '*') {
        return old * rvalue
    }
}

function monkeynotes() {
    const monkeys = []
    for (let l = 0; l < lines.length; l += 7) {
        const monkey = parseInt(lines[l].match(/Monkey (\d+):/)[1])
        let m = lines[l + 1].match(/Starting items: (.*)/)
        const items = m ? m[1].split(',').map(x => parseInt(x)) : []
        m = lines[l + 2].match(/Operation: new = old (.*)/)
        const op = m ? m[1].split(' ') : ''
        m = lines[l + 3].match(/Test: divisible by (\d+)/)
        const test = m ? parseInt(m[1]) : 0
        m = lines[l + 4].match(/If true: throw to monkey (\d+)/)
        const iftrue = m ? parseInt(m[1]) : 0
        m = lines[l + 5].match(/If false: throw to monkey (\d+)/)
        const iffalse = m ? parseInt(m[1]) : 0
        const count = 0

        monkeys.push({ monkey, items, op, test, iftrue, iffalse, count })
    }
    return monkeys
}