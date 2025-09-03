import { integerToWord, integerToCurrencyWord } from './integerToWord.js';
import { numberToWord } from './numberToWord.js';

const AndWord = 'និង'
const SharpWord = 'គត់'
const CentWord = 'សេន'

const currencyCountry = {
    USD: {
        symbol: '$',
        name: 'ដុល្លារ',
    },
    KHR: {
        symbol: '៛',
        name: 'រៀល',
    }
}

export const currencyToWord = (input, currency, isLong = true)  => {
    const num = Number(input);

    if (isNaN(num)) {
        throw Error('The number format is invalid')
    }

    const { symbol, name } = currencyCountry[currency]
    let result = ''

    if (Number.isInteger(num)) {
        // result = handleInteger(input.toString(), name)
        result = integerToCurrencyWord(input.toString(), name)
    } else {
        result = handleDecimal(input.toString(), name)
        return result
    }
    if (!isLong) 
        return `${symbol}  ${result}`
    return `${result}${name}`
}

const handleInteger = (input, currencyNameg) => {
    const num = Number(input)
    const integerPart = integerToWord(num)

    const result =
        integerPart +
        ` ${currencyName} ` +
        SharpWord

    return result
}

const handleDecimal = (input, currencyName) => {
    let [integer, decimal] = input.split('.')
    const integerPart = integerToCurrencyWord(Number(integer))

    if (decimal.length <= 2) {
        // handle 0.5 => 0.50, retain 0
        // fifty instead of five CentWord
        if (decimal.length === 1) {
            decimal = decimal + '0'
        }
        const decimalPart = integerToCurrencyWord(Number(decimal))

        const result =
            integerPart +
            `${currencyName}` +
            `${AndWord}` +
            `${decimalPart}` +
            CentWord

        return result
    } else {
        const num = integerToCurrencyWord(Number(input))
        return `${num}${currencyName}`
    }
}