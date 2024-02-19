import { useObserver } from "mobx-react";
import React, { useEffect, useMemo } from "react";


const Page = ({ children, notification }) => {



  return useObserver(() => (
    <div className="h-auto w-full scroll-smooth flex flex-col min-h-screen bg-[#071320] relative text-[#fff]">
    
        {children}
    </div>
  ));
};
export default Page;
