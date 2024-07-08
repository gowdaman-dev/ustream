import { Button } from "@/components/ui/button";
import db from "@/utils/db";
import Link from "next/link";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GithubIcon } from "lucide-react";
import { getRooms } from "./data-access/rooms";

interface Rooms {
  id: string;
  name: String;
  description: String;
  language: String;
  gitHubRepo: String;
}

function RoomCard({ room }: { room: Rooms }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {room.gitHubRepo && (
          <Link
            href={room.gitHubRepo as string}
            target="_blank"
            rel="noopener opreferrer"
            className="flex items-center justify-start gap-2"
          >
            <GithubIcon />
            Github Repo
          </Link>
        )}
      </CardContent>
      <CardFooter>
        <Link href={`/rooms/${room.id}`}>
          <Button>Join Room</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

async function page() {
  const rooms = await getRooms();
  return (
    <div className="min-h-screen p-16 space-y-2 ">
      <div className="flex justify-between items-center w-full mb-8 ">
        <h1 className="text-4xl">Find Dev Rooms</h1>
        <Link href={"/create-room"}>
          <Button>Create Room</Button>
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {rooms.map((room, i) => (
          <RoomCard key={i} room={room} />
        ))}
      </div>
    </div>
  );
}

export default page;
