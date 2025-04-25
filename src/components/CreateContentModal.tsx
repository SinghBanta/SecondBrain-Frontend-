// import { useState } from "react";
import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";

interface CreateContentType {
  open: boolean;
  onClose: () => void;
  refresh: () => void;
}

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
  LinkedIn = "linkedin",
  Instagram = "instagram",
}
export function CreateContentModal({
  open,
  onClose,
  refresh,
}: CreateContentType) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    console.log(link);
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/content`,
      {
        title,
        link,
        type,
      },
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );

    onClose();
    refresh();
  }

  return (
    <div>
      {open && (
        <div>
          <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0  flex justify-center opacity-60"></div>
          <div className="w-screen h-screen  fixed  left-0  flex justify-center">
            <div className="flex flex-col justify-center">
              <span className="bg-white opacity-100 p-4 max-w-80">
                <div className="flex justify-end">
                  <div onClick={onClose} className="cursor-pointer">
                    <CrossIcon />
                  </div>
                </div>
                <div>
                  <Input ref={titleRef} placeholder="Title..." />
                  <Input ref={linkRef} placeholder=" Link..." />
                </div>
                <div>
                  <div className="grid grid-cols-2 gap-2 p-5 justify-center pb-2">
                    <div className="grid grid-cols-2 gap-2 w-60">
                      <Button
                        text="Youtube"
                        variant={
                          type === ContentType.Youtube ? "primary" : "secondary"
                        }
                        onClick={() => {
                          setType(ContentType.Youtube);
                        }}
                      ></Button>
                      <Button
                        text="Twitter"
                        variant={
                          type === ContentType.Twitter ? "primary" : "secondary"
                        }
                        onClick={() => {
                          setType(ContentType.Twitter);
                        }}
                      ></Button>
                      <Button
                        text="Instagram"
                        variant={
                          type === ContentType.Instagram
                            ? "primary"
                            : "secondary"
                        }
                        onClick={() => {
                          setType(ContentType.Instagram);
                        }}
                      ></Button>
                      <Button
                        text="LinkedIn"
                        variant={
                          type === ContentType.LinkedIn
                            ? "primary"
                            : "secondary"
                        }
                        onClick={() => {
                          setType(ContentType.LinkedIn);
                        }}
                      ></Button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button
                    onClick={addContent}
                    variant="primary"
                    text="Submit"
                  ></Button>
                </div>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
