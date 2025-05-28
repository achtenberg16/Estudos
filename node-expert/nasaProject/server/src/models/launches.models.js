const launches = new Map();

let latestFlightNumber = 100;

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

function addNewLaunch (launch) {
    latestFlightNumber += 1;
    launch = Object.assign(launch, { flightNumber: latestFlightNumber });
    launches.set(launch.flightNumber, launch);
}

module.exports = {
    getAllLaunches
};