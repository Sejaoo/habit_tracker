import React, { useState, useEffect } from "react";
import HabitInventory from "../components/HabitInventory";
import { useHabits } from "../context/HabitContext";

const More: React.FC = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<string>(() => {
    return localStorage.getItem("selectedAvatar") || "/habit_tracker/avatars/001-boy.png";
  });
  const [nickname, setNickname] = useState(() => {
    return localStorage.getItem("nickname") || "";
  });
  const [isHabitInventoryOpen, setIsHabitInventoryOpen] = useState(false);
  const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSituationOpen, setIsSituationOpen] = useState(false);
  const { habits } = useHabits();

  useEffect(() => {
    localStorage.setItem("selectedAvatar", selectedAvatar);
    localStorage.setItem("nickname", nickname);
  }, [selectedAvatar, nickname]);

  const avatarOptions = [
    "/habit_tracker/avatars/001-boy.png",
    "/habit_tracker/avatars/002-girl.png",
    "/habit_tracker/avatars/003-boy.png",
    "/habit_tracker/avatars/004-girl.png",
    "/habit_tracker/avatars/005-boy.png",
    "/habit_tracker/avatars/006-girl.png",
    "/habit_tracker/avatars/007-boy.png",
    "/habit_tracker/avatars/008-girl.png",
    "/habit_tracker/avatars/009-boy.png",
    "/habit_tracker/avatars/010-girl.png",
    "/habit_tracker/avatars/011-boy.png",
    "/habit_tracker/avatars/012-girl.png",
    "/habit_tracker/avatars/013-girl.png",
    "/habit_tracker/avatars/014-boy.png",
    "/habit_tracker/avatars/015-girl.png",
    "/habit_tracker/avatars/016-boy.png",
    "/habit_tracker/avatars/017-girl.png",
    "/habit_tracker/avatars/018-girl.png",
    "/habit_tracker/avatars/019-girl.png",
    "/habit_tracker/avatars/020-boy.png",
    "/habit_tracker/avatars/021-girl.png",
    "/habit_tracker/avatars/022-boy.png",
    "/habit_tracker/avatars/023-boy.png",
    "/habit_tracker/avatars/024-girl.png",
    "/habit_tracker/avatars/025-girl.png",
    "/habit_tracker/avatars/026-boy.png",
    "/habit_tracker/avatars/027-girl.png",
    "/habit_tracker/avatars/028-boy.png",
    "/habit_tracker/avatars/029-girl.png",
    "/habit_tracker/avatars/030-girl.png",
  ];

  return (
    <div className="pt-16 p-4 max-w-2xl mx-auto">
      <div className="text-center mt-8 mb-6">
        <div className="relative inline-block">
          <img
            src={selectedAvatar}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4 cursor-pointer"
            onClick={() => setIsAvatarPickerOpen(!isAvatarPickerOpen)}
          />
          {isAvatarPickerOpen && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <div className="grid grid-cols-3 gap-2 p-2">
                {avatarOptions.map((avatar, index) => (
                  <img
                    key={index}
                    src={avatar}
                    alt={`Avatar ${index}`}
                    className="w-16 h-16 rounded-full cursor-pointer hover:opacity-75"
                    onClick={() => {
                      setSelectedAvatar(avatar);
                      setIsAvatarPickerOpen(false);
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Enter your nickname"
          className="w-64 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-center mx-auto block"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          "Habit Alarm",
          "Contact Us",
          "Data Backup",
          "Habit Situation",
          "Habit Inventory",
          "Help",
          "Advanced Settings",
          "Habits Tracker Plus",
        ].map((item) => (
          <button
            key={item}
            className={`p-3 rounded-md shadow-sm text-center ${
              [
                "Habit Alarm",
                "Data Backup",
                "Advanced Settings",
                "Habits Tracker Plus",
              ].includes(item)
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-100 hover:bg-gray-200 text-gray-800"
            }`}
            onClick={
              item === "Habit Inventory"
                ? () => setIsHabitInventoryOpen(true)
                : item === "Contact Us" || item === "Help"
                ? () => setIsContactOpen(true)
                : item === "Habit Situation"
                ? () => setIsSituationOpen(true)
                : undefined
            }
            disabled={[
              "Habit Alarm",
              "Data Backup",
              "Advanced Settings",
              "Habits Tracker Plus",
            ].includes(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <HabitInventory
        isOpen={isHabitInventoryOpen}
        onClose={() => setIsHabitInventoryOpen(false)}
      />

      {isContactOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsContactOpen(false);
          }}
        >
          <div className="bg-white rounded-lg shadow-2xl w-[40vw] min-w-[250px] p-6 flex flex-col items-center">
            <p className="text-lg font-medium text-gray-800 text-center">
              Creator contact information: seanrowe0904@gmail.com
            </p>
            <button
              className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              onClick={() => setIsContactOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isSituationOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsSituationOpen(false);
          }}
        >
          <div className="bg-white rounded-lg shadow-2xl w-[50vw] min-w-[300px] p-6 flex flex-col items-center">
            <p className="text-xl font-medium text-gray-800 text-center mb-2">
              Hope u have a good time with our website, {nickname || "user"}!
            </p>
            <p className="text-lg text-gray-700 text-center mb-2">
              You've been using our website for{" "}
              {habits.length > 0
                ? Math.floor(
                    (new Date().getTime() -
                      new Date(habits[0].date).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )
                : 0}{" "}
              days!
            </p>
            <p className="text-lg text-gray-700 text-center mb-2">
              You've put effort into {habits.length} habits!
            </p>
            <p className="text-base italic text-gray-600 text-center">
              "The best way to predict the future is to create it." – Abraham
              Lincoln
            </p>
            <button
              className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              onClick={() => setIsSituationOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default More;
