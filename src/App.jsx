import React, { useEffect, useState } from 'react'
import { TbArrowsLeftRight } from 'react-icons/tb'

const App = () => {
  const [symbols, setSymbols] = useState([])
  const [from, setFrom] = useState('AED')
  const [to, setTo] = useState('AED')
  const [amount, setAmount] = useState(0)
  const [result, setResult] = useState()

  const options = {
    method: 'GET',
  };

  useEffect(() => {
    fetch('https://api.exchangerate.host/symbols', options)
    .then(response => response.json())
    .then(response => setSymbols(Object.keys(response.symbols)))
    .catch(err => console.error(err));
  }, [])

  return (
    <div className='bg-sky-50 w-full h-screen p-6 text-white lg:flex lg:items-center'>
      <div className='w-full max-w-[1050px] mx-auto bg-black opacity-60 rounded-xl flex items-center p-4 flex-col gap-8 lg:py-8 lg:gap-12'>

        <h1 className='font-semibold text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl'>Currency Converter</h1>

        <div className='w-full flex items-center flex-col gap-8 lg:flex-row lg:gap-14'>
          <div className='currency-group items-center'>
            <div className='input-group'>
              <label htmlFor='from'>From:</label>
              <select name='from' id='from' value={from} onChange={(e) => setFrom(e.target.value)} >
                {symbols.sort().map((s) => (
                  <option value={s}>{s}</option>
                ))}
              </select>
            </div>

            <button className='rounded-full p-2 self-end' aria-label='Reverse' onClick={() => {
              let prev1 = from;
              let prev2 = to;
              setFrom(prev2);
              setTo(prev1);
            }}>
              <TbArrowsLeftRight/>
            </button> 

            <div className='input-group'>
              <label htmlFor='to'>To:</label>
              <select name='to' id='to' value={to} onChange={(e) => setTo(e.target.value)} >
              {symbols.sort().map((s) => (
                  <option value={s}>{s}</option>
                ))}
              </select>
            </div>     
          </div>

          <div className='amount-group flex-col md:flex-row'>
            <div className='input-group'>
              <label htmlFor="amount">Amount:</label>
              <input type="number" name="amount" id="amount" value={amount} inputMode='decimal' step='0.01' 
              onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div className='input-group'>
              <label htmlFor="result">Result:</label>
              <input type="text" name="result" id="result" value={result} disabled />  
            </div>
          </div>
        </div>

        <button className='py-2 px-4 rounded-3xl xs:text-lg md:text-xl lg:text-2xl' onClick={() => {
          fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`, options)
          .then(response => response.json())
          .then(response => setResult(Number(response.result).toFixed(2)))
          .catch(err => console.error(err));
        }}>Convert</button>

      </div>
    </div>
  )
}

export default App
