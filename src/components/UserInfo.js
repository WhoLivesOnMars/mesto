export default class UserInfo {
  constructor({ username, description, avatar }) {
    this._name = document.querySelector(username);
    this._job = document.querySelector(description);
    this._avatar = document.querySelector(avatar)
  };

  getUserInfo() {
    return {
      username: this._name.textContent,
      description: this._job.textContent,
      avatar: this._avatar.src
    };
  };

  setUserInfo({ data }) {
    this._name.textContent = data.name;
    this._job.textContent = data.about;
  };

  setAvatar(src) {
    this._avatar.src = src;
  }
}