export function formatUnixTimestamp(unixTimestamp) {
    // Convert Unix timestamp to milliseconds
  
    // Create a new Date object
    var dateObject = new Date(parseInt(unixTimestamp));
  
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