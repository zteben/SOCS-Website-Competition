export function formatUnixTimestamp(unixTimestamp) {
    // Convert Unix timestamp to milliseconds
    const milliseconds = unixTimestamp * 1000;
  
    // Create a new Date object
    const dateObject = new Date(milliseconds);
  
    // Get time components
    const hours = dateObject.getHours().toString().padStart(2, '0');
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');
  
    // Get date components
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(dateObject);
    const day = dateObject.getDate();
  
    // Format the result
    const formattedTime = `${hours}:${minutes}`;
    const formattedDate = `${month} ${day}`;
  
    // Return the result
    return `${formattedTime}, ${formattedDate}`;
  }