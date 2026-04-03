import CreateForm from "../ui/create/createForm"

export default function CreatePage() {
  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#1a202c',
    }}>
        <CreateForm />
    </div>
)}