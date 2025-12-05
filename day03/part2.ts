import { readFileSync } from "fs"
import { join } from "path"

const main = (data: string) => {
    let total = 0
    for (const line of data.split("\r\n")) {
        const bank = line.split("").map(Number)
        let jolts = 0
        for (let i = 0; i < 11; i++) {
            const digit = Math.max(...bank.slice(0, i - 11))
            bank.splice(0, bank.findIndex(x => x === digit) + 1)
            jolts = jolts * 10 + digit
        }

        total += jolts = jolts * 10 + Math.max(...bank)
    }
    return total
}

console.log("Example:", main(readFileSync(join(__dirname, "example.txt"), "utf8")))
console.log("Puzzle:", main(readFileSync(join(__dirname, "puzzle.txt"), "utf8")))
