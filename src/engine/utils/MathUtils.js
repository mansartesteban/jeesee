class MathUtils {
	static num(number, precision = 4) {
		let factor = Math.pow(10, precision);
		let n = precision < 0 ? number : 0.01 / factor + number;
		return Math.round(n * factor) / factor;
	}
	static random(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	static mapRange(x, fromMin, fromMax, toMin, toMax) {
		return toMin + ((toMax - toMin) / (fromMax - fromMin)) * (x - fromMin);
	}
	static minMax(x, min, max) {
		return x < min ? min : (x > max ? max : x);
	}
	static clamp(num, min, max) {
		return Math.min(Math.max(num, min), max);
	}
}

export default MathUtils;
