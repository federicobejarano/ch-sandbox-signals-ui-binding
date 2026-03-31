import { Component, signal, computed } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';

export type AffiliationState = 'idle' | 'pending' | 'approved';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export class HomePage {
  // [Arquitectura de Estado]: WritableSignal como única fuente de verdad local reactiva y síncrona
  affiliationState = signal<AffiliationState>('idle');
  
  // [Estado Derivado]: Computed Signal para derivar el texto sin mutaciones imperativas
  buttonText = computed(() => {
    const state = this.affiliationState();
    switch (state) {
      case 'idle': return 'Afiliate';
      case 'pending': return 'Cancelar';
      case 'approved': return 'Aprobado';
      default:
        // [Crash Early]: Validación de invariantes (Pragmatic Paranoia). Lanza un error ante un estado no contemplado.
        throw new Error(`[Assertion Error]: Invalid affiliation state in buttonText: ${state as string}`);
    }
  });
  
  // [Estado Derivado]: Computed Signal para inyectar propiedades visuales reactivamente
  buttonColor = computed(() => {
    const state = this.affiliationState();
    switch (state) {
      case 'idle': return 'primary';
      case 'pending': return 'medium';
      case 'approved': return 'success';
      default:
        // [Crash Early]: Falla explícita inmediata para evitar defectos visuales silenciosos.
        throw new Error(`[Assertion Error]: Invalid affiliation state in buttonColor: ${state as string}`);
    }
  });
  
  // [Estado Derivado]: Computed Signal para orquestar la visibilidad de elementos condicionales
  showReferral = computed(() => {
    const state = this.affiliationState();
    switch (state) {
      case 'idle': return false;
      case 'pending': return true;
      case 'approved': return false;
      default:
        // [Crash Early]: Protege la coherencia del estado de la UI forzando el fallo.
        throw new Error(`[Assertion Error]: Invalid affiliation state in showReferral: ${state as string}`);
    }
  });

  constructor() {}

  // [Transición de Estado]: Mutación declarativa del estado reactivo usando .update()
  toggleAffiliation(): void {
    this.affiliationState.update(state => {
      switch (state) {
        case 'idle': return 'pending';
        case 'pending': return 'idle';
        case 'approved': return 'idle';
        default:
          // [Crash Early]: Asegura que las transiciones de estado solo ocurran desde estados válidos.
          throw new Error(`[Assertion Error]: Cannot toggle affiliation from invalid state: ${state as string}`);
      }
    });
  }
}
