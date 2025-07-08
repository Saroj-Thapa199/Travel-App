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

type PublicTransportRoutesProps = {
  form: UseFormReturn<DestinationFormType>;
};

const PublicTransportRoutes = ({ form }: PublicTransportRoutesProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "destinationRoute.publicTransport",
  });

  const [openItems, setOpenItems] = useState<string[]>([]);

  const handleAddRoute = () => {
    const newIndex = fields.length;
    const newValue = `pv-${newIndex}`;

    append({
      from: "",
      to: "",
      // transportType: "Bus",
      approxTime: "",
      fare: undefined,
      note: "",
      lastDeparture: "",
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
          const itemValue = `pv-${index}`;
          return (
            <AccordionItem key={field.id} value={itemValue}>
              <AccordionTrigger
                className={cn("py-3 text-lg", index === 0 ? "pt-0" : "")}
                onClick={() => handleToggle(itemValue)}
              >
                <li className="ml-6">
                  {form.getValues(
                    `destinationRoute.publicTransport.${index}.from`,
                  ) &&
                  form.getValues(
                    `destinationRoute.publicTransport.${index}.to`,
                  )
                    ? `${form.getValues(`destinationRoute.publicTransport.${index}.from`)} - ${form.getValues(`destinationRoute.publicTransport.${index}.to`)}`
                    : `Segment ${index + 1}`}
                </li>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 rounded-md border p-4">
                <div className="grid grid-cols-2 gap-x-2 gap-y-4 md:gap-x-4">
                  <FormField
                    control={form.control}
                    name={`destinationRoute.publicTransport.${index}.from`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          From: <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Kathmandu" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`destinationRoute.publicTransport.${index}.to`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          To: <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Pokhara" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`destinationRoute.publicTransport.${index}.approxTime`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                          <Input placeholder="2 hrs" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`destinationRoute.publicTransport.${index}.fare`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transport Fare</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Rs 500"
                            value={field.value ?? ""}
                            onChange={(e) => {
                              const val = e.target.value;
                              // If empty string, set null (or undefined) in form state
                              field.onChange(
                                val === "" ? undefined : Number(val),
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name={`destinationRoute.publicTransport.${index}.note`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Note</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Add extra info about this section of the route"
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
                    <Trash className="mr-1 h-4 w-4" /> Remove Segment
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
        <Plus className="mr-2 h-4 w-4" /> Add Segment
      </Button>
    </div>
  );
};

export default PublicTransportRoutes;
