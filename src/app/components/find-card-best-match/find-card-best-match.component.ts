import {
  Component,
  EventEmitter,
  forwardRef,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { Subscription } from 'rxjs/internal/Subscription';
import {
  SearchCombinaisonCommand,
  SearchCombinaisonResult,
  SearchCombinaisonResultItem,
} from 'src/app/model/interfaces';
import { CalculatorService } from 'src/app/services/calculator.service';

@Component({
  selector: 'app-find-card-best-match',
  templateUrl: './find-card-best-match.component.html',
  styleUrls: ['./find-card-best-match.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FindCardBestMatchComponent),
      multi: true,
    },
  ],
})
export class FindCardBestMatchComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  isLoading: boolean = false;
  value: SearchCombinaisonResultItem | undefined;
  @Output()
  valueChanges: EventEmitter<SearchCombinaisonResultItem> = new EventEmitter();
  cards: number[] = [];
  floorProposition: number | undefined;
  ceilProposition: number | undefined;

  amountControl: FormControl = new FormControl(0, Validators.required);
  formGroup: FormGroup = new FormGroup({ amountControl: this.amountControl });

  subscriptions: Subscription = new Subscription();

  onChange = (value: SearchCombinaisonResultItem): any => {};
  onTouched = (): any => {};
  disabled: boolean = false;

  constructor(private calculatorService: CalculatorService) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.amountControl.valueChanges.subscribe((value: number) => {
        this.value = {
          value: value,
          cards: this.cards,
        };
        this.valueChanges.emit(this.value);
        this.onChange(this.value);
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  async onValidate() {
    await this.searchExactCombinaison(this.amountControl.value);
  }

  async onPropositionSelected(amount: number) {
    this.amountControl.setValue(amount);
    await this.searchExactCombinaison(amount);
  }

  async searchAdjacentCombinaison(direction: 'UP' | 'DOWN') {
    this.floorProposition = undefined;
    this.ceilProposition = undefined;
    this.isLoading = true;
    let result: SearchCombinaisonResult;
    if (direction === 'UP') {
      result = await this.searchCombinaison(this.amountControl.value + 1);
      if (result) {
        if (result.ceil && result.ceil.value !== this.amountControl.value) {
          this.amountControl.setValue(result.ceil.value);
          this.cards = result.ceil.cards;
        } else {
          alert('No more amount available');
        }
      }
    } else if (direction === 'DOWN') {
      result = await this.searchCombinaison(this.amountControl.value - 1);
      if (result) {
        if (result.floor && result.floor.value !== this.amountControl.value) {
          this.amountControl.setValue(result.floor.value);
          this.cards = result.floor.cards;
        } else {
          alert('No more amount available');
        }
      }
    }
    this.isLoading = false;
  }

  private async searchExactCombinaison(amount: number) {
    this.floorProposition = undefined;
    this.ceilProposition = undefined;
    this.isLoading = true;
    const result: SearchCombinaisonResult = await this.searchCombinaison(
      amount
    );
    if (result) {
      if (result?.equal) {
        this.cards = result.equal.cards;
      } else {
        if (result?.ceil && result?.floor) {
          this.floorProposition = result.floor.value;
          this.ceilProposition = result.ceil.value;
        } else if (result?.ceil) {
          this.amountControl.setValue(result.ceil.value);
          this.cards = result.ceil.cards;
        } else if (result?.floor) {
          this.amountControl.setValue(result.floor.value);
          this.cards = result.floor.cards;
        }
      }
    }
    this.isLoading = false;
  }

  private searchCombinaison(amount: number): Promise<SearchCombinaisonResult> {
    this.cards = [];
    let command: SearchCombinaisonCommand = {
      amount: amount,
      shopId: 5,
    };
    return lastValueFrom(this.calculatorService.searchCombinaison(command));
  }

  onComponentTounched(): void {
    this.onTouched();
  }

  writeValue(obj: SearchCombinaisonResultItem): void {
    this.value = { value: obj ? obj.value : 0, cards: obj ? obj.cards : [] };
    this.amountControl.setValue(this.value.value, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(state: boolean): void {
    this.disabled = state;
  }
}
