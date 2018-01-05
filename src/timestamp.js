function createCurrentTimestamp() {
	const now = new Date();
	const day = now.getDate();
	const month = now.getMonth();
	const year = now.getFullYear();
	const hoursRaw = now.getHours();
	const minutesRaw = now.getMinutes();

	const displayMonth = (month + 1);
	let displayHour = hoursRaw;
	let displayMinutes = minutesRaw;
	let clockPeriod = 'AM';

	if (displayHour >= 12) {
		displayHour = hoursRaw - 12;
		clockPeriod = 'PM';
	}
	if (displayHour === 0) {
		displayHour = 0;
	}

	// two digit minutes
	displayMinutes = (displayMinutes < 10 ? '0'+displayMinutes : displayMinutes);
	// two-digit hours
	displayHour = (displayHour < 10 ? '0'+displayHour : displayHour);

	// format example:
	// 12-24-2017 1:00 PM
	return (displayMonth + '-' + day + '-' + year + ' ' + displayHour + ':' + displayMinutes + ' ' + clockPeriod);
}

module.exports = {
	createCurrentTimestamp
}