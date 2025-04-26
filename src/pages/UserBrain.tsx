import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../components/Card";
import { Sidebar } from "../components/Sidebar";

const UserBrain = () => {
  const [contents, setContents] = useState([]);

  const { hash } = useParams<{ hash: string }>();
  console.log(hash); // This will log the hash from the URL

  useEffect(
    function () {
      async function getAllData() {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/brain/${hash}`
        );
        console.log(response);
        setContents(response.data.content);
      }
      getAllData();
    },
    [hash]
  );

  return (
    <div>
      <div>
        <Sidebar
          contentType="defaultType"
          setContentType={(type: string) =>
            console.log("Content type set to:", type)
          }
        />
      </div>

      <div className="ml-[280px] max-sm:ml-0 px-3 grid grid-cols-3 max-md:grid-cols-1 gap-6 pt-6 mt-6">
        {contents.map(({ type, link, title, _id }) => (
          <Card
            type={type}
            link={link}
            title={title}
            contentId={_id}
            key={_id}
            refresh={() => {
              console.log("Refresh function called");
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default UserBrain;
