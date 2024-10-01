import axios from 'axios'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [user, setUser] = useState({ name: '', netID: '' })
  const [submitted, setSubmitted] = useState(false);
  const [member, setMember] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const checkMembership = async (e) => {
    e.preventDefault();

    console.log(user.name, user.netID)

    if (user.name && user.netID) {
      try {

        // normalize strings before sending request
        const response = await axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/api/membershpe`, { name: user.name.toLowerCase(), netID: user.netID.toLowerCase() });
        setMember(response.data.signedUp && response.data.paid);
        if (response.data.signedUp && !response.data.paid) { setErrorMsg('Member has not paid dues yet') }
        else if (!response.data.signedUp && !response.data.paid) { setErrorMsg('Name + NetID not found') }
      } catch (error) {
        setErrorMsg(error.response ? error.response.data.error : error.message);
        setMember(false);
      }
    }
    else {
      setErrorMsg("Please complete form before submitting");
      setMember(false);
    }

    setSubmitted(true);
  }

  return (
    <div className='h-full flex flex-col justify-center items-center'>
      <h1 className='flex flex-wrap my-8 text-5xl'>Check SHPE UTD Membership</h1>
      <div className='flex h-96 flex-col'>
        <form className='flex flex-col justify-center items-center' onSubmit={checkMembership}>
          <input className="mb-3 p-3 rounded-full w-72 text-md" type="text" value={user.name} onChange={(e) => { setUser({ ...user, name: e.target.value }); setSubmitted(false); setErrorMsg(''); }} placeholder="Name" id="Name" name="Name" />
          <input className="mb-3 p-3 rounded-full w-72 text-md" type="text" value={user.netID} onChange={(e) => { setUser({ ...user, netID: e.target.value }); setSubmitted(false); setErrorMsg(''); }} placeholder="NetID (ie ABC123456)" id="netID" name="netID" />
          <button className='w-40 rounded-full' type="submit">Check Member</button>
        </form>
        {submitted && <h2 className='text-5xl my-8'>{member ? "✅" : "❌"}</h2>}
        {submitted && <p>{errorMsg ? errorMsg : ""}</p>}
      </div>
    </div>
  )
}

export default App
