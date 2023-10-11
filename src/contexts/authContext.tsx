import { ReactNode, createContext, useContext, useReducer } from "react";

interface UserI {
  name: string;
  email: string;
  password: string;
  avatar: string;
}

interface authI {
  user: UserI | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

interface intialStateI {
  user: null | UserI;
  isAuthenticated: boolean;
}

const intialState: intialStateI = {
  user: null,
  isAuthenticated: false,
};

const AuthContext = createContext<authI>({
  ...intialState,
  login: function (): void {
    throw new Error("Function not implemented.");
  },
  logout: function (): void {
    throw new Error("Function not implemented.");
  },
});

const FAKE_USER: UserI = {
  name: "Hashib",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

type ActionType = { type: "login"; payload: UserI } | { type: "logout" };

const reducer = (state: intialStateI, action: ActionType): intialStateI => {
  const { type } = action;
  switch (type) {
    case "login":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "logout":
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    intialState
  );

  const login = (email: string, password: string) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  };

  const logout = () => {
    dispatch({ type: "logout" });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const value = useContext(AuthContext);
  if (value === undefined)
    throw new Error("This component is out of provided AuthProvider");
  return value;
};
