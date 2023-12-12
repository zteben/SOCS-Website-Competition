const maxRows = 5;

export function autoResizeTextarea(textarea, updateContainerHeight) {
    if (textarea) {
      const currentRows = textarea.value.split('\n').length;
      textarea.rows = currentRows < maxRows ? currentRows : maxRows;
    }

    // Call the callback to update the container height
    if (updateContainerHeight) {
      updateContainerHeight();
    }
  }