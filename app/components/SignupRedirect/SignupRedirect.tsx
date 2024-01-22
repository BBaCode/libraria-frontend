import React from "react";

function SignupRedirect({ currentPage }: { currentPage: string }) {
  return (
    <div className="mx-auto container text-center pt-20">
      <div>Must be logged in to view {currentPage}!</div>
      <div>Please Login or Signup!</div>
    </div>
  );
}

export default SignupRedirect;
