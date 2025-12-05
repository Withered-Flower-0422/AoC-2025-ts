import { readFileSync } from "fs"
import { join } from "path"

const main = (data: string) => {
    const res: [number, number][] = []

    const ranges = (data.split("\r\n\r\n") as [string, string])[0]
        .split("\r\n")
        .map(l => l.split("-").map(Number) as [number, number])

    outer: while (ranges.length) {
        const [ns, ne] = ranges.shift()!
        for (let i = 0; i < res.length; i++) {
            const [s, e] = res[i]!
            if (ne < s || ns > e) continue
            ranges.push([Math.min(s, ns), Math.max(e, ne)])
            res.splice(i, 1)
            continue outer
        }
        res.push([ns, ne])
    }

    return res.reduce((acc, [s, e]) => acc + e - s + 1, 0)
}

console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8")))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8")))
