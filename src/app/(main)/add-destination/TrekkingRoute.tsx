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
    note: boolean;
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
  console.log(options);

  return (
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
                Starting Point: <span className="text-destructive">*</span>
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
      <div className="md:col-span-2 space-y-4 mt-2">
        {options.checkpoints && (
          <div>
            <CheckpointsInput form={form} />
          </div>
        )}
        {options.trailDescription && (
          <div>
            <FormField
              control={form.control}
              name="destinationRoute.trek.trailDescription"
              defaultValue=""
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Trail Description:{" "}
                    <span className="text-destructive">*</span>
                  </FormLabel>
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
        {options.note && (
          <div>
            <FormField
              control={form.control}
              name="destinationRoute.trek.note"
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
    </div>
  );
};

export default TrekkingRoute;
