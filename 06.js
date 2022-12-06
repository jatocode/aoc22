const { assert } = require('console')
const fs = require('fs')
const args = process.argv.slice(2)

const data = fs.readFileSync(args[0], 'utf8')

const test1 = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb'
const test2 = 'bvwbjplbgvbhsrlpgdmjqwftvncz'
const test3 = 'nppdvjthqldpwncqszvftbrmjlhg'
const test4 = 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg'
const test5 = 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw'

function findMarker(line, length=4) {
    let signal = []
    let i = 0
    const data = line.split('')
    while(i < data.length) {
        signal[(i++) % length] = data[i]
        if(signal.length > length-1) {
            const set = new Set(signal)
            if(set.size === length) return i+1
        }
    }
}

assert(findMarker(test1) === 7)
assert(findMarker(test2) === 5)
assert(findMarker(test3) === 6)
assert(findMarker(test4) === 10)
assert(findMarker(test5) === 11)

console.log('Dag 6, del 1:', findMarker(data))

console.log('Dag 6, del 2:', findMarker(data, 14))
