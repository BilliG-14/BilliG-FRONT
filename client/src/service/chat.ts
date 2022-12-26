import React, { Component } from 'react';
import HttpClient from './http';
const http = new HttpClient();
export default class ChatService extends Component {
  state = {
    http: http,
  };

  async runServer() {
    return this.state.http.fetch(`/server`, {
      method: 'GET',
    });
  }

  async signup(username: string) {
    return this.state.http.fetch(`/signup`, {
      method: 'POST',
      body: JSON.stringify({ username }),
    });
  }

  async getRoomList() {
    return this.state.http.fetch(`/chat`, {
      method: 'GET',
    });
  }

  async getMyRooms(username: string) {
    return this.state.http.fetch(`/user/${username}`, {
      method: 'GET',
    });
  }

  async postRoom(username: string, title: string) {
    return this.state.http.fetch('/chat', {
      method: 'POST',
      body: JSON.stringify({ username, title }),
    });
  }

  async joinRoom(username: string, title: string) {
    return this.state.http.fetch(`/user/${title}`, {
      method: 'POST',
      body: JSON.stringify({ username }),
    });
  }

  async getRoom(title: string) {
    return this.state.http.fetch(`/chat/${title}`, {
      method: 'GET',
    });
  }
}
