import { getRoom } from "@/app/data-access/rooms";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { UmeetVideo } from "./video-player";

const page = async ({
  params,
}: {
  params: {
    roomid: string;
  };
}) => {
  const roomId = (await params.roomid) as string;
  const room = await getRoom(roomId);
  if (!room) {
    return <div className="">No room of this ID Found!</div>;
  }
  const Language = room.language.split(",").map((lang) => lang.trim());
  return (
    <div className="grid grid-cols-4 min-h-screen">
      <div className="col-span-3  p-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
          <UmeetVideo room={room} />
        </div>
      </div>
      <div className="col-span-1 p-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-2">
          <h1 className="text-base">{room?.name}</h1>
          {room.gitHubRepo && (
            <Link
              href={room?.gitHubRepo as string}
              target="_blank"
              rel="noopener opreferrer"
              className="flex items-center justify-start gap-2 "
            >
              <GithubIcon />
              Github Repo
            </Link>
          )}
          <h2 className="text-gray-600 text-base">{room?.description}</h2>
          <div className="flex flex-warp gap-2">
            {Language.map((lang) => {
              return <Badge key={lang}>{lang}</Badge>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
