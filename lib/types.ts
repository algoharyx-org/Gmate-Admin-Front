export type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
  avatar: { url: string };
  bio: string;
  createdAt: string;
};

export type Index = {
  _id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
};
