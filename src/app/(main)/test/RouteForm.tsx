"use client"

import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Plus, Trash2, MapPin, Bus, Car, Mountain } from "lucide-react"

// Zod Schemas
const publicTransportOptionSchema = z.object({
  vehicleType: z.enum(["Local Bus", "Deluxe Bus", "Microbus", "Hiace", "Tourist Bus"]),
  frequency: z.string().optional(),
  duration: z.string().optional(),
  fareRange: z.string().optional(),
  booking: z.string().optional(),
  note: z.string().optional(),
})

const publicTransportSchema = z.object({
  routeName: z.string().optional(),
  from: z.string().min(1, "Starting point is required"),
  to: z.string().min(1, "Destination is required"),
  options: z.array(publicTransportOptionSchema).min(1, "At least one transport option is required"),
  landmarks: z.array(z.string()).optional(),
})

const checkpointSchema = z.object({
  name: z.string().min(1, "Checkpoint name is required"),
  type: z.enum(["Police", "Customs", "Toll"]),
  note: z.string().optional(),
})

const alternativeRouteSchema = z.object({
  route: z.string().min(1, "Route description is required"),
  pros: z.string().optional(),
  cons: z.string().optional(),
})

const personalVehicleSchema = z.object({
  recommendedRoute: z.string().min(1, "Recommended route is required"),
  distance: z.number().positive().optional(),
  approxTime: z.string().optional(),
  roadConditions: z
    .object({
      goodPercentage: z.number().min(0).max(100).optional(),
      fairPercentage: z.number().min(0).max(100).optional(),
      poorPercentage: z.number().min(0).max(100).optional(),
      offroadPercentage: z.number().min(0).max(100).optional(),
      description: z.string().optional(),
      seasonalChanges: z.string().optional(),
    })
    .optional(),
  fuelAvailability: z
    .object({
      hasStations: z.boolean(),
      stationsDescription: z.string().optional(),
      recommendedStops: z.array(z.string()).optional(),
      note: z.string().optional(),
    })
    .optional(),
  checkpoints: z.array(checkpointSchema).optional(),
  warnings: z.array(z.string()).optional(),
  alternativeRoutes: z.array(alternativeRouteSchema).optional(),
})

const permitSchema = z.object({
  name: z.string().min(1, "Permit name is required"),
  cost: z.string().optional(),
  where: z.string().optional(),
})

const trekSchema = z.object({
  trekName: z.string().optional(),
  startingPoint: z.string().min(1, "Starting point is required"),
  duration: z
    .object({
      roundTrip: z.string().optional(),
      oneWay: z.string().optional(),
    })
    .optional(),
  difficulty: z.enum(["Easy", "Moderate", "Challenging", "Difficult", "Extreme"]).optional(),
  elevation: z
    .object({
      start: z.number().optional(),
      max: z.number().optional(),
      gain: z.number().optional(),
    })
    .optional(),
  permits: z.array(permitSchema).optional(),
  teahouses: z.boolean().optional(),
  bestSeason: z.array(z.string()).optional(),
  highlights: z.array(z.string()).optional(),
  packingList: z.array(z.string()).optional(),
  safetyTips: z.array(z.string()).optional(),
})

const routeFormSchema = z
  .object({
    routeType: z.enum(["public-transport", "personal-vehicle", "trek"]),
    publicTransport: publicTransportSchema.optional(),
    personalVehicle: personalVehicleSchema.optional(),
    trek: trekSchema.optional(),
  })
  .refine(
    (data) => {
      if (data.routeType === "public-transport" && !data.publicTransport) {
        return false
      }
      if (data.routeType === "personal-vehicle" && !data.personalVehicle) {
        return false
      }
      if (data.routeType === "trek" && !data.trek) {
        return false
      }
      return true
    },
    {
      message: "Route data is required for the selected route type",
    },
  )

type RouteFormValues = z.infer<typeof routeFormSchema>

