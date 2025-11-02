"use client";

import {
  BookOpenTextIcon,
  BotIcon,
  CameraIcon,
  CheckCircle2,
  ClockFadingIcon,
  FileTextIcon,
  ListCheckIcon,
} from "lucide-react";
import { MeetingGetOne } from "../../types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TabsContent } from "@radix-ui/react-tabs";
import Markdown from "react-markdown";
import Link from "next/link";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { formatDuration } from "@/lib/utils";
import { Transcript } from "./transcript";
import { ChatProvider } from "./chat-provider";

interface Props {
  data: MeetingGetOne;
}

export const CompletedState = ({ data }: Props) => {
  return (
    <div className="bg-white rounded-xl px-4 py-6 flex flex-col items-center justify-center gap-y-6 shadow-sm text-center w-full max-w-md mx-auto">
      {/* Success Icon */}
      <CheckCircle2 className="w-16 h-16 text-green-500" />

      {/* Header Text */}
      <div className="text-center px-2">
        <h2 className="text-xl font-bold text-gray-800">Meeting completed</h2>
        <p className="text-gray-600 mt-1 text-sm">
          This meeting has ended. View the report, transcript, recording, or chat below.
        </p>
      </div>

      {/* Tabs Section */}
      <div className="w-full">
        <Tabs defaultValue="ViewReport">
          {/* Scrollable Tab Bar */}
          <div className="bg-white rounded-lg border">
            <ScrollArea className="w-full whitespace-nowrap">
              <TabsList className="flex p-0 bg-background h-12">
                <TabsTrigger
                  value="ViewReport"
                  className="flex flex-col items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-muted-foreground data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-background rounded-none min-w-[80px]"
                >
                  <BookOpenTextIcon className="w-4 h-4" />
                  Report
                </TabsTrigger>
                <TabsTrigger
                  value="transcript"
                  className="flex flex-col items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-muted-foreground data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-background rounded-none min-w-[80px]"
                >
                  <FileTextIcon className="w-4 h-4" />
                  Transcript
                </TabsTrigger>
                <TabsTrigger
                  value="recording"
                  className="flex flex-col items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-muted-foreground data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-background rounded-none min-w-[80px]"
                >
                  <CameraIcon className="w-4 h-4" />
                  Video
                </TabsTrigger>
                <TabsTrigger
                  value="chat"
                  className="flex flex-col items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-muted-foreground data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-background rounded-none min-w-[80px]"
                >
                  <BotIcon className="w-4 h-4" />
                  ChatBot
                </TabsTrigger>
              </TabsList>
              <ScrollBar orientation="horizontal" className="invisible" />
            </ScrollArea>
          </div>

          {/* Tab Content */}
          <TabsContent value="chat" className="mt-4">
            <ChatProvider meetingId={data.id} meetingName={data.name} />
          </TabsContent>

          <TabsContent value="transcript" className="mt-4">
            <Transcript meetingId={data.id} />
          </TabsContent>

          <TabsContent value="recording" className="mt-4">
            <div className="bg-white rounded-lg border overflow-hidden">
              <video
                src={data.recordingUrl!}
                controls
                className="w-full aspect-video object-cover"
                playsInline // Important for iOS Safari
              />
            </div>
          </TabsContent>

          <TabsContent value="ViewReport" className="mt-4">
            <div className="bg-white rounded-lg border overflow-hidden">
              <div className="p-4 space-y-4">
                <h2 className="text-lg font-semibold capitalize">{data.name}</h2>

                <div className="flex items-center gap-x-2">
                  <Link
                    href={`/agents/${data.agent.id}`}
                    className="flex items-center gap-x-2 underline underline-offset-2 text-sm capitalize"
                  >
                    <GeneratedAvatar
                      variant="initials"
                      seed={data.agent.name}
                      className="size-6"
                    />
                    {data.agent.name}
                  </Link>
                  <span className="text-xs text-gray-500">
                    {data.startedAt ? format(data.startedAt, "dd/MM/yyyy") : ""}
                  </span>
                </div>

                <div className="flex items-center gap-x-2 text-sm">
                  <ListCheckIcon className="w-4 h-4 text-gray-500" />
                  <span>Data Report</span>
                </div>

                <Badge
                  variant="outline"
                  className="flex items-center gap-x-1.5 py-1 px-2 text-xs [&>svg]:size-3.5"
                >
                  <ClockFadingIcon className="text-blue-600" />
                  {data.duration ? formatDuration(data.duration) : "No duration"}
                </Badge>

                {/* Markdown Content */}
                <div className="prose prose-sm max-w-none text-left">
                  <Markdown
                    components={{
                      h1: (props) => (
                        <h1 className="text-lg font-semibold mb-3" {...props} />
                      ),
                      h2: (props) => (
                        <h2 className="text-base font-semibold mb-3" {...props} />
                      ),
                      h3: (props) => (
                        <h3 className="text-sm font-semibold mb-2" {...props} />
                      ),
                      p: (props) => (
                        <p className="mb-3 leading-relaxed text-sm" {...props} />
                      ),
                      ul: (props) => (
                        <ul className="list-disc pl-5 mb-3 space-y-1" {...props} />
                      ),
                      ol: (props) => (
                        <ol className="list-decimal pl-5 mb-3 space-y-1" {...props} />
                      ),
                      li: (props) => <li className="text-sm" {...props} />,
                      strong: (props) => (
                        <strong className="font-semibold" {...props} />
                      ),
                      code: (props) => (
                        <code className="bg-gray-100 px-1 py-0.5 rounded text-xs" {...props} />
                      ),
                      blockquote: (props) => (
                        <blockquote className="border-l-2 pl-3 italic my-2 text-sm text-gray-600" {...props} />
                      ),
                    }}
                  >
                    {data.summary}
                  </Markdown>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};