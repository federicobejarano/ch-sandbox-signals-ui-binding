import { Component } from '@angular/core';
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
  // [Estado Local]: Mantener el estado internamente usando una variable mutada imperativamente (Próximo paso refactorización reactiva)
  affiliationState: AffiliationState = 'idle';
  
  constructor() {}

  // [Transición de Estado]: Método imperativo para alternar el estado del CTA
  toggleAffiliation(): void {
    if (this.affiliationState === 'idle') {
      this.affiliationState = 'pending';
    } else if (this.affiliationState === 'pending') {
      this.affiliationState = 'idle';
    }
  }
}
