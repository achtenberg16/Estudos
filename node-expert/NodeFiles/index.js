const { parse } = require('csv-parse');
const fs = require('fs');

const results = [];

const isHabitablePlanet = (planet) =>
    planet['koi_disposition'] === 'CONFIRMED' && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;

fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on('data', (data) => {
        // console.log(data);
        if(isHabitablePlanet(data))
        {
            results.push(data);
        }
    })
    .on("end", () => {
        console.log("end")
        console.log(results.map((item) => item["kepler_name"]))
        console.log(results.length);
    })
    .on("error", (err) => {
        console.log("error")
        console.log(err);
    });

