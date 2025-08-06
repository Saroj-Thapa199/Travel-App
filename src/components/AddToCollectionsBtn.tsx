"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Plus, BookmarkPlus, Check, Loader2, Search, Globe, Lock, FolderPlus, X } from 'lucide-react'
import { ScrollArea } from "./ui/scroll-area"
import { Skeleton } from "./ui/skeleton"
import { UnPopulatedCollectionsResponse } from "@/lib/types"

type AddToCollectionsBtnProps = {
  destinationId: string
}

const AddToCollectionsBtn = ({ destinationId }: AddToCollectionsBtnProps) => {
  const { status, data: sessionData } = useSession()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [processingCollections, setProcessingCollections] = useState<string[]>([])

  // New collection form state
  const [newCollectionName, setNewCollectionName] = useState("")
  const [newCollectionDescription, setNewCollectionDescription] = useState("")
  const [newCollectionVisibility, setNewCollectionVisibility] = useState<"public" | "private">("public")
  const [isCreatingCollection, setIsCreatingCollection] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ["user", sessionData?.user.id, "collections", "names"],
    queryFn: async () => {
      console.log("queryFn called")
      const { data } = await axios.get<UnPopulatedCollectionsResponse>("/api/collections/all/names")
      return data
    },
    enabled: status === "authenticated" && !!sessionData?.user.id,
  })

  // Filter collections based on search
  const filteredCollections = data?.filter((collection) =>
    collection.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Check if destination is already in collection
  const isDestinationInCollection = (collectionId: string) => {
    const collection = data?.find(c => c._id === collectionId)
    return collection?.destinations.includes(destinationId) || false
  }

  const handleCollectionToggle = async (collectionId: string, event: React.MouseEvent) => {
    // Prevent dropdown from closing
    event.preventDefault()
    event.stopPropagation()

    if (processingCollections.includes(collectionId)) return

    setProcessingCollections(prev => [...prev, collectionId])

    try {
      const isCurrentlyInCollection = isDestinationInCollection(collectionId)
      
      if (isCurrentlyInCollection) {
        // Remove from collection
        console.log("Removing destination", destinationId, "from collection:", collectionId)
        // Add your remove logic here
        // await removeFromCollection(collectionId, destinationId)
      } else {
        // Add to collection
        console.log("Adding destination", destinationId, "to collection:", collectionId)
        // Add your add logic here
        // await addToCollection(collectionId, destinationId)
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // You would typically refetch the query here or update it optimistically
      // queryClient.invalidateQueries(["user", sessionData?.user.id, "collections", "names"])

    } catch (error) {
      console.error("Failed to toggle collection:", error)
    } finally {
      setProcessingCollections(prev => prev.filter(id => id !== collectionId))
    }
  }

  const handleCreateCollection = async () => {
    if (!newCollectionName.trim()) return

    setIsCreatingCollection(true)
    try {
      // Add your logic here to create new collection and add destination
      console.log("Creating collection:", {
        name: newCollectionName,
        description: newCollectionDescription,
        visibility: newCollectionVisibility,
        destinationId,
      })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Reset form and close modal
      setNewCollectionName("")
      setNewCollectionDescription("")
      setNewCollectionVisibility("public")
      setIsCreateModalOpen(false)
      setIsDropdownOpen(false)
    } catch (error) {
      console.error("Failed to create collection:", error)
    } finally {
      setIsCreatingCollection(false)
    }
  }

  if (status !== "authenticated") {
    return (
      <Button disabled className="w-full">
        <BookmarkPlus className="h-4 w-4" />
        Add To Collection
      </Button>
    )
  }

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button className="w-full">
            <BookmarkPlus className="h-4 w-4" />
            Add To Collection
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-80 max-w-full" 
          align="start" 
          side="top"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <DropdownMenuLabel className="flex items-center justify-between">
            <span>Add to Collection</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 gap-1 px-2 text-xs"
              onClick={() => setIsCreateModalOpen(true)}
            >
              <Plus className="h-3 w-3" />
              New
            </Button>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* Search */}
          <div className="p-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 pl-8"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Collections List */}
          <ScrollArea className="max-h-64">
            <div className="p-1">
              {isLoading ? (
                <div className="space-y-2 p-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 flex-1" />
                    </div>
                  ))}
                </div>
              ) : filteredCollections && filteredCollections.length > 0 ? (
                filteredCollections.map((collection) => {
                  const isInCollection = isDestinationInCollection(collection._id)
                  const isProcessing = processingCollections.includes(collection._id)
                  
                  return (
                    <DropdownMenuItem
                      key={collection._id}
                      className="flex cursor-pointer items-center justify-between p-2 focus:bg-accent"
                      onClick={(e) => handleCollectionToggle(collection._id, e)}
                      onSelect={(e) => e.preventDefault()}
                    >
                      <div className="flex items-center space-x-2">
                        <div
                          className={`flex h-4 w-4 items-center justify-center rounded border-2 transition-colors ${
                            isInCollection
                              ? "border-primary bg-primary"
                              : "border-muted-foreground hover:border-primary"
                          }`}
                        >
                          {isProcessing ? (
                            <Loader2 className="h-3 w-3 animate-spin text-primary-foreground" />
                          ) : isInCollection ? (
                            <Check className="h-3 w-3 text-primary-foreground" />
                          ) : null}
                        </div>
                        <span className="truncate text-sm">{collection.name}</span>
                      </div>
                      <div className="flex items-center">
                        {collection.visibility === "public" ? (
                          <Globe className="h-3 w-3 text-muted-foreground" />
                        ) : (
                          <Lock className="h-3 w-3 text-muted-foreground" />
                        )}
                      </div>
                    </DropdownMenuItem>
                  )
                })
              ) : (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  {searchQuery ? "No collections found" : "No collections yet"}
                </div>
              )}
            </div>
          </ScrollArea>
          
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Create New Collection Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FolderPlus className="h-5 w-5" />
              Create New Collection
            </DialogTitle>
            <DialogDescription>
              Create a new collection and add this destination to it.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Collection Name */}
            <div className="space-y-2">
              <Label htmlFor="collection-name">Collection Name *</Label>
              <Input
                id="collection-name"
                placeholder="e.g., Beach Paradise, Mountain Adventures"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="collection-description">Description (Optional)</Label>
              <Textarea
                id="collection-description"
                placeholder="Describe what makes this collection special..."
                rows={3}
                value={newCollectionDescription}
                onChange={(e) => setNewCollectionDescription(e.target.value)}
              />
            </div>

            {/* Privacy Settings */}
            <div className="space-y-3">
              <Label>Privacy Settings</Label>
              <RadioGroup
                value={newCollectionVisibility}
                onValueChange={(value: "public" | "private") => setNewCollectionVisibility(value)}
                className="grid grid-cols-2 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="public" />
                  <Label htmlFor="public" className="flex cursor-pointer items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <div>
                      <p className="font-medium">Public</p>
                      <p className="text-xs text-muted-foreground">Anyone can view</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="private" />
                  <Label htmlFor="private" className="flex cursor-pointer items-center gap-2">
                    <Lock className="h-4 w-4" />
                    <div>
                      <p className="font-medium">Private</p>
                      <p className="text-xs text-muted-foreground">Only you can view</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateCollection}
              disabled={!newCollectionName.trim() || isCreatingCollection}
              className="gap-2"
            >
              {isCreatingCollection ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              Create & Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddToCollectionsBtn
