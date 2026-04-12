import { StoreContext } from "./storeContext";
import { useStoreState } from "./storeState";

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const store = useStoreState();

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};
