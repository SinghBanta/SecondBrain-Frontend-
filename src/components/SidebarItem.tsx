import { ReactElement } from "react";

export function SidebarItem({
  text,
  icon,
}: {
  text: string;
  icon: ReactElement;
}) {
  return (
    <div className="flex text-gray-700 py-2 cursor-pointer max-sm:bg-gray-200 sm:hover:bg-gray-200 rounded-full w-full pl-2">
      <div className="pr-2 flex items-center">{icon}</div>
      <div className="pr-2 text-nowrap">{text}</div>
    </div>
  );
}
