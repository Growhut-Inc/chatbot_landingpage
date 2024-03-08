"use client";
import Image from "next/image";
import "./style.css";
import logo from "@/assets/images/logo.svg";
import { useEffect, useState } from "react";
import arrowUp from "@/assets/images/arrow-up.svg";
const Footer = () => {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const handleChange = (e) => {
		setEmail(e.target.value);
	};
	const validateEmail = (email) => {
		const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return emailPattern.test(email);
	};

	const handleSubmit = () => {
		let validate = validateEmail(email);
		if (validate) {
			setEmail("");
			setError("");
		} else {
			setError("Email invalid, retry !");
		}
	};
	// useEffect(() => {
	// 	setTimeout(() => {
	// 		setError("");
	// 	}, 3000);
	// }, [error]);
	return (
		<div className="footer_section_wrapper">
			<div className="arrow_up">
				<Image src={arrowUp} width={45} height={0} alt="icon" />
			</div>
			<div className="form_wrapper">
				<span className="sm_text">Elevate your product</span>
				<p className="heading">Lets collaborate!</p>
				<div className="input_feild">
					<span className="input_text">Work Email</span>
					<input
						value={email}
						type="email"
						placeholder="your email"
						onChange={handleChange}
					/>
				</div>
				{error !== "" && <span className="error">*{error}</span>}
				<div className="action_wrapper">
					<div className="submit" onClick={handleSubmit}>
						Submit
					</div>
					<p>or</p>
					<div className="meeting">Book a Meeting</div>
				</div>
			</div>
			<div className="footer">
				<span className="sm_text">Brought to you by</span>
				<Image src={logo} width={68} height={0} alt="logo" />
				<a href="https://growhut.in/" target="_blank" className="link">
					https://growhut.in/
				</a>
			</div>
		</div>
	);
};

export default Footer;
