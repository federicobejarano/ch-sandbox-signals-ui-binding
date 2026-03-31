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
    expect(component.affiliationState).toBe('idle');
    
    // Verificamos que la vista renderice el botón con el texto correcto
    const buttonElement: HTMLElement = fixture.nativeElement.querySelector('ion-button');
    expect(buttonElement).toBeTruthy(); // Falla aquí si el botón no existe
    expect(buttonElement.textContent?.trim()).toBe('Afiliate');
  });
});
