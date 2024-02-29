import React from "react";
import AssignmentTable from "../../components/AssignmentTable";
import { useUser } from "../../app/rtkHooks/useUser";

const ManageTutors = () => {
  // user from state --- important with redirects
  // console.log("use-x", user);
    const user = useUser();
  return (
    <div>
      <AssignmentTable authUser={false} isEditTask={true} />
    </div>
  );
};

export default ManageTutors;
