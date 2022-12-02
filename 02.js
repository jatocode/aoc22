const fs = require('fs')
const args = process.argv.slice(2)

const data = fs.readFileSync(args[0], 'utf8')
const lines = data.split('\n')

function score1(s, scores) {
    switch(s) {
        case 'A': return scores[0]
        case 'B': return scores[1]
        case 'C': return scores[2]
    }
    return 0;
}

function score2(s, scores) {
    switch(s) {
        case 'X': return scores[0]
        case 'Y': return scores[1]
        case 'Z': return scores[2]
    }
    return 0
}

function scoretable(sc1scores, sc2scores) {
    return lines.map((l) =>
    {
        const m = l.match(/(\w).*(\w)/)
        const sc1 = score1(m[1], sc1scores)
        const sc2 = score2(m[2], sc2scores)
        return {"sc1":sc1, "sc2":sc2}
    })
}

function points(sc1, sc2) {
    if (sc1 === sc2) return 3
    if (sc2 === 3) return sc1 === 2 ? 6 : 0
    if (sc2 === 2) return sc1 === 1 ? 6 : 0
    if (sc2 === 1) return sc1 === 3 ? 6 : 0
}

function game(st) {
    return st.reduce((acc, round) => acc += points(round.sc1, round.sc2) + round.sc2, 0)
}
const t = scoretable([1,2,3], [1,2,3])
const total = game(t)
console.log('Dag 2, del 1', total)
