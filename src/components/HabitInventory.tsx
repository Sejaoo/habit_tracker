import React from "react";
import Icon from "./Icon";

interface HabitInventoryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (habit: { name: string; icon: string }) => void; // 可选回调，用于选择习惯
}

const HabitInventory: React.FC<HabitInventoryProps> = ({ isOpen, onClose, onSelect }) => {
  const habits = [
    { name: "Sleep on time", icon: "smartwatch" },
    { name: "Drink water", icon: "soft_drink" },
    { name: "Brush teeth", icon: "idea" },
    { name: "Meditate", icon: "shaka" },
    { name: "Morning exercise", icon: "shoes" },
    { name: "Don't judge others", icon: "love" },
    { name: "Wake up early", icon: "smartwatch" },
    { name: "Eat fruits and veggies", icon: "pizza" },
    { name: "Read news", icon: "mobile_phone" },
    { name: "Skincare", icon: "dress" },
    { name: "Drink milk", icon: "soft_drink" },
    { name: "Drink juice", icon: "soft_drink" },
    { name: "Read", icon: "book" },
    { name: "Drink less coffee", icon: "coffee_mug" },
    { name: "Afternoon tea", icon: "coffee_mug" },
    { name: "Keep accounts", icon: "online_shopping" },
    { name: "Protect the environment", icon: "tote_bag" },
    { name: "Loving breakfast", icon: "toast" },
    { name: "Check in on time", icon: "smartwatch" },
    { name: "Help others", icon: "love" },
    { name: "Bandage wounds", icon: "idea" },
    { name: "Play ball sports", icon: "basketball" },
    { name: "Write", icon: "notebook" },
    { name: "Take medicine", icon: "idea" },
    { name: "Surf", icon: "shaka" },
    { name: "Fish", icon: "shaka" },
    { name: "Write copy", icon: "notebook" },
    { name: "Apply a Band-Aid", icon: "idea" },
  ];

  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleCloseModal}
    >
      <div className="bg-white rounded-lg shadow-lg w-[75vw] min-w-[calc(100%/3-1rem)] h-[80vh] relative">
        <div className="bg-blue-500 text-white p-4 rounded-t-lg text-center">
          <h2 className="text-2xl font-bold">Habit Inventory</h2>
          <p className="text-sm">You can choose habits that suit you</p>
        </div>
        <div className="p-4 overflow-y-auto h-[calc(80vh-80px)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {habits.map((habit, index) => (
              <div
                key={index}
                className="flex items-center p-2 bg-gray-100 rounded-md shadow-sm cursor-pointer hover:bg-gray-200"
                onClick={() => onSelect && onSelect(habit)}
              >
                <Icon name={habit.icon} className="w-6 h-6 mr-2" />
                <span className="text-sm">{habit.name}</span>
              </div>
            ))}
          </div>
        </div>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default HabitInventory;