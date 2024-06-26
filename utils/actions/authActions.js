import { getFirebaseApp } from "../firebaseHelper";
import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "@firebase/auth";

import { child, getDatabase, set, ref } from "@firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const signUp = (fullName, emial, password) => {
    return async (dispatch) => {
        const app = getFirebaseApp();
        const auth = getAuth(app);

        try{
            const result = await createUserWithEmailAndPassword(
                auth,
                emial,
                password
            );
        }
    }
}