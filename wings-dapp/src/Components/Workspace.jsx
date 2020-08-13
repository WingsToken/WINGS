import {Buttons} from "./Buttons"
import {MetamaskButton} from './MetamaskButton';
import React from 'react';
import logo from "../Assets/Wings_3.png"
const bg=require('../Assets/back-grill.jpg')

export class Workspace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount(){
    if(window.web3.eth.accounts[0]){
      this.setState({user: window.web3.eth.accounts[0]})
      window.web3.eth.defaultAccount = window.web3.eth.accounts[0]
    }
  }
  componentWillReceiveProps(nextProps){
    console.log(this.state)
    if(window.web3.eth.accounts[0] !== this.state.user){
      
    }
  }
  setUser = (user) => {
    console.log(user)
    this.setState({user})
  }
  render(){
    return  <div className="App-body" style ={ { backgroundImage: "url("+bg+")" } }>
      <div className="Metamask-position">
        <MetamaskButton setUser={this.setUser} user={this.state.user}/>
      </div>
      <img src={logo} className="App-logo" alt="logo" />     
      <div className="grill-text">
        TIME TO BAKE!
      </div>
      <div className="buttons-div">
        <Buttons setUser={this.setUser} user={this.state.user}/>         
      </div>
  </div>   
  }
}