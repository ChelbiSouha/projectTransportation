import { Injectable } from '@angular/core';
import { Client, IMessage, Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private client: Client;

  constructor() {
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/myapp/ws', // adapte selon ton endpoint websocket
      connectHeaders: {},
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      webSocketFactory: () => new SockJS('/ws'),
    });

    this.client.activate();
  }

  subscribeToCarLocation(callback: (location: any) => void): void {
    this.client.onConnect = () => {
      this.client.subscribe('/topic/car-location', (message: IMessage) => {
        const location = JSON.parse(message.body);
        callback(location);
      });
    };
  }
}
