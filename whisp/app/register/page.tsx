import RegisterForm from "@/app/ui/login/registerForm";

export default function RegisterPage() {
  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#1a202c',
    }}>
        <RegisterForm />
    </div>
)}