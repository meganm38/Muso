import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref } from "vue";
import { auth } from "../firebase/config";

const error = ref("");

const signup = async (email, password, displayName) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		if (!userCredential) {
			throw new Error("Unsuccessful signup");
		}
		await updateProfile(auth.currentUser, { displayName: displayName });
		return userCredential;
	} catch (err) {
		error.value = err.message;
	}
};

const useSignup = () => {
	return { error, signup };
};

export default useSignup;
