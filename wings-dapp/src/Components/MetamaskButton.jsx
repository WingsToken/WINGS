import React from 'react';
import logginButton from "../Assets/metamask_login.jpg"

export class MetamaskButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async onClickMetamask() {
    await this.loadWeb3()
    console.log(window.web3.eth)
    const me = this
    window.web3.eth.getAccounts(function(err, accounts){
      if (err != null) console.error("An error occurred: "+err);
      else if (accounts.length === 0) me.setState({user: ""})
      else me.setState({user: accounts[0]})
    });
    window.web3.eth.defaultAccount = window.web3.eth.accounts[0]
  }

  async loadWeb3() {
    const Web3 = require("web3");
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  } 
  // onClickMetamask = () => {
  //   const login = new
   
  // }
  // logInMetamask = () =>{
  //   if (window.ethereum) {
  //     const Web3 = require("web3");
  //     window.web3 = new Web3(window.ethereum);
  //     window.ethereum.enable();
  //     console.log(window.web3.eth.accounts[0], "account")
  //     this.props.setUser(window.web3)
  //     return true;
  //   }
  // }
  render(){
    return <>
              {
                !this.props.user
                  ? <img src={logginButton} className="Metamask-button" alt="metamaskButton" onClick={() => this.onClickMetamask()}/>
                  : <div className="Metamask-button">Connected!</div>
              }
          </>
  }
}