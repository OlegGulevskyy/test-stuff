import * as alt from "alt-server";
import "./playerEnteredVehicle";

/**
 * Just interface for chat object below
 */
const chat = {
	registerCmd: (cmdTitle, callback) => {},
};

const allowedSkins = ["a_f_y_bevhills_04"];
const getRandomNumber = (threshHold) => Math.floor(Math.random() * threshHold);

chat.registerCmd("test", (player, args) => {
	const randomIndex = getRandomNumber(allowedSkins.length);
	player.model = allowedSkins[randomIndex];

	const { pos, rot } = player;
	const VEHICLE_MODEL = "zentorno";
	const vehicle = new alt.Vehicle(
		VEHICLE_MODEL,
		pos.x + 2,
		pos.y + 2,
		pos.z,
		rot.x,
		rot.y,
		rot.z
	);
	player.vehicles = [];
	player.vehicles.push(vehicle);
});
