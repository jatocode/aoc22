const fs = require('fs')
const args = process.argv.slice(2)

const data = fs.readFileSync(args[0], 'utf8')
const lines = data.split('\n')


// Krånglade till det rejält för mig men orkar inte städa nu. borde köra % av allt

const scores = [1,2,3]
function score1(s, scores) {
    switch (s) {
        case 'A': return scores[0]
        case 'B': return scores[1]
        case 'C': return scores[2]
    }
    return 0;
}

function score2(s, scores) {
    switch (s) {
        case 'X': return scores[0]
        case 'Y': return scores[1]
        case 'Z': return scores[2]
    }
    return 0
}

function scoretable() {
    return lines.map((l) => {
        const m = l.match(/(\w).*(\w)/)
        const sc1 = score1(m[1], scores)
        const sc2 = score2(m[2], scores)
        return { "sc1": sc1, "sc2": sc2 }
    })
}

function scoretablePart2() {
    return lines.map((l) => {
        const m = l.match(/(\w).*(\w)/)
        const sc1 = score1(m[1], scores)
        const desired = score2(m[2], scores)
        let sc2 = undefined
        if (desired === 2) sc2 = sc1
        else if (sc1 == 1) { 
            switch (desired) {
                case 1: sc2 = 3; break; 
                case 3: sc2 = 2; break;  
            }
        } else if (sc1 == 2) {
            switch (desired) {
                case 1: sc2 = 1; break;
                case 3: sc2 = 3; break;
            }
        } else if (sc1 == 3) {
            switch (desired) {
                case 1: sc2 = 2; break;
                case 3: sc2 = 1; break;
            }
        }

        return { "sc1": sc1, "sc2": sc2 }
    })
}

function points(sc1, sc2) {
    if (sc1 === sc2) return 3
    return sc2 === ((sc1 % 3) + 1) ? 6 : 0
}

function game(st) {
    return st.reduce((acc, round) => acc += points(round.sc1, round.sc2) + round.sc2, 0)
}
const total = game(scoretable())
console.log('Dag 2, del 1', total)

const total2 = game(scoretablePart2())
console.log('Dag 2, del 2', total2)
