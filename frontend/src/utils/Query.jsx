import React from "react";
import { Navbar } from "./Navbar";
// import { useSelector } from "react-redux";
import { Card1 } from "./ProfileComp/Card1";

export const Query = () => {
  const query = window.location.pathname;
  const x = query.slice(1, query.length);
  const y = x.replace("%20", " ");
  // const form = useSelector((state) => state?.form?.FormData);
  // console.log(form);
  return (
    <div>
      <Navbar></Navbar>
      <div>
        Home/Catalog/<span>{y}</span>
      </div>
      <div>{y}</div>

      {y == "Devops" ? (
        <span>
          DevOps is a set of practices, tools, and a cultural philosophy that
          automate and integrate the processes between software development and
          IT teams.
        </span>
      ) : (
        <>
          {y == "Android Development" ? (
            <span>
              Android development involves creating applications for Android
              devices using Java or Kotlin, with tools like Android Studio and
              frameworks like React Native for cross-platform apps.
            </span>
          ) : (
            <>
              {y == "Blockchain" ? (
                <span>
                  Blockchain is a shared, immutable ledger that facilitates the
                  process of recording transactions and tracking assets in a
                  business network. An asset can be tangible (a house, car,
                  cash, land) or intangible (intellectual property, patents,
                  copyrights, branding). Virtually anything of value can be
                  tracked and traded on a blockchain network, reducing risk and
                  cutting costs for all involved.
                </span>
              ) : (
                <span>
                  Web development is the creation of websites, encompassing
                  front-end (user interface), back-end (server, database), and
                  often utilizing frameworks to expedite the process.
                </span>
              )}
            </>
          )}
        </>
      )}
      <div>
        <div>Courses to get you started</div>
        <Card1 tag={y} value="true"></Card1>
      </div>

      <div>
        <div>Frequently Bought</div>
        <Card1 tag={y} value="false"></Card1>
      </div>
    </div>
  );
};
