import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Habit } from "../types/habit";

interface HabitContextType {
  habits: Habit[];
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
  addHabit: (habit: Omit<Habit, "id">) => void;
  updateHabit: (id: number, updatedHabit: Partial<Habit>) => void;
  calculateStreak: (habit: Habit) => number;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // 从 localStorage 初始化 habits，如果没有则为空数组
  const [habits, setHabits] = useState<Habit[]>(() => {
    const savedHabits = localStorage.getItem("habits");
    return savedHabits ? JSON.parse(savedHabits) : [];
  });

  // 每次 habits 更新时，保存到 localStorage
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = (newHabit: Omit<Habit, "id">) => {
    const id = habits.length > 0 ? Math.max(...habits.map((h) => h.id)) + 1 : 1;
    setHabits([...habits, { ...newHabit, id }]);
  };

  const updateHabit = (id: number, updatedHabit: Partial<Habit>) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, ...updatedHabit } : habit
      )
    );
  };

  const calculateStreak = (habit: Habit) => {
    if (!habit.journalEntries || habit.journalEntries.length === 0) return 0;
    const habitDate = new Date(habit.date);
    const sortedEntries = habit.journalEntries
      .map((entry) => new Date(entry.date))
      .sort((a, b) => b.getTime() - a.getTime());
    let streak = 0;
    for (let i = 0; i < sortedEntries.length; i++) {
      const entryDate = sortedEntries[i];
      const diffDays = Math.floor(
        (habitDate.setHours(0, 0, 0, 0) - entryDate.setHours(0, 0, 0, 0)) /
          (1000 * 60 * 60 * 24)
      );
      if (diffDays === streak) {
        streak++;
      } else if (diffDays > streak) {
        break;
      }
    }
    return streak;
  };

  return (
    <HabitContext.Provider
      value={{ habits, setHabits, addHabit, updateHabit, calculateStreak }}
    >
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error("useHabits must be used within a HabitProvider");
  }
  return context;
};
