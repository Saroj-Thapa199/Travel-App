"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Mountain,
  Camera,
  MountainIcon as Hiking,
  Users,
  Star,
  Tent,
  Waves,
  Building,
  Heart,
  Shield,
  TelescopeIcon as Binoculars,
  Fish,
  Bird,
  Flower,
  Landmark,
  Church,
  Castle,
  Palette,
  Music,
  Coffee,
  Activity,
  Bike,
  Snowflake,
  Plane,
  Car,
  TreePine,
  ShoppingBag,
  Gamepad2,
  BookOpen,
} from "lucide-react"

interface DestinationOverviewProps {
  name: string
  region: string
  shortDescription: string
  longDescription: string
  image?: string
  activities?: string[]
  highlights?: Array<{
    title: string
    description: string
  }>
}

// Smart icon mapping for activities based on keywords
const getActivityIcon = (activity: string) => {
  const activityLower = activity.toLowerCase()

  // Keyword-based icon mapping
  if (activityLower.includes("trek") || activityLower.includes("hik")) return Hiking
  if (activityLower.includes("photo")) return Camera
  if (activityLower.includes("camp")) return Tent
  if (activityLower.includes("mountain") || activityLower.includes("climb")) return Mountain
  if (activityLower.includes("water") || activityLower.includes("swim") || activityLower.includes("surf")) return Waves
  if (activityLower.includes("cultural") || activityLower.includes("tour")) return Users
  if (activityLower.includes("wildlife") || activityLower.includes("safari")) return Binoculars
  if (activityLower.includes("fish")) return Fish
  if (activityLower.includes("bird")) return Bird
  if (activityLower.includes("food") || activityLower.includes("cuisine")) return Coffee
  if (activityLower.includes("adventure") || activityLower.includes("sport")) return Shield
  if (activityLower.includes("bike") || activityLower.includes("cycling")) return Bike
  if (activityLower.includes("ski") || activityLower.includes("snow")) return Snowflake
  if (activityLower.includes("paraglid") || activityLower.includes("fly")) return Plane
  if (activityLower.includes("drive") || activityLower.includes("road")) return Car
  if (activityLower.includes("nature") || activityLower.includes("forest")) return TreePine
  if (activityLower.includes("shop")) return ShoppingBag
  if (activityLower.includes("night") || activityLower.includes("party")) return Gamepad2
  if (activityLower.includes("museum") || activityLower.includes("historical")) return BookOpen
  if (activityLower.includes("meditat") || activityLower.includes("spiritual")) return Heart
  if (activityLower.includes("art") || activityLower.includes("paint")) return Palette
  if (activityLower.includes("music") || activityLower.includes("concert")) return Music
  if (activityLower.includes("church") || activityLower.includes("temple") || activityLower.includes("religious"))
    return Church
  if (activityLower.includes("castle") || activityLower.includes("fort")) return Castle
  if (activityLower.includes("garden") || activityLower.includes("flower")) return Flower
  if (activityLower.includes("landmark") || activityLower.includes("monument")) return Landmark
  if (activityLower.includes("building") || activityLower.includes("architect")) return Building
  if (activityLower.includes("sight")) return Star

  // Default icon for unmatched activities
  return Activity
}

const DestinationOverview = ({
  name,
  region,
  shortDescription,
  longDescription,
  activities = [],
  highlights = [],
}: DestinationOverviewProps) => {
  // Default highlights if none provided
  const defaultHighlights = [
    {
      title: "Scenic Mountain Views",
      description:
        "Breathtaking panoramic views of snow-capped peaks that stretch as far as the eye can see, offering perfect photo opportunities and moments of tranquility.",
    },
    {
      title: "Photography Paradise",
      description:
        "Every corner offers a new perspective with dramatic landscapes, unique rock formations, and golden hour lighting that creates magical moments for photographers of all levels.",
    },
    {
      title: "Trekking Adventures",
      description:
        "Well-maintained trails wind through diverse terrain, from gentle slopes perfect for beginners to challenging routes that reward experienced hikers with incredible vistas.",
    },
    {
      title: "Cultural Immersion",
      description:
        "Experience authentic local traditions, interact with welcoming communities, and discover centuries-old customs that have been preserved through generations.",
    },
  ]

  // Default activities if none provided
  const defaultActivities = ["Trekking", "Photography", "Sightseeing", "Cultural Tours", "Nature Walks"]

  const displayHighlights = highlights.length > 0 ? highlights : defaultHighlights
  const displayActivities = activities.length > 0 ? activities : defaultActivities

  return (
    <div className="space-y-8">
      {/* About Section */}
      <div>
        <h2 className="mb-4 text-2xl font-bold">About {name}</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Badge variant="outline" className="gap-1">
              📍 {region}
            </Badge>
          </div>
          <p className="text-lg leading-relaxed">{shortDescription}</p>
          <p className="text-muted-foreground leading-relaxed">{longDescription}</p>
        </div>
      </div>

      <Separator />

      {/* Key Highlights - Numbered Design */}
      <div>
        <h3 className="mb-6 text-xl font-bold flex items-center gap-2">
          <Star className="h-6 w-6 text-primary" />
          What Makes This Place Special
        </h3>
        <div className="space-y-4">
          {displayHighlights.map((highlight, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors border-l-4 border-l-primary/30"
            >
              <div className="rounded-full bg-primary text-primary-foreground p-2 flex-shrink-0 w-8 h-8 flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="font-semibold text-base">{highlight.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{highlight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Activities & Experiences - Smart Icon Mapping */}
      <div>
        <h3 className="mb-6 text-xl font-bold flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          Activities & Experiences
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayActivities.map((activity, index) => {
            const IconComponent = getActivityIcon(activity)
            return (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-4 text-center">
                  <div className="mb-3 flex justify-center">
                    <div className="rounded-full bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <h4 className="font-medium group-hover:text-primary transition-colors text-sm">{activity}</h4>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Quick Info Cards */}
      <div>
        <h3 className="mb-6 text-xl font-bold">Quick Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="mb-3 flex justify-center">
                <div className="rounded-full bg-blue-100 p-3">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <h4 className="font-semibold mb-1">Perfect For</h4>
              <p className="text-sm text-muted-foreground">Adventure seekers, nature lovers, photographers</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="mb-3 flex justify-center">
                <div className="rounded-full bg-green-100 p-3">
                  <Mountain className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <h4 className="font-semibold mb-1">Experience Level</h4>
              <p className="text-sm text-muted-foreground">Suitable for all experience levels</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="mb-3 flex justify-center">
                <div className="rounded-full bg-purple-100 p-3">
                  <Heart className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <h4 className="font-semibold mb-1">Best Feature</h4>
              <p className="text-sm text-muted-foreground">Stunning natural beauty and cultural richness</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DestinationOverview
