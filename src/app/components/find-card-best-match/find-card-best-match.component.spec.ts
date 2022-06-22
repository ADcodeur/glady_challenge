import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import {
  SearchCombinaisonCommand,
  SearchCombinaisonResult,
} from 'src/app/model/interfaces';
import { CalculatorService } from 'src/app/services/calculator.service';

import { FindCardBestMatchComponent } from './find-card-best-match.component';

class MockCalculatorService {
  //Cards available : 10,20,20

  searchCombinaison(
    command: SearchCombinaisonCommand
  ): Observable<SearchCombinaisonResult> {
    if (command.amount < 10) {
      return of({ ceil: { value: 10, cards: [10] } });
    }

    if (command.amount == 10) {
      return of({
        floor: { value: 10, cards: [10] },
        equal: { value: 10, cards: [10] },
        ceil: { value: 10, cards: [10] },
      });
    }

    if (command.amount > 10 && command.amount < 20) {
      return of({
        floor: { value: 10, cards: [10] },
        ceil: { value: 20, cards: [20] },
      });
    }

    if (command.amount == 20) {
      return of({
        floor: { value: 20, cards: [20] },
        equal: { value: 20, cards: [20] },
        ceil: { value: 20, cards: [20] },
      });
    }

    if (command.amount > 20 && command.amount < 30) {
      return of({
        floor: { value: 20, cards: [20] },
        ceil: { value: 30, cards: [10, 20] },
      });
    }

    if (command.amount == 30) {
      return of({
        floor: { value: 30, cards: [10, 20] },
        equal: { value: 30, cards: [10, 20] },
        ceil: { value: 30, cards: [10, 20] },
      });
    }

    if (command.amount > 30 && command.amount < 40) {
      return of({
        floor: { value: 30, cards: [10, 20] },
        ceil: { value: 40, cards: [20, 20] },
      });
    }

    if (command.amount == 40) {
      return of({
        floor: { value: 40, cards: [20, 20] },
        equal: { value: 40, cards: [20, 20] },
        ceil: { value: 40, cards: [20, 20] },
      });
    }

    if (command.amount > 40 && command.amount < 50) {
      return of({
        floor: { value: 40, cards: [20, 20] },
        ceil: { value: 50, cards: [10, 20, 20] },
      });
    }

    if (command.amount == 50) {
      return of({
        floor: { value: 50, cards: [10, 20, 20] },
        equal: { value: 50, cards: [10, 20, 20] },
        ceil: { value: 50, cards: [10, 20, 20] },
      });
    }

    if (command.amount > 50) {
      return of({ floor: { value: 50, cards: [10, 20, 20] } });
    }

    return of({ ceil: { value: 0, cards: [] } });
  }
}

describe('FindCardBestMatchComponent', () => {
  let component: FindCardBestMatchComponent;
  let fixture: ComponentFixture<FindCardBestMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FindCardBestMatchComponent],
      imports: [BrowserModule, ReactiveFormsModule],
      providers: [
        { provide: CalculatorService, useClass: MockCalculatorService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindCardBestMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  xit('should display exact match', async () => {
    component.amountControl.setValue(30);
    await component.onValidate();

    fixture.detectChanges();

    const cards: number[] = [];
    const liElementList: HTMLElement[] = fixture.nativeElement.querySelectorAll(
      '#card_wrapper li'
    ) as HTMLElement[];
    liElementList.forEach((el) => {
      cards.push(parseInt(el.textContent!, 10));
    });
    expect(cards.includes(10)).toBeTrue();
    expect(cards.includes(20)).toBeTrue();
  });
});
