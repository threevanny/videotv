import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import io from 'socket.io-client';


const CHAT_SOCKET_ENDPOINT = 'http://localhost:3000';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  socket: any;
  message: any;
  @ViewChild('card_content') card_content: ElementRef<HTMLDivElement> | any;

  constructor() { }

  ngOnInit(): void {
    this.setUpSocketConnection();
  }

  setUpSocketConnection() {
    this.socket = io(CHAT_SOCKET_ENDPOINT);
    this.socket.on('msg', (message: string) => {
      if (message) {
        const item = document.createElement('div');
        item.innerHTML = `@user: ${message}`;
        item.className = '';
        document.getElementsByClassName('card-content')[0].appendChild(item);
      }
    });
  }

  SendMessage() {
    this.socket.emit('message', this.message);
    this.message = "";
  }
}
