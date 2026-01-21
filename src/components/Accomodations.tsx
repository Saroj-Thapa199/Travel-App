import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Hotel } from "lucide-react";

interface AccommodationsProps {
  accommodations: Array<{
    type: string;
    description: string;
  }>;
}

const Accommodations = ({ accommodations }: AccommodationsProps) => {
  return (
    <section>
      <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
        <Hotel className="size-6" /> Accommodation Options
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {accommodations.map((accommodation, index) => (
          <Card key={index} className="gap-0 py-6">
            <CardHeader>
              <CardTitle className="text-lg">{accommodation.type}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {accommodation.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Accommodations;
