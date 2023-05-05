export interface SuscriptionInputDTO {
  name: string,
  description: string,
  datePayment: string,
  image: string,
  amount: string,
  done?: boolean
}

export interface SuscriptionOutputDTO {
  id: string,
  name: string,
  description: string,
  datePayment: string,
  image: string,
  amount: string,
  done: boolean
}

export interface UserCreateDTO {
  email: string,
  password: string,
  firstName: string,
  lastName: string
}

export interface UserLoginRequestDTO {
  email: string,
  password: string
}

export interface UserLoginResponseDTO {
  token: string
}