export default function RouteForm() {
  const [routeType, setRouteType] = useState<"public-transport" | "personal-vehicle" | "trek">("public-transport")

  const form = useForm<RouteFormValues>({
    resolver: zodResolver(routeFormSchema),
    defaultValues: {
      routeType: "public-transport",
      publicTransport: {
        from: "",
        to: "",
        options: [{ vehicleType: "Local Bus" }],
        landmarks: [],
      },
      personalVehicle: {
        recommendedRoute: "",
        fuelAvailability: { hasStations: true },
        checkpoints: [],
        warnings: [],
        alternativeRoutes: [],
      },
      trek: {
        startingPoint: "",
        permits: [],
        bestSeason: [],
        highlights: [],
        packingList: [],
        safetyTips: [],
      },
    },
  })

  const {
    fields: transportOptions,
    append: addTransportOption,
    remove: removeTransportOption,
  } = useFieldArray({
    control: form.control,
    name: "publicTransport.options",
  })

  const {
    fields: checkpoints,
    append: addCheckpoint,
    remove: removeCheckpoint,
  } = useFieldArray({
    control: form.control,
    name: "personalVehicle.checkpoints",
  })

  const {
    fields: permits,
    append: addPermit,
    remove: removePermit,
  } = useFieldArray({
    control: form.control,
    name: "trek.permits",
  })

  const onSubmit = (values: RouteFormValues) => {
    console.log(values)
    // Handle form submission here
  }

  const handleRouteTypeChange = (type: "public-transport" | "personal-vehicle" | "trek") => {
    setRouteType(type)
    form.setValue("routeType", type)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Add New Route</h1>
        <p className="text-muted-foreground">Create a comprehensive route guide for travelers</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Route Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Route Type</CardTitle>
              <CardDescription>Select the type of route you want to add</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card
                  className={`cursor-pointer transition-all ${routeType === "public-transport" ? "ring-2 ring-primary" : ""}`}
                  onClick={() => handleRouteTypeChange("public-transport")}
                >
                  <CardContent className="flex flex-col items-center p-6">
                    <Bus className="h-8 w-8 mb-2" />
                    <h3 className="font-semibold">Public Transport</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Buses, microbuses, and other public vehicles
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer transition-all ${routeType === "personal-vehicle" ? "ring-2 ring-primary" : ""}`}
                  onClick={() => handleRouteTypeChange("personal-vehicle")}
                >
                  <CardContent className="flex flex-col items-center p-6">
                    <Car className="h-8 w-8 mb-2" />
                    <h3 className="font-semibold">Personal Vehicle</h3>
                    <p className="text-sm text-muted-foreground text-center">Car, motorcycle, or private transport</p>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer transition-all ${routeType === "trek" ? "ring-2 ring-primary" : ""}`}
                  onClick={() => handleRouteTypeChange("trek")}
                >
                  <CardContent className="flex flex-col items-center p-6">
                    <Mountain className="h-8 w-8 mb-2" />
                    <h3 className="font-semibold">Trek</h3>
                    <p className="text-sm text-muted-foreground text-center">Hiking and trekking routes</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Public Transport Form */}
          {routeType === "public-transport" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bus className="h-5 w-5" />
                  Public Transport Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="publicTransport.from"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>From *</FormLabel>
                        <FormControl>
                          <Input placeholder="Starting point (e.g., Kathmandu)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="publicTransport.to"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>To *</FormLabel>
                        <FormControl>
                          <Input placeholder="Destination (e.g., Pokhara)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="publicTransport.routeName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Route Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Kathmandu-Pokhara Highway" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Transport Options</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addTransportOption({ vehicleType: "Local Bus" })}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Option
                    </Button>
                  </div>

                  {transportOptions.map((field, index) => (
                    <Card key={field.id}>
                      <CardContent className="p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">Option {index + 1}</Badge>
                          {transportOptions.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeTransportOption(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`publicTransport.options.${index}.vehicleType`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Vehicle Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Local Bus">Local Bus</SelectItem>
                                    <SelectItem value="Deluxe Bus">Deluxe Bus</SelectItem>
                                    <SelectItem value="Microbus">Microbus</SelectItem>
                                    <SelectItem value="Hiace">Hiace</SelectItem>
                                    <SelectItem value="Tourist Bus">Tourist Bus</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`publicTransport.options.${index}.frequency`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Frequency</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., Every 30 minutes" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`publicTransport.options.${index}.duration`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Duration</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., 6-8 hours" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`publicTransport.options.${index}.fareRange`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Fare Range</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., Rs. 800-1500" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name={`publicTransport.options.${index}.booking`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Booking Information</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., On spot, Advance booking at Gongabu Bus Park" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`publicTransport.options.${index}.note`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Additional Notes</FormLabel>
                              <FormControl>
                                <Textarea placeholder="e.g., Deluxe buses more comfortable but costlier" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Personal Vehicle Form */}
          {routeType === "personal-vehicle" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Personal Vehicle Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="personalVehicle.recommendedRoute"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recommended Route *</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe the recommended route..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="personalVehicle.distance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Distance (km)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g., 200"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="personalVehicle.approxTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Approximate Time</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 5-6 hours" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Road Conditions</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <FormField
                      control={form.control}
                      name="personalVehicle.roadConditions.goodPercentage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Good (%)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              {...field}
                              onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="personalVehicle.roadConditions.fairPercentage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fair (%)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              {...field}
                              onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="personalVehicle.roadConditions.poorPercentage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Poor (%)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              {...field}
                              onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="personalVehicle.roadConditions.offroadPercentage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Off-road (%)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              {...field}
                              onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="personalVehicle.roadConditions.description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Road Conditions Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., First 50km is excellent, then 30km rough section" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Fuel Availability</h3>
                  <FormField
                    control={form.control}
                    name="personalVehicle.fuelAvailability.hasStations"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Fuel stations available along the route</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="personalVehicle.fuelAvailability.stationsDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fuel Stations Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="e.g., Only available in X and Y towns" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Checkpoints</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addCheckpoint({ name: "", type: "Police" })}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Checkpoint
                    </Button>
                  </div>

                  {checkpoints.map((field, index) => (
                    <Card key={field.id}>
                      <CardContent className="p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">Checkpoint {index + 1}</Badge>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeCheckpoint(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`personalVehicle.checkpoints.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Checkpoint Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., Mugling Checkpoint" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`personalVehicle.checkpoints.${index}.type`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Police">Police</SelectItem>
                                    <SelectItem value="Customs">Customs</SelectItem>
                                    <SelectItem value="Toll">Toll</SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name={`personalVehicle.checkpoints.${index}.note`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Note</FormLabel>
                              <FormControl>
                                <Textarea placeholder="Additional information about this checkpoint" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Trek Form */}
          {routeType === "trek" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mountain className="h-5 w-5" />
                  Trek Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="trek.trekName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trek Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Everest Base Camp Trek" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="trek.startingPoint"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Starting Point *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Lukla" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="trek.duration.roundTrip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Round Trip Duration</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 12-14 days" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="trek.duration.oneWay"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>One Way Duration</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 7 days to EBC" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="trek.difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty level" />
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
                    </FormItem>
                  )}
                />

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Elevation Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="trek.elevation.start"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Starting Elevation (m)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g., 2860"
                              {...field}
                              onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="trek.elevation.max"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum Elevation (m)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g., 5545"
                              {...field}
                              onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="trek.elevation.gain"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Elevation Gain (m)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g., 2685"
                              {...field}
                              onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Permits Required</h3>
                    <Button type="button" variant="outline" size="sm" onClick={() => addPermit({ name: "" })}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Permit
                    </Button>
                  </div>

                  {permits.map((field, index) => (
                    <Card key={field.id}>
                      <CardContent className="p-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">Permit {index + 1}</Badge>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removePermit(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`trek.permits.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Permit Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., TIMS, Sagarmatha NP Entry" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`trek.permits.${index}.cost`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Cost</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., Rs. 3000 for foreigners" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name={`trek.permits.${index}.where`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Where to Obtain</FormLabel>
                              <FormControl>
                                <Textarea placeholder="e.g., Can be obtained in Kathmandu or Monjo" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <FormField
                  control={form.control}
                  name="trek.teahouses"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Teahouses available along the route</FormLabel>
                        <FormDescription>Check if accommodation is available in teahouses</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">
              <MapPin className="h-4 w-4 mr-2" />
              Add Route
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
