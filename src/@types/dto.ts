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
