"use server";
import { StreamChat } from "stream-chat";
import { getSession } from "@/lib/auth";

export async function generateVideoClient() {
  const session = await getSession();
  if (!session) {
    throw new Error("No session found");
  }
  // Define values.
  const api_key = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;
  const api_secret = process.env.NEXT_PUBLIC_GET_STREAM_APP_SECERT!;

  // Initialize a Server Client
  const serverClient = StreamChat.getInstance(api_key, api_secret);
  // Create User Token
  const token = serverClient.createToken(session.user.id);

  return token;
}
