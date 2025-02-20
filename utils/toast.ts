// utils/toast.ts
import iziToast, { IziToastSettings } from 'izitoast';

export const showErrorToast = (message: string): void => {
    const settings: IziToastSettings = {
        title: 'Erreur',
        message,
        position: 'topRight',
        color: 'red',
    };
    iziToast.error(settings);
};

export const showSuccessToast = (message: string): void => {
    const settings: IziToastSettings = {
        title: 'Succès',
        message,
        position: 'topRight',
        color: 'green',
    };
    iziToast.success(settings);
};
