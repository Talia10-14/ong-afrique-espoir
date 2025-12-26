"use server";

import nodemailer from "nodemailer";

interface DonationData {
  amount: string;
  name: string;
  email: string;
  phone: string;
  frequency: string;
  project: string;
  transactionId?: string;
}

export async function processDonationSuccess(data: DonationData) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  try {
    await transporter.sendMail({
      from: `"${data.name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `Nouveau Don de ${data.amount} FCFA - ${data.name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #166534;">Nouveau Don Reçu ! 🎉</h2>
          <p>Un paiement a été effectué avec succès sur le site.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background-color: #f9fafb;">
              <td style="padding: 10px; border: 1px solid #e5e7eb;"><strong>Montant</strong></td>
              <td style="padding: 10px; border: 1px solid #e5e7eb; font-size: 1.2em; font-weight: bold; color: #166534;">${data.amount} FCFA</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e7eb;"><strong>Donateur</strong></td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.name}</td>
            </tr>
            <tr style="background-color: #f9fafb;">
              <td style="padding: 10px; border: 1px solid #e5e7eb;"><strong>Email</strong></td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e7eb;"><strong>Téléphone</strong></td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.phone}</td>
            </tr>
            <tr style="background-color: #f9fafb;">
              <td style="padding: 10px; border: 1px solid #e5e7eb;"><strong>Fréquence</strong></td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.frequency}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e5e7eb;"><strong>Projet</strong></td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.project || "Soutien général"}</td>
            </tr>
            ${data.transactionId ? `
            <tr style="background-color: #f9fafb;">
              <td style="padding: 10px; border: 1px solid #e5e7eb;"><strong>ID Transaction</strong></td>
              <td style="padding: 10px; border: 1px solid #e5e7eb;">${data.transactionId}</td>
            </tr>` : ''}
          </table>
          
          <p style="margin-top: 20px; font-size: 0.9em; color: #6b7280;">Cet email est envoyé automatiquement depuis le site web.</p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to send donation email:", error);
    return { success: false, error: "Email sending failed" };
  }
}
