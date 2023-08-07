import { doc, setDoc, getDoc } from 'firebase/firestore';
import { firestore } from './firebase';
import { User } from 'firebase/auth';

export const createUserProfileDocument = async (userAuth: User, additionalData: { username: string }) => {
    if (!userAuth) return;

    const userRef = doc(firestore, 'users', userAuth.uid);
    const snapShot = await getDoc(userRef);

    if (!snapShot.exists()) {
        const { email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userRef, {
                ...additionalData,
                email,
                createdAt,
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error creating user", error.message);
            }
        }
    }

    return userRef;
};
