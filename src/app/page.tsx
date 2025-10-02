import TestUploadImage from "@/components/tests/TestUploadImage";
import React from "react";

const HomePage = async () => {
  return (
    <React.Fragment>
      <main>
        <h3 className="text-2xl text-red-500">Home Page</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
          quisquam, veniam cum rem tempore ad est delectus cumque nemo harum
          praesentium perspiciatis quibusdam et, laudantium labore alias culpa
          eaque totam.
        </p>

        <TestUploadImage />
      </main>
    </React.Fragment>
  );
};

export default HomePage;
