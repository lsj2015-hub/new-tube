"use client"

import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

import { trpc } from "@/trpc/client"
import { cn } from "@/lib/utils"
import { VideoPlayer } from "../components/video-player"
import { VideoBanner } from "../components/video-banner"
import { VideoTopRow } from "../components/video-top-row"

interface VideoSectionProp {
  videoId: string
}

export const VideoSection = ({ videoId }: VideoSectionProp) => {
  
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <VideoSectionSuspense videoId={videoId} />
      </ErrorBoundary>
    </Suspense>
  )
}

const VideoSectionSuspense = ({ videoId }: VideoSectionProp) => {
  const [video] = trpc.videos.getOne.useSuspenseQuery({ id: videoId })

  return (
    <>
      <div className={cn(
        "aspect-video bg-black rounded-xl overflow-hidden relative",
        video.muxStatus !== 'ready' && "rounded-b-none"
      )}>
        <VideoPlayer
          autoPlay
          onPlay={() => { }}
          playbackId={video.muxPlaybackId}
          thumbnailUrl={video.thumbnailUrl}
        />
      </div>
      <VideoBanner status={"waiting"} />
      <VideoTopRow video={video} />
    </>
  )
}