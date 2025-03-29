import { Webhook } from "svix";

import connectDB from "../../../../config/db";
import User from "../../../../models/User";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req) {
  const wh = new Webhook(process.env.SIGNING_SECRET);
  // After that add header payload.
  const headerPayload = await headers();
  const svixHeaders = {
    // in this we will defined svix id , signature
    "svix-id": headerPayload.get("svix-id"),
    "svix-signature": headerPayload.get("svix-signature"),
  };
  // Get the payload and verify it.
  const payload = await req.json();
  const body = JSON.stringify(payload);
  const { data, type } = wh.verify(body, svixHeaders);

  // After that, Prepare the user data to be saved in the database.
  const userData = {
    // first we add the id , as we define in our schema,
    _id: data.id,
    email: data.email_addresses[0].email_address,
    name: `${data.first_name} ${data.last_name}`,
    image: data.image_url,
  };
  // After that using this "userData" we will store data in MongoDB database.

  await connectDB(); // This is a function

  // After that we have different event in clerk hook

  switch (type) {
    case "user.created":
      await User.create(userData);
      break;

    case "user.updated":
      await User.findByIdAndUpdate(data.id, userData);
      break;

    case "user.deleted":
      await User.findByIdAndDelete(data.id);
      break;

    default:
      break;
  }
  // After that return 
  return NextRequest.json({message:"Event received"});
}
