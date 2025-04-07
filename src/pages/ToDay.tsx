import React, { useState, useRef, useEffect } from "react";
import { Habit } from "../types/habit";
import { useHabits } from "../context/HabitContext";
import Icon from "../components/Icon";

const ToDay: React.FC = () => {
  const { habits, updateHabit } = useHabits();
  const [newJournalContent, setNewJournalContent] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");
  const [isHabitJournalOpen, setIsHabitJournalOpen] = useState(false);
  const [selectedHabitId, setSelectedHabitId] = useState<Habit["id"] | null>(
    null
  );
  const [isTimeSlotOpen, setIsTimeSlotOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>(""); // 新增搜索关键词状态

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

  const getLocalDateString = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getRandomColor = () => {
    return habitColors[Math.floor(Math.random() * habitColors.length)];
  };

  const selectedHabit = habits.find((h) => h.id === selectedHabitId) || null;

  const journalListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHabitJournalOpen && journalListRef.current) {
      journalListRef.current.scrollTop = journalListRef.current.scrollHeight;
    }
  }, [isHabitJournalOpen, selectedHabit?.journalEntries?.length]);

  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsHabitJournalOpen(false);
      setEditingIndex(null);
      setEditedContent("");
      setNewJournalContent("");
    }
  };

  const getDateLabels = () => {
    const today = new Date();
    const labels = ["Today", "Yesterday"];
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (let i = 2; i < 7; i++) {
      const pastDate = new Date(today);
      pastDate.setDate(today.getDate() - i);
      labels.push(daysOfWeek[pastDate.getDay()]);
    }
    return labels;
  };

  const dateLabels = getDateLabels();
  const dates: Date[] = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    console.log(`Date ${i}:`, getLocalDateString(date));
    return date;
  });

  const timeSlots = [
    "Early rise",
    "Morning",
    "Afternoon",
    "Evening",
    "AnyTime",
  ] as const;
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const date = new Date();
    console.log("Initial selectedDate:", getLocalDateString(date));
    return date;
  });

  const isHabitCompleted = (habit: Habit, date: string) => {
    return habit.journalEntries?.some((entry) => entry.date === date) || false;
  };

  // 处理搜索功能
  const filteredHabits = habits.filter((habit) =>
    habit.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-16 p-4 max-w-2xl mx-auto bg-yellow-50 min-h-screen">
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search habits"
          className="flex-1 p-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="ml-2 p-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition-colors"
          onClick={() => {
            // 点击按钮时触发搜索，这里可以留空，因为输入时已经实时过滤
          }}
        >
          Search
        </button>
      </div>

      <div className="flex space-x-2 mb-4 overflow-x-auto">
        {dateLabels.map((label, index) => (
          <button
            key={index}
            className={`p-2 rounded-md shadow-sm text-center text-orange-700 ${
              selectedDate.toISOString().split("T")[0] ===
              dates[index].toISOString().split("T")[0]
                ? "border-4 border-orange-400 bg-orange-50 shadow-md"
                : "border border-orange-200 bg-yellow-100 hover:bg-yellow-200"
            }`}
            onClick={() => {
              console.log(
                "Switching to date:",
                getLocalDateString(dates[index])
              );
              setSelectedDate(dates[index]);
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {timeSlots.map((slot) => {
        const slotHabits = filteredHabits.filter(
          (habit) => habit.timeSlot === slot
        );
        return (
          <div key={slot} className="space-y-2 mb-4">
            <h2 className="text-lg font-semibold text-orange-800">{slot}</h2>
            {slotHabits.length > 0 ? (
              slotHabits.map((habit) => (
                <div
                  key={habit.id}
                  onClick={() => setSelectedHabitId(habit.id)}
                  className="flex items-center justify-between p-2 rounded-md shadow-sm hover:opacity-90 cursor-pointer"
                  style={{ backgroundColor: getRandomColor() }}
                >
                  <div className="flex items-center">
                    <Icon
                      name={habit.icon}
                      className="w-6 h-6 mr-2 text-orange-600"
                    />
                    <span className="text-orange-700">{habit.name}</span>
                  </div>
                  {isHabitCompleted(
                    habit,
                    getLocalDateString(selectedDate)
                  ) && (
                    <span className="w-3 h-3 bg-green-500 rounded-full ml-2"></span>
                  )}
                </div>
              ))
            ) : (
              <div className="p-2 bg-yellow-100 rounded-md text-orange-600 text-center">
                Nothing to do here~~~
              </div>
            )}
          </div>
        );
      })}

      {selectedHabit && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedHabitId(null);
          }}
        >
          <div className="bg-yellow-100 rounded-lg shadow-2xl w-full max-w-2xl mx-4 h-[50vh] flex flex-col">
            <div className="p-4 border-b border-orange-200 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-orange-800">
                Write Journal
              </h3>
              <div className="relative">
                <button
                  className="px-6 py-2 bg-yellow-200 text-orange-700 rounded-md hover:bg-yellow-300 transition-colors"
                  onClick={() => setIsTimeSlotOpen(!isTimeSlotOpen)}
                >
                  Set Time
                </button>
                {isTimeSlotOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-yellow-100 border border-orange-200 rounded-md shadow-lg z-10">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        className="block w-full text-left px-4 py-2 text-orange-700 hover:bg-yellow-200"
                        onClick={() => {
                          if (selectedHabit) {
                            updateHabit(selectedHabit.id, { timeSlot: slot });
                            setIsTimeSlotOpen(false);
                          }
                        }}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex items-center mb-4">
                <Icon
                  name={selectedHabit.icon}
                  className="w-6 h-6 mr-2 text-orange-600"
                />
                <span className="text-lg font-medium text-orange-700">
                  {selectedHabit.name}
                </span>
              </div>
              <textarea
                placeholder="Write your journal here..."
                value={newJournalContent}
                onChange={(e) => setNewJournalContent(e.target.value)}
                className="w-full flex-1 p-3 bg-white border border-orange-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
              />
            </div>
            <div className="p-4 flex justify-between">
              <button
                className="px-6 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition-colors"
                onClick={() => setIsHabitJournalOpen(true)}
              >
                All Journal
              </button>
              <button
                className="px-6 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition-colors"
                onClick={() => {
                  if (newJournalContent.trim() && selectedHabit) {
                    const entryDate = getLocalDateString(selectedDate);
                    console.log(
                      "Current selectedDate before save:",
                      getLocalDateString(selectedDate)
                    );
                    console.log("Saving journal entry with date:", entryDate);
                    updateHabit(selectedHabit.id, {
                      journalEntries: [
                        ...(selectedHabit.journalEntries || []),
                        {
                          date: entryDate,
                          content: newJournalContent,
                        },
                      ],
                    });
                    setNewJournalContent("");
                  }
                  setSelectedHabitId(null);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {isHabitJournalOpen && selectedHabit && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div className="bg-yellow-100 rounded-lg shadow-2xl w-[75vw] min-w-[calc(100%/3-1rem)] h-[80vh] relative">
            <div className="bg-orange-400 text-white p-4 rounded-t-lg text-center flex items-center justify-center">
              <Icon name={selectedHabit.icon} className="w-6 h-6 mr-2" />
              <h2 className="text-2xl font-bold">
                {selectedHabit.name} Journal
              </h2>
            </div>
            <div
              ref={journalListRef}
              className="p-4 overflow-y-auto h-[calc(80vh-80px)] flex flex-col"
            >
              <div className="flex-1">
                {selectedHabit.journalEntries &&
                selectedHabit.journalEntries.length > 0 ? (
                  selectedHabit.journalEntries.map((entry, index) => (
                    <div
                      key={index}
                      className="p-2 bg-yellow-200 rounded-md mb-2 flex justify-between items-center"
                    >
                      {editingIndex === index ? (
                        <div className="flex-1 flex items-center">
                          <input
                            type="text"
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            className="flex-1 p-1 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
                          />
                          <button
                            onClick={() => {
                              if (selectedHabit && editedContent.trim()) {
                                const updatedEntries = (
                                  selectedHabit.journalEntries || []
                                ).map((e, i) =>
                                  i === index
                                    ? { ...e, content: editedContent }
                                    : e
                                );
                                updateHabit(selectedHabit.id, {
                                  journalEntries: updatedEntries,
                                });
                                setEditingIndex(null);
                                setEditedContent("");
                              }
                            }}
                            className="ml-2 p-1 bg-orange-400 text-white rounded-md hover:bg-orange-500"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-orange-800">
                            {entry.date}
                          </p>
                          <p className="text-sm text-orange-700">
                            {entry.content}
                          </p>
                        </div>
                      )}
                      <div className="flex items-center">
                        {editingIndex !== index && (
                          <button
                            onClick={() => {
                              setEditingIndex(index);
                              setEditedContent(entry.content);
                            }}
                            className="p-1 text-orange-600 hover:text-orange-800 mr-2"
                          >
                            ✎
                          </button>
                        )}
                        <button
                          onClick={() => {
                            if (selectedHabit) {
                              const updatedEntries = (
                                selectedHabit.journalEntries || []
                              ).filter((_, i) => i !== index);
                              updateHabit(selectedHabit.id, {
                                journalEntries: updatedEntries,
                              });
                            }
                          }}
                          className="p-1 text-red-500 hover:text-red-700"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-orange-600 text-center">
                    No journal entries yet.
                  </p>
                )}
              </div>
              <div className="mt-4 flex items-center">
                <input
                  type="text"
                  value={newJournalContent}
                  onChange={(e) => setNewJournalContent(e.target.value)}
                  placeholder="Add a new journal entry..."
                  className="flex-1 p-2 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
                />
                <button
                  onClick={() => {
                    if (newJournalContent.trim() && selectedHabit) {
                      updateHabit(selectedHabit.id, {
                        journalEntries: [
                          ...(selectedHabit.journalEntries || []),
                          {
                            date: selectedDate.toISOString().split("T")[0],
                            content: newJournalContent,
                          },
                        ],
                      });
                      setNewJournalContent("");
                    }
                    setSelectedHabitId(null);
                  }}
                  className="ml-2 p-2 bg-orange-400 text-white rounded-md hover:bg-orange-500"
                >
                  Add
                </button>
              </div>
            </div>
            <button
              className="absolute top-2 right-2 text-orange-700 hover:text-orange-900"
              onClick={() => setIsHabitJournalOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToDay;
