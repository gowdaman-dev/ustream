import db from "@/utils/db";
import { unstable_noStore } from "next/cache";

export async function getRooms() {
  unstable_noStore();
  const rooms = await db.room.findMany();
  return rooms;
}

export async function getRoom(roomid: string) {
  unstable_noStore();
  const room = await db.room.findUnique({
    where: {
      id: roomid,
    },
  });
  return room;
}
