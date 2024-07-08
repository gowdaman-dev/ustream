"use client";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import {
  Call,
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { generateVideoClient } from "./actions";
import { useRouter } from "next/navigation";

const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY as string;
export const UmeetVideo = ({ room }: { room: any }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  useEffect(() => {
    if (!session) {
      return;
    }
    const userId = session.user.id;
    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: userId,
      },
      tokenProvider: () => generateVideoClient(),
    });
    setClient(client);
    const call = client.call("default", room.roomId);
    call.join({ create: true });
    setCall(call);
    return () => {
      call.leave();
      client.disconnectUser();
    };
  }, [session, room]);
  return (
    client &&
    call && (
      <StreamVideo client={client}>
        <StreamTheme>
          <StreamCall call={call}>
            <SpeakerLayout />
            <CallControls onLeave={() => router.push("/")} />
          </StreamCall>
        </StreamTheme>
      </StreamVideo>
    )
  );
};
