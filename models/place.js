export class Place {
  constructor(title, imageUrl, address, location) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.location = location; //{ lat: 0.14, lng:0.45}
    this.address = address;
    this.id = new Date().toString() + Math.random().toString();
  }
}
