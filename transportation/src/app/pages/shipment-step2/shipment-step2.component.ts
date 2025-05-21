import { Component, Input, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as L from 'leaflet';
import { FormDataService } from '../../services/form-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipment-step2',
  templateUrl: './shipment-step2.component.html',
  styleUrls: ['./shipment-step2.component.css']
})
export class ShipmentStep2Component implements OnInit, AfterViewInit {
  form: FormGroup;
  @Input() currentStep = 1;

  steps = [
    { label: 'Details' },
    { label: 'Locations' },
    { label: 'Confirmation' }
  ];

  calculatedDistance: string = '';
  pickupCoords: [number, number] | null = null;
  dropoffCoords: [number, number] | null = null;

  constructor(
    private fb: FormBuilder,
    private formDataService: FormDataService,
    private router: Router
  ) {
    this.form = this.fb.group({
      pickupLocation: ['', Validators.required],
      dropoffLocation: ['', Validators.required],
      distance: ['']
    });
  }

  ngOnInit(): void {
    const shipmentData = this.formDataService.getShipmentData();
    if (shipmentData) {
      this.form.patchValue({
        pickupLocation: shipmentData.pickupLocation || '',
        dropoffLocation: shipmentData.dropoffLocation || '',
        distance: shipmentData.distance || ''
      });
    }
  }

  ngAfterViewInit(): void {
    this.initMap('pickupMap', 'pickupLocation');
    this.initMap('dropoffMap', 'dropoffLocation');
  }

  private initMap(mapId: string, controlName: string): void {
    const map = L.map(mapId).setView([34.0, 9.0], 6); // Centered on Tunisia

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const marker = L.marker([34.0, 9.0], { draggable: false }).addTo(map);

    map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      marker.setLatLng([lat, lng]);

      fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
        .then(res => res.json())
        .then(data => {
          const locationName = data.display_name || `${lat}, ${lng}`;
          this.form.get(controlName)?.setValue(locationName);
        })
        .catch(() => {
          this.form.get(controlName)?.setValue(`${lat}, ${lng}`);
        });

      if (controlName === 'pickupLocation') {
        this.pickupCoords = [lat, lng];
      } else {
        this.dropoffCoords = [lat, lng];
      }

      this.calculateDistance();
    });
  }

  private calculateDistance(): void {
    if (this.pickupCoords && this.dropoffCoords) {
      const [lat1, lon1] = this.pickupCoords;
      const [lat2, lon2] = this.dropoffCoords;

      const toRad = (value: number) => value * Math.PI / 180;
      const R = 6371; // Earth radius in km

      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);

      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      this.calculatedDistance = distance.toFixed(2);
      this.form.get('distance')?.setValue(this.calculatedDistance);
    }
  }

  onNext(): void {
    if (this.form.valid) {
      const existingData = this.formDataService.getShipmentData();

      const updatedData = {
        ...existingData,
        pickupLocation: this.form.value.pickupLocation,
        dropoffLocation: this.form.value.dropoffLocation,
        distance: this.form.value.distance
      };

      this.formDataService.setShipmentData(updatedData);

      this.router.navigate(['/home/step3']);
    }
  }
}
