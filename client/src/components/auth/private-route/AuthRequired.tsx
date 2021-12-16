import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "services";

interface AuthRequiredProps {
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
	children: JSX.Element;
}

const AuthRequired: React.FC<AuthRequiredProps> = ({ setShow, children }) => {
	const auth = getCurrentUser();
	const location = useLocation();

	if (auth) {
		setShow(false);
		return children;
	} else {
		setShow(true);
		return (
			<Navigate to="/login" replace state={{ path: location.pathname }} />
		);
	}
};

export default AuthRequired;
