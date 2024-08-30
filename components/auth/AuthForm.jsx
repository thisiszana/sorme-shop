import ForgotPasswordPage from "./ForgotPasswordPage";
import SignupPage from "./SignupPage";
import LoginPage from "./LoginPage";

export default function AuthForm({ type }) {
  return (
    <>
      {type === "login" && <LoginPage />}
      {type === "signup" && <SignupPage />}
      {type === "forgot-password" && <ForgotPasswordPage />}
    </>
  );
}
