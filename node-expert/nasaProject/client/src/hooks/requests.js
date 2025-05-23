const APUR_URL = "http://localhost:5000";

async function httpGetPlanets() {
  const response = await fetch(`${APUR_URL}/planets`);
  return await response.json();
}

async function httpGetLaunches() {
  const response = await fetch(`${APUR_URL}/launches`);
  return await response.json();
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};