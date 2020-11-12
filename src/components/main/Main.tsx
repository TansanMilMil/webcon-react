import * as React from 'react';
import './Main.scss';
import AuthProvider from '../../contexts/auth/AuthProvider';
import { FirebaseManager } from '../../contexts/auth/firebase';

interface Props {
  history: any;
}
interface State {
  isLoadingPowerRef: boolean;
  isLoadingBedroomLightRef: boolean;
  isLoadingDiningLightRef: boolean;
  isLoadingTvRef: boolean;
  powerRefCool: boolean;
  powerRefHot: boolean;
  powerRefOff: boolean;
  bedroomLightRef: boolean;
  diningLightRef: boolean;
  tvRef: boolean;
}
class AirconStatus {
  public static Cool = 'cool';
  public static Hot = 'hot';
  public static Off = 'off';
}
class LightStatus {
  public static On = 'on';
  public static Off = 'off';
}

class Main extends React.Component<Props, State> {
  database: firebase.database.Reference;
  powerRef: firebase.database.Reference;
  bedroomLightRef: firebase.database.Reference;
  diningLightRef: firebase.database.Reference;
  tvRef: firebase.database.Reference;

  constructor(props: any) {
    super(props);    
    this.state = {
      isLoadingPowerRef: true,
      isLoadingBedroomLightRef: true,
      isLoadingDiningLightRef: true,      
      isLoadingTvRef: true,
      powerRefCool: false,
      powerRefHot: false,
      powerRefOff: true,
      bedroomLightRef: false,
      diningLightRef: false,
      tvRef: false,
    };
    this.database = FirebaseManager.app.databaseRef;
    this.powerRef = this.database.child('airconPower');
    this.bedroomLightRef = this.database.child('bedroomLight');
    this.diningLightRef = this.database.child('diningLight');    
    this.tvRef = this.database.child('tv');    
  }

  componentDidMount() {
    this.setDbListener();
  }

  private setDbListener() {
    this.powerRef.on("value", (snapshot) => {
      if (this.state.isLoadingPowerRef) { this.setState({isLoadingPowerRef: false}); }
      switch (snapshot.val()) {
        case 'cool':
          this.setState({
            powerRefCool: true,
            powerRefHot: false,
            powerRefOff: false,
          });
          break;
        case 'hot':
          this.setState({
            powerRefCool: false,
            powerRefHot: true,
            powerRefOff: false,
          });          
          break;
        default:
          this.setState({
            powerRefCool: false,
            powerRefHot: false,
            powerRefOff: true,
          });          
          break;
      }
    });    

    this.bedroomLightRef.on("value", (snapshot) => {
      if (this.state.isLoadingBedroomLightRef) { this.setState({isLoadingBedroomLightRef: false}); }
      switch (snapshot.val()) {
        case 'on':
          this.setState({bedroomLightRef: true});
          break;
        default:
          this.setState({bedroomLightRef: false});
          break;
      }
    });

    this.diningLightRef.on("value", (snapshot) => {
      if (this.state.isLoadingDiningLightRef) { this.setState({isLoadingDiningLightRef: false}); }
      switch (snapshot.val()) {
        case 'on':
          this.setState({diningLightRef: true});
          break;
        default:
          this.setState({diningLightRef: false});
          break;
      }
    });      

    this.tvRef.on("value", (snapshot) => {
      if (this.state.isLoadingTvRef) { this.setState({isLoadingTvRef: false}); }
      switch (snapshot.val()) {
        case 'on':
          this.setState({tvRef: true});
          break;
        default:
          this.setState({tvRef: false});
          break;
      }
    });          
  }

  private changeAircon(changeVal: string, e: React.MouseEvent) {
    this.database.update({airconPower: changeVal});
  }

  private changeBedroomLight(e: React.MouseEvent) {
    console.log(!!this.state.bedroomLightRef);
    if (this.state.bedroomLightRef) {
      this.database.update({bedroomLight: LightStatus.Off});
    } else {
      this.database.update({bedroomLight: LightStatus.On});
    }
  }

