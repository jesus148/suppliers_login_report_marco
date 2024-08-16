import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpdateComponent } from './sign-update.component';

describe('SignUpdateComponent', () => {
  let component: SignUpdateComponent;
  let fixture: ComponentFixture<SignUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
