import { Separator } from "./constant.js";
import { SINGLE_DIGIT } from "./integerToWord.js";

export const  decimalToWord = (num) => {
    const numArr = num.split('')
    const digitArr = numArr.map((char) => {
        return Separator + SINGLE_DIGIT[Number(char)]
    })

    return digitArr.join('');
}