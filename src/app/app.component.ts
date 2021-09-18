import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { MapDataService } from './services/map-data.service';
import { Record } from './services/Record';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit{
  map:any;
  records:Record[] = [];
  markers: any[] = [];

  constructor(private dataService:MapDataService){}

  ngOnInit(){
    this.getHospitalsData();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap(): void {
    this.map = L.map('map', {
      center: [ -25.8651, 136.2099 ],
      zoom: 5,
      zoomControl: false
    });

    L.control.zoom({
      position: 'bottomright'
    }).addTo(this.map);

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {});
    tiles.addTo(this.map);
  }

  resetMap(){
    this.map.off();
    this.map.remove();
    this.initMap();
  }

  optionSelected(event:any){
    this.markers = [];
    const value = event.target.value;
    this.resetMap()
    if(value == '1') this.getHospitalsData()
    if(value == '2') this.getSchoolsData()
  }

  getHospitalsData(){
    this.dataService.GetHospitals()
    .subscribe(hospitals=>{
      this.records = hospitals;
      console.log(this.records);
      this.records.map(item => {
        const marker = L.marker([item.geometry.coordinates[1], item.geometry.coordinates[0]])
        marker.bindPopup(
          `
            <h5 class="text-primary">${item.properties.Facility_Name}</h5>
            <h6>Address: ${item.properties.Address}</h6>
            <span class="text-muted">Phone: ${item.properties.Phone_Number}</span>
          `
        )
        marker.addTo(this.map)
        this.markers.push(marker);
      })
    })
  }

  getSchoolsData(){
    this.dataService.GetSchools()
    .subscribe(schools=>{
      this.records = schools;
      console.log(this.records);
      this.records.map(item => {
        const marker = L.marker([item.geometry.coordinates[1], item.geometry.coordinates[0]])
        marker.bindPopup(
          `
            <h5 class="text-primary">${item.properties.Facility_Name}</h5>
            <h6>Address: ${item.properties.Address}</h6>
            <span class="text-muted">Phone: ${item.properties.Phone_Number}</span>
          `
        )
        marker.addTo(this.map)
        this.markers.push(marker);
      })
    })
  }

  selectRecordFromSideBar(i:any){
    this.markers[i].openPopup();
    this.map.flyTo([this.records[i].geometry.coordinates[1], this.records[i].geometry.coordinates[0]], 15)
  }

}
