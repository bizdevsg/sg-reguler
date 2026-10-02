/**
 * @deprecated Market websocket service is no longer used for real-time market data.
 * Use TradingView widget components instead.
 */
export type MarketSocketUnsubscribe = () => void;

export type MarketSocketListener<T = unknown> = (payload: T) => void;

export interface MarketSocketClient {
  connect: () => void;
  subscribe: <T = unknown>(_listener: MarketSocketListener<T>) => MarketSocketUnsubscribe;
  unsubscribe: (_unsubscribe?: MarketSocketUnsubscribe) => void;
  close: () => void;
  isConnected: () => boolean;
}

const NOOP_UNSUBSCRIBE: MarketSocketUnsubscribe = () => {};

const marketSocketClient: MarketSocketClient = {
  connect: () => {},
  subscribe: () => NOOP_UNSUBSCRIBE,
  unsubscribe: () => {},
  close: () => {},
  isConnected: () => false,
};

export default marketSocketClient;
