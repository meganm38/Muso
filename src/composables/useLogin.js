import { signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";
import { auth } from "../firebase/config";

const error = ref("");

const login = async (email, password) => {
	try {
		const userCrential = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);
		if (!userCrential) {
			error.value = "Uncessfull login";
		}
		error.value = "";
		return userCrential.user;
	} catch (err) {
		error.value = err.message;
	}
};

const useLogin = () => {
	return { error, login };
};

export default useLogin;
