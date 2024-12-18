import React from "react";
type TuitionInfo = {
  genderPreference: string;
  location: string;
  class: string;
  member: number;
  subject: string;
  time: string;
  medium: string;
  salary: number;
  contact: string;
  studentInstitute: string;
  gender: string;
};
const TuitionPost = ({ tuition }: { tuition: TuitionInfo }) => {
  return (
    <div className="bg-white border border-slate-500 shadow-md p-4 m-4 rounded-md">
      <div className="flex flex-row gap-4">
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-blue-600">
            Gender preferance
          </span>
          <span className="text-base">{tuition.genderPreference}</span>
        </div>
    </div>
    <div className="flex flex-row gap-4">
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-blue-600">Location</span>
          <span className="text-base">{tuition.location}</span>
        </div>
    </div>
    <div className="flex flex-row gap-4">
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-blue-600">Class</span>
          <span className="text-base">{tuition.class}</span>
        </div>
    </div>
    <div className="flex flex-row gap-4">
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-blue-600">
            No of students
          </span>
          <span className="text-base">{tuition.member}</span>
        </div>
    </div>
    <div className="flex flex-row gap-4">
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-blue-600">Subject</span>
          <span className="text-base">{tuition.subject}</span>
        </div>
    </div>
    <div className="flex flex-row gap-4">
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-blue-600">
            Number of classes per week
          </span>
          <span className="text-base">{tuition.time}</span>
        </div>
    </div>
    <div className="flex flex-row gap-4">
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-blue-600">Medium</span>
          <span className="text-base">{tuition.medium}</span>
        </div>
    </div>
    <div className="flex flex-row gap-4">
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-blue-600">Salary</span>
          <span className="text-base">{tuition.salary}</span>
        </div>
    </div>
    <div className="flex flex-row gap-4">
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-blue-600">Contact</span>
          <span className="text-base">{tuition.contact}</span>
        </div>
    </div>
    <div className="flex flex-row gap-4">
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-blue-600">
            Student Institute
          </span>
          <span className="text-base">{tuition.studentInstitute}</span>
        </div>
    </div>
    <div className="flex flex-row gap-4">
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-blue-600">
            Student gender
          </span>
          <span className="text-base">{tuition.gender}</span>
        </div>
      </div>
    </div>
  );
};

export default TuitionPost;
