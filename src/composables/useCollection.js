import { collection, addDoc } from "firebase/firestore";
import { ref } from "vue";
import { db } from "../firebase/config";

const useCollection = (collectionName) => {
	const error = ref("");

	const addDocToDb = async (doc) => {
		try {
			await addDoc(collection(db, collectionName), doc);
		} catch (err) {
			error.value = err.message;
		}
	};

	return { error, addDocToDb };
};

export default useCollection;
