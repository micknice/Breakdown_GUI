function extractLatitudeAndLongitude(arrayOfObjects, markers) {
  console.log('arr of obj @ extract', arrayOfObjects);
  return arrayOfObjects.map((obj, index) => {
    if (obj.currentLocation && Array.isArray(obj.currentLocation) && obj.currentLocation.length === 2) {
      const [latitude, longitude] = obj.currentLocation;
      return { latitude, longitude };
    } else {
      // Handle the case where currentLocation is not in the expected format
      // You can throw an error, return some default values, or handle it based on your use case.
      return { latitude: markers[index].latitude, longitude: markers[index].longitude };
    }
  });
}

export default extractLatitudeAndLongitude;