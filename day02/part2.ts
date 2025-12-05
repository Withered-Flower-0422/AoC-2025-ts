import { readFileSync } from "fs"
import { join } from "path"

const main = (data: string) => {
    const invalids: number[] = []
    for (const [start, end] of data
        .split("\r\n")
        .map(line =>
            line
                .split(",")
                .filter(Boolean)
                .map(str => str.split("-").map(Number) as [number, number])
        )
        .flat()) {
        for (let i = start; i <= end; i++) {
            const str = `${i}`
            const half = str.length / 2
            for (let j = 1; j <= half; j++) {
                const t = (str.length / j) | 0
                if (str.length / j !== t) continue
                if (str.slice(0, j).repeat(t) === str) {
                    invalids.push(i)
                    break
                }
            }
        }
    }
    return invalids.reduce((acc, cur) => acc + cur, 0)
}

console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8")))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8")))
