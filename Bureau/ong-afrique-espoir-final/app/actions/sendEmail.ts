"use server";

import { z } from "zod";
import nodemailer from "nodemailer";
import { headers } from "next/headers";

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;

// Define validation schema
const ContactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Adresse email invalide"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

export async function sendEmail(prevState: unknown, formData: FormData) {
  // Rate Limiting
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || "unknown";
  
  const now = Date.now();
  const requestTimestamps = rateLimitMap.get(ip) || [];
  
  // Filter out old timestamps
  const recentRequests = requestTimestamps.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      success: false,
      message: "Trop de tentatives. Veuillez réessayer plus tard.",
    };
  }
  
  // Update timestamps
  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);

  const validatedFields = ContactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Veuillez corriger les erreurs dans le formulaire.",
    };
  }

  const { name, email, message } = validatedFields.data;

  // Configure Nodemailer transporter with port 587 (more reliable)
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use STARTTLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  try {
    console.log("=== EMAIL SENDING ATTEMPT ===");
    console.log("User:", process.env.EMAIL_USER);
    console.log("Pass length:", process.env.EMAIL_PASS?.length);
    
    // Verify connection
    console.log("Verifying connection...");
    await transporter.verify();
    console.log("✓ Connection verified successfully");

    // Send email
    console.log("Sending email...");
    const info = await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `Nouveau message de ${name} via le site web`,
      text: message,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2>Nouveau message de contact</h2>
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    console.log("✓ Email sent successfully:", info.messageId);
    return {
      success: true,
      message: "Votre message a été envoyé avec succès !",
    };
  } catch (error: unknown) {
    console.error("=== EMAIL ERROR ===");
    let errorMessage = "Erreur inconnue";
    
    if (error instanceof Error) {
      console.error("Error type:", error.constructor.name);
      console.error("Error message:", error.message);
      console.error("Full error:", error);
      errorMessage = error.message;
    } else {
      console.error("Unknown error:", error);
    }
    
    return {
      success: false,
      message: `Erreur: ${errorMessage}`,
    };
  }
}
