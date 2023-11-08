"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { getFitnessLocations } from "@/utils/api";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/primitives/card";
import { Button } from "@/components/primitives/button";
import { DarkBackground } from "@/components/Backgrounds";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

import type { FitnessLocationsProps as BaseFitnessLocationProps } from "@/components/uniform/user/dashboard/FitnessLocations";

type FitnessLocationsProps = BaseFitnessLocationProps & {
  locations: Types.FitnessLocationsProps;
};

export function FitnessLocations({
  title,
  description,
  locations,
}: FitnessLocationsProps) {
  const { data } = useQuery<Types.FitnessLocationsProps, Error>({
    queryKey: ["locations"],
    queryFn: getFitnessLocations,
    initialData: locations,
  });

  const { Locations }: Types.FitnessLocationsProps = data;

  // TODO: is this component used more than once, can it be reused and how would we name it?
  return (
    <div className="relative text-background">
      <DarkBackground />
      <Card className="relative space-y-2 bg-transparent p-10">
        <CardHeader>
          <CardTitle className="h3 pb-0">Fitness Locations</CardTitle>
          <CardDescription className="text-white">
            These locations are within 10 miles of 85225 and available to you at
            no cost
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 text-foreground lg:grid-cols-3">
            {Locations.map((item) => (
              <>
                <Card key={item.Id} className="flex flex-col p-4">
                  <CardHeader>
                    <CardTitle className="h4">{item.Name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-2">
                    <div>
                      <div>{item.Address}</div>
                      <div>{item.Phone}</div>
                    </div>
                    <div>
                      <Link
                        href={`https://www.google.com/maps/search/?api=1&query=${item.Latitude},${item.Longitude}`}
                      >
                        Get Directions
                        <FontAwesomeIcon
                          icon={faUpRightFromSquare}
                          className="ml-2"
                        />
                      </Link>
                    </div>
                    <>
                      {item.NetworkProperties?.Amenities && (
                        <div>
                          <p className="font-bold">Amenities:</p>
                          <div className="text-sm">
                            {item.NetworkProperties?.Amenities.map(
                              (amenity, index) => (
                                <>
                                  <span key={index}>
                                    {amenity.Name}
                                    {index !==
                                      item.NetworkProperties?.Amenities.length -
                                        1 && <>, </>}
                                  </span>
                                </>
                              ),
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <Button className="max-sm:w-full lg:w-full">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              </>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-2 text-center">
          <h3>{title}</h3>
          <p className="max-w-[630px]">{description}</p>
          <Button variant={"primaryWhite"} className="mt-4" asChild>
            <Link href="https://www.google.com/maps/search/?api=1&query=33.306160,-111.841250">
              Download Member ID
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
