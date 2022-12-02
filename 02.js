const fs = require('fs')
const args = process.argv.slice(2)

const data = fs.readFileSync(args[0], 'utf8')
const lines = data.split('\n')

function score1(s, scores) {
    switch(s) {
        case 'X': return scores[0]
        case 'Y': return scores[1]
        case 'Z': return scores[2]
    }
    return 0;
}
function score2(s, scores) {
    switch(s) {
        case 'A': return scores[0]
        case 'B': return scores[1]
        case 'C': return scores[2]
    }
    return 0;
}

const scores = [1,2,3]
const scoretable = lines.map((l) =>
{
    const m = l.match(/(\w).*(\w)/)
    const sc1 = score2(m[1], [1,2,3])
    const sc2 = score1(m[2], scores)
    return {"sc1":sc1, "sc2":sc2}
})

function game(st) {
    score = 0
    st.forEach(round => {
        if(round.sc1 < round.sc2) score += round.sc2 + 6
        if(round.sc1 > round.sc2) score += round.sc2
        if(round.sc1 == round.sc2) score += round.sc1 + round.sc2
    })
    return score
}

const total = game(scoretable)
console.log(total)
