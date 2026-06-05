import NetInfo from '@react-native-community/netinfo';
import {ConnectivityAdapter} from './SyncManager';

export class NetInfoConnectivityAdapter implements ConnectivityAdapter {
  async isConnected(): Promise<boolean> {
    const state = await NetInfo.fetch();
    return Boolean(state.isConnected && state.isInternetReachable !== false);
  }
}
