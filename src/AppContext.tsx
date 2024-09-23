import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface IAppContextProps {
  setWalletAddress?: Function;
  setHistoryItem?: Function;
  clearHistory?: Function;
  history?: string[];
  address?: string;
  children?: ReactNode;
}

interface IAppState {
  history: string[];
  address: string;
}

const initApp: IAppState = {
  history: [],
  address: '',
};

export const AppContext = createContext<IAppContextProps>({});

const getInitialState = () => {

  const storedAddress: string | null = localStorage.getItem("address");
  const storedHistoryString: string | null = localStorage.getItem("history");

  let storedHistory;

  if (storedHistoryString) {
    try {
      storedHistory = JSON.parse(storedHistoryString);
    } catch (error) {
      // if we fail to parse it - consider data to be invalid and clear it
      localStorage.removeItem("history");
      console.error(error);
    }
  }

  if (storedAddress) {
    initApp.address = storedAddress;
  }

  if (storedHistory) {
    initApp.history = storedHistory;
  }

  return initApp;
};

const AppContextProvider = (props: IAppContextProps) => {

  const initState = getInitialState();

  const [appState, setAppState] = useState(initState);

  useEffect(() => {
    const { address, history } = appState;
    localStorage.setItem("history", JSON.stringify(history));
    localStorage.setItem("address", address.trim());
  }, [appState]);

  const setWalletAddress = (address: string) =>
    setAppState((prev: IAppState) => ({
      ...prev,
      address,
    }));

  const setHistoryItem = (item: string) =>
    setAppState((prev: IAppState) => ({
      ...prev,
      history: [item, ...prev.history],
    }));

  const clearHistory = () =>
    setAppState((prev: IAppState) => ({
      ...prev,
      history: [],
    }));

  return (
    <AppContext.Provider value={{ setWalletAddress, setHistoryItem, clearHistory, ...appState }}>
      {props?.children}
    </AppContext.Provider>
  );
};

export const useAppState = () => useContext(AppContext);

export default AppContextProvider;
