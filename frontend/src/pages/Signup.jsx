import SignupForm from "../components/SignupFrom";
import Navbar from "../components/Nav/Navbar";

export default function Signup() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <SignupForm />
      </div>
    </>
  );
}