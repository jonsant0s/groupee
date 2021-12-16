import Alert from "react-bootstrap/Alert";

interface CustomAlertProps {
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ setShow }) => {
	return (
        <Alert
            variant="warning"
            onClose={() => setShow(false)}
            dismissible
        >
            <Alert.Heading>Please Login</Alert.Heading>
            <p>
                Enter your account credentials or{" "}
                <Alert.Link href="/signup">signup</Alert.Link>
            </p>
        </Alert>
	);
};

export default CustomAlert;