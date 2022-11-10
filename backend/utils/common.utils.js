luhn_checksum = (code) => {//5366965822321460
    let len = code.length
    const parity = len % 2
    let sum = 0
    for (let i = len-1; i >= 0; i--) {
        let d = parseInt(code.charAt(i))
        if (i % 2 == parity) { d *= 2 }
        if (d > 9) { d -= 9 }
        sum += d
    }
    return sum % 10
}

exports.luhn_validate = (fullcode) => {
    return luhn_checksum(fullcode.toString()) == 0
}