import { FormEvent, useState } from 'react'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [feedback, setFeedback] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const fields = new FormData(form)
    setStatus('submitting')
    setFeedback('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(fields)),
      })
      if (!response.ok) {
        const body = (await response.json().catch(() => ({}))) as { detail?: string }
        throw new Error(typeof body.detail === 'string' ? body.detail : 'Please review the form and try again.')
      }
      form.reset()
      setStatus('success')
      setFeedback('Thanks — your message has been received.')
    } catch (error) {
      setStatus('error')
      setFeedback(error instanceof Error ? error.message : 'Unable to send your message right now.')
    }
  }

  return (
    <form onSubmit={submit} className="border border-white/12 bg-obsidian/35 p-6 text-ivory sm:p-9" aria-label="Contact form">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="field-label">
          Name
          <input required minLength={2} maxLength={80} name="name" autoComplete="name" className="field" />
        </label>
        <label className="field-label">
          Email
          <input required name="email" type="email" autoComplete="email" className="field" />
        </label>
      </div>
      <label className="field-label mt-5">
        Subject
        <input required minLength={3} maxLength={120} name="subject" className="field" />
      </label>
      <label className="field-label mt-5">
        Message
        <textarea required minLength={20} maxLength={3000} name="message" rows={5} className="field resize-none" />
      </label>
      <label className="absolute -left-[9999px]" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button disabled={status === 'submitting'} className="button-dark disabled:cursor-wait disabled:opacity-60">
          {status === 'submitting' ? 'Sending…' : 'Send message'}
          <ArrowUpRight size={17} aria-hidden="true" />
        </button>
        <p className={`max-w-xs text-sm ${status === 'error' ? 'text-red-300' : 'text-brass'}`} role="status">
          {status === 'success' && <CheckCircle2 className="mr-1 inline" size={16} aria-hidden="true" />}
          {feedback}
        </p>
      </div>
    </form>
  )
}

