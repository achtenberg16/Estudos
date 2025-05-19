const launches = new Map();

const launch = {
    flightNumber: 100,
    mission: "Kepler Exploraation X",
    rocket: "Explorer IS1",
    launchDate: new Date("December 27, 20230"),
    target: "Kepler-442 b",
    customers: ["NASA", "ZTM"],
    upcoming: true,
    success: true,
};

launches.set(launch.flightNumber, launch);


function getAllLaunches () {
    return Array.from(launches.values());   
}

module.exports = {
    getAllLaunches
};