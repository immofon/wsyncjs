function set(key, value) {
	if (window.localStorage) {
		window.localStorage.setItem(key, value);
	}
}

function get(key, value) {
	let ret = "";
	if (window.localStorage) {
		ret = window.localStorage.getItem(key);
	}
	if (ret == null || ret == "") {
		ret = value;
	}
	return ret;
}

export default {
	get,
	set
};
