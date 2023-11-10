// TODO: Clean up these types. Double check if they are being used.

declare namespace Types {
  // Image Props
  type CloudinaryImage = {
    url: string;
  }[];

  // Page Props
  type PolicyUseProps = {
    title: string;
    lastUpdated: string;
    text: any;
  };

  // API Props
  type UserApiProps = {
    firstName: string;
    lastName: string;
    email: {
      address: string;
    };
    eligibility: {
      cardNumber: string;
      cardImageUrl: string;
    };
    campaigns: [
      {
        Participated: boolean;
        CampaignType: string;
        Eligible: boolean;
        MaxBookings: null;
        GoalWeightLoss: number;
        GoalAcheived: boolean;
        CurrentWeightLost: number;
      },
    ];
  };

  type VisitsApiProps = {
    date: string;
    isFlex: boolean;
    locationId: string;
    locationName: string;
  };

  type LiveClassesApiProps = {
    void: string;
    PageCount: number;
    PageNumber: number;
    PageSize: number;
    TotalRecords: number;
    LiveStreams: [
      {
        Uuid: string;
        LiveId: string;
        HostId: string;
        Topic: string;
        Type: number;
        Duration: number;
        Timezone: string;
        CreatedAt: string;
        JoinUrl: string;
        Agenda: string;
        StartTime: string;
        Title: string;
        Instructor: string;
        InstructorImage: string;
        Intensity: string;
        Registrant: null;
      },
    ];
  };

  type FitnessLocationsApiProps = {
    NumberOfLocations: number;
    Locations: [
      {
        Id: string;
        Name: string;
        Phone: null;
        Address: string;
        City: string;
        State: string;
        Zip: string;
        Longitude: number;
        Latitude: number;
        Distance: number;
        GenderSpecific: string;
        TierNumber: number;
        TierName: string;
        LocationType: string;
        FlexProperties: {
          FlexClasses: [
            {
              FlexEvents: [
                {
                  EventId: number;
                  StartDateTime: string;
                  Tracked: boolean;
                  Cancelled: boolean;
                  VirtualLink: null;
                },
              ];
              CourseId: number;
              CourseType: string;
              CourseName: string;
              CourseDescription: string;
              CourseLength: null;
              CourseLevel: null;
              CourseMarketingCategory: null;
              ClassId: number;
              ValidProducts: null;
              MarketingSuspended: boolean;
              MarketingSuspendedPrime: boolean;
              Delivery: string;
              VirtualType: null;
              VenueTimezone: null;
              FirstName: string;
              LastName: string;
              InstructorId: number;
              LanguageName: null;
              LocalizedLanguageName: null;
              Schedule: string;
            },
          ];
        };
        NetworkProperties: {
          Website: string;
          CorpIdCode: string;
          IsHomeLocationTier: boolean;
          MarketingNotes: string;
          TierLocationStartDate: string;
          HasSsfpClass: boolean;
          HasBoomClass: boolean;
          UpmcPersonalTrainer: boolean;
          Amenities: [
            {
              Id: number;
              Name: string;
              Type: string;
              CategoryName: string;
              AdditionalCost: boolean;
            },
          ];
          Attributes: [
            {
              AttributeName: string;
              AttributeValue: string;
            },
          ];
        };
      },
    ];
  };

  type MemberApiProps = {
    firstName: string;
    lastName: string;
    middleInitial: string;
    nickname: string;
    gender: string;
    zipCode: string;
    dateOfBirth: string;
    accountCreationDate: string;
    eligibility: {
      hasSilverSneakers: boolean;
      cardNumber: string;
      cardImageUrl: string;
      benefitProviderId: string;
      startDate: string;
      endDate: string;
      eligibilityId: string;
      costCenter: string;
      SubscriberId: string;
      Source: string;
      DependentId: string;
      ActiveMemberTier: {
        HwEligibilityId: number;
        ProgramCode: string;
        Tier: number;
        TierEndDate: string;
        TierLpdDate: string;
        TierStartDate: string;
      };
    };
    email: {
      address: string;
      verified: boolean;
    };
    phone: {
      number: string;
      numberToVerify: string;
      verified: boolean;
    };
    credentials: {
      lastPasswordChangeDate: string;
      lastLoginDate: string;
      remainingLockoutMinutes: number;
      remainingLoginAttempts: number;
    };
    stepsKitBenefit: {
      hasBenefit: boolean;
      orderLimitReached: boolean;
      ordersHistory: [
        {
          kit: string;
          orderDate: string;
          orderStatus: string;
          address1: string;
          address2: string;
          city: string;
          state: string;
          zip: string;
        },
      ];
    };
    campaigns: [
      {
        Participated: boolean;
        CampaignType: string;
        Eligible: boolean;
        MaxBookings: string;
      },
    ];
    EngagementColor: number;
    EngagementContact: number;
    workoutPreference: string;
  };

  // Layout Props
  type AvailableColumnCount =
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "10"
    | "11"
    | "12";
}
