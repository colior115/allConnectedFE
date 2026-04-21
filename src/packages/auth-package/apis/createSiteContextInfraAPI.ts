import type { Session, User } from '@supabase/supabase-js';
import type { SiteContextInfraAPI } from './siteContextInfraAPI';

type Setter<T> = (value: T) => void;

export const createSiteContextInfraAPI = (): SiteContextInfraAPI => {
  let setUser: Setter<User | null> = () => {};
  let setSession: Setter<Session | null> = () => {};

  return {
    setUser(user) {
      setUser(user);
    },
    setSession(session) {
      setSession(session);
    },
    clearContext() {
      setUser(null);
      setSession(null);
    },
    registerSetters(userSetter, sessionSetter) {
      setUser = userSetter;
      setSession = sessionSetter;
    },
  };
};
