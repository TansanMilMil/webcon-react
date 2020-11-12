import React from 'react';
import { FirebaseManager } from './firebase';

export const AuthContext = React.createContext({});
interface Props {
    history: any;
}
interface State {
    userAuth: firebase.User | null;
}
/** Firebase認証必須のコンポーネントにアタッチする */
class AuthProvider extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            userAuth: null
        };
    }

    componentDidMount = () => {
        FirebaseManager.app.auth.onAuthStateChanged(userAuth => {
            this.setState({userAuth: userAuth});
            if (!userAuth) {
                console.warn('no userAuth');
                this.props.history.push('/signin');
            }
        });
    };

    render() {
        let currentUser;
        if (this.state.userAuth && this.state.userAuth.providerData) {
            currentUser = <div>currentUser: {this.state.userAuth.providerData[0]?.email}</div>
        }        
        return (
            <AuthContext.Provider value={this.state.userAuth as firebase.User}>
                {/* {currentUser} */}
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}

export default AuthProvider;