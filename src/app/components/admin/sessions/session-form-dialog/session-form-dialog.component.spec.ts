import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionFormDialogComponent } from './session-form-dialog.component';

describe('SessionFormDialogComponent', () => {
  let component: SessionFormDialogComponent;
  let fixture: ComponentFixture<SessionFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionFormDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SessionFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
