import { useRef, useState } from "react";

export const Input = ({ value }) => {
  const inputRef = useRef(null);

  const [message, setMessage] = useState("");

  const handleCopy = async () => {
    if (inputRef.current) {
      inputRef.current.select();
      try {
        await navigator.clipboard.writeText(inputRef.current.value);
        setMessage("Copied!");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      } catch (err) {
        console.error("Error al copiar: ", err);
      }
    }
  };
  return (
    <div className="grid gap-3">
      <input
        ref={inputRef}
        onClick={handleCopy}
        readOnly={true}
        value={value}
        className="w-full bg-transparent border-solid rounded-md border border-white border-opacity-25 text-white h-10 leading-10 cursor-pointer transition-all hover:border-opacity-50 selection:bg-slate-800"
      ></input>
      {message && <p className="text-center text-purple-500 font-bold">{message}</p>}
    </div>
  );
};
