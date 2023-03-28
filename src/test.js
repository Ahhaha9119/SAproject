import fs from 'fs';

let rawdata = fs.readFileSync('./json/package_data.json');
let data = JSON.parse(rawdata);

console.log(data);
