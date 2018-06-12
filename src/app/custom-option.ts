import {ToastOptions} from 'ng2-toastr';

export class CustomOption extends ToastOptions {
    positionClass = 'toast-top-right'; 
    showCloseButton = true;
}