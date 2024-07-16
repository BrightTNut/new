import { useEffect, useState } from "react";
import "./App.css";
import Getter from "./abi/Getter.json";
import Web3 from "web3";
const address = "0xbf97F3AbfCa02361c20FEEDcC76a459534B69059";
function App() {
  const [state, setState] = useState({ web3: null, contract: null });
  const [data, setData] = useState(null);
  useEffect(() => {
    const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
    async function template() {
      const web3 = new Web3(provider);
      // const networkId = await web3.eth.net.getId();
      // const deployedNetwork = Getter.networks[networkId];
      //console.log(deployedNetwork.address);
      const contractIntance = new web3.eth.Contract(Getter.abi, address);
      setState({ web3: web3, contract: contractIntance });
    }
    provider && template();
  }, []);

  useEffect(() => {
    const { contract } = state;
    async function readData() {
      const value = await contract.methods.getValue().call();
      setData(Number(value));
      console.log("Data is :", data);
    }
    contract && readData();
  });

  async function ssetData() {
    const { contract } = state;
    let val = document.querySelector("#data").value;
    await contract.methods
      .setValue(val)
      .send({ from: "0x25d781d5baDa4179AA7b5bdA0F40079fA34E5122" });
    window.location.reload();
  }

  return (
    <>
      <h1 style={{ color: "white" }}> {data}</h1>
      <input type="text" id="data"></input>
      <button onClick={ssetData}>Click</button>
    </>
  );
}

export default App;
