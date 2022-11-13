export interface Account {
  id: number;
  email: string;
  password: string;
  lastLoggedIn: Date | null;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}
