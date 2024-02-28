import React from "react";
import AssignmentTable from "../../components/AssignmentTable";

const ManageTutors = () => {
  return (
    <div>
      
      <AssignmentTable authUser={false}  isEditTask={true}/>
    </div>
  );
};

export default ManageTutors;
