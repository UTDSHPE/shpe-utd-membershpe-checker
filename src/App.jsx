import axios from 'axios'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [user, setUser] = useState({ firstName: '', lastName: '', netID: '' })
  const [submitted, setSubmitted] = useState(false);
  const [member, setMember] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const checkMembership = async (e) => {
    e.preventDefault();

    if (user.firstName && user.lastName && user.netID) {
      try {
        // normalize netId to 'abc123456' format
        const response = await axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/api/members`, { ...user, netID: user.netID.split(6)[0].toLowerCase() });
        setMember(response.data.isValid);
      } catch (error) {
        console.log(error)
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
          <input className="mb-3 p-3 rounded-full w-72 text-md" type="text" value={user.firstName} onChange={(e) => { setUser({ ...user, firstName: e.target.value }); setSubmitted(false); setErrorMsg(''); }} placeholder="First Name" id="firstName" name="firstName" />
          <input className="mb-3 p-3 rounded-full w-72 text-md" type="text" value={user.lastName} onChange={(e) => { setUser({ ...user, lastName: e.target.value }); setSubmitted(false); setErrorMsg(''); }} placeholder="Last Name" id="lastName" name="lastName" />
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
