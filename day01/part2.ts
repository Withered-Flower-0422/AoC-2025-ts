import { readFileSync } from "fs"
import { join } from "path"

const main = (data: string) => {
    let cnt = 0
    let idx = 50
    for (const [dir, num] of data.split("\r\n").map(s => [s.at(0)! === "L" ? -1 : 1, +s.slice(1)] as const)) {
        for (let i = 0; i < num; i++) {
            idx += dir
            if (idx === -1) idx = 99
            if (idx === 100) idx = 0
            if (idx === 0) cnt++
        }
    }
    return cnt
}

console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8")))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8")))
