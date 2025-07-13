"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { X, Car, Mountain, MapPin, ArrowRight } from "lucide-react"
import { useState } from "react"
import { RouteSegmentSearch } from "./route-segment-search"
import { MotorableRouteForm } from "./motorable-route-form"
import { TrekRouteForm } from "./trek-route-form"
import { MotorableRouteType, routeSchema, RouteType, TrekRouteType } from "@/lib/RouteValidation"

// Mock data for existing routes
const mockMotorableRoutes: MotorableRouteType[] = [
  {
    _id: "1",
    from: "Kathmandu",
    to: "Pokhara",
    distance: 200,
    duration: "6-7 hours",
    availableServices: ["Tourist Bus", "Deluxe Bus"],
    fareRange: "NPR 800-1500",
    route: "Via Prithvi Highway",
    roadCondition: { type: "Good" },
    fuelAvailability: { hasStations: true },
  },
  {
    _id: "2",
    from: "Pokhara",
    to: "Jomsom",
    distance: 150,
    duration: "8-10 hours",
    availableServices: ["Jeep", "Local Bus"],
    fareRange: "NPR 2000-3000",
    route: "Via Beni and Tatopani",
    roadCondition: { type: "Fair" },
    fuelAvailability: { hasStations: false },
  },
  {
    _id: "3",
    from: "Kathmandu",
    to: "Chitwan",
    distance: 180,
    duration: "5-6 hours",
    availableServices: ["Tourist Bus", "Local Bus"],
    fareRange: "NPR 600-1200",
    route: "Via Mugling",
    roadCondition: { type: "Good" },
    fuelAvailability: { hasStations: true },
  },
]

const mockTrekRoutes: TrekRouteType[] = [
  {
    _id: "4",
    trekName: "Everest Base Camp Trek",
    startingPoint: "Lukla",
    difficulty: "Challenging",
    teahouses: true,
  },
  {
    _id: "5",
    trekName: "Annapurna Circuit Trek",
    startingPoint: "Besisahar",
    difficulty: "Moderate",
    teahouses: true,
  },
  {
    _id: "6",
    trekName: "Langtang Valley Trek",
    startingPoint: "Syabrubesi",
    difficulty: "Moderate",
    teahouses: true,
  },
]

