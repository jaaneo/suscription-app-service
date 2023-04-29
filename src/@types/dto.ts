export interface TaskInputDTO {
  title: string,
  description?: string,
  done?: boolean
}

export interface TastOutputDTO {
  id: string,
  title: string,
  description: string,
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
