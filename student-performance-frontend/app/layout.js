import "./globals.css";

export const metadata = {
  title: "Student Performance AI",
  description: "Predict and visualize student performance"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}