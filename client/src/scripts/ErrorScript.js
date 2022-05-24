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
        errVal.value =
          "Something went wrong during processing, please try again.";
        break;
      case 503:
        errVal.value =
          "Something went wrong while fetching data from database.";
        break;

      default:
        errVal.value = "Something went wrong";
        break;
    }
  }
}

export { ErrorStates };
