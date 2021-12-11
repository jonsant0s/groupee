import React, { useState, useEffect } from "react";

import { getUserPage } from "../../services/UserService";

const UserPage: React.FC = () => {
    const [content, setContent] = useState<string>("");

  useEffect(() => {
    getUserPage().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default UserPage;