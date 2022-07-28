import { collection, onSnapshot, orderBy } from "firebase/firestore";
import { ref, watchEffect } from "vue";
import { db } from "../firebase/config";

const getCollection = (collectionName) => {
	const error = ref("");
	const documents = ref(null);

	const unsubscribe = onSnapshot(
		collection(db, collectionName),
		(snapshot) => {
			let items = [];
			snapshot.forEach((doc) => {
				doc.data().createdAt && items.push({ ...doc.data(), id: doc.id });
			});
			documents.value = items;
			error.value = "";
		},
		(err) => {
			documents.value = null;
			error.value = err.message;
		}
	);

	watchEffect((onInvalidate) => {
		onInvalidate(() => unsubscribe());
	});

	return { error, documents };
};

export default getCollection;
