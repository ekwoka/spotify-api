import { MockAgent, setGlobalDispatcher } from 'undici';

export const mockAgent = new MockAgent();
setGlobalDispatcher(mockAgent);
export const mockPool = mockAgent.get('https://api.spotify.com');
