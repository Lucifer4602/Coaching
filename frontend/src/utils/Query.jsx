import React from "react";
import { Navbar } from "./Navbar";
import { Card1 } from "./ProfileComp/Card1";

export const Query = () => {
  const query = window.location.pathname;
  const x = query.slice(1, query.length);
  const y = x.replace("%20", " ");

  // Determine background gradient and text color based on condition
  const bgGradientClass = "from-gray-900 to-black";
  const textColorClass = "text-white";
  const separatorColorClass = "border-white";
  const highlightColorClass = "text-yellow-600";

  return (
    <div
      className={`w-full mx-auto bg-gradient-to-b ${bgGradientClass} rounded-lg shadow-lg`}
    >
      <Navbar />
      <div className="mt-4 px-6">
        <div className="rounded-lg p-4 text-white">
          Home / Catalog / <span className={highlightColorClass}>{y}</span>
        </div>
      </div>
      <div className="rounded-lg p-4 mt-4">
        <h2 className={`text-3xl font-semibold ${textColorClass}`}>{y}</h2>
        <div className="my-4 w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
        <div>
          {y === "Devops" ? (
            <p className={`text-lg ${textColorClass}`}>
              DevOps is a set of practices, tools, and a cultural philosophy
              that automate and integrate the processes between software
              development and IT teams.
            </p>
          ) : y === "Android Development" ? (
            <p className={`text-lg ${textColorClass}`}>
              Android development involves creating applications for Android
              devices using Java or Kotlin, with tools like Android Studio and
              frameworks like React Native for cross-platform apps.
            </p>
          ) : y === "Blockchain" ? (
            <p className={`text-lg ${textColorClass}`}>
              Blockchain is a shared, immutable ledger that facilitates the
              process of recording transactions and tracking assets in a
              business network. An asset can be tangible (a house, car, cash,
              land) or intangible (intellectual property, patents, copyrights,
              branding). Virtually anything of value can be tracked and traded
              on a blockchain network, reducing risk and cutting costs for all
              involved.
            </p>
          ) : (
            <p className={`text-lg ${textColorClass}`}>
              Web development is the creation of websites, encompassing
              front-end (user interface), back-end (server, database), and often
              utilizing frameworks to expedite the process.
            </p>
          )}
        </div>
      </div>

      <div className="rounded-lg p-4 mt-8">
        <div className="mb-4">
          <h3 className={`text-xl font-semibold ${textColorClass}`}>
            Courses to get you started
          </h3>
          <div className="my-2 w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
          <div className="flex overflow-x-auto scrollbar-hide space-x-4">
            <Card1
              tag={y}
              value="true"
              className="transform transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-2xl"
            />
          </div>
        </div>

        <div>
          <h3 className={`text-xl font-semibold ${textColorClass}`}>
            Frequently Bought
          </h3>
          <div className="my-2 w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
          <div className="flex overflow-x-auto scrollbar-hide space-x-4">
            <Card1
              tag={y}
              value="false"
              className="transform transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
