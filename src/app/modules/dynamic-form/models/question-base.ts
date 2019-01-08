

export class QuestionBase<T> {
    value: T;
    key: string;
    label: string;
    required: boolean;
    order: number;
    controlType: string;     
    validationMsg:string
    elementClass:string;
    elementWraperClass:string;

    constructor(options: {
        value?: T,
        key?: string,
        label?: string,
        required?: boolean,
        order?: number,
        controlType?: string,
        elementClass?: string
        elementWraperClass?: string
      } = {}) {
      this.value = options.value;
      this.key = options.key || '';
      this.label = options.label || '';
      this.required = !!options.required;
      this.order = options.order === undefined ? 1 : options.order;
      this.controlType = options.controlType || '';
      this.elementClass = options.elementClass || '';      
      this.elementWraperClass = options.elementWraperClass || '';      
    }
  }
  
  export class TextboxQuestion extends QuestionBase<string> {
    controlType = 'textbox';
    type: string;
    MaxLength:number;
    MinLength:number;
    IsNumeric:boolean;
    constructor(options: {       
    } = {}) {
      super(options);
      this.type = options['type'] || 'text';
      this.MaxLength = options['MaxLength'] || 0;
      this.MinLength = options['MinLength'] || 0;
      this.IsNumeric = options['IsNumeric'] || 0;
    }
  }
  
  export class DropdownQuestion extends QuestionBase<string> {
    controlType = 'dropdown';
    options: {key: string, value: string}[] = [];
  
    constructor(options: {} = {}) {
      super(options);
      this.options = options['options'] || [];
    }
  }
  
  export class CheckboxQuestion extends QuestionBase<string> {
    controlType = 'checkbox';
    type: string;

    constructor(options: {       
    } = {}) {
      super(options);
      this.type = 'checkbox';
    }
  }