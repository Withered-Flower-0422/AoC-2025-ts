import { readFileSync } from "fs"
import { join } from "path"

const isFresh = (id: number, ranges: [number, number][]) => ranges.some(([start, end]) => start <= id && id <= end)

const main = (data: string) => {
    const [p1, p2] = data.split("\r\n\r\n") as [string, string]
    const ranges = p1.split("\r\n").map(l => l.split("-").map(Number) as [number, number])
    const ids = p2.split("\r\n").map(Number)

    return ids.filter(id => isFresh(id, ranges)).length
}

console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8")))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8")))
