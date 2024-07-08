import React from "react";
import { CreateRoomForm } from "./create-room-form";

const page = () => {
  return (
    <div className="container mx-auto min-h-screen py-10">
      <h1>Create Room</h1>
      <CreateRoomForm />
    </div>
  );
};

export default page;
