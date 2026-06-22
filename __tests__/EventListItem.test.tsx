import React from "react";
import renderer, { ReactTestInstance } from "react-test-renderer";
import EventListItem from "../src/presentation/discover/components/EventListItem";
import { Events } from "../src/domain/model/Events";
import { Text } from "react-native";

const mockToggleRSVP = jest.fn();
const mockIsRSVP = jest.fn();

jest.mock("../src/presentation/viewmodels/hooks/useRSVP", () => ({
  useRSVP: () => ({
    isRSVP: mockIsRSVP,
    toggleRSVP: mockToggleRSVP,
  }),
}));

jest.mock("../src/core/hooks/useTheme", () => ({
  useTheme: () => ({
    colors: {
      backgroundSecondary: "#ffffff",
      white: "#ffffff",
      backgroundOverlay: "rgba(0,0,0,0.5)",
      primary: "#000000",
      textPrimary: "#000000",
      textSecondary: "#666666",
      favIconActive: "#ff0000",
      favBorderActive: "#ff0000",
      favIconInactive: "#cccccc",
      favBorderInactive: "#cccccc",
      background: "#ffffff",
      searchIconBackground: "#f2f2f2",
      secondary: "#888888",
    },
  }),
}));

jest.mock("@react-native-vector-icons/ionicons", () => {
  return "Ionicons";
});

type TextNode = string | number | Array<string | number | TextNode>;

function findText(instance: ReactTestInstance, content: string): boolean {
  const textNodes = instance.findAllByType(Text);
  return textNodes.some((node) => {
    const children = node.props.children;
    const values: TextNode[] = Array.isArray(children) ? children.flat(Infinity) : [children];
    return values.some((item) => String(item) === content);
  });
}

const defaultEvent: Events = {
  id: "event-id-1",
  title: "Sample Event",
  description: "A great sample event.",
  date: new Date().toISOString(),
  location: "Test Venue",
  imageUrl: "https://example.com/event.jpg",
  category: "Tech",
  isFeatured: false,
  attendeeCount: 34,
  host: {
    name: "Host Name",
    profileImageUrl: "https://example.com/host.jpg",
    bio: "Host bio",
    isVerified: true,
    location: "Host Location",
    eventOrganised: [],
  },
};

describe("EventListItem", () => {
  beforeEach(() => {
    mockToggleRSVP.mockClear();
    mockIsRSVP.mockClear();
  });

  it("renders event title and attendee count", () => {
    mockIsRSVP.mockReturnValue(false);
    let tree: any;
    renderer.act(() => {
      tree = renderer.create(<EventListItem event={defaultEvent} />);
    });

    expect(findText(tree.root, "Sample Event")).toBe(true);
    expect(findText(tree.root, "34")).toBe(true);
    tree.unmount();
  });

  it("increments displayed attendee count when event is already RSVP'd", () => {
    mockIsRSVP.mockReturnValue(true);
    let tree: any;
    renderer.act(() => {
      tree = renderer.create(<EventListItem event={defaultEvent} />);
    });

    expect(findText(tree.root, "35")).toBe(true);
    tree.unmount();
  });

  it("calls onPress when the card is pressed and toggles RSVP when the heart is pressed", () => {
    mockIsRSVP.mockReturnValue(false);
    const onPress = jest.fn();
    let tree: any;
    renderer.act(() => {
      tree = renderer.create(<EventListItem event={defaultEvent} onPress={onPress} />);
    });

    const itemButton = tree.root.findByProps({ testID: "event-list-item" });
    itemButton.props.onPress();
    expect(onPress).toHaveBeenCalledTimes(1);

    const favNodesWithHandler = tree.root.findAll((n: any) => n.props && n.props.testID === "favourite-icon" && typeof n.props.onPress === "function");
    if (favNodesWithHandler.length > 0) {
      favNodesWithHandler[0].props.onPress();
    } else {
      const favNode = tree.root.findByProps({ testID: "favourite-icon" });
      const innerClickable = favNode.findAll((n: any) => typeof n.props?.onPress === "function");
      if (innerClickable.length > 0) innerClickable[0].props.onPress();
    }
    expect(mockToggleRSVP).toHaveBeenCalledTimes(1);
    expect(mockToggleRSVP).toHaveBeenCalledWith(defaultEvent);
    tree.unmount();
  });
});
