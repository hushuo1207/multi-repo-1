const deepClone = (obj, cache) => {
    if (!cache) {
        cache = new Map
    }

    if (obj instanceof Object) {
        if (cache.get(obj)) {
            return cache.get(obj)
        }
        let result;
        if (obj instanceof Function) {
            if (obj.prototype) {
                //return function (...args) { obj.call(undefined, ...args) }
                //error 1
                return function (...args) { return obj.call(this, ...args) }
            } else {
                return (...args) => obj.call(undefined, ...args)
            }
        } else if (obj instanceof Date) {
            return new Date(obj.getTime())
        } else if (obj instanceof RegExp) {
            return new RegExp(obj.source, obj.flags)
        } else if (obj instanceof Array) {
            result = [];
        } else {
            result = {}
        }
        cache.set(obj, result)
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                result[key] = deepClone(obj[key], cache)
            }
        }
        return result;
    } else {
        return obj;
    }
}
export default { deepClone }
// const a = {
//     number: 1, bool: false, str: 'hi', empty1: undefined, empty2: null,
//     array: [
//         { name: 'frank', age: 18 },
//         { name: 'jacky', age: 19 }
//     ],
//     date: new Date(2000, 0, 1, 20, 30, 0),
//     regex: /\.(j|t)sx/i,
//     obj: { name: 'frank', age: 18 },
//     f1: (a, b) => a + b,
//     f2: function (a, b) { return a + b }
// }
// a.self = a

// const b = deepClone(a)

// console.log(b.self === b)
// // true
// b.self = 'hi'
// console.log(a.self !== 'hi')
// //true
// console.log(a);
// console.log(b);