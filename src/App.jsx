import { useState } from 'react';
import './App.css'

function App() {
  const [myMood, setMyMood] = useState('');

  // Connect with wallet
  const MoodContractAddress = '0x3eEBEEC886f34282eF4E32239ec2B21A718C7dAB';
  const MoodContractABI = [
    {
      "inputs": [],
      "name": "getMood",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_mood",
          "type": "string"
        }
      ],
      "name": "setMood",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  let MoodContract;
  let signer;

  // Create web3Provider instance
  const provider = new ethers.providers.Web3Provider(window.ethereum, "sepolia");

  provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
      signer = provider.getSigner(accounts[0]);
      MoodContract = new ethers.Contract(
        MoodContractAddress,
        MoodContractABI,
        signer
      );
    });
  });

  // async function getMood() {
  //   const getMoodPromise = MoodContract.getMood();
  //   const Mood = await getMoodPromise;
  //   document.getElementById("showMood").innerText = `Your Mood: ${Mood}`;
  //   console.log(Mood);
  // }

  // async function setMood() {
  //   const mood = document.getElementById("mood").value;
  //   const setMoodPromise = MoodContract.setMood(mood);
  //   await setMoodPromise;
  // }
  const setMood = async (e) => {
    // Prevent from refreshing
    e.preventDefault();
    // Obtain mood value
    const form = e.target;
    const currentMood = form.mood.value;
    // Set mood value
    const setMoodPromise = MoodContract.setMood(currentMood);
    await setMoodPromise;
  }

  const getMood = async () => {
    const getMoodPromise = MoodContract.getMood();
    const Mood = await getMoodPromise;
    setMyMood(Mood);
  }

  return (
    <div className="App">
      <form onSubmit={setMood}>
        <h1>This is my dApp</h1>
        <p>Here we can set or get the mood:</p>
        <label>Input Mood:</label><br />
        <input type="text" name='mood' />
        <button type='submit'>Set Mood</button>
      </form>
      <button className='get-mood' onClick={getMood}>Get Mood</button>
      {
        myMood && <p>I am {myMood}</p>
      }
    </div>
  )
}

export default App;
