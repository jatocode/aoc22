const osfs = require('fs')
const args = process.argv.slice(2)

const trees = osfs.readFileSync(args[0], 'utf8').split('\n')

const width = trees[0].length
const height = trees.length

let topo = buildMap()
const r = checkVisibility(topo)

console.log('Dag 8, del 1: Synliga träd: ', r.visible)
console.log('Dag 8, del 2: Bästa scenic score: ', r.topscore)

function checkVisibility(map) {
    let visibles = 0
    let topscore = 0
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const tree = map[`${x},${y}`]
            const nbl = nbLeft(x, y, map)
            const nbr = nbRight(x, y, map)
            const nbu = nbUp(x, y, map)
            const nbd = nbDown(x, y, map)
            if (nbl.every(x => x < tree) || nbr.every(x => x < tree) ||
                nbu.every(x => x < tree) || nbd.every(x => x < tree)) {
                visibles++

                // Del 2 scenic score
                const losR = lineOfSight(tree, nbr)
                const losL = lineOfSight(tree, nbl)
                const losU = lineOfSight(tree, nbu)
                const losD = lineOfSight(tree, nbd)

                const score = losR * losL * losU * losD

                if(score > topscore) topscore = score
                continue
            }
        }
    }
    return {visible:visibles, topscore: topscore}
}

function lineOfSight(tree, line) {
    let c=0
    for (let i=0; i < line.length; i++) {
        c++
        if(line[i] >= tree) break
    }
    return c
}


function nbLeft(x, y, map) {
    let nb = []
    for (let i = x - 1; i >= 0; i--) {
        const tree = map[`${i},${y}`]
        nb.push(tree)
    }
    return nb
}
function nbRight(x, y, map) {
    let nb = []
    for (let i = x + 1; i < width; i++) {
        const tree = map[`${i},${y}`]
        nb.push(tree)
    }
    return nb
}
function nbUp(x, y, map) {
    let nb = []
    for (let i = y - 1; i >= 0; i--) {
        const tree = map[`${x},${i}`]
        nb.push(tree)
    }
    return nb
}
function nbDown(x, y, map) {
    let nb = []
    for (let i = y + 1; i < height; i++) {
        const tree = map[`${x},${i}`]
        nb.push(tree)
    }
    return nb
}

function buildMap() {
    let map = {}
    for (let y = 0; y < trees.length; y++) {
        const treeline = trees[y].split('')
        for (let x = 0; x < treeline.length; x++) {
            map[`${x},${y}`] = parseInt(treeline[x])
        }
    }
    return map
}


