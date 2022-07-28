import { ref } from "vue";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const currentUser = ref(auth.currentUser);

onAuthStateChanged(auth, (user) => {
	currentUser.value = user;
});

const getUser = () => {
	return { currentUser };
};

export default getUser;
