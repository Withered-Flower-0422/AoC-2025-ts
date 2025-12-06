import { readFileSync } from "fs"
import { join } from "path"

const main = (data: string) => {
    const grid = data.split("\r\n").map(line => line.split(" ").filter(Boolean))
    const row = grid.length
    const col = grid[0]!.length

    let sum = 0
    for (let i = 0; i < col; i++) {
        const method = grid.at(-1)![i]! as "+" | "*"
        let res = +grid[0]![i]!
        for (let j = 1; j < row - 1; j++) {
            method === "+" ? (res += +grid[j]![i]!) : (res *= +grid[j]![i]!)
        }
        sum += res
    }
    return sum
}

console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8")))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8")))
