import * as alt from "alt-client";
import * as native from "natives";

const drawMarker = (markerData) => {
	native.drawMarker(
		markerData.type,
		markerData.pos.x,
		markerData.pos.y,
		markerData.pos.z,
		markerData.dir.x,
		markerData.dir.y,
		markerData.dir.z,
		markerData.rot.x,
		markerData.rot.y,
		markerData.rot.z,
		markerData.scale.x,
		markerData.scale.y,
		markerData.scale.z,
		markerData.r,
		markerData.g,
		markerData.b,
		markerData.alpha,
		false,
		true,
		2,
		false,
		undefined,
		undefined,
		false
	);
};

let markerInterval;

const handleDrawMarker = (markerPosition) => {
	markerInterval = alt.setInterval(() => {
		drawMarker({
			type: 1,
			pos: markerPosition,
			dir: new alt.Vector3(0, 0, 0),
			rot: new alt.Vector3(0, 0, 0),
			scale: new alt.Vector3(1, 1, 1),
			r: 255,
			g: 0,
			b: 0,
			alpha: 100,
		});
	}, 0);
};

const handleDestroyMarker = () => {
	alt.clearInterval(markerInterval);
	markerInterval = null;
};

const handleGetMarkerNextPosition = () => {
	const playerId = alt.Player.local.scriptID;
	const markerPositionOffset = native.getOffsetFromEntityInWorldCoords(
		playerId,
		0.0,
		5.0,
		0
	);
	return alt.emitServer("Server:playerPositionInFront", markerPositionOffset);
};

alt.onServer("destroyMarker", handleDestroyMarker);
alt.onServer("drawMarker", handleDrawMarker);
alt.onServer("Client:getMarkerNextPosition", handleGetMarkerNextPosition);
