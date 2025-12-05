import { readFileSync } from "fs"
import { join } from "path"

const main = (data: string) => {
    let idx = 50
    return data
        .split("\r\n")
        .map(s => [s.at(0)! === "L" ? -1 : 1, +s.slice(1)] as const)
        .reduce((acc, [dir, num]) => acc + +!(idx = (idx + dir * num + 100) % 100), 0)
}

console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8")))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8")))
