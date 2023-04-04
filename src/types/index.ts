export interface Validator {
    name?: string //named identifer for the rule
    text?: string //human readable text describing the validation rule
    rule(value: string | undefined): boolean //functor return a boolean value; true for valid, false for invalid. 
}

export class DefaultValidators {
    static NONE(): Validator {
        return {
            name: "None",
            rule(value: string | undefined): boolean { return true }
        }
    }
    static REQUIRED(): Validator {
        return {
            name: "Required",
            text: `Field is required.`,
            rule(value: string | undefined): boolean { return ( value !== "") }
        }
    }
    static MIN(min: number): Validator {
        return {
            name: "Minimum",
            text: `Field must be at least ${min} character${min > 1 ? "s" : ""}.`,
            rule(value: string): boolean { return value.length >= min }
        }
    }
    static MAX(max: number): Validator {
        return {
            name: "Minimum",
            text: `Field must be no more than ${max} character${max > 1 ? "s" : ""}.`,
            rule(value: string): boolean { return value.length <= max }
        }
    }
    static MATCH(match: string[]): Validator {
        return {
            name: "Match",
            text: `Field must be ${match.length > 1 ? "one of " : ""} ${joinStrings(match)} (case insensitive).`,
            rule(value: string): boolean { const v=value.toLowerCase(); return match.findIndex((str) => {str.toLowerCase() === v.toLowerCase()}) >= 0 }
        }
    }
    static EXACTMATCH(match: string[]): Validator {
        return {
            name: "ExactMatch",
            text: `Field must exactly match ${match.length > 1 ? "one of " : ""}${joinStrings(match)}.`,
            rule(value: string): boolean { return match.findIndex((str) => {str === value}) >= 0 }
        }
    }
    static NOT(match: string[]): Validator {
        return {
            name: "DoesNotMatch",
            text: `Field cannot be ${match.length > 1 ? "one of " : ""}${joinStrings(match)} (case insensitive).`,
            rule(value: string): boolean { const v=value.toLowerCase(); return match.findIndex((str) => {str.toLowerCase() === v.toLowerCase()}) === -1 }
        }
    }
    static EXACTNOT(match: string[]): Validator {
        return {
            name: "ExactDoesNotMatch",
            text: `Field cannot exactly match ${match.length > 1 ? "one of " : ""}${joinStrings(match)} (case insensitive).`,
            rule(value: string): boolean { return match.findIndex((str) => {str === value}) === -1 }
        }
    }
}

export type AloofFieldData = {
    "fieldName": string
    "fieldType": string
    "labelText"?: string
    "placeholderText"?: string
    "buttonText"?: string
    "validators"?: Validator[]
    "value": string
    "required"?: boolean
}

function joinStrings(strs: string[]) {
    return strs.reduce((output: string, str: string, i: number, strs: string[]) => {
        return output += i === 0 ? str : i === strs.length -1  ? ", or str" : ", str" 
    },"")
}