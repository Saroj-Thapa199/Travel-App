import { MotorableRouteType, TrekRouteType } from "./validations/routes";
import { ReviewType } from "./validations/review";
import { DestinationType } from "./validations/destination";

export type DestinationFormType = Omit<
  DestinationType,
  | "_id"
  | "user"
  | "favorites"
  | "slug"
  | "createdAt"
  | "updatedAt"
  | "averageRating"
  | "reviewCount"
>;

export type ReviewFormType = Omit<
  ReviewType,
  "_id" | "createdAt" | "updatedAt" | "user" | "destination" 
>;

export type DestinationsPage = {
  destinations: DestinationType[];
  nextCursor: string | null;
};

export type ReviewStatApiResponse = {
  averageRating: number;
  totalCount: number;
  ratings: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
};

export type DestinationPopulatedReviewType = Omit<ReviewType, "destination"> & {
  destination: Pick<DestinationType, "_id" | "name" | "slug">
}

export type DestinationRoute = {
  _id: string;
  destination: string;
  motorableRoute: MotorableRouteType[];
  trekRoute: TrekRouteType[];
};

export type RouteApiResponse = DestinationRoute[];

export type FavoritesInfo = {
  favorites: number;
  addedToFavoritesByUser: boolean;
};

export type CollectionType = {
  _id: string;
  user: string;
  name: string;
  description?: string;
  visibility: "public" | "private";
  destinations: DestinationType[];
  createdAt: string;
  updatedAt: string;
};

export type CollectionsResponse = Array<
  Omit<CollectionType, "destinations"> & {
    destinations: Pick<DestinationType, "_id" | "name" | "region" | "image">[];
  }
>;

export type UnPopulatedCollectionsResponse = {
  _id: string;
  name: string;
  visibility: "public" | "private";
  destinations: string[];
  // user: string;
  // description?: string;
  // createdAt: string;
  // updatedAt: string;
}[];
