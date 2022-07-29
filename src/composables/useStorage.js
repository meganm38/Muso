import { storage } from "../firebase/config";
import getUser from "./getUser";
import {
	ref as firebaseRef,
	uploadBytes,
	getDownloadURL,
} from "firebase/storage";
import { ref } from "vue";

const { currentUser } = getUser();

const useStorage = () => {
	const uploadError = ref('')
	const url = ref("");
	const filePath = ref("");
    const uploadImagePending = ref(false)

	const uploadImage = async (file) => {
        uploadImagePending.value = true
		filePath.value = `covers/${currentUser.value.uid}/${file.name}`;
		const storageRef = firebaseRef(storage, filePath.value);

		try {
			await uploadBytes(storageRef, file);
			url.value = await getDownloadURL(storageRef);
            uploadImagePending.value = false
		} catch (err) {
			uploadError.value = err;
		}
	};

	return { uploadError, url, filePath, uploadImage, uploadImagePending };
};

export default useStorage;
