import React from 'react';

type BloodInfo = {
  bloodGroup: string;
  units: number;
  hospital: string;
  contact: string;
  time: string;
};

const BloodPost = ({ blood }: { blood: BloodInfo }) => {
  return (
    <div className="bg-white border border-slate-500 shadow-md p-4 m-4 rounded-md">
      <div className="flex flex-row gap-4">
        <div className="flex flex-col">
          <span className="text-xl font-semibold text-blue-600">Blood Group</span>
          <span className="text-lg">{blood.bloodGroup}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-semibold text-blue-600">Units</span>
          <span className="text-lg">{blood.units}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-semibold text-blue-600">Hospital</span>
          <span className="text-lg">{blood.hospital}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-semibold text-blue-600">Contact</span>
          <span className="text-lg">{blood.contact}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-semibold text-blue-600">Time</span>
          <span className="text-lg">{new Date(blood.time).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default BloodPost;
