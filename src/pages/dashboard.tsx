import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";

export function Dashboard() {
  const [modalOpen, setModalopen] = useState(false);
  const { contents, refresh } = useContent();
  const [contentType, setContentType] = useState("");
  const [filteredContent, setFilteredContent] = useState(contents);

  useEffect(() => {
    setFilteredContent(contents);
  }, [contents]);

  useEffect(() => {
    if (contentType === "") {
      setFilteredContent(contents);
    }

    if (contentType === "twitter") {
      const twitter_content = contents.filter(
        // @ts-expect-error something
        (eachContent) => eachContent.type === "twitter"
      );
      setFilteredContent(twitter_content);
    }

    if (contentType === "youtube") {
      const youtube_content = contents.filter(
        // @ts-expect-error something
        (eachContent) => eachContent.type === "youtube"
      );
      setFilteredContent(youtube_content);
    }

    if (contentType === "linkedin") {
      const linkedin_content = contents.filter(
        // @ts-expect-error something
        (eachContent) => eachContent.type === "linkedin"
      );
      setFilteredContent(linkedin_content);
    }

    if (contentType === "instagram") {
      const instagram_content = contents.filter(
        // @ts-expect-error something
        (eachContent) => eachContent.type === "instagram"
      );
      setFilteredContent(instagram_content);
    }
  }, [contentType, contents]);

  return (
    <div>
      <div className="max-md:hidden">
        <Sidebar contentType={contentType} setContentType={setContentType} />
      </div>

      <div className="p-4 md:ml-64  min-h-screen bg-gray-100 ">
        <CreateContentModal
          open={modalOpen}
          onClose={() => {
            setModalopen(false);
          }}
          refresh={refresh}
        />
        <div className="flex justify-end gap-4 w-full mt-3.5">
          <div className="mr-160 font-medium text-2xl flex items-center text-nowrap">
            All Notes
          </div>

          <Button
            onClick={() => {
              setModalopen(true);
            }}
            variant="primary"
            text="Add Content"
            startIcon={<PlusIcon />}
            fullWidth
          ></Button>
          <Button
            onClick={async () => {
              const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/brain/share`,
                {
                  share: true,
                },
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }
              );
              const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
              alert(shareUrl); // Optional: Handle the share URL
            }}
            variant="secondary"
            text="Share Brain"
            startIcon={<ShareIcon />}
            fullWidth
          />
          <Button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/signin";
            }}
            variant="primary"
            text="Logout"
            fullWidth
          />
        </div>
        {
          <div className=" grid grid-cols-3 max-md:grid-cols-1 gap-6 pt-6 mt-6">
            {filteredContent.map(({ type, link, title, _id }) => (
              <Card
                type={type}
                link={link}
                title={title}
                contentId={_id}
                key={_id}
                refresh={refresh}
              />
            ))}
          </div>
        }
      </div>
    </div>
  );
}
