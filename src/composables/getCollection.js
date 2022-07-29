import { collection, onSnapshot, query as queryDb, where, getDocs } from "firebase/firestore";
import { ref, watchEffect } from "vue";
import { db } from "../firebase/config";

const getCollection = (collectionName) => {
	const error = ref("");
	const documents = ref(null);
	const queryDocuments = ref([])

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

	const getQueryDocuemnts = async (query) => {
		const ref = collection(db, collectionName);
		// Create a query against the collection.
		const q = queryDb(ref, where(query.arg1, query.arg2, query.arg3));

		const querySnapshot = await getDocs(q);

		querySnapshot.forEach((doc) => {
			queryDocuments.value.push({...doc.data(), id: doc.id})
		});
	};

	return { error, documents, getQueryDocuemnts, queryDocuments };
};

export default getCollection;
