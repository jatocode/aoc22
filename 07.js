const osfs = require('fs')
const args = process.argv.slice(2)

const lines = osfs.readFileSync(args[0], 'utf8').split('\n')

const fs = buildFileSystem()
const usage = du(fs)

const totalUnder100000 = usage.dirs
    .filter(x => x.name != '/')
    .filter(x => x.size <= 100000)
    .reduce((a, b) => a + b.size, 0)

console.log('Dag 7, del 1: ', totalUnder100000)

function du(node, dirs = [], path = '') {
    if (node.type === 'd') {
        for (let i = 0; i < node.nodes.length; i++) {
            node.size += du(node.nodes[i], dirs, path + '/' + node.nodes[i].name).size
        }
        dirs.push({ name: node.name, size: node.size })
        //console.log('du', node.name, node.size)
    } else {
        //console.log(path + ' ' + node.size)
    }
    return { dirs: dirs, size: node.size }
}

function buildFileSystem() {
    let root = { name: '/', type: 'd', nodes: [], parent: null, size: 0 }
    let cwd = root

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        if (line.startsWith('$')) {
            let m = line.match(/\$ ([a-z]+) ?(.*)?/)
            if (m) {
                const cmd = m[1]
                const arg = m[2]
                if (cmd === 'ls') {
                    //
                }
                if (cmd === 'cd') {
                    if (arg === '/') {
                        cwd = root
                    } else if (arg === '..') {
                        cwd = cwd.parent
                    } else {
                        cwd = cwd.nodes.find(x => x.name === arg)
                    }
                    //console.log('cd to ', cwd.name)
                }
            }
        } else {
            let m = line.match(/(dir|[0-9]+) (.*)/)
            if (m) {
                let type = m[1]
                let node = { name: m[2] }
                if (type === 'dir') {
                    node.type = 'd'
                    node.size = 0
                    node.parent = cwd
                    node.nodes = []
                } else {
                    node.type = 'f'
                    node.size = parseInt(m[1])
                    node.parent = cwd
                }
                //console.log(cwd.name,'-',node.name)
                cwd.nodes.push(node)
            }
        }
    }
    return root
}

