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

const remove = (grid: string[][]) => {
    const maxRow = grid.length
    const maxCol = grid[0]!.length

    const removeList: [number, number][] = []
    for (let row = 0; row < maxRow; row++) {
        for (let col = 0; col < maxCol; col++) {
            if (grid[row]![col]! === "@") {
                if (getAround(row, col, maxRow, maxCol).filter(([r, c]) => grid[r]![c]! === "@").length < 4) {
                    removeList.push([row, col])
                }
            }
        }
    }
    for (const [row, col] of removeList) grid[row]![col]! = "."
    return removeList.length
}

const main = (data: string) => {
    const grid = data.split("\r\n").map(line => line.split(""))

    let cnt = 0
    let removeNum = remove(grid)
    while (removeNum) {
        cnt += removeNum
        removeNum = remove(grid)
    }
    return cnt
}

console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8")))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8")))
