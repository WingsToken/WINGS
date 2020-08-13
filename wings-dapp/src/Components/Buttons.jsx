import * as Constants from "../Constants/Constants.js";

import { Button } from '@material-ui/core';
import React from 'react';
import Web3 from 'web3';

export class Buttons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async onclickGrillButton() {
    if(!this.props.user){
      return;
    }
    const web3 = new Web3(window.ethereum);
    console.log(web3)
    await window.ethereum.enable();
    const contract = web3.eth.contract(Constants.CONTRACTABI).at(Constants.CONTRACTADDRESS);
    web3.eth.defaultAccount = this.props.user
    console.log(contract, this.props.user)
    this.bakePool(contract)
  }
  
  async bakePool(contract) {
    contract.bakePool(function (err, result) {
    console.log(result);
  })}

  async onclickClaimRewardsButton() {
    if(!this.props.user){
      return;
    }
    const web3 = new Web3(window.ethereum);
    console.log(web3)
    await window.ethereum.enable();
    const contract = web3.eth.contract(Constants.CONTRACTABI).at(Constants.CONTRACTADDRESS);
    web3.eth.defaultAccount = this.props.user
    this.claimRewards(contract)
}

  claimRewards = (contract) => {
    contract.claimRewards(function (err, result) {
    console.log(result);
  })}

  render(){  
        return <div className="workspace-container">        
            <div className="Function-buttons">
            <div/>
            <Button disabled={!this.props.user} style={{ borderRadius: 20 }} variant="contained" color="primary" className="left-button" onClick={() => {this.onclickGrillButton()}}>
              Bake
            </Button>
            <Button disabled={!this.props.user} style={{ borderRadius: 20 }} variant="contained" color="primary" className="right-button" onClick={() => {this.onclickClaimRewardsButton()}}>
              Claim
            </Button>
            <div/>
          </div>       
      </div>
  }
}