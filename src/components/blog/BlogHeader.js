import React from "react";
import HeroBanner from "../common/banner/HeroBanner";
function BlogHeader({data}) {
  return (
    <>
    <HeroBanner data={data}/>
    </>
  );
}
export default BlogHeader;