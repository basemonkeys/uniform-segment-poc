"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/primitives/card";
import { Button } from "@/components/ui/primitives/button";

import { DarkBackground } from "@/components/ui/Backgrounds";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

import { getFitnessLocations } from "@/utils/api";

export function FitnessLocations(props: {
  locations: Types.FitnessLocationsProps;
}) {
  const { data, error, isLoading } = useQuery<
    Types.FitnessLocationsProps,
    Error
  >({
    queryKey: ["locations"],
    queryFn: getFitnessLocations,
    initialData: props.locations,
  });

  console.log(data, error, isLoading);

  const { Locations }: Types.FitnessLocationsProps = data;

  return (
    // TODO: is this component used more than once, can it be reused and how would we name it?
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
            {Locations.map((item, index) => (
              <>
                <Card key={index} className="flex flex-col p-4">
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
          <h3>What do I need to attend these locations?</h3>
          <p className="max-w-[630px]">
            Download or print your membership ID and bring it with you to any of
            the participating locations within our network. Show the membership
            ID to the front desk attendant and enjoy!
          </p>
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
