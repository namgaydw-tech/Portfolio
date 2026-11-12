import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ContactForm } from './ContactForm'

afterEach(() => vi.restoreAllMocks())

describe('ContactForm', () => {
  it('submits form values and reports success', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ id: 'message-id' }), { status: 201, headers: { 'Content-Type': 'application/json' } }),
    )
    render(<ContactForm />)

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Test Evaluator' } })
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.edu' } })
    fireEvent.change(screen.getByLabelText('Subject'), { target: { value: 'Portfolio review' } })
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'This message is long enough to pass the form validation.' } })
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }))

    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('your message has been received'))
    expect(fetchMock).toHaveBeenCalledWith('/api/contact', expect.objectContaining({ method: 'POST' }))
  })

  it('shows a server error', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ detail: 'Service unavailable' }), { status: 503, headers: { 'Content-Type': 'application/json' } }),
    )
    render(<ContactForm />)
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Test Evaluator' } })
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.edu' } })
    fireEvent.change(screen.getByLabelText('Subject'), { target: { value: 'Portfolio review' } })
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'This message is long enough to pass the form validation.' } })
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }))
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Service unavailable'))
  })
})

