import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewSubscriptionComponent} from './new.component';

describe('CurrentSubscriptionComponent', () => {
  let component: NewSubscriptionComponent;
  let fixture: ComponentFixture<NewSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewSubscriptionComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
