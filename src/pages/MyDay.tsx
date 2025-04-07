import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Habit } from "../types/habit";
import { useHabits } from "../context/HabitContext";
import Icon from "../components/Icon";

const getLocalDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const MyDay: React.FC = () => {
  const { habits } = useHabits();
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const date = new Date();
    console.log("Initial selectedDate in MyDay:", getLocalDateString(date));
    return date;
  });
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [selectedHabitId, setSelectedHabitId] = useState<number | null>(null);
  const selectedHabit = habits.find((h) => h.id === selectedHabitId) || null;

  const habitColors = [
    "#EBFFEF",
    "#E9F4FF",
    "#FEFCF4",
    "#EBEAFD",
    "#FFE7D9",
    "#FCF3EB",
    "#FFF3D1",
    "#FEE8E8",
    "#F5F4F4",
    "#F9F0E1",
  ];

  const calculateCompleted = (habit: Habit, date: Date) => {
    const dateStr = getLocalDateString(date);
    return (
      habit.journalEntries?.some((entry) => entry.date === dateStr) || false
    );
  };

  const getRandomColor = () => {
    return habitColors[Math.floor(Math.random() * habitColors.length)];
  };

  const tileContent = ({ date }: { date: Date }) => {
    const completedHabits = habits.filter((h) =>
      calculateCompleted(h, date)
    ).length;
    return completedHabits > 0 ? (
      <div style={{ display: "flex", justifyContent: "center", gap: "2px" }}>
        {Array.from({ length: Math.min(completedHabits, 3) }).map((_, i) => (
          <span key={i}>•</span>
        ))}
      </div>
    ) : null;
  };

  return (
    <div className="pt-16 p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">My Day</h1>
      <Calendar
        onChange={(value) => setSelectedDate(value as Date)}
        value={selectedDate}
        tileContent={tileContent}
        className="w-full mb-4 border rounded-md shadow-sm"
      />
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{selectedDate.toDateString()}</h3>
        {habits.length > 0 ? (
          habits.map((habit) => (
            <div
              key={habit.id}
              className="flex items-center justify-between p-2 rounded-md shadow-sm cursor-pointer"
              style={{ backgroundColor: getRandomColor() }}
              onClick={() => {
                setSelectedHabitId(habit.id);
                setIsJournalOpen(true);
              }}
            >
              <div className="flex items-center">
                <Icon name={habit.icon} className="w-6 h-6 mr-2" />
                <span className="text-lg">{habit.name}</span>
              </div>
              {calculateCompleted(habit, selectedDate) && (
                <span className="w-3 h-3 bg-green-500 rounded-full ml-2"></span>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">
            Seems like nothing to do today~
          </p>
        )}
      </div>
      {isJournalOpen && selectedHabit && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsJournalOpen(false);
          }}
        >
          <div className="bg-white rounded-lg shadow-2xl w-[75vw] min-w-[calc(100%/3-1rem)] h-[80vh] relative">
            <div className="bg-blue-500 text-white p-4 rounded-t-lg text-center flex items-center justify-center">
              <Icon name={selectedHabit.icon} className="w-6 h-6 mr-2" />
              <h2 className="text-2xl font-bold">
                {selectedHabit.name} Journal
              </h2>
            </div>
            <div className="p-4 overflow-y-auto h-[calc(80vh-80px)] flex flex-col">
              <div className="flex-1">
                {selectedHabit.journalEntries &&
                selectedHabit.journalEntries.length > 0 ? (
                  selectedHabit.journalEntries.map((entry, index) => (
                    <div
                      key={index}
                      className="p-2 bg-gray-100 rounded-md mb-2 flex justify-between items-center"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{entry.date}</p>
                        <p className="text-sm">{entry.content}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">
                    No journal entries yet.
                  </p>
                )}
              </div>
            </div>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsJournalOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDay;
