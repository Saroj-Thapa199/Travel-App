"use client";

import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MotorableRouteType, transportTypeEnum } from "@/lib/RouteValidation";
import { TagsInput } from "@/components/ui/tags-input";
import WarningsInput from "./WarningsInput";
import { useState } from "react";
import MotorableRouteDialog from "./MotorableRouteDialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { createMotorableRoute } from "@/lib/actions/route";

interface MotorableRouteFormProps {
  form: UseFormReturn<Omit<MotorableRouteType, "_id">>;
  onCancel: () => void;
}

export function MotorableRouteForm({
  form,
  onCancel,
}: MotorableRouteFormProps) {
  const [motorableDialogOpen, setMotorableDialogOpen] = useState(false);
  const [motorableData, setMotorableData] = useState<
    Omit<MotorableRouteType, "_id">
  >(form.getValues());
  const [errorMsg, setErrorMsg] = useState<string>();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: Omit<MotorableRouteType, "_id">) => {
    setMotorableData(data);
    setMotorableDialogOpen(true);
  };

  const handleCreateMotorableRoute = async (
    data: Omit<MotorableRouteType, "_id">,
  ) => {
    setLoading(true);
    const { error } = await createMotorableRoute(data);
    setErrorMsg(error);
    setLoading(false);
  };

  return (
    <Card className="w-full gap-3">
      <CardHeader className="text-center">
        {errorMsg && <span className="text-destructive">{errorMsg}</span>}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From</FormLabel>
                    <FormControl>
                      <Input placeholder="Starting location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="to"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To</FormLabel>
                    <FormControl>
                      <Input placeholder="Destination" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="distance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Distance (km)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Distance in kilometers"
                        value={field.value ?? ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          // If empty string, set null (or undefined) in form state
                          field.onChange(val === "" ? undefined : Number(val));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 2-3 hours" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="route"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Route Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the route in details to help fellow travellers taking their own vehicles..."
                      {...field}
                      rows={4}
                      className="field-sizing-fixed resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="availableServices"
              render={() => (
                <FormItem>
                  <FormLabel>Available Transport Services</FormLabel>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {transportTypeEnum.options.map((service) => (
                      <FormField
                        key={service}
                        control={form.control}
                        name="availableServices"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(service)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, service])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== service,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {service}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="fareRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fare Range</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., NPR 500-800" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequency (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Every 30 minutes" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="bookingInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Booking Information (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="How to book tickets..."
                      {...field}
                      rows={2}
                      className="field-sizing-fixed resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="items-start gap-4 space-y-4 md:flex">
              <FormField
                control={form.control}
                name="roadCondition.type"
                render={({ field }) => (
                  <FormItem className="min-w-32">
                    <FormLabel>Road Condition</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select road condition" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Fair">Fair</SelectItem>
                        <SelectItem value="Poor">Poor</SelectItem>
                        <SelectItem value="Bad">Bad</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="roadCondition.description"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Road Condition Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Additional details about road condition..."
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

            <Separator />

            <div className="space-y-4">
              <Label className="text-lg">Fuel Availability Info</Label>
              <FormField
                control={form.control}
                name="fuelAvailability.hasStations"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Fuel Stations Available
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fuelAvailability.description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Fuel Availability Description (Optional)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Details about fuel availability..."
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
                name="fuelAvailability.recommendedStops"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recommended Stops(M) (Optional)</FormLabel>
                    <FormControl>
                      <TagsInput
                        value={field.value || []}
                        onValueChange={field.onChange}
                        placeholder="Add fuel stop locations"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <FormField
              control={form.control}
              name="landmarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Landmarks(M) (Optional)</FormLabel>
                  <FormControl>
                    <TagsInput
                      value={field.value || []}
                      onValueChange={field.onChange}
                      placeholder="Add landmark"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <WarningsInput form={form} />

            <Separator />

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional information..."
                      {...field}
                      rows={4}
                      className="field-sizing-fixed resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <Button type="submit" className="flex-1">
                Create Route Segment
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={loading}
                className="flex-1 bg-transparent"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>

        <MotorableRouteDialog
          motorableData={motorableData}
          motorableDialogOpen={motorableDialogOpen}
          setMotorableDialogOpen={setMotorableDialogOpen}
          handleSubmit={handleCreateMotorableRoute}
          loading={loading}
        />
      </CardContent>
    </Card>
  );
}
