import { Nunito } from "next/font/google"; // or any other font you want

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
});

export default function DashboardLayout({ children }) {
  return (
    <div
      className={`${
        nunito.className || ""
      } flex flex-col justify-center min-h-screen bg-primary p-4 min-w-screen align-middle`}
    >
      <div className="h-[100%] w-[100%] mx-auto bg-white rounded-lg shadow-lg p-6">
        {children}
      </div>
    </div>
  );
}
