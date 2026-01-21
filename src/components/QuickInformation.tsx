import React from 'react'
import { Card, CardContent } from './ui/card'
import { Heart, Mountain, Users } from 'lucide-react'

const QuickInformation = () => {
  return (
    <div>
        <h3 className="mb-6 text-xl font-bold">Quick Information</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="mb-3 flex justify-center">
                <div className="rounded-full bg-blue-100 p-3">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <h4 className="mb-1 font-semibold">Perfect For</h4>
              <p className="text-muted-foreground text-sm">
                Adventure seekers, nature lovers, photographers
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="mb-3 flex justify-center">
                <div className="rounded-full bg-green-100 p-3">
                  <Mountain className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <h4 className="mb-1 font-semibold">Experience Level</h4>
              <p className="text-muted-foreground text-sm">
                Suitable for all experience levels
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="mb-3 flex justify-center">
                <div className="rounded-full bg-purple-100 p-3">
                  <Heart className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <h4 className="mb-1 font-semibold">Best Feature</h4>
              <p className="text-muted-foreground text-sm">
                Stunning natural beauty and cultural richness
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
  )
}

export default QuickInformation