import { Socket } from 'dgram';
import SocketIOClient from 'socket.io-client';

const SERVER_ENDPOINT: string = process.env.REACT_APP_SERVER_ENDPOINT || '';

type OnConnect = () => void;
type OnClose = () => void;
type OnError = (err: any) => void;

class GameClient {
  private _socket: SocketIOClient.Socket | undefined = undefined;
  public onConnect: OnConnect | undefined = undefined;
  public onClose: OnClose | undefined = undefined;
  public onError: OnError | undefined = undefined;

  connect(): void {
    this._connect();
  }

  _connect(): void {
    if (this.connected) {
      this._socket?.close();
      this._socket = undefined;
    }

    this._socket = SocketIOClient(SERVER_ENDPOINT);
    this.invokeEvent();
  }

  invokeEvent = () => {
    if (this.onConnect) this._socket?.on('connect', this.onConnect);
    if (this.onClose) this._socket?.on('disconnect', this.onClose);
    if (this.onError) this._socket?.on('error', this.onError);
  };

  enterGame = (nickname: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!this.connected) return reject('Not connected.');

      this._socket?.on('tick', () => {
        resolve();
      });

      this._socket?.emit('username', nickname);
    });
  };

  reqGameInfo = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (!this.connected) return reject('Not connected.');

      this._socket?.emit('startgame', true);

      this._socket?.on('startgame', (gameInfo: any) => resolve(gameInfo));
    });
  };

  get connected(): boolean {
    return this._socket && this._socket.connected ? true : false;
  }
}

export { GameClient };
