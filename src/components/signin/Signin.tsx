import React from 'react';
import './Signin.css';
import { FirebaseManager } from '../../contexts/auth/firebase';

interface Props {
  history: any;
}
interface State {
  email: string;
  password: string;
  error: {hasError: boolean, message: string};
  [x: string]: any;
}

class Signin extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {hasError: false, message: ''},
    };
  }

  onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  };

  onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    FirebaseManager.app.signInWithEmailAndPasswordAsync(this.state.email, this.state.password)
    .then(ok => {
      console.log(ok);
      this.setState({
        error: {
          hasError: false,
          message: '',
        }
      });

      this.props.history.push('/');
    })
    .catch(err => {
      console.log(err);
      this.setState({
        error: {
          hasError: true,
          message: err.message,
        }
      });      
    });
  };

  render() {
    return (
      <section className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Webcon</h1>
          </div>
          <div className="col-12 text-center">
            <div className="paper d-inline-block">
              <form onSubmit={this.onSubmit}>
                <div>
                  <input id="email" type="email" placeholder="Email" name="email" value={this.state.email} onChange={this.onInputChange} />
                </div>
                <div>
                  <input id="password" type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onInputChange}/>
                </div>
                <div className="text-center mt-4">
                  <button type="submit" className="blue-button">SignIn</button>
                  {this.state.error.hasError && <p className="text-danger">{this.state.error.message}</p>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Signin;
