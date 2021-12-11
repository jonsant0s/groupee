import { useState, useEffect } from "react";
import { getUserPage } from "../../services";

export const UserPage = () => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    getUserPage()
    .then((response) => {
        console.log(response.data);
        setContent(response.data);
    })
    .catch((error) => {
        setContent(error.toString());
    });
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};