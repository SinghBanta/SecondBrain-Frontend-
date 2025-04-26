import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { toast } from "react-toastify";

interface CreateContentType {
  open: boolean;
  onClose: () => void;
  refresh: () => void;
}

enum ContentType {
  TextNote = "textnote",
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
  const [textNote, setTextNote] = useState(false);
  const noteRef = useRef<HTMLTextAreaElement>(null);

  async function addContent() {
    const title = titleRef.current?.value;

    let link;
    if (textNote) {
      link = noteRef.current?.value;
    } else link = linkRef.current?.value;

    console.log(link);
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/content`,
      {
        title,
        link,
        type: textNote ? "textnote" : type,
      },
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );

    onClose();
    refresh();
    toast.success("Content added successfully!");
  }

  return (
    <div>
      {open && (
        <div>
          <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0  flex justify-center opacity-60"></div>
          <div className="w-screen h-screen  fixed  left-0  flex justify-center">
            <div className="flex flex-col justify-center w-sm px-2">
              <div className="bg-white opacity-100 p-4 w-full">
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="textNote"
                    className="text-gray-500 text-sm font-medium flex items-center cursor-pointer"
                  >
                    <input
                      checked={textNote}
                      name="textNote"
                      id="textNote"
                      type="checkbox"
                      className="mr-2"
                      onChange={() => {
                        setTextNote(!textNote);
                      }}
                    />
                    Quick Note
                  </label>
                  <div onClick={onClose} className="cursor-pointer">
                    <CrossIcon />
                  </div>
                </div>

                <div>
                  <Input ref={titleRef} placeholder="Title..." />
                  {!textNote && <Input ref={linkRef} placeholder=" Link..." />}
                </div>

                {!textNote ? (
                  <div>
                    <div className=" gap-2 justify-center pb-2 w-full">
                      <div className="grid grid-cols-2 gap-2 w-full">
                        <Button
                          text="Youtube"
                          variant={
                            type === ContentType.Youtube
                              ? "primary"
                              : "secondary"
                          }
                          onClick={() => {
                            setType(ContentType.Youtube);
                          }}
                          fullWidth
                        ></Button>
                        <Button
                          text="Twitter"
                          variant={
                            type === ContentType.Twitter
                              ? "primary"
                              : "secondary"
                          }
                          fullWidth
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
                          fullWidth
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
                          fullWidth
                          onClick={() => {
                            setType(ContentType.LinkedIn);
                          }}
                        ></Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <textarea
                    className="w-full h-32 p-2 mt-4 border border-gray-300 rounded-md"
                    placeholder="Write your note here..."
                    ref={noteRef}
                  />
                )}

                <div className="flex justify-center w-full">
                  <Button
                    onClick={addContent}
                    variant="primary"
                    text="Submit"
                    fullWidth
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
