import { useCallback, useEffect, useRef, useState } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState();
  const [copyState, setCopySate] = useState("copy");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVUXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) string += "0123456789";
    if (charAllowed) string += "!@#$%^&*-_`";

    for (let i = 0; i < length; i++) {
      let randomIndex = Math.random() * string.length + 1;
      pass += string.charAt(randomIndex);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed]);

  const copyTextToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setCopySate("copied");
  }, [password]);
  const passwordRef = useRef(null);

  const onNumberCheck = () => {
    setNumberAllowed((prev) => !prev);
    setCopySate("copy");
  };
  const onCharCheck = () => {
    setCharAllowed((prev) => !prev);
    setCopySate("copy");
  };
  const onPasswordChange = (e) => {
    setLength(e.target.value);
    setCopySate("copy");
  };

  return (
    <>
      <div className="w-full max-w-fit mx-auto shadow-md rounded-lg px-4 py-8 my-8 text-orange-600 bg-gray-600">
        <h1 className="text-3xl text-white text-center my-3">
          Pasword Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            ref={passwordRef}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={copyTextToClipboard}
          >
            {copyState}
          </button>
        </div>
        <div className="flex gap-x-4 align-middle text-white text-xl">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              name="length"
              min={6}
              max={50}
              value={length}
              className="cursor-pointer"
              onChange={onPasswordChange}
            />
            <label htmlFor="length">Length: {length}</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="number"
              id="number"
              defaultChecked={numberAllowed}
              onChange={onNumberCheck}
            />
            <label htmlFor="number">Number</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="character"
              id="character"
              defaultChecked={charAllowed}
              onChange={onCharCheck}
            />
            <label htmlFor="character">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
