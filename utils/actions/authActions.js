import { getFirebaseApp } from "../firebaseHelper";
import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "@firebase/auth";

import { child, getDatabase, set, ref } from "@firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authenticate } from "../../store/authSlice";

export const signUp = (fullName, email, password) => {
    return async (dispatch) => {
        const app = getFirebaseApp();
        const auth = getAuth(app);

        try{
            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            console.log(result);

            const { uid, stsTokenManager } = result.user;
            const { accessToken, expirationTime } = stsTokenManager;
            const expiryDate = new Date(expiratonTime);

            const useData = await createUser(fullName, email, uid);

            dispatch(authenticate({ token: accessToken, userData }));

            // Save user data and token to storeage
            saveToDataStorage(accessToken, uid, expiryDate);

            dispatch()

        }catch(error){
            console.log(error);

            const errorCode = error.code;
            let message = "Something Went Wrong"

            if(errorCode === "auth/wrong-password" || errorCode === "auth/user-not-found") {
                message = "Wrong email or password"
            }

            throw new Error(message);

        }
    }
}

const createUser = async (fullName, email, userId) => {
    const userData = {
        fullName,
        email,
        userId,
        signUpDate: new Date().toISOString(),
    }

    const dbRef = ref(getDatabase());
    const childRef = child(dbRef, 'users/${userId}')
    await set(childRef, userData);
    return userData;
};

const saveToDataStorage = (token, userId, expiryDate) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token,
            userId,
            expiryDate: expiryDate.toISOString(),
        })
    )
}


