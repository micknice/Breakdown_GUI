function extractLatitudeAndLongitude(arrayOfObjects) {
  console.log(arrayOfObjects)
    return arrayOfObjects.map(obj => {
      const [latitude, longitude] = obj.currentLocation;
      return { latitude, longitude };
    });
  }

  export default extractLatitudeAndLongitude;