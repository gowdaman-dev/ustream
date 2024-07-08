"use server";
import { getSession } from "@/lib/auth";
import db from "@/utils/db";
import { revalidatePath } from "next/cache";
interface RoomForm {
  description: string;
  githubRepo: string;
  language: string;
  name: string;
}
export async function createRoomAction(value: RoomForm) {
  const session = await getSession();
  console.log(session);
  if (!session) {
    throw new Error("You must be logged in!");
  }
  await db.room.create({
    data: {
      name: value?.name,
      language: value.language,
      description: value.description,
      gitHubRepo: value.githubRepo,
      userId: session.user.id,
    },
  });
  revalidatePath("/");
}
