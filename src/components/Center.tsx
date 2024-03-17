import React from "react";

const Center = ({ children }: { children: React.ReactNode }) => {
    return <div className="min-h-[calc(100vh-200px)] w-full flex items-center justify-center">{children}</div>;
};

export default Center;
