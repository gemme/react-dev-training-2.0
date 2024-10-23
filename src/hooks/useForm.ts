import React, { ChangeEvent, useState } from "react";

/*
values = {
    name: '',
    lastName: '',
    currency: ''
}
 */

/*
    values.name
    values.lastName
*/

/*
    dirty: focus on an element
    validations:
    
*/

export const useForm = <T>(initalValues: T) => {
  const [values, setValues] = useState(initalValues);

  const handleChange = (event: any) => {
    const value = event?.target.value;
    const name = event.target.name;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetForm = () => {
    setValues(initalValues);
  };

  console.log("values", values);

  return {
    values,
    handleChange,
    resetForm,
  };
};
