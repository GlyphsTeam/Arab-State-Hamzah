import React from "react";
import HeroNav from "../components/common/HeroNav";
import LookingFor from "../components/common/lookingFor/LookingFor";
import useAxios from "../hooks/useAxiosGet";

function JobPage() {
  const url = `jobs/web/looking_for`;
  const [Data] = useAxios(url);
  const lookingForData = Data?.data;

  return (
    <div>
      <HeroNav
        mainData={lookingForData?.slider}
        subData={lookingForData?.slider?.model}
      />
      <LookingFor data={lookingForData} pageType='job' />
    </div>
  );
}

export default JobPage;
