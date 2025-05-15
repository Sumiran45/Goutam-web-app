export interface User {
    _id: string;
    name: string;
    email: string;
    username: string;
    profilePicture?: string | null;
    is_admin?: boolean; 
    articles?: string[]; 
  }
  