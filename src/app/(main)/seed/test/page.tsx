"use client"

import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Badge } from "@/components/ui/badge"
import { Plus, X, MapPin, Camera, Star, ImageIcon, CheckCircle, ExternalLink, Activity } from "lucide-react"
import Image from "next/image"

// Validation utilities
const requiredString = (message?: string) => {
  return z
    .string()
    .trim()
    .min(1, message || "Required")
}

// Destination schema - removed icon from highlights
const destinationSchema = z.object({
  name: requiredString("Destination name is required"),
  region: requiredString("Region is required"),
  shortDescription: requiredString("Short description is required")
    .min(50, "Short description must be at least 50 characters")
    .max(200, "Short description must not exceed 200 characters"),
  longDescription: requiredString("Long description is required").min(
    200,
    "Long description must be at least 200 characters",
  ),
  image: z.string().url("Invalid image URL"),
  activities: z.array(z.string()).min(1, "At least one activity is required"),
  highlights: z
    .array(
      z.object({
        title: requiredString("Highlight title is required"),
        description: requiredString("Highlight description is required"),
      }),
    )
    .min(3, "At least 3 highlights are required")
    .max(8, "Maximum 8 highlights allowed"),
})

type CreateDestinationType = z.infer<typeof destinationSchema>

// Predefined activities with suggested icons (for frontend mapping)
const predefinedActivities = [
  "Trekking",
  "Hiking",
  "Photography",
  "Camping",
  "Sightseeing",
  "Cultural Tours",
  "Adventure Sports",
  "Wildlife Watching",
  "Meditation",
  "Rock Climbing",
  "Paragliding",
  "River Rafting",
  "Mountain Biking",
  "Skiing",
  "Snowboarding",
  "Surfing",
  "Diving",
  "Snorkeling",
  "Fishing",
  "Bird Watching",
  "Nature Walks",
  "Food Tours",
  "Shopping",
  "Nightlife",
  "Museums",
  "Historical Sites",
]

