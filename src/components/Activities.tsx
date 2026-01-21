import React from "react";
import { Activity } from "lucide-react";

interface ActivitiesProps {
  activities: string[];
}

// const Activities = ({activities}: ActivitiesProps) => {
//     return <div>
//         <h2 className="mb-4 text-xl font-semibold">Popular Activities</h2>
//         <div className="grid gap-4 sm:grid-cols-2">
//           {activities.map((activity, index) => (
//             <div
//               key={index}
//               className="flex items-start gap-3 rounded-lg border p-3"
//             >
//               <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
//                 {index + 1}
//               </div>
//               <div>
//                 <h3 className="font-medium">{activity}</h3>
//                 <p className="text-muted-foreground text-sm">
//                   Experience this popular activity during your visit.
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
// }

const Activities = ({ activities }: ActivitiesProps) => {
  return (
    <section>
      <h2 className="mb-6 flex gap-3 text-2xl font-bold">
        <Activity className="size-6" /> Activities & Experiences
      </h2>
      <div className="flex flex-wrap gap-2">
        {activities.map((activity, index) => (
          <span
            key={index}
            className="border-primary/20 bg-primary/5 text-foreground rounded-full border px-4 py-2 text-sm font-medium"
          >
            {activity}
          </span>
        ))}
      </div>
    </section>
  );
};

export default Activities;
