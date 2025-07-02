import React, { useEffect, useState } from "react";
import axios from "axios";

const Checkroute = ({ children }) => {
  const [role, setRole] = useState(null);

  async function handleRole() {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/users/check-role",
        {},
        { withCredentials: true }
      );
      console.log(res.data);
      setRole(res.data.role);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleRole();
  }, []);

  if (!role) return <p>Loading...</p>;

  const childrenWithRole = React.Children.map(children, (child) =>
    React.isValidElement(child) ? React.cloneElement(child, { role }) : child
  );

  return <>{childrenWithRole}</>;
};

export default Checkroute;
