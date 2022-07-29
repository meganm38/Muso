import { doc, onSnapshot } from "firebase/firestore";
import { ref, watchEffect } from "vue";
import { db } from "../firebase/config";

const getDocument = (collectionName, documentId) => {
	const error = ref("");
	const document = ref(null);

	const unsubscribe = onSnapshot(
		doc(db, collectionName, documentId),
		(doc) => {
			document.value  = {...doc.data(), id: doc.id}
			error.value = "";
		},
		(err) => {
			document.value = null;
			error.value = err.message;
		}
	);

	watchEffect((onInvalidate) => {
		onInvalidate(() => unsubscribe());
	});

	return { error, document };
};

export default getDocument;