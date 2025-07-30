import DestinationHeaderImage from "@/components/DestinationHeaderImage";
import LoadingButton from "@/components/LoadingButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DestinationFormType } from "@/lib/types";
import { ImageIcon, Star } from "lucide-react";
import Image from "next/image";

type PreviewProps = {
  destination: DestinationFormType;
  showPreview: boolean;
  loading: boolean;
  isUploading: boolean;
  submit: () => void;
  setTabToForm: () => void;
};

const Preview = ({
  destination,
  showPreview,
  loading,
  isUploading,
  submit,
  setTabToForm,
}: PreviewProps) => {
  const ratings = 3.3;

  return showPreview ? (
    <section className="space-y-6">
      <Card className={"h-80 overflow-clip rounded-b-none p-0"}>
        <CardContent className="h-full p-0">
          <figure className="bg-muted relative h-full">
            <div className="absolute inset-0 flex items-center justify-center">
              {destination.image ? (
                <Image
                  src={destination.image}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 700px"
                  alt="destination-image"
                  className="object-cover"
                />
              ) : (
                <ImageIcon className="text-muted-foreground size-16 opacity-50" />
              )}
            </div>
            {/* Gradient */}
            <div className="from-primary/60 dark:from-secondary/60 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"></div>
            {/* Informations */}
            <figcaption className="absolute inset-0 flex items-end p-6">
              <div>
                {destination.region && (
                  <Badge className="rounded-full px-2.5 dark:hidden">
                    {destination.region}
                  </Badge>
                )}
                {destination.region && (
                  <Badge
                    variant={"secondary"}
                    className="rounded-full px-2.5 not-dark:hidden"
                  >
                    {destination.region}
                  </Badge>
                )}
                <h2 className="text-secondary dark:text-primary text-xl leading-relaxed font-bold sm:text-2xl md:text-3xl">
                  {destination.name}
                </h2>
                <div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 ${index < Math.round(5) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="text-secondary dark:text-primary ml-2 font-medium">
                      5.0
                    </span>
                    <span className="text-secondary dark:text-primary ml-2 font-medium">
                      •
                    </span>
                    <span className="text-secondary dark:text-primary ml-2 font-medium">
                      No reviews yet
                    </span>
                    <span className="text-secondary dark:text-primary ml-2 font-medium max-sm:hidden">
                      |
                    </span>
                    <span className="text-secondary dark:text-primary ml-2 font-medium max-sm:hidden">
                      {destination.budget || "budget"}
                    </span>
                  </div>
                </div>
              </div>
            </figcaption>
          </figure>
        </CardContent>
      </Card>

      <div className="">
        <div>
          <h2 className="mb-3 text-xl font-semibold">
            About {destination.name}
          </h2>
          <p className="text-muted-foreground mb-4">
            {destination.shortDescription}
          </p>
          <p className="text-muted-foreground">{destination.longDescription}</p>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant={"outline"} onClick={setTabToForm}>
          Edit details
        </Button>
        <LoadingButton
          loading={loading}
          disabled={isUploading}
          onClick={() => {
            console.log("clicked");
            submit();
          }}
        >
          Submit Destination
        </LoadingButton>
      </div>
    </section>
  ) : (
    // "No Preview available"
    "Please fill the form to view preview"
  );
};

export default Preview;
