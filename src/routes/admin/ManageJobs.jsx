import React from "react";
import AssignmentTable from "../../components/AssignmentTable";
import { useUser } from "../../app/rtkHooks/useUser";
import ManageAssignment from "./manageAssignments";

const ManageTutors = () => {
  // user from state --- important with redirects
  // console.log("use-x", user);
    const user = useUser();
  return (
    <div>
      <ManageAssignment/>
      {/* <AssignmentTable authUser={false} isEditTask={true} /> */}
    </div>
  );
};

export default ManageTutors;
