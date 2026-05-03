import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { registerBusinessTokenGetter } from '../../../services/apiClient';
import type { BusinessContextInfraAPI, BusinessContextValue } from '../apis/businessContextInfraAPI';

const BusinessContext = createContext<BusinessContextValue | null>(null);

interface BusinessProviderProps {
  children: ReactNode;
  businessContextAPI: BusinessContextInfraAPI;
}

export function BusinessProvider({ children, businessContextAPI }: BusinessProviderProps) {
  const [context, setContext] = useState<BusinessContextValue | null>(null);

  useEffect(() => {
    businessContextAPI.registerSetter(setContext);
    registerBusinessTokenGetter(() => businessContextAPI.getContext()?.token ?? null);
  }, [businessContextAPI]);

  return (
    <BusinessContext.Provider value={context}>
      {children}
    </BusinessContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBusinessContext(): BusinessContextValue | null {
  return useContext(BusinessContext);
}
