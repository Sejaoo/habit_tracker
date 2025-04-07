import React, { useState } from "react";
import { Habit } from "../types/habit";
import Icon from "../components/Icon";
import HabitInventory from "../components/HabitInventory";
import { useHabits } from "../context/HabitContext";

const Habits: React.FC = () => {
  const { habits, setHabits, addHabit, updateHabit, calculateStreak } =
    useHabits();
  const [isAddHabitOpen, setIsAddHabitOpen] = useState(false);
  const [isHabitInventoryOpen, setIsHabitInventoryOpen] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<
    "Early rise" | "Morning" | "Afternoon" | "Evening" | "AnyTime" | null
  >(null);
  const [selectedHabitId, setSelectedHabitId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editIcon, setEditIcon] = useState<string | null>(null);
  const [editTimeSlot, setEditTimeSlot] = useState<
    "Early rise" | "Morning" | "Afternoon" | "Evening" | "AnyTime" | null
  >(null);
  const selectedHabit: Habit | null =
    habits.find((h) => h.id === selectedHabitId) || null;
  const [isHabitDetailOpen, setIsHabitDetailOpen] = useState(false);
  const [isHabitJournalOpen, setIsHabitJournalOpen] = useState(false);
  const [selectedTimeTab, setSelectedTimeTab] = useState<string>("All");

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

  const getRandomColor = () => {
    return habitColors[Math.floor(Math.random() * habitColors.length)];
  };

  const timeSlots = [
    "Early rise",
    "Morning",
    "Afternoon",
    "Evening",
    "AnyTime",
  ] as const;

  const availableIcons = [
    "smartwatch",
    "shoes",
    "rock",
    "bike",
    "tshirt",
    "dj_mixer",
    "spray_can",
    "color_palette",
    "photo_camera",
    "pizza",
    "hat",
    "mobile_phone",
    "love",
    "crewneck",
    "guitar",
    "monitor",
    "basketball",
    "skateboard",
    "game_console",
    "tablet",
    "soda_can",
    "speaker",
    "selfie_stick",
    "tote_bag",
    "rollerskate",
    "notebook",
    "hoodie",
    "burger",
    "soft_drink",
    "sunglasses",
    "music_headphones",
    "online_shopping",
    "shorts",
    "graduation_hat",
    "book",
    "dress",
    "shopping_bag",
    "toast",
    "idea",
    "radio",
    "backpack",
    "shaka",
    "certificate",
    "earphones",
    "padlock",
    "school",
    "boy",
    "girl",
    "coffee_mug",
  ];

  const handleAddHabit = () => {
    setIsAddHabitOpen(true);
  };

  const handleCancel = () => {
    setIsAddHabitOpen(false);
    setNewHabitName("");
    setSelectedIcon(null);
    setSelectedTimeSlot(null);
  };

  const handleSave = () => {
    if (newHabitName && selectedIcon && selectedTimeSlot) {
      console.log("Saving habit with timeSlot:", selectedTimeSlot); // 调试
      addHabit({
        name: newHabitName,
        icon: selectedIcon,
        timeSlot: selectedTimeSlot,
        date: new Date().toISOString().split("T")[0],
      });
      setIsAddHabitOpen(false);
      setNewHabitName("");
      setSelectedIcon(null);
      setSelectedTimeSlot(null);
    }
  };

  const handleInventorySelect = (habit: { name: string; icon: string }) => {
    setNewHabitName(habit.name);
    setSelectedIcon(habit.icon);
    setIsHabitInventoryOpen(false);
  };

  return (
    <div className="pt-16 p-4 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">All Habits</h1>
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          onClick={handleAddHabit}
        >
          +
        </button>
      </div>
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {[
          "All",
          "Early Rise",
          "Morning",
          "Afternoon",
          "Evening",
          "AnyTime",
        ].map((tab) => (
          <button
            key={tab}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              selectedTimeTab === tab
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setSelectedTimeTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {habits
          .filter(
            (habit) =>
              selectedTimeTab === "All" ||
              habit.timeSlot.toLowerCase() === selectedTimeTab.toLowerCase()
          )
          .map((habit) => (
            <div
              key={habit.id}
              className="flex justify-between items-center p-3 rounded-md shadow-sm cursor-pointer"
              style={{ backgroundColor: getRandomColor() }}
              onClick={() => {
                setSelectedHabitId(habit.id);
                setIsHabitDetailOpen(true);
              }}
            >
              <div className="flex items-center">
                <Icon
                  name="alarmBell"
                  className="w-8 h-8 text-yellow-500 mr-2"
                />
                <Icon name={habit.icon} className="w-6 h-6 mr-2" />
                <span className="text-lg">{habit.name}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold">
                  Streak: {calculateStreak(habit)} days
                </div>
                <div className="text-xs text-gray-500">Streak days</div>
              </div>
            </div>
          ))}
      </div>
      <div className="mt-6 text-center">
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          onClick={handleAddHabit}
        >
          + Add a new DIY habit
        </button>
      </div>

      {isAddHabitOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAddHabitOpen(false);
          }}
        >
          <div className="bg-white rounded-lg shadow-2xl w-[50vw] min-w-[300px] max-h-[80vh] p-6 flex flex-col overflow-y-auto">
            <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
            <div className="mb-4">
              <p className="text-lg font-medium">Name this habit:</p>
              <div className="flex items-center mt-2">
                <input
                  type="text"
                  placeholder="Enter habit name"
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  className="ml-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                  onClick={() => setIsHabitInventoryOpen(true)}
                >
                  Habit Inventory
                </button>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-lg font-medium">
                Choose an icon for your habit:
              </p>
              <div className="grid grid-cols-5 gap-2 mt-2">
                {availableIcons.map((icon) => (
                  <div
                    key={icon}
                    className={`p-2 flex justify-center items-center border rounded-md cursor-pointer transition-all ${
                      selectedIcon === icon
                        ? "border-2 border-blue-500 shadow-md"
                        : "border-gray-300"
                    }`}
                    onClick={() =>
                      setSelectedIcon(selectedIcon === icon ? null : icon)
                    }
                  >
                    <Icon name={icon} className="w-6 h-6" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-lg font-medium">
                Choose a time to do this habit:
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      selectedTimeSlot === slot
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => setSelectedTimeSlot(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {isHabitDetailOpen && selectedHabit && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsHabitDetailOpen(false);
          }}
        >
          <div className="bg-white rounded-lg shadow-2xl w-[50vw] min-w-[300px] p-6 flex flex-col">
            {!isEditing ? (
              <>
                <div className="flex justify-between mb-4">
                  <span className="text-lg font-medium">Name:</span>
                  <span className="text-lg">{selectedHabit.name}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-lg font-medium">Icon:</span>
                  <Icon name={selectedHabit.icon} className="w-6 h-6" />
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-lg font-medium">Time:</span>
                  <span className="text-lg">{selectedHabit.timeSlot}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-lg font-medium">Streak days:</span>
                  <span className="text-lg">
                    {calculateStreak(selectedHabit)} days (Ever Most:{" "}
                    {calculateStreak(selectedHabit)} days)
                  </span>
                </div>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors mb-4"
                  onClick={() => setIsHabitJournalOpen(true)} // 打开 All Journal 弹窗
                >
                  Check All Journals
                </button>
                <div className="flex justify-between">
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                    onClick={() => {
                      setIsEditing(true);
                      setEditName(selectedHabit.name);
                      setEditIcon(selectedHabit.icon);
                      setEditTimeSlot(selectedHabit.timeSlot);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    onClick={() => {
                      setHabits(
                        habits.filter((h) => h.id !== selectedHabit.id)
                      );
                      setIsHabitDetailOpen(false); // 删除后关闭弹窗
                    }}
                  >
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <div className="max-h-[60vh] overflow-y-auto">
                <div className="mb-4">
                  <span className="text-lg font-medium">Name:</span>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
                  />
                </div>
                <div className="mb-4">
                  <span className="text-lg font-medium">Icon:</span>
                  <div className="grid grid-cols-5 gap-2 mt-1">
                    {availableIcons.map((icon) => (
                      <div
                        key={icon}
                        className={`p-2 flex justify-center items-center border rounded-md cursor-pointer transition-all ${
                          editIcon === icon
                            ? "border-2 border-blue-500 shadow-md"
                            : "border-gray-300"
                        }`}
                        onClick={() => setEditIcon(icon)}
                      >
                        <Icon name={icon} className="w-6 h-6" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <span className="text-lg font-medium">Time:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        className={`px-4 py-2 rounded-md transition-colors ${
                          editTimeSlot === slot
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                        onClick={() => setEditTimeSlot(slot)}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    onClick={() => {
                      if (
                        editName &&
                        editIcon &&
                        editTimeSlot &&
                        selectedHabit
                      ) {
                        updateHabit(selectedHabit.id, {
                          name: editName,
                          icon: editIcon,
                          timeSlot: editTimeSlot,
                        });
                        setIsEditing(false);
                      }
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {isHabitJournalOpen && selectedHabit && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsHabitJournalOpen(false);
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
              onClick={() => setIsHabitJournalOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <HabitInventory
        isOpen={isHabitInventoryOpen}
        onClose={() => setIsHabitInventoryOpen(false)}
        onSelect={handleInventorySelect}
      />
    </div>
  );
};

export default Habits;
