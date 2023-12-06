import { faker } from "@faker-js/faker";
import fs from "fs";

// User Object
const user = {
  // firstName: faker.person.firstName(),
  // lastName: faker.person.lastName(),
  firstName: "Seth",
  lastName: "Hall",
  email: {
    // address: faker.internet.email(),
    address: "seth.hall@internetemail.com",
    verified: faker.datatype.boolean(),
  },
  eligibility: {
    // cardNumber: faker.string.numeric(16),
    cardNumber: "2300103854957548",
    cardImageUrl:
      "https://devapi.silversneakers.com/member-cards?a=Ktzzvk9H8zkTZaE5Zq%2BMBmR9nO4SWXweJNrN4btm567I4fjpvrIG7%2FWTnb0FYALn2ubPiogDgCk9yQ6TjPSykjmmM0wP2mjI%2FjTll58vr2wnBv8DGgt2VYJYRqpjsw2sajLfIeKf5vsKT2EpfPqVZRyzDymqe20K%2Bfe%2BXqPEjMc%3D&b=0d2fdbbfcb824ce31ad42144773b939025aa797826dc1d5365b9b9a7f8038df5",
  },
  campaigns: [
    {
      Participated: true,
      CampaignType: "Fitness+",
      Eligible: true,
      MaxBookings: null,
      GoalWeightLoss: 1,
      GoalAcheived: false,
      CurrentWeightLost: 0,
    },
    {
      Participated: true,
      CampaignType: "Stitch",
      Eligible: true,
      MaxBookings: null,
      GoalWeightLoss: 1,
      GoalAcheived: false,
      CurrentWeightLost: 0,
    },
    {
      Participated: true,
      CampaignType: "GetSetUp",
      Eligible: true,
      MaxBookings: null,
      GoalWeightLoss: 1,
      GoalAcheived: false,
      CurrentWeightLost: 0,
    },
  ],
};

// Visits Array
const generateVisits = (visits: number = 10) =>
  Array.from({ length: visits }, createVisit);

const createVisit = () => ({
  date: faker.date.past(),
  isFlex: faker.datatype.boolean(),
  locationId: faker.string.numeric(3),
  locationName: faker.location.state(),
});

faker.helpers.multiple(createVisit, { count: 10 });

// Live Classes Object
const liveClasses = {
  // PageCount: faker.number.int({ min: 1, max: 5 }),
  // PageNumber: 1,
  // PageSize: 30,
  // TotalRecords: 44,
  LiveStreams: [
    {
      Title: "Morning Routine",
      Topic: faker.lorem.sentence(),
      Instructor: "Caroline",
      InstructorImage:
        "https://cdn.silversneakers.com/images/featured-instructor/caroline.png",
      Intensity: "Beginner",
      StartTime: faker.date.soon({ days: 1 }),
      Duration: faker.number.int({ min: 30, max: 60 }),
    },
    {
      Title: "SilverSneakers Member Orientation",
      Topic: faker.lorem.sentence(),
      Instructor: "Will",
      InstructorImage:
        "https://cdn.silversneakers.com/images/featured-instructor/Will.png",
      Intensity: "Intermediate",
      StartTime: faker.date.between({ from: new Date(), to: new Date() }),
      Duration: faker.number.int({ min: 30, max: 60 }),
    },
    {
      Title: "Yoga Flow",
      Topic: faker.lorem.sentence(),
      Instructor: "Beth",
      InstructorImage:
        "https://cdn.silversneakers.com/images/featured-instructor/brenda.png",
      Intensity: "Advanced",
      StartTime: faker.date.soon({ days: 1 }),
      Duration: faker.number.int({ min: 30, max: 60 }),
    },
  ],
};

// Locations
const locations = {
  // NumberOfLocations: faker.number.int({ min: 1, max: 5 }),
  Locations: [
    {
      Id: faker.string.numeric(5),
      Name: "Planet Fitness",
      Phone: faker.phone.number(),
      Address: faker.location.streetAddress(),
      Longitude: faker.location.longitude(),
      Latitude: faker.location.latitude(),
      NetworkProperties: {
        Amenities: [
          {
            Id: faker.number.int({ min: 1, max: 5 }),
            Name: "Resistance Equipment",
          },
          {
            Id: faker.number.int({ min: 1, max: 5 }),
            Name: "Cardiovascular Equipment",
          },
          {
            Id: faker.number.int({ min: 1, max: 5 }),
            Name: "Strength Equipment",
          },
        ],
      },
    },
    {
      Id: faker.string.numeric(5),
      Name: "Community Gym",
      Phone: faker.phone.number(),
      Address: faker.location.streetAddress(),
      Longitude: faker.location.longitude(),
      Latitude: faker.location.latitude(),
      NetworkProperties: {
        Amenities: [
          {
            Id: faker.number.int({ min: 1, max: 5 }),
            Name: "Resistance Equipment",
          },
          {
            Id: faker.number.int({ min: 1, max: 5 }),
            Name: "Cardiovascular Equipment",
          },
          {
            Id: faker.number.int({ min: 1, max: 5 }),
            Name: "Strength Equipment",
          },
        ],
      },
    },
    {
      Id: faker.string.numeric(5),
      Name: "Get Moving Studios",
      Phone: faker.phone.number(),
      Address: faker.location.streetAddress(),
      Longitude: faker.location.longitude(),
      Latitude: faker.location.latitude(),
      NetworkProperties: {
        Amenities: [
          {
            Id: faker.number.int({ min: 1, max: 5 }),
            Name: "Resistance Equipment",
          },
          {
            Id: faker.number.int({ min: 1, max: 5 }),
            Name: "Cardiovascular Equipment",
          },
          {
            Id: faker.number.int({ min: 1, max: 5 }),
            Name: "Strength Equipment",
          },
        ],
      },
    },
  ],
};

fs.writeFileSync(
  "./faker/db.json",
  JSON.stringify(
    {
      user: user,
      visits: generateVisits(10),
      live: liveClasses,
      locations: locations,
    },
    null,
    2,
  ),
);
