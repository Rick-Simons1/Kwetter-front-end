import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRegisterPageComponent } from './profile-register-page.component';

describe('ProfileRegisterPageComponent', () => {
  let component: ProfileRegisterPageComponent;
  let fixture: ComponentFixture<ProfileRegisterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileRegisterPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileRegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
