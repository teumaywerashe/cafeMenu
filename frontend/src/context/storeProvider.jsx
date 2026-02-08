import { StoreContext } from "./storeContext";
import { useStoreState } from "./storeState";

export const StoreProvider = ({ children }) => {
  const store = useStoreState();

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};
