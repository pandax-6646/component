const SCREEN_TYPE = {
  INPUT: "INPUT" as const,
  SELECT: "SELECT" as const,
  DATE: "DATE" as const,
  CHECKBOX: "CHECKBOX" as const,
  RADIO: "RADIO" as const,
  NUMBER: "NUMBER" as const,
  SWITCH: "SWITCH" as const,
  READONLY: "READONLY" as const,
  UPLOAD: "UPLOAD" as const,
};

const INPUT_TYPE = {
  textarea: "textarea" as const,
  text: "text" as const,
  password: "password" as const,
};

const WORD_LIMIT_POSITION = {
  inside: "inside" as const,
  outside: "outside" as const,
};

export { SCREEN_TYPE, INPUT_TYPE, WORD_LIMIT_POSITION };
