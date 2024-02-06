import React from "react";

function SignupRedirect({ currentPage }: { currentPage: string }) {
  return (
    <div className="mx-auto container text-center py-10 bg-white text-black max-w-sm mt-10 align-middle">
      <div>Must be logged in to view {currentPage}!</div>
      <div>Please Login or Signup!</div>
    </div>
  );
}

export default SignupRedirect;
