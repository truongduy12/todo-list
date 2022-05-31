import React from "react";
import styles from "./ButtonLink.module.css";

const ButtonLink = ({ children, ...rest }) => {
	return (
		<span className={styles.link} {...rest}>
			{children}
		</span>
	);
};

export default ButtonLink;
