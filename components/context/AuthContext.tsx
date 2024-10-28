import { IUser } from "@/util/types";
import {
	createContext,
	useState,
	useContext,
	Dispatch,
	SetStateAction,
} from "react";

interface AuthContextType {
	user: IUser | null;
	isLoggedIn: boolean;
	fetching: boolean;
	setUser: Dispatch<SetStateAction<IUser | null>>;
	setLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	isLoggedIn: false,
	fetching: false,
	setUser: () => {},
	setLoggedIn: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<IUser | null>(null);
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [fetching, setFetching] = useState(false);

	return (
		<AuthContext.Provider
			value={{ user, isLoggedIn, fetching, setUser, setLoggedIn }}
		>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
