export class PlayerSearchError {
  public errorHeader: string;
  public errorString: string;

  constructor(errorHeader: string, errorString: string) {
    this.errorHeader = errorHeader;
    this.errorString = errorString;
  }
}
