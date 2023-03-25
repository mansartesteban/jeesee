class MathUtils {
	static random(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	static mapRange(x, fromMin, fromMax, toMin, toMax) {
		return toMin + ((toMax - toMin) / (fromMax - fromMin)) * (x - fromMin);
	}
	static minMax(x, min, max) {
		return x < min ? min : (x > max ? max : x);
	}
}

export default MathUtils;
