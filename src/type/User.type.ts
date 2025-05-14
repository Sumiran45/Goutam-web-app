export interface User {
    _id: string;
    name: string;
    email: string;
    username: string;
    profilePicture?: string | null;
    is_admin?: boolean; // If your backend uses this flag
    articles?: string[]; // Optional: array of article IDs
  }
  