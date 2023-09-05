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

  type CloudinaryImage = {
    url: string;
  }[];

  type ProjectMapLinks = Promise<
    {
      name: string;
      path: string;
      type: "composition" | "redirect" | "placeholder";
      isRoot: boolean;
    }[]
  >;
}
