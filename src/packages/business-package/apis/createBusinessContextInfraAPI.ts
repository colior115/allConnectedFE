import type { BusinessContextInfraAPI, BusinessContextValue } from './businessContextInfraAPI';

export const createBusinessContextInfraAPI = (): BusinessContextInfraAPI => {
  let setter: (context: BusinessContextValue | null) => void = () => {};
  let currentContext: BusinessContextValue | null = null;

  return {
    setBusinessContext(context) {
      currentContext = context;
      setter(context);
    },
    clearBusinessContext() {
      currentContext = null;
      setter(null);
    },
    registerSetter(s) {
      setter = s;
    },
    getContext() {
      return currentContext;
    },
  };
};
