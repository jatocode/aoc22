const osfs = require('fs')
const args = process.argv.slice(2)

const trees = osfs.readFileSync(args[0], 'utf8').split('\n')

const width = trees[0].length
const height = trees.length

let topo = buildMap()
const v = checkVisibility(topo)

console.log('Dag 8, del 1: Synliga träd: ', v)

function checkVisibility(map) {
    let visibles = 0
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const tree = map[`${x},${y}`]
            if (nbLeft(x, y, map).every(x => x.h < tree.h) || nbRight(x, y, map).every(x => x.h < tree.h) ||
                nbUp(x, y, map).every(x => x.h < tree.h) || nbDown(x, y, map).every(x => x.h < tree.h)) {
                tree.v = true
                visibles++
                continue
            }
        }
    }
    return visibles
}

function nbLeft(x, y, map) {
    let nb = []
    for (let i = 0; i < x; i++) {
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
    for (let i = 0; i < y; i++) {
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
            map[`${x},${y}`] = { h: parseInt(treeline[x]), v: undefined }
        }
    }
    return map
}


