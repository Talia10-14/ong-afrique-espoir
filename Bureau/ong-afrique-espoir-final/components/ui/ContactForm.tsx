"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { sendEmail } from "@/app/actions/sendEmail";

export function ContactForm() {
  const [pending, setPending] = useState(false);
  const [state, setState] = useState<{
    success?: boolean;
    errors?: { name?: string[]; email?: string[]; message?: string[] };
    message?: string;
  } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    const formData = new FormData(event.currentTarget);
    const result = await sendEmail(null, formData);
    setPending(false);
    
    if (result.success) {
        // Reset form on success
        event.currentTarget.reset();
        setState(null);
    } else {
        setState(result);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      {state?.message && (
        <div className={`rounded-md p-3 text-sm ${state.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {state.message}
        </div>
      )}
      
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium">Nom complet</label>
        <input 
          id="name" 
          name="name" 
          type="text" 
          required
          className="rounded-md border border-gray-300 p-2 focus:border-terra-blue focus:outline-none focus:ring-1 focus:ring-terra-blue" 
          placeholder="Votre nom" 
        />
        {state?.errors?.name && <p className="text-xs text-red-500">{state.errors.name[0]}</p>}
      </div>
      
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <input 
          id="email" 
          name="email" 
          type="email" 
          required
          className="rounded-md border border-gray-300 p-2 focus:border-terra-blue focus:outline-none focus:ring-1 focus:ring-terra-blue" 
          placeholder="votre@email.com" 
        />
        {state?.errors?.email && <p className="text-xs text-red-500">{state.errors.email[0]}</p>}
      </div>
      
      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-medium">Message</label>
        <textarea 
          id="message" 
          name="message" 
          rows={4} 
          required
          className="rounded-md border border-gray-300 p-2 focus:border-terra-blue focus:outline-none focus:ring-1 focus:ring-terra-blue" 
          placeholder="Comment pouvons-nous vous aider ?" 
        />
        {state?.errors?.message && <p className="text-xs text-red-500">{state.errors.message[0]}</p>}
      </div>
      
      <Button type="submit" className="w-full" isLoading={pending}>
        Envoyer le message
      </Button>
    </form>
  );
}
