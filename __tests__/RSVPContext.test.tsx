import React from 'react';
import renderer from 'react-test-renderer';
import { Text, View } from 'react-native';
import { RSVPContextProvider } from '../src/presentation/viewmodels/contexts/RSVPContext';
import { useRSVP } from '../src/presentation/viewmodels/hooks/useRSVP';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RSPV_STORAGE_KEY } from '../src/core/utils/AppConstants';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.mock('../src/core/hooks/useTheme', () => ({
  useTheme: () => ({ colors: {} }),
}));

const defaultEvent = {
  id: 'e-1',
  title: 'Event 1',
  description: 'desc',
  date: new Date().toISOString(),
  location: 'loc',
  imageUrl: 'https://example.com/1.jpg',
  category: 'Tech',
  attendeeCount: 5,
  host: { name: 'Host', profileImageUrl: '' },
};

// Consumer that exposes context methods via ref
const Consumer = React.forwardRef((_props, ref: any) => {
  const ctx = useRSVP();
  React.useImperativeHandle(ref, () => ctx, [ctx]);
  return (
    <View>
      <Text testID="count">{ctx.events.length}</Text>
      <Text testID="loading">{String(ctx.isLoading)}</Text>
    </View>
  );
});

describe('RSVPContext', () => {
  beforeEach(() => {
    (AsyncStorage.getItem as jest.Mock).mockReset();
    (AsyncStorage.setItem as jest.Mock).mockReset();
  });

  it('loads stored RSVPs on mount', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify([defaultEvent]));

    let tree: any;
    const ref: any = React.createRef();

    await renderer.act(async () => {
      tree = renderer.create(
        <RSVPContextProvider>
          <Consumer ref={ref} />
        </RSVPContextProvider>
      );
    });

    expect(ref.current.events.length).toBe(1);
    expect(ref.current.isRSVP(defaultEvent.id)).toBe(true);
    tree.unmount();
  });

  it('addRSVP persists and updates isRSVP', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);
    const ref: any = React.createRef();
    let tree: any;

    await renderer.act(async () => {
      tree = renderer.create(
        <RSVPContextProvider>
          <Consumer ref={ref} />
        </RSVPContextProvider>
      );
    });

    await renderer.act(async () => {
      await ref.current.addRSVP(defaultEvent);
    });

    expect(ref.current.isRSVP(defaultEvent.id)).toBe(true);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      RSPV_STORAGE_KEY,
      JSON.stringify([defaultEvent])
    );
    tree.unmount();
  });

  it('removeRSVP removes and persists', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify([defaultEvent]));
    const ref: any = React.createRef();
    let tree: any;

    await renderer.act(async () => {
      tree = renderer.create(
        <RSVPContextProvider>
          <Consumer ref={ref} />
        </RSVPContextProvider>
      );
    });

    expect(ref.current.isRSVP(defaultEvent.id)).toBe(true);

    await renderer.act(async () => {
      await ref.current.removeRSVP(defaultEvent.id);
    });

    expect(ref.current.isRSVP(defaultEvent.id)).toBe(false);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(RSPV_STORAGE_KEY, JSON.stringify([]));
    tree.unmount();
  });

  it('toggleRSVP toggles add/remove', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

    const ref: any = React.createRef();
    let tree: any;

    await renderer.act(async () => {
      tree = renderer.create(
        <RSVPContextProvider>
          <Consumer ref={ref} />
        </RSVPContextProvider>
      );
    });

    // toggle on
    await renderer.act(async () => {
      await ref.current.toggleRSVP(defaultEvent);
    });
    expect(ref.current.isRSVP(defaultEvent.id)).toBe(true);

    // toggle off
    await renderer.act(async () => {
      await ref.current.toggleRSVP(defaultEvent);
    });
    expect(ref.current.isRSVP(defaultEvent.id)).toBe(false);

    tree.unmount();
  });
});
