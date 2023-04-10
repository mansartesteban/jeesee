export default class StringUtils {
    static ucfirst(str = "") {
        if (!str) { str = this; }
        return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
    }
}