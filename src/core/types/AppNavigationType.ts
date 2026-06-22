import { Events } from "../../domain/model/Events";
import { Host } from "../../domain/model/Host";

export type MainStackParamList = {
  Tabs: undefined;
  EventDetails: { event: Events };
  HostDetails: { host: Host };
};

export type RootTabParamList = {
  Discover: undefined;
  MyEvents: undefined;
};