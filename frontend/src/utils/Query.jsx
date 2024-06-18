import React from "react";
import { Navbar } from "./Navbar";
import { Card1 } from "./ProfileComp/Card1";

export const Query = () => {
  const query = window.location.pathname;
  const x = query.slice(1, query.length);
  const y = x.replace("%20", " ");

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 bg-gray-100 rounded-lg shadow-lg">
      <Navbar />
      <div className="mt-4">
        <div className="bg-white rounded-lg p-4">
          Home / Catalog / <span>{y}</span>
        </div>
      </div>
      <div className="bg-white rounded-lg p-4 mt-4">
        <h2 className="text-2xl font-semibold">{y}</h2>
        <hr className="my-4" />
        <div>
          {y === "Devops" ? (
            <p>
              DevOps is a set of practices, tools, and a cultural philosophy
              that automate and integrate the processes between software
              development and IT teams.
            </p>
          ) : y === "Android Development" ? (
            <p>
              Android development involves creating applications for Android
              devices using Java or Kotlin, with tools like Android Studio and
              frameworks like React Native for cross-platform apps.
            </p>
          ) : y === "Blockchain" ? (
            <p>
              Blockchain is a shared, immutable ledger that facilitates the
              process of recording transactions and tracking assets in a
              business network. An asset can be tangible (a house, car, cash,
              land) or intangible (intellectual property, patents, copyrights,
              branding). Virtually anything of value can be tracked and traded
              on a blockchain network, reducing risk and cutting costs for all
              involved.
            </p>
          ) : (
            <p>
              Web development is the creation of websites, encompassing
              front-end (user interface), back-end (server, database), and often
              utilizing frameworks to expedite the process.
            </p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 mt-8">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Courses to get you started</h3>
          <hr className="my-2" />
          <Card1 tag={y} value="true" />
        </div>

        <div>
          <h3 className="text-lg font-semibold">Frequently Bought</h3>
          <hr className="my-2" />
          <Card1 tag={y} value="false" />
        </div>
      </div>
    </div>
  );
};
