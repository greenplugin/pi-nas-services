import {Observable, OperatorFunction} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {ConstructorOf} from '../types/constructor-of';
import {appInjector} from '../transformer-operator.module';
import {AsyncTransformerInterface} from '../interfaces/async-transformer-interface';
import {fromPromise} from 'rxjs/internal-compatibility';

export function asyncTransform<I, T>(transformer: ConstructorOf<AsyncTransformerInterface<I, T>>): OperatorFunction<I, T> {
  return (input: Observable<I>) => input.pipe(
    switchMap((value: I) => fromPromise(appInjector.get(transformer).transform(value)))
  );
}
