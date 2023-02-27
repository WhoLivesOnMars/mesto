export default class UserInfo {
  constructor({ username, description }) {
    this._name = document.querySelector(username);
    this._job = document.querySelector(description);
  };

  getUserInfo() {
    return {
      username: this._name.textContent,
      description: this._job.textContent
    };
  };

  setUserInfo(formData) {
    this._name.textContent = formData.username;
    this._job.textContent = formData.description;
  };
}