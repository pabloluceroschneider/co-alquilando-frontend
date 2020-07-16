const SIGN_IN = 'SIGN_IN';
const SIGN_OUT = 'SIGN_OUT';

export function signin(user) {
	return {
		type: SIGN_IN,
		payload: user
	};
}

export function signout() {
	return {
		type: SIGN_OUT,
		payload: null
	};
}
