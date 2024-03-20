import React, { useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import WeatherForecast from './WeatherForecast';

export default function Create() {
    let result = [];
	const navigate = useNavigate();	
    const [city, setTitle] = useState('');
    const [description, setDescription] = useState('');
   
     // State variables to hold form data and validation errors
  const [formData, setFormData] = useState({ city: ''});
  const [errors, setErrors] = useState({ city: '' });

const postData = (e) => {
	

         e.preventDefault();
             
        // Validate form data
        let formIsValid = true;
        const newErrors = {};

        // city validation
        if (!formData.city) {
          formIsValid = false;
          newErrors.city = 'City is required';
        }

         // Update errors state with validation results
    setErrors(newErrors);

    // If form is valid, proceed with form submission
    if (formIsValid) {
      // Perform form submission logic here
     // console.log('Form submitted:', formData);
        // result  = axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=goa&appid=883a5313182e08a20bdc33f9075caa1f`, []).then(() => {})

         localStorage.setItem('city', formData.city);
         navigate('/weatherforecast');
    }



       
    }

     // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update formData state with the new input value
    setFormData({ ...formData, [name]: value });
    // Clear corresponding error when user starts typing
    setErrors({ ...errors, [name]: '' });
  };

	
    return (
        <div>
            <Form className="create-form" onSubmit={postData} >
            <div>
            <label>City:</label>
                <input type="city" name="city" value={formData.city} onChange={handleInputChange} />
                {errors.city && <p>{errors.city}</p>}
            </div>
               <Button  type='submit'>Submit</Button>
            </Form>
        
        
        </div>
    )	
}