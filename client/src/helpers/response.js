import { fetchBothRecords } from "../services/record.service";

const dataHandler = async (response) => {
	if (response.message == "token exists") {
		/* login was not exec, but token exists */
		return { error: false, message: response.message };
	}
	if (response.token && response.user) {
		/* if token doesn't exist, set it */
		localStorage.setItem("currentUser", JSON.stringify({ token: response.token, user: response.user }));

		/* exec the fetchRecords fucntions */
		//todo: would trigger store action to fetch data from DB.
		await fetchBothRecords(response.token);

		/* prompt client to use token */
		return { error: false, token: true, data: response };
	}
	/* response data contains no tokens */
	return { error: false, token: false, message: response.message };
};

const errorHandler = (error, payload) => {
	const {
		status,
		data: { message },
	} = error;
	if (status === 400 && message == "User is already logged in") {
		return { error: true, message: "user is already logged in" };
	} else if ([401, 403].includes(status)) {
		/* return error and prompt UI to respond with message. */
		return { error: true, message };
	} else {
		return { error: true, message };
	}
};

export const responseHandler = (response, payload = {}) => {
	if ([400, 401, 403, 404].includes(response.status)) {
		return errorHandler(response, payload);
	}
	//todo: fix 500 errors.
	return dataHandler(response);
};
