const SOCIAL_NETWORK = {
	facebook: 'FACEBOOK',
	google: 'GOOGLE',
}

/**
 * Check if is Facebook or Google login
 */
export default (res) => {
  const isGoogle = res.googleId;
  const isFacebook = res.graphDomain === 'facebook';

  if (isGoogle) return SOCIAL_NETWORK.google;
  else if (isFacebook) return SOCIAL_NETWORK.facebook;
};