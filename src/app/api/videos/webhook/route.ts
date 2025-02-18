import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import {
  VideoAssetCreatedWebhookEvent,
  VideoAssetErroredWebhookEvent,
  VideoAssetReadyWebhookEvent,
  VideoAssetTrackReadyWebhookEvent
} from "@mux/mux-node/resources/webhooks"

import { mux } from "@/lib/mux";
import { db } from "@/db";
import { videos } from "@/db/schema";

type WebhookEvent = 
  | VideoAssetCreatedWebhookEvent
  | VideoAssetReadyWebhookEvent
  | VideoAssetErroredWebhookEvent
  | VideoAssetTrackReadyWebhookEvent

export const POST = async (req: Request) => {
  const SIGNING_SECRET = process.env.MUX_WEBHOOK_SECRET!;

  if (!SIGNING_SECRET) throw new Error('MUX_WEBHOOK_SECRET is not set');

  // Get headers
  const headerPayload = await headers();
  const muxSignature = headerPayload.get('mux-signature');

  // If there are no signature, error out
  if (!muxSignature) return new Response('No signature found', { status: 401 });

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  mux.webhooks.verifySignature(
    body,
    {
      "mux-signature": muxSignature
    },
    SIGNING_SECRET
  )

  switch (payload.type as WebhookEvent["type"]) {
    case "video.asset.created": {
      const data = payload.data as VideoAssetCreatedWebhookEvent["data"]

      if (!data.upload_id) return new Response("No upload ID found", { status: 400 })
      
      await db
        .update(videos)
        .set({
          muxAssetId: data.id,
          muxStatus: data.status
        })
        .where(eq(videos.muxUploadId, data.upload_id))
      break
    }
  }

  return new Response("Webhook received", { status: 200 })
};
