import React from "react";

const BestTimeToVisit = () => {
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold">Best time to visit</h2>

      {/* Season chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-orange-100 px-3 py-1 text-orange-700">
          Autumn
        </span>
        <span className="rounded-full bg-slate-200 px-3 py-1 text-slate-700">
          Winter
        </span>
      </div>

      {/* Season cards */}
      <div className="mt-6 space-y-4">
        <div className="rounded-lg border bg-slate-50 p-4">
          <h3 className="text-lg font-semibold">Winter</h3>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            <li>
              <strong>Best for:</strong> Bird watching, Photography
            </li>
            <li>
              <strong>Weather:</strong> Cool and dry
            </li>
            <li className="text-slate-600">
              <strong>Notes:</strong> Migratory birds arrive from November to
              February
            </li>
          </ul>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            Monsoon
            <span className="text-xs text-red-600">Not ideal</span>
          </h3>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            <li>
              <strong>Best for:</strong> Scenic views
            </li>
            <li>
              <strong>Weather:</strong> Heavy rainfall
            </li>
            <li className="text-slate-600">
              <strong>Notes:</strong> Leeches and flooded trails
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BestTimeToVisit;
