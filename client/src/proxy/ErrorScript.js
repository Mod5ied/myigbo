class ErrorStates {
  static errorMatcher(code, errVal) {
    switch (code) {
      case 300:
        errVal.value = "Please enter a valid word!";
        break;
      case 404:
        errVal.value = "Word not found. Try checking your spellings again.";
        break;
      case 500:
        errVal.value = "Something went wrong during input processing, please try again.";
        break;
      case 503:
        errVal.value = "Something went wrong while fetching data from database.";
        break;

      default:
        errVal.value = "Something went wrong";
        break;
    }
  }
  static errorPrimitive(message, errVal) {
    /* Upcoming features: 
      here: logic to render a human readable and useful error to user, while
      sending necessary logs to log engine.
    */
  }
}

export { ErrorStates };
