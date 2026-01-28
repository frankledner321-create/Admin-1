
export interface Task {
  id: string;
  category: string;
  name: string;
  earnings: number;
  link: string;
  date: string;
  status: 'pending' | 'completed';
  isReported?: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export interface Device {
  id: string;
  name: string;
}

export interface Account {
  id: string;
  deviceId: string;
  name: string;
  email: string;
  password: string;
  link?: string;
}

export interface EarningRecord {
  id: string;
  deviceId: string;
  accountId: string;
  amount: number;
  date: string;
}

export interface SharedItem {
  id: string;
  type: 'link' | 'image' | 'note';
  name: string;
  description: string;
  content: string; 
  date: string;
}

export interface AppState {
  tasks: Task[];
  categories: Category[];
  devices: Device[];
  accounts: Account[];
  sharedItems: SharedItem[];
  earnings: EarningRecord[];
}
