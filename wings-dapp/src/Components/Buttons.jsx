import * as Constants from "../Constants/Constants.js";

import React from 'react';
import Web3 from 'web3';

const green_up=require('../Assets/Green_Up.png')
const red_up=require('../Assets/Red_Up.png')
const green_down=require('../Assets/Green_Down.png')
const red_down=require('../Assets/Red_Down.png')


export class Buttons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      green: green_up,
      red: red_up,
    };
  }
  async onclickGrillButton() {
    if(!this.props.user){
      return;
    }
    this.setState({red: red_down})
    setTimeout(()=>{this.setState({red: red_up})}, 400)
    const web3 = new Web3(window.ethereum);
    console.log(web3)
    await window.ethereum.enable();
    const contract = new web3.eth.Contract(Constants.CONTRACTABI, Constants.CONTRACTADDRESS);
    web3.eth.defaultAccount = this.props.user
    console.log(contract, this.props.user)
    this.bakePool(contract)
  }
  
  async bakePool(contract) {
    contract.methods.bakePool().send({from: this.props.user})
  }

  async onclickClaimRewardsButton() {
    if(!this.props.user){
      return;
    }
    this.setState({green: green_down})
    setTimeout(()=>{this.setState({green: green_up})}, 500)
    const web3 = new Web3(window.ethereum);
    console.log(web3)
    await window.ethereum.enable();
    const contract = new web3.eth.Contract(Constants.CONTRACTABI, Constants.CONTRACTADDRESS);
    web3.eth.defaultAccount = this.props.user
    this.claimRewards(contract)
}

  claimRewards = (contract) => {
    contract.methods.claimRewards().send({from: this.props.user})
  }

  render(){  
        return <div className="workspace-container">        
            <div className="Function-buttons">
            <div/>
            <div className="left-button" style ={ { backgroundImage: "url("+this.state.red+")" }} onClick={() => {this.onclickGrillButton()}}>
              <div className="wings-to-bake">{this.props.wingsToBake}</div>
            </div>
            <div className="right-button" style ={ { backgroundImage: "url("+this.state.green+")" }} onClick={() => {this.onclickClaimRewardsButton()}}>
              <div className="wings-to-bake">{this.props.timeToBucket}</div>
              <div className="bucket-size">{this.props.bucketSize}</div>
            </div>
            <div/>
          </div>       
      </div>
  }
}