import "./globals.css";

export const metadata = {
	title: "Growhut",
	description: "Growhut",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
