const { promises: fes } = require("fs")

async function getData() {
    const encoding = "utf-8";
    return fes.readFile("./data/users.json", { encoding })


}

module.exports = getData;