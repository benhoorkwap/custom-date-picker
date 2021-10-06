
import { useState, useReducer } from 'react'

import './CustomDatePicker.css'


// Helper function
const stringifyDayOfWeek = day => {
    const daysOfWeek = [
        'sun', 
        'mon', 
        'tue', 
        'wed', 
        'thur', 
        'fri', 
        'sat'
    ]
    return daysOfWeek[day];
}

const stringifyMonthOfYear = month => {
    const months = [
            "January", 
            "February", 
            "March", 
            "April", 
            "May", 
            "June",
            "July", 
            "August", 
            "September",
            "October", 
            "November", 
            "December"
    ]
    return months[month]
}

const getDaysOfWeekInString = () => {
    const items = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    return items;
}


// Day? Note: Name might change in the future
function Day(props) {

    // handles click events
    const handleClick = (e) => {
        e.preventDefault();

        props.selectDate()

        
    }

    // Since all Day elements are to be displayed
    // as grid items, ensure that elements are placed
    // in the appropriate grid cells

    let defaultStyle = `date-picker-day ${props.dayOfTheWeek}`;
    
    
    return (
        <button className={defaultStyle} 
                disabled={props.isDisabled}
                onClick={handleClick}>
                    {props.value}
        </button>
    )
}

function CustomDatePicker(props) {

    // This state manages the date selected by the user.
    const [selectedDate, setSelectedDate] = useState({})

    // This stores the current date
    const currentDate = new Date()

    // Reducer function to be used by useReducer() hook.
    const reducer = (state, action) => {
        switch(action.type) {
            case 'moveToPrevMonth':
               return new Date(state.getFullYear(), state.getMonth() - 1);

            case 'moveToNextMonth':
                return new Date(state.getFullYear(), state.getMonth() + 1);

            default:
                return state    
        }
    }


    // The date state manages the month and year display on the UI.
    // As the user clicks the previous/next buttons, this state is updated 
    // and a re-render of the component is invoked.
    const [date, dispatch] = useReducer(reducer, currentDate)



    // Retrieves the number of month from month & year
    const nDaysInMonth = new Date(date.getFullYear(), date.getMonth() +1, 0).getDate()

    // Retrieves the first day of the month, where sun==0 && sat==6
    const fDayofMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  
    // Converts the day number representation of a week into string.
    const dayInString = stringifyDayOfWeek(fDayofMonth)

 
    // To be used by the element displaying the header
    const dateHeader = getDaysOfWeekInString()

    // To be used by element displaying the title.
    const title = `${stringifyMonthOfYear(date.getMonth())}, ${date.getFullYear()}`
    
    const selectedDateTitle = (Object.keys(selectedDate).length === 0 && selectedDate.constructor === Object) 
                                ? 'dd/mm/yy'
                                : `${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`;
    

    return(

            <div className="custom-date-picker">
                <div className="custom-date-picker-selected-date">{selectedDateTitle}</div>
                <div className="custom-date-picker-title-bar">
                    <div className="custom-date-picker-title">{title}</div>
                    <button className="moveToBtn" onClick={() => dispatch({type: 'moveToPrevMonth'})}>&lt;</button>
                    <button className="moveToBtn" onClick={() => dispatch({type: 'moveToNextMonth'})}>&gt;</button>
                </div>

                <div className="custom-date-picker-grid-container">
                        <div className="custom-date-picker-header">
                            {
                                dateHeader.map((item, index) => <div key={index}>{item}</div>)
                            }
                        </div>
                        <div className="custom-date-picker-dates">
                            {
                                Array.from(Array(nDaysInMonth).keys()).map((item,index) => {
                                    // first item
                                    const key = index;
                                    const value = item + 1;
                                    let disabled = false;

                                    if(date.getFullYear() < currentDate.getFullYear()) disabled = true;
                                    else if(date.getFullYear() === currentDate.getFullYear()) {
                                            if(date.getMonth()  < currentDate.getMonth()) disabled = true;
                                            else if(date.getMonth() === currentDate.getMonth() && value < currentDate.getDate()) disabled = true;
                                    }
                                        
                                    let day = '';
                                    
                                    if(index === 0){
                                        day = dayInString;
                                    }

                                    return <Day key={key}
                                                value={value}
                                                dayOfTheWeek={day}
                                                isDisabled={disabled}
                                                selectDate={() => setSelectedDate(new Date(date.getFullYear(), date.getMonth(), value))}
                                                />


                                    
                                    
                                })
                             
                            }
                        </div>
                    </div>
                
            </div>

        

        // <div className="custom-date-picker">
        //     <div className="custom-date-picker-content">
        //         <button className="prevBtn" onClick={() => dispatch({type: 'moveToPrevMonth'})}>&lt;</button>
        //         <button className="nextBtn" onClick={() => dispatch({type: 'moveToNextMonth'})}>&gt;</button>
                
        //         <div className="custom-date-picker-title">{title}</div>
        //         <div className="custom-date-picker-grid-container">
        //                 <div className="custom-date-picker-header">
        //                     {
        //                         dateHeader.map(item => <div>{item}</div>)
        //                     }
        //                 </div>
        //                 <div className="custom-date-picker-dates">
        //                     {
        //                         Array.from(Array(nDaysInMonth).keys()).map((item,index) => {
        //                             // first item
        //                             const key = index;
        //                             const value = item + 1;
        //                             let disabled = false;

        //                             if(date.getFullYear() < currentDate.getFullYear()) disabled = true;
        //                             else if(date.getFullYear() === currentDate.getFullYear()) {
        //                                     if(date.getMonth()  < currentDate.getMonth()) disabled = true;
        //                                     else if(date.getMonth() === currentDate.getMonth() && value < currentDate.getDate()) disabled = true;
        //                             }
                                        

                                    
                    
        //                             let day = '';
                                    
        //                             if(index === 0){
        //                                 day = dayInString;
        //                             }

        //                             return <Day key={key}
        //                                         value={value}
        //                                         dayOfTheWeek={day}
        //                                         isDisabled={disabled}
        //                                         selectDate={() => setSelectedDate(new Date(date.getFullYear(), date.getMonth(), value))}
        //                                         />


                                    
                                    
        //                         })
                             
        //                     }
        //                 </div>
        //             </div>
        //     </div>
        // </div>
    )
}


export default CustomDatePicker;