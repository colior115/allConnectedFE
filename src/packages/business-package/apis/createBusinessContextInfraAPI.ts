import type { BusinessContextInfraAPI, BusinessContextValue } from './businessContextInfraAPI';

export const createBusinessContextInfraAPI = (): BusinessContextInfraAPI => {
  let setter: (context: BusinessContextValue | null) => void = () => {};

  return {
    setBusinessContext(context) {
      setter(context);
    },
    clearBusinessContext() {
      setter(null);
    },
    registerSetter(s) {
      setter = s;
    },
  };
};
