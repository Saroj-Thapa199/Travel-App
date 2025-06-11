import DestinationHeaderImage from "@/components/DestinationHeaderImage";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { DestinationFormType } from "@/lib/types";

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
      <div className="">
        {/* <Card className="overflow-clip rounded-b-none p-0">
        <CardContent className="p-0">
          <div className="bg-muted relative h-80">
            <div className="absolute inset-0 flex items-center justify-center">
              {destination.image ? (
                <Image
                  src={destination.image}
                  fill
                  sizes="(max-width: 768px) 100vw, 700px"
                  alt="destination-image"
                  className="object-cover"
                />
              ) : (
                <ImageIcon className="text-muted-foreground size-16 opacity-50" />
              )}
            </div>
            <div className="from-primary/60 absolute inset-0 bg-gradient-to-t via-transparent to-transparent"></div>
            <div className="absolute inset-0 flex items-end p-6">
              <div>
                {destination.region && (
                  <Badge className="rounded-full px-2.5">
                    {destination.region}
                  </Badge>
                )}
                <h2 className="text-secondary text-3xl leading-relaxed font-bold">
                  {destination.name}
                </h2>
                <div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 ${index < Math.floor(ratings) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="tex text-secondary ml-2 font-medium">
                      3.6
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card> */}
        <DestinationHeaderImage
          name={destination.name}
          region={destination.region}
          image={destination.image}
          rating={3.9}
          className="rounded-b-none h-80"
        />
      </div>

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
    "No Preview available"
  );
};

export default Preview;
