import React from "react";
import styles from "./AppName.module.css";

const AppName = () => {
	return <header className={styles.logo}>{process.env.REACT_APP_NAME}</header>;
};

export default AppName;
