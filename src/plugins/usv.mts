export type USV = number

export function isUSV(usv: number): usv is USV {
    return !isNaN(usv) && usv >= 0 && usv <= 0x10FFFF
}

export function parseUSV(src: string): USV {
    return 3 < src.length && src.length < 7 ? parseInt(src, 16) as USV : NaN
}

export function USVtoString(usv: USV): string {
    return usv.toString(16).toUpperCase().padStart(4,"0")
}