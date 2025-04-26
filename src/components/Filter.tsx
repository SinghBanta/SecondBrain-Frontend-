import { AllNotesIcon } from "../icons/AllNotesIcon";
import { InstagramIcon } from "../icons/InstagramIcon";
import { LinkdInIcon } from "../icons/LinkdInIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

const Filter = ({
  contentType,
  setContentType,
}: {
  contentType: string;
  setContentType: (type: string) => void;
}) => {
  return (
    <div className="flex gap-2 overflow-x-auto overflow-hidden scrollbar-hidden">
      <div
        onClick={() => setContentType("")}
        className={`max-w-44 rounded-full ${
          contentType === "" && "bg-gray-200"
        }`}
      >
        <SidebarItem text="All Notes" icon={<AllNotesIcon />} />
      </div>

      <div
        onClick={() => setContentType("twitter")}
        className={`max-w-44 rounded-full ${
          contentType === "twitter" && "bg-gray-200"
        }`}
      >
        <SidebarItem text="Twitter" icon={<TwitterIcon />} />
      </div>

      <div
        onClick={() => setContentType("youtube")}
        className={`max-w-44 rounded-full  ${
          contentType === "youtube" && "bg-gray-200"
        }`}
      >
        <SidebarItem text="Youtube" icon={<YoutubeIcon />} />
      </div>

      <div
        onClick={() => setContentType("linkedin")}
        className={`max-w-44 rounded-full ${
          contentType === "linkedin" && "bg-gray-200"
        }`}
      >
        <SidebarItem text="LinkedIn" icon={<LinkdInIcon />} />
      </div>

      <div
        onClick={() => setContentType("instagram")}
        className={`max-w-44 rounded-full ${
          contentType === "instagram" && "bg-gray-200"
        }`}
      >
        <SidebarItem text="Instagram" icon={<InstagramIcon />} />
      </div>
    </div>
  );
};

export default Filter;
