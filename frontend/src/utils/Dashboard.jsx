import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { Separator } from "@radix-ui/react-separator";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Pnav } from "./ProfileComp/Pnav";
import axios from "axios";
import { useSelector } from "react-redux";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const Dashboard = () => {
  const select = useSelector((state) => state?.form?.FormData);
  const authToken = select?.authToken;

  const [data, setData] = useState({
    courses: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/profile/instructorDashboard",
          {
            params: { id: select?._id },
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        setData({
          courses: response.data.courses,
        });
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [select?._id, authToken]);

  const enrolledStudentsData = {
    labels: data.courses.map((course) => course.courseName),
    datasets: [
      {
        label: "Enrolled Students",
        data: data.courses.map((course) => course.totalStudents),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const totalIncomeData = {
    labels: data.courses.map((course) => course.courseName),
    datasets: [
      {
        label: "Total Income",
        data: data.courses.map((course) => course.totalAmount),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  const coursesData = {
    labels: data.courses.map((course) => course.courseName),
    datasets: [
      {
        label: "Courses",
        data: data.courses.map(() => 1), // Placeholder value
        backgroundColor: data.courses.map(() => "rgba(255, 206, 86, 0.6)"),
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-900">
      <Navbar />
      <Separator className="bg-slate-900" />
      <div className="flex flex-grow">
        <Pnav />
        <div className="flex-grow overflow-hidden">
          <ScrollArea className="h-full w-full p-6">
            <div className="text-white text-2xl mb-6">Dashboard</div>
            <div className="mb-12 p-4 bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-white text-xl mb-4">Enrolled Students</h3>
              <div className="w-full h-64">
                <Bar
                  data={enrolledStudentsData}
                  options={{ maintainAspectRatio: false }}
                />
              </div>
            </div>
            <div className="mb-12 p-4 bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-white text-xl mb-4">
                Total Income Generated
              </h3>
              <div className="w-full h-64">
                <Bar
                  data={totalIncomeData}
                  options={{ maintainAspectRatio: false }}
                />
              </div>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-white text-xl mb-4">Total Courses</h3>
              <div className="w-full h-64">
                <Pie
                  data={coursesData}
                  options={{ maintainAspectRatio: false }}
                />
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
