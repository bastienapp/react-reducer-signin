export const signIn = (email, password) => {
  // fake sign in
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'email@test.com' && password === 'test123456') {
        resolve({
          id: 1,
          email,
          name: 'John Doe',
        });
      } else {
        reject(
          new Error('Authentication failure: unknown email or bad password.')
        );
      }
    }, 2000);
  });
};

export const signOut = () => {
  // fake sign out
  return new Promise((resolve) => {
    resolve();
  });
};
