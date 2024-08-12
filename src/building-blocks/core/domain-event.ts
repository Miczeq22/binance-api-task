// eslint-disable-next-line @typescript-eslint/ban-types
export interface DomainEvent<PayloadType extends object = {}> {
  name: string;

  payload: PayloadType;
}
