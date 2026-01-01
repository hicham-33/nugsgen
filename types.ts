export interface Window {
  _cZ?: () => void;
}

export interface UserConfig {
  username: string;
  platform: 'Quest' | 'PC';
  nugs: number;
  rareEgg: boolean;
}
