
export interface UserType {
  id: number,
  email: string,
  name: string,
  createdAt: string,
  updatedAt: string
}
export const defaultUser: UserType = {
  id: 0,
  email: '',
  name: '',
  createdAt: '',
  updatedAt: ''
}
