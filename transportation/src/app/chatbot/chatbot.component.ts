import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChatbotComponent implements AfterViewInit {

  messages: { name: string, message: string }[] = [];
  state = false;

  ngAfterViewInit(): void {
    const openButton = document.querySelector('.chatbox__button') as HTMLElement;
    const chatBox = document.querySelector('.chatbox__support') as HTMLElement;
    const sendButton = document.querySelector('.send__button') as HTMLElement;
    const textField = chatBox.querySelector('input') as HTMLInputElement;

    openButton.addEventListener('click', () => this.toggleState(chatBox));
    sendButton.addEventListener('click', () => this.onSendButton(chatBox, textField));

    textField.addEventListener('keyup', ({ key }) => {
      if (key === 'Enter') {
        this.onSendButton(chatBox, textField);
      }
    });
  }

  toggleState(chatbox: HTMLElement) {
    this.state = !this.state;
    chatbox.classList.toggle('chatbox--active', this.state);
  }

  onSendButton(chatbox: HTMLElement, textField: HTMLInputElement) {
    const text1 = textField.value;
    if (text1 === "") return;

    const msg1 = { name: "User", message: text1 };
    this.messages.push(msg1);

    fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      body: JSON.stringify({ message: text1 }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => {
      const msg2 = { name: "Sam", message: data.answer };
      this.messages.push(msg2);
      this.updateChatText(chatbox);
      textField.value = '';
    })
    .catch(err => {
      console.error('Error:', err);
      this.updateChatText(chatbox);
      textField.value = '';
    });
  }

  updateChatText(chatbox: HTMLElement) {
    const chatmessage = chatbox.querySelector('.chatbox__messages') as HTMLElement;
    let html = '';
    [...this.messages].reverse().forEach(item => {
      if (item.name === "Sam") {
        html += `<div class="messages__item messages__item--visitor">${item.message}</div>`;
      } else {
        html += `<div class="messages__item messages__item--operator">${item.message}</div>`;
      }
    });
    chatmessage.innerHTML = html;
  }
}
