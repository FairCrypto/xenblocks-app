import { ReactNode } from "react";
import Image from "next/image";

export function Section({
  children,
  title,
  backgroundColor,
  backgroundImage,
  padding = true,
}: {
  children: ReactNode;
  title?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  padding?: boolean;
}) {
  return (
    <div
      className={`flex flex-content justify-center my-0 ${padding ?? "py-8 sm:py-10"} w-full mx-0 ${backgroundColor} fade-in-animation`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="card mx-2 sm:mx-8 lg:mx-2 w-full max-w-screen-xl">
        <div className="card-body px-3 sm:px-6 py-6 sm:py-8">
          {title && (
            <div className="card-title mb-6">
              <h2 className="text-2xl text-accent">{title}</h2>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
