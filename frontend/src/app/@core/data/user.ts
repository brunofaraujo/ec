import {Profile} from './profile';

export class User {
  id: number;
  email: string;
  password: string;
  remember_token: string;
  created_at: string;
  updated_at: string;
  profile: Profile;
}