  private changeDiningLight(e: React.MouseEvent) {
    console.log(!!this.state.diningLightRef);
    if (this.state.diningLightRef) {
      this.database.update({diningLight: LightStatus.Off});
    } else {
      this.database.update({diningLight: LightStatus.On});
    }    
  }

  private changeTv(e: React.MouseEvent) {
    console.log(!!this.state.tvRef);
    if (this.state.tvRef) {
      this.database.update({tv: LightStatus.Off});
    } else {
      this.database.update({tv: LightStatus.On});
    }    
  }

  private signOut(e: React.FormEvent) {
    e.preventDefault();
    FirebaseManager.app.signOutAsync()
    .then(ok => {
      this.props.history.push('/signin');
    })
    .catch(err => console.log(err));
  };

  render() {
    const loadingSpinner = 
      <div className="spinner-border text-info m-3" role="status">
        <span className="sr-only">Loading...</span>
      </div>

    return (
      <AuthProvider history={this.props.history}>
        <h4 className="text-center">Webcon</h4>

        <section className="setting-box-wrap">
          <div className="setting-box">
            <div className="paper pt-4 pb-5 pl-5 pr-5">
              <h6 className="text-left mb-2 ml-0">エアコン</h6>
              {this.state.isLoadingPowerRef && loadingSpinner}
              {!this.state.isLoadingPowerRef && 
                <div className="d-flex justify-content-start">
                    <label className="checktext">
                      <input type="radio" name="aircon-btn" checked={this.state.powerRefCool} readOnly
                          onClick={(e) => this.changeAircon(AirconStatus.Cool, e)}/>
                      <span>冷房</span>
                    </label>
                    <label className="checktext">
                      <input type="radio" name="aircon-btn" checked={this.state.powerRefHot} readOnly onClick={(e) => this.changeAircon(AirconStatus.Hot, e)}/>
                      <span>暖房</span>
                    </label>
                    <label className="checktext">
                      <input type="radio" name="aircon-btn" checked={this.state.powerRefOff} readOnly onClick={(e) => this.changeAircon(AirconStatus.Off, e)}/>
                      <span>Off</span>
                    </label>              
                </div>
              }

              <h6 className="text-left mb-2 ml-0">寝室ライト</h6>
              {this.state.isLoadingBedroomLightRef && loadingSpinner}
              {!this.state.isLoadingBedroomLightRef &&             
                <div className="d-flex justify-content-start">
                  <label className="switch">
                      <input type="checkbox" name="bedroom-light" checked={this.state.bedroomLightRef} readOnly onClick={(e) => this.changeBedroomLight(e)}/>
                      <div></div>
                  </label>
                </div>    
              }

              <h6 className="text-left mb-2 ml-0">ダイニングライト</h6>
              {this.state.isLoadingDiningLightRef && loadingSpinner}
              {!this.state.isLoadingDiningLightRef &&                         
                <div className="d-flex justify-content-start">
                  <label className="switch">
                      <input type="checkbox" name="dining-light" checked={this.state.diningLightRef} readOnly onClick={(e) => this.changeDiningLight(e)}/>
                      <div></div>
                  </label>
                </div>                        
              }

              <h6 className="text-left mb-2 ml-0">TV</h6>
              {this.state.isLoadingTvRef && loadingSpinner}
              {!this.state.isLoadingTvRef &&                         
                <div className="d-flex justify-content-start">
                  <label className="switch">
                      <input type="checkbox" name="tv" checked={this.state.tvRef} readOnly onClick={(e) => this.changeTv(e)}/>
                      <div></div>
                  </label>
                </div>                        
              }              
            </div>

            <div className="text-right mt-5">
              <button onClick={(e) => {this.signOut(e)}}>サインアウト</button>
            </div>
          </div>
        </section>
      </AuthProvider>
    );
  }
}

export default Main;
