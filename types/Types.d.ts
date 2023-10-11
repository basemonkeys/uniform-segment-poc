// TODO: Clean up these types. Double check if they are being used.

declare namespace Types {
  type ProjectMapLink = {
    name?: string;
    path: string;
    type?: string;
    isRoot?: boolean;
    subItems?: ProjectMapSubLink[{
      name?: string;
      description?: string;
      path: string;
    }];
  };

  type ProjectMapSubLink = {
    name?: string;
    description?: string;
    path: string;
  };

  // type NavigationLink = {
  //   title: string;
  //   link: string;
  //   description?: string;
  // };

  type ProjectMapLinks = Promise<
    {
      name: string;
      path: string;
      type: "composition" | "redirect" | "placeholder";
      isRoot: boolean;
    }[]
  >;

  type CloudinaryImage = {
    url: string;
  }[];

  type PolicyUseProps = {
    title: string;
    lastUpdated: string;
    text: any;
  };

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
