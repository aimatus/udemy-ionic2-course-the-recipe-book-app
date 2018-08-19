import firebase from 'firebase';

export class AuthService {
    singup(email: string, password: string) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }
}