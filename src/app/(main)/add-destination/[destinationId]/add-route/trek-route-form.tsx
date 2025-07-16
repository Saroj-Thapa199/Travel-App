"use client";

import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Card, CardContent } from "@/components/ui/card";
import { X, Plus } from "lucide-react";
import { useState } from "react";
import { TrekRouteType } from "@/lib/RouteValidation";
import { TagsInput } from "@/components/ui/tags-input";
import SafetyTipsInput from "./SafetyTipsInput";
import TrekRouteDialog from "./TrekRouteDialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import ItineraryInput from "./ItineraryInput";
import { createTrekRoute } from "@/lib/actions/route";

interface TrekRouteFormProps {
  form: UseFormReturn<Omit<TrekRouteType, "_id">>;
  onCancel: () => void;
}

export function TrekRouteForm({ form, onCancel }: TrekRouteFormProps) {
  const [permits, setPermits] = useState<
    Array<{ name: string; cost?: string; where?: string }>
  >(form.getValues().permits || []);
  const [newPermit, setNewPermit] = useState({ name: "", cost: "", where: "" });

  const [trekData, setTrekData] = useState<Omit<TrekRouteType, "_id">>(
    form.getValues(),
  );
  const [trekDialogOpen, setTrekDialogOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: Omit<TrekRouteType, "_id">) => {
    setTrekData(data);
    setTrekDialogOpen(true);
  };

  const handleCreateMotorableRoute = async (
    data: Omit<TrekRouteType, "_id">,
  ) => {
    setLoading(true);
    const { error } = await createTrekRoute(data);
    setErrorMsg(error);
    setLoading(false);
  };

  const addPermit = () => {
    if (newPermit.name.trim()) {
      setPermits([...permits, { ...newPermit, name: newPermit.name.trim() }]);
      setNewPermit({ name: "", cost: "", where: "" });
    }
  };

  const removePermit = (index: number) => {
    setPermits(permits.filter((_, i) => i !== index));
  };

  return (
    <Card className="w-full">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="trekName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trek Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name of the trek" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="min-w-32">
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Moderate">Moderate</SelectItem>
                        <SelectItem value="Challenging">Challenging</SelectItem>
                        <SelectItem value="Difficult">Difficult</SelectItem>
                        <SelectItem value="Extreme">Extreme</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="startingPoint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Starting Point</FormLabel>
                    <FormControl>
                      <Input placeholder="Trek starting location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="destinationPoint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination Point (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Trek starting location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="duration.oneWay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One Way Duration (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 5-7 days" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration.roundTrip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Round Trip Duration (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 10-14 days" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="elevation.start"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Starting Elevation (m)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Starting elevation"
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
                name="elevation.max"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Elevation (m)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Maximum elevation"
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
                name="elevation.gain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Elevation Gain (m)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Total elevation gain"
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
            </div>

            <Separator />

            <div className="space-y-4">
              <Label className="text-lg">Teahouses Info</Label>
              <FormField
                control={form.control}
                name="teahouses.available"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Teahouses Available
                      </FormLabel>
                      <p className="text-muted-foreground text-sm">
                        Are there teahouses along the trek route?
                      </p>
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
                name="teahouses.locations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teahouse Locations(M) (optional)</FormLabel>
                    <FormControl>
                      <TagsInput
                        value={field.value || []}
                        onValueChange={field.onChange}
                        placeholder="Add teahouse locations"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <Separator />

            <div className="space-y-6">
              <div className="space-y-2">
                <FormLabel>Permits Required (Optional)</FormLabel>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                  <Input
                    placeholder="Permit name"
                    value={newPermit.name}
                    onChange={(e) =>
                      setNewPermit({ ...newPermit, name: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Cost (optional)"
                    value={newPermit.cost}
                    onChange={(e) =>
                      setNewPermit({ ...newPermit, cost: e.target.value })
                    }
                  />
                  <div className="flex gap-2">
                    <Input
                      placeholder="Where to get (optional)"
                      value={newPermit.where}
                      onChange={(e) =>
                        setNewPermit({ ...newPermit, where: e.target.value })
                      }
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={addPermit}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  {permits.map((permit, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div>
                        <p className="font-medium">{permit.name}</p>
                        {permit.cost && (
                          <p className="text-muted-foreground text-sm">
                            Cost: {permit.cost}
                          </p>
                        )}
                        {permit.where && (
                          <p className="text-muted-foreground text-sm">
                            Where: {permit.where}
                          </p>
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removePermit(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <ItineraryInput form={form} />

              <Separator />

              <FormField
                control={form.control}
                name="bestSeason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Best Seasons(M) (Optional)</FormLabel>
                    <FormControl>
                      <TagsInput
                        value={field.value || []}
                        onValueChange={field.onChange}
                        placeholder="eg. November - December"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              <FormField
                control={form.control}
                name="highlights"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Highlights(M) (Optional)</FormLabel>
                    <FormControl>
                      <TagsInput
                        value={field.value || []}
                        onValueChange={field.onChange}
                        placeholder="Add highlights"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              <FormField
                control={form.control}
                name="packingList"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Packing List(M) (Optional)</FormLabel>
                    <FormControl>
                      <TagsInput
                        value={field.value || []}
                        onValueChange={field.onChange}
                        placeholder="Add packing items"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              <SafetyTipsInput form={form} />
            </div>

            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <Button type="submit" className="flex-1">
                Create Route Segment
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1 bg-transparent"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>

        <TrekRouteDialog
          trekData={trekData}
          trekDialogOpen={trekDialogOpen}
          setTrekDialogOpen={setTrekDialogOpen}
          handleSubmit={handleCreateMotorableRoute}
        />
      </CardContent>
    </Card>
  );
}
