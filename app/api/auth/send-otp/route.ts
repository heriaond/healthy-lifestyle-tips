import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP in database (expires in 10 minutes)
    const expires = new Date(Date.now() + 10 * 60 * 1000);
    
    await prisma.verificationToken.upsert({
      where: {
        identifier_token: {
          identifier: email,
          token: otp,
        },
      },
      create: {
        identifier: email,
        token: otp,
        expires,
      },
      update: {
        token: otp,
        expires,
      },
    });

    // Send email with OTP
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Your verification code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Your Verification Code</h2>
          <p style="color: #666; font-size: 16px;">
            Use this code to sign in to Healthy Lifestyle Tips:
          </p>
          <div style="background: #f5f5f5; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <p style="font-size: 32px; font-weight: bold; letter-spacing: 8px; margin: 0; color: #22c55e;">
              ${otp}
            </p>
          </div>
          <p style="color: #999; font-size: 14px;">
            This code will expire in 10 minutes.
          </p>
          <p style="color: #999; font-size: 14px;">
            If you didn't request this code, you can safely ignore this email.
          </p>
        </div>
      `,
      text: `Your verification code is: ${otp}\n\nThis code will expire in 10 minutes.`,
    });

    console.log(`✅ OTP sent to ${email}: ${otp}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Send OTP error:", error);
    return NextResponse.json(
      { error: "Failed to send verification code" },
      { status: 500 }
    );
  }
}
