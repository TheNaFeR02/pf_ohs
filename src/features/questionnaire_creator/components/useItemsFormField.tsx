import {useFieldArray, useFormContext} from 'react-hook-form';


// interface ItemsFormValues {
//     linkId: string;
//     text: string;
//     type: string;
//     items: {
//         linkId: string;
//         text: string;
//         type: string;
//     }[];
//     }

interface ItemsFormValues {
    resourceType: string;
    title: string;
    url: string;
    status: string;
    subjectType: string[];
    date: Date;
    item: {
      linkId: string;
      text: string;
      type: string;
      answerOption: {
        valueCoding: {
          code: string;
          display: string;
        };
      }[];
    }[];
  }


function useItemsFormField(prefix: string) {
    const { control, register } = useFormContext<ItemsFormValues>();
    const linkIdInputPath = `${prefix}linkId` as `item.${number}.linkId`;
    const textInputPath = `${prefix}text` as `item.${number}.text`
    const typeInputPath = `${prefix}type` as `item.${number}.type`
    const itemArrayInputPath = `${prefix}item` as 'item';

    const { fields, append, remove } = useFieldArray({
        control,
        name: itemArrayInputPath,
    });

    const addNewItem = () => {
        append({
            linkId: '',
            text: '',
            type: '',
            answerOption: [],
        });
    };

    const removeItem = (index: number) => {
        remove(index);
    };

    return {
        fields,
        register,
        addNewItem,
        removeItem,
        linkIdInputPath,
        textInputPath,
        typeInputPath,
        itemArrayInputPath,

    };
}

export default useItemsFormField;


