export interface Habit {
    id: number;
    name: string;
    icon: string;
    date: string; // YYYY-MM-DD format
    timeSlot: 'Early rise' | 'Morning' | 'Afternoon' | 'Evening' | 'AnyTime';
    journal?: string;
    journalEntries?: { date: string; content: string }[];
    completed?: boolean;
  }
  