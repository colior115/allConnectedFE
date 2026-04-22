import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { registerBusinessTokenGetter } from '../../../services/apiClient';
import type { BusinessContextInfraAPI, BusinessContextValue } from '../apis/businessContextInfraAPI';

const BusinessContext = createContext<BusinessContextValue | null>(null);

interface BusinessProviderProps {
  children: ReactNode;
  businessContextAPI: BusinessContextInfraAPI;
}

export function BusinessProvider({ children, businessContextAPI }: BusinessProviderProps) {
  const [context, setContext] = useState<BusinessContextValue | null>(null);

  const tokenRef = useRef<string | null>(null);
  tokenRef.current = context?.token ?? null;

  useEffect(() => {
    businessContextAPI.registerSetter(setContext);
    registerBusinessTokenGetter(() => tokenRef.current);
  }, [businessContextAPI]);

  return (
    <BusinessContext.Provider value={context}>
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusinessContext(): BusinessContextValue | null {
  return useContext(BusinessContext);
}
