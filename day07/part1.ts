import { readFileSync } from "fs"
import { join } from "path"

const main = (data: string) => {
    let cnt = 0
    const grid = data.split("\r\n")

    let curRow = 0
    let curCols = new Set([[...grid[0]!].findIndex(x => x === "S")])

    while (++curRow < grid.length) {
        const nextCols = new Set<number>()
        for (const col of curCols) {
            if (grid[curRow]![col]! === ".") {
                nextCols.add(col)
            } else {
                nextCols.add(col + 1)
                nextCols.add(col - 1)
                cnt++
            }
        }
        curCols = nextCols
    }

    return cnt
}

console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8")))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8")))
