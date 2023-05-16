const fs = require("fs");

const arr = []

for (let i = 0; i < 64; i++) {
    arr.push({
        id: i,
        flipped: false,
        disable: false
    })
}

fs.writeFileSync('src/data/cards.json', JSON.stringify(arr), (e) => {
    if (e) {
        console.log(e)
        return;
    }
    console.log('write file success')
})