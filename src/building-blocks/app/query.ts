// eslint-disable-next-line @typescript-eslint/ban-types
export interface Query<PayloadType extends object = {}> {
  payload: PayloadType;
}
