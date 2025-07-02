import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Plus, Trash } from "lucide-react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { DestinationFormType } from "@/lib/types";
import { useState } from "react";
import { cn } from "@/lib/utils";

type PrivateVehicleRoutesProps = {
  form: UseFormReturn<DestinationFormType>;
};

const PrivateVehicleRoutes = ({
  form,
}: PrivateVehicleRoutesProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "destinationRoute.personalVehicle",
  });

  const [openItems, setOpenItems] = useState<string[]>([]);

  const handleAddRoute = () => {
    const newIndex = fields.length;
    const newValue = `pt-${newIndex}`;

    append({
      route: "",
      startingPoint: "",
      approxTime: "",
      roadCondition: "",
    });

    // Delay setting open items to ensure field is added before updating state
    setTimeout(() => {
      setOpenItems((prev) => [...prev, newValue]);
    }, 0);
  };

  const handleToggle = (value: string) => {
    setOpenItems((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  return (
    <div>
      <Accordion
        type="multiple"
        value={openItems}
        onValueChange={(values) => setOpenItems(values)}
      >
        {fields.map((field, index) => {
          const itemValue = `pt-${index}`;
          return (
            <AccordionItem key={field.id} value={itemValue}>
              <AccordionTrigger
                className={cn("py-3 text-lg", index === 0 ? "pt-0" : "")}
                onClick={() => handleToggle(itemValue)}
              >
                {/* <li className="relative list-none pl-6 before:absolute before:left-0 before:text-primary before:content-['➤']"> */}
                <li className="ml-6">
                  {form.getValues(
                    `destinationRoute.personalVehicle.${index}.startingPoint`,
                  )
                    ? `From ${form.getValues(`destinationRoute.personalVehicle.${index}.startingPoint`)}`
                    : `Route ${index + 1}`}
                </li>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 rounded-md border p-4">
                <div className="grid grid-cols-2 gap-2 md:gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name={`destinationRoute.personalVehicle.${index}.startingPoint`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Starting Point</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Kathmandu" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`destinationRoute.personalVehicle.${index}.approxTime`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estimated duration</FormLabel>
                        <FormControl>
                          <Input placeholder="2 hrs" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name={`destinationRoute.personalVehicle.${index}.route`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Route Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Take BP Highway via Dhulikhel..."
                          {...field}
                          rows={3}
                          className="field-sizing-fixed resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`destinationRoute.personalVehicle.${index}.roadCondition`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Road Condition</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the condition of the route."
                          {...field}
                          rows={3}
                          className="field-sizing-fixed resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button
                    variant="destructive"
                    type="button"
                    onClick={() => {
                      remove(index);
                      setOpenItems((prev) =>
                        prev.filter((v) => v !== itemValue),
                      );
                    }}
                    size="sm"
                  >
                    <Trash className="mr-1 h-4 w-4" /> Remove Route
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      <Button
        type="button"
        variant="outline"
        onClick={handleAddRoute}
        className="mt-3"
      >
        <Plus className="mr-2 h-4 w-4" /> Add Route
      </Button>
    </div>
  );
}

export default PrivateVehicleRoutes