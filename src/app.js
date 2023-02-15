const successGeolocation = (position) => {
  const { latitude, longitude } = position.coords;

  console.log(latitude, longitude);
};

const errorGeolocation = () => {
  console.log("Geolocation API is not available.");
};

navigator.geolocation.getCurrentPosition(successGeolocation, errorGeolocation);
