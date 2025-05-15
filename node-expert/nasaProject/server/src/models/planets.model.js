const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path');

const habitablePlanets = [];

const isHabitablePlanet = (planet) =>
    planet['koi_disposition'] === 'CONFIRMED' && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
const file = path.join(__dirname, '..', '..', 'data', 'kepler_data.csv');

async function loadPlanetsData() {
   return new Promise((resolve, reject) => {
       fs.createReadStream(file)
           .pipe(parse({
               comment: '#',
               columns: true,
           }))
           .on('data', (data) => {
               if(isHabitablePlanet(data))
               {
                   habitablePlanets.push(data);
               }
           })
           .on("end", () => {
               resolve();
           })
           .on("error", (err) => {
               reject(err)
           });
   })
}

module.exports = {
    loadPlanetsData,
    planets: habitablePlanets
}