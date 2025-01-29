
Date.prototype.getWeek = function() {
  const firstDayOfYear = new Date(this.getFullYear(), 0, 1);
  const pastDaysOfYear = (this - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

export const isDateTodo = (todo, date) => {
  
  if (todo.date.frecuency?.end) {
    
    if (date.getFullYear() > todo.date.frecuency.end.year || date.getMonth() > todo.date.frecuency.end.month - 1 || date.getDate() > todo.date.frecuency.end.day){
      return false
    }
  }
  
  if (todo.date.frecuency) {
    return isSameTime(todo, date)
  }


  const todoDate = new Date(todo.date.year, todo.date.month - 1, todo.date.day)
  return date.toDateString() === todoDate.toDateString()
}

const isSameTime = (todo, date) => {
  const incDay = todo.date.frecuency.unit === 'day' ? todo.date.frecuency.each : 0
  const incWeek = todo.date.frecuency.unit === 'week' ? todo.date.frecuency.each * 7 : 0
  const incMonth = todo.date.frecuency.unit === 'month' ? todo.date.frecuency.each : 0
  const incYear = todo.date.frecuency.unit === 'year' ? todo.date.frecuency.each : 0

  let todoDate = new Date(todo.date.year, todo.date.month - 1, todo.date.day)

  while(todoDate <= date){
    
    /*igual es mejor hacer la comprobacion convirtiendo todo en dates */
    if (todo.date.frecuency.end && todoDate.getFullYear() >= todo.date.frecuency.end.year &&
        todoDate.getMonth() >= todo.date.frecuency.end.month - 1 &&
        todoDate.getDate() > todo.date.frecuency.end.day) {
          return false
    }
    
    if (todoDate.toDateString() === date.toDateString()) {
      return true
    }

    if (todo.date.frecuency.unit === 'week' && todo.date.frecuency.days && 
        todoDate.getWeek() === date.getWeek() - 1  && 
        todo.date.frecuency.days.includes(date.getDay())) {
          return true
    }

    todoDate = incrementDate(todoDate, incDay + incWeek, incMonth, incYear);
  }
  return false;
}

const incrementDate = (date, days, months, years) => {
  const newDate = new Date(date.getFullYear() + years, date.getMonth() + months, date.getDate() + days);
  return newDate;
};

export const isCompletedInDate = (todo, date) => {

  const dateJSON = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate()
  }

  if (! todo.completedTodos) {
    return false
  }

  for (const todoDate of todo.completedTodos){
    if (todoDate.year === dateJSON.year && todoDate.month === dateJSON.month && todoDate.day === dateJSON.day){
      return true
    }
  }
  return false
}




/* Funciones para frecuencia */
const days = {
  'L': 1,
  'M': 2,
  'X': 3,
  'J': 4,
  'V': 5,
  'S': 6,
  'D': 0,
}

export const calculateSelectedDays = (selectedDays) => {
  
  let daysArray = []
  for (const day in selectedDays){
    if (selectedDays[day]){
      daysArray.push(days[day])
    }
  }

  return daysArray
}


const lastDateOfWeek = (date, days) => {
  const lastDate = new Date(date)
  const lastDay = Math.max(...days)
  const incDay = lastDay - lastDate.getDay()
  lastDate.setDate(lastDate.getDate() + incDay)
  return lastDate
}

export const calculateEndDate = (frecuency, date, reps) => {
  
  const endDate = new Date(date)

  if (frecuency.end){
    endDate.setDate(frecuency.end)
    return endDate 
  }

  if (! frecuency.each && ! frecuency.unit && ! frecuency.reps){
    return null
  }

  if (frecuency.unit === 'week'){
    endDate.setDate(lastDateOfWeek(endDate, frecuency.days))  
  }

  const { each, unit} = frecuency;
  const incDay = unit === 'day' ? each * reps - 1 : 0;
  const incWeek = unit === 'week' ? each * 7 * reps - 1: 0;
  const incMonth = unit === 'month' ? each * reps - 1 : 0;
  const incYear = unit === 'year' ? each * reps - 1 : 0;
  endDate.setDate(endDate.getDate() + incDay + incWeek);
  endDate.setMonth(endDate.getMonth() + incMonth);
  endDate.setFullYear(endDate.getFullYear() + incYear);

  return {
    year: endDate.getFullYear(),
    month: endDate.getMonth() + 1,
    day: endDate.getDate()
  }
}


const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
export const returnWeekDay = (date) => {
  return daysOfWeek[date.getDay()]
}

const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sept', 'oct', 'nov', 'dic']
export const returnMonth = (date) => {
  return months[date.getMonth()]
}

const calculateNumberOfReps = (todo) => {
  if (! todo.date.frecuency){
    return 1
  }

  if ( ! todo.date.frecuency.end){
    return -1
  }

  const { each, unit, end } = todo.date.frecuency
  const incDay = unit === 'day' ? each : 0
  const incWeek = unit === 'week' ? each * 7 : 0
  const incMonth = unit === 'month' ? each : 0
  const incYear = unit === 'year' ? each : 0

  let reps = 0
  let todoDate = new Date(todo.date.year, todo.date.month - 1, todo.date.day)
  while(todoDate <= new Date(end.year, end.month - 1, end.day)){
    reps += 1
    todoDate = incrementDate(todoDate, incDay + incWeek, incMonth, incYear);
  } 
  return reps
}

export const isTodoAllCompleted = (todo) => {
  console.log(todo)
  return todo.completedTodos ? calculateNumberOfReps(todo) - todo.completedTodos.length === 1 : false
}
const DAYS_AFTER_DELETING = 7

export const wouldBeDeleted = (todo, date) => {
  let todoDate = new Date(todo.date.year, todo.date.month - 1, todo.date.day + DAYS_AFTER_DELETING)

  if (todo.date.frecuency){
    if (! todo.date.frecuency.end){
      return false
    }
    todoDate = new Date(todo.date.frecuency.end.year, todo.date.frecuency.end.month - 1, todo.date.frecuency.end.day + DAYS_AFTER_DELETING)
    return todoDate <= date
  }

  return todoDate <= date
}