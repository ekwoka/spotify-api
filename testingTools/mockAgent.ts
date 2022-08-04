import { MockAgent, setGlobalDispatcher } from 'undici';

export const mockAgent = new MockAgent();

// Disables all Requests not handled by the MockAgent
/* mockAgent.disableNetConnect(); */

setGlobalDispatcher(mockAgent);

// Matches regex for Spotify.com
export const mockPool = mockAgent.get(/spotify\.com/);
