import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertCircleIcon,
  CalendarDays,
  ListOrdered,
  Trash,
} from "lucide-react";
import { useState } from "react";
import { useFormContext, useFieldArray, UseFormReturn } from "react-hook-form";
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { TrekRouteType } from "@/lib/RouteValidation";
import { Alert, AlertTitle } from "@/components/ui/alert";

type ItineraryInputProps = {
  form: UseFormReturn<Omit<TrekRouteType, "_id">>;
};

const ItineraryInput = ({ form }: ItineraryInputProps) => {
  const { control, getValues } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "recommendedItinerary",
  });

  const [inputValue, setInputValue] = useState("");

  const itineraries = form.getValues("recommendedItinerary");

  const handleAdd = () => {
    if (inputValue.trim()) {
      append(inputValue.trim());
      setInputValue("");
    }
  };

  const handleRemove = async (index: number) => {
    remove(index);
    // const updatedCheckpoints = getValues("warnings");
    // if (updatedCheckpoints && updatedCheckpoints.length == 0) {
    //   form.setValue("warnings", undefined);
    // }
  };

  return (
    <FormItem>
      <FormLabel>Recommended Itinerary (optional)</FormLabel>
      <div className="flex gap-2">
        <div className="relative w-full">
          <span className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm">
            Day {fields.length + 1}:
          </span>
          <Input
            placeholder="Enter itinerary for this day..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd();
              }
            }}
            className="pl-16" // make space for the prefix
          />
        </div>

        <Button type="button" onClick={handleAdd}>
          Add
        </Button>
      </div>

      {itineraries && itineraries.length > 0 && (
        <div className="mt-2 space-y-2">
          {fields.map((field, index) => (
            <Alert key={index} className="py-1.5">
              <AlertTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarDays className="size-5" />
                  <span>
                    <strong>Day {index + 1}: </strong>
                    {getValues(`recommendedItinerary.${index}`)}
                  </span>
                </div>
                <Button
                  type="button"
                  variant={"ghost"}
                  onClick={() => handleRemove(index)}
                  className="group"
                >
                  <Trash className="group-hover:text-destructive size-4" />
                </Button>
              </AlertTitle>
            </Alert>
          ))}
        </div>
      )}

      <FormMessage />
    </FormItem>
  );
};

export default ItineraryInput;
