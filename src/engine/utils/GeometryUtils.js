import { Object3D, Quaternion } from "three";

class GeometryUtils {
	static rotateAroundAxis(
		object,
		axis,
		angle = 0
	) {
		if (!(object instanceof Object3D)) {
			throw new Error(
				"Argument 'object' must be an instance of THREE.Object3D"
			);
		}

		let q = new Quaternion();
		q.setFromAxisAngle(axis, angle);

		object.applyQuaternion(q);
		object.position.applyQuaternion(q);
	}
}

export default GeometryUtils;
