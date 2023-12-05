// types alias vs. interfaces
/**
 * Both Types alias and Interfaces can describe the object
 */
type TUser = {
  id: number;
  name: string;
  age: number;
};

interface IUser {
  id: number;
  name: string;
  age: number;
}

const newUser: TUser = {
  id: 1,
  name: 'X',
  age: 25,
};

/*
 * Both Types alias and Interfaces can extends the properties
 */
// with "&" operator in Types alias or with "extends" keyword in Interface
type TApartment = {
  name: string;
  floor: number;
  street: string;
};

type TArea = {
  subDistrict: string;
  district: string;
  postcode: number;
};

type Address = TApartment & TArea; // type intersection

interface IApartment {
  name: string;
  floor: number;
  street: string;
}

interface IArea {
  subDistrict: string;
  district: string;
  postcode: number;
}

interface IAddress extends IApartment, IArea {}

const myAddress: Address = {};

/**
 * Interface only describe object, but Types can describe everything
 * Actually we can use interface to describe the primitive type too, but the syntax is too verbose
 */
type MyName = string;
type MyAge = number;
type IsAdmin = boolean;

interface MyRole extends InstanceType<typeof String> {}
interface IsAdminRole extends InstanceType<typeof Boolean> {}

const myRole: MyRole = 'Admin';
const isAdmin: IsAdminRole = true;

/**
 * Describe Union type
 */
type MultipleAddress = string | string[]; //

/**
 *
 * Type alias can easily use with Utilities types (Pick, Omit etc.)
 */
type TUserWithoutAge = Pick<TUser, 'id' | 'name'>;

// For interface syntax is quite ugly -___-
interface IUserWithoutAge extends Pick<TUser, 'id' | 'name'> {}

const userWithoutAge: IUserWithoutAge = {};

/**
 * Type alias can describe Tuple type
 */
type TUserColumns = [number, string, boolean];
const userColumns: TUserColumns = [1, 'X', true];

// For interface syntax is quite ugly -___-
interface IUserColumns extends Array<string | number | boolean> {
  0: number;
  1: string;
  2: boolean;
}

const userColumnsInterface: IUserColumns = [1, 'X', true];

// Another good reason to use Type alias over Interface
// Types alias can easily create type from object
// and also easily extract type from something else
const user = {
  id: 1,
  name: 'X',
  age: 25,
  address: {
    street: 'Rama 9',
    floor: 24,
    name: 'G Tower',
  },
};

type KtAxaUser = typeof user;

type OnlyAddress = KtAxaUser['address'];

// create union keys
type UserKeys = keyof KtAxaUser;

// strict types with "as const"
// then extract the values
const paymentOptions = {
  qrCode: 'QR_CODE',
  creditCard: 'CREDIT_CARD',
  cash: 'CASH',
} as const;

type PaymentKeys = keyof typeof paymentOptions;

type PaymentOptions = (typeof paymentOptions)[PaymentKeys];

const makePayment = (option: PaymentOptions) => `Your payment is ${option}`;

makePayment('INTERNET_BANKING');

// Interface features that Type cannot do
// Declaration merging
interface Project {
  id: number;
  title: string;
}

interface Project {
  target: Date;
}

const eCBR: Project = {
  id: 1,
  title: 'eCBR',
  target: new Date(),
};

// merge with existing DOM interface
interface HTMLDivElement {
  foo: string;
}

// class implement interface
interface IHuman {
  name: string;
  age: number;
  greeting: () => string;
}

class Human implements IHuman {
  name: string;
  age: number;
  greeting: () => string;

  constructor(name: string, age: number, greeting: () => string) {
    this.name = name;
    this.age = age;
    this.greeting = greeting;
  }
}

const human = new Human('X', 25, () => `Hi, my name is X`);
