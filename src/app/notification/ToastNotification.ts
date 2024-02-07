import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export const ToastNotification = new Notyf({
    duration: 10000,
    dismissible: true,
    position: {
      x: 'right',
      y: 'top',
    },
    types: [
      {
        type: 'warning',
        background: 'orange',
        icon: {
          className: 'fa fa-warning',
          tagName: 'i',
          color: 'white'
        }
      },
      {
        type: 'info',
        background: '#3c8dbc',
        icon: {
          className: 'fa fa-info-circle',
          tagName: 'i',
          color: 'white'
        }
      },
      {
          type: 'success'
      },
      {
          type: 'error'
      }
    ]
  });