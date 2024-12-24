import { HttpClient } from '@angular/common/http';
import { EventEmitter, inject, Injectable, Output } from '@angular/core';
import { environment } from '../../environments/environment';

export interface PagePlantData {
  content: PlantData[];
  totalPages: number;
  totalElements: number;
  last: boolean;
  number: number;
  first: boolean;
}

export interface PlantData {
  id: number;
  country: string;
  countryCode: string;
  plant: string;
  readings: number;
  midAlerts: number;
  redAlerts: number;
  disabled: number;
}

export interface EditData {
  id: number;
  readings: number;
  midAlerts: number;
  redAlerts: number;
  disabled: number;
}

export interface TotalData {
  readings: number;
  midAlerts: number;
  redAlerts: number;
  disabled: number;
}

export interface CreateData {
  country: string;
  countryCode: string;
  plant: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _http = inject(HttpClient);
  private _baseUrl = `${environment.BACKEND_URL}/data`;
  private _flagsUrlBase = 'white_https://flagcdn.com/es/codes.json';

  @Output() emitChange = new EventEmitter();

  GetFlags = () => {
    return this._http.get(this._flagsUrlBase);
  };

  CreatePlant = (data: CreateData) => {
    return this._http.post(this._baseUrl, data);
  };

  // GetPlants = () => {
  //   return this._http.get<PlantData[]>(this._baseUrl);
  // };

  GetAllWithPages = (page: number) => {
    return this._http.get<PagePlantData>(`${this._baseUrl}/pages/${page}`);
  };

  EditPlant = (data: EditData) => {
    return this._http.put(this._baseUrl, data);
  };

  DeletePlant = (id: number) => {
    return this._http.delete(`${this._baseUrl}/${id}`);
  };

  GetTotals = () => {
    return this._http.get<TotalData>(`${this._baseUrl}/total`);
  };
}
