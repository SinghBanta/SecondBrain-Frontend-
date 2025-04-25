import axios from "axios";
import { DeleteIcon } from "../icons/DeleteIcon";
import { NotesIcon } from "../icons/NotesIcon";
import Copy from "../icons/Copy";
import { useState } from "react";
import Tick from "../icons/Tick";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "instagram" | "linkedin";
  contentId: string;
  refresh: () => void;
}

export function Card({ title, link, type, contentId, refresh }: CardProps) {
  const [copied, setCopied] = useState(false);

  // const [value, setValue] = useState(false);

  const extractYouTubeID = (url: string) => {
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  async function handleDelete() {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/content`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      data: {
        contentId,
      },
    });

    // window.location.reload();
    refresh();
  }

  function handleCopy() {
    // copy link to clipboard
    navigator.clipboard.writeText(link);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div>
      <div className="p-4 bg-white rounded-md border-gray-200 border min-w-96 min-h-64 mr-3">
        <div className="flex justify-between ">
          <div className="flex items-center text-md">
            <div className="text-gray-500 pr-2">{/* <ShareIcon /> */}</div>
            <div className="mr-2">
              <NotesIcon />
            </div>

            {title}
          </div>
          <div className="flex">
            <div className="pr-2 text-gray-500">
              <button onClick={handleCopy} className="cursor-pointer ml-1">
                {copied ? <Tick /> : <Copy />}
              </button>
            </div>
            <div className="text-gray-500">
              <button onClick={handleDelete} className="cursor-pointer ml-1">
                <DeleteIcon />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-4 h-72 overflow-y-auto mt-2">
          {type === "youtube" && (
            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${extractYouTubeID(link)}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
          {type == "twitter" && (
            <blockquote className="twitter-tweet">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}
          {type == "instagram" && (
            <div>
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={link}
                data-instgrm-version="14"
              ></blockquote>
              <script async src="//www.instagram.com/embed.js"></script>
              <a href={link}></a>
            </div>
          )}
          {type == "linkedin" && (
            <iframe
              className="w-full h-full rounded-xl"
              src={link}
              title="LinkedIn post"
              frameBorder="0"
              allow="clipboard-write; encrypted-media; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
}
