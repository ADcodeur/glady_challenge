import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindCardBestMatchComponent } from './find-card-best-match.component';

describe('FindCardBestMatchComponent', () => {
  let component: FindCardBestMatchComponent;
  let fixture: ComponentFixture<FindCardBestMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindCardBestMatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindCardBestMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
