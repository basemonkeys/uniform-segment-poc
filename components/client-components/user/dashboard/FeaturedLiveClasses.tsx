/* eslint-disable @next/next/no-img-element */

"use client";

import { useEffect, Suspense } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { slice } from "lodash";
import { parseISO, addMinutes } from "date-fns";
// import { formatInTimeZone } from "date-fns-tz";

import { getApiData } from "@/utils/api";
import { liveClassStatusAtom } from "@/utils/uiState";
import { ErrorBoundary } from "@/utils";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/primitives/card";
import { Separator } from "@/components/primitives/separator";
import { Button } from "@/components/primitives/button";
import { Skeleton } from "@/components/primitives/skeleton";

import { CloudinaryImage } from "@/components/client-components/Cloudinary";
import { LiveNowBanner } from "@/components/LiveNowBanner";
import { IntensityMeter } from "@/components/IntensityMeter";
import { ComponentError } from "@/components/client-components/ComponentError";

import { UserCircleIcon, CalendarDaysIcon } from "@heroicons/react/20/solid";

import type { FeaturedLiveClassesProps as BaseFeaturedLiveClassesProps } from "@/components/uniform/user/dashboard/FeaturedLiveClasses";

type FeaturedLiveClassesProps = BaseFeaturedLiveClassesProps & {
  classes: Types.LiveClassesApiProps;
};

export function FeaturedLiveClasses({
  title,
  description,
  classes,
}: FeaturedLiveClassesProps) {
  const setIsLive = useSetAtom(liveClassStatusAtom);

  const { data } = useQuery<Types.LiveClassesApiProps, Error>({
    queryKey: ["live"],
    queryFn: () => getApiData("live"),
    initialData: classes,
    // gcTime: 0,
  });
  const { LiveStreams }: Types.LiveClassesApiProps = data;
  const currentLiveStream = LiveStreams[0];
  const upcomingLiveStreams = slice(LiveStreams, 1, 3);

  useEffect(() => {
    const now = new Date();
    const startTime = parseISO(LiveStreams[0].StartTime);
    const endTime = addMinutes(new Date(startTime), LiveStreams[0].Duration);
    if (now >= startTime && now < endTime) {
      setIsLive(true);
    } else {
      setIsLive(true);
    }
  }, [setIsLive, LiveStreams]);

  // TODO: consider breaking these into specific featured and default card variant components,
  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      {/* TODO: work with this ErrorBoundary and Suspense/Skeleton */}
      <ErrorBoundary fallBack={<ComponentError />}>
        <Suspense fallback={<Skeleton className="h-[420px] w-full" />}>
          {currentLiveStream && (
            <Card className="relative basis-1/2 p-0">
              {/* Background Swoosh */}
              <div className="absolute top-1/2 z-0">
                <CloudinaryImage
                  fill
                  src="SilverSneakers/Graphics/bg_swoosh"
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
                  <Image
                    src={currentLiveStream.InstructorImage}
                    width={400}
                    height={288}
                    alt="Sample Instructor Image"
                  />
                </div>
                <div className="relative z-30 order-1 w-full self-start text-center max-sm:pt-12 sm:pl-28 sm:text-right lg:order-2 lg:pl-0">
                  <CardHeader>
                    <CardTitle className="h3">
                      {`${currentLiveStream.Title} with ${currentLiveStream.Instructor}`}
                    </CardTitle>
                  </CardHeader>
                </div>
              </div>
              <CardFooter className="absolute bottom-0 z-30 w-full p-6 text-white">
                <div className="flex w-full flex-col gap-4">
                  <div className="flex justify-end">
                    <Button>Join Now</Button>
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
                          <IntensityMeter
                            intensity={currentLiveStream.Intensity}
                          />
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
        </Suspense>
      </ErrorBoundary>

      <div className="flex basis-1/2 flex-col gap-4">
        <div className="mb-4 flex flex-col">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>

        {upcomingLiveStreams.map((item, index) => {
          return (
            <Card
              key={index}
              className="relative flex w-full flex-col gap-2 p-0 sm:flex-row"
            >
              <div className="relative w-full basis-1/3">
                {/* Background Swoosh */}
                <div className="absolute top-1/2 z-0">
                  <CloudinaryImage
                    fill
                    src="SilverSneakers/Graphics/bg_swoosh"
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
                    <Image
                      src={item.InstructorImage}
                      width={400}
                      height={288}
                      alt="Sample Instructor Image"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-4 lg:p-2">
                <CardHeader>
                  <CardTitle className="h4 pb-1">{item.Title}</CardTitle>
                  <div className="flex h-3 items-center space-x-2 text-sm text-foreground">
                    <span className="flex items-center gap-1">
                      <UserCircleIcon className="h-5 w-5" />
                      <span>{item.Instructor}</span>
                    </span>
                    <Separator orientation="vertical" className=" bg-default" />
                    <div className="flex items-center gap-1">
                      <CalendarDaysIcon className="h-5 w-5" />
                      <span className="font-bold">12:00 pm - 12:45pm</span>
                      <span> (EDT)</span>
                    </div>
                  </div>
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
                  <Button>RSVP</Button>
                </CardFooter>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