const AddDestinationForm = () => {
  const [imageError, setImageError] = useState(false)
  const [isValidatingUrl, setIsValidatingUrl] = useState(false)
  const [urlValidation, setUrlValidation] = useState({ isValid: false, isUrl: false })
  const [customActivity, setCustomActivity] = useState("")
  const [selectedActivities, setSelectedActivities] = useState<string[]>([])

  const form = useForm<CreateDestinationType>({
    resolver: zodResolver(destinationSchema),
    defaultValues: {
      name: "",
      region: "",
      shortDescription: "",
      longDescription: "",
      image: "",
      activities: [],
      highlights: [{ title: "", description: "" }],
    },
  })

  const {
    fields: highlightFields,
    append: appendHighlight,
    remove: removeHighlight,
  } = useFieldArray({
    control: form.control,
    name: "highlights",
  })

  const imageValue = form.watch("image")

  // Handle adding custom activity
  const addCustomActivity = () => {
    if (customActivity.trim() && !selectedActivities.includes(customActivity.trim())) {
      const newActivities = [...selectedActivities, customActivity.trim()]
      setSelectedActivities(newActivities)
      form.setValue("activities", newActivities)
      setCustomActivity("")
    }
  }

  // Handle removing activity
  const removeActivity = (activity: string) => {
    const newActivities = selectedActivities.filter((a) => a !== activity)
    setSelectedActivities(newActivities)
    form.setValue("activities", newActivities)
  }

  // Handle predefined activity toggle
  const togglePredefinedActivity = (activity: string, checked: boolean) => {
    let newActivities
    if (checked) {
      newActivities = [...selectedActivities, activity]
    } else {
      newActivities = selectedActivities.filter((a) => a !== activity)
    }
    setSelectedActivities(newActivities)
    form.setValue("activities", newActivities)
  }

  // Simple URL validation
  const validateImageUrl = async (url: string) => {
    if (!url || url.trim() === "") return { isValid: false, isUrl: false }

    const trimmedUrl = url.trim()

    try {
      new URL(trimmedUrl)
    } catch {
      return { isValid: false, isUrl: false }
    }

    setIsValidatingUrl(true)
    try {
      await new Promise((resolve, reject) => {
        const img = new window.Image()
        img.crossOrigin = "anonymous"
        img.onload = resolve
        img.onerror = reject
        img.src = trimmedUrl
      })
      setIsValidatingUrl(false)
      return { isValid: true, isUrl: true }
    } catch {
      setIsValidatingUrl(false)
      return { isValid: false, isUrl: true }
    }
  }

  // Validate URL when image value changes
  useState(() => {
    const validateUrl = async () => {
      if (imageValue) {
        const validation = await validateImageUrl(imageValue)
        setUrlValidation(validation)
      } else {
        setUrlValidation({ isValid: false, isUrl: false })
      }
    }

    const timeoutId = setTimeout(validateUrl, 500)
    return () => clearTimeout(timeoutId)
  })

  const onSubmit = async (values: CreateDestinationType) => {
    try {
      console.log("Form submitted:", values)
      // Add your API call here
      // await createDestination(values)

      // Show success message
      alert("Destination added successfully!")

      // Reset form
      form.reset()
      setSelectedActivities([])
    } catch (error) {
      console.error("Error creating destination:", error)
      alert("Failed to create destination. Please try again.")
    }
  }

  const getValidationIcon = () => {
    if (!imageValue || imageValue.trim() === "") return null
    if (isValidatingUrl)
      return <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    if (urlValidation.isValid) return <CheckCircle className="h-4 w-4 text-green-500" />
    return <X className="h-4 w-4 text-red-500" />
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Add New Destination</h1>
        <p className="text-muted-foreground">
          Create a comprehensive destination guide with all the essential information travelers need.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destination Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Everest Base Camp" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Region/Location *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Khumbu, Nepal" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="shortDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description *</FormLabel>
                    <FormControl>
                      <Textarea placeholder="A brief, engaging description (50-200 characters)" rows={3} {...field} />
                    </FormControl>
                    <FormDescription>{field.value?.length || 0}/200 characters</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="longDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detailed Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Comprehensive description with all the details travelers need to know"
                        rows={6}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Minimum 200 characters. {field.value?.length || 0} characters</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Image */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Cover Image
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL *</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input type="url" placeholder="https://example.com/image.jpg" className="pr-20" {...field} />
                      </FormControl>
                      <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
                        {getValidationIcon()}
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Image Preview */}
              <div className="relative h-48 w-full overflow-hidden rounded-lg border bg-muted">
                {imageValue && urlValidation.isValid ? (
                  !imageError ? (
                    <Image
                      src={imageValue || "/placeholder.svg"}
                      alt="Destination preview"
                      fill
                      className="object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
                      <ImageIcon className="mb-2 h-8 w-8" />
                      <p className="text-sm font-medium">Failed to load image</p>
                    </div>
                  )
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
                    <ImageIcon className="mb-2 h-8 w-8" />
                    <p className="text-sm font-medium">Image preview</p>
                    <p className="text-xs">Enter a valid image URL above</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Activities - Enhanced with Custom Input */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Available Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Selected Activities Display */}
              {selectedActivities.length > 0 && (
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Selected Activities ({selectedActivities.length})
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedActivities.map((activity) => (
                      <Badge key={activity} variant="secondary" className="gap-1">
                        {activity}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => removeActivity(activity)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Add Custom Activity */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Add Custom Activity</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., Hot Air Ballooning, Cave Exploration"
                    value={customActivity}
                    onChange={(e) => setCustomActivity(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addCustomActivity()
                      }
                    }}
                  />
                  <Button type="button" onClick={addCustomActivity} disabled={!customActivity.trim()}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Predefined Activities */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Popular Activities</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-60 overflow-y-auto border rounded-lg p-3">
                  {predefinedActivities.map((activity) => (
                    <div key={activity} className="flex flex-row items-start space-x-3 space-y-0">
                      <Checkbox
                        checked={selectedActivities.includes(activity)}
                        onCheckedChange={(checked) => togglePredefinedActivity(activity, checked as boolean)}
                      />
                      <Label className="text-sm font-normal cursor-pointer">{activity}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {selectedActivities.length === 0 && (
                <p className="text-sm text-muted-foreground">Please select at least one activity.</p>
              )}
            </CardContent>
          </Card>

          {/* Highlights - Simplified without Icons */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Key Highlights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-base font-medium">Highlights * (3-8 items)</Label>
                <p className="text-sm text-muted-foreground mb-4">
                  What makes this destination special? Add compelling titles and detailed descriptions.
                </p>
                {highlightFields.map((field, index) => (
                  <Card key={field.id} className="p-4 mb-4 border-l-4 border-l-primary">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium flex items-center gap-2">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                            {index + 1}
                          </div>
                          Highlight {index + 1}
                        </h5>
                        {highlightFields.length > 1 && (
                          <Button type="button" variant="outline" size="sm" onClick={() => removeHighlight(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name={`highlights.${index}.title`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title *</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Scenic Mountain Views" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`highlights.${index}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description *</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="e.g., Breathtaking panoramic views of snow-capped peaks that stretch as far as the eye can see, offering perfect photo opportunities and moments of tranquility."
                                  rows={3}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => appendHighlight({ title: "", description: "" })}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Highlight
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => form.reset()}>
              Reset Form
            </Button>
            <Button type="submit" className="min-w-32">
              Create Destination
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default AddDestinationForm
