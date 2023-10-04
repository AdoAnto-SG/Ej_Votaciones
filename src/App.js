
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderNavbar from './components/HeaderNavbar';
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import smartContractVotaciones from './smartContract/votaciones.json';
import CandidatosLista from './components/CandidatosLista';
import VotarForm from './components/votarForm';
import AnunciarGanador from './components/AnunciarGanador';

function App() {

  const [MetasMask, setMetamask] = useState(false);
  const [web3, setWeb3] = useState(null);       // Guardar instancia de la web3
  const [account, setAccount] = useState(null); // Guardar cuenta
  const [balance, setBalance] = useState(null); // Guardar el balance
  const [contract, setContract] = useState();
  const [candidatos, setCandidatos] = useState([]);
  const [isConnected, setIsConnected] = useState(false); // Estado que indica si la wallet esta conectada

  const [haVotado, setHaVotado] = useState(false); // Estado que indica si el usuario ya ha votado, en 
  // caso de que si entonces no funcionara el boton de votar


  const conectarWallet = async () => {

    if (typeof window.ethereum !== 'undefinied') {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      try {
        await window.ethereum.enable();
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);
        const balanceWei = await web3Instance.eth.getBalance(accounts[0]);
        const balanceEth = web3Instance.utils.fromWei(balanceWei, 'ether');

        setBalance(balanceEth);

        const contractInstance = new web3Instance.eth.Contract(
          smartContractVotaciones,
          smartContractVotaciones && "0x00Bbb8c230A4D81690b2Bb7ab97832E559cC2449"
        );
        setContract(contractInstance);

      } catch (error) {
        console.error(error);
      };
    } else {
      setMetamask(false);
    }
  };

  // Función para desconectar la wallet del usuario
  const disconnectWallet = async () => {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_accounts' });
      localStorage.removeItem('account');
      setAccount(null);
      setBalance(null);
      setIsConnected(false);
    }
  };

  // useEffect para gestionar el estado de conexión basado en la cuenta y el saldo
  useEffect(() => {
    if (account && balance) {
      setIsConnected(true);
    }
  }, [account, balance]);

  useEffect(() => {
    async function Wallet() { //Verificar si hay una wallet disponible.
      if (typeof window.ethereum !== 'undefined') {
        // console.log("Si tenemos wallet");
        setMetamask(true);
      } else {
        console.log("No tenemos wallet");
      }
    };
    Wallet();
  }, []);

  // useEffect para cargar los candidatos desde el contrato inteligente
  useEffect(() => {
    async function cargarCandidatos() {
      if (contract) {
        const candidatosArray = [];
        const total = await contract.methods.candidatosCounter().call();
        for (let i = 1; i <= total; i++) {
          const candidato = await contract.methods.candidatos(i).call();
          candidatosArray.push(candidato);
        }
        setCandidatos(candidatosArray);
      }
    }
    cargarCandidatos();
  }, [contract]);

  // useEffect para verificar si el usuario ya ha votado
  useEffect(() => {
    async function verificarVotante() {
      if (contract && account) {
        const yaVoto = await contract.methods.votantes(account).call();
        setHaVotado(yaVoto);
      }
    }
    verificarVotante();
  }, [contract, account]);


  return (
    <div>
      {
        <>
          <HeaderNavbar conectarWallet={conectarWallet}
            disconnectWallet={disconnectWallet}
            isConnected={isConnected}
            account={account}
            balance={balance}></HeaderNavbar>
          <br />
        </>
      }
      <br />
      <CandidatosLista candidatos={candidatos} />
      <br />

      <VotarForm candidatos={candidatos} contract={contract} account={account} haVotado={haVotado} setHaVotado={setHaVotado} />
      <br />
      <hr />
      <br />
      <div>
        {/* Resto del JSX existente... */}
        <AnunciarGanador contract={contract} account={account} />
      </div>


    </div>
  );
};

export default App;
