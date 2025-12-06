import { readFileSync } from "fs"
import { join } from "path"

const main = (data: string) => {
    const worksheet = data.split("\r\n")
    const digits = worksheet.map(row =>
        row
            .split(" ")
            .filter(Boolean)
            .map(d => d.length)
    )
    const rows = digits.length
    const cols = digits[0]!.length

    const maxDigits: number[] = []
    for (let i = 0; i < cols; i++) {
        let max = 0
        for (let j = 0; j < rows; j++) {
            if (digits[j]![i]! > max) {
                max = digits[j]![i]!
            }
        }
        maxDigits.push(max)
    }

    const grid: string[][] = []
    for (let i = 0; i < rows; i++) {
        const row: string[] = []
        let line = worksheet[i]!
        for (let j = 0; j < cols; j++) {
            const len = maxDigits[j]!
            row.push(line.slice(0, len))
            line = line.slice(len + 1)
        }
        grid.push(row)
    }

    let sum = 0
    for (let i = 0; i < cols; i++) {
        const method = grid.at(-1)![i]!.trim() as "*" | "+"
        const len = maxDigits[i]!
        const num: number[] = []
        for (let j = 0; j < len; j++) {
            let s = ""
            for (let k = 0; k < rows - 1; k++) {
                s += grid[k]![i]![j]!
            }
            num.push(+s)
        }
        sum += method === "*" ? num.reduce((a, b) => a * b) : num.reduce((a, b) => a + b)
    }
    return sum
}

console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8")))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8")))
