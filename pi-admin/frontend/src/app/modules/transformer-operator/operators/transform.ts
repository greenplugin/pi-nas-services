import {TransformerInterface} from '../interfaces/transformer-interface';
import {Observable, OperatorFunction} from 'rxjs';
import {map} from 'rxjs/operators';
import {ConstructorOf} from '../types/constructor-of';
import {appInjector} from '../transformer-operator.module';

export function transform<I, T>(transformer: ConstructorOf<TransformerInterface<I, T>>): OperatorFunction<I, T> {
  return (input: Observable<I>) => input.pipe(map((value: I) => appInjector.get(transformer).transform(value)));
}
