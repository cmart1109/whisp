import LoginForm from "../ui/login/loginForm";

export default function LoginPage() {
  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#1a202c',
    }}>
        <LoginForm />
    </div>
)}