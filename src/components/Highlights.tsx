import { Star } from "lucide-react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface HighlightsProps {
  highlights: {
    title: string;
    description: string;
  }[];
}

const Highlights = ({ highlights }: HighlightsProps) => {
  return (
    <section>
      <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold">
        <Star className="text-primary size-6" />
        What Makes This Place Special
      </h2>
      <ul className="text-muted-foreground list-disc space-y-2 pl-5">
        {highlights.map((highlight, index) => (
          <li key={index}>
            <span className="font-semibold">{highlight.title}</span>:{" "}
            {highlight.description}
          </li>
        ))}
      </ul>
    </section>
  );
};

// const Highlights = ({highlights}: HighlightsProps) => {
//     return <div>
//         <h3 className="mb-6 flex items-center gap-2 text-xl font-bold">
//           <Star className="text-primary h-6 w-6" />
//           What Makes This Place Special
//         </h3>
//         <div className="space-y-4">
//           {highlights.map((highlight, index) => (
//             <div
//               key={index}
//               className="bg-muted/50 border-l-primary flex items-start gap-4 rounded-lg border border-l-4 p-4 transition-colors"
//             >
//               <div className="bg-primary text-primary-foreground flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full p-2 text-sm font-bold">
//                 {index + 1}
//               </div>
//               <div className="flex-1 space-y-1">
//                 <h4 className="text-base font-semibold">{highlight.title}</h4>
//                 <p className="text-muted-foreground text-sm leading-relaxed">
//                   {highlight.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
// }

// const Highlights = ({highlights}: HighlightsProps) => {
//  return <section>
//             <h2 className="mb-6 text-2xl font-bold">Key Highlights</h2>
//             <div className="grid gap-4 sm:grid-cols-2">
//               {highlights.map((highlight, index) => (
//                 <Card key={index}>
//                   <CardHeader>
//                     <CardTitle className="text-lg">{highlight.title}</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <p className="text-muted-foreground">{highlight.description}</p>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </section>
// }

export default Highlights;
