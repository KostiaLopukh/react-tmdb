export const getId = (location) => {
    const arr = []
    for (let i = location.length - 1; i >= 0; i--) {
        if (location[i] === '/') {
            break
        }
        arr.push(location[i]);
    }
    return arr.reverse().join('')
}