import * as Constants from "../Constants/Constants.js";

import {Buttons} from "./Buttons"
import {MetamaskButton} from './MetamaskButton';
import React from 'react';
import Web3 from 'web3';
import logo from "../Assets/Wings_3.png"

const bg=require('../Assets/Hot-oven-2.gif')

export class Workspace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount(){
    const me = this
    window.web3.eth.getAccounts(function(err, accounts){
      if (err != null) console.error("An error occurred: "+err);
      else if (accounts.length === 0) me.setState({user: ""})
      else me.setState({user: accounts[0]})
    });
    this.stateEvents()
  }
  componentWillReceiveProps(nextProps){
    console.log(this.state)
    if(window.web3.eth.accounts[0] !== this.state.user){
      const me = this
      window.web3.eth.getAccounts(function(err, accounts){
        if (err !== null) console.error("An error occurred: "+err);
        else if (accounts.length === 0) me.setState({user: ""})
        else me.setState({user: accounts[0]})
      });
    }
  }
  setUser = (user) => {
    console.log(user)
    this.setState({user})
  }
  stateEvents = () => {
      if(this.state.user){
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(Constants.CONTRACTABI, Constants.CONTRACTADDRESS);
      
        contract.methods.getInfoFor(this.state.user).call().then((response)=>{
          let toBake = this.getBurned(response)
          let toBurn = (toBake +(response[5]*1)) * 0.7
          this.setState(
            {
              wingsToBake:  this.formatTokens(toBurn), 
              timeToBucket: this.secondsToDhms(this.getBakeDate(response)),
              bucketSize: this.formatTokens(response[8])
            }
          )
        })        
      }
      setTimeout(this.stateEvents, 400)
  }
  formatTokens(num) {
    return this.addCommas((num / 1e18).toFixed(2))+" Wings"
  }
  addCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  getBurned(data) {
    let passed = (new Date().getTime() / 1000) - data[6]
    return (data[2] * 3 * passed) / ((24*60*60)*100)
  }
  getBakeDate(data) {
    return ((parseFloat(data[7]) + (3*86400))*1000 - Math.floor(Date.now()))/1000;
  }
  secondsToDhms(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600*24));
    var h = Math.floor(seconds % (3600*24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    
    var dDisplay = d > 0 ? d + (d === 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
  }
  formatDSimple(amount) {
    return '$' + this.addCommas((amount).toFixed(2))
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
        <Buttons setUser={this.setUser} user={this.state.user} wingsToBake={this.state.wingsToBake} timeToBucket={this.state.timeToBucket} bucketSize={this.state.bucketSize}/>         
      </div>
  </div>   
  }
}