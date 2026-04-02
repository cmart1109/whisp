'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Create() {
  const [content, setContent] = useState('')
  const router = useRouter()

  const handleSubmit = async () => {
    await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ content })
    })

    router.push('/')
  }

  return (
    <div>
      <h1>Crear Post</h1>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={handleSubmit}>
        Publicar
      </button>
    </div>
  )
}