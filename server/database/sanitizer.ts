
export const replaceValue = /["'`\\]/g;

export function replacer(subString: String) {
    return `\\${subString}`;
}

export function sanitize(value: any): string {
    switch (typeof value) {
        case 'string':
            return `"${value.replace(replaceValue, replacer)}"`;
        case 'number':
            return `${value}`;
        case 'undefined':
            return 'null';
        case 'object': 
            return 'null';
        default:
            throw new Error('unsanitizable value');
    }
}