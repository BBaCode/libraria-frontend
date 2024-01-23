import React from "react";

function SignupRedirect({ currentPage }: { currentPage: string }) {
  return (
    <div className="mx-auto container text-center pt-20 bg-white">
      <div>Must be logged in to view {currentPage}!</div>
      <div>Please Login or Signup!</div>
    </div>
  );
}

export default SignupRedirect;
