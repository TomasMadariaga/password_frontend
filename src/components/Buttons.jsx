export const ButtonMinus = ({ restarCaracter }) => {
  return (
    <button
      onClick={restarCaracter}
      className="flex-1 w-full bg-purple-600 text-white inline-flex items-center justify-center h-10 align-top text-lg text-center rounded-s-md cursor-pointer transition-all hover:bg-purple-700"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
      </svg>
    </button>
  );
};

export const ButtonPlus = ({ incrementarCaracter }) => {
  return (
    <button
      onClick={incrementarCaracter}
      className="w-full flex-1 bg-purple-600 text-white inline-flex items-center justify-center h-10 align-top text-lg text-center rounded-e-md cursor-pointer transition-all hover:bg-purple-700"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
    </button>
  );
};

export const ButtonCheck = ({ select, toggle }) => {
  return (
    <button
      onClick={toggle}
      className={`w-full flex-1 bg-purple-600 text-white inline-flex items-center justify-center h-10 align-top text-lg text-center rounded-md cursor-pointer transition-all hover:bg-purple-700 ${
        select === false && "bg-purple-800 hover:bg-purple-800"
      }`}
    >
      {select ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      )}
    </button>
  );
};

export const ButtonGenerate = () => {
  return (
    <button
      type="submit"
      className="w-full flex-1 bg-purple-600 text-white inline-flex items-center justify-center h-10 align-top text-lg text-center rounded-md cursor-pointer transition-all hover:bg-purple-700"
    >
      Generate{" "}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
        />
      </svg>
    </button>
  );
};

export const ButtonSave = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      type="submit"
      className="w-full flex-1 bg-purple-600 text-white inline-flex items-center justify-center h-10 align-top text-lg text-center rounded-md cursor-pointer transition-all hover:bg-purple-700"
    >
      Save password
    </button>
  );
};

export const ButtonDelete = ({ onClick, id }) => {
  return (
    <button
      onClick={() => onClick(id)}
      className="bg-red-500 rounded-md px-2 transition-all hover:bg-red-600"
    >
      Delete
    </button>
  );
};
