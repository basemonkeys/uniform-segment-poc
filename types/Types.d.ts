declare namespace Types {
    type ProjectMapLink = {
      path: string;
      type?: string;
      isRoot?: boolean;
      name?: string;
    };
  
    type CloudinaryImage = {
      url: string;
    }[];  
}