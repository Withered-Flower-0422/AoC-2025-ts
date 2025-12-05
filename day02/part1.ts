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
            const len = str.length
            if (len % 2 !== 0) continue
            const half = len / 2
            if (str.slice(0, half) === str.slice(half)) invalids.push(i)
        }
    }
    return invalids.reduce((acc, cur) => acc + cur, 0)
}

console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8")))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8")))
