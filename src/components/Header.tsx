import {
  MagnifyingGlassIcon,
  BellIcon,
  CalendarDaysIcon,
  Bars3Icon,
} from "@heroicons/react/16/solid";
interface HeaderProps {
  onMenuClick: () => void;
}
export default function Header({ onMenuClick }: HeaderProps) {
  // 2. Get the current day index (0-6)
  const today = new Date();
  const curDay = today.toLocaleDateString("en-US", { weekday: "long" });
  const formattedDate = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return (
    <header className="bg-slate-100">
      <div className="flex flex-col md:flex-row w-full items-center justify-between px-4 py-3 gap-3 shadow-xl sm:px-6 lg:px-12">
        {/* LOGO SECTION */}
        <div className="w-full md:w-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-gray-700 shadow-sm lg:hidden"
              onClick={onMenuClick}
              aria-label="Open menu"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
            <h1 className="text-2xl md:text-2xl font-bold text-black">
              <span className="text-todo-primary">To-</span>Do
            </h1>
          </div>
        </div>

        {/* SEARCH BAR SECTION */}
        <div className="w-full md:w-auto flex flex-row items-center justify-center">
          <div className="relative flex items-center w-full md:w-auto">
            <input
              name="searchBar"
              type="text"
              className="w-full md:min-w-lg rounded-lg outline-none px-3 bg-white text-sm md:text-base border border-gray-200 focus:border-blue-300 transition-colors placeholder:italic placeholder:text-xs"
              placeholder="Search Here"
            />
            <span className="absolute right-0 bg-todo-primary w-6 h-6 rounded-r-md flex items-center justify-center cursor-pointer">
              <MagnifyingGlassIcon className="w-5 h-5 text-white" />
            </span>
          </div>
        </div>

        {/* ACTIONS & DATE SECTION */}
        <div className="w-full md:w-auto flex flex-row items-center justify-between md:justify-end gap-4">
          <div className="flex flex-row gap-2">
            <span className="bg-todo-primary w-7 h-7 rounded-md flex items-center justify-center shadow-sm">
              <BellIcon className="w-4 h-4 text-white" />
            </span>
            <span className="bg-todo-primary w-7 h-7 rounded-md flex items-center justify-center shadow-sm">
              <CalendarDaysIcon className="w-4 h-4 text-white" />
            </span>
          </div>

          <div className="flex flex-col text-xs text-right">
            <span className="font-medium">{curDay}</span>
            <span className="text-todo-sky">{formattedDate}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
