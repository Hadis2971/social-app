class InstanceModifiers {
  tokenDecorator (instance) {
    const accessToken = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    instance.token = accessToken;
    instance.refreshtoken = refreshToken;
  }
}

export default new InstanceModifiers();
