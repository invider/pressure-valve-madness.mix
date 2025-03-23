function toGIMP(colors) {
    const buf = []

    buf.push(`GIMP Palette`)
    buf.push(`#Palette Name: Steam City`)
    buf.push(`#Description:`)
    buf.push(`#Colors: ${colors.length}`)

    colors.forEach(c => {
        const hex = c.substring(1)
        const RGBA = lib.color.color2RGBA(c)
        buf.push(`${RGBA[0]}\t${RGBA[1]}\t${RGBA[2]}\t${hex}`)
    })

    const res = buf.join("\n")
    log(res)
    return res
}
