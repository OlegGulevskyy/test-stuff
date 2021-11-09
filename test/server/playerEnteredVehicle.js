import * as alt from "alt-server";

const PARACHUTE_HASH = 0xfbab5776;
const WEAPON_AMOUNT = 1;
const COLSHAPE_HEIGHT = 9999;
const COLSHAPE_RADIUS = 3;

alt.on("playerEnteredVehicle", (player) => {
	alt.emitClient(player, "Client:getMarkerNextPosition");
});

alt.onClient("Server:playerPositionInFront", (player, nextMarkerPosition) => {
	const colshape = new alt.ColshapeCylinder(
		nextMarkerPosition.x,
		nextMarkerPosition.y,
		nextMarkerPosition.z,
		COLSHAPE_RADIUS,
		COLSHAPE_HEIGHT
	);
	colshape.name = "colshape";
	colshape.player = player;

	alt.emitClient(player, "drawMarker", nextMarkerPosition);
});

alt.on("entityEnterColshape", (colshape, entity) => {
	alt.log(entity);
	alt.log(colshape);
	colshape.player.vehicles[0].destroy();

	colshape.destroy();
	alt.emitClient(colshape.player, "destroyMarker");

	const playerPosition = colshape.player.pos;
	colshape.player.spawn({ ...playerPosition, z: playerPosition.z + 9999 });

	colshape.player.giveWeapon(PARACHUTE_HASH, WEAPON_AMOUNT, true);
});
