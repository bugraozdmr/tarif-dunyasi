import {create} from 'zustand';

import { Recipe } from '../types';

interface PreviewModalStore{
    isOpen: boolean;
    data? : Recipe;
    onOpen : (data:Recipe) => void;
    onClose : () => void;
}


const usePreviewModal = create<PreviewModalStore>((set) => ({
    isOpen : false,
    data : undefined,
    onOpen : (data : Recipe) => set({data : data , isOpen : true}),
    onClose : () => set({isOpen : false})
}));

export default usePreviewModal;
