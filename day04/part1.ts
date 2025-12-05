import { readFileSync } from "fs"
import { join } from "path"

const getAround = (row: number, col: number, maxRow: number, maxCol: number) =>
    (
        [
            [row - 1, col - 1],
            [row - 1, col],
            [row - 1, col + 1],
            [row, col - 1],
            [row, col + 1],
            [row + 1, col - 1],
            [row + 1, col],
            [row + 1, col + 1],
        ] as [number, number][]
    ).filter(([r, c]) => r >= 0 && r < maxRow && c >= 0 && c < maxCol)

const main = (data: string) => {
    const grid = data.split("\r\n")
    const maxRow = grid.length
    const maxCol = grid[0]!.length

    let cnt = 0
    for (let row = 0; row < maxRow; row++) {
        for (let col = 0; col < maxCol; col++) {
            if (grid[row]![col]! === "@") {
                if (getAround(row, col, maxRow, maxCol).filter(([r, c]) => grid[r]![c]! === "@").length < 4) {
                    cnt++
                }
            }
        }
    }
    return cnt
}

console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8")))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8")))
