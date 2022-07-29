import { collection, addDoc } from "firebase/firestore";
import { ref } from "vue";
import { db } from "../firebase/config";

const useCollection = (collectionName) => {
	const dbError = ref("");
	const dbPending = ref(false)

	const addDocToDb = async (doc) => {
		try {
			dbPending.value = true
			const docRef = await addDoc(collection(db, collectionName), doc);
			dbPending.value = false
			return docRef
		} catch (err) {
			dbError.value = err.message;
		}
	};

	return { dbError, addDocToDb, dbPending };
};

export default useCollection;
