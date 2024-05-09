import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancionListComponent } from './cancion-list.component';

describe('CancionListComponent', () => {
  let component: CancionListComponent;
  let fixture: ComponentFixture<CancionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CancionListComponent]
    });
    fixture = TestBed.createComponent(CancionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