export function RouteForm() {
  const [selectedMotorableRoutes, setSelectedMotorableRoutes] = useState<MotorableRouteType[]>([])
  const [selectedTrekRoutes, setSelectedTrekRoutes] = useState<TrekRouteType[]>([])
  const [motorableRoutes, setMotorableRoutes] = useState<MotorableRouteType[]>(mockMotorableRoutes)
  const [trekRoutes, setTrekRoutes] = useState<TrekRouteType[]>(mockTrekRoutes)

  const [showMotorableForm, setShowMotorableForm] = useState(false)
  const [showTrekForm, setShowTrekForm] = useState(false)
  const [motorableSearchQuery, setMotorableSearchQuery] = useState("")
  const [trekSearchQuery, setTrekSearchQuery] = useState("")

  const form = useForm<RouteType>({
    resolver: zodResolver(routeSchema),
    defaultValues: {
      _id: crypto.randomUUID(),
      destination: "",
    },
  })

  const handleSubmit = (data: RouteType) => {
    const finalData = {
      ...data,
      motorableRoute: selectedMotorableRoutes.length > 0 ? selectedMotorableRoutes.map((r) => r._id) : undefined,
      trekRoute: selectedTrekRoutes.length > 0 ? selectedTrekRoutes.map((r) => r._id) : undefined,
    }

    console.log("Route submitted:", finalData)
    console.log("Selected motorable routes:", selectedMotorableRoutes)
    console.log("Selected trek routes:", selectedTrekRoutes)
    // Here you would typically send the data to your API
  }

  const handleMotorableRouteCreated = (newRoute: MotorableRouteType) => {
    setMotorableRoutes([...motorableRoutes, newRoute])
    setSelectedMotorableRoutes([...selectedMotorableRoutes, newRoute])
    setShowMotorableForm(false)
    setMotorableSearchQuery("")
  }

  const handleTrekRouteCreated = (newRoute: TrekRouteType) => {
    setTrekRoutes([...trekRoutes, newRoute])
    setSelectedTrekRoutes([...selectedTrekRoutes, newRoute])
    setShowTrekForm(false)
    setTrekSearchQuery("")
  }

  const handleMotorableSegmentSelect = (segment: MotorableRouteType | TrekRouteType) => {
    const motorableSegment = segment as MotorableRouteType
    if (!selectedMotorableRoutes.find((r) => r._id === motorableSegment._id)) {
      setSelectedMotorableRoutes([...selectedMotorableRoutes, motorableSegment])
    }
  }

  const handleTrekSegmentSelect = (segment: MotorableRouteType | TrekRouteType) => {
    const trekSegment = segment as TrekRouteType
    if (!selectedTrekRoutes.find((r) => r._id === trekSegment._id)) {
      setSelectedTrekRoutes([...selectedTrekRoutes, trekSegment])
    }
  }

  const removeMotorableRoute = (routeId: string) => {
    setSelectedMotorableRoutes((prev) => prev.filter((r) => r._id !== routeId))
  }

  const removeTrekRoute = (routeId: string) => {
    setSelectedTrekRoutes((prev) => prev.filter((r) => r._id !== routeId))
  }

  const handleCreateMotorableRoute = (searchQuery: string) => {
    setMotorableSearchQuery(searchQuery)
    setShowMotorableForm(true)
  }

  const handleCreateTrekRoute = (searchQuery: string) => {
    setTrekSearchQuery(searchQuery)
    setShowTrekForm(true)
  }

  if (showMotorableForm) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <MotorableRouteForm
          onSubmit={handleMotorableRouteCreated}
          onCancel={() => {
            setShowMotorableForm(false)
            setMotorableSearchQuery("")
          }}
          initialFromTo={motorableSearchQuery}
        />
      </div>
    )
  }

  if (showTrekForm) {
    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <TrekRouteForm
          onSubmit={handleTrekRouteCreated}
          onCancel={() => {
            setShowTrekForm(false)
            setTrekSearchQuery("")
          }}
          initialQuery={trekSearchQuery}
        />
      </div>
    )
  }

  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-6 w-6" />
            Create New Route
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Car className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">Motorable Route Segments</h3>
                  </div>

                  <RouteSegmentSearch
                    type="motorable"
                    onSegmentSelect={handleMotorableSegmentSelect}
                    onCreateNew={handleCreateMotorableRoute}
                    selectedSegments={selectedMotorableRoutes.map((r) => r._id)}
                    availableSegments={motorableRoutes}
                  />

                  {selectedMotorableRoutes.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-muted-foreground">Selected Motorable Routes</h4>
                      <div className="space-y-2">
                        {selectedMotorableRoutes.map((route, index) => (
                          <div key={route._id} className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
                                {index + 1}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{route.from}</span>
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{route.to}</span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {route.distance}km • {route.duration} • {route.fareRange}
                              </p>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeMotorableRoute(route._id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Mountain className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">Trek Route Segments</h3>
                  </div>

                  <RouteSegmentSearch
                    type="trek"
                    onSegmentSelect={handleTrekSegmentSelect}
                    onCreateNew={handleCreateTrekRoute}
                    selectedSegments={selectedTrekRoutes.map((r) => r._id)}
                    availableSegments={trekRoutes}
                  />

                  {selectedTrekRoutes.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-muted-foreground">Selected Trek Routes</h4>
                      <div className="space-y-2">
                        {selectedTrekRoutes.map((route, index) => (
                          <div key={route._id} className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium">
                                {index + 1}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{route.trekName}</div>
                              <p className="text-sm text-muted-foreground">
                                Starting from: {route.startingPoint} • {route.difficulty}
                              </p>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeTrekRoute(route._id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={selectedMotorableRoutes.length === 0 && selectedTrekRoutes.length === 0}
                >
                  Create Route
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Route Summary */}
      {(selectedMotorableRoutes.length > 0 || selectedTrekRoutes.length > 0) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Route Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedMotorableRoutes.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-3 flex items-center gap-2">
                    <Car className="h-4 w-4" />
                    MOTORABLE ROUTE SEGMENTS ({selectedMotorableRoutes.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMotorableRoutes.map((route, index) => (
                      <Badge key={route._id} variant="secondary" className="flex items-center gap-1">
                        <span className="text-xs">{index + 1}.</span>
                        {route.from} → {route.to}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedTrekRoutes.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-3 flex items-center gap-2">
                    <Mountain className="h-4 w-4" />
                    TREK ROUTE SEGMENTS ({selectedTrekRoutes.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTrekRoutes.map((route, index) => (
                      <Badge key={route._id} variant="secondary" className="flex items-center gap-1">
                        <span className="text-xs">{index + 1}.</span>
                        {route.trekName}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
