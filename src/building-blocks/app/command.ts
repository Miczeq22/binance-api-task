// eslint-disable-next-line @typescript-eslint/ban-types
export interface Command<PayloadType extends object = {}> {
  payload: PayloadType;
}
