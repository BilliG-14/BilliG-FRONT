export default class HttpClient {
  state = {
    baseURL: process.env.REACT_APP_BASE_URL,
  };
  // constructor(baseURL: string | undefined) {
  //   this.baseURL = baseURL;
  // }
  async fetch(url: string, options: any) {
    const res = await fetch(`${this.state.baseURL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data;
    try {
      data = await res.json();
    } catch (error) {
      console.error(error);
    }
    if (res.status > 299 || res.status < 200) {
      const message = "http통신 문제 🤪";
      throw new Error(message);
    }

    return data;
  }
}
