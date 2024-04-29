import {useForm} from 'react-hook-form';
import ItemsFormValues from './ItemsFormValues';

function useItemsForm() {
   const methods = useForm<ItemsFormValues>({
   defaultValues: {
         linkId: '',
         text: '',
         type: 'string',
         items:[],
    }
    });
    const  handleSubmit  = (values: ItemsFormValues) => {
        console.log(values);
    };

    return {
        handleSubmit: methods.handleSubmit(handleSubmit),
        methods,
    };
}

export default useItemsForm;