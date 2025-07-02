import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { DestinationFormType } from "@/lib/types";
import { Dispatch, SetStateAction } from "react";
import TrekkingRouteOptionsDialog from "./TrekkingRouteOptionsDialog";
import CheckpointsInput from "./CheckpointsInput";

type TrekkingRouteProps = {
  form: UseFormReturn<DestinationFormType>;
  trekkingRouteFieldOptions: {
    duration: boolean;
    distance: boolean;
    difficulty: boolean;
    altitudeGain: boolean;
    maxAltitude: boolean;
    trailDescription: boolean;
    checkpoints: boolean;
    notes: boolean;
  };
  setTrekkingRouteFieldOptions: Dispatch<
    SetStateAction<TrekkingRouteProps["trekkingRouteFieldOptions"]>
  >;
};

const TrekkingRoute = ({
  form,
  trekkingRouteFieldOptions: options,
  setTrekkingRouteFieldOptions: setOptions,
}: TrekkingRouteProps) => {
  // const [options, setOptions] = useState({
  //   duration: false,
  //   distance: false,
  //   difficulty: false,
  //   altitudeGain: false,
  //   maxAltitude: false,
  //   trailType: false,
  //   checkpoints: false,
  //   notes: false,
  // });

  console.log(options);

  return (
    // <div>
    //   <Accordion
    //     type="multiple"
    //     value={openItems}
    //     onValueChange={(values) => setOpenItems(values)}
    //   >
    //     {fields.map((field, index) => {
    //       const itemValue = `pv-${index}`;
    //       return (
    //         <AccordionItem key={field.id} value={itemValue}>
    //           <AccordionTrigger
    //             className={cn("py-3 text-lg", index === 0 ? "pt-0" : "")}
    //             onClick={() => handleToggle(itemValue)}
    //           >
    //             <li className="ml-6">
    //               {form.getValues(
    //                 `destinationRoute.publicTransport.segments.${index}.from`,
    //               ) &&
    //               form.getValues(
    //                 `destinationRoute.publicTransport.segments.${index}.to`,
    //               )
    //                 ? `${form.getValues(`destinationRoute.publicTransport.segments.${index}.from`)} - ${form.getValues(`destinationRoute.publicTransport.segments.${index}.to`)}`
    //                 : `Segment ${index + 1}`}
    //             </li>
    //           </AccordionTrigger>
    //           <AccordionContent className="space-y-4 rounded-md border p-4">
    //             <div className="grid grid-cols-2 gap-x-2 gap-y-4 md:gap-x-4">
    //               <FormField
    //                 control={form.control}
    //                 name={`destinationRoute.publicTransport.segments.${index}.from`}
    //                 render={({ field }) => (
    //                   <FormItem>
    //                     <FormLabel>From:</FormLabel>
    //                     <FormControl>
    //                       <Input placeholder="e.g. Kathmandu" {...field} />
    //                     </FormControl>
    //                     <FormMessage />
    //                   </FormItem>
    //                 )}
    //               />
    //               <FormField
    //                 control={form.control}
    //                 name={`destinationRoute.publicTransport.segments.${index}.to`}
    //                 render={({ field }) => (
    //                   <FormItem>
    //                     <FormLabel>To:</FormLabel>
    //                     <FormControl>
    //                       <Input placeholder="e.g. Pokhara" {...field} />
    //                     </FormControl>
    //                     <FormMessage />
    //                   </FormItem>
    //                 )}
    //               />
    //               <FormField
    //                 control={form.control}
    //                 name={`destinationRoute.publicTransport.segments.${index}.approxTime`}
    //                 render={({ field }) => (
    //                   <FormItem>
    //                     <FormLabel>Duration</FormLabel>
    //                     <FormControl>
    //                       <Input placeholder="2 hrs" {...field} />
    //                     </FormControl>
    //                     <FormMessage />
    //                   </FormItem>
    //                 )}
    //               />
    //               <FormField
    //                 control={form.control}
    //                 name={`destinationRoute.publicTransport.segments.${index}.fare`}
    //                 render={({ field }) => (
    //                   <FormItem>
    //                     <FormLabel>Transport Fare</FormLabel>
    //                     <FormControl>
    //                       <Input placeholder="Rs 500" {...field} />
    //                     </FormControl>
    //                     <FormMessage />
    //                   </FormItem>
    //                 )}
    //               />
    //             </div>

    //             <FormField
    //               control={form.control}
    //               name={`destinationRoute.publicTransport.segments.${index}.note`}
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel>Note</FormLabel>
    //                   <FormControl>
    //                     <Textarea
    //                       placeholder="Add extra info about this section of the route"
    //                       {...field}
    //                       rows={3}
    //                       className="field-sizing-fixed resize-none"
    //                     />
    //                   </FormControl>
    //                   <FormMessage />
    //                 </FormItem>
    //               )}
    //             />

    //             <div className="flex justify-end">
    //               <Button
    //                 variant="destructive"
    //                 type="button"
    //                 onClick={() => {
    //                   remove(index);
    //                   setOpenItems((prev) =>
    //                     prev.filter((v) => v !== itemValue),
    //                   );
    //                 }}
    //                 size="sm"
    //               >
    //                 <Trash className="mr-1 h-4 w-4" /> Remove Route
    //               </Button>
    //             </div>
    //           </AccordionContent>
    //         </AccordionItem>
    //       );
    //     })}
    //   </Accordion>

    //   <Button
    //     type="button"
    //     variant="outline"
    //     onClick={handleAddRoute}
    //     className="mt-3"
    //   >
    //     <Plus className="mr-2 h-4 w-4" /> Add Segment
    //   </Button>
    // </div>
    <div className="grid gap-4 rounded-md border p-4 md:grid-cols-2">
      <div className="flex justify-end md:col-span-2">
        <TrekkingRouteOptionsDialog values={options} setValues={setOptions} />
      </div>
      <FormField
        control={form.control}
        name="destinationRoute.trek.startingPoint"
        defaultValue=""
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-3">
              <FormLabel className="flex-1 whitespace-nowrap">
                Starting Point:
              </FormLabel>
              <FormControl className="flex-2">
                <Input placeholder="e.g Ghandruk" {...field} />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      {options.duration && (
        <FormField
          control={form.control}
          name="destinationRoute.trek.duration"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-3">
                <FormLabel className="flex-1 whitespace-nowrap">
                  Estimated Duration:
                </FormLabel>
                <FormControl className="flex-2">
                  <Input placeholder="2 hrs" {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      {options.distance && (
        <FormField
          control={form.control}
          name="destinationRoute.trek.distance"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-3">
                <FormLabel className="flex-1 whitespace-nowrap">
                  Total Distance:
                </FormLabel>
                <FormControl className="flex-2">
                  <Input placeholder="12 km" {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      {options.difficulty && (
        <FormField
          control={form.control}
          name="destinationRoute.trek.difficulty"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-3">
                <FormLabel className="flex-1 whitespace-nowrap">
                  Difficulty Level:
                </FormLabel>
                <FormControl className="flex-2">
                  <Input placeholder="Moderate" {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      {options.altitudeGain && (
        <FormField
          control={form.control}
          name="destinationRoute.trek.altitudeGain"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-3">
                <FormLabel className="flex-1 whitespace-nowrap">
                  Altitude Gain:
                </FormLabel>
                <FormControl className="flex-2">
                  <Input placeholder="800m" {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      {options.maxAltitude && (
        <FormField
          control={form.control}
          name="destinationRoute.trek.maxAltitude"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-3">
                <FormLabel className="flex-1 whitespace-nowrap">
                  Maximum Altitude:
                </FormLabel>
                <FormControl className="flex-2">
                  <Input placeholder="5500m" {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      {options.checkpoints && (
        <div className="md:col-span-2">
          <CheckpointsInput form={form} />
        </div>
      )}
      {options.trailDescription && (
        <div className="md:col-span-2">
          <FormField
            control={form.control}
            name="destinationRoute.trek.trailDescription"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trail Description:</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the trail type and its condition..."
                    {...field}
                    rows={3}
                    className="field-sizing-fixed resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
      {options.notes && (
        <div className="md:col-span-2">
          <FormField
            control={form.control}
            name="destinationRoute.trek.notes"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Notes:</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add extra info about the route..."
                    {...field}
                    rows={3}
                    className="field-sizing-fixed resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default TrekkingRoute;
