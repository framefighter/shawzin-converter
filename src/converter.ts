/**
 * NOTES:
    |       C       [g]
    |----------B    [f]
    |       A       [e]
    |----------9    [d]
    |       8       [c]
    |----------7    [b]
    |       6       [a]
    |----------5    [g]
    |       4       [f]
    |----------3    [e]
    |       2       [d]
    |          1    [c]
 */

type INotes = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "A" | "B" | "C"

export class Converter {
    private noteLookup: { [key in INotes]: string } = {
        "1": "B",
        "2": "C",
        "3": "E",
        "4": "J",
        "5": "K",
        "6": "M",
        "7": "R",
        "8": "S",
        "9": "U",
        "A": "h",
        "B": "i",
        "C": "k"
    }
    private charMax: number = 64
    private speed: number
    private scale: number
    private pos: number
    private music: string

    constructor(music: string, scale?: number, speed?: number) {
        this.music = music.replace(/[\r\n]/g, "")
        this.speed = speed || 3
        this.scale = Math.min(Math.abs(scale || 5), 8)
        this.pos = 0
    }

    private getNote(note: INotes): string {
        return this.noteLookup[note] || "B"
    }

    private toChar(n: number): string {
        if (n > 25 && n < 52) {
            return String.fromCharCode(6 * 16 + 1 - 26 + n)
        } else if (n < 26) {
            return String.fromCharCode(4 * 16 + 1 + n)
        } else if (n > 51 && n < 62) {
            return (n - 52).toString()
        } else if (n === 62) {
            return "+"
        } else if (n === 63) {
            return "/"
        }
        return ""
    }

    private posToString(): string {
        const s2 = this.pos % this.charMax
        if (s2 > this.charMax - 1) {
            return ""
        }
        const s1 = (this.pos - s2) / 64
        return this.toChar(s1) + this.toChar(s2)
    }

    private convertPos(): string {
        let res = "",
            note = "",
            noteC = 0

        for (let c of this.music) {
            if (c === "#" || c === "") break
            if (c === "-") {
                if (noteC > 0) {
                    let i = this.getNote(note as INotes)
                    res += i
                    note = ""
                    noteC = 0
                    res += this.posToString()
                }
                this.pos += this.speed
            } else if (c !== "|") {
                note += c
                noteC++
            }
        }
        if (note !== "") {
            res += this.getNote(note as INotes)
            res += this.posToString()
        }
        return res
    }

    get sharable(): string {
        this.pos = 0
        let res: string = this.scale.toString()
        res += this.convertPos()
        return res
    }
}