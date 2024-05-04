import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(6);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz";

    if(numAllowed) {
      str += "0123456789";
    }

    if(charAllowed) {
      str += "!@#$%^&*()_+";
    }

    for(let i=0; i<length; i++) {
      pass += str[Math.floor(Math.random()*str.length)];
    }

    setPassword(pass);

  }, [length, numAllowed, charAllowed])

  const passwordRef = useRef(null);

  useEffect(() => {
    generatePassword();
  }, [length, numAllowed, charAllowed])

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  }

  return (
    <>
      <div id="passwordgenerator" className='flex-col justify-center items-center text-center space-y-5 mt-[4rem]'>
        <p className='text-white font-semibold text-base'>Password Generator</p>
        <div className='flex justify-center items-center'>
          <input type="text" className='w-[30rem] h-[2.1rem] rounded-l-lg outline-none pl-2' name="pass" id="pass" value={password} placeholder='Password' readOnly ref={passwordRef}/>
          <button className='text-white bg-blue-700 px-3 py-1 rounded-r-lg outline-none' onClick={copyPasswordToClipboard}>copy</button>
        </div>
        <div className='flex justify-center text-orange-500 space-x-7'>
          <div className='space-x-2 flex items-center'>
          <input type="range" onChange={(event) => setLength(event.target.value)} min={6} max={45} value={length} className='cursor-pointer' name="r" id="r"/>
          <label htmlFor="r">Length : {length}</label>
          </div>
          <div className='space-x-2'>
          <input type="checkbox" name="numbers" id="numbers" defaultChecked={numAllowed} onChange={() => setNumAllowed((prev) => !prev)}/>
          <label htmlFor="numbers">Numbers</label>
          </div>
          <div className='space-x-2'>
          <input type="checkbox" name="characters" id="characters" defaultChecked={charAllowed} onChange={() => setCharAllowed((prev) => !prev)}/>
          <label htmlFor="characters">Characters</label>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default App
