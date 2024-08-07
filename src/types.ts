
import leaflet from 'leaflet';

export class DataMarker extends leaflet.Marker {
  data: any

  constructor(latLng: leaflet.LatLngExpression, data: any, options?: leaflet.MarkerOptions) {
    super(latLng, options)
    this.data = data;
  }

  getData() {
    return this.data;
  }

  setData(data: any) {
    this.data = data;
  }
}

export type Recipoint = {
  id: number,
  address_name: string,
  owner: string,
  lat: number,
  lng: number
}

export interface RecipointResponseType {
  recipoint: Recipoint
  distance: number
}