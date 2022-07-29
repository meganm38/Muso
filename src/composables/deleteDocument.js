import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref } from "vue";
import { db } from "../firebase/config";

const deleteDocument = (collectionName, documentId) => {
	const deleteError = ref("");
	const deletePending = ref(false);

	const handleDelete = async () => {
		try {
			deletePending.value = true;
			await deleteDoc(doc(db, collectionName, documentId));
			deletePending.value = false;
			deleteError = "";
		} catch (error) {
			deleteError.value = error.message;
		}
	};
	return { deleteError, deletePending, handleDelete };
};

const updateDocument = (collectionName, documentId) => {
	const updateError = ref("");
	const updatePending = ref(false);

	const handleUpdate = async (data) => {
		try {
			updatePending.value = true;
			await updateDoc(doc(db, collectionName, documentId), data);
			updatePending.value = false;
			updateError = "";
		} catch (error) {
			updateError.value = error.message;
		}
	};
	return { updateError, updatePending, handleUpdate };
};

export { deleteDocument, updateDocument };
