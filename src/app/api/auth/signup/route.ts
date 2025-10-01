import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";

// Safe Prisma client
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function POST(req: Request) {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      hotelName,
      website,
      phoneNumber,
      location,
      yearsInBusiness,
      bookingEngine,
    } = await req.json();

    // Basic required validation
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "First Name, Last Name, Email, and Password are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const passwordHash = await argon2.hash(password);

    // Create user in database
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        passwordHash,
        hotelName,
        website,
        phoneNumber,
        location,
        yearsInBusiness,
        bookingEngine,
      },
    });

    return NextResponse.json(
      { message: "Account created", userId: user.id },
      { status: 201 }
    );
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}
