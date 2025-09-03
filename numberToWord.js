import { decimalToWord } from "./decimalToWord.js";
import { integerToWord } from "./integerToWord.js";


const decimalSymbol = {
    decimalPoint: 'ចុច',
    decimalComma: 'ក្បៀស'
}

export const numberToWord = (input) => {
    const num = Number(input);

    if (isNaN(num)) {
        throw Error('The number format is invalid')
    }

    if (Number.isInteger(num)) {
        return integerToWord(num)
    } else {
        return handleDecimal(input.toString())
    }
}

const handleDecimal = (input) => {
    const [integer, decimal] = input.split('.')
    const integerPart = integerToWord(Number(integer))
    const decimalPart = decimalToWord(decimal)
    return `${integerPart}-*${decimalSymbol.decimalComma}*${decimalPart}`
}
