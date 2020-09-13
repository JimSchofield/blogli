export interface ShortCode {
  name: string;
  match: string | RegExp;
  resolve: (markup: string) => string;
}
