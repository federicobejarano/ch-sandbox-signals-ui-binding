import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería iniciar en estado "idle" y renderizar el texto "Afiliate"', () => {
    // Verificamos el estado inicial en la lógica
    expect(component.affiliationState()).toBe('idle');
    
    // Verificamos que la vista renderice el botón con el texto correcto
    const buttonElement: HTMLElement = fixture.nativeElement.querySelector('ion-button');
    expect(buttonElement).toBeTruthy(); // Falla aquí si el botón no existe
    expect(buttonElement.textContent?.trim()).toBe('Afiliate');
  });

  it('debería cambiar al estado "pending" tras el primer click y actualizar la vista', () => {
    // simular el clic del usuario en el botón principal.
    const buttonElement: HTMLElement = fixture.nativeElement.querySelector('.cta-button');
    buttonElement.click();
    fixture.detectChanges(); // Forzamos la detección de cambios de Angular tras el evento.

    // verificamos que el estado interno se mutó correctamente
    expect(component.affiliationState()).toBe('pending');

    // comprobamos la interpolación reactiva en el texto del botón
    expect(buttonElement.textContent?.trim()).toBe('Cancelar');
    
    // verificamos que el color cambió a 'medium'
    expect(buttonElement.getAttribute('color')).toBe('medium');

    // verificamos que aparece el botón secundario para referidos en estado pending
    const secondaryButton: HTMLElement = fixture.nativeElement.querySelector('.referral-button');
    expect(secondaryButton).toBeTruthy();
    expect(secondaryButton.textContent?.trim()).toBe('Invitar amigos');
  });

  it('debería regresar al estado "idle" tras un segundo click (cancelar)', () => {
    // forzamos el estado a pending para preparar el escenario
    component.affiliationState.set('pending');
    fixture.detectChanges();

    // simulamos el clic del usuario (intentando cancelar la operación pendiente)
    const buttonElement: HTMLElement = fixture.nativeElement.querySelector('.cta-button');
    buttonElement.click();
    fixture.detectChanges();

    // verificamos que el estado interno revirtió a idle
    expect(component.affiliationState()).toBe('idle');

    // comprobamos la UI revertida
    expect(buttonElement.textContent?.trim()).toBe('Afiliate');
    expect(buttonElement.getAttribute('color')).not.toBe('medium'); // O primary

    // verificamos que el botón secundario desapareció
    const secondaryButton: HTMLElement = fixture.nativeElement.querySelector('.referral-button');
    expect(secondaryButton).toBeFalsy();
  });
});
