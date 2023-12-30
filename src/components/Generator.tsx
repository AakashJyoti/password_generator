import { useCallback, useEffect, useState } from "react";
import { characters, letters, numbers } from "../constants/generator";
import useCopyClipboard from "../hooks/useCopyClipboard";

const Generator = () => {
  const [length, setLength] = useState(8);
  const [isNumber, setIsNumber] = useState(false);
  const [isCharacter, setIsCharacter] = useState(false);
  const [password, setPassword] = useState("");

  const { copyFunc, valueRef } = useCopyClipboard(password);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = letters;
    if (isNumber) str += numbers;
    if (isCharacter) str += characters;

    for (let i = 0; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, isNumber, isCharacter]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  return (
    <div className="w-full max-w-md mx-auto shadow-lg rounded px-4 py-3 my-8 text-blue-200 bg-gray-700 relative">
      <p className="text-white text-center text-2xl my-2">Password Generator</p>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          readOnly
          ref={valueRef}
          className="outline-none w-full py-1 px-3 text-black"
          placeholder="Password"
        />
        <button
          onClick={copyFunc}
          title="Copy to Clipboard"
          className="bg-blue-700 px-3 py-0.5 shrink-0 outline-none font-medium"
        >
          Copy
        </button>
      </div>

      <div className="flex text-sm justify-around">
        <div className="flex items-center gap-x-1">
          <input
            name="range"
            type="range"
            min={6}
            max={30}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(parseInt(e.target.value))}
          />
          <label htmlFor="range">
            Length {length <= 9 ? "0" : ""}
            {length}
          </label>
        </div>
        <div
          className="flex items-center gap-x-1"
          onClick={() => setIsNumber((prev) => !prev)}
        >
          <input
            name="isNumber"
            type="checkbox"
            checked={isNumber}
            className="cursor-pointer"
            onChange={(e) => setIsNumber(e.target.checked)}
          />
          <label htmlFor="isNumber" className="cursor-pointer">
            Number {isNumber}
          </label>
        </div>
        <div
          className="flex items-center gap-x-1"
          onClick={() => setIsCharacter((prev) => !prev)}
        >
          <input
            name="isCharacter"
            type="checkbox"
            checked={isCharacter}
            className="cursor-pointer"
            onChange={(e) => setIsCharacter(e.target.checked)}
          />
          <label htmlFor="isCharacter" className="cursor-pointer">
            Character {isCharacter}
          </label>
        </div>
      </div>

      <button
        title="Regenerate"
        className="absolute top-3 right-3 text-3xl"
        onClick={generatePassword}
      >
        🔄️
      </button>
    </div>
  );
};

export default Generator;
