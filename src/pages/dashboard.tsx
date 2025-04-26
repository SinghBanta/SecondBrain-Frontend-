import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { LogoutIcon } from "../icons/LogoutIcon";
import { Logo } from "../icons/Logo";
import Filter from "../components/Filter";

export function Dashboard() {
  const [modalOpen, setModalopen] = useState(false);
  const { contents, refresh } = useContent();
  const [contentType, setContentType] = useState("");
  const [filteredContent, setFilteredContent] = useState(contents);
  const navigate = useNavigate();

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

  if (localStorage.getItem("token") === null) {
    window.location.href = "/signin";
    return;
  }

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

        <div className="flex justify-between gap-4 w-full mt-3.5 ">
          <div className=" max-sm:hidden font-medium text-2xl flex items-center text-nowrap w-full">
            All Notes
          </div>
          <div className="flex justify-between max-sm:w-full">
            <div className=" sm:hidden pr-2">
              <Logo />
            </div>

            {/* buttons */}
            <div className="flex gap-2">
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
                  const shareUrl = `${
                    import.meta.env.VITE_FRONTEND_URL
                  }/share/${response.data.hash}`;
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
                  navigate("/signin");
                  toast.success("Logged out successfully!");
                }}
                variant="primary"
                text="Logout"
                startIcon={<LogoutIcon />}
                fullWidth
              />
            </div>
          </div>
        </div>

        <div className="sm:hidden mt-10 ">
          <Filter contentType={contentType} setContentType={setContentType} />
        </div>

        <div className=" grid grid-cols-3 max-md:grid-cols-1 gap-6 pt-6 mt-6 max-sm:mt-0">
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
      </div>
    </div>
  );
}
