export const ButtonMinus = ({ restarCaracter }) => {
  return (
    <button
      onClick={restarCaracter}
      className="w-8 sm:w-10 h-8 sm:h-10 bg-accent text-white inline-flex items-center justify-center rounded-l-md transition-all hover:bg-accent/80 focus:outline-none focus:ring-2 focus:ring-accent/50"
      aria-label="Decrease length"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-4 h-4 sm:w-5 sm:h-5"
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
      className="w-8 sm:w-10 h-8 sm:h-10 bg-accent text-white inline-flex items-center justify-center rounded-r-md transition-all hover:bg-accent/80 focus:outline-none focus:ring-2 focus:ring-accent/50"
      aria-label="Increase length"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-4 h-4 sm:w-5 sm:h-5"
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
      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-accent/50 ${
        select
          ? "bg-accent text-white hover:bg-accent/80"
          : "bg-border text-text/50 hover:bg-border/80"
      }`}
      aria-label={select ? "Disable option" : "Enable option"}
    >
      {select ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-4 h-4 sm:w-5 sm:h-5"
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
          strokeWidth="2"
          stroke="currentColor"
          className="w-4 h-4 sm:w-5 sm:h-5"
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
      className="sm:flex-1 bg-accent text-white inline-flex items-center justify-center gap-2 h-8 sm:h-10 px-3 sm:px-4 rounded-lg font-medium text-sm sm:text-base transition-all hover:bg-accent/80 focus:outline-none focus:ring-2 focus:ring-accent/50"
    >
      Generate
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-3 h-3 sm:w-4 sm:h-4"
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
      type="button"
      className="w-full bg-accent text-white inline-flex items-center justify-center gap-2 h-8 sm:h-10 px-3 sm:px-4 rounded-lg font-medium text-sm sm:text-base transition-all hover:bg-accent/80 focus:outline-none focus:ring-2 focus:ring-accent/50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-3 h-3 sm:w-4 sm:h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
        />
      </svg>
      Save password
    </button>
  );
};

export const ButtonDelete = ({ onClick, id }) => {
  return (
    <button
      onClick={() => onClick(id)}
      className="bg-red-500/20 text-red-400 hover:bg-red-500/30 px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-red-500/50"
      aria-label="Delete password"
    >
      Delete
    </button>
  );
};