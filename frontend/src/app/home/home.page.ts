import { Component, signal, computed } from '@angular/core';
import { NgIf } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';

export type AffiliationState = 'idle' | 'pending' | 'approved';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, NgIf],
})
export class HomePage {
  // [Arquitectura de Estado]: WritableSignal como única fuente de verdad local reactiva y síncrona
  affiliationState = signal<AffiliationState>('idle');
  
  // [Estado Derivado]: Computed Signal para derivar el texto sin mutaciones imperativas
  buttonText = computed(() => this.affiliationState() === 'pending' ? 'Cancelar' : 'Afiliate');
  
  // [Estado Derivado]: Computed Signal para inyectar propiedades visuales reactivamente
  buttonColor = computed(() => this.affiliationState() === 'pending' ? 'medium' : 'primary');
  
  // [Estado Derivado]: Computed Signal para orquestar la visibilidad de elementos condicionales
  showReferral = computed(() => this.affiliationState() === 'pending');

  constructor() {}

  // [Transición de Estado]: Mutación declarativa del estado reactivo usando .update()
  toggleAffiliation(): void {
    this.affiliationState.update(state => state === 'idle' ? 'pending' : 'idle');
  }
}
