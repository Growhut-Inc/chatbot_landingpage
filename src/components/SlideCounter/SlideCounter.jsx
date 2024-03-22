import "./style.css";
import React from "react";
import arrowIcon from "../../assets/images/arrow-down.svg";
import Image from "next/image";
const SlideCounter = ({ count, scrollToBottom }) => {
	return (
		<div className="slide_count">
			<span>{count}</span>
			<span className="img_wrapper">
				<Image
					src={arrowIcon}
					width={40}
					height={0}
					alt="icon"
					onClick={scrollToBottom}
				/>
			</span>
		</div>
	);
};

export default SlideCounter;
