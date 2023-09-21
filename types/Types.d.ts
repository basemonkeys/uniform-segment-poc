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

  type PolicyProps = {
    title: string;
    lastUpdated: string;
    text: any;
  };
}
