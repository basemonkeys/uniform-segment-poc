// TODO: remove this eslint disable once the component is complete
/* eslint-disable @next/next/no-img-element */

"use client";

import { useEffect } from "react";
// import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { slice } from "lodash";
import { parseISO, addMinutes } from "date-fns";
// import { formatInTimeZone } from "date-fns-tz";

import { getLiveClasses } from "@/utils/api";
import { liveClassStatusAtom } from "@/utils/uiState";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/primitives/card";
import { Separator } from "@/components/primitives/separator";
import { Button } from "@/components/primitives/button";

import { CloudinaryImage } from "@/components/client-components/Cloudinary";
import { LiveNowBanner } from "@/components/LiveNowBanner";
import { IntensityMeter } from "@/components/IntensityMeter";

import { UserCircleIcon, CalendarDaysIcon } from "@heroicons/react/20/solid";

export function LiveClasses(props: { classes: Types.LiveClassesProps }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLive, setIsLive] = useAtom(liveClassStatusAtom);

  const { data } = useQuery<Types.LiveClassesProps, Error>({
    queryKey: ["live"],
    queryFn: getLiveClasses,
    initialData: props.classes,
  });

  const { LiveStreams }: Types.LiveClassesProps = data;
  const currentLiveStream = LiveStreams[0];
  const upcomingLiveStreams = slice(LiveStreams, 1, 3);

  // const streams = LiveStreams.map((item) => {
  //   return item;
  // });

  useEffect(() => {
    const now = new Date();
    const startTime = parseISO(LiveStreams[0].StartTime);
    const endTime = addMinutes(new Date(startTime), LiveStreams[0].Duration);
    if (now >= startTime && now < endTime) {
      setIsLive(true);
    } else {
      setIsLive(false);
    }
  }, [setIsLive, LiveStreams]);

  // TODO: break these into specific card variant components
  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      {currentLiveStream && (
        <Card className="relative p-0">
          {/* Background Swoosh */}
          <div className="absolute top-1/2 z-0">
            <CloudinaryImage
              fill
              src="silversneakers/shape_icvqcn"
              alt="Background Shape for styling purposes"
              className="!relative"
            />
          </div>
          {/* Background Gradiant */}
          <div className="absolute z-20 h-full w-full rounded-b-md bg-gradient-to-t from-black from-5% to-40% opacity-90"></div>
          {/* Live Now/Up Next Tag */}
          <div className="absolute top-4 z-30 bg-primary px-2 py-1 text-white">
            <LiveNowBanner />
          </div>
          <div className="flex h-full flex-col items-end p-6 lg:flex-row">
            {/* Instructor Image */}
            <div className="relative z-10 order-2 w-full max-sm:flex max-sm:justify-center max-sm:pb-[150px] lg:order-1">
              {/* <Image
          src="https://tools.silversneakers.com/Content/images/featured-instructor/brenda.png"
          width={400}
          height={288}
          alt="Sample Instructor Image"
        /> */}
              <img
                src="https://tools.silversneakers.com/Content/images/featured-instructor/brenda.png"
                alt=""
              />
            </div>
            <div className="relative z-30 order-1 w-full self-start text-right max-sm:pt-16 lg:order-2 lg:text-left">
              <CardHeader>
                <CardTitle className="h3">{currentLiveStream.Title}</CardTitle>
              </CardHeader>
            </div>
          </div>
          <CardFooter className="absolute bottom-0 z-30 w-full p-6 text-white">
            <div className="flex w-full flex-col gap-4">
              <div className="flex justify-end">
                <Button size="xl">Join Now</Button>
              </div>
              <div className="flex w-full flex-col gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <CalendarDaysIcon className="h-5 w-5" />
                    <span className="font-bold">12:00 pm - 12:45pm</span>
                    <span> (EDT)</span>
                  </div>
                  <Separator
                    orientation="vertical"
                    className=" h-[20px] bg-white"
                  />
                  <div className="flex items-center gap-2 ">
                    <div className="flex items-end gap-1">
                      <IntensityMeter intensity={currentLiveStream.Intensity} />
                    </div>
                    <span className="text-sm">
                      {currentLiveStream.Intensity}
                    </span>
                  </div>
                </div>
                <div>{currentLiveStream.Topic}</div>
              </div>
            </div>
          </CardFooter>
        </Card>
      )}

      <div className="flex flex-col gap-4">
        <div className="mb-4 flex flex-col">
          <h3>Upcoming LIVE Stream Online Classes</h3>
          <p>The following classes are coming up soon! Reserve a spot now!</p>
        </div>

        {upcomingLiveStreams.map((item, index) => {
          return (
            <Card
              key={index}
              className="relative flex flex-col gap-2 p-0 sm:flex-row "
            >
              <div className="relative w-full basis-1/3">
                {/* Background Swoosh */}
                <div className="absolute top-1/2 z-0">
                  <CloudinaryImage
                    fill
                    src="silversneakers/shape_icvqcn"
                    alt="Background Shape for styling purposes"
                    className="!relative"
                  />
                </div>
                <div className="absolute bottom-4 z-30 bg-primary px-2 py-1 text-white">
                  <LiveNowBanner />
                </div>
                {/* Instructor Image */}
                <div className="flex h-full w-full items-end justify-center ">
                  <div className="relative z-10 w-[121px]">
                    {/* <Image
                  src="https://tools.silversneakers.com/Content/images/featured-instructor/brenda.png"
                  width={400}
                  height={288}
                  alt="Sample Instructor Image"
                /> */}
                    <img
                      src="https://tools.silversneakers.com/Content/images/featured-instructor/brenda.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-4 lg:p-2">
                <CardHeader>
                  <CardTitle className="h4 pb-1">{item.Title}</CardTitle>
                  <CardDescription className="flex h-3 items-center space-x-2 text-foreground">
                    <div className="flex items-center gap-1">
                      <UserCircleIcon className="h-5 w-5" />
                      <span>{item.Instructor}</span>
                    </div>
                    <Separator orientation="vertical" className=" bg-default" />
                    <div className="flex items-center gap-1">
                      <CalendarDaysIcon className="h-5 w-5" />
                      <span className="font-bold">12:00 pm - 12:45pm</span>
                      <span> (EDT)</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <p className="text-sm">{item.Topic}</p>
                </CardContent>
                <CardFooter className="mt-auto justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-end gap-1">
                      <IntensityMeter intensity={item.Intensity} />
                    </div>
                    <span className="text-sm">{item.Intensity}</span>
                  </div>
                  <Button size="xl">RSVP</Button>
                </CardFooter>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
