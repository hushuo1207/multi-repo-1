
const array = [1, 5, 2, 3, 4, 2, 3, 1, 3, 4]

// 1. 暴力循环
function bruteForceUnique(array) {
    for (let i = 0; i < array.length; i++) {
        let arrayItem = array[i]
        for (let j = i + 1; j < array.length; j++) {
            if (arrayItem === array[j]) {
                array.splice(j, 1)
                j--
            }
        }
    }
    return array
}
console.log(bruteForceUnique(array))

// 2. set
let mySet = new Set(array);
let myArray = [...mySet];
console.log(myArray)

// 3. Map
let myMap = new Map()
for (let i = 0; i < array.length; i++) {
    if (myMap.has(array[i])) {
        continue
    } else {
        myMap.set(i, array[i])
    }
}
let myArray = [...myMap.values()];
console.log(myArray)

// 4. 哈希表
let hashTable = {}, max = array[0], result = []

for (let i = 0; i < array.length; i++) {
    max = max > array[i] ? max : array[i]
    if (array[i] in hashTable) {
        continue
    } else {
        hashTable[array[i]] = true
    }
}

for (let i = 0; i <= max; i++) {
    while (hashTable[i]) {
        result.push(i);
        hashTable[i] = false
    }
}
console.log(result)


