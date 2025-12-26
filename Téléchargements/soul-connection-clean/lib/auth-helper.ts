import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function checkAuth() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return {
      authenticated: false,
      response: NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      ),
    }
  }
  return {
    authenticated: true,
    user: session.user,
  }
}
