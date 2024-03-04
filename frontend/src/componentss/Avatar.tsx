function Avatar({ name, size }: { name: string; size: string }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${
        size === "big" ? "w-10 h-10" : "w-6 h-6"
      } overflow-hidden bg-gray-500 rounded-full dark:bg-gray-600`}
    >
      <span
        className={`font-medium ${
          size == "big" ? "text-2xl" : ""
        } text-gray-900 dark:text-gray-300`}
      >
        {name[0].toUpperCase()}
      </span>
    </div>
  );
}
export default Avatar;
