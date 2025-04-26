import { AllNotesIcon } from "../icons/AllNotesIcon";
import { InstagramIcon } from "../icons/InstagramIcon";
import { LinkdInIcon } from "../icons/LinkdInIcon";
import { Logo } from "../icons/Logo";
import { TextNotes } from "../icons/TextNotes";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar({
  contentType,
  setContentType,
}: {
  contentType: string;
  setContentType: (type: string) => void;
}) {
  return (
    <div className="max-sm:hidden h-screen bg-white border-r w-64 fixed border-gray-200 left-0 top-0 pl-6 ">
      <div className="flex text-2xl items-center pt-8">
        <div className="pr-2">
          <Logo />
        </div>
        <div className="font-medium text-2xl">SecondBrain</div>
      </div>
      <div className="pt-8 pl-4 ">
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
          className={`max-w-44 rounded-full ${
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

        <div
          onClick={() => setContentType("textnote")}
          className={`max-w-44 rounded-full ${
            contentType === "textnote" && "bg-gray-200"
          }`}
        >
          <SidebarItem text="Text Note" icon={<TextNotes />} />
        </div>
      </div>
    </div>
  );
}
