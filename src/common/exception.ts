class DomainException extends Error {
  public code: string;
  public debug?: string;

  constructor(code: string, message: string, debug?: string) {
    super(message);
    this.name = "DomainException";
    this.code = code;
    this.debug = debug;
  }
}

class UnauthroizeException extends DomainException {
  constructor(code: string, message: string, debug?: string) {
    super(code, message, debug);
  }
}

class BadRequestException extends DomainException {
  constructor(code: string, message: string, debug?: string) {
    super(code, message, debug);
  }
}

class NotFoundException extends DomainException {
  constructor(code: string, message: string, debug?: string) {
    super(code, message, debug);
  }
}

class IntervalServerException extends DomainException {
  constructor(code: string, message: string, debug?: string) {
    super(code, message, debug);
  }
}

export {
  DomainException,
  UnauthroizeException,
  BadRequestException,
  NotFoundException,
  IntervalServerException,
};
