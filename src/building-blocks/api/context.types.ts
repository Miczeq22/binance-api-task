export interface UserInContext {
  id: string;
}

export type Context = {
  user: UserInContext | null;
};
