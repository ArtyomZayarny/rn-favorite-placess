export class Place {
  constructor(title, imageUri, address, location) {
    this.title = title;
    this.imageUri = imageUri;
    this.location = location; //{ lat: 0.14, lng:0.45}
    this.address = address;
    this.id = new Date().toString() + Math.random().toString();
  }
}
