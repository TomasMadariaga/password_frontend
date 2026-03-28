import { useRef, useState } from "react";
import { toast } from "react-toastify";

export const Input = ({ value }) => {
  const inputRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (inputRef.current && value) {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        toast.success("Password copied!", {
          position: "top-center",
          autoClose: 2000,
          pauseOnHover: false,
        });
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        toast.error("Failed to copy");
      }
    }
  };

  return (
    <div className="relative flex-1">
      <input
        ref={inputRef}
        readOnly
        value={value}
        className="w-full bg-card border border-border rounded-lg px-4 py-2.5 text-text font-mono text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all cursor-pointer"
        onClick={handleCopy}
        title="Click to copy"
      />
      <button
        onClick={handleCopy}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-text/40 hover:text-accent transition-colors"
        aria-label="Copy to clipboard"
      >
        {copied ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4 text-green-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-3.875a3.375 3.375 0 00-3.375-3.375h-1.5m-1.125 0h-1.5V7.875"
            />
          </svg>
        )}
      </button>
    </div>
  );
};