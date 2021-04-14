export interface PopupContent {
  isShow: boolean;
  popupType: PopupType;
  message: string;
  icon: string;
}

export const enum PopupType {
  ERROR = 'error',
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info',
}
