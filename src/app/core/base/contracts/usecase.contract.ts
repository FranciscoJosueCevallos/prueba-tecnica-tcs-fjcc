export interface UseCase<T, R> {
  execute(param?: T): R;
  execute(): R;
}
