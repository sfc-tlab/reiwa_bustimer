export type Bus = {
  h: number,
  m: number,
  twin: boolean,
  via: string,
  type: string,
  rotary: boolean,
}

export interface ThemeColor {
    color?: string;
}  

declare global {
    interface Window {
        GA_INITIALIZED: any;
    }
}
