import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

class Firebase {
    public auth: app.auth.Auth;
    public databaseRef: app.database.Reference;

    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.databaseRef = app.database().ref();
    }
    
    public signInWithEmailAndPasswordAsync = (email: string, password: string) => {
        return this.auth.signInWithEmailAndPassword(email, password);
    };

    public signOutAsync = () => this.auth.signOut();
}

export class FirebaseManager {
    public static app = new Firebase();
}